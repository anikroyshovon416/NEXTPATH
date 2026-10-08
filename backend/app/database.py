"""
NEXTPATH Database Configuration
================================

This module provides the central SQLAlchemy database setup for the NEXTPATH
FastAPI backend.

Current development database:
    SQLite

Production-ready configuration:
    Set DATABASE_URL to a PostgreSQL URL, for example:

    postgresql+psycopg://username:password@host:5432/nextpath

Main responsibilities:
- Build the SQLAlchemy engine.
- Create a reusable SessionLocal factory.
- Expose the declarative Base class.
- Provide the FastAPI get_db dependency.
- Configure SQLite safely for local development.
- Provide database initialization helpers.
- Provide health-check helpers.
- Support explicit transaction scopes.
- Keep database configuration centralized.

Recommended file location:
    backend/app/database.py
"""

from __future__ import annotations

import logging
import os
from contextlib import contextmanager
from pathlib import Path
from typing import Generator, Iterator, Optional

from sqlalchemy import create_engine, event, inspect, text
from sqlalchemy.engine import Engine
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import DeclarativeBase, Session, sessionmaker


# ============================================================================
# 01. LOGGING
# ============================================================================

logger = logging.getLogger("nextpath.database")


# ============================================================================
# 02. PROJECT PATHS
# ============================================================================

APP_DIR = Path(__file__).resolve().parent
BACKEND_DIR = APP_DIR.parent
DEFAULT_SQLITE_FILE = BACKEND_DIR / "nextpath.db"


# ============================================================================
# 03. ENVIRONMENT HELPERS
# ============================================================================

def _env_bool(name: str, default: bool = False) -> bool:
    """
    Read a boolean environment variable safely.

    Accepted true values:
        1, true, yes, y, on

    Accepted false values:
        0, false, no, n, off
    """
    raw = os.getenv(name)

    if raw is None:
        return default

    value = raw.strip().lower()

    if value in {"1", "true", "yes", "y", "on"}:
        return True

    if value in {"0", "false", "no", "n", "off"}:
        return False

    return default


def _env_int(name: str, default: int) -> int:
    """
    Read an integer environment variable safely.
    """
    raw = os.getenv(name)

    if raw is None:
        return default

    try:
        return int(raw)
    except (TypeError, ValueError):
        return default


# ============================================================================
# 04. DATABASE URL
# ============================================================================

def _default_database_url() -> str:
    """
    Return the default SQLite database URL.

    Example:
        sqlite:///C:/Users/.../NEXTPATH/backend/nextpath.db
    """
    normalized = DEFAULT_SQLITE_FILE.as_posix()
    return f"sqlite:///{normalized}"


def _normalize_database_url(url: str) -> str:
    """
    Normalize common database URL formats.

    Some hosting providers still expose PostgreSQL URLs using:
        postgres://...

    SQLAlchemy expects:
        postgresql://...

    We normalize this automatically.
    """
    url = url.strip()

    if url.startswith("postgres://"):
        url = "postgresql://" + url[len("postgres://"):]

    return url


DATABASE_URL = _normalize_database_url(
    os.getenv("DATABASE_URL", _default_database_url())
)


# ============================================================================
# 05. DATABASE TYPE DETECTION
# ============================================================================

def is_sqlite_url(url: str = DATABASE_URL) -> bool:
    """
    Return True when the supplied database URL is SQLite.
    """
    return url.startswith("sqlite:")


def is_postgresql_url(url: str = DATABASE_URL) -> bool:
    """
    Return True when the supplied database URL is PostgreSQL.
    """
    return (
        url.startswith("postgresql:")
        or url.startswith("postgresql+")
    )


IS_SQLITE = is_sqlite_url()
IS_POSTGRESQL = is_postgresql_url()


# ============================================================================
# 06. SQLALCHEMY ENGINE SETTINGS
# ============================================================================

DATABASE_ECHO = _env_bool(
    "DATABASE_ECHO",
    default=False,
)

DATABASE_POOL_PRE_PING = _env_bool(
    "DATABASE_POOL_PRE_PING",
    default=True,
)

DATABASE_POOL_RECYCLE = _env_int(
    "DATABASE_POOL_RECYCLE",
    default=1800,
)

DATABASE_POOL_SIZE = _env_int(
    "DATABASE_POOL_SIZE",
    default=5,
)

DATABASE_MAX_OVERFLOW = _env_int(
    "DATABASE_MAX_OVERFLOW",
    default=10,
)

DATABASE_POOL_TIMEOUT = _env_int(
    "DATABASE_POOL_TIMEOUT",
    default=30,
)


# ============================================================================
# 07. ENGINE OPTIONS
# ============================================================================

def _build_engine_kwargs() -> dict:
    """
    Build SQLAlchemy engine options depending on database type.
    """
    kwargs: dict = {
        "echo": DATABASE_ECHO,
        "future": True,
        "pool_pre_ping": DATABASE_POOL_PRE_PING,
    }

    if IS_SQLITE:
        # SQLite normally restricts connections to the creating thread.
        # FastAPI can use multiple worker threads, so this must be disabled.
        kwargs["connect_args"] = {
            "check_same_thread": False,
            "timeout": 30,
        }

    else:
        # These options are intended for PostgreSQL / other pooled databases.
        kwargs.update(
            {
                "pool_size": DATABASE_POOL_SIZE,
                "max_overflow": DATABASE_MAX_OVERFLOW,
                "pool_timeout": DATABASE_POOL_TIMEOUT,
                "pool_recycle": DATABASE_POOL_RECYCLE,
            }
        )

    return kwargs


ENGINE_KWARGS = _build_engine_kwargs()


# ============================================================================
# 08. CREATE ENGINE
# ============================================================================

engine: Engine = create_engine(
    DATABASE_URL,
    **ENGINE_KWARGS,
)


# ============================================================================
# 09. SQLITE CONNECTION CONFIGURATION
# ============================================================================

if IS_SQLITE:

    @event.listens_for(engine, "connect")
    def _configure_sqlite(
        dbapi_connection,
        connection_record,
    ) -> None:
        """
        Configure every new SQLite connection.

        PRAGMA foreign_keys = ON
            Enforces foreign-key constraints.

        PRAGMA journal_mode = WAL
            Improves read/write concurrency for local development.

        PRAGMA synchronous = NORMAL
            Good balance between reliability and performance.

        PRAGMA busy_timeout
            Gives SQLite time to wait when another write is in progress.
        """
        cursor = dbapi_connection.cursor()

        try:
            cursor.execute("PRAGMA foreign_keys=ON")
            cursor.execute("PRAGMA journal_mode=WAL")
            cursor.execute("PRAGMA synchronous=NORMAL")
            cursor.execute("PRAGMA busy_timeout=30000")
        finally:
            cursor.close()


# ============================================================================
# 10. DECLARATIVE BASE
# ============================================================================

class Base(DeclarativeBase):
    """
    Base class for every SQLAlchemy ORM model.

    Example:
        from app.database import Base

        class User(Base):
            __tablename__ = "users"
            ...
    """

    pass


# ============================================================================
# 11. SESSION FACTORY
# ============================================================================

SessionLocal = sessionmaker(
    bind=engine,
    class_=Session,
    autoflush=False,
    autocommit=False,
    expire_on_commit=False,
)


# ============================================================================
# 12. FASTAPI DATABASE DEPENDENCY
# ============================================================================

def get_db() -> Generator[Session, None, None]:
    """
    FastAPI dependency that provides one SQLAlchemy session per request.

    Example:
        from fastapi import Depends
        from sqlalchemy.orm import Session
        from app.database import get_db

        @router.get("/users")
        def list_users(db: Session = Depends(get_db)):
            ...

    The session is always closed when the request finishes.
    """
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


# ============================================================================
# 13. TRANSACTION CONTEXT MANAGER
# ============================================================================

@contextmanager
def transaction_session() -> Iterator[Session]:
    """
    Create a session for service-layer or script operations.

    The transaction is automatically committed when successful.
    It is automatically rolled back on failure.

    Example:
        with transaction_session() as db:
            db.add(user)
    """
    db = SessionLocal()

    try:
        yield db
        db.commit()

    except Exception:
        db.rollback()
        raise

    finally:
        db.close()


# ============================================================================
# 14. MANUAL SESSION HELPER
# ============================================================================

def create_session() -> Session:
    """
    Create and return a new SQLAlchemy session.

    Prefer get_db() inside FastAPI routes.

    Prefer transaction_session() for most standalone service operations.

    If you use create_session(), you are responsible for closing the session.
    """
    return SessionLocal()


# ============================================================================
# 15. MODEL IMPORT REGISTRATION
# ============================================================================

def _import_models() -> None:
    """
    Import ORM models before create_all() runs.

    SQLAlchemy can only create tables that have already been registered
    on Base.metadata.

    This function intentionally uses guarded imports because NEXTPATH is
    being upgraded module-by-module. Missing future model modules will not
    prevent the current backend from starting.

    As model files are added, they can be imported here.

    Recommended future structure:

        app/models/
            __init__.py
            user.py
            profile.py
            career.py
            assessment.py
            roadmap.py
            project.py
            credential.py
    """

    # First try a package-level model importer if it exists.
    try:
        from app import models  # noqa: F401

        return

    except ImportError:
        pass

    # Support an older single-file models.py structure if present.
    try:
        import app.models  # noqa: F401

    except ImportError:
        logger.debug(
            "No ORM model module has been registered yet."
        )


# ============================================================================
# 16. DATABASE INITIALIZATION
# ============================================================================

def init_db() -> None:
    """
    Create every registered ORM table that does not already exist.

    Important:
        create_all() is suitable for initial development.

    For a production project, schema changes should eventually be managed
    with Alembic migrations instead of relying only on create_all().
    """
    _import_models()

    logger.info(
        "Initializing NEXTPATH database."
    )

    Base.metadata.create_all(
        bind=engine
    )

    logger.info(
        "NEXTPATH database initialization completed."
    )


# ============================================================================
# 17. DROP DATABASE TABLES
# ============================================================================

def drop_all_tables(
    *,
    confirm: bool = False,
) -> None:
    """
    Drop every registered table.

    This is intentionally protected by a confirmation flag.

    NEVER call this in normal application startup.

    Example:
        drop_all_tables(confirm=True)

    Useful only for local testing or development resets.
    """
    if not confirm:
        raise RuntimeError(
            "drop_all_tables() requires confirm=True."
        )

    _import_models()

    logger.warning(
        "Dropping all NEXTPATH database tables."
    )

    Base.metadata.drop_all(
        bind=engine
    )


# ============================================================================
# 18. DATABASE HEALTH CHECK
# ============================================================================

def check_database_connection() -> dict:
    """
    Test the current database connection.

    Returns:
        {
            "ok": True,
            "database": "sqlite",
            "message": "Database connection successful."
        }
    """
    database_name = (
        "sqlite"
        if IS_SQLITE
        else "postgresql"
        if IS_POSTGRESQL
        else "other"
    )

    try:
        with engine.connect() as connection:
            connection.execute(
                text("SELECT 1")
            )

        return {
            "ok": True,
            "database": database_name,
            "message": (
                "Database connection successful."
            ),
        }

    except SQLAlchemyError as exc:
        logger.exception(
            "Database health check failed."
        )

        return {
            "ok": False,
            "database": database_name,
            "message": (
                "Database connection failed."
            ),
            "error": str(exc),
        }


# ============================================================================
# 19. TABLE INSPECTION
# ============================================================================

def get_table_names() -> list[str]:
    """
    Return every table currently available in the database.
    """
    inspector = inspect(engine)

    return sorted(
        inspector.get_table_names()
    )


def table_exists(
    table_name: str,
) -> bool:
    """
    Return True when a table exists in the current database.
    """
    if not table_name:
        return False

    inspector = inspect(engine)

    return inspector.has_table(
        table_name
    )


# ============================================================================
# 20. DATABASE INFORMATION
# ============================================================================

def get_database_info() -> dict:
    """
    Return safe database configuration information.

    Passwords and complete production URLs are intentionally excluded.
    """
    database_type = (
        "sqlite"
        if IS_SQLITE
        else "postgresql"
        if IS_POSTGRESQL
        else "other"
    )

    info = {
        "type": database_type,
        "echo": DATABASE_ECHO,
        "pool_pre_ping": DATABASE_POOL_PRE_PING,
    }

    if IS_SQLITE:
        info["file"] = str(
            DEFAULT_SQLITE_FILE
        )

    return info


# ============================================================================
# 21. DATABASE RESET FOR LOCAL DEVELOPMENT
# ============================================================================

def reset_database_for_development(
    *,
    confirm: bool = False,
) -> None:
    """
    Drop and recreate all registered tables.

    Use only during development.

    Example:
        reset_database_for_development(confirm=True)
    """
    if not confirm:
        raise RuntimeError(
            "reset_database_for_development() requires confirm=True."
        )

    logger.warning(
        "Resetting NEXTPATH development database."
    )

    drop_all_tables(
        confirm=True
    )

    init_db()


# ============================================================================
# 22. SAFE COMMIT HELPER
# ============================================================================

def commit_or_rollback(
    db: Session,
) -> None:
    """
    Commit the active transaction.

    Roll back automatically if the commit fails.
    """
    try:
        db.commit()

    except SQLAlchemyError:
        db.rollback()
        raise


# ============================================================================
# 23. SAFE REFRESH HELPER
# ============================================================================

def commit_and_refresh(
    db: Session,
    instance,
):
    """
    Commit a model instance and refresh it from the database.

    This is convenient after INSERT and UPDATE operations.

    Example:
        db.add(user)
        user = commit_and_refresh(db, user)
    """
    try:
        db.commit()
        db.refresh(instance)

        return instance

    except SQLAlchemyError:
        db.rollback()
        raise


# ============================================================================
# 24. SAFE DELETE HELPER
# ============================================================================

def delete_and_commit(
    db: Session,
    instance,
) -> None:
    """
    Delete an ORM instance and commit safely.
    """
    try:
        db.delete(instance)
        db.commit()

    except SQLAlchemyError:
        db.rollback()
        raise


# ============================================================================
# 25. DEVELOPMENT STARTUP MESSAGE
# ============================================================================

def log_database_startup() -> None:
    """
    Log safe startup information about the current database.
    """
    info = get_database_info()

    logger.info(
        "NEXTPATH database: type=%s, echo=%s",
        info["type"],
        info["echo"],
    )

    if IS_SQLITE:
        logger.info(
            "SQLite database file: %s",
            info["file"],
        )


# ============================================================================
# 26. PUBLIC EXPORTS
# ============================================================================

__all__ = [
    "APP_DIR",
    "BACKEND_DIR",
    "DEFAULT_SQLITE_FILE",
    "DATABASE_URL",
    "IS_SQLITE",
    "IS_POSTGRESQL",
    "engine",
    "Base",
    "SessionLocal",
    "get_db",
    "create_session",
    "transaction_session",
    "init_db",
    "drop_all_tables",
    "reset_database_for_development",
    "check_database_connection",
    "get_database_info",
    "get_table_names",
    "table_exists",
    "commit_or_rollback",
    "commit_and_refresh",
    "delete_and_commit",
    "log_database_startup",
]
