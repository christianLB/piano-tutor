from functools import lru_cache

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "Piano Tutor AI Backend"
    debug: bool = True
    database_url: str = "sqlite:///./app.db"
    cors_origins: list[str] = ["http://localhost:3000", "http://127.0.0.1:3000"]

    class Config:
        env_file = ".env"
        env_prefix = "BACKEND_"

@lru_cache()
def get_settings() -> Settings:
    return Settings()
