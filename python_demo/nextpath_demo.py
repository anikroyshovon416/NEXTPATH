import streamlit as st
from datetime import date
import hashlib
from urllib.parse import quote_plus

st.set_page_config(
    page_title="NEXTPATH Demo",
    page_icon="🧭",
    layout="wide",
    initial_sidebar_state="expanded",
)


# ============================================================
# 0A. OPTIONAL VISUAL POLISH
# ============================================================

st.markdown(
    """
    <style>
    .block-container {
        padding-top: 1.4rem;
        padding-bottom: 3rem;
        max-width: 1280px;
    }

    [data-testid="stSidebar"] {
        border-right: 1px solid rgba(255,255,255,0.08);
    }

    [data-testid="stSidebar"] .block-container {
        padding-top: 1.2rem;
    }

    h1, h2, h3 {
        letter-spacing: -0.02em;
    }

    div[data-testid="stMetric"] {
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 14px;
        padding: 0.8rem 1rem;
        background: rgba(255,255,255,0.02);
    }

    div[data-testid="stVerticalBlockBorderWrapper"] {
        border-radius: 16px;
    }

    .nextpath-hero {
        padding: 1.4rem 1.5rem;
        border-radius: 18px;
        border: 1px solid rgba(255,255,255,0.08);
        background: linear-gradient(
            135deg,
            rgba(59,130,246,0.14),
            rgba(16,185,129,0.08)
        );
        margin-bottom: 1rem;
    }

    .nextpath-muted {
        opacity: 0.78;
    }

    .nextpath-small {
        font-size: 0.9rem;
    }

    .nextpath-chip {
        display: inline-block;
        padding: 0.25rem 0.55rem;
        margin: 0.12rem 0.15rem 0.12rem 0;
        border-radius: 999px;
        border: 1px solid rgba(255,255,255,0.12);
        background: rgba(255,255,255,0.04);
        font-size: 0.82rem;
    }

    .nextpath-ok {
        border-left: 4px solid #10b981;
        padding-left: 0.7rem;
    }

    .nextpath-warn {
        border-left: 4px solid #f59e0b;
        padding-left: 0.7rem;
    }

    .nextpath-info {
        border-left: 4px solid #3b82f6;
        padding-left: 0.7rem;
    }

    .nextpath-card-title {
        font-size: 1.08rem;
        font-weight: 700;
        margin-bottom: 0.35rem;
    }

    .nextpath-card-subtitle {
        font-size: 0.9rem;
        opacity: 0.78;
        margin-bottom: 0.5rem;
    }

    .nextpath-footer {
        margin-top: 2rem;
        padding-top: 1rem;
        border-top: 1px solid rgba(255,255,255,0.08);
        opacity: 0.72;
        font-size: 0.82rem;
    }

    a {
        text-decoration: none;
    }

    button[kind="primary"] {
        border-radius: 10px;
    }

    button[kind="secondary"] {
        border-radius: 10px;
    }
    </style>
    """,
    unsafe_allow_html=True,
)

# ============================================================
# 1. CAREER DATA
# ============================================================

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
    "Business Analyst": {
        "description": "Translate business needs into structured analysis, requirements, and decisions.",
        "skills": {
            "Excel": 8.5,
            "SQL": 7.0,
            "Business Analysis": 8.5,
            "Data Visualization": 7.0,
            "Communication": 8.5,
            "Statistics": 6.5,
        },
    },
}

# ============================================================
# 2. LEARNING RESOURCE DATA
# ============================================================

RESOURCES = {
    "SQL": {
        "free": [
            {"name": "SQLBolt", "url": "https://sqlbolt.com/"},
            {"name": "W3Schools SQL", "url": "https://www.w3schools.com/sql/"},
            {"name": "PostgreSQL Tutorial", "url": "https://www.postgresql.org/docs/current/tutorial.html"},
        ],
        "practice": [
            {"name": "HackerRank SQL", "url": "https://www.hackerrank.com/domains/sql"},
            {"name": "LeetCode Database", "url": "https://leetcode.com/problemset/database/"},
        ],
        "paid": [
            {"name": "Coursera SQL Courses", "url": "https://www.coursera.org/search?query=sql"},
            {"name": "Udemy SQL Courses", "url": "https://www.udemy.com/courses/search/?q=sql"},
            {"name": "DataCamp SQL Courses", "url": "https://www.datacamp.com/search?q=sql"},
        ],
        "topics": [
            "SQL Fundamentals",
            "Filtering and Sorting",
            "GROUP BY and Aggregations",
            "JOINs",
            "Subqueries",
            "Window Functions",
        ],
        "project": "Build an Employee Analytics Database and answer business questions with SQL.",
    },
    "Python": {
        "free": [
            {"name": "Python Official Tutorial", "url": "https://docs.python.org/3/tutorial/"},
            {"name": "Kaggle Python", "url": "https://www.kaggle.com/learn/python"},
        ],
        "practice": [
            {"name": "HackerRank Python", "url": "https://www.hackerrank.com/domains/python"},
            {"name": "Exercism Python", "url": "https://exercism.org/tracks/python"},
        ],
        "paid": [
            {"name": "Coursera Python Courses", "url": "https://www.coursera.org/search?query=python"},
            {"name": "Udemy Python Courses", "url": "https://www.udemy.com/courses/search/?q=python"},
            {"name": "DataCamp Python Courses", "url": "https://www.datacamp.com/search?q=python"},
        ],
        "topics": [
            "Python Fundamentals",
            "Functions",
            "Lists and Dictionaries",
            "File Handling",
            "Pandas",
            "Data Analysis",
        ],
        "project": "Build a Python data-analysis project using a real CSV dataset.",
    },
    "Excel": {
        "free": [
            {"name": "Microsoft Excel Help", "url": "https://support.microsoft.com/excel"},
            {"name": "Microsoft Excel Training", "url": "https://support.microsoft.com/en-us/office/excel-video-training-9bc05390-e94c-46af-a5b3-d7c22f6990bb"},
        ],
        "practice": [
            {"name": "Excel Practice Online", "url": "https://excel-practice-online.com/"},
        ],
        "paid": [
            {"name": "Coursera Excel Courses", "url": "https://www.coursera.org/search?query=excel"},
            {"name": "Udemy Excel Courses", "url": "https://www.udemy.com/courses/search/?q=excel"},
        ],
        "topics": [
            "Formulas",
            "Lookup Functions",
            "Pivot Tables",
            "Charts",
            "Data Cleaning",
            "Dashboard Creation",
        ],
        "project": "Build an Excel sales dashboard with KPIs, charts, and pivot tables.",
    },
    "Power BI": {
        "free": [
            {"name": "Microsoft Learn Power BI", "url": "https://learn.microsoft.com/training/powerplatform/power-bi/"},
        ],
        "practice": [
            {"name": "Power BI Sample Datasets", "url": "https://learn.microsoft.com/power-bi/create-reports/sample-datasets"},
        ],
        "paid": [
            {"name": "Coursera Power BI Courses", "url": "https://www.coursera.org/search?query=power%20bi"},
            {"name": "Udemy Power BI Courses", "url": "https://www.udemy.com/courses/search/?q=power%20bi"},
        ],
        "topics": [
            "Data Import",
            "Power Query",
            "Data Modeling",
            "DAX",
            "Dashboard Design",
            "Data Storytelling",
        ],
        "project": "Build an interactive business-intelligence dashboard in Power BI.",
    },
    "Statistics": {
        "free": [
            {"name": "Khan Academy Statistics", "url": "https://www.khanacademy.org/math/statistics-probability"},
            {"name": "StatQuest", "url": "https://www.youtube.com/@statquest"},
        ],
        "practice": [
            {"name": "Kaggle Learn", "url": "https://www.kaggle.com/learn"},
        ],
        "paid": [
            {"name": "Coursera Statistics Courses", "url": "https://www.coursera.org/search?query=statistics"},
            {"name": "Udemy Statistics Courses", "url": "https://www.udemy.com/courses/search/?q=statistics"},
        ],
        "topics": [
            "Descriptive Statistics",
            "Probability",
            "Probability Distributions",
            "Sampling",
            "Confidence Intervals",
            "Hypothesis Testing",
        ],
        "project": "Analyze a real dataset and prepare a short statistical report.",
    },
    "Machine Learning": {
        "free": [
            {"name": "Google Machine Learning Crash Course", "url": "https://developers.google.com/machine-learning/crash-course"},
            {"name": "Kaggle Intro to Machine Learning", "url": "https://www.kaggle.com/learn/intro-to-machine-learning"},
        ],
        "practice": [
            {"name": "Kaggle Competitions", "url": "https://www.kaggle.com/competitions"},
        ],
        "paid": [
            {"name": "Coursera Machine Learning Courses", "url": "https://www.coursera.org/search?query=machine%20learning"},
            {"name": "Udemy Machine Learning Courses", "url": "https://www.udemy.com/courses/search/?q=machine%20learning"},
        ],
        "topics": [
            "ML Fundamentals",
            "Data Preprocessing",
            "Regression",
            "Classification",
            "Model Evaluation",
            "Feature Engineering",
        ],
        "project": "Build and evaluate a predictive machine-learning model.",
    },
    "Deep Learning": {
        "free": [
            {"name": "TensorFlow Tutorials", "url": "https://www.tensorflow.org/tutorials"},
            {"name": "PyTorch Tutorials", "url": "https://pytorch.org/tutorials/"},
        ],
        "practice": [
            {"name": "Kaggle Intro to Deep Learning", "url": "https://www.kaggle.com/learn/intro-to-deep-learning"},
        ],
        "paid": [
            {"name": "Coursera Deep Learning Courses", "url": "https://www.coursera.org/search?query=deep%20learning"},
            {"name": "Udemy Deep Learning Courses", "url": "https://www.udemy.com/courses/search/?q=deep%20learning"},
        ],
        "topics": [
            "Neural Networks",
            "Activation Functions",
            "Backpropagation",
            "CNN",
            "Model Training",
            "Evaluation",
        ],
        "project": "Build a neural-network classification project.",
    },
    "Data Visualization": {
        "free": [
            {"name": "Matplotlib Tutorials", "url": "https://matplotlib.org/stable/tutorials/index.html"},
            {"name": "Tableau Public", "url": "https://public.tableau.com/"},
        ],
        "practice": [
            {"name": "Kaggle Data Visualization", "url": "https://www.kaggle.com/learn/data-visualization"},
        ],
        "paid": [
            {"name": "Coursera Data Visualization Courses", "url": "https://www.coursera.org/search?query=data%20visualization"},
            {"name": "Udemy Data Visualization Courses", "url": "https://www.udemy.com/courses/search/?q=data%20visualization"},
        ],
        "topics": [
            "Chart Selection",
            "Visual Encoding",
            "Color and Layout",
            "Storytelling",
            "Dashboard Design",
            "Presentation",
        ],
        "project": "Create a visual story from a public dataset.",
    },
    "Communication": {
        "free": [
            {"name": "Toastmasters Resources", "url": "https://www.toastmasters.org/resources"},
            {"name": "Purdue OWL", "url": "https://owl.purdue.edu/"},
        ],
        "practice": [
            {"name": "Practice Explaining Projects", "url": "https://www.google.com/search?q=technical+presentation+practice"},
        ],
        "paid": [
            {"name": "Coursera Communication Courses", "url": "https://www.coursera.org/search?query=communication%20skills"},
            {"name": "Udemy Communication Courses", "url": "https://www.udemy.com/courses/search/?q=communication%20skills"},
        ],
        "topics": [
            "Clear Writing",
            "Presentation Structure",
            "Data Storytelling",
            "Explaining Technical Work",
            "Interview Communication",
        ],
        "project": "Prepare and deliver a 3-minute explanation of one technical project.",
    },
    "Generative AI": {
        "free": [
            {"name": "Hugging Face Course", "url": "https://huggingface.co/learn"},
            {"name": "Google Generative AI Learning", "url": "https://www.cloudskillsboost.google/paths/118"},
        ],
        "practice": [
            {"name": "Hugging Face Spaces", "url": "https://huggingface.co/spaces"},
        ],
        "paid": [
            {"name": "Coursera Generative AI Courses", "url": "https://www.coursera.org/search?query=generative%20ai"},
            {"name": "Udemy Generative AI Courses", "url": "https://www.udemy.com/courses/search/?q=generative%20ai"},
        ],
        "topics": [
            "LLM Basics",
            "Prompt Engineering",
            "Embeddings",
            "RAG",
            "LLM APIs",
            "Evaluation",
        ],
        "project": "Build a small AI assistant with an LLM API or open model.",
    },
    "APIs": {
        "free": [
            {"name": "FastAPI Tutorial", "url": "https://fastapi.tiangolo.com/tutorial/"},
            {"name": "MDN HTTP Overview", "url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview"},
        ],
        "practice": [
            {"name": "Postman Learning Center", "url": "https://learning.postman.com/"},
        ],
        "paid": [
            {"name": "Coursera API Courses", "url": "https://www.coursera.org/search?query=api"},
            {"name": "Udemy API Courses", "url": "https://www.udemy.com/courses/search/?q=rest%20api"},
        ],
        "topics": [
            "HTTP Basics",
            "REST",
            "Request and Response",
            "Authentication",
            "FastAPI",
            "API Testing",
        ],
        "project": "Build a REST API for a small career or skills dataset.",
    },
    "MLOps": {
        "free": [
            {"name": "MLflow Documentation", "url": "https://mlflow.org/docs/latest/index.html"},
            {"name": "Docker Get Started", "url": "https://docs.docker.com/get-started/"},
        ],
        "practice": [
            {"name": "GitHub Actions Docs", "url": "https://docs.github.com/actions"},
        ],
        "paid": [
            {"name": "Coursera MLOps Courses", "url": "https://www.coursera.org/search?query=mlops"},
            {"name": "Udemy MLOps Courses", "url": "https://www.udemy.com/courses/search/?q=mlops"},
        ],
        "topics": [
            "Experiment Tracking",
            "Model Packaging",
            "Docker",
            "CI/CD",
            "Model Deployment",
            "Monitoring",
        ],
        "project": "Package and deploy a simple ML model with version tracking.",
    },
    "Cloud": {
        "free": [
            {"name": "AWS Skill Builder", "url": "https://skillbuilder.aws/"},
            {"name": "Microsoft Learn Azure", "url": "https://learn.microsoft.com/azure/"},
            {"name": "Google Cloud Skills Boost", "url": "https://www.cloudskillsboost.google/"},
        ],
        "practice": [
            {"name": "AWS Free Tier", "url": "https://aws.amazon.com/free/"},
        ],
        "paid": [
            {"name": "Coursera Cloud Courses", "url": "https://www.coursera.org/search?query=cloud%20computing"},
            {"name": "Udemy Cloud Courses", "url": "https://www.udemy.com/courses/search/?q=cloud%20computing"},
        ],
        "topics": [
            "Cloud Fundamentals",
            "Compute",
            "Storage",
            "Databases",
            "Identity and Access",
            "Deployment",
        ],
        "project": "Deploy a small web service or API to a cloud platform.",
    },
    "ETL": {
        "free": [
            {"name": "Apache Airflow Tutorial", "url": "https://airflow.apache.org/docs/apache-airflow/stable/tutorial/index.html"},
            {"name": "Pandas Documentation", "url": "https://pandas.pydata.org/docs/"},
        ],
        "practice": [
            {"name": "Data Engineering Zoomcamp", "url": "https://github.com/DataTalksClub/data-engineering-zoomcamp"},
        ],
        "paid": [
            {"name": "Coursera ETL Courses", "url": "https://www.coursera.org/search?query=etl"},
            {"name": "Udemy ETL Courses", "url": "https://www.udemy.com/courses/search/?q=etl"},
        ],
        "topics": [
            "Extract",
            "Transform",
            "Load",
            "Data Cleaning",
            "Scheduling",
            "Pipeline Validation",
        ],
        "project": "Build an ETL pipeline that cleans a CSV and loads it into a database.",
    },
    "Data Pipelines": {
        "free": [
            {"name": "Apache Airflow Docs", "url": "https://airflow.apache.org/docs/"},
            {"name": "Prefect Docs", "url": "https://docs.prefect.io/"},
        ],
        "practice": [
            {"name": "Data Engineering Zoomcamp", "url": "https://github.com/DataTalksClub/data-engineering-zoomcamp"},
        ],
        "paid": [
            {"name": "Coursera Data Engineering Courses", "url": "https://www.coursera.org/search?query=data%20engineering"},
            {"name": "Udemy Data Pipeline Courses", "url": "https://www.udemy.com/courses/search/?q=data%20pipeline"},
        ],
        "topics": [
            "Pipeline Design",
            "Scheduling",
            "Orchestration",
            "Retries",
            "Logging",
            "Monitoring",
        ],
        "project": "Build and schedule a small end-to-end data pipeline.",
    },
    "Big Data": {
        "free": [
            {"name": "Apache Spark Quick Start", "url": "https://spark.apache.org/docs/latest/quick-start.html"},
            {"name": "Databricks Learning", "url": "https://www.databricks.com/learn"},
        ],
        "practice": [
            {"name": "Kaggle Datasets", "url": "https://www.kaggle.com/datasets"},
        ],
        "paid": [
            {"name": "Coursera Big Data Courses", "url": "https://www.coursera.org/search?query=big%20data"},
            {"name": "Udemy Spark Courses", "url": "https://www.udemy.com/courses/search/?q=apache%20spark"},
        ],
        "topics": [
            "Distributed Computing",
            "Spark Basics",
            "DataFrames",
            "Transformations",
            "Actions",
            "Performance Basics",
        ],
        "project": "Process a large dataset with Spark and summarize the results.",
    },
    "Data Modeling": {
        "free": [
            {"name": "Database Design Tutorial", "url": "https://www.postgresql.org/docs/current/ddl.html"},
            {"name": "dbdiagram.io", "url": "https://dbdiagram.io/"},
        ],
        "practice": [
            {"name": "SQL Practice", "url": "https://sqlbolt.com/"},
        ],
        "paid": [
            {"name": "Coursera Data Modeling Courses", "url": "https://www.coursera.org/search?query=data%20modeling"},
            {"name": "Udemy Database Design Courses", "url": "https://www.udemy.com/courses/search/?q=database%20design"},
        ],
        "topics": [
            "Entities and Relationships",
            "Keys",
            "Normalization",
            "Dimensional Modeling",
            "Star Schema",
            "ER Diagrams",
        ],
        "project": "Design an ER model and star schema for a business scenario.",
    },
    "Business Analysis": {
        "free": [
            {"name": "IIBA Resources", "url": "https://www.iiba.org/business-analysis-resources/"},
        ],
        "practice": [
            {"name": "Business Analysis Practice Search", "url": "https://www.google.com/search?q=business+analysis+case+study+practice"},
        ],
        "paid": [
            {"name": "Coursera Business Analysis Courses", "url": "https://www.coursera.org/search?query=business%20analysis"},
            {"name": "Udemy Business Analysis Courses", "url": "https://www.udemy.com/courses/search/?q=business%20analysis"},
        ],
        "topics": [
            "Requirements",
            "Stakeholder Analysis",
            "Process Mapping",
            "KPIs",
            "Gap Analysis",
            "Documentation",
        ],
        "project": "Create a business requirements document and process map for a simple case.",
    },
}

# ============================================================
# 3. ASSESSMENT QUESTION BANKS
# ============================================================

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
            "What Excel feature is commonly used to summarize large tabular data?",
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
            ["Strong positive", "Strong negative", "Weak linear relationship", "Perfect fit"],
            "Weak linear relationship",
        ),
        "problem": (
            "Which distribution is commonly bell-shaped and described by mean and standard deviation?",
            "normal",
        ),
        "coding": (
            "Describe the formula idea for variance.",
            ["mean", "square"],
        ),
    },
}


# ============================================================
# 3A. EXTENDED CAREER / RESOURCE / QUESTION DATA
# These additions keep the demo broad enough for a hackathon
# presentation while preserving the same evaluation workflow.
# ============================================================

CAREERS.update(
    {
        "BI Analyst": {
            "description": (
                "Transform business data into dashboards, KPI reports, "
                "and decision-ready insights."
            ),
            "skills": {
                "Power BI": 8.5,
                "SQL": 8.0,
                "Excel": 8.0,
                "Data Visualization": 8.0,
                "Statistics": 6.5,
                "Communication": 7.0,
            },
        },
        "Product Analyst": {
            "description": (
                "Use product and customer data to understand behavior, "
                "experiments, funnels, retention, and growth."
            ),
            "skills": {
                "SQL": 8.5,
                "Statistics": 8.0,
                "Product Analytics": 8.5,
                "Data Visualization": 7.5,
                "Python": 6.5,
                "Communication": 7.5,
            },
        },
        "Marketing Analyst": {
            "description": (
                "Measure campaign performance, customer segments, "
                "conversion behavior, and marketing effectiveness."
            ),
            "skills": {
                "Excel": 8.0,
                "SQL": 7.5,
                "Statistics": 7.5,
                "Marketing Analytics": 8.5,
                "Data Visualization": 7.5,
                "Communication": 7.5,
            },
        },
        "Analytics Consultant": {
            "description": (
                "Solve business problems using analytics, structured "
                "problem-solving, stakeholder communication, and data."
            ),
            "skills": {
                "SQL": 7.5,
                "Excel": 8.0,
                "Business Analysis": 8.5,
                "Statistics": 7.0,
                "Data Visualization": 7.5,
                "Communication": 9.0,
            },
        },
        "Data Architect": {
            "description": (
                "Design scalable data structures, storage patterns, "
                "models, and platform-level data architecture."
            ),
            "skills": {
                "Data Modeling": 9.0,
                "SQL": 8.5,
                "Cloud": 8.5,
                "Data Pipelines": 8.0,
                "Big Data": 8.0,
                "Data Architecture": 9.0,
            },
        },
        "Senior Data Analyst": {
            "description": (
                "Own advanced analysis, stakeholder decisions, dashboards, "
                "experiments, and analytical mentoring."
            ),
            "skills": {
                "SQL": 9.0,
                "Excel": 8.5,
                "Power BI": 8.5,
                "Statistics": 8.0,
                "Python": 7.5,
                "Communication": 8.5,
            },
        },
    }
)

RESOURCES.update(
    {
        "Product Analytics": {
            "free": [
                {
                    "name": "Amplitude Academy",
                    "url": "https://academy.amplitude.com/",
                },
                {
                    "name": "Mixpanel Resources",
                    "url": "https://mixpanel.com/resources/",
                },
            ],
            "practice": [
                {
                    "name": "Product Analytics Case Study Search",
                    "url": "https://www.google.com/search?q=product+analytics+case+study+practice",
                },
            ],
            "paid": [
                {
                    "name": "Coursera Product Analytics Courses",
                    "url": "https://www.coursera.org/search?query=product%20analytics",
                },
                {
                    "name": "Udemy Product Analytics Courses",
                    "url": "https://www.udemy.com/courses/search/?q=product%20analytics",
                },
            ],
            "topics": [
                "Product Metrics",
                "Funnels",
                "Retention",
                "Cohort Analysis",
                "Experimentation",
                "Behavioral Segmentation",
            ],
            "project": (
                "Analyze a mock product funnel and recommend changes "
                "to improve activation and retention."
            ),
        },
        "Marketing Analytics": {
            "free": [
                {
                    "name": "Google Analytics Learning",
                    "url": "https://skillshop.withgoogle.com/",
                },
                {
                    "name": "Think with Google",
                    "url": "https://www.thinkwithgoogle.com/",
                },
            ],
            "practice": [
                {
                    "name": "Marketing Analytics Case Study Search",
                    "url": "https://www.google.com/search?q=marketing+analytics+case+study+practice",
                },
            ],
            "paid": [
                {
                    "name": "Coursera Marketing Analytics Courses",
                    "url": "https://www.coursera.org/search?query=marketing%20analytics",
                },
                {
                    "name": "Udemy Marketing Analytics Courses",
                    "url": "https://www.udemy.com/courses/search/?q=marketing%20analytics",
                },
            ],
            "topics": [
                "Campaign KPIs",
                "Attribution Basics",
                "Conversion Analysis",
                "Segmentation",
                "Customer Acquisition Cost",
                "Return on Ad Spend",
            ],
            "project": (
                "Create a campaign-performance dashboard and identify "
                "the best-performing channels."
            ),
        },
        "Data Architecture": {
            "free": [
                {
                    "name": "AWS Architecture Center",
                    "url": "https://aws.amazon.com/architecture/",
                },
                {
                    "name": "Microsoft Azure Architecture Center",
                    "url": "https://learn.microsoft.com/azure/architecture/",
                },
            ],
            "practice": [
                {
                    "name": "Cloud Architecture Diagram Practice",
                    "url": "https://www.google.com/search?q=data+architecture+diagram+practice",
                },
            ],
            "paid": [
                {
                    "name": "Coursera Data Architecture Courses",
                    "url": "https://www.coursera.org/search?query=data%20architecture",
                },
                {
                    "name": "Udemy Data Architecture Courses",
                    "url": "https://www.udemy.com/courses/search/?q=data%20architecture",
                },
            ],
            "topics": [
                "Architecture Principles",
                "Data Lake and Warehouse",
                "Batch vs Streaming",
                "Governance",
                "Security",
                "Scalability",
            ],
            "project": (
                "Design a reference data architecture for a company "
                "that needs analytics and machine-learning workloads."
            ),
        },
    }
)

QUESTION_BANK.update(
    {
        "Data Visualization": {
            "quiz": (
                "Which chart is usually best for comparing values across categories?",
                ["Bar chart", "Pie chart always", "Scatter plot", "Map"],
                "Bar chart",
            ),
            "problem": (
                "What should a good visualization emphasize first?",
                "insight",
            ),
            "coding": (
                "Describe a simple visualization workflow for a business dataset.",
                ["choose", "chart", "label"],
            ),
        },
        "Communication": {
            "quiz": (
                "Which approach usually improves technical communication?",
                [
                    "Use clear structure",
                    "Use maximum jargon",
                    "Avoid examples",
                    "Skip the conclusion",
                ],
                "Use clear structure",
            ),
            "problem": (
                "What is one important thing to identify before presenting?",
                "audience",
            ),
            "coding": (
                "Outline a short project explanation for a non-technical audience.",
                ["problem", "solution", "result"],
            ),
        },
        "Deep Learning": {
            "quiz": (
                "Which structure is the basic unit used in neural networks?",
                ["Neuron", "JOIN", "Pivot table", "Primary key"],
                "Neuron",
            ),
            "problem": (
                "What process adjusts neural-network weights using error gradients?",
                "backpropagation",
            ),
            "coding": (
                "Describe a simple deep-learning training workflow.",
                ["data", "model", "train"],
            ),
        },
        "APIs": {
            "quiz": (
                "Which HTTP method is commonly used to retrieve data?",
                ["GET", "POST only", "DELETE", "PATCH only"],
                "GET",
            ),
            "problem": (
                "What format is commonly used for REST API responses?",
                "json",
            ),
            "coding": (
                "Describe a simple API endpoint that returns a career list.",
                ["get", "return", "career"],
            ),
        },
        "MLOps": {
            "quiz": (
                "Which activity is part of MLOps?",
                [
                    "Model monitoring",
                    "Only writing notebooks",
                    "Only data entry",
                    "Only presentation design",
                ],
                "Model monitoring",
            ),
            "problem": (
                "What tool category helps package an application consistently?",
                "container",
            ),
            "coding": (
                "Describe a simple model-deployment workflow.",
                ["model", "deploy", "monitor"],
            ),
        },
        "Cloud": {
            "quiz": (
                "Which cloud concept provides computing resources on demand?",
                ["Elasticity", "Hardcoding", "Pagination", "Normalization only"],
                "Elasticity",
            ),
            "problem": (
                "What cloud service category provides virtual machines?",
                "compute",
            ),
            "coding": (
                "Describe a basic cloud deployment for a web API.",
                ["api", "deploy", "cloud"],
            ),
        },
        "ETL": {
            "quiz": (
                "What does ETL stand for?",
                [
                    "Extract Transform Load",
                    "Evaluate Test Learn",
                    "Execute Track Log",
                    "Encode Transfer Link",
                ],
                "Extract Transform Load",
            ),
            "problem": (
                "Which ETL stage usually cleans and reshapes data?",
                "transform",
            ),
            "coding": (
                "Describe a CSV-to-database ETL workflow.",
                ["extract", "transform", "load"],
            ),
        },
        "Data Pipelines": {
            "quiz": (
                "What is orchestration used for in data pipelines?",
                [
                    "Scheduling and coordinating tasks",
                    "Designing logos",
                    "Formatting slides",
                    "Replacing all databases",
                ],
                "Scheduling and coordinating tasks",
            ),
            "problem": (
                "What should a reliable pipeline do when a task fails?",
                "retry",
            ),
            "coding": (
                "Describe a scheduled pipeline with logging.",
                ["schedule", "log", "task"],
            ),
        },
        "Big Data": {
            "quiz": (
                "Which framework is widely used for distributed data processing?",
                ["Apache Spark", "PowerPoint", "Photoshop", "SQLite only"],
                "Apache Spark",
            ),
            "problem": (
                "What is a key reason to use distributed processing?",
                "scale",
            ),
            "coding": (
                "Describe a basic Spark data-processing workflow.",
                ["read", "transform", "write"],
            ),
        },
        "Data Modeling": {
            "quiz": (
                "Which concept reduces unnecessary data duplication in relational databases?",
                ["Normalization", "Animation", "Compression only", "Sorting only"],
                "Normalization",
            ),
            "problem": (
                "What diagram shows entities and relationships?",
                "er",
            ),
            "coding": (
                "Describe a simple customer-orders data model.",
                ["customer", "order", "key"],
            ),
        },
        "Business Analysis": {
            "quiz": (
                "Which document commonly captures business requirements?",
                ["BRD", "CSS", "PNG", "Binary file"],
                "BRD",
            ),
            "problem": (
                "Who should a business analyst understand before defining requirements?",
                "stakeholder",
            ),
            "coding": (
                "Outline a simple requirements-analysis workflow.",
                ["stakeholder", "requirement", "validate"],
            ),
        },
        "Product Analytics": {
            "quiz": (
                "Which metric commonly measures users who return after a period of time?",
                ["Retention", "CPU clock", "Disk size", "Screen brightness"],
                "Retention",
            ),
            "problem": (
                "What analysis studies users moving through ordered product steps?",
                "funnel",
            ),
            "coding": (
                "Describe an analysis for signup-to-purchase conversion.",
                ["signup", "purchase", "conversion"],
            ),
        },
        "Marketing Analytics": {
            "quiz": (
                "Which metric compares advertising return with advertising spend?",
                ["ROAS", "RAM", "FPS", "CPU"],
                "ROAS",
            ),
            "problem": (
                "What metric measures the cost to acquire a customer?",
                "cac",
            ),
            "coding": (
                "Describe a campaign-performance analysis.",
                ["campaign", "cost", "conversion"],
            ),
        },
        "Data Architecture": {
            "quiz": (
                "Which design commonly separates raw data storage from analytical consumption?",
                ["Layered data architecture", "Single text file only", "No schema", "Manual copy only"],
                "Layered data architecture",
            ),
            "problem": (
                "What architecture concern ensures systems can handle growth?",
                "scalability",
            ),
            "coding": (
                "Describe a high-level analytics architecture.",
                ["source", "storage", "analytics"],
            ),
        },
    }
)

REASSESSMENT_BANK.update(
    {
        "Machine Learning": {
            "quiz": (
                "Which metric can be useful for imbalanced classification?",
                ["F1 score", "Screen width", "File name", "Clock speed"],
                "F1 score",
            ),
            "problem": (
                "What dataset should remain unseen during final model evaluation?",
                "test",
            ),
            "coding": (
                "Describe how you would compare two classifiers fairly.",
                ["same", "metric", "test"],
            ),
        },
        "Power BI": {
            "quiz": (
                "Which Power BI component is used to create reusable calculations?",
                ["DAX measure", "Image crop", "CSS class", "Python tuple only"],
                "DAX measure",
            ),
            "problem": (
                "What relationship should be defined between related tables?",
                "relationship",
            ),
            "coding": (
                "Describe a dashboard with a KPI, trend, and category breakdown.",
                ["kpi", "trend", "category"],
            ),
        },
        "Excel": {
            "quiz": (
                "Which feature is useful for summarizing data by categories quickly?",
                ["PivotTable", "WordArt", "Page Break", "Comment only"],
                "PivotTable",
            ),
            "problem": (
                "Which Excel concept can match a key with a value from another table?",
                "lookup",
            ),
            "coding": (
                "Describe a formula-based approach for calculating monthly totals.",
                ["sum", "month"],
            ),
        },
        "Data Visualization": {
            "quiz": (
                "Which chart is commonly suitable for showing a trend over time?",
                ["Line chart", "Pie chart always", "Treemap only", "Gauge only"],
                "Line chart",
            ),
            "problem": (
                "What should be minimized when it distracts from the main message?",
                "clutter",
            ),
            "coding": (
                "Describe how you would redesign a cluttered dashboard.",
                ["remove", "focus", "label"],
            ),
        },
        "Communication": {
            "quiz": (
                "What should a strong presentation conclusion usually include?",
                ["Key takeaway", "Unrelated detail", "New random topic", "No summary"],
                "Key takeaway",
            ),
            "problem": (
                "What technique makes explanations easier to follow?",
                "structure",
            ),
            "coding": (
                "Outline a 60-second explanation of an analytics result.",
                ["context", "insight", "action"],
            ),
        },
        "APIs": {
            "quiz": (
                "Which HTTP status code commonly indicates success?",
                ["200", "404", "500", "401"],
                "200",
            ),
            "problem": (
                "What mechanism is commonly used to protect API access?",
                "authentication",
            ),
            "coding": (
                "Describe an authenticated GET endpoint.",
                ["get", "auth", "response"],
            ),
        },
        "Cloud": {
            "quiz": (
                "Which cloud capability helps increase or decrease resources with demand?",
                ["Auto scaling", "Static typing", "Spreadsheet sorting", "Manual printing"],
                "Auto scaling",
            ),
            "problem": (
                "What service category stores objects such as files and images?",
                "storage",
            ),
            "coding": (
                "Describe how you would deploy an API with logs and monitoring.",
                ["deploy", "log", "monitor"],
            ),
        },
        "ETL": {
            "quiz": (
                "Which ETL stage usually writes processed data to a target system?",
                ["Load", "Extract", "Transform only", "Visualize"],
                "Load",
            ),
            "problem": (
                "What should a pipeline do with invalid records?",
                "validate",
            ),
            "coding": (
                "Describe an ETL job with validation and error logging.",
                ["validate", "error", "load"],
            ),
        },
        "Data Modeling": {
            "quiz": (
                "Which key uniquely identifies a row in a relational table?",
                ["Primary key", "Foreign key only", "Color key", "Sort key only"],
                "Primary key",
            ),
            "problem": (
                "What relationship type exists when one customer has many orders?",
                "one-to-many",
            ),
            "coding": (
                "Describe an order model with customer and product relationships.",
                ["customer", "order", "product"],
            ),
        },
    }
)


# ============================================================
# 4. STATE / UTILITIES
# ============================================================

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
        "roadmap_months": 3,
        "roadmap_weekly_hours": 8,
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
        return gap_score, 0.0
    gap_percentage = max(0.0, min(100.0, (gap_score / required) * 100.0))
    return gap_score, gap_percentage


def readiness_for_skill(skill, required):
    demonstrated = float(st.session_state.skill_scores.get(skill, 0.0))
    if required <= 0:
        return 0.0
    return min(100.0, (demonstrated / required) * 100.0)


def overall_readiness():
    career = CAREERS[st.session_state.target_career]
    values = [
        readiness_for_skill(skill, required)
        for skill, required in career["skills"].items()
    ]
    return sum(values) / len(values) if values else 0.0


def make_certificate_id(skill):
    raw = f"{st.session_state.student_name}|{skill}|{date.today().isoformat()}"
    digest = hashlib.sha256(raw.encode("utf-8")).hexdigest()
    return "NP-" + digest[:10].upper()


def ensure_certificate(skill, score, required):
    st.session_state.verified_skills[skill] = score
    already_exists = any(
        certificate["skill"] == skill
        for certificate in st.session_state.certificates
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


def app_header(title, subtitle):
    st.title(title)
    st.caption(subtitle)


def fallback_resources(skill):
    encoded = quote_plus(skill)
    return {
        "free": [
            {
                "name": f"{skill} Tutorial Search",
                "url": f"https://www.google.com/search?q={encoded}+official+tutorial",
            }
        ],
        "practice": [
            {
                "name": f"{skill} Practice Search",
                "url": f"https://www.google.com/search?q={encoded}+practice",
            }
        ],
        "paid": [
            {
                "name": f"Coursera {skill} Courses",
                "url": f"https://www.coursera.org/search?query={encoded}",
            },
            {
                "name": f"Udemy {skill} Courses",
                "url": f"https://www.udemy.com/courses/search/?q={encoded}",
            },
        ],
        "topics": [
            f"{skill} Fundamentals",
            f"{skill} Core Concepts",
            f"{skill} Practice",
            f"{skill} Mini Project",
        ],
        "project": f"Build a practical mini project using {skill}.",
    }


# ============================================================
# 5. SIDEBAR
# ============================================================

def sidebar():
    with st.sidebar:
        st.markdown("## 🧭 NEXTPATH")
        st.caption("Career Intelligence & Workforce Readiness Demo")

        st.text_input("Student name", key="student_name")

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

        current_index = pages.index(st.session_state.page) if st.session_state.page in pages else 0

        choice = st.radio("Navigation", pages, index=current_index)

        if choice != st.session_state.page:
            st.session_state.page = choice
            st.rerun()

        st.divider()
        st.caption(
            "Prototype note: scores, role matches, roadmaps, and certificates "
            "are generated locally for demonstration."
        )


# ============================================================
# 6. DASHBOARD
# ============================================================

def dashboard_page():
    app_header(
        "Dashboard",
        "A single view of the learner's career-readiness journey.",
    )

    career = CAREERS[st.session_state.target_career]
    readiness = overall_readiness()

    roadmap_progress = 0.0
    if st.session_state.roadmap:
        total_topics = sum(len(item["topics"]) for item in st.session_state.roadmap)
        completed_topics = sum(
            1
            for item in st.session_state.roadmap
            for topic in item["topics"]
            if st.session_state.progress.get(f"{item['skill']}::{topic}", False)
        )
        if total_topics:
            roadmap_progress = completed_topics / total_topics * 100.0

    col1, col2, col3, col4 = st.columns(4)
    col1.metric("Target Career", st.session_state.target_career)
    col2.metric("Career Readiness", f"{readiness:.0f}%")
    col3.metric("Roadmap Progress", f"{roadmap_progress:.0f}%")
    col4.metric("Verified Skills", len(st.session_state.verified_skills))

    st.subheader("Your journey")

    steps = [
        ("1", "Choose target career", True),
        ("2", "Select skills you already know", bool(st.session_state.selected_skills)),
        ("3", "Complete initial assessment", st.session_state.assessment_report is not None),
        ("4", "Review skill gaps", bool(st.session_state.skill_scores) or st.session_state.assessment_report is not None),
        ("5", "Build a personalized roadmap", bool(st.session_state.roadmap)),
        ("6", "Complete learning topics", roadmap_progress > 0),
        ("7", "Re-assess and verify skills", bool(st.session_state.verified_skills)),
        ("8", "Explore opportunities", readiness > 0),
    ]

    for number, label, done in steps:
        st.write(f"{'✅' if done else '⬜'} **{number}. {label}**")

    st.info(career["description"])

    if st.button("Continue to Target Career", type="primary", use_container_width=True):
        navigate("Target Career")


# ============================================================
# 7. TARGET CAREER
# ============================================================

def target_career_page():
    app_header(
        "Target Career",
        "Select the career you want NEXTPATH to evaluate.",
    )

    career_names = list(CAREERS.keys())
    current_index = career_names.index(st.session_state.target_career)

    selected = st.selectbox(
        "Choose career",
        career_names,
        index=current_index,
    )

    career = CAREERS[selected]

    st.info(career["description"])
    st.write("**Required skills for this career**")

    for skill, score in career["skills"].items():
        st.write(f"• {skill} — required score **{score}/10**")

    if st.button("Save Target Career", type="primary"):
        if selected != st.session_state.target_career:
            st.session_state.target_career = selected
            st.session_state.selected_skills = {}
            st.session_state.skill_scores = {}
            st.session_state.assessment_report = None
            st.session_state.roadmap = []
            st.session_state.progress = {}
            st.session_state.verified_skills = {}
            st.session_state.certificates = []

        st.success("Target career saved.")
        navigate("Required Skills")


# ============================================================
# 8. REQUIRED SKILLS
# ============================================================

def required_skills_page():
    app_header(
        "Required Skills",
        "Select only the skills you already know. Self-rating is confidence, not the final verified score.",
    )

    career = CAREERS[st.session_state.target_career]
    selected = {}

    level_to_score = {
        "Beginner": 3,
        "Intermediate": 6,
        "Advanced": 8,
        "Expert": 10,
    }

    for skill, required in career["skills"].items():
        with st.container(border=True):
            col1, col2 = st.columns([2, 1])

            checked = col1.checkbox(
                f"I already know {skill}",
                key=f"know_{skill}",
            )

            col1.caption(f"Career requirement: {required}/10")

            level = col2.selectbox(
                f"Confidence in {skill}",
                list(level_to_score.keys()),
                key=f"level_{skill}",
                disabled=not checked,
            )

            if checked:
                selected[skill] = {
                    "selfLevel": level,
                    "selfScore": level_to_score[level],
                }

    if st.button("Continue", type="primary", use_container_width=True):
        st.session_state.selected_skills = selected
        st.session_state.assessment_mode = "initial"
        st.session_state.assessment_skills = list(selected.keys())

        if selected:
            navigate("Assessment")
        else:
            st.session_state.assessment_report = {
                "mode": "initial",
                "targetCareer": st.session_state.target_career,
                "skillScores": {},
                "detailedResults": {},
                "overallScore": 0.0,
            }
            navigate("Skill Gap")


# ============================================================
# 9. ASSESSMENT
# ============================================================

def get_question_set(skill, mode):
    if mode == "reassessment" and skill in REASSESSMENT_BANK:
        return REASSESSMENT_BANK[skill]

    if skill in QUESTION_BANK:
        return QUESTION_BANK[skill]

    return {
        "quiz": (
            f"Which statement best describes practical knowledge of {skill}?",
            ["Can apply it", "Never used it", "Only heard the name", "None"],
            "Can apply it",
        ),
        "problem": (
            f"Type one practical use of {skill}.",
            skill.split()[0].lower(),
        ),
        "coding": (
            f"Describe a small practical task you could complete using {skill}.",
            [skill.split()[0].lower()],
        ),
    }


def assessment_page():
    mode = st.session_state.assessment_mode
    skills = st.session_state.assessment_skills or list(st.session_state.selected_skills.keys())

    title = "Re-Assessment" if mode == "reassessment" else "Initial Assessment"

    app_header(
        title,
        "Each skill is tested with quiz, problem-solving, and practical/coding evidence.",
    )

    if not skills:
        st.warning("No skills are selected for assessment.")
        if st.button("Go to Required Skills"):
            navigate("Required Skills")
        return

    answers = {}

    for skill in skills:
        question_set = get_question_set(skill, mode)
        st.subheader(skill)

        with st.container(border=True):
            quiz_question, quiz_options, _ = question_set["quiz"]
            quiz_answer = st.radio(
                quiz_question,
                quiz_options,
                key=f"{mode}_{skill}_quiz",
            )

            problem_question, _ = question_set["problem"]
            problem_answer = st.text_input(
                problem_question,
                key=f"{mode}_{skill}_problem",
            )

            coding_question, _ = question_set["coding"]
            coding_answer = st.text_area(
                coding_question,
                key=f"{mode}_{skill}_coding",
                height=100,
            )

            answers[skill] = {
                "quiz": quiz_answer,
                "problem": problem_answer,
                "coding": coding_answer,
            }

    if st.button("Submit Assessment", type="primary", use_container_width=True):
        career_skills = CAREERS[st.session_state.target_career]["skills"]

        detailed_results = {}
        total_score = 0.0
        passed_skills = []

        for skill in skills:
            question_set = get_question_set(skill, mode)
            response = answers[skill]

            correct_quiz = question_set["quiz"][2].strip().lower()
            selected_quiz = response["quiz"].strip().lower()
            quiz_score = 100.0 if selected_quiz == correct_quiz else 0.0

            expected_problem = question_set["problem"][1].lower()
            actual_problem = response["problem"].strip().lower()

            if expected_problem in actual_problem:
                problem_score = 100.0
            elif actual_problem:
                problem_score = 50.0
            else:
                problem_score = 0.0

            keywords = [keyword.lower() for keyword in question_set["coding"][1]]
            coding_text = response["coding"].lower()

            matched_keywords = sum(
                1 for keyword in keywords if keyword in coding_text
            )
            coding_score = (
                matched_keywords / len(keywords) * 100.0
                if keywords
                else 0.0
            )

            final_score = round(
                (quiz_score * 0.30 + problem_score * 0.30 + coding_score * 0.40) / 10.0,
                1,
            )

            st.session_state.skill_scores[skill] = final_score

            required_score = career_skills.get(skill, 7.0)

            if mode == "reassessment" and final_score >= required_score:
                passed_skills.append(skill)
                ensure_certificate(skill, final_score, required_score)

            detailed_results[skill] = {
                "quiz": quiz_score,
                "problem": problem_score,
                "coding": coding_score,
                "final": final_score,
                "required": required_score,
            }

            total_score += final_score

        overall_score = round(total_score / len(skills), 1)

        st.session_state.assessment_report = {
            "mode": mode,
            "targetCareer": st.session_state.target_career,
            "skillScores": {
                skill: st.session_state.skill_scores[skill]
                for skill in skills
            },
            "detailedResults": detailed_results,
            "passedSkills": passed_skills,
            "overallScore": overall_score,
            "completedAt": date.today().isoformat(),
        }

        st.session_state.assessment_mode = "initial"
        st.session_state.assessment_skills = []

        navigate("Assessment Report")


# ============================================================
# 10. ASSESSMENT REPORT
# ============================================================

def assessment_report_page():
    app_header(
        "Assessment Report",
        "See verified evidence from the most recent assessment.",
    )

    report = st.session_state.assessment_report

    if not report:
        st.warning("No assessment report is available yet.")
        return

    st.metric("Overall Assessment Score", f"{report['overallScore']}/10")

    if report.get("mode") == "reassessment":
        st.info(
            "This report is from a re-assessment. "
            "Passing skills are automatically verified."
        )

    for skill, result in report.get("detailedResults", {}).items():
        with st.container(border=True):
            col1, col2, col3, col4 = st.columns(4)

            col1.metric("Final", f"{result['final']}/10")
            col2.metric("Required", f"{result['required']}/10")

            _, gap_percentage = score_gap(
                result["required"],
                result["final"],
            )

            col3.metric("Remaining Gap", f"{gap_percentage:.0f}%")

            status = (
                "Verified"
                if skill in st.session_state.verified_skills
                else "Developing"
            )
            col4.metric("Status", status)

            st.write(
                f"Quiz: {result['quiz']:.0f}% | "
                f"Problem Solving: {result['problem']:.0f}% | "
                f"Practical/Coding: {result['coding']:.0f}%"
            )

    if st.button("View Skill Gap", type="primary", use_container_width=True):
        navigate("Skill Gap")


# ============================================================
# 11. SKILL GAP
# ============================================================

def skill_gap_page():
    app_header(
        "Skill Gap",
        "Compare required career scores with demonstrated assessment scores.",
    )

    career = CAREERS[st.session_state.target_career]
    rows = []

    for skill, required_score in career["skills"].items():
        demonstrated_score = float(st.session_state.skill_scores.get(skill, 0.0))

        gap_score, gap_percentage = score_gap(
            required_score,
            demonstrated_score,
        )

        if skill in st.session_state.verified_skills:
            status = "Verified"
        elif skill not in st.session_state.skill_scores:
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

    rows.sort(reverse=True)

    for (
        gap_percentage,
        skill,
        required_score,
        demonstrated_score,
        gap_score,
        status,
    ) in rows:
        with st.container(border=True):
            col1, col2, col3, col4 = st.columns(4)

            col1.write(f"### {skill}")
            col2.metric("Required", f"{required_score}/10")
            col3.metric("Demonstrated", f"{demonstrated_score}/10")
            col4.metric("Gap", f"{gap_percentage:.0f}%")

            readiness_bar = int(max(0, min(100, 100 - gap_percentage)))
            st.progress(readiness_bar)

            st.caption(
                f"Status: {status} | Score gap: {gap_score:.1f}"
            )

    if st.button(
        "Build Personalized Roadmap",
        type="primary",
        use_container_width=True,
    ):
        navigate("Roadmap")


# ============================================================
# 12. ROADMAP WITH STUDY MATERIALS / COURSES / LINKS
# ============================================================

def roadmap_page():
    app_header(
        "Personalized Roadmap",
        "Learn what matters most, with topics, free study materials, "
        "practice resources, paid courses, and a practical project.",
    )

    col1, col2 = st.columns(2)

    months = col1.selectbox(
        "Goal duration",
        [1, 2, 3, 6],
        index=[1, 2, 3, 6].index(st.session_state.roadmap_months),
        format_func=lambda value: f"{value} month" if value == 1 else f"{value} months",
    )

    weekly_hours = col2.slider(
        "Study hours per week",
        2,
        30,
        st.session_state.roadmap_weekly_hours,
    )

    st.session_state.roadmap_months = months
    st.session_state.roadmap_weekly_hours = weekly_hours

    if st.button("Generate Roadmap", type="primary"):
        career = CAREERS[st.session_state.target_career]

        gaps = []

        for skill, required_score in career["skills"].items():
            demonstrated_score = float(
                st.session_state.skill_scores.get(skill, 0.0)
            )

            _, gap_percentage = score_gap(
                required_score,
                demonstrated_score,
            )

            if gap_percentage > 0:
                gaps.append((skill, gap_percentage))

        total_gap = sum(gap for _, gap in gaps)
        if total_gap == 0:
            total_gap = 1.0

        total_weeks = months * 4
        roadmap_plan = []

        sorted_gaps = sorted(
            gaps,
            key=lambda item: item[1],
            reverse=True,
        )

        for skill, gap_percentage in sorted_gaps:
            weight = gap_percentage / total_gap

            hours_per_week = max(
                0.5,
                round(weekly_hours * weight, 1),
            )

            recommended_weeks = max(
                1,
                round(total_weeks * weight),
            )

            resource_data = RESOURCES.get(skill, fallback_resources(skill))

            roadmap_plan.append(
                {
                    "skill": skill,
                    "gap": gap_percentage,
                    "hours_per_week": hours_per_week,
                    "recommended_weeks": recommended_weeks,
                    "topics": resource_data["topics"],
                    "free_resources": resource_data["free"],
                    "practice_resources": resource_data["practice"],
                    "paid_resources": resource_data["paid"],
                    "project": resource_data["project"],
                }
            )

        st.session_state.roadmap = roadmap_plan
        st.session_state.progress = {}
        st.success("Personalized roadmap generated.")

    if not st.session_state.roadmap:
        st.info(
            "Generate a roadmap to see your prioritized learning plan."
        )
        return

    st.markdown("## Your Learning Plan")
    st.caption(
        "Skills with larger gaps receive higher priority and a larger share of your weekly study time."
    )

    for index, item in enumerate(st.session_state.roadmap, start=1):
        with st.container(border=True):
            st.markdown(f"## {index}. {item['skill']}")

            col1, col2, col3 = st.columns(3)

            col1.metric("Current Gap", f"{item['gap']:.0f}%")
            col2.metric("Study Hours / Week", item["hours_per_week"])
            col3.metric("Recommended Weeks", item["recommended_weeks"])

            st.markdown("### 📘 Topics to Learn")

            for topic_index, topic in enumerate(item["topics"], start=1):
                st.write(f"{topic_index}. {topic}")

            st.markdown("### 📚 Free Study Materials")

            for resource in item["free_resources"]:
                st.link_button(
                    f"Open {resource['name']}",
                    resource["url"],
                    use_container_width=True,
                )

            st.markdown("### 🧪 Practice Platforms")

            for resource in item["practice_resources"]:
                st.link_button(
                    f"Practice on {resource['name']}",
                    resource["url"],
                    use_container_width=True,
                )

            st.markdown("### 💳 Paid Course Suggestions")

            st.caption(
                "These buttons open platform/search pages. "
                "Course names, availability, and prices may change."
            )

            for resource in item["paid_resources"]:
                st.link_button(
                    f"View {resource['name']}",
                    resource["url"],
                    use_container_width=True,
                )

            st.markdown("### 🛠 Recommended Practical Project")
            st.info(item["project"])

    if st.button(
        "Start Progress Tracking",
        type="primary",
        use_container_width=True,
    ):
        navigate("Progress")


# ============================================================
# 13. PROGRESS / RE-ASSESSMENT
# ============================================================

def progress_page():
    app_header(
        "Progress & Re-Assessment",
        "Complete roadmap topics, then re-assess a skill when its learning plan reaches 100%.",
    )

    if not st.session_state.roadmap:
        st.warning("Generate a roadmap first.")
        return

    ready_skills = []

    for item in st.session_state.roadmap:
        skill = item["skill"]

        with st.container(border=True):
            st.subheader(skill)

            completed_count = 0

            for topic in item["topics"]:
                progress_key = f"{skill}::{topic}"

                checked = st.checkbox(
                    topic,
                    value=st.session_state.progress.get(progress_key, False),
                    key=f"check_{progress_key}",
                )

                st.session_state.progress[progress_key] = checked
                completed_count += int(checked)

            progress_percentage = (
                completed_count / len(item["topics"]) * 100.0
                if item["topics"]
                else 0.0
            )

            st.progress(int(progress_percentage))
            st.write(f"Progress: **{progress_percentage:.0f}%**")

            if skill in st.session_state.verified_skills:
                verified_score = st.session_state.verified_skills[skill]
                st.success(f"✓ {skill} is verified at {verified_score}/10")

            elif progress_percentage >= 100:
                ready_skills.append(skill)

                if st.button(
                    f"Re-Assess {skill}",
                    key=f"reassess_{skill}",
                ):
                    st.session_state.assessment_mode = "reassessment"
                    st.session_state.assessment_skills = [skill]
                    navigate("Assessment")

            else:
                st.caption(
                    "Complete all roadmap topics to unlock re-assessment."
                )

    if ready_skills and st.button(
        "Re-Assess All Ready Skills",
        type="primary",
        use_container_width=True,
    ):
        st.session_state.assessment_mode = "reassessment"
        st.session_state.assessment_skills = ready_skills
        navigate("Assessment")


# ============================================================
# 14. CREDENTIALS
# ============================================================

def credentials_page():
    app_header(
        "Credentials",
        "NEXTPATH issues project-level skill verification after successful re-assessment.",
    )

    if not st.session_state.certificates:
        st.info(
            "No verified certificates yet. Complete a roadmap skill and pass its re-assessment."
        )
        return

    for certificate in st.session_state.certificates:
        with st.container(border=True):
            skill = certificate["skill"]

            st.subheader(f"🏅 NEXTPATH Skill Certificate — {skill}")

            st.write(f"**Student:** {st.session_state.student_name}")

            st.markdown(
                f"""
**Certificate ID:** {certificate['id']}  
**Career:** {certificate['career']}  
**Verified Score:** {certificate['score']}/10  
**Required Score:** {certificate['required']}/10  
**Issue Date:** {certificate['date']}
"""
            )

            st.success("NEXTPATH Verified")

    st.caption(
        "These are demo/project-issued credentials and are not official university or third-party certificates."
    )


# ============================================================
# 15. OPPORTUNITIES
# ============================================================

def opportunities_page():
    app_header(
        "Opportunities",
        "Match opportunities to verified skills and overall career readiness.",
    )

    career = CAREERS[st.session_state.target_career]
    readiness = overall_readiness()

    total_required = len(career["skills"])
    verified_required = sum(
        1
        for skill in career["skills"]
        if skill in st.session_state.verified_skills
    )

    verified_match = (
        verified_required / total_required * 100.0
        if total_required
        else 0.0
    )

    col1, col2 = st.columns(2)
    col1.metric("Verified Skill Match", f"{verified_match:.0f}%")
    col2.metric("Overall Readiness", f"{readiness:.0f}%")

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
        "Business Analyst": [
            "Junior Business Analyst",
            "Business Intelligence Intern",
            "Operations Analyst",
            "Product Analyst Intern",
        ],
    }

    roles = role_map.get(
        st.session_state.target_career,
        ["Entry-Level Analytics Role"],
    )

    for index, role in enumerate(roles):
        match_score = round(
            0.7 * verified_match
            + 0.2 * readiness
            + 10
            - index * 3
        )

        match_score = min(99, max(0, match_score))

        with st.container(border=True):
            st.subheader(role)
            st.metric("Prototype Match Score", f"{match_score}%")
            st.caption(
                "This is a demo recommendation score, not a live vacancy or verified employer match."
            )

    st.markdown("### Search Jobs")
    st.link_button(
        "LinkedIn Jobs",
        "https://www.linkedin.com/jobs/",
        use_container_width=True,
    )
    st.link_button(
        "Indeed India",
        "https://in.indeed.com/",
        use_container_width=True,
    )
    st.link_button(
        "Naukri",
        "https://www.naukri.com/",
        use_container_width=True,
    )


# ============================================================
# 16. ARCHITECTURE
# ============================================================

def architecture_page():
    app_header(
        "System Architecture",
        "How the full NEXTPATH concept works from evidence to action.",
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
Largest Gaps First
+ Weekly Study Time
+ Free Study Materials
+ Practice Platforms
+ Paid Course Suggestions
+ Practical Project
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

    st.subheader("Prototype data flow")

    st.write("1. Career skill requirements are stored in the app.")
    st.write("2. Assessment evidence creates demonstrated scores.")
    st.write("3. The gap engine compares demonstrated vs required scores.")
    st.write("4. The roadmap prioritizes the largest remaining gaps.")
    st.write("5. The roadmap recommends study materials and course platforms.")
    st.write("6. Progress tracking unlocks re-assessment.")
    st.write("7. Successful re-assessment verifies the skill.")
    st.write("8. Verified skills improve opportunity matching.")



# ============================================================
# 16A. EMBEDDED DEMO GUIDE
# This text is not required for execution. It is intentionally
# stored in the code so a teammate or evaluator can understand
# the prototype without opening another document.
# ============================================================

DEMO_GUIDE = """
NEXTPATH DEMO GUIDE
===================

PURPOSE
-------
NEXTPATH is a career-readiness prototype. It connects a target
career with required skills, assessment evidence, skill gaps,
learning resources, progress tracking, reassessment, credentials,
and opportunity recommendations.

CORE FLOW
---------
1. The learner selects a target career.
2. The app shows the skills required for that career.
3. The learner selects only skills they already know.
4. Those selected skills are assessed.
5. The assessment produces demonstrated scores.
6. The skill-gap engine compares required score and demonstrated score.
7. Unassessed career skills are treated as having no demonstrated evidence.
8. The roadmap prioritizes the largest gaps.
9. The learner chooses goal duration and weekly study hours.
10. NEXTPATH allocates study time based on gap size.
11. Each roadmap skill contains topics, free resources, practice,
    paid course search links, and a project.
12. Progress is tracked topic by topic.
13. When a skill reaches 100% roadmap completion, reassessment unlocks.
14. Reassessment uses a second question set when available.
15. A learner passes a skill when reassessment score is at least
    the career-required score.
16. Passing creates a verified skill and a project-level credential.
17. Failing keeps the updated score and leaves a remaining gap.
18. Opportunities are recommended from career fit, readiness,
    and verified-skill coverage.

SCORING
-------
The current prototype assessment uses:
- Quiz: 30%
- Problem solving: 30%
- Practical/coding evidence: 40%

The final skill score is normalized to a 0-10 scale.

SKILL GAP
---------
gap_score = max(0, required_score - demonstrated_score)

gap_percentage =
    max(
        0,
        min(
            100,
            gap_score / required_score * 100
        )
    )

A learner who meets or exceeds the required score has a 0% gap.

ROADMAP PRIORITY
----------------
Each skill receives a weight based on its gap:

weight = skill_gap_percentage / total_gap_percentage

Weekly learning time is allocated proportionally:

skill_hours_per_week = weekly_hours * weight

Recommended weeks are also distributed proportionally.

LEARNING RESOURCES
------------------
The demo intentionally separates:
- Free study materials
- Practice platforms
- Paid course search pages
- Practical project

Paid-course links are platform/search links instead of promises about
a single specific course. Course titles, availability, instructors,
discounts, and pricing can change over time.

REASSESSMENT
------------
Reassessment is unlocked only after the roadmap topics for a skill
are completed. This creates a simple evidence loop:

Gap
→ Learning
→ Practice
→ Completion
→ Reassessment
→ Updated evidence
→ Verified or continue learning

CREDENTIALS
-----------
Credentials in this demo are NEXTPATH project credentials.
They are not official university, government, Coursera, Microsoft,
Google, AWS, or employer certificates.

OPPORTUNITY MATCHING
--------------------
The opportunity match is a prototype score. It does not claim to be
a live employer ranking. The demo combines verified-skill coverage,
overall readiness, and a simple career similarity component.

DATA LIMITATIONS
----------------
Career scores in this prototype are demonstrative configuration values.
They should not be presented as official labor-market thresholds unless
supported by a validated external dataset and documented methodology.

SECURITY LIMITATIONS
--------------------
This standalone Streamlit demo stores state in the Streamlit session.
It is not a production authentication, authorization, credential,
or database implementation.

DEPLOYMENT
----------
The standalone demo can be deployed to Streamlit Community Cloud.
The full NEXTPATH application should use:
- React/Vite frontend
- FastAPI backend
- Database for persistent accounts and progress
- Environment variables for API URLs and secrets
- Proper authentication
- CORS configuration
- Production hosting

JURY DEMO SCRIPT
----------------
A simple live presentation can follow this order:

A. Dashboard
Show that the platform tracks target career, readiness,
roadmap progress, and verified skills.

B. Target Career
Choose a career such as Data Analyst or AI Engineer.

C. Required Skills
Explain that self-confidence does not become the final score.
The learner selects only skills they already know.

D. Assessment
Demonstrate quiz, problem solving, and practical/coding evidence.

E. Assessment Report
Show the demonstrated score and required score.

F. Skill Gap
Explain the gap formula and show unknown/unassessed skills.

G. Roadmap
Choose target duration and weekly hours.
Show prioritized skills, free materials, practice links,
paid-course options, and the project.

H. Progress
Mark roadmap topics as complete.

I. Reassessment
Explain that reassessment is unlocked by learning progress.

J. Credentials
Show that a passing reassessment can create a NEXTPATH credential.

K. Opportunities
Explain that recommendations become stronger as verified skills grow.

L. Architecture
Close by showing the complete evidence-to-action pipeline.

FUTURE IMPROVEMENTS
-------------------
Possible next versions can include:
- Real user accounts
- Database persistence
- Real coding sandbox
- AI-generated adaptive questions
- Live labor-market data
- Resume parsing
- Portfolio evidence
- GitHub integration
- Internship feeds
- College LMS integration
- Mentor dashboard
- Skill decay / recertification
- Explainable recommendation reasons
- Job-description parsing
- Personalized AI career coach
- Calendar-based study planning
- Notifications
- Mobile PWA
- Native mobile wrapper
- Employer verification
- Digital credential signing
- Analytics dashboard for institutions

END OF GUIDE
============
"""


# ============================================================
# 17. APP ROUTER
# ============================================================

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
