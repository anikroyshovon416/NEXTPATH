"""
NEXTPATH FastAPI Application
============================

Main backend entry point for the NEXTPATH Career Intelligence &
Workforce Readiness Platform.

File location:
    backend/app/main.py

Run locally:
    python -m uvicorn app.main:app --reload

Local API:
    http://127.0.0.1:8000

Swagger:
    http://127.0.0.1:8000/docs

Current public endpoints:
    GET /
    GET /health
    GET /career-market
    GET /career-market/{career_name}
    GET /learning-resources
    GET /learning-resources/{skill_name}

This version is designed to:
- preserve the current frontend integration,
- support the upgraded career_market.json,
- support the upgraded learning_resources.json,
- initialize SQLAlchemy safely,
- expose database health information,
- configure CORS for local development and Vercel,
- provide structured errors,
- prepare the app for future /api/... routers.
"""

from __future__ import annotations

import json
import logging
import os
import time
from contextlib import asynccontextmanager
from pathlib import Path
from typing import Any

from fastapi import FastAPI, HTTPException, Query, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from sqlalchemy.exc import SQLAlchemyError

from app.database import (
    check_database_connection,
    get_database_info,
    get_table_names,
    init_db,
    log_database_startup,
)


# ============================================================================
# 01. LOGGING
# ============================================================================

LOG_LEVEL = os.getenv(
    "LOG_LEVEL",
    "INFO",
).upper()

logging.basicConfig(
    level=getattr(
        logging,
        LOG_LEVEL,
        logging.INFO,
    ),
    format=(
        "%(asctime)s | "
        "%(levelname)s | "
        "%(name)s | "
        "%(message)s"
    ),
)

logger = logging.getLogger(
    "nextpath.api"
)


# ============================================================================
# 02. PROJECT PATHS
# ============================================================================

APP_DIR = Path(__file__).resolve().parent
BACKEND_DIR = APP_DIR.parent
DATA_DIR = BACKEND_DIR / "data"

CAREER_MARKET_FILE = (
    DATA_DIR
    / "career_market.json"
)

LEARNING_RESOURCES_FILE = (
    DATA_DIR
    / "learning_resources.json"
)


# ============================================================================
# 03. APPLICATION METADATA
# ============================================================================

APP_NAME = "NEXTPATH API"

APP_DESCRIPTION = """
NEXTPATH backend API for career intelligence, skill assessment,
skill-gap analysis, personalized roadmaps, project evidence,
credentials, and opportunity matching.

The currently available public API provides:

- Career market information
- Required career skills
- Salary planning data
- Skill-demand data
- Learning topics
- Free learning resources
- Practice resources
- Paid course discovery links
- Project recommendations

Additional authenticated user APIs will be introduced under `/api/...`.
"""

APP_VERSION = os.getenv(
    "APP_VERSION",
    "3.0.0",
)

ENVIRONMENT = os.getenv(
    "ENVIRONMENT",
    "development",
).strip().lower()


# ============================================================================
# 04. SAFE ENVIRONMENT HELPERS
# ============================================================================

def env_bool(
    name: str,
    default: bool = False,
) -> bool:
    raw = os.getenv(name)

    if raw is None:
        return default

    value = raw.strip().lower()

    if value in {
        "1",
        "true",
        "yes",
        "y",
        "on",
    }:
        return True

    if value in {
        "0",
        "false",
        "no",
        "n",
        "off",
    }:
        return False

    return default


# ============================================================================
# 05. JSON LOADING
# ============================================================================

class DataFileError(RuntimeError):
    """
    Raised when one of the NEXTPATH static data files cannot be loaded.
    """

    pass


def load_json_file(
    path: Path,
) -> Any:
    """
    Load and validate a JSON file.

    Raises DataFileError when:
    - the file does not exist,
    - JSON is invalid,
    - reading fails.
    """

    if not path.exists():
        raise DataFileError(
            f"Required data file was not found: {path}"
        )

    try:
        with path.open(
            "r",
            encoding="utf-8",
        ) as file:
            return json.load(file)

    except json.JSONDecodeError as exc:
        raise DataFileError(
            f"Invalid JSON in {path.name}: {exc}"
        ) from exc

    except OSError as exc:
        raise DataFileError(
            f"Unable to read {path.name}: {exc}"
        ) from exc


# ============================================================================
# 06. CAREER DATA NORMALIZATION
# ============================================================================

def get_career_payload() -> dict[str, Any]:
    """
    Return the normalized career-market payload.

    Supports both:
        {"metadata": {...}, "careers": [...]}

    and an older plain list format:
        [...]
    """

    payload = load_json_file(
        CAREER_MARKET_FILE
    )

    if isinstance(
        payload,
        list,
    ):
        return {
            "metadata": {},
            "careers": payload,
        }

    if not isinstance(
        payload,
        dict,
    ):
        raise DataFileError(
            "career_market.json must contain an object or list."
        )

    careers = payload.get(
        "careers",
        [],
    )

    if not isinstance(
        careers,
        list,
    ):
        raise DataFileError(
            "career_market.json field 'careers' must be a list."
        )

    return {
        "metadata":
            payload.get(
                "metadata",
                {},
            ),
        "careers":
            careers,
    }


# ============================================================================
# 07. LEARNING RESOURCE NORMALIZATION
# ============================================================================

def get_learning_payload() -> dict[str, Any]:
    """
    Return normalized learning-resource data.

    Supports:
        {"metadata": {...}, "resources": {...}}

    and an older direct mapping:
        {"Python": {...}, "SQL": {...}}
    """

    payload = load_json_file(
        LEARNING_RESOURCES_FILE
    )

    if not isinstance(
        payload,
        dict,
    ):
        raise DataFileError(
            "learning_resources.json must contain an object."
        )

    if (
        "resources"
        in payload
    ):
        resources = payload.get(
            "resources",
            {},
        )

        if not isinstance(
            resources,
            dict,
        ):
            raise DataFileError(
                "learning_resources.json field 'resources' must be an object."
            )

        return {
            "metadata":
                payload.get(
                    "metadata",
                    {},
                ),
            "resources":
                resources,
        }

    return {
        "metadata": {},
        "resources": payload,
    }


# ============================================================================
# 08. STRING MATCHING HELPERS
# ============================================================================

def normalize_text(
    value: str,
) -> str:
    """
    Normalize a string for case-insensitive matching.
    """

    return " ".join(
        str(value)
        .strip()
        .lower()
        .split()
    )


def find_career(
    career_name: str,
) -> dict[str, Any] | None:
    """
    Find a career by:
    - exact name,
    - career id,
    - normalized name.
    """

    target = normalize_text(
        career_name
    )

    payload = get_career_payload()

    for career in payload[
        "careers"
    ]:
        name = normalize_text(
            career.get(
                "name",
                "",
            )
        )

        career_id = normalize_text(
            career.get(
                "id",
                "",
            )
        )

        if target in {
            name,
            career_id,
        }:
            return career

    return None


def find_learning_resource(
    skill_name: str,
) -> tuple[str, dict[str, Any]] | None:
    """
    Find a learning-resource entry by case-insensitive skill name.
    """

    target = normalize_text(
        skill_name
    )

    payload = get_learning_payload()

    for skill, resource in payload[
        "resources"
    ].items():
        if (
            normalize_text(
                skill
            )
            == target
        ):
            return (
                skill,
                resource,
            )

    return None


# ============================================================================
# 09. API RESPONSE MODELS
# ============================================================================

class ApiStatusResponse(
    BaseModel
):
    status: str
    service: str
    version: str
    environment: str


class ApiHealthResponse(
    BaseModel
):
    status: str
    service: str
    version: str
    environment: str
    database: dict[str, Any]
    data: dict[str, Any]


# ============================================================================
# 10. LIFESPAN
# ============================================================================

@asynccontextmanager
async def lifespan(
    app: FastAPI,
):
    """
    Run application startup and shutdown logic.
    """

    logger.info(
        "Starting %s version %s.",
        APP_NAME,
        APP_VERSION,
    )

    log_database_startup()

    try:
        init_db()

    except SQLAlchemyError:
        logger.exception(
            "Database initialization failed."
        )

        if env_bool(
            "FAIL_ON_DATABASE_STARTUP_ERROR",
            False,
        ):
            raise

    try:
        career_payload = (
            get_career_payload()
        )

        learning_payload = (
            get_learning_payload()
        )

        logger.info(
            "Loaded %s careers and %s learning-resource skills.",
            len(
                career_payload[
                    "careers"
                ]
            ),
            len(
                learning_payload[
                    "resources"
                ]
            ),
        )

    except DataFileError:
        logger.exception(
            "NEXTPATH data validation failed during startup."
        )

        if env_bool(
            "FAIL_ON_DATA_STARTUP_ERROR",
            True,
        ):
            raise

    yield

    logger.info(
        "Shutting down %s.",
        APP_NAME,
    )


# ============================================================================
# 11. CREATE FASTAPI APP
# ============================================================================

app = FastAPI(
    title=APP_NAME,
    description=APP_DESCRIPTION,
    version=APP_VERSION,
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
)


# ============================================================================
# 12. CORS
# ============================================================================

DEFAULT_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:4173",
    "http://127.0.0.1:4173",
    "https://nextpath-lilac.vercel.app",
]


def get_allowed_origins() -> list[str]:
    """
    Return allowed frontend origins.

    Additional origins can be supplied through:

        CORS_ORIGINS=https://example.com,https://www.example.com
    """

    configured = os.getenv(
        "CORS_ORIGINS",
        "",
    ).strip()

    origins = list(
        DEFAULT_ALLOWED_ORIGINS
    )

    if configured:
        origins.extend(
            origin.strip()
            for origin
            in configured.split(",")
            if origin.strip()
        )

    # Preserve order while removing duplicates.
    return list(
        dict.fromkeys(
            origins
        )
    )


app.add_middleware(
    CORSMiddleware,
    allow_origins=
        get_allowed_origins(),
    allow_credentials=True,
    allow_methods=[
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE",
        "OPTIONS",
    ],
    allow_headers=[
        "*",
    ],
)


# ============================================================================
# 13. REQUEST TIMING MIDDLEWARE
# ============================================================================

@app.middleware("http")
async def add_process_time(
    request: Request,
    call_next,
):
    """
    Add a simple response-time header for debugging and monitoring.
    """

    started = time.perf_counter()

    response = await call_next(
        request
    )

    elapsed_ms = (
        time.perf_counter()
        - started
    ) * 1000

    response.headers[
        "X-Process-Time-Ms"
    ] = f"{elapsed_ms:.2f}"

    return response


# ============================================================================
# 14. GLOBAL ERROR HANDLERS
# ============================================================================

@app.exception_handler(
    DataFileError
)
async def data_file_error_handler(
    request: Request,
    exc: DataFileError,
):
    logger.error(
        "Data file error at %s: %s",
        request.url.path,
        exc,
    )

    return JSONResponse(
        status_code=500,
        content={
            "detail":
                "NEXTPATH data could not be loaded.",
            "error":
                str(exc),
        },
    )


@app.exception_handler(
    SQLAlchemyError
)
async def sqlalchemy_error_handler(
    request: Request,
    exc: SQLAlchemyError,
):
    logger.exception(
        "Database error at %s",
        request.url.path,
    )

    return JSONResponse(
        status_code=500,
        content={
            "detail":
                "A database operation failed.",
        },
    )


# ============================================================================
# 15. ROOT
# ============================================================================

@app.get(
    "/",
    tags=[
        "System",
    ],
    response_model=
        ApiStatusResponse,
)
def root():
    """
    Basic API status endpoint.
    """

    return {
        "status":
            "online",
        "service":
            APP_NAME,
        "version":
            APP_VERSION,
        "environment":
            ENVIRONMENT,
    }


# ============================================================================
# 16. HEALTH CHECK
# ============================================================================

@app.get(
    "/health",
    tags=[
        "System",
    ],
    response_model=
        ApiHealthResponse,
)
def health():
    """
    Check:
    - API availability,
    - database connectivity,
    - static career data,
    - learning-resource data.
    """

    database_status = (
        check_database_connection()
    )

    try:
        career_payload = (
            get_career_payload()
        )

        career_ok = True

        career_count = len(
            career_payload[
                "careers"
            ]
        )

    except DataFileError:
        career_ok = False
        career_count = 0

    try:
        learning_payload = (
            get_learning_payload()
        )

        learning_ok = True

        learning_count = len(
            learning_payload[
                "resources"
            ]
        )

    except DataFileError:
        learning_ok = False
        learning_count = 0

    everything_ok = (
        database_status.get(
            "ok",
            False,
        )
        and career_ok
        and learning_ok
    )

    return {
        "status":
            "healthy"
            if everything_ok
            else "degraded",

        "service":
            APP_NAME,

        "version":
            APP_VERSION,

        "environment":
            ENVIRONMENT,

        "database":
            database_status,

        "data": {
            "career_market": {
                "ok":
                    career_ok,
                "records":
                    career_count,
            },

            "learning_resources": {
                "ok":
                    learning_ok,
                "records":
                    learning_count,
            },
        },
    }


# ============================================================================
# 17. DATABASE INFO
# ============================================================================

@app.get(
    "/health/database",
    tags=[
        "System",
    ],
)
def database_health():
    """
    Return safe database health information.
    """

    return {
        "connection":
            check_database_connection(),

        "configuration":
            get_database_info(),

        "tables":
            get_table_names(),
    }


# ============================================================================
# 18. CAREER MARKET LIST
# ============================================================================

@app.get(
    "/career-market",
    tags=[
        "Career Market",
    ],
)
def career_market(
    search: str | None = Query(
        default=None,
        description=
            "Optional career search.",
    ),

    category: str | None = Query(
        default=None,
        description=
            "Optional exact category filter.",
    ),

    min_demand_score: int | None = Query(
        default=None,
        ge=0,
        le=100,
    ),

    sort_by: str | None = Query(
        default=None,
        description=
            "Supported: demand, opportunity, name",
    ),

    include_metadata: bool = Query(
        default=False,
        description=
            "Return metadata plus careers instead of only the career list.",
    ),
):
    """
    Return career market data.

    Compatibility behavior:
        By default this endpoint returns a plain career list.

    This preserves compatibility with frontend pages that already expect:
        [...]
    """

    payload = get_career_payload()

    careers = list(
        payload[
            "careers"
        ]
    )

    if search:
        target = normalize_text(
            search
        )

        careers = [
            career
            for career
            in careers
            if (
                target
                in normalize_text(
                    career.get(
                        "name",
                        "",
                    )
                )
                or target
                in normalize_text(
                    career.get(
                        "category",
                        "",
                    )
                )
                or any(
                    target
                    in normalize_text(
                        role
                    )
                    for role
                    in career.get(
                        "common_roles",
                        [],
                    )
                )
            )
        ]

    if category:
        category_target = (
            normalize_text(
                category
            )
        )

        careers = [
            career
            for career
            in careers
            if normalize_text(
                career.get(
                    "category",
                    "",
                )
            )
            == category_target
        ]

    if (
        min_demand_score
        is not None
    ):
        careers = [
            career
            for career
            in careers
            if int(
                career.get(
                    "market_demand",
                    {},
                ).get(
                    "score",
                    0,
                )
                or 0
            )
            >= min_demand_score
        ]

    if sort_by:
        normalized_sort = (
            normalize_text(
                sort_by
            )
        )

        if normalized_sort == "demand":
            careers.sort(
                key=lambda item: int(
                    item.get(
                        "market_demand",
                        {},
                    ).get(
                        "score",
                        0,
                    )
                    or 0
                ),
                reverse=True,
            )

        elif normalized_sort == "opportunity":
            careers.sort(
                key=lambda item: int(
                    item.get(
                        "opportunity_score",
                        0,
                    )
                    or 0
                ),
                reverse=True,
            )

        elif normalized_sort == "name":
            careers.sort(
                key=lambda item:
                    normalize_text(
                        item.get(
                            "name",
                            "",
                        )
                    )
            )

        else:
            raise HTTPException(
                status_code=400,
                detail=(
                    "Invalid sort_by value. "
                    "Use demand, opportunity, or name."
                ),
            )

    if include_metadata:
        return {
            "metadata":
                payload[
                    "metadata"
                ],

            "count":
                len(
                    careers
                ),

            "careers":
                careers,
        }

    return careers


# ============================================================================
# 19. CAREER MARKET DETAIL
# ============================================================================

@app.get(
    "/career-market/{career_name}",
    tags=[
        "Career Market",
    ],
)
def career_market_detail(
    career_name: str,
):
    """
    Return one career by career name or ID.
    """

    career = find_career(
        career_name
    )

    if not career:
        raise HTTPException(
            status_code=404,
            detail=(
                f"Career '{career_name}' was not found."
            ),
        )

    return career


# ============================================================================
# 20. CAREER CATEGORIES
# ============================================================================

@app.get(
    "/career-categories",
    tags=[
        "Career Market",
    ],
)
def career_categories():
    """
    Return all distinct career categories.
    """

    careers = (
        get_career_payload()[
            "careers"
        ]
    )

    categories = sorted(
        {
            career.get(
                "category",
                ""
            ).strip()
            for career
            in careers
            if career.get(
                "category"
            )
        }
    )

    return categories


# ============================================================================
# 21. CAREER REQUIRED SKILLS
# ============================================================================

@app.get(
    "/career-market/{career_name}/skills",
    tags=[
        "Career Market",
    ],
)
def career_required_skills(
    career_name: str,
):
    """
    Return the required skill list for one career.
    """

    career = find_career(
        career_name
    )

    if not career:
        raise HTTPException(
            status_code=404,
            detail=(
                f"Career '{career_name}' was not found."
            ),
        )

    return career.get(
        "required_skills",
        [],
    )


# ============================================================================
# 22. LEARNING RESOURCE LIST
# ============================================================================

@app.get(
    "/learning-resources",
    tags=[
        "Learning Resources",
    ],
)
def learning_resources(
    search: str | None = Query(
        default=None,
        description=
            "Optional skill search.",
    ),

    category: str | None = Query(
        default=None,
        description=
            "Optional learning category filter.",
    ),

    include_metadata: bool = Query(
        default=False,
        description=
            "Return metadata plus resource mapping.",
    ),
):
    """
    Return learning resources.

    Compatibility behavior:
        By default this endpoint returns the resource mapping directly:

        {
            "SQL": {...},
            "Python": {...}
        }
    """

    payload = get_learning_payload()

    resources = dict(
        payload[
            "resources"
        ]
    )

    if search:
        target = normalize_text(
            search
        )

        resources = {
            skill: resource
            for skill, resource
            in resources.items()
            if (
                target
                in normalize_text(
                    skill
                )
                or target
                in normalize_text(
                    resource.get(
                        "description",
                        "",
                    )
                )
            )
        }

    if category:
        category_target = (
            normalize_text(
                category
            )
        )

        resources = {
            skill: resource
            for skill, resource
            in resources.items()
            if normalize_text(
                resource.get(
                    "category",
                    "",
                )
            )
            == category_target
        }

    if include_metadata:
        return {
            "metadata":
                payload[
                    "metadata"
                ],

            "count":
                len(
                    resources
                ),

            "resources":
                resources,
        }

    return resources


# ============================================================================
# 23. LEARNING RESOURCE DETAIL
# ============================================================================

@app.get(
    "/learning-resources/{skill_name}",
    tags=[
        "Learning Resources",
    ],
)
def learning_resource_detail(
    skill_name: str,
):
    """
    Return the complete learning resource for one skill.
    """

    match = (
        find_learning_resource(
            skill_name
        )
    )

    if not match:
        raise HTTPException(
            status_code=404,
            detail=(
                f"Learning resources for '{skill_name}' were not found."
            ),
        )

    canonical_name, resource = (
        match
    )

    return {
        "skill":
            canonical_name,

        **resource,
    }


# ============================================================================
# 24. LEARNING RESOURCE CATEGORIES
# ============================================================================

@app.get(
    "/learning-categories",
    tags=[
        "Learning Resources",
    ],
)
def learning_categories():
    """
    Return distinct learning-resource categories.
    """

    resources = (
        get_learning_payload()[
            "resources"
        ]
    )

    categories = sorted(
        {
            resource.get(
                "category",
                ""
            ).strip()
            for resource
            in resources.values()
            if resource.get(
                "category"
            )
        }
    )

    return categories


# ============================================================================
# 25. AVAILABLE SKILLS
# ============================================================================

@app.get(
    "/skills",
    tags=[
        "Learning Resources",
    ],
)
def available_skills():
    """
    Return all skills available in the learning catalog.
    """

    resources = (
        get_learning_payload()[
            "resources"
        ]
    )

    return sorted(
        resources.keys()
    )


# ============================================================================
# 26. CAREER + LEARNING RESOURCE MATCH
# ============================================================================

@app.get(
    "/career-learning-plan/{career_name}",
    tags=[
        "Career Intelligence",
    ],
)
def career_learning_plan(
    career_name: str,
):
    """
    Return career requirements together with available learning-resource
    coverage.

    This endpoint does not generate a personalized roadmap. It simply
    connects the static career requirements to the learning catalog.
    """

    career = find_career(
        career_name
    )

    if not career:
        raise HTTPException(
            status_code=404,
            detail=(
                f"Career '{career_name}' was not found."
            ),
        )

    learning_payload = (
        get_learning_payload()
    )

    resources = (
        learning_payload[
            "resources"
        ]
    )

    normalized_resource_names = {
        normalize_text(
            skill
        ): (
            skill,
            resource,
        )
        for skill, resource
        in resources.items()
    }

    matched = []

    missing = []

    for required_skill in career.get(
        "required_skills",
        [],
    ):
        skill_name = (
            required_skill.get(
                "name",
                ""
            )
        )

        match = (
            normalized_resource_names.get(
                normalize_text(
                    skill_name
                )
            )
        )

        if match:
            canonical_name, resource = (
                match
            )

            matched.append(
                {
                    "skill":
                        skill_name,

                    "canonical_resource_skill":
                        canonical_name,

                    "required_score":
                        required_skill.get(
                            "required_score"
                        ),

                    "demand_score":
                        required_skill.get(
                            "demand_score"
                        ),

                    "importance":
                        required_skill.get(
                            "importance"
                        ),

                    "learning_resource":
                        resource,
                }
            )

        else:
            missing.append(
                {
                    "skill":
                        skill_name,

                    "required_score":
                        required_skill.get(
                            "required_score"
                        ),

                    "demand_score":
                        required_skill.get(
                            "demand_score"
                        ),

                    "importance":
                        required_skill.get(
                            "importance"
                        ),
                }
            )

    return {
        "career": {
            "id":
                career.get(
                    "id"
                ),

            "name":
                career.get(
                    "name"
                ),

            "category":
                career.get(
                    "category"
                ),
        },

        "required_skill_count":
            len(
                career.get(
                    "required_skills",
                    [],
                )
            ),

        "resource_coverage_count":
            len(
                matched
            ),

        "matched_resources":
            matched,

        "missing_resources":
            missing,
    }


# ============================================================================
# 27. FUTURE API ROUTER PLACEHOLDER
# ============================================================================

def register_future_routers() -> None:
    """
    This function intentionally contains no router imports yet.

    As NEXTPATH moves from LocalStorage to a real database, add routers such
    as:

        from app.routers.auth import router as auth_router
        from app.routers.profile import router as profile_router
        from app.routers.assessments import router as assessment_router
        from app.routers.roadmaps import router as roadmap_router
        from app.routers.projects import router as project_router
        from app.routers.credentials import router as credential_router

        app.include_router(auth_router, prefix="/api/auth")
        app.include_router(profile_router, prefix="/api/profile")
        ...

    Keeping router registration centralized will prevent main.py from
    becoming responsible for all business logic.
    """

    return None


register_future_routers()


# ============================================================================
# 28. DEVELOPMENT ENTRY POINT
# ============================================================================

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "app.main:app",
        host="127.0.0.1",
        port=8000,
        reload=True,
    )
