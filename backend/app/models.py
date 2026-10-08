from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship

from .database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        String,
        unique=True,
        index=True,
        nullable=False
    )

    full_name = Column(
        String,
        nullable=False
    )

    email = Column(
        String,
        unique=True,
        index=True,
        nullable=False
    )

    password_hash = Column(
        String,
        nullable=False
    )


class Career(Base):
    __tablename__ = "careers"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    name = Column(
        String,
        unique=True,
        index=True
    )

    description = Column(String)

    salary_range = Column(String)

    demand = Column(String)

    required_skills = relationship(
        "CareerSkill",
        back_populates="career",
        cascade="all, delete-orphan"
    )


class Skill(Base):
    __tablename__ = "skills"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    name = Column(
        String,
        unique=True,
        index=True
    )

    careers = relationship(
        "CareerSkill",
        back_populates="skill"
    )


class CareerSkill(Base):
    __tablename__ = "career_skills"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    career_id = Column(
        Integer,
        ForeignKey("careers.id")
    )

    skill_id = Column(
        Integer,
        ForeignKey("skills.id")
    )

    required_score = Column(Float)

    career = relationship(
        "Career",
        back_populates="required_skills"
    )

    skill = relationship(
        "Skill",
        back_populates="careers"
    )