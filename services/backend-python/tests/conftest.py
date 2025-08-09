import os
import sys

# Ensure package import path points to project root mounted at /app
sys.path.insert(0, os.getcwd())

# Point the app to a local SQLite DB for tests BEFORE importing the app
os.environ.setdefault("BACKEND_DATABASE_URL", "sqlite:///./test.db")
