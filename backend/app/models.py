"""
NEXTPATH SQLAlchemy Models
==========================

File location:
    backend/app/models.py

This module defines the persistent database structure for the NEXTPATH
Career Intelligence & Workforce Readiness Platform.

It is designed to work with the database.py file already used by NEXTPATH.

Main entities:
- User
- Profile
- Education
- Achievement
- ProfileSkill
- TargetCareer
- AssessmentAttempt
- AssessmentSkillScore
- SkillGap
- Roadmap
- RoadmapSkill
- RoadmapTopic
- Project
- ProjectSkill
- VerifiedSkill
- Credential
- Notification

Important design notes:
- Passwords are never stored in plaintext. Only hashed_password is stored.
- Static career-market and learning-resource data remain in JSON files for now.
- User-specific progress, assessments, projects, credentials, and profile data
  are stored in the database.
- Skill names and career names are stored as snapshots so historical records
  remain understandable even if the static JSON catalog changes later.
"""

from __future__ import annotations

from datetime import date, datetime, timezone
from typing import Any, Optional

from sqlalchemy import (
    Boolean,
    CheckConstraint,
    Date,
    DateTime,
    Float,
    ForeignKey,
    Index,
    Integer,
    JSON,
    String,
    Text,
    UniqueConstraint,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


# ============================================================================
# 01. COMMON HELPERS
# ============================================================================

def utc_now() -> datetime:
    """
    Return a timezone-aware UTC timestamp.
    """
    return datetime.now(timezone.utc)


# ============================================================================
# 02. USER
# ============================================================================

class User(Base):
    """
    Main NEXTPATH account.

    Authentication-related fields live here.
    Personal career-profile details live in Profile.
    """

    __tablename__ = "users"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True,
    )

    full_name: Mapped[str] = mapped_column(
        String(150),
        nullable=False,
    )

    email: Mapped[str] = mapped_column(
        String(320),
        nullable=False,
        unique=True,
        index=True,
    )

    hashed_password: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    career_stage: Mapped[Optional[str]] = mapped_column(
        String(100),
        nullable=True,
    )

    study_field: Mapped[Optional[str]] = mapped_column(
        String(150),
        nullable=True,
    )

    preferred_career: Mapped[Optional[str]] = mapped_column(
        String(150),
        nullable=True,
    )

    is_active: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=True,
    )

    is_verified: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=False,
    )

    is_admin: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=False,
    )

    last_login_at: Mapped[Optional[datetime]] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        default=utc_now,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        default=utc_now,
        onupdate=utc_now,
    )

    profile: Mapped[Optional["Profile"]] = relationship(
        back_populates="user",
        cascade="all, delete-orphan",
        uselist=False,
        passive_deletes=True,
    )

    education_records: Mapped[list["Education"]] = relationship(
        back_populates="user",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )

    achievements: Mapped[list["Achievement"]] = relationship(
        back_populates="user",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )

    profile_skills: Mapped[list["ProfileSkill"]] = relationship(
        back_populates="user",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )

    target_career: Mapped[Optional["TargetCareer"]] = relationship(
        back_populates="user",
        cascade="all, delete-orphan",
        uselist=False,
        passive_deletes=True,
    )

    assessment_attempts: Mapped[list["AssessmentAttempt"]] = relationship(
        back_populates="user",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )

    skill_gaps: Mapped[list["SkillGap"]] = relationship(
        back_populates="user",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )

    roadmaps: Mapped[list["Roadmap"]] = relationship(
        back_populates="user",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )

    projects: Mapped[list["Project"]] = relationship(
        back_populates="user",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )

    verified_skills: Mapped[list["VerifiedSkill"]] = relationship(
        back_populates="user",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )

    credentials: Mapped[list["Credential"]] = relationship(
        back_populates="user",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )

    notifications: Mapped[list["Notification"]] = relationship(
        back_populates="user",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )

    def __repr__(self) -> str:
        return (
            f"<User id={self.id} "
            f"email={self.email!r}>"
        )


# ============================================================================
# 03. PROFILE
# ============================================================================

class Profile(Base):
    """
    Extended personal and professional profile.
    """

    __tablename__ = "profiles"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True,
    )

    user_id: Mapped[int] = mapped_column(
        ForeignKey(
            "users.id",
            ondelete="CASCADE",
        ),
        nullable=False,
        unique=True,
        index=True,
    )

    headline: Mapped[Optional[str]] = mapped_column(
        String(200),
        nullable=True,
    )

    phone: Mapped[Optional[str]] = mapped_column(
        String(40),
        nullable=True,
    )

    city: Mapped[Optional[str]] = mapped_column(
        String(120),
        nullable=True,
    )

    state: Mapped[Optional[str]] = mapped_column(
        String(120),
        nullable=True,
    )

    country: Mapped[Optional[str]] = mapped_column(
        String(120),
        nullable=True,
    )

    date_of_birth: Mapped[Optional[date]] = mapped_column(
        Date,
        nullable=True,
    )

    nationality: Mapped[Optional[str]] = mapped_column(
        String(100),
        nullable=True,
    )

    gender: Mapped[Optional[str]] = mapped_column(
        String(50),
        nullable=True,
    )

    languages: Mapped[list[Any]] = mapped_column(
        JSON,
        nullable=False,
        default=list,
    )

    bio: Mapped[Optional[str]] = mapped_column(
        Text,
        nullable=True,
    )

    career_objective: Mapped[Optional[str]] = mapped_column(
        Text,
        nullable=True,
    )

    interests: Mapped[list[Any]] = mapped_column(
        JSON,
        nullable=False,
        default=list,
    )

    profile_photo_url: Mapped[Optional[str]] = mapped_column(
        Text,
        nullable=True,
    )

    linkedin_url: Mapped[Optional[str]] = mapped_column(
        Text,
        nullable=True,
    )

    github_url: Mapped[Optional[str]] = mapped_column(
        Text,
        nullable=True,
    )

    portfolio_url: Mapped[Optional[str]] = mapped_column(
        Text,
        nullable=True,
    )

    website_url: Mapped[Optional[str]] = mapped_column(
        Text,
        nullable=True,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        default=utc_now,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        default=utc_now,
        onupdate=utc_now,
    )

    user: Mapped["User"] = relationship(
        back_populates="profile",
    )


# ============================================================================
# 04. EDUCATION
# ============================================================================

class Education(Base):
    """
    One education record belonging to a user.
    """

    __tablename__ = "education"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True,
    )

    user_id: Mapped[int] = mapped_column(
        ForeignKey(
            "users.id",
            ondelete="CASCADE",
        ),
        nullable=False,
        index=True,
    )

    institution: Mapped[str] = mapped_column(
        String(220),
        nullable=False,
    )

    degree: Mapped[Optional[str]] = mapped_column(
        String(180),
        nullable=True,
    )

    field_of_study: Mapped[Optional[str]] = mapped_column(
        String(180),
        nullable=True,
    )

    grade: Mapped[Optional[str]] = mapped_column(
        String(80),
        nullable=True,
    )

    start_year: Mapped[Optional[int]] = mapped_column(
        Integer,
        nullable=True,
    )

    end_year: Mapped[Optional[int]] = mapped_column(
        Integer,
        nullable=True,
    )

    is_current: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=False,
    )

    description: Mapped[Optional[str]] = mapped_column(
        Text,
        nullable=True,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        default=utc_now,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        default=utc_now,
        onupdate=utc_now,
    )

    user: Mapped["User"] = relationship(
        back_populates="education_records",
    )

    __table_args__ = (
        CheckConstraint(
            "start_year IS NULL OR start_year >= 1900",
            name="ck_education_start_year",
        ),
        CheckConstraint(
            "end_year IS NULL OR end_year >= 1900",
            name="ck_education_end_year",
        ),
    )


# ============================================================================
# 05. ACHIEVEMENT
# ============================================================================

class Achievement(Base):
    """
    User achievement, certificate, competition, award, publication,
    leadership achievement, etc.
    """

    __tablename__ = "achievements"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True,
    )

    user_id: Mapped[int] = mapped_column(
        ForeignKey(
            "users.id",
            ondelete="CASCADE",
        ),
        nullable=False,
        index=True,
    )

    title: Mapped[str] = mapped_column(
        String(220),
        nullable=False,
    )

    organization: Mapped[Optional[str]] = mapped_column(
        String(220),
        nullable=True,
    )

    achievement_date: Mapped[Optional[date]] = mapped_column(
        Date,
        nullable=True,
    )

    description: Mapped[Optional[str]] = mapped_column(
        Text,
        nullable=True,
    )

    evidence_url: Mapped[Optional[str]] = mapped_column(
        Text,
        nullable=True,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        default=utc_now,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        default=utc_now,
        onupdate=utc_now,
    )

    user: Mapped["User"] = relationship(
        back_populates="achievements",
    )


# ============================================================================
# 06. PROFILE SKILL
# ============================================================================

class ProfileSkill(Base):
    """
    Skill manually added to the user's profile.

    Important:
    confidence_score is self-reported.
    demonstrated_score must come from assessment evidence.
    """

    __tablename__ = "profile_skills"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True,
    )

    user_id: Mapped[int] = mapped_column(
        ForeignKey(
            "users.id",
            ondelete="CASCADE",
        ),
        nullable=False,
        index=True,
    )

    skill_name: Mapped[str] = mapped_column(
        String(150),
        nullable=False,
    )

    confidence_score: Mapped[Optional[float]] = mapped_column(
        Float,
        nullable=True,
    )

    demonstrated_score: Mapped[Optional[float]] = mapped_column(
        Float,
        nullable=True,
    )

    source: Mapped[str] = mapped_column(
        String(60),
        nullable=False,
        default="manual",
    )

    notes: Mapped[Optional[str]] = mapped_column(
        Text,
        nullable=True,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        default=utc_now,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        default=utc_now,
        onupdate=utc_now,
    )

    user: Mapped["User"] = relationship(
        back_populates="profile_skills",
    )

    __table_args__ = (
        UniqueConstraint(
            "user_id",
            "skill_name",
            name="uq_profile_skill_user_skill",
        ),
        CheckConstraint(
            "confidence_score IS NULL OR "
            "(confidence_score >= 0 AND confidence_score <= 10)",
            name="ck_profile_skill_confidence",
        ),
        CheckConstraint(
            "demonstrated_score IS NULL OR "
            "(demonstrated_score >= 0 AND demonstrated_score <= 10)",
            name="ck_profile_skill_demonstrated",
        ),
    )


# ============================================================================
# 07. TARGET CAREER
# ============================================================================

class TargetCareer(Base):
    """
    The user's currently selected target career.

    career_name and career_id reference the static career_market.json catalog.
    A snapshot is retained so user history remains meaningful.
    """

    __tablename__ = "target_careers"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True,
    )

    user_id: Mapped[int] = mapped_column(
        ForeignKey(
            "users.id",
            ondelete="CASCADE",
        ),
        nullable=False,
        unique=True,
        index=True,
    )

    career_id: Mapped[Optional[str]] = mapped_column(
        String(120),
        nullable=True,
    )

    career_name: Mapped[str] = mapped_column(
        String(180),
        nullable=False,
    )

    category: Mapped[Optional[str]] = mapped_column(
        String(160),
        nullable=True,
    )

    market_demand_score: Mapped[Optional[float]] = mapped_column(
        Float,
        nullable=True,
    )

    opportunity_score: Mapped[Optional[float]] = mapped_column(
        Float,
        nullable=True,
    )

    required_skills_snapshot: Mapped[list[Any]] = mapped_column(
        JSON,
        nullable=False,
        default=list,
    )

    selected_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        default=utc_now,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        default=utc_now,
        onupdate=utc_now,
    )

    user: Mapped["User"] = relationship(
        back_populates="target_career",
    )

    __table_args__ = (
        CheckConstraint(
            "market_demand_score IS NULL OR "
            "(market_demand_score >= 0 AND market_demand_score <= 100)",
            name="ck_target_career_market_demand",
        ),
        CheckConstraint(
            "opportunity_score IS NULL OR "
            "(opportunity_score >= 0 AND opportunity_score <= 100)",
            name="ck_target_career_opportunity",
        ),
    )


# ============================================================================
# 08. ASSESSMENT ATTEMPT
# ============================================================================

class AssessmentAttempt(Base):
    """
    One initial assessment or reassessment attempt.

    mode:
        initial
        reassessment

    status:
        in_progress
        submitted
        evaluated
    """

    __tablename__ = "assessment_attempts"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True,
    )

    user_id: Mapped[int] = mapped_column(
        ForeignKey(
            "users.id",
            ondelete="CASCADE",
        ),
        nullable=False,
        index=True,
    )

    mode: Mapped[str] = mapped_column(
        String(40),
        nullable=False,
        default="initial",
    )

    status: Mapped[str] = mapped_column(
        String(40),
        nullable=False,
        default="in_progress",
    )

    career_name: Mapped[Optional[str]] = mapped_column(
        String(180),
        nullable=True,
    )

    selected_skills_snapshot: Mapped[list[Any]] = mapped_column(
        JSON,
        nullable=False,
        default=list,
    )

    quiz_weight: Mapped[float] = mapped_column(
        Float,
        nullable=False,
        default=0.20,
    )

    problem_weight: Mapped[float] = mapped_column(
        Float,
        nullable=False,
        default=0.25,
    )

    coding_weight: Mapped[float] = mapped_column(
        Float,
        nullable=False,
        default=0.35,
    )

    project_weight: Mapped[float] = mapped_column(
        Float,
        nullable=False,
        default=0.20,
    )

    overall_score: Mapped[Optional[float]] = mapped_column(
        Float,
        nullable=True,
    )

    raw_answers: Mapped[dict[str, Any]] = mapped_column(
        JSON,
        nullable=False,
        default=dict,
    )

    started_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        default=utc_now,
    )

    submitted_at: Mapped[Optional[datetime]] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )

    evaluated_at: Mapped[Optional[datetime]] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )

    user: Mapped["User"] = relationship(
        back_populates="assessment_attempts",
    )

    skill_scores: Mapped[list["AssessmentSkillScore"]] = relationship(
        back_populates="assessment",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )

    __table_args__ = (
        CheckConstraint(
            "overall_score IS NULL OR "
            "(overall_score >= 0 AND overall_score <= 10)",
            name="ck_assessment_overall_score",
        ),
        Index(
            "ix_assessment_user_mode",
            "user_id",
            "mode",
        ),
    )


# ============================================================================
# 09. ASSESSMENT SKILL SCORE
# ============================================================================

class AssessmentSkillScore(Base):
    """
    Per-skill result generated from an assessment attempt.
    """

    __tablename__ = "assessment_skill_scores"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True,
    )

    assessment_id: Mapped[int] = mapped_column(
        ForeignKey(
            "assessment_attempts.id",
            ondelete="CASCADE",
        ),
        nullable=False,
        index=True,
    )

    skill_name: Mapped[str] = mapped_column(
        String(150),
        nullable=False,
    )

    quiz_score: Mapped[float] = mapped_column(
        Float,
        nullable=False,
        default=0.0,
    )

    problem_score: Mapped[float] = mapped_column(
        Float,
        nullable=False,
        default=0.0,
    )

    coding_score: Mapped[float] = mapped_column(
        Float,
        nullable=False,
        default=0.0,
    )

    project_score: Mapped[float] = mapped_column(
        Float,
        nullable=False,
        default=0.0,
    )

    final_score: Mapped[float] = mapped_column(
        Float,
        nullable=False,
        default=0.0,
    )

    required_score: Mapped[Optional[float]] = mapped_column(
        Float,
        nullable=True,
    )

    passed: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=False,
    )

    feedback: Mapped[Optional[str]] = mapped_column(
        Text,
        nullable=True,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        default=utc_now,
    )

    assessment: Mapped["AssessmentAttempt"] = relationship(
        back_populates="skill_scores",
    )

    __table_args__ = (
        UniqueConstraint(
            "assessment_id",
            "skill_name",
            name="uq_assessment_skill_score",
        ),
        CheckConstraint(
            "quiz_score >= 0 AND quiz_score <= 10",
            name="ck_assessment_skill_quiz",
        ),
        CheckConstraint(
            "problem_score >= 0 AND problem_score <= 10",
            name="ck_assessment_skill_problem",
        ),
        CheckConstraint(
            "coding_score >= 0 AND coding_score <= 10",
            name="ck_assessment_skill_coding",
        ),
        CheckConstraint(
            "project_score >= 0 AND project_score <= 10",
            name="ck_assessment_skill_project",
        ),
        CheckConstraint(
            "final_score >= 0 AND final_score <= 10",
            name="ck_assessment_skill_final",
        ),
    )


# ============================================================================
# 10. SKILL GAP
# ============================================================================

class SkillGap(Base):
    """
    Current career skill gap for a user.

    NEXTPATH rule:
        gap_score = max(0, required_score - demonstrated_score)

        gap_percentage =
            max(0, min(100, gap_score / required_score * 100))

    For a required skill with no assessment evidence:
        demonstrated_score = 0
    """

    __tablename__ = "skill_gaps"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True,
    )

    user_id: Mapped[int] = mapped_column(
        ForeignKey(
            "users.id",
            ondelete="CASCADE",
        ),
        nullable=False,
        index=True,
    )

    career_name: Mapped[str] = mapped_column(
        String(180),
        nullable=False,
    )

    skill_name: Mapped[str] = mapped_column(
        String(150),
        nullable=False,
    )

    required_score: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    demonstrated_score: Mapped[float] = mapped_column(
        Float,
        nullable=False,
        default=0.0,
    )

    gap_score: Mapped[float] = mapped_column(
        Float,
        nullable=False,
        default=0.0,
    )

    gap_percentage: Mapped[float] = mapped_column(
        Float,
        nullable=False,
        default=0.0,
    )

    demand_score: Mapped[Optional[float]] = mapped_column(
        Float,
        nullable=True,
    )

    importance: Mapped[Optional[str]] = mapped_column(
        String(50),
        nullable=True,
    )

    priority_score: Mapped[Optional[float]] = mapped_column(
        Float,
        nullable=True,
    )

    is_verified: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=False,
    )

    calculated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        default=utc_now,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        default=utc_now,
        onupdate=utc_now,
    )

    user: Mapped["User"] = relationship(
        back_populates="skill_gaps",
    )

    __table_args__ = (
        UniqueConstraint(
            "user_id",
            "career_name",
            "skill_name",
            name="uq_skill_gap_user_career_skill",
        ),
        CheckConstraint(
            "required_score >= 0 AND required_score <= 10",
            name="ck_skill_gap_required",
        ),
        CheckConstraint(
            "demonstrated_score >= 0 AND demonstrated_score <= 10",
            name="ck_skill_gap_demonstrated",
        ),
        CheckConstraint(
            "gap_score >= 0 AND gap_score <= 10",
            name="ck_skill_gap_score",
        ),
        CheckConstraint(
            "gap_percentage >= 0 AND gap_percentage <= 100",
            name="ck_skill_gap_percentage",
        ),
    )


# ============================================================================
# 11. ROADMAP
# ============================================================================

class Roadmap(Base):
    """
    One personalized roadmap generated for a user.
    """

    __tablename__ = "roadmaps"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True,
    )

    user_id: Mapped[int] = mapped_column(
        ForeignKey(
            "users.id",
            ondelete="CASCADE",
        ),
        nullable=False,
        index=True,
    )

    career_name: Mapped[str] = mapped_column(
        String(180),
        nullable=False,
    )

    duration_months: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )

    weekly_hours: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )

    total_capacity_hours: Mapped[Optional[float]] = mapped_column(
        Float,
        nullable=True,
    )

    status: Mapped[str] = mapped_column(
        String(40),
        nullable=False,
        default="active",
    )

    is_current: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=True,
    )

    generated_from_gap_snapshot: Mapped[list[Any]] = mapped_column(
        JSON,
        nullable=False,
        default=list,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        default=utc_now,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        default=utc_now,
        onupdate=utc_now,
    )

    user: Mapped["User"] = relationship(
        back_populates="roadmaps",
    )

    skill_items: Mapped[list["RoadmapSkill"]] = relationship(
        back_populates="roadmap",
        cascade="all, delete-orphan",
        passive_deletes=True,
        order_by="RoadmapSkill.rank",
    )

    __table_args__ = (
        CheckConstraint(
            "duration_months > 0",
            name="ck_roadmap_duration_positive",
        ),
        CheckConstraint(
            "weekly_hours > 0",
            name="ck_roadmap_weekly_hours_positive",
        ),
        Index(
            "ix_roadmap_user_current",
            "user_id",
            "is_current",
        ),
    )


# ============================================================================
# 12. ROADMAP SKILL
# ============================================================================

class RoadmapSkill(Base):
    """
    One skill section inside a roadmap.
    """

    __tablename__ = "roadmap_skills"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True,
    )

    roadmap_id: Mapped[int] = mapped_column(
        ForeignKey(
            "roadmaps.id",
            ondelete="CASCADE",
        ),
        nullable=False,
        index=True,
    )

    skill_name: Mapped[str] = mapped_column(
        String(150),
        nullable=False,
    )

    rank: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=1,
    )

    phase: Mapped[Optional[str]] = mapped_column(
        String(100),
        nullable=True,
    )

    intensity: Mapped[Optional[str]] = mapped_column(
        String(60),
        nullable=True,
    )

    demonstrated_score: Mapped[float] = mapped_column(
        Float,
        nullable=False,
        default=0.0,
    )

    required_score: Mapped[float] = mapped_column(
        Float,
        nullable=False,
        default=0.0,
    )

    gap_percentage: Mapped[float] = mapped_column(
        Float,
        nullable=False,
        default=0.0,
    )

    priority_score: Mapped[float] = mapped_column(
        Float,
        nullable=False,
        default=0.0,
    )

    demand_score: Mapped[float] = mapped_column(
        Float,
        nullable=False,
        default=0.0,
    )

    estimated_hours: Mapped[float] = mapped_column(
        Float,
        nullable=False,
        default=0.0,
    )

    estimated_weeks: Mapped[float] = mapped_column(
        Float,
        nullable=False,
        default=0.0,
    )

    start_week: Mapped[Optional[int]] = mapped_column(
        Integer,
        nullable=True,
    )

    end_week: Mapped[Optional[int]] = mapped_column(
        Integer,
        nullable=True,
    )

    free_resources_snapshot: Mapped[list[Any]] = mapped_column(
        JSON,
        nullable=False,
        default=list,
    )

    practice_resources_snapshot: Mapped[list[Any]] = mapped_column(
        JSON,
        nullable=False,
        default=list,
    )

    paid_resources_snapshot: Mapped[list[Any]] = mapped_column(
        JSON,
        nullable=False,
        default=list,
    )

    project_snapshot: Mapped[dict[str, Any]] = mapped_column(
        JSON,
        nullable=False,
        default=dict,
    )

    reassessment_ready: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=False,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        default=utc_now,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        default=utc_now,
        onupdate=utc_now,
    )

    roadmap: Mapped["Roadmap"] = relationship(
        back_populates="skill_items",
    )

    topics: Mapped[list["RoadmapTopic"]] = relationship(
        back_populates="roadmap_skill",
        cascade="all, delete-orphan",
        passive_deletes=True,
        order_by="RoadmapTopic.position",
    )

    __table_args__ = (
        UniqueConstraint(
            "roadmap_id",
            "skill_name",
            name="uq_roadmap_skill",
        ),
        CheckConstraint(
            "gap_percentage >= 0 AND gap_percentage <= 100",
            name="ck_roadmap_skill_gap_percentage",
        ),
    )


# ============================================================================
# 13. ROADMAP TOPIC
# ============================================================================

class RoadmapTopic(Base):
    """
    Trackable learning topic inside one roadmap skill.
    """

    __tablename__ = "roadmap_topics"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True,
    )

    roadmap_skill_id: Mapped[int] = mapped_column(
        ForeignKey(
            "roadmap_skills.id",
            ondelete="CASCADE",
        ),
        nullable=False,
        index=True,
    )

    topic_key: Mapped[str] = mapped_column(
        String(180),
        nullable=False,
    )

    title: Mapped[str] = mapped_column(
        String(250),
        nullable=False,
    )

    position: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=1,
    )

    estimated_hours: Mapped[float] = mapped_column(
        Float,
        nullable=False,
        default=0.0,
    )

    completed: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=False,
    )

    completed_at: Mapped[Optional[datetime]] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )

    notes: Mapped[Optional[str]] = mapped_column(
        Text,
        nullable=True,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        default=utc_now,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        default=utc_now,
        onupdate=utc_now,
    )

    roadmap_skill: Mapped["RoadmapSkill"] = relationship(
        back_populates="topics",
    )

    __table_args__ = (
        UniqueConstraint(
            "roadmap_skill_id",
            "topic_key",
            name="uq_roadmap_topic_key",
        ),
    )


# ============================================================================
# 14. PROJECT
# ============================================================================

class Project(Base):
    """
    Portfolio project created by the user or generated from a roadmap.
    """

    __tablename__ = "projects"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True,
    )

    user_id: Mapped[int] = mapped_column(
        ForeignKey(
            "users.id",
            ondelete="CASCADE",
        ),
        nullable=False,
        index=True,
    )

    title: Mapped[str] = mapped_column(
        String(250),
        nullable=False,
    )

    source: Mapped[str] = mapped_column(
        String(60),
        nullable=False,
        default="custom",
    )

    status: Mapped[str] = mapped_column(
        String(60),
        nullable=False,
        default="planned",
    )

    description: Mapped[Optional[str]] = mapped_column(
        Text,
        nullable=True,
    )

    problem: Mapped[Optional[str]] = mapped_column(
        Text,
        nullable=True,
    )

    implementation: Mapped[Optional[str]] = mapped_column(
        Text,
        nullable=True,
    )

    result: Mapped[Optional[str]] = mapped_column(
        Text,
        nullable=True,
    )

    evidence: Mapped[Optional[str]] = mapped_column(
        Text,
        nullable=True,
    )

    repository_url: Mapped[Optional[str]] = mapped_column(
        Text,
        nullable=True,
    )

    demo_url: Mapped[Optional[str]] = mapped_column(
        Text,
        nullable=True,
    )

    image_url: Mapped[Optional[str]] = mapped_column(
        Text,
        nullable=True,
    )

    completion_percentage: Mapped[float] = mapped_column(
        Float,
        nullable=False,
        default=0.0,
    )

    portfolio_ready: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=False,
    )

    started_at: Mapped[Optional[date]] = mapped_column(
        Date,
        nullable=True,
    )

    completed_at: Mapped[Optional[date]] = mapped_column(
        Date,
        nullable=True,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        default=utc_now,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        default=utc_now,
        onupdate=utc_now,
    )

    user: Mapped["User"] = relationship(
        back_populates="projects",
    )

    skills: Mapped[list["ProjectSkill"]] = relationship(
        back_populates="project",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )

    __table_args__ = (
        CheckConstraint(
            "completion_percentage >= 0 AND completion_percentage <= 100",
            name="ck_project_completion_percentage",
        ),
        Index(
            "ix_project_user_status",
            "user_id",
            "status",
        ),
    )


# ============================================================================
# 15. PROJECT SKILL
# ============================================================================

class ProjectSkill(Base):
    """
    Skill evidence attached to a project.
    """

    __tablename__ = "project_skills"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True,
    )

    project_id: Mapped[int] = mapped_column(
        ForeignKey(
            "projects.id",
            ondelete="CASCADE",
        ),
        nullable=False,
        index=True,
    )

    skill_name: Mapped[str] = mapped_column(
        String(150),
        nullable=False,
    )

    evidence_strength: Mapped[Optional[float]] = mapped_column(
        Float,
        nullable=True,
    )

    project: Mapped["Project"] = relationship(
        back_populates="skills",
    )

    __table_args__ = (
        UniqueConstraint(
            "project_id",
            "skill_name",
            name="uq_project_skill",
        ),
        CheckConstraint(
            "evidence_strength IS NULL OR "
            "(evidence_strength >= 0 AND evidence_strength <= 10)",
            name="ck_project_skill_evidence_strength",
        ),
    )


# ============================================================================
# 16. VERIFIED SKILL
# ============================================================================

class VerifiedSkill(Base):
    """
    Skill verified through a successful NEXTPATH reassessment.

    NEXTPATH project verification is not external accreditation.
    """

    __tablename__ = "verified_skills"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True,
    )

    user_id: Mapped[int] = mapped_column(
        ForeignKey(
            "users.id",
            ondelete="CASCADE",
        ),
        nullable=False,
        index=True,
    )

    skill_name: Mapped[str] = mapped_column(
        String(150),
        nullable=False,
    )

    career_name: Mapped[Optional[str]] = mapped_column(
        String(180),
        nullable=True,
    )

    score: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    required_score: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    verification_source: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
        default="NEXTPATH Project Reassessment",
    )

    assessment_id: Mapped[Optional[int]] = mapped_column(
        ForeignKey(
            "assessment_attempts.id",
            ondelete="SET NULL",
        ),
        nullable=True,
    )

    verified_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        default=utc_now,
    )

    user: Mapped["User"] = relationship(
        back_populates="verified_skills",
    )

    __table_args__ = (
        UniqueConstraint(
            "user_id",
            "skill_name",
            "career_name",
            name="uq_verified_skill_user_skill_career",
        ),
        CheckConstraint(
            "score >= 0 AND score <= 10",
            name="ck_verified_skill_score",
        ),
        CheckConstraint(
            "required_score >= 0 AND required_score <= 10",
            name="ck_verified_skill_required",
        ),
    )


# ============================================================================
# 17. CREDENTIAL
# ============================================================================

class Credential(Base):
    """
    NEXTPATH project-issued credential record.

    This should be clearly described in the UI as a NEXTPATH project
    verification credential rather than external accreditation.
    """

    __tablename__ = "credentials"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True,
    )

    user_id: Mapped[int] = mapped_column(
        ForeignKey(
            "users.id",
            ondelete="CASCADE",
        ),
        nullable=False,
        index=True,
    )

    credential_code: Mapped[str] = mapped_column(
        String(120),
        nullable=False,
        unique=True,
        index=True,
    )

    title: Mapped[str] = mapped_column(
        String(240),
        nullable=False,
    )

    skill_name: Mapped[str] = mapped_column(
        String(150),
        nullable=False,
    )

    career_name: Mapped[Optional[str]] = mapped_column(
        String(180),
        nullable=True,
    )

    score: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    required_score: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    issuer: Mapped[str] = mapped_column(
        String(160),
        nullable=False,
        default="NEXTPATH Project",
    )

    credential_type: Mapped[str] = mapped_column(
        String(160),
        nullable=False,
        default="Project Skill Verification",
    )

    issued_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        default=utc_now,
    )

    verification_url: Mapped[Optional[str]] = mapped_column(
        Text,
        nullable=True,
    )

    metadata_json: Mapped[dict[str, Any]] = mapped_column(
        JSON,
        nullable=False,
        default=dict,
    )

    user: Mapped["User"] = relationship(
        back_populates="credentials",
    )

    __table_args__ = (
        CheckConstraint(
            "score >= 0 AND score <= 10",
            name="ck_credential_score",
        ),
        CheckConstraint(
            "required_score >= 0 AND required_score <= 10",
            name="ck_credential_required_score",
        ),
    )


# ============================================================================
# 18. NOTIFICATION
# ============================================================================

class Notification(Base):
    """
    In-app notification for a NEXTPATH user.
    """

    __tablename__ = "notifications"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True,
    )

    user_id: Mapped[int] = mapped_column(
        ForeignKey(
            "users.id",
            ondelete="CASCADE",
        ),
        nullable=False,
        index=True,
    )

    notification_type: Mapped[str] = mapped_column(
        String(80),
        nullable=False,
        default="info",
    )

    title: Mapped[str] = mapped_column(
        String(220),
        nullable=False,
    )

    message: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    action_url: Mapped[Optional[str]] = mapped_column(
        Text,
        nullable=True,
    )

    is_read: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=False,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        default=utc_now,
    )

    read_at: Mapped[Optional[datetime]] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )

    user: Mapped["User"] = relationship(
        back_populates="notifications",
    )

    __table_args__ = (
        Index(
            "ix_notification_user_read",
            "user_id",
            "is_read",
        ),
    )


# ============================================================================
# 19. MODEL EXPORTS
# ============================================================================

__all__ = [
    "User",
    "Profile",
    "Education",
    "Achievement",
    "ProfileSkill",
    "TargetCareer",
    "AssessmentAttempt",
    "AssessmentSkillScore",
    "SkillGap",
    "Roadmap",
    "RoadmapSkill",
    "RoadmapTopic",
    "Project",
    "ProjectSkill",
    "VerifiedSkill",
    "Credential",
    "Notification",
]
