from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import engine
from . import models

from .career_data import (
    load_career_market,
    load_learning_resources,
)


models.Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="NEXTPATH API",
    description="NEXTPATH Career Intelligence Platform",
    version="1.0.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[],
    allow_origin_regex=r"http://(localhost|127\.0\.0\.1):\d+",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "message": "NEXTPATH backend is working"
    }


@app.get("/health")
def health():
    return {
        "status": "success"
    }


@app.get("/career-market")
def career_market():
    careers = load_career_market()

    return {
        "success": True,
        "count": len(careers),
        "careers": careers,
    }


@app.get("/career-market/{career_name}")
def career_by_name(career_name: str):
    careers = load_career_market()

    for career in careers:

        if (
            career.get("career", "").lower()
            ==
            career_name.lower()
        ):
            return {
                "success": True,
                "career": career,
            }

    return {
        "success": False,
        "message": "Career not found",
    }


@app.get("/learning-resources")
def learning_resources():
    resources = load_learning_resources()

    return {
        "success": True,
        "resources": resources,
    }


@app.get("/learning-resources/{skill_name}")
def learning_resource(skill_name: str):
    resources = load_learning_resources()

    for resource in resources:

        if (
            resource.get("skill", "").lower()
            ==
            skill_name.lower()
        ):
            return {
                "success": True,
                "resource": resource,
            }

    return {
        "success": False,
        "resource": None,
    }