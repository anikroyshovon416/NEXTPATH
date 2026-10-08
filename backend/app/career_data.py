import json
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data"

CAREER_FILE = DATA_DIR / "career_market.json"
RESOURCE_FILE = DATA_DIR / "learning_resources.json"


def read_json(path):
    if not path.exists():
        return []

    with open(
        path,
        "r",
        encoding="utf-8"
    ) as file:
        return json.load(file)


def load_career_market():
    return read_json(CAREER_FILE)


def load_learning_resources():
    return read_json(RESOURCE_FILE)