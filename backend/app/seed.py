from .database import SessionLocal, engine
from .models import Base, Career, Skill, CareerSkill


Base.metadata.create_all(bind=engine)


def seed_database():

    db = SessionLocal()

    try:

        # ----------------------------
        # CAREERS
        # ----------------------------

        data_analyst = Career(
            name="Data Analyst",
            description=(
                "Analyzes data, builds reports and dashboards, "
                "and supports business decisions."
            ),
            salary_range="₹4 LPA - ₹12 LPA",
            demand="High"
        )

        business_analyst = Career(
            name="Business Analyst",
            description=(
                "Studies business problems and requirements "
                "to improve processes and decision making."
            ),
            salary_range="₹4 LPA - ₹14 LPA",
            demand="High"
        )

        data_scientist = Career(
            name="Data Scientist",
            description=(
                "Uses statistics, programming, and machine learning "
                "to solve complex data problems."
            ),
            salary_range="₹6 LPA - ₹18 LPA",
            demand="High"
        )

        data_engineer = Career(
            name="Data Engineer",
            description=(
                "Builds data pipelines and manages "
                "large-scale data systems."
            ),
            salary_range="₹6 LPA - ₹18 LPA",
            demand="High"
        )

        ml_engineer = Career(
            name="Machine Learning Engineer",
            description=(
                "Builds, trains, and deploys "
                "machine learning systems."
            ),
            salary_range="₹7 LPA - ₹20 LPA",
            demand="High"
        )

        bi_analyst = Career(
            name="BI Analyst",
            description=(
                "Creates business intelligence reports "
                "and dashboards."
            ),
            salary_range="₹4 LPA - ₹12 LPA",
            demand="Medium-High"
        )

        analytics_consultant = Career(
            name="Analytics Consultant",
            description=(
                "Uses analytics to solve business problems "
                "and provide recommendations."
            ),
            salary_range="₹6 LPA - ₹16 LPA",
            demand="High"
        )


        db.add_all([
            data_analyst,
            business_analyst,
            data_scientist,
            data_engineer,
            ml_engineer,
            bi_analyst,
            analytics_consultant
        ])

        db.commit()


        # ----------------------------
        # SKILLS
        # ----------------------------

        python_skill = Skill(name="Python")

        sql_skill = Skill(name="SQL")

        excel_skill = Skill(name="Excel")

        power_bi_skill = Skill(name="Power BI")

        statistics_skill = Skill(name="Statistics")


        db.add_all([
            python_skill,
            sql_skill,
            excel_skill,
            power_bi_skill,
            statistics_skill
        ])

        db.commit()


        # ----------------------------
        # DATA ANALYST REQUIREMENTS
        # ----------------------------

        db.add_all([

            CareerSkill(
                career_id=data_analyst.id,
                skill_id=python_skill.id,
                required_score=7.0
            ),

            CareerSkill(
                career_id=data_analyst.id,
                skill_id=sql_skill.id,
                required_score=8.5
            ),

            CareerSkill(
                career_id=data_analyst.id,
                skill_id=excel_skill.id,
                required_score=8.0
            ),

            CareerSkill(
                career_id=data_analyst.id,
                skill_id=power_bi_skill.id,
                required_score=9.0
            ),

            CareerSkill(
                career_id=data_analyst.id,
                skill_id=statistics_skill.id,
                required_score=7.5
            ),

        ])

        db.commit()

        print("NEXTPATH database seeded successfully!")

        print(
            "Career skill records:",
            db.query(CareerSkill).count()
        )

    finally:

        db.close()


if __name__ == "__main__":
    seed_database()