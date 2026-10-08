import streamlit as st
from datetime import date
import hashlib

st.set_page_config(
    page_title="NEXTPATH Demo",
    page_icon="🧭",
    layout="wide",
    initial_sidebar_state="expanded",
)

CAREERS = {
    "Data Analyst": {
        "description": "Analyze business data, create dashboards, and communicate insights.",
        "skills": {
            "SQL": 8.5,
            "Excel": 8.0,
            "Power BI": 8.0,
            "Statistics": 7.5,
            "Python": 6.5,
            "Data Visualization": 7.5,
            "Communication": 7.0,
        },
    },
    "Data Scientist": {
        "description": "Build statistical and machine-learning models to solve data problems.",
        "skills": {
            "Python": 9.0,
            "Statistics": 9.0,
            "Machine Learning": 9.0,
            "SQL": 8.0,
            "Data Visualization": 7.5,
            "Deep Learning": 7.0,
            "Communication": 7.0,
        },
    },
    "Machine Learning Engineer": {
        "description": "Develop, deploy, and maintain machine-learning systems in production.",
        "skills": {
            "Python": 9.0,
            "Machine Learning": 9.0,
            "APIs": 8.0,
            "MLOps": 8.0,
            "Cloud": 7.5,
            "SQL": 7.0,
            "Deep Learning": 7.5,
        },
    },
    "AI Engineer": {
        "description": "Build AI applications using ML, deep learning, APIs, and generative AI.",
        "skills": {
            "Python": 9.0,
            "Machine Learning": 8.5,
            "Deep Learning": 8.5,
            "Generative AI": 8.5,
            "APIs": 8.0,
            "Cloud": 7.5,
            "MLOps": 7.5,
        },
    },
    "Data Engineer": {
        "description": "Build reliable data pipelines, storage systems, and analytics infrastructure.",
        "skills": {
            "SQL": 9.0,
            "Python": 8.5,
            "ETL": 9.0,
            "Data Pipelines": 9.0,
            "Big Data": 8.0,
            "Cloud": 8.0,
            "Data Modeling": 8.0,
        },
    },
}

RESOURCES = {
    "SQL": [
        "SQLBolt",
        "W3Schools SQL",
        "LeetCode SQL practice",
    ],
    "Python": [
        "Python Official Tutorial",
        "Kaggle Python",
        "HackerRank Python",
    ],
    "Excel": [
        "Microsoft Excel Help",
        "ExcelJet",
        "Practice spreadsheet projects",
    ],
    "Power BI": [
        "Microsoft Learn Power BI",
        "Dashboard practice projects",
    ],
    "Statistics": [
        "Khan Academy Statistics",
        "StatQuest",
        "Practice probability problems",
    ],
    "Machine Learning": [
        "Google ML Crash Course",
        "Kaggle Intro to ML",
        "scikit-learn tutorials",
    ],
    "Deep Learning": [
        "TensorFlow tutorials",
        "PyTorch tutorials",
        "DeepLearning.AI videos",
    ],
    "MLOps": [
        "MLflow documentation",
        "Docker basics",
        "Model deployment practice",
    ],
    "ETL": [
        "ETL fundamentals",
        "Airflow tutorials",
        "Build a mini ETL pipeline",
    ],
    "Data Pipelines": [
        "Apache Airflow guides",
        "Data engineering projects",
    ],
    "Big Data": [
        "Apache Spark tutorials",
        "Databricks free learning",
    ],
    "Data Visualization": [
        "Storytelling with data resources",
        "Tableau Public examples",
    ],
    "Communication": [
        "Presentation practice",
        "Explain one project in 2 minutes",
    ],
    "Generative AI": [
        "Prompt engineering tutorials",
        "LLM application examples",
    ],
    "APIs": [
        "FastAPI tutorial",
        "REST API basics",
        "Postman practice",
    ],
    "Cloud": [
        "AWS Skill Builder",
        "Azure Learn",
        "Google Cloud Skills Boost",
    ],
    "Data Modeling": [
        "Database normalization tutorials",
        "ER diagram practice",
    ],
}

QUESTION_BANK = {
    "SQL": {
        "quiz": (
            "Which SQL clause filters rows before aggregation?",
            ["WHERE", "HAVING", "ORDER BY", "GROUP BY"],
            "WHERE",
        ),
        "problem": (
            "A table has duplicate customer rows. Which keyword can return unique rows?",
            "DISTINCT",
        ),
        "coding": (
            "Write a query idea to count employees in each department.",
            ["select", "count", "group by"],
        ),
    },
    "Python": {
        "quiz": (
            "Which Python data type stores key-value pairs?",
            ["list", "tuple", "dict", "set"],
            "dict",
        ),
        "problem": (
            "Which built-in function returns the number of items in a list?",
            "len",
        ),
        "coding": (
            "Write Python code idea to loop through numbers and print only even values.",
            ["for", "%", "2"],
        ),
    },
    "Excel": {
        "quiz": (
            "Which Excel function calculates an average?",
            ["SUM", "AVERAGE", "COUNT", "IF"],
            "AVERAGE",
        ),
        "problem": (
            "What feature summarizes large tabular data quickly?",
            "pivot",
        ),
        "coding": (
            "Describe a formula to add cells A1 through A10.",
            ["sum", "a1", "a10"],
        ),
    },
    "Power BI": {
        "quiz": (
            "Which language is commonly used for Power BI measures?",
            ["DAX", "SQL only", "HTML", "Java"],
            "DAX",
        ),
        "problem": (
            "What Power BI feature is commonly used to transform data before loading?",
            "power query",
        ),
        "coding": (
            "Describe a simple measure for total sales.",
            ["sum", "sales"],
        ),
    },
    "Statistics": {
        "quiz": (
            "Which measure represents the middle value of ordered data?",
            ["Mean", "Median", "Mode", "Variance"],
            "Median",
        ),
        "problem": (
            "What does standard deviation measure?",
            "spread",
        ),
        "coding": (
            "Describe how you would compute a z-score.",
            ["mean", "standard deviation"],
        ),
    },
    "Machine Learning": {
        "quiz": (
            "Which task predicts a category label?",
            ["Classification", "Regression", "Clustering", "Compression"],
            "Classification",
        ),
        "problem": (
            "What is overfitting?",
            "training",
        ),
        "coding": (
            "Describe the typical steps to train a supervised model.",
            ["split", "train", "predict"],
        ),
    },
}

REASSESSMENT_BANK = {
    "SQL": {
        "quiz": (
            "Which clause filters groups after GROUP BY?",
            ["WHERE", "HAVING", "LIMIT", "JOIN"],
            "HAVING",
        ),
        "problem": (
            "Which join returns matching rows from both tables?",
            "inner join",
        ),
        "coding": (
            "Write a query idea to find average salary by department.",
            ["avg", "group by"],
        ),
    },
    "Python": {
        "quiz": (
            "Which keyword defines a function in Python?",
            ["func", "def", "function", "lambda only"],
            "def",
        ),
        "problem": (
            "What exception-handling keyword is paired with try?",
            "except",
        ),
        "coding": (
            "Write Python logic to return the largest value in a list.",
            ["max"],
        ),
    },
    "Statistics": {
        "quiz": (
            "A correlation near 0 usually indicates what?",
            [
                "Strong positive",
                "Strong negative",
                "Weak linear relationship",
                "Perfect fit",
            ],
            "Weak linear relationship",
        ),
        "problem": (
            "Which distribution is commonly described by mean and standard deviation and is bell-shaped?",
            "normal",
        ),
        "coding": (
            "Describe the formula idea for variance.",
            ["mean", "square"],
        ),
    },
}


def init_state():
    defaults = {
        "page": "Dashboard",
        "target_career": "Data Analyst",
        "selected_skills": {},
        "skill_scores": {},
        "assessment_report": None,
        "roadmap": [],
        "progress": {},
        "verified_skills": {},
        "certificates": [],
        "assessment_mode": "initial",
        "assessment_skills": [],
        "student_name": "Bipro Karmokar",
    }

    for key, value in defaults.items():
        if key not in st.session_state:
            st.session_state[key] = value


def navigate(page):
    st.session_state.page = page
    st.rerun()


def score_gap(required, demonstrated):
    gap_score = max(0.0, required - demonstrated)

    if required <= 0:
        gap_percentage = 0.0
    else:
        gap_percentage = max(
            0.0,
            min(
                100.0,
                (gap_score / required) * 100,
            ),
        )

    return gap_score, gap_percentage


def readiness_for_skill(skill, required):
    demonstrated = float(
        st.session_state.skill_scores.get(
            skill,
            0.0,
        )
    )

    if required <= 0:
        return 0.0

    return min(
        100.0,
        (demonstrated / required) * 100,
    )


def overall_readiness():
    career = CAREERS[
        st.session_state.target_career
    ]

    values = []

    for skill, required in career["skills"].items():
        values.append(
            readiness_for_skill(
                skill,
                required,
            )
        )

    if not values:
        return 0.0

    return sum(values) / len(values)


def make_certificate_id(skill):
    raw = (
        f"{st.session_state.student_name}|"
        f"{skill}|"
        f"{date.today().isoformat()}"
    )

    digest = hashlib.sha256(
        raw.encode("utf-8")
    ).hexdigest()

    return "NP-" + digest[:10].upper()


def ensure_certificate(
    skill,
    score,
    required,
):
    if skill not in st.session_state.verified_skills:
        st.session_state.verified_skills[
            skill
        ] = score

    already_exists = any(
        certificate["skill"] == skill
        for certificate
        in st.session_state.certificates
    )

    if not already_exists:
        st.session_state.certificates.append(
            {
                "id": make_certificate_id(skill),
                "skill": skill,
                "career": st.session_state.target_career,
                "score": round(score, 1),
                "required": required,
                "date": date.today().isoformat(),
            }
        )


def app_header(
    title,
    subtitle,
):
    st.title(title)
    st.caption(subtitle)


def sidebar():
    with st.sidebar:

        st.markdown("## 🧭 NEXTPATH")

        st.caption(
            "Career Intelligence & "
            "Workforce Readiness Demo"
        )

        st.text_input(
            "Student name",
            key="student_name",
        )

        pages = [
            "Dashboard",
            "Target Career",
            "Required Skills",
            "Assessment",
            "Assessment Report",
            "Skill Gap",
            "Roadmap",
            "Progress",
            "Credentials",
            "Opportunities",
            "Architecture",
        ]

        if (
            st.session_state.page
            in pages
        ):
            current_index = pages.index(
                st.session_state.page
            )
        else:
            current_index = 0

        choice = st.radio(
            "Navigation",
            pages,
            index=current_index,
        )

        if (
            choice
            != st.session_state.page
        ):
            st.session_state.page = choice
            st.rerun()

        st.divider()

        st.caption(
            "Prototype note: scores, role matches, "
            "and certificates are generated locally "
            "for demonstration."
        )


def dashboard_page():

    app_header(
        "Dashboard",
        "A single view of the learner's "
        "career-readiness journey.",
    )

    career = CAREERS[
        st.session_state.target_career
    ]

    readiness = overall_readiness()

    roadmap_progress = 0.0

    if st.session_state.roadmap:

        total_topics = sum(
            len(item["topics"])
            for item
            in st.session_state.roadmap
        )

        completed_topics = sum(
            1
            for item
            in st.session_state.roadmap
            for topic
            in item["topics"]
            if st.session_state.progress.get(
                f"{item['skill']}::{topic}",
                False,
            )
        )

        if total_topics:
            roadmap_progress = (
                completed_topics
                / total_topics
                * 100
            )

    col1, col2, col3, col4 = st.columns(4)

    col1.metric(
        "Target Career",
        st.session_state.target_career,
    )

    col2.metric(
        "Career Readiness",
        f"{readiness:.0f}%",
    )

    col3.metric(
        "Roadmap Progress",
        f"{roadmap_progress:.0f}%",
    )

    col4.metric(
        "Verified Skills",
        len(
            st.session_state.verified_skills
        ),
    )

    st.subheader("Your journey")

    steps = [
        (
            "1",
            "Choose target career",
            True,
        ),
        (
            "2",
            "Select skills you already know",
            bool(
                st.session_state.selected_skills
            ),
        ),
        (
            "3",
            "Complete initial assessment",
            st.session_state.assessment_report
            is not None,
        ),
        (
            "4",
            "Review skill gaps",
            bool(
                st.session_state.skill_scores
            )
            or st.session_state.assessment_report
            is not None,
        ),
        (
            "5",
            "Build a personalized roadmap",
            bool(
                st.session_state.roadmap
            ),
        ),
        (
            "6",
            "Complete learning topics",
            roadmap_progress > 0,
        ),
        (
            "7",
            "Re-assess and verify skills",
            bool(
                st.session_state.verified_skills
            ),
        ),
        (
            "8",
            "Explore opportunities",
            readiness > 0,
        ),
    ]

    for number, label, done in steps:
        icon = "✅" if done else "⬜"

        st.write(
            f"{icon} **{number}. {label}**"
        )

    st.info(
        career["description"]
    )

    if st.button(
        "Continue to Target Career",
        type="primary",
        use_container_width=True,
    ):
        navigate("Target Career")


def target_career_page():

    app_header(
        "Target Career",
        "Select the career you want "
        "NEXTPATH to evaluate.",
    )

    career_names = list(
        CAREERS.keys()
    )

    current_index = career_names.index(
        st.session_state.target_career
    )

    selected = st.selectbox(
        "Choose career",
        career_names,
        index=current_index,
    )

    career = CAREERS[selected]

    st.info(
        career["description"]
    )

    st.write(
        "**Required skills for this career**"
    )

    for skill, score in career["skills"].items():
        st.write(
            f"• {skill} — "
            f"required score **{score}/10**"
        )

    if st.button(
        "Save Target Career",
        type="primary",
    ):

        if (
            selected
            != st.session_state.target_career
        ):

            st.session_state.target_career = selected
            st.session_state.selected_skills = {}
            st.session_state.skill_scores = {}
            st.session_state.assessment_report = None
            st.session_state.roadmap = []
            st.session_state.progress = {}
            st.session_state.verified_skills = {}
            st.session_state.certificates = []

        st.success(
            "Target career saved."
        )

        navigate(
            "Required Skills"
        )


def required_skills_page():

    app_header(
        "Required Skills",
        "Select only the skills you already know. "
        "Self-rating is confidence, not the final "
        "verified score.",
    )

    career = CAREERS[
        st.session_state.target_career
    ]

    selected = {}

    level_to_score = {
        "Beginner": 3,
        "Intermediate": 6,
        "Advanced": 8,
        "Expert": 10,
    }

    for skill, required in career["skills"].items():

        with st.container(border=True):

            col1, col2 = st.columns(
                [2, 1]
            )

            checked = col1.checkbox(
                f"I already know {skill}",
                key=f"know_{skill}",
            )

            col1.caption(
                f"Career requirement: "
                f"{required}/10"
            )

            level = col2.selectbox(
                f"Confidence in {skill}",
                list(
                    level_to_score.keys()
                ),
                key=f"level_{skill}",
                disabled=not checked,
            )

            if checked:
                selected[skill] = {
                    "selfLevel": level,
                    "selfScore":
                        level_to_score[level],
                }

    if st.button(
        "Continue",
        type="primary",
        use_container_width=True,
    ):

        st.session_state.selected_skills = (
            selected
        )

        st.session_state.assessment_mode = (
            "initial"
        )

        st.session_state.assessment_skills = (
            list(selected.keys())
        )

        if selected:
            navigate("Assessment")

        else:
            st.session_state.assessment_report = {
                "mode": "initial",
                "targetCareer":
                    st.session_state.target_career,
                "skillScores": {},
                "detailedResults": {},
                "overallScore": 0.0,
            }

            navigate(
                "Skill Gap"
            )


def get_question_set(
    skill,
    mode,
):

    if (
        mode == "reassessment"
        and skill
        in REASSESSMENT_BANK
    ):
        return REASSESSMENT_BANK[skill]

    if skill in QUESTION_BANK:
        return QUESTION_BANK[skill]

    return {
        "quiz": (
            f"Which statement best describes "
            f"practical knowledge of {skill}?",
            [
                "Can apply it",
                "Never used it",
                "Only heard the name",
                "None",
            ],
            "Can apply it",
        ),
        "problem": (
            f"Type one practical use of {skill}.",
            skill.split()[0].lower(),
        ),
        "coding": (
            f"Describe a small practical task "
            f"you could complete using {skill}.",
            [
                skill.split()[0].lower()
            ],
        ),
    }


def assessment_page():

    mode = (
        st.session_state.assessment_mode
    )

    skills = (
        st.session_state.assessment_skills
        or list(
            st.session_state
            .selected_skills.keys()
        )
    )

    if mode == "reassessment":
        title = "Re-Assessment"
    else:
        title = "Initial Assessment"

    app_header(
        title,
        "Each skill is tested with quiz, "
        "problem-solving, and "
        "practical/coding evidence.",
    )

    if not skills:

        st.warning(
            "No skills are selected "
            "for assessment."
        )

        if st.button(
            "Go to Required Skills"
        ):
            navigate(
                "Required Skills"
            )

        return

    answers = {}

    for skill in skills:

        question_set = get_question_set(
            skill,
            mode,
        )

        st.subheader(skill)

        with st.container(border=True):

            (
                quiz_question,
                quiz_options,
                _,
            ) = question_set["quiz"]

            quiz_answer = st.radio(
                quiz_question,
                quiz_options,
                key=(
                    f"{mode}_"
                    f"{skill}_quiz"
                ),
            )

            (
                problem_question,
                _,
            ) = question_set["problem"]

            problem_answer = st.text_input(
                problem_question,
                key=(
                    f"{mode}_"
                    f"{skill}_problem"
                ),
            )

            (
                coding_question,
                _,
            ) = question_set["coding"]

            coding_answer = st.text_area(
                coding_question,
                key=(
                    f"{mode}_"
                    f"{skill}_coding"
                ),
                height=100,
            )

            answers[skill] = {
                "quiz": quiz_answer,
                "problem":
                    problem_answer,
                "coding":
                    coding_answer,
            }

    if st.button(
        "Submit Assessment",
        type="primary",
        use_container_width=True,
    ):

        career_skills = CAREERS[
            st.session_state.target_career
        ]["skills"]

        detailed_results = {}

        total_score = 0.0

        passed_skills = []

        for skill in skills:

            question_set = get_question_set(
                skill,
                mode,
            )

            response = answers[skill]

            correct_quiz = (
                question_set["quiz"][2]
                .strip()
                .lower()
            )

            selected_quiz = (
                response["quiz"]
                .strip()
                .lower()
            )

            if (
                selected_quiz
                == correct_quiz
            ):
                quiz_score = 100.0
            else:
                quiz_score = 0.0

            expected_problem = (
                question_set["problem"][1]
                .lower()
            )

            actual_problem = (
                response["problem"]
                .strip()
                .lower()
            )

            if (
                expected_problem
                in actual_problem
            ):
                problem_score = 100.0
            elif actual_problem:
                problem_score = 50.0
            else:
                problem_score = 0.0

            keywords = [
                keyword.lower()
                for keyword
                in question_set[
                    "coding"
                ][1]
            ]

            coding_text = (
                response["coding"]
                .lower()
            )

            matched_keywords = sum(
                1
                for keyword in keywords
                if keyword
                in coding_text
            )

            if keywords:
                coding_score = (
                    matched_keywords
                    / len(keywords)
                    * 100.0
                )
            else:
                coding_score = 0.0

            final_score = round(
                (
                    quiz_score * 0.30
                    + problem_score * 0.30
                    + coding_score * 0.40
                )
                / 10.0,
                1,
            )

            st.session_state.skill_scores[
                skill
            ] = final_score

            required_score = (
                career_skills.get(
                    skill,
                    7.0,
                )
            )

            if (
                mode == "reassessment"
                and final_score
                >= required_score
            ):

                passed_skills.append(
                    skill
                )

                ensure_certificate(
                    skill,
                    final_score,
                    required_score,
                )

            detailed_results[
                skill
            ] = {
                "quiz": quiz_score,
                "problem":
                    problem_score,
                "coding":
                    coding_score,
                "final":
                    final_score,
                "required":
                    required_score,
            }

            total_score += final_score

        overall_score = round(
            total_score
            / len(skills),
            1,
        )

        st.session_state.assessment_report = {
            "mode": mode,
            "targetCareer":
                st.session_state.target_career,
            "skillScores": {
                skill:
                    st.session_state
                    .skill_scores[skill]
                for skill
                in skills
            },
            "detailedResults":
                detailed_results,
            "passedSkills":
                passed_skills,
            "overallScore":
                overall_score,
            "completedAt":
                date.today().isoformat(),
        }

        st.session_state.assessment_mode = (
            "initial"
        )

        st.session_state.assessment_skills = []

        navigate(
            "Assessment Report"
        )


def assessment_report_page():

    app_header(
        "Assessment Report",
        "See verified evidence from "
        "the most recent assessment.",
    )

    report = (
        st.session_state.assessment_report
    )

    if not report:

        st.warning(
            "No assessment report "
            "is available yet."
        )

        return

    st.metric(
        "Overall Assessment Score",
        f"{report['overallScore']}/10",
    )

    if (
        report.get("mode")
        == "reassessment"
    ):

        st.info(
            "This report is from a "
            "re-assessment. Passing skills "
            "are automatically verified."
        )

    for skill, result in report.get(
        "detailedResults",
        {},
    ).items():

        with st.container(border=True):

            col1, col2, col3, col4 = (
                st.columns(4)
            )

            col1.metric(
                "Final",
                f"{result['final']}/10",
            )

            col2.metric(
                "Required",
                f"{result['required']}/10",
            )

            (
                _,
                gap_percentage,
            ) = score_gap(
                result["required"],
                result["final"],
            )

            col3.metric(
                "Remaining Gap",
                f"{gap_percentage:.0f}%",
            )

            if (
                skill
                in st.session_state
                .verified_skills
            ):
                status = "Verified"
            else:
                status = "Developing"

            col4.metric(
                "Status",
                status,
            )

            st.write(
                f"Quiz: "
                f"{result['quiz']:.0f}% | "
                f"Problem Solving: "
                f"{result['problem']:.0f}% | "
                f"Practical/Coding: "
                f"{result['coding']:.0f}%"
            )

    if st.button(
        "View Skill Gap",
        type="primary",
        use_container_width=True,
    ):
        navigate("Skill Gap")


def skill_gap_page():

    app_header(
        "Skill Gap",
        "Compare required career scores "
        "with demonstrated assessment scores.",
    )

    career = CAREERS[
        st.session_state.target_career
    ]

    rows = []

    for (
        skill,
        required_score,
    ) in career["skills"].items():

        demonstrated_score = float(
            st.session_state
            .skill_scores.get(
                skill,
                0.0,
            )
        )

        (
            gap_score,
            gap_percentage,
        ) = score_gap(
            required_score,
            demonstrated_score,
        )

        if (
            skill
            in st.session_state
            .verified_skills
        ):
            status = "Verified"

        elif (
            skill
            not in st.session_state
            .skill_scores
        ):
            status = "Not Assessed"

        else:
            status = "Gap Remaining"

        rows.append(
            (
                gap_percentage,
                skill,
                required_score,
                demonstrated_score,
                gap_score,
                status,
            )
        )

    rows.sort(
        reverse=True
    )

    for (
        gap_percentage,
        skill,
        required_score,
        demonstrated_score,
        gap_score,
        status,
    ) in rows:

        with st.container(border=True):

            col1, col2, col3, col4 = (
                st.columns(4)
            )

            col1.write(
                f"### {skill}"
            )

            col2.metric(
                "Required",
                f"{required_score}/10",
            )

            col3.metric(
                "Demonstrated",
                f"{demonstrated_score}/10",
            )

            col4.metric(
                "Gap",
                f"{gap_percentage:.0f}%",
            )

            readiness_bar = int(
                max(
                    0,
                    min(
                        100,
                        100
                        - gap_percentage,
                    ),
                )
            )

            st.progress(
                readiness_bar
            )

            st.caption(
                f"Status: {status} | "
                f"Score gap: "
                f"{gap_score:.1f}"
            )

    if st.button(
        "Build Personalized Roadmap",
        type="primary",
        use_container_width=True,
    ):
        navigate(
            "Roadmap"
        )


def roadmap_page():

    app_header(
        "Personalized Roadmap",
        "Allocate learning time to "
        "the largest skill gaps first.",
    )

    months = st.selectbox(
        "Goal duration",
        [1, 2, 3, 6],
        index=2,
        format_func=lambda value:
            (
                f"{value} month"
                if value == 1
                else f"{value} months"
            ),
    )

    weekly_hours = st.slider(
        "Study hours per week",
        2,
        30,
        8,
    )

    if st.button(
        "Generate Roadmap",
        type="primary",
    ):

        career = CAREERS[
            st.session_state.target_career
        ]

        gaps = []

        for (
            skill,
            required_score,
        ) in career["skills"].items():

            demonstrated_score = float(
                st.session_state
                .skill_scores.get(
                    skill,
                    0.0,
                )
            )

            (
                _,
                gap_percentage,
            ) = score_gap(
                required_score,
                demonstrated_score,
            )

            if gap_percentage > 0:
                gaps.append(
                    (
                        skill,
                        gap_percentage,
                    )
                )

        total_gap = sum(
            gap
            for _, gap
            in gaps
        )

        if total_gap == 0:
            total_gap = 1.0

        total_weeks = (
            months * 4
        )

        roadmap_plan = []

        sorted_gaps = sorted(
            gaps,
            key=lambda item:
                item[1],
            reverse=True,
        )

        for (
            skill,
            gap_percentage,
        ) in sorted_gaps:

            weight = (
                gap_percentage
                / total_gap
            )

            hours_per_week = max(
                0.5,
                round(
                    weekly_hours
                    * weight,
                    1,
                ),
            )

            recommended_weeks = max(
                1,
                round(
                    total_weeks
                    * weight
                ),
            )

            topics = [
                f"{skill} fundamentals",
                f"{skill} guided practice",
                f"{skill} mini project",
                f"{skill} review",
            ]

            resources = (
                RESOURCES.get(
                    skill,
                    [
                        f"Official {skill} documentation",
                        f"Practice {skill} project",
                    ],
                )
            )

            roadmap_plan.append(
                {
                    "skill":
                        skill,
                    "gap":
                        gap_percentage,
                    "hours_per_week":
                        hours_per_week,
                    "recommended_weeks":
                        recommended_weeks,
                    "topics":
                        topics,
                    "resources":
                        resources,
                }
            )

        st.session_state.roadmap = (
            roadmap_plan
        )

        st.session_state.progress = {}

        st.success(
            "Roadmap generated."
        )

    if not st.session_state.roadmap:

        st.info(
            "Generate a roadmap to "
            "see your personalized plan."
        )

        return

    for item in st.session_state.roadmap:

        with st.container(border=True):

            st.subheader(
                item["skill"]
            )

            col1, col2, col3 = (
                st.columns(3)
            )

            col1.metric(
                "Current Gap",
                f"{item['gap']:.0f}%",
            )

            col2.metric(
                "Hours / Week",
                item[
                    "hours_per_week"
                ],
            )

            col3.metric(
                "Recommended Weeks",
                item[
                    "recommended_weeks"
                ],
            )

            st.write(
                "**Topics**"
            )

            for topic in item["topics"]:
                st.write(
                    f"• {topic}"
                )

            st.write(
                "**Learning resources**"
            )

            for resource in item[
                "resources"
            ]:
                st.write(
                    f"• {resource}"
                )

    if st.button(
        "Start Progress Tracking",
        type="primary",
        use_container_width=True,
    ):
        navigate(
            "Progress"
        )


def progress_page():

    app_header(
        "Progress & Re-Assessment",
        "Complete roadmap topics, then "
        "re-assess a skill when its learning "
        "plan reaches 100%.",
    )

    if not st.session_state.roadmap:

        st.warning(
            "Generate a roadmap first."
        )

        return

    ready_skills = []

    for item in st.session_state.roadmap:

        skill = item["skill"]

        with st.container(border=True):

            st.subheader(skill)

            completed_count = 0

            for topic in item["topics"]:

                progress_key = (
                    f"{skill}::{topic}"
                )

                checked = st.checkbox(
                    topic,
                    value=(
                        st.session_state
                        .progress.get(
                            progress_key,
                            False,
                        )
                    ),
                    key=(
                        f"check_"
                        f"{progress_key}"
                    ),
                )

                st.session_state.progress[
                    progress_key
                ] = checked

                completed_count += int(
                    checked
                )

            progress_percentage = (
                completed_count
                / len(
                    item["topics"]
                )
                * 100
            )

            st.progress(
                int(
                    progress_percentage
                )
            )

            st.write(
                f"Progress: "
                f"**{progress_percentage:.0f}%**"
            )

            if (
                skill
                in st.session_state
                .verified_skills
            ):

                verified_score = (
                    st.session_state
                    .verified_skills[
                        skill
                    ]
                )

                st.success(
                    f"✓ {skill} is verified "
                    f"at {verified_score}/10"
                )

            elif (
                progress_percentage
                >= 100
            ):

                ready_skills.append(
                    skill
                )

                if st.button(
                    f"Re-Assess {skill}",
                    key=(
                        f"reassess_{skill}"
                    ),
                ):

                    st.session_state.assessment_mode = (
                        "reassessment"
                    )

                    st.session_state.assessment_skills = [
                        skill
                    ]

                    navigate(
                        "Assessment"
                    )

            else:

                st.caption(
                    "Complete all roadmap topics "
                    "to unlock re-assessment."
                )

    if (
        ready_skills
        and st.button(
            "Re-Assess All Ready Skills",
            type="primary",
            use_container_width=True,
        )
    ):

        st.session_state.assessment_mode = (
            "reassessment"
        )

        st.session_state.assessment_skills = (
            ready_skills
        )

        navigate(
            "Assessment"
        )


def credentials_page():

    app_header(
        "Credentials",
        "NEXTPATH issues project-level "
        "skill verification after successful "
        "re-assessment.",
    )

    if not st.session_state.certificates:

        st.info(
            "No verified certificates yet. "
            "Complete a roadmap skill and "
            "pass its re-assessment."
        )

        return

    for certificate in (
        st.session_state.certificates
    ):

        with st.container(border=True):

            skill = certificate[
                "skill"
            ]

            st.subheader(
                f"🏅 NEXTPATH Skill "
                f"Certificate — {skill}"
            )

            st.write(
                f"**Student:** "
                f"{st.session_state.student_name}"
            )

            st.markdown(
                f"""
**Certificate ID:** {certificate['id']}  
**Career:** {certificate['career']}  
**Verified Score:** {certificate['score']}/10  
**Required Score:** {certificate['required']}/10  
**Issue Date:** {certificate['date']}
"""
            )

            st.success(
                "NEXTPATH Verified"
            )

    st.caption(
        "These are demo/project-issued "
        "credentials and are not official "
        "university or third-party certificates."
    )


def opportunities_page():

    app_header(
        "Opportunities",
        "Match opportunities to verified "
        "skills and overall career readiness.",
    )

    career = CAREERS[
        st.session_state.target_career
    ]

    readiness = overall_readiness()

    total_required = len(
        career["skills"]
    )

    verified_required = sum(
        1
        for skill
        in career["skills"]
        if skill
        in st.session_state
        .verified_skills
    )

    if total_required:
        verified_match = (
            verified_required
            / total_required
            * 100
        )
    else:
        verified_match = 0.0

    col1, col2 = st.columns(2)

    col1.metric(
        "Verified Skill Match",
        f"{verified_match:.0f}%",
    )

    col2.metric(
        "Overall Readiness",
        f"{readiness:.0f}%",
    )

    role_map = {
        "Data Analyst": [
            "Junior Data Analyst",
            "BI Analyst Intern",
            "Reporting Analyst",
            "Operations Analyst",
        ],
        "Data Scientist": [
            "Junior Data Scientist",
            "ML Analyst",
            "Data Science Intern",
            "Research Analyst",
        ],
        "Machine Learning Engineer": [
            "Junior ML Engineer",
            "AI/ML Intern",
            "Model Deployment Intern",
            "Applied ML Engineer",
        ],
        "AI Engineer": [
            "AI Engineer Intern",
            "Generative AI Developer",
            "AI Application Developer",
            "Junior AI Engineer",
        ],
        "Data Engineer": [
            "Junior Data Engineer",
            "ETL Developer Intern",
            "Cloud Data Intern",
            "Analytics Engineer",
        ],
    }

    roles = role_map.get(
        st.session_state.target_career,
        [
            "Entry-Level Analytics Role"
        ],
    )

    for index, role in enumerate(
        roles
    ):

        match_score = round(
            0.7 * verified_match
            + 0.2 * readiness
            + 10
            - index * 3
        )

        match_score = min(
            99,
            max(
                0,
                match_score,
            ),
        )

        with st.container(border=True):

            st.subheader(role)

            st.metric(
                "Prototype Match Score",
                f"{match_score}%",
            )

            st.caption(
                "This is a demo recommendation "
                "score, not a live vacancy or "
                "verified employer match."
            )

    st.write(
        "Search live opportunities on "
        "LinkedIn Jobs, Indeed India, or "
        "Naukri using your target-career "
        "keywords."
    )


def architecture_page():

    app_header(
        "System Architecture",
        "How the full NEXTPATH concept works "
        "from evidence to action.",
    )

    st.code(
        """
Target Career
    ↓
Required Skills
    ↓
Known-Skill Selection + Self Confidence
    ↓
Initial Assessment
Quiz + Problem Solving + Practical/Coding
    ↓
Verified Demonstrated Scores
    ↓
Skill Gap Engine
Gap = max(0, Required Score - Demonstrated Score)
    ↓
Personalized Roadmap
Largest Gaps First + Time Budget + Learning Resources
    ↓
Progress Tracking
    ↓
100% Roadmap Completion for a Skill
    ↓
Re-Assessment with New Questions
    ↓
Pass → Verified Skill → Gap 0 → NEXTPATH Credential
Fail → Keep New Score → Updated Gap → Continue Learning
    ↓
Opportunity Matching
""",
        language="text",
    )

    st.subheader(
        "Prototype data flow"
    )

    st.write(
        "1. Career skill requirements "
        "are stored in the app."
    )

    st.write(
        "2. Assessment evidence creates "
        "demonstrated scores."
    )

    st.write(
        "3. The gap engine compares "
        "demonstrated vs required scores."
    )

    st.write(
        "4. The roadmap prioritizes "
        "the largest remaining gaps."
    )

    st.write(
        "5. Re-assessment verifies "
        "improvement before credentials "
        "are issued."
    )


init_state()

sidebar()

page = st.session_state.page

if page == "Dashboard":
    dashboard_page()

elif page == "Target Career":
    target_career_page()

elif page == "Required Skills":
    required_skills_page()

elif page == "Assessment":
    assessment_page()

elif page == "Assessment Report":
    assessment_report_page()

elif page == "Skill Gap":
    skill_gap_page()

elif page == "Roadmap":
    roadmap_page()

elif page == "Progress":
    progress_page()

elif page == "Credentials":
    credentials_page()

elif page == "Opportunities":
    opportunities_page()

elif page == "Architecture":
    architecture_page()