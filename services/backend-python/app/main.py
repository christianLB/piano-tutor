import os
import uuid
from datetime import datetime
from typing import List, Optional

from fastapi import Depends, FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlmodel import Field, Session, SQLModel, create_engine, select

from .core.config import get_settings

settings = get_settings()
app = FastAPI(title=settings.app_name, version="0.1.0")


# Database setup
engine = create_engine(settings.database_url, echo=settings.debug)


class Score(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: Optional[str] = None
    filename: str
    created_at: datetime = Field(default_factory=datetime.utcnow)


class Analysis(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    score_id: int
    key: Optional[str] = None
    time_signature: Optional[str] = None
    measures: int
    notes: int
    created_at: datetime = Field(default_factory=datetime.utcnow)


def get_session():
    with Session(engine) as session:
        yield session


# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class AnalyseResponse(BaseModel):
    key: Optional[str] = None
    time_signature: Optional[str] = None
    measures: int
    notes: int
    score_id: Optional[int] = None
    analysis_id: Optional[int] = None


@app.on_event("startup")
def on_startup():
    # Create tables
    SQLModel.metadata.create_all(engine)
    # Ensure storage
    os.makedirs("storage/scores", exist_ok=True)


@app.get("/health")
async def health():
    return {"status": "ok"}


MAX_UPLOAD_BYTES = 5 * 1024 * 1024  # 5MB
ALLOWED_CONTENT_TYPES = {
    "application/xml",
    "text/xml",
    "application/vnd.recordare.musicxml",
    "audio/midi",
    "audio/x-midi",
}


@app.post("/analyse", response_model=AnalyseResponse)
async def analyse(file: UploadFile = File(...), session: Session = Depends(get_session)):
    """
    Accept a MusicXML or MIDI file and return a simple analysis using music21.
    Also persists the Score and Analysis in the database and stores the file.
    """
    try:
        from music21 import converter, meter, note
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"music21 not available: {e}")

    # Basic validation
    if file.content_type and file.content_type not in ALLOWED_CONTENT_TYPES:
        msg = f"Unsupported content type: {file.content_type}"
        raise HTTPException(status_code=400, detail=msg)

    contents = await file.read()
    if not contents:
        raise HTTPException(status_code=400, detail="Empty file")
    if len(contents) > MAX_UPLOAD_BYTES:
        raise HTTPException(status_code=400, detail="File too large (max 5MB)")

    # Persist file
    ext = os.path.splitext(file.filename or "")[1] or ".xml"
    fname = f"{uuid.uuid4().hex}{ext}"
    fpath = os.path.join("storage", "scores", fname)
    with open(fpath, "wb") as f:
        f.write(contents)

    # Parse and analyse
    try:
        score = converter.parse(contents)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to parse file: {e}")

    measures = (
        len(score.parts[0].getElementsByClass("Measure"))
        if getattr(score, "parts", None)
        else 0
    )
    notes_count = len(score.recurse().getElementsByClass(note.Note))

    try:
        k = score.analyze('key')
        key_str = f"{k.tonic.name} {k.mode}" if k else None
    except Exception:
        key_str = None

    ts = None
    try:
        ts_obj = score.recurse().getElementsByClass(meter.TimeSignature).first()
        if ts_obj:
            ts = ts_obj.ratioString
    except Exception:
        ts = None

    # Save DB rows
    score_row = Score(title=file.filename or "Untitled", filename=fname)
    session.add(score_row)
    session.commit()
    session.refresh(score_row)

    analysis_row = Analysis(
        score_id=score_row.id,
        key=key_str,
        time_signature=ts,
        measures=measures,
        notes=notes_count,
    )
    session.add(analysis_row)
    session.commit()
    session.refresh(analysis_row)

    return AnalyseResponse(
        key=key_str,
        time_signature=ts,
        measures=measures,
        notes=notes_count,
        score_id=score_row.id,
        analysis_id=analysis_row.id,
    )


class ScoreOut(BaseModel):
    id: int
    title: Optional[str]
    filename: str
    created_at: datetime

    class Config:
        from_attributes = True


@app.get("/scores", response_model=List[ScoreOut])
def list_scores(session: Session = Depends(get_session)):
    return session.exec(select(Score).order_by(Score.created_at.desc())).all()
