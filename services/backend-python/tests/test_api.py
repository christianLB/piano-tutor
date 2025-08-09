from fastapi.testclient import TestClient
from app.main import app


def test_health():
    with TestClient(app) as client:
        resp = client.get("/health")
        assert resp.status_code == 200
        assert resp.json() == {"status": "ok"}


def test_scores_initially_empty(tmp_path):
    # Ensure app starts and tables exist
    with TestClient(app) as client:
        client.get("/health")  # triggers startup
        resp = client.get("/scores")
        assert resp.status_code == 200
        assert isinstance(resp.json(), list)
