from fastapi.testclient import TestClient
from app.main import app

# Minimal MusicXML content that music21 can parse
MUSICXML = b"""<?xml version=\"1.0\" encoding=\"UTF-8\"?>
<!DOCTYPE score-partwise PUBLIC \"-//Recordare//DTD MusicXML 3.1 Partwise//EN\" \"http://www.musicxml.org/dtds/partwise.dtd\">
<score-partwise version=\"3.1\">
  <part-list>
    <score-part id=\"P1\">
      <part-name>Music</part-name>
    </score-part>
  </part-list>
  <part id=\"P1\">
    <measure number=\"1\">
      <attributes>
        <divisions>1</divisions>
        <key><fifths>0</fifths></key>
        <time><beats>4</beats><beat-type>4</beat-type></time>
        <clef><sign>G</sign><line>2</line></clef>
      </attributes>
      <note><pitch><step>C</step><octave>4</octave></pitch><duration>1</duration><type>quarter</type></note>
    </measure>
  </part>
</score-partwise>
"""

def test_analyse_and_fetch_score_and_file():
    with TestClient(app) as client:
        # Upload via /analyse
        files = {"file": ("test.musicxml", MUSICXML, "application/vnd.recordare.musicxml+xml")}
        r = client.post("/analyse", files=files)
        assert r.status_code == 200
        data = r.json()
        assert data.get("score_id")
        score_id = data["score_id"]

        # List scores
        r2 = client.get("/scores")
        assert r2.status_code == 200
        scores = r2.json()
        assert any(s["id"] == score_id for s in scores)

        # Detail
        r3 = client.get(f"/scores/{score_id}")
        assert r3.status_code == 200
        detail = r3.json()
        assert detail["score"]["id"] == score_id
        assert detail["analysis"]["measures"] >= 1

        # File serving
        filename = detail["score"]["filename"]
        r4 = client.get(f"/files/{filename}")
        assert r4.status_code == 200
        assert r4.headers.get("content-type", "").startswith("application/") or r4.headers.get("content-type", "").startswith("audio/")
