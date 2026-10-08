import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const STORAGE_KEYS = {
  target: "nextpathTargetCareer",
  targetData: "nextpathTargetCareerData",
  gaps: "nextpathSkillGaps",
  roadmapPreferences: "nextpathRoadmapPreferences",
  roadmapPlan: "nextpathRoadmapPlan",
  roadmapProgress: "nextpathRoadmapProgress",
  mode: "nextpathAssessmentMode",
  reassessmentSkills: "nextpathReassessmentSkills",
};

const RESOURCE_CATALOG = {
  "SQL": {
    "topics": [
      "SELECT, WHERE, ORDER BY and LIMIT",
      "JOINs and relational keys",
      "GROUP BY, aggregate functions and HAVING",
      "Subqueries and common table expressions",
      "Window functions and analytical queries",
      "Indexes and query-performance basics",
      "Data cleaning with SQL",
      "Portfolio SQL case study"
    ],
    "free": [
      {
        "name": "SQLBolt",
        "url": "https://sqlbolt.com/",
        "type": "Interactive"
      },
      {
        "name": "PostgreSQL Tutorial",
        "url": "https://www.postgresql.org/docs/current/tutorial.html",
        "type": "Official"
      },
      {
        "name": "W3Schools SQL",
        "url": "https://www.w3schools.com/sql/",
        "type": "Tutorial"
      },
      {
        "name": "HackerRank SQL Practice",
        "url": "https://www.hackerrank.com/domains/sql",
        "type": "Practice"
      }
    ],
    "practice": [
      {
        "name": "LeetCode Database",
        "url": "https://leetcode.com/problemset/database/"
      },
      {
        "name": "HackerRank SQL",
        "url": "https://www.hackerrank.com/domains/sql"
      }
    ],
    "paid": [
      {
        "name": "Coursera SQL Courses",
        "url": "https://www.coursera.org/search?query=sql",
        "provider": "Coursera"
      },
      {
        "name": "LinkedIn Learning SQL",
        "url": "https://www.linkedin.com/learning/search?keywords=sql",
        "provider": "LinkedIn Learning"
      },
      {
        "name": "Udemy SQL Courses",
        "url": "https://www.udemy.com/courses/search/?q=sql",
        "provider": "Udemy"
      },
      {
        "name": "DataCamp SQL",
        "url": "https://www.datacamp.com/category/sql",
        "provider": "DataCamp"
      }
    ],
    "project": "Build a sales database and answer business questions using joins, CTEs, window functions and performance-aware queries."
  },
  "Python": {
    "topics": [
      "Python syntax, variables and data types",
      "Conditions, loops and comprehensions",
      "Functions and modular programming",
      "Lists, dictionaries, sets and tuples",
      "Files, exceptions and validation",
      "NumPy fundamentals",
      "pandas DataFrames and cleaning",
      "Automation and portfolio project"
    ],
    "free": [
      {
        "name": "Official Python Tutorial",
        "url": "https://docs.python.org/3/tutorial/",
        "type": "Official"
      },
      {
        "name": "Kaggle Python",
        "url": "https://www.kaggle.com/learn/python",
        "type": "Course"
      },
      {
        "name": "freeCodeCamp Python",
        "url": "https://www.freecodecamp.org/learn/scientific-computing-with-python/",
        "type": "Course"
      },
      {
        "name": "pandas Getting Started",
        "url": "https://pandas.pydata.org/docs/getting_started/index.html",
        "type": "Official"
      }
    ],
    "practice": [
      {
        "name": "HackerRank Python",
        "url": "https://www.hackerrank.com/domains/python"
      },
      {
        "name": "Exercism Python",
        "url": "https://exercism.org/tracks/python"
      }
    ],
    "paid": [
      {
        "name": "Coursera Python Courses",
        "url": "https://www.coursera.org/search?query=python",
        "provider": "Coursera"
      },
      {
        "name": "LinkedIn Learning Python",
        "url": "https://www.linkedin.com/learning/search?keywords=python",
        "provider": "LinkedIn Learning"
      },
      {
        "name": "Udemy Python Courses",
        "url": "https://www.udemy.com/courses/search/?q=python",
        "provider": "Udemy"
      },
      {
        "name": "DataCamp Python",
        "url": "https://www.datacamp.com/category/python",
        "provider": "DataCamp"
      }
    ],
    "project": "Create a Python data-cleaning and KPI analysis tool that reads raw CSV data and exports a cleaned report."
  },
  "Excel": {
    "topics": [
      "Workbook and table fundamentals",
      "Core formulas and references",
      "IF, SUMIFS, COUNTIFS and text functions",
      "XLOOKUP and lookup strategies",
      "Data cleaning and validation",
      "PivotTables and PivotCharts",
      "Power Query basics",
      "Dashboard project"
    ],
    "free": [
      {
        "name": "Microsoft Excel Help & Learning",
        "url": "https://support.microsoft.com/excel",
        "type": "Official"
      },
      {
        "name": "Excel Easy",
        "url": "https://www.excel-easy.com/",
        "type": "Tutorial"
      },
      {
        "name": "Excel Practice Online",
        "url": "https://excel-practice-online.com/",
        "type": "Practice"
      }
    ],
    "practice": [
      {
        "name": "Excel Practice Online",
        "url": "https://excel-practice-online.com/"
      },
      {
        "name": "Microsoft Excel Templates",
        "url": "https://create.microsoft.com/en-us/excel-templates"
      }
    ],
    "paid": [
      {
        "name": "Coursera Excel Courses",
        "url": "https://www.coursera.org/search?query=excel",
        "provider": "Coursera"
      },
      {
        "name": "LinkedIn Learning Excel",
        "url": "https://www.linkedin.com/learning/search?keywords=excel",
        "provider": "LinkedIn Learning"
      },
      {
        "name": "Udemy Excel Courses",
        "url": "https://www.udemy.com/courses/search/?q=excel",
        "provider": "Udemy"
      }
    ],
    "project": "Build an interactive sales or student-performance dashboard with formulas, PivotTables, slicers and Power Query."
  },
  "Power BI": {
    "topics": [
      "Power BI Desktop workflow",
      "Power Query transformation",
      "Data modeling and relationships",
      "Star-schema design",
      "DAX measures",
      "Filter context and CALCULATE",
      "Visual design and interaction",
      "Dashboard publishing project"
    ],
    "free": [
      {
        "name": "Microsoft Learn Power BI",
        "url": "https://learn.microsoft.com/training/powerplatform/power-bi/",
        "type": "Official"
      },
      {
        "name": "Power BI Documentation",
        "url": "https://learn.microsoft.com/power-bi/",
        "type": "Official"
      },
      {
        "name": "Power BI Samples",
        "url": "https://learn.microsoft.com/power-bi/create-reports/sample-datasets",
        "type": "Datasets"
      }
    ],
    "practice": [
      {
        "name": "Power BI Sample Datasets",
        "url": "https://learn.microsoft.com/power-bi/create-reports/sample-datasets"
      },
      {
        "name": "Kaggle Datasets",
        "url": "https://www.kaggle.com/datasets"
      }
    ],
    "paid": [
      {
        "name": "Coursera Power BI",
        "url": "https://www.coursera.org/search?query=power%20bi",
        "provider": "Coursera"
      },
      {
        "name": "LinkedIn Learning Power BI",
        "url": "https://www.linkedin.com/learning/search?keywords=power%20bi",
        "provider": "LinkedIn Learning"
      },
      {
        "name": "Udemy Power BI",
        "url": "https://www.udemy.com/courses/search/?q=power%20bi",
        "provider": "Udemy"
      }
    ],
    "project": "Create an executive dashboard using a star schema, DAX measures, slicers and drill-through."
  },
  "Statistics": {
    "topics": [
      "Descriptive statistics",
      "Probability fundamentals",
      "Random variables and distributions",
      "Sampling and the central limit idea",
      "Confidence intervals",
      "Hypothesis testing",
      "Correlation and regression basics",
      "Statistical analysis project"
    ],
    "free": [
      {
        "name": "Khan Academy Statistics",
        "url": "https://www.khanacademy.org/math/statistics-probability",
        "type": "Course"
      },
      {
        "name": "StatQuest",
        "url": "https://www.youtube.com/@statquest",
        "type": "Video"
      },
      {
        "name": "OpenIntro Statistics",
        "url": "https://www.openintro.org/book/os/",
        "type": "Book"
      },
      {
        "name": "Kaggle Intro to Machine Learning",
        "url": "https://www.kaggle.com/learn/intro-to-machine-learning",
        "type": "Applied"
      }
    ],
    "practice": [
      {
        "name": "Khan Academy Practice",
        "url": "https://www.khanacademy.org/math/statistics-probability"
      },
      {
        "name": "Kaggle Datasets",
        "url": "https://www.kaggle.com/datasets"
      }
    ],
    "paid": [
      {
        "name": "Coursera Statistics",
        "url": "https://www.coursera.org/search?query=statistics",
        "provider": "Coursera"
      },
      {
        "name": "LinkedIn Learning Statistics",
        "url": "https://www.linkedin.com/learning/search?keywords=statistics",
        "provider": "LinkedIn Learning"
      },
      {
        "name": "Udemy Statistics",
        "url": "https://www.udemy.com/courses/search/?q=statistics",
        "provider": "Udemy"
      }
    ],
    "project": "Analyze a dataset using descriptive statistics, confidence intervals and one clearly justified hypothesis test."
  },
  "Data Visualization": {
    "topics": [
      "Choosing the right chart",
      "Comparison, distribution, relationship and composition",
      "Color, labels and accessibility",
      "Matplotlib fundamentals",
      "Advanced plotting patterns",
      "Dashboard storytelling",
      "Executive visual communication",
      "Data-story portfolio project"
    ],
    "free": [
      {
        "name": "Matplotlib Tutorials",
        "url": "https://matplotlib.org/stable/tutorials/index.html",
        "type": "Official"
      },
      {
        "name": "Kaggle Data Visualization",
        "url": "https://www.kaggle.com/learn/data-visualization",
        "type": "Course"
      },
      {
        "name": "Tableau Public",
        "url": "https://public.tableau.com/",
        "type": "Practice"
      }
    ],
    "practice": [
      {
        "name": "Makeover Monday",
        "url": "https://www.makeovermonday.co.uk/"
      },
      {
        "name": "Kaggle Datasets",
        "url": "https://www.kaggle.com/datasets"
      }
    ],
    "paid": [
      {
        "name": "Coursera Data Visualization",
        "url": "https://www.coursera.org/search?query=data%20visualization",
        "provider": "Coursera"
      },
      {
        "name": "LinkedIn Learning Data Visualization",
        "url": "https://www.linkedin.com/learning/search?keywords=data%20visualization",
        "provider": "LinkedIn Learning"
      },
      {
        "name": "Udemy Data Visualization",
        "url": "https://www.udemy.com/courses/search/?q=data%20visualization",
        "provider": "Udemy"
      }
    ],
    "project": "Turn one dataset into a five-chart story with an executive summary and design rationale."
  },
  "Communication": {
    "topics": [
      "Audience analysis",
      "Clear technical writing",
      "Executive summaries",
      "Presentation structure",
      "Data storytelling",
      "Stakeholder communication",
      "Recommendation framing",
      "Jury-presentation practice"
    ],
    "free": [
      {
        "name": "Purdue OWL",
        "url": "https://owl.purdue.edu/",
        "type": "Writing"
      },
      {
        "name": "Toastmasters Resources",
        "url": "https://www.toastmasters.org/resources",
        "type": "Speaking"
      },
      {
        "name": "Google Technical Writing",
        "url": "https://developers.google.com/tech-writing",
        "type": "Course"
      }
    ],
    "practice": [
      {
        "name": "Toastmasters Resources",
        "url": "https://www.toastmasters.org/resources"
      },
      {
        "name": "Google Technical Writing",
        "url": "https://developers.google.com/tech-writing"
      }
    ],
    "paid": [
      {
        "name": "Coursera Communication Courses",
        "url": "https://www.coursera.org/search?query=business%20communication",
        "provider": "Coursera"
      },
      {
        "name": "LinkedIn Learning Communication",
        "url": "https://www.linkedin.com/learning/search?keywords=business%20communication",
        "provider": "LinkedIn Learning"
      },
      {
        "name": "Udemy Communication",
        "url": "https://www.udemy.com/courses/search/?q=business%20communication",
        "provider": "Udemy"
      }
    ],
    "project": "Prepare a three-minute project pitch plus a one-page executive brief for a nontechnical jury."
  },
  "Business Analysis": {
    "topics": [
      "Business problem framing",
      "Stakeholder analysis",
      "Requirements elicitation",
      "Process mapping",
      "KPI design",
      "Gap analysis",
      "Prioritization and acceptance criteria",
      "Business case project"
    ],
    "free": [
      {
        "name": "IIBA Resources",
        "url": "https://www.iiba.org/business-analysis-blogs/",
        "type": "Professional"
      },
      {
        "name": "Atlassian Requirements Guide",
        "url": "https://www.atlassian.com/agile/product-management/requirements",
        "type": "Guide"
      }
    ],
    "practice": [
      {
        "name": "IIBA Blog",
        "url": "https://www.iiba.org/business-analysis-blogs/"
      },
      {
        "name": "Atlassian Agile Resources",
        "url": "https://www.atlassian.com/agile"
      }
    ],
    "paid": [
      {
        "name": "Coursera Business Analysis",
        "url": "https://www.coursera.org/search?query=business%20analysis",
        "provider": "Coursera"
      },
      {
        "name": "LinkedIn Learning Business Analysis",
        "url": "https://www.linkedin.com/learning/search?keywords=business%20analysis",
        "provider": "LinkedIn Learning"
      },
      {
        "name": "Udemy Business Analysis",
        "url": "https://www.udemy.com/courses/search/?q=business%20analysis",
        "provider": "Udemy"
      }
    ],
    "project": "Create a business requirements document, stakeholder map, current-state process and measurable future-state proposal."
  },
  "Machine Learning": {
    "topics": [
      "Supervised vs unsupervised learning",
      "Train, validation and test strategy",
      "Preprocessing and feature engineering",
      "Classification and regression",
      "Evaluation metrics",
      "Cross-validation and model selection",
      "Overfitting and regularization",
      "End-to-end ML project"
    ],
    "free": [
      {
        "name": "Google ML Crash Course",
        "url": "https://developers.google.com/machine-learning/crash-course",
        "type": "Course"
      },
      {
        "name": "Kaggle Intro to ML",
        "url": "https://www.kaggle.com/learn/intro-to-machine-learning",
        "type": "Course"
      },
      {
        "name": "scikit-learn User Guide",
        "url": "https://scikit-learn.org/stable/user_guide.html",
        "type": "Official"
      }
    ],
    "practice": [
      {
        "name": "Kaggle Competitions",
        "url": "https://www.kaggle.com/competitions"
      },
      {
        "name": "Kaggle Datasets",
        "url": "https://www.kaggle.com/datasets"
      }
    ],
    "paid": [
      {
        "name": "Coursera Machine Learning",
        "url": "https://www.coursera.org/search?query=machine%20learning",
        "provider": "Coursera"
      },
      {
        "name": "LinkedIn Learning Machine Learning",
        "url": "https://www.linkedin.com/learning/search?keywords=machine%20learning",
        "provider": "LinkedIn Learning"
      },
      {
        "name": "Udemy Machine Learning",
        "url": "https://www.udemy.com/courses/search/?q=machine%20learning",
        "provider": "Udemy"
      },
      {
        "name": "DataCamp Machine Learning",
        "url": "https://www.datacamp.com/category/machine-learning",
        "provider": "DataCamp"
      }
    ],
    "project": "Build and compare two supervised models, justify the metric, analyze errors and document limitations."
  },
  "Deep Learning": {
    "topics": [
      "Neural-network fundamentals",
      "Activation functions",
      "Loss functions and optimization",
      "Backpropagation intuition",
      "Regularization",
      "CNN fundamentals",
      "Transfer learning",
      "Deep-learning project"
    ],
    "free": [
      {
        "name": "TensorFlow Tutorials",
        "url": "https://www.tensorflow.org/tutorials",
        "type": "Official"
      },
      {
        "name": "PyTorch Tutorials",
        "url": "https://pytorch.org/tutorials/",
        "type": "Official"
      },
      {
        "name": "Kaggle Intro to Deep Learning",
        "url": "https://www.kaggle.com/learn/intro-to-deep-learning",
        "type": "Course"
      }
    ],
    "practice": [
      {
        "name": "Kaggle Competitions",
        "url": "https://www.kaggle.com/competitions"
      },
      {
        "name": "TensorFlow Tutorials",
        "url": "https://www.tensorflow.org/tutorials"
      }
    ],
    "paid": [
      {
        "name": "Coursera Deep Learning",
        "url": "https://www.coursera.org/search?query=deep%20learning",
        "provider": "Coursera"
      },
      {
        "name": "LinkedIn Learning Deep Learning",
        "url": "https://www.linkedin.com/learning/search?keywords=deep%20learning",
        "provider": "LinkedIn Learning"
      },
      {
        "name": "Udemy Deep Learning",
        "url": "https://www.udemy.com/courses/search/?q=deep%20learning",
        "provider": "Udemy"
      }
    ],
    "project": "Train a neural network and compare training/validation behavior with regularization or transfer learning."
  },
  "Generative AI": {
    "topics": [
      "LLM and transformer concepts",
      "Prompt design",
      "Embeddings",
      "Semantic search",
      "Retrieval-augmented generation",
      "Evaluation and grounding",
      "LLM API integration",
      "GenAI portfolio project"
    ],
    "free": [
      {
        "name": "Hugging Face Learn",
        "url": "https://huggingface.co/learn",
        "type": "Course"
      },
      {
        "name": "Google Generative AI Learning",
        "url": "https://cloud.google.com/learn/training/machinelearning-ai",
        "type": "Learning"
      },
      {
        "name": "OpenAI Cookbook",
        "url": "https://cookbook.openai.com/",
        "type": "Examples"
      }
    ],
    "practice": [
      {
        "name": "Hugging Face Spaces",
        "url": "https://huggingface.co/spaces"
      },
      {
        "name": "Kaggle Datasets",
        "url": "https://www.kaggle.com/datasets"
      }
    ],
    "paid": [
      {
        "name": "Coursera Generative AI",
        "url": "https://www.coursera.org/search?query=generative%20ai",
        "provider": "Coursera"
      },
      {
        "name": "LinkedIn Learning Generative AI",
        "url": "https://www.linkedin.com/learning/search?keywords=generative%20ai",
        "provider": "LinkedIn Learning"
      },
      {
        "name": "Udemy Generative AI",
        "url": "https://www.udemy.com/courses/search/?q=generative%20ai",
        "provider": "Udemy"
      }
    ],
    "project": "Build a grounded assistant with retrieval, prompt control, evaluation and latency/quality tracking."
  },
  "APIs": {
    "topics": [
      "HTTP and REST fundamentals",
      "GET, POST, PUT/PATCH and DELETE",
      "Status codes",
      "JSON requests and responses",
      "Authentication concepts",
      "FastAPI fundamentals",
      "Validation and error handling",
      "API project and documentation"
    ],
    "free": [
      {
        "name": "FastAPI Tutorial",
        "url": "https://fastapi.tiangolo.com/tutorial/",
        "type": "Official"
      },
      {
        "name": "MDN HTTP",
        "url": "https://developer.mozilla.org/en-US/docs/Web/HTTP",
        "type": "Reference"
      },
      {
        "name": "Postman Learning Center",
        "url": "https://learning.postman.com/",
        "type": "Practice"
      }
    ],
    "practice": [
      {
        "name": "Postman Learning Center",
        "url": "https://learning.postman.com/"
      },
      {
        "name": "Public APIs List",
        "url": "https://github.com/public-apis/public-apis"
      }
    ],
    "paid": [
      {
        "name": "Coursera API Courses",
        "url": "https://www.coursera.org/search?query=rest%20api",
        "provider": "Coursera"
      },
      {
        "name": "LinkedIn Learning APIs",
        "url": "https://www.linkedin.com/learning/search?keywords=rest%20api",
        "provider": "LinkedIn Learning"
      },
      {
        "name": "Udemy FastAPI",
        "url": "https://www.udemy.com/courses/search/?q=fastapi",
        "provider": "Udemy"
      }
    ],
    "project": "Build a documented FastAPI service with CRUD endpoints, validation, error handling and a health route."
  },
  "MLOps": {
    "topics": [
      "ML lifecycle and reproducibility",
      "Experiment tracking",
      "Model packaging",
      "Docker fundamentals",
      "CI/CD for ML",
      "Model deployment",
      "Monitoring and drift",
      "MLOps project"
    ],
    "free": [
      {
        "name": "MLflow Documentation",
        "url": "https://mlflow.org/docs/latest/index.html",
        "type": "Official"
      },
      {
        "name": "Docker Get Started",
        "url": "https://docs.docker.com/get-started/",
        "type": "Official"
      },
      {
        "name": "GitHub Actions Docs",
        "url": "https://docs.github.com/actions",
        "type": "Official"
      }
    ],
    "practice": [
      {
        "name": "MLflow Quickstart",
        "url": "https://mlflow.org/docs/latest/ml/getting-started/"
      },
      {
        "name": "GitHub Actions Quickstart",
        "url": "https://docs.github.com/actions/writing-workflows/quickstart"
      }
    ],
    "paid": [
      {
        "name": "Coursera MLOps",
        "url": "https://www.coursera.org/search?query=mlops",
        "provider": "Coursera"
      },
      {
        "name": "LinkedIn Learning MLOps",
        "url": "https://www.linkedin.com/learning/search?keywords=mlops",
        "provider": "LinkedIn Learning"
      },
      {
        "name": "Udemy MLOps",
        "url": "https://www.udemy.com/courses/search/?q=mlops",
        "provider": "Udemy"
      }
    ],
    "project": "Containerize an ML inference API, track experiments and automate tests/deployment with CI."
  },
  "Cloud": {
    "topics": [
      "Cloud service models",
      "Compute fundamentals",
      "Object storage",
      "Managed databases",
      "IAM and permissions",
      "Networking basics",
      "Monitoring and cost awareness",
      "Cloud deployment project"
    ],
    "free": [
      {
        "name": "AWS Skill Builder",
        "url": "https://skillbuilder.aws/",
        "type": "Learning"
      },
      {
        "name": "Microsoft Learn Azure",
        "url": "https://learn.microsoft.com/training/azure/",
        "type": "Learning"
      },
      {
        "name": "Google Cloud Training",
        "url": "https://cloud.google.com/learn/training",
        "type": "Learning"
      }
    ],
    "practice": [
      {
        "name": "AWS Workshops",
        "url": "https://workshops.aws/"
      },
      {
        "name": "Microsoft Learn Sandbox Modules",
        "url": "https://learn.microsoft.com/training/azure/"
      }
    ],
    "paid": [
      {
        "name": "Coursera Cloud Computing",
        "url": "https://www.coursera.org/search?query=cloud%20computing",
        "provider": "Coursera"
      },
      {
        "name": "LinkedIn Learning Cloud",
        "url": "https://www.linkedin.com/learning/search?keywords=cloud%20computing",
        "provider": "LinkedIn Learning"
      },
      {
        "name": "Udemy Cloud Courses",
        "url": "https://www.udemy.com/courses/search/?q=cloud%20computing",
        "provider": "Udemy"
      }
    ],
    "project": "Deploy an API or dashboard to a cloud platform with environment variables, logs, IAM-aware access and cost notes."
  },
  "ETL": {
    "topics": [
      "ETL architecture",
      "Source extraction",
      "Cleaning and transformation",
      "Schema validation",
      "Loading strategies",
      "Incremental loads",
      "Scheduling and retries",
      "ETL pipeline project"
    ],
    "free": [
      {
        "name": "pandas IO Guide",
        "url": "https://pandas.pydata.org/docs/user_guide/io.html",
        "type": "Official"
      },
      {
        "name": "Apache Airflow Tutorial",
        "url": "https://airflow.apache.org/docs/apache-airflow/stable/tutorial/index.html",
        "type": "Official"
      },
      {
        "name": "Data Engineering Zoomcamp",
        "url": "https://github.com/DataTalksClub/data-engineering-zoomcamp",
        "type": "Course"
      }
    ],
    "practice": [
      {
        "name": "Kaggle Datasets",
        "url": "https://www.kaggle.com/datasets"
      },
      {
        "name": "Data Engineering Zoomcamp",
        "url": "https://github.com/DataTalksClub/data-engineering-zoomcamp"
      }
    ],
    "paid": [
      {
        "name": "Coursera ETL",
        "url": "https://www.coursera.org/search?query=etl",
        "provider": "Coursera"
      },
      {
        "name": "LinkedIn Learning ETL",
        "url": "https://www.linkedin.com/learning/search?keywords=etl",
        "provider": "LinkedIn Learning"
      },
      {
        "name": "Udemy ETL",
        "url": "https://www.udemy.com/courses/search/?q=etl",
        "provider": "Udemy"
      }
    ],
    "project": "Build an ETL pipeline that reads raw data, validates schema, cleans records, loads a database and logs failures."
  },
  "Data Pipelines": {
    "topics": [
      "Pipeline design",
      "Batch vs streaming",
      "Task dependencies",
      "Orchestration",
      "Retries and idempotency",
      "Logging and observability",
      "Data quality checks",
      "Pipeline project"
    ],
    "free": [
      {
        "name": "Apache Airflow Docs",
        "url": "https://airflow.apache.org/docs/",
        "type": "Official"
      },
      {
        "name": "Prefect Docs",
        "url": "https://docs.prefect.io/",
        "type": "Official"
      },
      {
        "name": "Data Engineering Zoomcamp",
        "url": "https://github.com/DataTalksClub/data-engineering-zoomcamp",
        "type": "Course"
      }
    ],
    "practice": [
      {
        "name": "Airflow Tutorial",
        "url": "https://airflow.apache.org/docs/apache-airflow/stable/tutorial/index.html"
      },
      {
        "name": "Prefect Examples",
        "url": "https://docs.prefect.io/"
      }
    ],
    "paid": [
      {
        "name": "Coursera Data Engineering",
        "url": "https://www.coursera.org/search?query=data%20engineering",
        "provider": "Coursera"
      },
      {
        "name": "LinkedIn Learning Data Pipelines",
        "url": "https://www.linkedin.com/learning/search?keywords=data%20pipelines",
        "provider": "LinkedIn Learning"
      },
      {
        "name": "Udemy Data Engineering",
        "url": "https://www.udemy.com/courses/search/?q=data%20engineering",
        "provider": "Udemy"
      }
    ],
    "project": "Create a scheduled pipeline with dependencies, retries, logging, data-quality checks and success/failure tracking."
  },
  "Big Data": {
    "topics": [
      "Distributed-processing concepts",
      "Spark architecture",
      "Spark DataFrames",
      "Transformations and actions",
      "Partitioning",
      "Joins and shuffle",
      "Parquet and columnar storage",
      "Spark project"
    ],
    "free": [
      {
        "name": "Apache Spark Quick Start",
        "url": "https://spark.apache.org/docs/latest/quick-start.html",
        "type": "Official"
      },
      {
        "name": "Databricks Learning",
        "url": "https://www.databricks.com/learn",
        "type": "Learning"
      },
      {
        "name": "PySpark Documentation",
        "url": "https://spark.apache.org/docs/latest/api/python/",
        "type": "Official"
      }
    ],
    "practice": [
      {
        "name": "Databricks Community Learning",
        "url": "https://www.databricks.com/learn"
      },
      {
        "name": "Kaggle Datasets",
        "url": "https://www.kaggle.com/datasets"
      }
    ],
    "paid": [
      {
        "name": "Coursera Apache Spark",
        "url": "https://www.coursera.org/search?query=apache%20spark",
        "provider": "Coursera"
      },
      {
        "name": "LinkedIn Learning Spark",
        "url": "https://www.linkedin.com/learning/search?keywords=apache%20spark",
        "provider": "LinkedIn Learning"
      },
      {
        "name": "Udemy Spark",
        "url": "https://www.udemy.com/courses/search/?q=apache%20spark",
        "provider": "Udemy"
      }
    ],
    "project": "Use Spark to process and aggregate a large dataset, then explain partitioning and shuffle decisions."
  },
  "Data Modeling": {
    "topics": [
      "Entities and attributes",
      "Primary and foreign keys",
      "Cardinality",
      "Normalization",
      "Transactional schemas",
      "Fact and dimension tables",
      "Star schemas",
      "Data-modeling project"
    ],
    "free": [
      {
        "name": "PostgreSQL DDL Tutorial",
        "url": "https://www.postgresql.org/docs/current/ddl.html",
        "type": "Official"
      },
      {
        "name": "dbdiagram",
        "url": "https://dbdiagram.io/",
        "type": "Tool"
      },
      {
        "name": "Kimball Group Articles",
        "url": "https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/",
        "type": "Reference"
      }
    ],
    "practice": [
      {
        "name": "dbdiagram",
        "url": "https://dbdiagram.io/"
      },
      {
        "name": "SQLBolt",
        "url": "https://sqlbolt.com/"
      }
    ],
    "paid": [
      {
        "name": "Coursera Data Modeling",
        "url": "https://www.coursera.org/search?query=data%20modeling",
        "provider": "Coursera"
      },
      {
        "name": "LinkedIn Learning Data Modeling",
        "url": "https://www.linkedin.com/learning/search?keywords=data%20modeling",
        "provider": "LinkedIn Learning"
      },
      {
        "name": "Udemy Data Modeling",
        "url": "https://www.udemy.com/courses/search/?q=data%20modeling",
        "provider": "Udemy"
      }
    ],
    "project": "Design both an OLTP ER model and an analytics star schema for the same business domain."
  },
  "Product Analytics": {
    "topics": [
      "Product metrics",
      "Event tracking",
      "Funnels",
      "Retention",
      "Cohort analysis",
      "Experimentation",
      "Activation and engagement",
      "Product analytics project"
    ],
    "free": [
      {
        "name": "Amplitude Academy",
        "url": "https://academy.amplitude.com/",
        "type": "Learning"
      },
      {
        "name": "Mixpanel Resources",
        "url": "https://mixpanel.com/resources/",
        "type": "Learning"
      },
      {
        "name": "Google Analytics Demo Account",
        "url": "https://support.google.com/analytics/answer/6367342",
        "type": "Practice"
      }
    ],
    "practice": [
      {
        "name": "Amplitude Academy",
        "url": "https://academy.amplitude.com/"
      },
      {
        "name": "Kaggle Datasets",
        "url": "https://www.kaggle.com/datasets"
      }
    ],
    "paid": [
      {
        "name": "Coursera Product Analytics",
        "url": "https://www.coursera.org/search?query=product%20analytics",
        "provider": "Coursera"
      },
      {
        "name": "LinkedIn Learning Product Analytics",
        "url": "https://www.linkedin.com/learning/search?keywords=product%20analytics",
        "provider": "LinkedIn Learning"
      },
      {
        "name": "Udemy Product Analytics",
        "url": "https://www.udemy.com/courses/search/?q=product%20analytics",
        "provider": "Udemy"
      }
    ],
    "project": "Analyze a product funnel, build retention cohorts and propose one measurable experiment."
  },
  "Marketing Analytics": {
    "topics": [
      "Marketing measurement",
      "Campaign KPIs",
      "CAC and ROAS",
      "Conversion analysis",
      "Segmentation",
      "Attribution concepts",
      "Dashboarding",
      "Marketing analytics project"
    ],
    "free": [
      {
        "name": "Google Skillshop",
        "url": "https://skillshop.withgoogle.com/",
        "type": "Learning"
      },
      {
        "name": "Think with Google",
        "url": "https://www.thinkwithgoogle.com/",
        "type": "Reference"
      },
      {
        "name": "Google Analytics Help",
        "url": "https://support.google.com/analytics/",
        "type": "Official"
      }
    ],
    "practice": [
      {
        "name": "Google Analytics Demo Account",
        "url": "https://support.google.com/analytics/answer/6367342"
      },
      {
        "name": "Kaggle Marketing Datasets",
        "url": "https://www.kaggle.com/datasets"
      }
    ],
    "paid": [
      {
        "name": "Coursera Marketing Analytics",
        "url": "https://www.coursera.org/search?query=marketing%20analytics",
        "provider": "Coursera"
      },
      {
        "name": "LinkedIn Learning Marketing Analytics",
        "url": "https://www.linkedin.com/learning/search?keywords=marketing%20analytics",
        "provider": "LinkedIn Learning"
      },
      {
        "name": "Udemy Marketing Analytics",
        "url": "https://www.udemy.com/courses/search/?q=marketing%20analytics",
        "provider": "Udemy"
      }
    ],
    "project": "Build a campaign dashboard and recommend a budget reallocation using CAC, conversion and ROAS."
  },
  "Data Architecture": {
    "topics": [
      "Data-platform architecture",
      "Operational vs analytical systems",
      "Warehouses and lakes",
      "Batch and streaming ingestion",
      "Governance and lineage",
      "Security and IAM",
      "Scalability and cost",
      "Architecture project"
    ],
    "free": [
      {
        "name": "AWS Architecture Center",
        "url": "https://aws.amazon.com/architecture/",
        "type": "Official"
      },
      {
        "name": "Azure Architecture Center",
        "url": "https://learn.microsoft.com/azure/architecture/",
        "type": "Official"
      },
      {
        "name": "Google Cloud Architecture Framework",
        "url": "https://cloud.google.com/architecture/framework",
        "type": "Official"
      }
    ],
    "practice": [
      {
        "name": "AWS Architecture Center",
        "url": "https://aws.amazon.com/architecture/"
      },
      {
        "name": "Azure Architecture Center",
        "url": "https://learn.microsoft.com/azure/architecture/"
      }
    ],
    "paid": [
      {
        "name": "Coursera Data Architecture",
        "url": "https://www.coursera.org/search?query=data%20architecture",
        "provider": "Coursera"
      },
      {
        "name": "LinkedIn Learning Data Architecture",
        "url": "https://www.linkedin.com/learning/search?keywords=data%20architecture",
        "provider": "LinkedIn Learning"
      },
      {
        "name": "Udemy Data Architecture",
        "url": "https://www.udemy.com/courses/search/?q=data%20architecture",
        "provider": "Udemy"
      }
    ],
    "project": "Design a data platform covering ingestion, storage, BI, ML, governance, security, observability and cost."
  },
  "Data Engineering": {
    "topics": [
      "Pipeline design",
      "Batch vs streaming",
      "Task dependencies",
      "Orchestration",
      "Retries and idempotency",
      "Logging and observability",
      "Data quality checks",
      "Pipeline project"
    ],
    "free": [
      {
        "name": "Apache Airflow Docs",
        "url": "https://airflow.apache.org/docs/",
        "type": "Official"
      },
      {
        "name": "Prefect Docs",
        "url": "https://docs.prefect.io/",
        "type": "Official"
      },
      {
        "name": "Data Engineering Zoomcamp",
        "url": "https://github.com/DataTalksClub/data-engineering-zoomcamp",
        "type": "Course"
      }
    ],
    "practice": [
      {
        "name": "Airflow Tutorial",
        "url": "https://airflow.apache.org/docs/apache-airflow/stable/tutorial/index.html"
      },
      {
        "name": "Prefect Examples",
        "url": "https://docs.prefect.io/"
      }
    ],
    "paid": [
      {
        "name": "Coursera Data Engineering",
        "url": "https://www.coursera.org/search?query=data%20engineering",
        "provider": "Coursera"
      },
      {
        "name": "LinkedIn Learning Data Pipelines",
        "url": "https://www.linkedin.com/learning/search?keywords=data%20pipelines",
        "provider": "LinkedIn Learning"
      },
      {
        "name": "Udemy Data Engineering",
        "url": "https://www.udemy.com/courses/search/?q=data%20engineering",
        "provider": "Udemy"
      }
    ],
    "project": "Create a scheduled pipeline with dependencies, retries, logging, data-quality checks and success/failure tracking."
  }
};

const DEFAULT_RESOURCE = {
  topics: [
    "Core concepts",
    "Foundational terminology",
    "Practical workflow",
    "Common tools",
    "Hands-on practice",
    "Real-world examples",
    "Mini project",
    "Review and re-assessment preparation",
  ],
  free: [
    {
      name: "freeCodeCamp",
      url: "https://www.freecodecamp.org/",
      type: "Learning",
    },
    {
      name: "Kaggle Learn",
      url: "https://www.kaggle.com/learn",
      type: "Learning",
    },
  ],
  practice: [
    {
      name: "Kaggle Datasets",
      url: "https://www.kaggle.com/datasets",
    },
  ],
  paid: [
    {
      name: "Coursera Search",
      url: "https://www.coursera.org/search",
      provider: "Coursera",
    },
    {
      name: "LinkedIn Learning",
      url: "https://www.linkedin.com/learning/",
      provider: "LinkedIn Learning",
    },
    {
      name: "Udemy Search",
      url: "https://www.udemy.com/courses/search/",
      provider: "Udemy",
    },
  ],
  project:
    "Build a practical portfolio project that demonstrates the skill and documents your decisions, evidence and results.",
};

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function number(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function resourceFor(skill) {
  return RESOURCE_CATALOG[skill] || DEFAULT_RESOURCE;
}

function monthLabel(months) {
  const value = number(months, 3);

  if (value === 1) {
    return "1 month";
  }

  return `${value} months`;
}

function difficultyForGap(gapPercentage) {
  const gap = number(gapPercentage);

  if (gap >= 70) {
    return "Intensive";
  }

  if (gap >= 40) {
    return "Focused";
  }

  if (gap > 0) {
    return "Targeted";
  }

  return "Maintenance";
}

function phaseForIndex(index, total) {
  if (total <= 1) {
    return "Career Readiness";
  }

  const ratio =
    index /
    Math.max(1, total - 1);

  if (ratio < 0.25) {
    return "Foundation";
  }

  if (ratio < 0.55) {
    return "Build";
  }

  if (ratio < 0.8) {
    return "Apply";
  }

  return "Validate";
}

function estimateTopicHours(skillHours, topicCount) {
  if (!topicCount) {
    return 0;
  }

  return Math.max(
    1,
    Math.round(
      (
        skillHours /
        topicCount
      ) *
        10
    ) /
      10
  );
}

function makeRoadmap({
  gaps,
  months,
  weeklyHours,
}) {
  const activeGaps =
    gaps
      .filter(
        (item) =>
          number(
            item.gapPercentage
          ) >
          0
      )
      .sort(
        (a, b) =>
          number(
            b.priority
          ) -
          number(
            a.priority
          )
      );

  const roadmapSkills =
    activeGaps.length
      ? activeGaps
      : gaps
          .slice()
          .sort(
            (a, b) =>
              number(
                b.demandScore
              ) -
              number(
                a.demandScore
              )
          )
          .slice(
            0,
            Math.min(
              3,
              gaps.length
            )
          );

  const weeks =
    Math.max(
      1,
      Math.round(
        number(months, 3) *
          4.33
      )
    );

  const totalHours =
    weeks *
    number(
      weeklyHours,
      8
    );

  const weightSum =
    roadmapSkills.reduce(
      (sum, item) =>
        sum +
        Math.max(
          1,
          number(
            item.priority,
            50
          )
        ),
      0
    );

  let currentWeek = 1;

  return roadmapSkills.map(
    (
      item,
      index
    ) => {
      const resource =
        resourceFor(
          item.name
        );

      const weight =
        Math.max(
          1,
          number(
            item.priority,
            50
          )
        );

      const skillHours =
        Math.max(
          2,
          Math.round(
            (
              totalHours *
              weight
            ) /
              weightSum
          )
        );

      const estimatedWeeks =
        Math.max(
          1,
          Math.round(
            skillHours /
              Math.max(
                1,
                number(
                  weeklyHours,
                  8
                )
              )
          )
        );

      const startWeek =
        currentWeek;

      const endWeek =
        Math.min(
          weeks,
          startWeek +
            estimatedWeeks -
            1
        );

      currentWeek =
        Math.min(
          weeks + 1,
          endWeek + 1
        );

      const topicHours =
        estimateTopicHours(
          skillHours,
          resource.topics.length
        );

      return {
        id:
          `${item.name
            .replace(
              /\s+/g,
              "-"
            )
            .toLowerCase()}-${index + 1}`,
        skill:
          item.name,
        rank:
          index + 1,
        phase:
          phaseForIndex(
            index,
            roadmapSkills.length
          ),
        intensity:
          difficultyForGap(
            item.gapPercentage
          ),
        gapPercentage:
          number(
            item.gapPercentage
          ),
        priority:
          number(
            item.priority
          ),
        demandScore:
          number(
            item.demandScore
          ),
        demonstratedScore:
          number(
            item.demonstratedScore
          ),
        requiredScore:
          number(
            item.requiredScore
          ),
        estimatedHours:
          skillHours,
        estimatedWeeks,
        startWeek,
        endWeek,
        topicHours,
        topics:
          resource.topics.map(
            (
              topic,
              topicIndex
            ) => ({
              id:
                `${item.name
                  .replace(
                    /\s+/g,
                    "-"
                  )
                  .toLowerCase()}-topic-${topicIndex + 1}`,
              title:
                topic,
              estimatedHours:
                topicHours,
            })
          ),
        freeResources:
          resource.free,
        practiceResources:
          resource.practice,
        paidResources:
          resource.paid,
        project:
          resource.project,
        reassessmentReady:
          false,
      };
    }
  );
}

function SummaryCard({
  label,
  value,
  note,
  accent = "#dc2626",
}) {
  return (
    <article
      className="rm-summary-card"
      style={{
        "--summary-accent":
          accent,
      }}
    >
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{note}</small>
    </article>
  );
}

function ResourceLink({
  resource,
  paid = false,
}) {
  return (
    <a
      className={
        paid
          ? "rm-resource-link paid"
          : "rm-resource-link"
      }
      href={resource.url}
      target="_blank"
      rel="noreferrer"
    >
      <div>
        <span>
          {paid
            ? resource.provider ||
              "Paid"
            : resource.type ||
              "Resource"}
        </span>

        <strong>
          {resource.name}
        </strong>
      </div>

      <b>↗</b>
    </a>
  );
}

function RoadmapSkillCard({
  item,
  progress,
  expanded,
  onToggle,
  onTopicToggle,
  onReassess,
}) {
  const completed =
    item.topics.filter(
      (topic) =>
        Boolean(
          progress[
            topic.id
          ]
        )
    ).length;

  const percentage =
    item.topics.length
      ? (
          completed /
          item.topics.length
        ) *
        100
      : 0;

  const canReassess =
    percentage >= 100;

  return (
    <article className="rm-skill-card">
      <button
        className="rm-skill-summary"
        onClick={onToggle}
      >
        <div className="rm-rank">
          {String(
            item.rank
          ).padStart(
            2,
            "0"
          )}
        </div>

        <div className="rm-skill-title">
          <span>
            {item.phase} ·{" "}
            {item.intensity}
          </span>

          <h3>
            {item.skill}
          </h3>

          <small>
            Week {item.startWeek}
            {item.endWeek >
            item.startWeek
              ? `–${item.endWeek}`
              : ""}{" "}
            · {item.estimatedHours}h
          </small>
        </div>

        <div className="rm-skill-meta">
          <div>
            <span>
              Gap
            </span>

            <strong>
              {item.gapPercentage.toFixed(
                0
              )}
              %
            </strong>
          </div>

          <div>
            <span>
              Priority
            </span>

            <strong>
              {item.priority}
            </strong>
          </div>

          <div>
            <span>
              Complete
            </span>

            <strong>
              {percentage.toFixed(
                0
              )}
              %
            </strong>
          </div>

          <b>
            {expanded
              ? "−"
              : "+"}
          </b>
        </div>
      </button>

      <div className="rm-card-progress">
        <div
          style={{
            width:
              `${percentage}%`,
          }}
        />
      </div>

      {expanded && (
        <div className="rm-skill-details">
          <section className="rm-objective-grid">
            <article>
              <span>
                Demonstrated
              </span>

              <strong>
                {item.demonstratedScore.toFixed(
                  1
                )}
                /10
              </strong>
            </article>

            <article>
              <span>
                Career Target
              </span>

              <strong>
                {item.requiredScore.toFixed(
                  1
                )}
                /10
              </strong>
            </article>

            <article>
              <span>
                Skill Demand
              </span>

              <strong>
                {item.demandScore.toFixed(
                  0
                )}
                /100
              </strong>
            </article>

            <article>
              <span>
                Planned Time
              </span>

              <strong>
                {item.estimatedHours}h
              </strong>
            </article>
          </section>

          <section className="rm-section">
            <div className="rm-section-head">
              <div>
                <span>
                  LEARNING TOPICS
                </span>

                <h4>
                  Complete the skill curriculum
                </h4>
              </div>

              <strong>
                {completed}/
                {item.topics.length}
              </strong>
            </div>

            <div className="rm-topic-list">
              {item.topics.map(
                (
                  topic,
                  index
                ) => {
                  const checked =
                    Boolean(
                      progress[
                        topic.id
                      ]
                    );

                  return (
                    <label
                      key={
                        topic.id
                      }
                      className={
                        checked
                          ? "completed"
                          : ""
                      }
                    >
                      <input
                        type="checkbox"
                        checked={
                          checked
                        }
                        onChange={() =>
                          onTopicToggle(
                            topic.id
                          )
                        }
                      />

                      <div className="rm-topic-index">
                        {String(
                          index +
                            1
                        ).padStart(
                          2,
                          "0"
                        )}
                      </div>

                      <div>
                        <strong>
                          {
                            topic.title
                          }
                        </strong>

                        <small>
                          ~
                          {
                            topic.estimatedHours
                          }
                          h focused study
                        </small>
                      </div>
                    </label>
                  );
                }
              )}
            </div>
          </section>

          <section className="rm-resource-section">
            <div className="rm-resource-column">
              <div className="rm-section-head compact">
                <div>
                  <span>
                    FREE LEARNING
                  </span>

                  <h4>
                    Start without paying
                  </h4>
                </div>
              </div>

              <div className="rm-resource-list">
                {item.freeResources.map(
                  (resource) => (
                    <ResourceLink
                      key={
                        resource.url
                      }
                      resource={
                        resource
                      }
                    />
                  )
                )}
              </div>
            </div>

            <div className="rm-resource-column">
              <div className="rm-section-head compact">
                <div>
                  <span>
                    PRACTICE
                  </span>

                  <h4>
                    Build real ability
                  </h4>
                </div>
              </div>

              <div className="rm-resource-list">
                {item.practiceResources.map(
                  (resource) => (
                    <ResourceLink
                      key={
                        resource.url
                      }
                      resource={{
                        ...resource,
                        type:
                          "Practice",
                      }}
                    />
                  )
                )}
              </div>
            </div>

            <div className="rm-resource-column">
              <div className="rm-section-head compact">
                <div>
                  <span>
                    PAID OPTIONS
                  </span>

                  <h4>
                    Structured courses
                  </h4>
                </div>
              </div>

              <div className="rm-resource-list">
                {item.paidResources.map(
                  (resource) => (
                    <ResourceLink
                      key={
                        resource.url
                      }
                      resource={
                        resource
                      }
                      paid
                    />
                  )
                )}
              </div>
            </div>
          </section>

          <section className="rm-project">
            <div>
              <span>
                PORTFOLIO PROJECT
              </span>

              <h4>
                Apply {item.skill}
              </h4>

              <p>
                {item.project}
              </p>
            </div>

            <div className="rm-project-checklist">
              <span>
                Include:
              </span>

              <b>
                problem statement
              </b>

              <b>
                implementation
              </b>

              <b>
                evidence
              </b>

              <b>
                result
              </b>

              <b>
                limitation
              </b>
            </div>
          </section>

          <section
            className={
              canReassess
                ? "rm-reassess ready"
                : "rm-reassess"
            }
          >
            <div>
              <span>
                RE-ASSESSMENT GATE
              </span>

              <h4>
                {canReassess
                  ? "You completed all roadmap topics."
                  : "Finish all roadmap topics first."}
              </h4>

              <p>
                {canReassess
                  ? "Start a new assessment set. Passing requires your new demonstrated score to meet or exceed the career target."
                  : `Complete ${item.topics.length - completed} remaining topic${
                      item.topics.length -
                        completed ===
                      1
                        ? ""
                        : "s"
                    } before re-assessment.`}
              </p>
            </div>

            <button
              disabled={
                !canReassess
              }
              onClick={
                onReassess
              }
            >
              Re-Assess {item.skill} →
            </button>
          </section>
        </div>
      )}
    </article>
  );
}

export default function Roadmap() {
  const navigate =
    useNavigate();

  const career =
    readJSON(
      STORAGE_KEYS.targetData,
      null
    );

  const gaps =
    readJSON(
      STORAGE_KEYS.gaps,
      []
    );

  const savedPreferences =
    readJSON(
      STORAGE_KEYS.roadmapPreferences,
      {
        months: 3,
        weeklyHours: 8,
      }
    );

  const savedPlan =
    readJSON(
      STORAGE_KEYS.roadmapPlan,
      []
    );

  const savedProgress =
    readJSON(
      STORAGE_KEYS.roadmapProgress,
      {}
    );

  const [
    months,
    setMonths,
  ] =
    useState(
      clamp(
        number(
          savedPreferences.months,
          3
        ),
        1,
        12
      )
    );

  const [
    weeklyHours,
    setWeeklyHours,
  ] =
    useState(
      clamp(
        number(
          savedPreferences.weeklyHours,
          8
        ),
        2,
        40
      )
    );

  const [
    plan,
    setPlan,
  ] =
    useState(
      Array.isArray(
        savedPlan
      )
        ? savedPlan
        : []
    );

  const [
    progress,
    setProgress,
  ] =
    useState(
      savedProgress &&
      typeof savedProgress ===
        "object"
        ? savedProgress
        : {}
    );

  const [
    expanded,
    setExpanded,
  ] =
    useState({});

  const [
    search,
    setSearch,
  ] =
    useState("");

  const [
    filter,
    setFilter,
  ] =
    useState("All");

  const [
    generated,
    setGenerated,
  ] =
    useState(
      Array.isArray(
        savedPlan
      ) &&
        savedPlan.length >
          0
    );

  const totalWeeks =
    Math.max(
      1,
      Math.round(
        months *
          4.33
      )
    );

  const totalHours =
    totalWeeks *
    weeklyHours;

  const gapSkills =
    gaps.filter(
      (item) =>
        number(
          item.gapPercentage
        ) >
        0
    );

  const visiblePlan =
    useMemo(() => {
      const query =
        search
          .trim()
          .toLowerCase();

      return plan.filter(
        (item) => {
          const matchSearch =
            !query ||
            item.skill
              .toLowerCase()
              .includes(
                query
              ) ||
            item.topics.some(
              (topic) =>
                topic.title
                  .toLowerCase()
                  .includes(
                    query
                  )
            );

          const completed =
            item.topics.filter(
              (topic) =>
                Boolean(
                  progress[
                    topic.id
                  ]
                )
            ).length;

          const percentage =
            item.topics.length
              ? (
                  completed /
                  item.topics.length
                ) *
                100
              : 0;

          let matchFilter =
            true;

          if (
            filter ===
            "Not Started"
          ) {
            matchFilter =
              percentage ===
              0;
          } else if (
            filter ===
            "In Progress"
          ) {
            matchFilter =
              percentage >
                0 &&
              percentage <
                100;
          } else if (
            filter ===
            "Ready to Re-Assess"
          ) {
            matchFilter =
              percentage >=
              100;
          }

          return (
            matchSearch &&
            matchFilter
          );
        }
      );
    }, [
      plan,
      progress,
      search,
      filter,
    ]);

  const totalTopics =
    plan.reduce(
      (
        sum,
        item
      ) =>
        sum +
        item.topics.length,
      0
    );

  const completedTopics =
    plan.reduce(
      (
        sum,
        item
      ) =>
        sum +
        item.topics.filter(
          (topic) =>
            Boolean(
              progress[
                topic.id
              ]
            )
        ).length,
      0
    );

  const overallProgress =
    totalTopics
      ? (
          completedTopics /
          totalTopics
        ) *
        100
      : 0;

  const reassessmentReady =
    plan.filter(
      (item) => {
        const completed =
          item.topics.filter(
            (topic) =>
              Boolean(
                progress[
                  topic.id
                ]
              )
          ).length;

        return (
          item.topics.length >
            0 &&
          completed ===
            item.topics.length
        );
      }
    ).length;

  function generatePlan() {
    if (
      !Array.isArray(
        gaps
      ) ||
      !gaps.length
    ) {
      alert(
        "No skill-gap data found. Complete Skill Gap analysis first."
      );

      return;
    }

    const nextPlan =
      makeRoadmap({
        gaps,
        months,
        weeklyHours,
      });

    const preferences = {
      months,
      weeklyHours,
      weeks:
        Math.max(
          1,
          Math.round(
            months *
              4.33
          )
        ),
      totalHours:
        Math.max(
          1,
          Math.round(
            months *
              4.33
          )
        ) *
        weeklyHours,
      generatedAt:
        new Date()
          .toISOString(),
    };

    setPlan(
      nextPlan
    );

    setGenerated(
      true
    );

    localStorage.setItem(
      STORAGE_KEYS.roadmapPreferences,
      JSON.stringify(
        preferences
      )
    );

    localStorage.setItem(
      STORAGE_KEYS.roadmapPlan,
      JSON.stringify(
        nextPlan
      )
    );

    localStorage.setItem(
      STORAGE_KEYS.roadmapProgress,
      JSON.stringify(
        progress
      )
    );

    setExpanded(
      nextPlan.length
        ? {
            [nextPlan[0]
              .skill]:
              true,
          }
        : {}
    );
  }

  function toggleExpanded(
    skill
  ) {
    setExpanded(
      (current) => ({
        ...current,
        [skill]:
          !current[
            skill
          ],
      })
    );
  }

  function toggleTopic(
    topicId
  ) {
    setProgress(
      (current) => {
        const next = {
          ...current,
          [topicId]:
            !current[
              topicId
            ],
        };

        localStorage.setItem(
          STORAGE_KEYS.roadmapProgress,
          JSON.stringify(
            next
          )
        );

        return next;
      }
    );
  }

  function reassess(
    skill
  ) {
    localStorage.setItem(
      STORAGE_KEYS.mode,
      "reassessment"
    );

    localStorage.setItem(
      STORAGE_KEYS.reassessmentSkills,
      JSON.stringify([
        skill,
      ])
    );

    navigate(
      "/assessment"
    );
  }

  function expandAll() {
    setExpanded(
      Object.fromEntries(
        plan.map(
          (item) => [
            item.skill,
            true,
          ]
        )
      )
    );
  }

  function collapseAll() {
    setExpanded(
      {}
    );
  }

  if (!career) {
    return (
      <main className="rm-state">
        <div>
          🎯
        </div>

        <h2>
          No target career found
        </h2>

        <p>
          Choose a target career before building a learning roadmap.
        </p>

        <button
          onClick={() =>
            navigate(
              "/target-career"
            )
          }
        >
          Go to Target Career
        </button>
      </main>
    );
  }

  if (
    !Array.isArray(
      gaps
    ) ||
    !gaps.length
  ) {
    return (
      <main className="rm-state">
        <div>
          🗺️
        </div>

        <h2>
          Skill Gap analysis required
        </h2>

        <p>
          Complete the Skill Gap page first. The roadmap uses gap severity,
          skill demand and career requirements to decide what you should learn first.
        </p>

        <button
          onClick={() =>
            navigate(
              "/skill-gap"
            )
          }
        >
          Open Skill Gap
        </button>
      </main>
    );
  }

  return (
    <main className="rm-page">
      <section className="rm-hero">
        <div className="rm-hero-copy">
          <span className="rm-kicker">
            PERSONALIZED CAREER ROADMAP
          </span>

          <h1>
            Build a study plan around your
            actual skill gaps.
          </h1>

          <p>
            Your roadmap for{" "}
            <strong>
              {career.name}
            </strong>{" "}
            prioritizes the largest and most valuable gaps first. Choose your
            target duration and weekly study time, then NEXTPATH allocates the
            available hours across skills, topics, practice and portfolio work.
          </p>

          <div className="rm-flow">
            <span>
              Skill Gap
            </span>

            <b>→</b>

            <span className="active">
              Roadmap
            </span>

            <b>→</b>

            <span>
              Progress
            </span>

            <b>→</b>

            <span>
              Re-Assessment
            </span>

            <b>→</b>

            <span>
              Verified Skill
            </span>
          </div>
        </div>

        <div className="rm-hero-progress">
          <div
            className="rm-progress-ring"
            style={{
              background:
                `conic-gradient(#16a34a ${overallProgress * 3.6}deg,#e2e8f0 0deg)`,
            }}
          >
            <div>
              <strong>
                {overallProgress.toFixed(
                  0
                )}
                %
              </strong>

              <small>
                Roadmap
              </small>
            </div>
          </div>

          <div>
            <span>
              Target Career
            </span>

            <strong>
              {career.icon ||
                "🎯"}{" "}
              {career.name}
            </strong>

            <small>
              {gapSkills.length} active skill gap
              {gapSkills.length ===
              1
                ? ""
                : "s"}
            </small>
          </div>
        </div>
      </section>

      <section className="rm-planner">
        <div className="rm-planner-copy">
          <span className="rm-kicker">
            ROADMAP SETTINGS
          </span>

          <h2>
            How much time can you invest?
          </h2>

          <p>
            Choose a realistic duration and weekly study commitment. You can
            regenerate the plan later if your schedule changes.
          </p>
        </div>

        <div className="rm-planner-controls">
          <label>
            <span>
              Goal Duration
            </span>

            <select
              value={months}
              onChange={(event) =>
                setMonths(
                  clamp(
                    number(
                      event.target.value,
                      3
                    ),
                    1,
                    12
                  )
                )
              }
            >
              {[
                1,
                2,
                3,
                4,
                6,
                9,
                12,
              ].map(
                (value) => (
                  <option
                    key={
                      value
                    }
                    value={
                      value
                    }
                  >
                    {monthLabel(
                      value
                    )}
                  </option>
                )
              )}
            </select>
          </label>

          <label>
            <span>
              Study Hours / Week
            </span>

            <input
              type="number"
              min="2"
              max="40"
              value={
                weeklyHours
              }
              onChange={(event) =>
                setWeeklyHours(
                  clamp(
                    number(
                      event.target.value,
                      8
                    ),
                    2,
                    40
                  )
                )
              }
            />
          </label>

          <div className="rm-capacity">
            <span>
              Estimated Capacity
            </span>

            <strong>
              {totalHours}h
            </strong>

            <small>
              ~{totalWeeks} weeks
            </small>
          </div>

          <button
            className="rm-generate"
            onClick={
              generatePlan
            }
          >
            {generated
              ? "Regenerate Roadmap"
              : "Generate My Roadmap"}{" "}
            →
          </button>
        </div>
      </section>

      {generated && (
        <>
          <section className="rm-summary-grid">
            <SummaryCard
              label="Roadmap Duration"
              value={monthLabel(
                months
              )}
              note={`~${totalWeeks} weeks`}
              accent="#dc2626"
            />

            <SummaryCard
              label="Study Capacity"
              value={`${weeklyHours}h/week`}
              note={`${totalHours} total hours`}
              accent="#2563eb"
            />

            <SummaryCard
              label="Priority Skills"
              value={plan.length}
              note="Largest gaps first"
              accent="#7c3aed"
            />

            <SummaryCard
              label="Learning Topics"
              value={totalTopics}
              note={`${completedTopics} completed`}
              accent="#0891b2"
            />

            <SummaryCard
              label="Ready to Re-Assess"
              value={reassessmentReady}
              note="100% topics complete"
              accent="#16a34a"
            />

            <SummaryCard
              label="Overall Progress"
              value={`${overallProgress.toFixed(
                0
              )}%`}
              note="Topic completion"
              accent="#ca8a04"
            />
          </section>

          <section className="rm-strategy">
            <article>
              <span>
                PRIORITY LOGIC
              </span>

              <h3>
                Largest gaps first
              </h3>

              <p>
                Skill allocation follows the priority score from Skill Gap,
                which combines gap severity, skill demand and required career level.
              </p>
            </article>

            <article>
              <span>
                STUDY MODEL
              </span>

              <h3>
                Learn → Practice → Build
              </h3>

              <p>
                Each skill includes structured topics, free learning resources,
                practice links, paid options and one portfolio project.
              </p>
            </article>

            <article>
              <span>
                VERIFICATION GATE
              </span>

              <h3>
                Re-assess at 100%
              </h3>

              <p>
                Once every topic for a skill is completed, NEXTPATH enables
                re-assessment with a new question set.
              </p>
            </article>
          </section>

          <section className="rm-course-note">
            <strong>
              Course-link note
            </strong>

            <p>
              Free and paid links open external learning providers. Course names,
              pricing, availability, certificates and subscription terms can
              change, so NEXTPATH links mainly to official provider learning or
              search pages instead of claiming a specific current price.
            </p>
          </section>

          <section className="rm-controls">
            <label>
              <span>
                Search roadmap
              </span>

              <input
                value={
                  search
                }
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="SQL, machine learning, joins..."
              />
            </label>

            <label>
              <span>
                Progress Filter
              </span>

              <select
                value={
                  filter
                }
                onChange={(event) =>
                  setFilter(
                    event.target.value
                  )
                }
              >
                <option>
                  All
                </option>

                <option>
                  Not Started
                </option>

                <option>
                  In Progress
                </option>

                <option>
                  Ready to Re-Assess
                </option>
              </select>
            </label>

            <div className="rm-control-actions">
              <button
                onClick={
                  expandAll
                }
              >
                Expand All
              </button>

              <button
                onClick={
                  collapseAll
                }
              >
                Collapse
              </button>
            </div>
          </section>

          <section className="rm-plan-list">
            {visiblePlan.length ? (
              visiblePlan.map(
                (item) => (
                  <RoadmapSkillCard
                    key={
                      item.id
                    }
                    item={
                      item
                    }
                    progress={
                      progress
                    }
                    expanded={
                      Boolean(
                        expanded[
                          item.skill
                        ]
                      )
                    }
                    onToggle={() =>
                      toggleExpanded(
                        item.skill
                      )
                    }
                    onTopicToggle={
                      toggleTopic
                    }
                    onReassess={() =>
                      reassess(
                        item.skill
                      )
                    }
                  />
                )
              )
            ) : (
              <div className="rm-empty">
                <div>
                  🔍
                </div>

                <h2>
                  No roadmap items match your filter
                </h2>

                <button
                  onClick={() => {
                    setSearch("");
                    setFilter(
                      "All"
                    );
                  }}
                >
                  Reset Filters
                </button>
              </div>
            )}
          </section>

          <section className="rm-final-panel">
            <div>
              <span className="rm-kicker">
                KEEP MOVING
              </span>

              <h2>
                Track progress, then verify the skill.
              </h2>

              <p>
                Your roadmap progress is saved locally. The Progress page can
                use the same plan and topic completion state to show what is
                ready for re-assessment.
              </p>
            </div>

            <div className="rm-final-actions">
              <button
                className="primary"
                onClick={() =>
                  navigate(
                    "/progress"
                  )
                }
              >
                Open Progress →
              </button>

              <button
                onClick={() =>
                  navigate(
                    "/skill-gap"
                  )
                }
              >
                Skill Gap
              </button>

              <button
                onClick={() =>
                  navigate(
                    "/opportunities"
                  )
                }
              >
                Opportunities
              </button>
            </div>
          </section>
        </>
      )}

      {!generated && (
        <section className="rm-before-generate">
          <div>
            🗺️
          </div>

          <h2>
            Your personalized roadmap is ready to be generated.
          </h2>

          <p>
            Choose your months and weekly study hours above. NEXTPATH will use
            the skill-gap priorities already calculated for {career.name}.
          </p>
        </section>
      )}

      <footer className="rm-footer">
        NEXTPATH Roadmap · Learning-provider links are external resources. Paid
        course pricing, availability and certificate terms are controlled by
        the respective providers and may change.
      </footer>

      <style>{`
        .rm-page {
          max-width: 1360px;
          margin: 0 auto;
          padding: 24px;
          color: #0f172a;
        }

        .rm-kicker {
          display: inline-block;
          color: #dc2626;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 1.4px;
        }

        .rm-hero {
          display: grid;
          grid-template-columns:
            minmax(0,1.35fr)
            minmax(320px,.65fr);
          gap: 24px;
          padding: 34px;
          border: 1px solid #e2e8f0;
          border-radius: 27px;
          background:
            radial-gradient(
              circle at top right,
              rgba(22,163,74,.10),
              transparent 34%
            ),
            linear-gradient(
              135deg,
              #ffffff,
              #f8fafc
            );
          box-shadow:
            0 20px 55px
            rgba(15,23,42,.06);
        }

        .rm-hero h1 {
          margin: 10px 0 14px;
          max-width: 900px;
          font-size:
            clamp(
              38px,
              4vw,
              56px
            );
          line-height: 1.04;
          letter-spacing: -1.4px;
        }

        .rm-hero p {
          max-width: 850px;
          margin: 0;
          color: #64748b;
          line-height: 1.7;
        }

        .rm-flow {
          display: flex;
          align-items: center;
          gap: 7px;
          flex-wrap: wrap;
          margin-top: 17px;
        }

        .rm-flow span {
          padding: 5px 8px;
          border: 1px solid #e2e8f0;
          border-radius: 999px;
          background: #ffffff;
          color: #475569;
          font-size: 8px;
          font-weight: 850;
        }

        .rm-flow span.active {
          border-color: #16a34a;
          background: #16a34a;
          color: #ffffff;
        }

        .rm-flow b {
          color: #94a3b8;
        }

        .rm-hero-progress {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          padding: 18px;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          background: #ffffff;
        }

        .rm-progress-ring {
          width: 116px;
          height: 116px;
          flex: 0 0 auto;
          display: grid;
          place-items: center;
          border-radius: 50%;
        }

        .rm-progress-ring > div {
          width: 86px;
          height: 86px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          border-radius: 50%;
          background: #ffffff;
        }

        .rm-progress-ring strong {
          font-size: 23px;
        }

        .rm-progress-ring small {
          color: #64748b;
          font-size: 8px;
        }

        .rm-hero-progress > div:last-child {
          display: flex;
          flex-direction: column;
        }

        .rm-hero-progress > div:last-child span {
          color: #64748b;
          font-size: 8px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .rm-hero-progress > div:last-child strong {
          margin: 4px 0;
          font-size: 17px;
        }

        .rm-hero-progress > div:last-child small {
          color: #94a3b8;
        }

        .rm-planner {
          display: grid;
          grid-template-columns:
            minmax(0,.8fr)
            minmax(600px,1.2fr);
          gap: 20px;
          align-items: center;
          margin: 18px 0;
          padding: 21px;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          background: #ffffff;
        }

        .rm-planner h2 {
          margin: 6px 0;
        }

        .rm-planner p {
          margin: 0;
          color: #64748b;
          line-height: 1.55;
        }

        .rm-planner-controls {
          display: grid;
          grid-template-columns:
            1fr
            1fr
            1fr
            auto;
          gap: 9px;
          align-items: end;
        }

        .rm-planner-controls label > span,
        .rm-capacity > span {
          display: block;
          margin-bottom: 5px;
          color: #64748b;
          font-size: 8px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .rm-planner-controls select,
        .rm-planner-controls input {
          width: 100%;
          box-sizing: border-box;
          padding: 11px;
          border: 1px solid #cbd5e1;
          border-radius: 9px;
          background: #ffffff;
        }

        .rm-capacity {
          min-height: 42px;
          display: flex;
          justify-content: center;
          flex-direction: column;
          padding: 8px 10px;
          border: 1px solid #e2e8f0;
          border-radius: 9px;
          background: #f8fafc;
        }

        .rm-capacity > span {
          margin: 0;
        }

        .rm-capacity strong {
          font-size: 17px;
        }

        .rm-capacity small {
          color: #94a3b8;
        }

        .rm-generate {
          min-height: 45px;
          padding: 11px 14px;
          border: 0;
          border-radius: 9px;
          background: #dc2626;
          color: #ffffff;
          font-weight: 900;
          white-space: nowrap;
          cursor: pointer;
        }

        .rm-summary-grid {
          display: grid;
          grid-template-columns:
            repeat(6,minmax(0,1fr));
          gap: 10px;
          margin-bottom: 17px;
        }

        .rm-summary-card {
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          min-height: 92px;
          padding: 14px;
          border: 1px solid #e2e8f0;
          border-radius: 13px;
          background: #ffffff;
        }

        .rm-summary-card::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background:
            var(--summary-accent);
        }

        .rm-summary-card span {
          color: #64748b;
          font-size: 8px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .rm-summary-card strong {
          margin: 5px 0;
          font-size: 19px;
        }

        .rm-summary-card small {
          margin-top: auto;
          color: #94a3b8;
        }

        .rm-strategy {
          display: grid;
          grid-template-columns:
            repeat(3,minmax(0,1fr));
          gap: 10px;
          margin-bottom: 13px;
        }

        .rm-strategy article {
          padding: 15px;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          background: #f8fafc;
        }

        .rm-strategy span {
          color: #64748b;
          font-size: 8px;
          font-weight: 900;
          letter-spacing: .7px;
        }

        .rm-strategy h3 {
          margin: 5px 0;
        }

        .rm-strategy p {
          margin: 0;
          color: #64748b;
          font-size: 10px;
          line-height: 1.5;
        }

        .rm-course-note {
          margin-bottom: 13px;
          padding: 13px;
          border: 1px solid #fde68a;
          border-radius: 10px;
          background: #fffbeb;
        }

        .rm-course-note strong {
          color: #92400e;
          font-size: 9px;
          text-transform: uppercase;
        }

        .rm-course-note p {
          margin: 5px 0 0;
          color: #92400e;
          font-size: 9px;
          line-height: 1.5;
        }

        .rm-controls {
          display: grid;
          grid-template-columns:
            minmax(280px,1fr)
            220px
            auto;
          gap: 10px;
          align-items: end;
          margin-bottom: 12px;
          padding: 14px;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          background: #ffffff;
        }

        .rm-controls label > span {
          display: block;
          margin-bottom: 5px;
          color: #64748b;
          font-size: 8px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .rm-controls input,
        .rm-controls select {
          width: 100%;
          box-sizing: border-box;
          padding: 9px 10px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          background: #ffffff;
        }

        .rm-control-actions {
          display: flex;
          gap: 6px;
        }

        .rm-control-actions button {
          padding: 9px 10px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          background: #ffffff;
          color: #334155;
          font-weight: 800;
          cursor: pointer;
        }

        .rm-plan-list {
          display: grid;
          gap: 11px;
        }

        .rm-skill-card {
          overflow: hidden;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          background: #ffffff;
        }

        .rm-skill-summary {
          width: 100%;
          display: grid;
          grid-template-columns:
            44px
            minmax(220px,1fr)
            auto;
          gap: 12px;
          align-items: center;
          padding: 16px;
          border: 0;
          background: #ffffff;
          text-align: left;
          cursor: pointer;
        }

        .rm-rank {
          display: grid;
          place-items: center;
          width: 40px;
          height: 40px;
          border-radius: 11px;
          background: #111827;
          color: #ffffff;
          font-size: 11px;
          font-weight: 900;
        }

        .rm-skill-title span {
          color: #64748b;
          font-size: 8px;
          font-weight: 900;
          letter-spacing: .7px;
          text-transform: uppercase;
        }

        .rm-skill-title h3 {
          margin: 3px 0;
          font-size: 19px;
        }

        .rm-skill-title small {
          color: #94a3b8;
        }

        .rm-skill-meta {
          display: grid;
          grid-template-columns:
            repeat(3,85px)
            28px;
          gap: 8px;
          align-items: center;
        }

        .rm-skill-meta > div {
          display: flex;
          align-items: flex-end;
          flex-direction: column;
        }

        .rm-skill-meta span {
          color: #94a3b8;
          font-size: 7px;
          text-transform: uppercase;
        }

        .rm-skill-meta strong {
          margin-top: 2px;
          font-size: 13px;
        }

        .rm-skill-meta > b {
          display: grid;
          place-items: center;
          width: 28px;
          height: 28px;
          border-radius: 8px;
          background: #f1f5f9;
          color: #475569;
        }

        .rm-card-progress {
          height: 6px;
          background: #e2e8f0;
        }

        .rm-card-progress > div {
          height: 100%;
          border-radius: 0 999px 999px 0;
          background:
            linear-gradient(
              90deg,
              #16a34a,
              #22c55e
            );
        }

        .rm-skill-details {
          padding: 17px;
          border-top: 1px solid #e2e8f0;
          background: #f8fafc;
        }

        .rm-objective-grid {
          display: grid;
          grid-template-columns:
            repeat(4,minmax(0,1fr));
          gap: 8px;
        }

        .rm-objective-grid article {
          display: flex;
          flex-direction: column;
          padding: 10px;
          border: 1px solid #e2e8f0;
          border-radius: 9px;
          background: #ffffff;
        }

        .rm-objective-grid span {
          color: #64748b;
          font-size: 7px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .rm-objective-grid strong {
          margin-top: 4px;
          font-size: 15px;
        }

        .rm-section {
          margin-top: 12px;
          padding: 14px;
          border: 1px solid #e2e8f0;
          border-radius: 11px;
          background: #ffffff;
        }

        .rm-section-head {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          align-items: flex-start;
        }

        .rm-section-head span {
          color: #64748b;
          font-size: 8px;
          font-weight: 900;
          letter-spacing: .7px;
        }

        .rm-section-head h4 {
          margin: 4px 0;
        }

        .rm-section-head > strong {
          color: #16a34a;
          font-size: 16px;
        }

        .rm-section-head.compact {
          margin-bottom: 8px;
        }

        .rm-topic-list {
          display: grid;
          grid-template-columns:
            repeat(2,minmax(0,1fr));
          gap: 8px;
          margin-top: 10px;
        }

        .rm-topic-list label {
          display: grid;
          grid-template-columns:
            auto
            32px
            minmax(0,1fr);
          gap: 9px;
          align-items: center;
          padding: 10px;
          border: 1px solid #e2e8f0;
          border-radius: 9px;
          background: #f8fafc;
          cursor: pointer;
        }

        .rm-topic-list label.completed {
          border-color: #bbf7d0;
          background: #f0fdf4;
        }

        .rm-topic-list input {
          accent-color: #16a34a;
        }

        .rm-topic-index {
          display: grid;
          place-items: center;
          width: 28px;
          height: 28px;
          border-radius: 8px;
          background: #ffffff;
          color: #64748b;
          font-size: 8px;
          font-weight: 900;
        }

        .rm-topic-list label > div:last-child {
          display: flex;
          flex-direction: column;
        }

        .rm-topic-list strong {
          font-size: 10px;
        }

        .rm-topic-list small {
          margin-top: 2px;
          color: #94a3b8;
          font-size: 7px;
        }

        .rm-resource-section {
          display: grid;
          grid-template-columns:
            repeat(3,minmax(0,1fr));
          gap: 10px;
          margin-top: 12px;
        }

        .rm-resource-column {
          padding: 13px;
          border: 1px solid #e2e8f0;
          border-radius: 11px;
          background: #ffffff;
        }

        .rm-resource-list {
          display: grid;
          gap: 7px;
        }

        .rm-resource-link {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          align-items: center;
          padding: 10px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          background: #f8fafc;
          color: inherit;
          text-decoration: none;
          transition:
            transform .14s ease,
            border-color .14s ease;
        }

        .rm-resource-link:hover {
          transform: translateY(-1px);
          border-color: #93c5fd;
        }

        .rm-resource-link.paid {
          background: #fff7ed;
        }

        .rm-resource-link > div {
          display: flex;
          flex-direction: column;
        }

        .rm-resource-link span {
          color: #64748b;
          font-size: 7px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .rm-resource-link strong {
          margin-top: 2px;
          font-size: 10px;
        }

        .rm-resource-link b {
          color: #2563eb;
        }

        .rm-project {
          display: grid;
          grid-template-columns:
            minmax(0,1.3fr)
            minmax(300px,.7fr);
          gap: 13px;
          margin-top: 12px;
          padding: 14px;
          border: 1px solid #bbf7d0;
          border-radius: 11px;
          background: #f0fdf4;
        }

        .rm-project span {
          color: #15803d;
          font-size: 8px;
          font-weight: 900;
          letter-spacing: .7px;
        }

        .rm-project h4 {
          margin: 4px 0;
        }

        .rm-project p {
          margin: 0;
          color: #4d7c0f;
          font-size: 10px;
          line-height: 1.5;
        }

        .rm-project-checklist {
          display: flex;
          gap: 5px;
          flex-wrap: wrap;
          align-content: start;
        }

        .rm-project-checklist span {
          width: 100%;
        }

        .rm-project-checklist b {
          padding: 5px 7px;
          border-radius: 999px;
          background: #ffffff;
          color: #166534;
          font-size: 7px;
        }

        .rm-reassess {
          display: flex;
          justify-content: space-between;
          gap: 15px;
          align-items: center;
          margin-top: 12px;
          padding: 13px;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          background: #ffffff;
        }

        .rm-reassess.ready {
          border-color: #86efac;
          background: #f0fdf4;
        }

        .rm-reassess span {
          color: #64748b;
          font-size: 7px;
          font-weight: 900;
          letter-spacing: .7px;
        }

        .rm-reassess h4 {
          margin: 4px 0;
        }

        .rm-reassess p {
          max-width: 790px;
          margin: 0;
          color: #64748b;
          font-size: 9px;
          line-height: 1.45;
        }

        .rm-reassess button {
          padding: 9px 11px;
          border: 0;
          border-radius: 8px;
          background: #16a34a;
          color: #ffffff;
          font-weight: 850;
          white-space: nowrap;
          cursor: pointer;
        }

        .rm-reassess button:disabled {
          background: #cbd5e1;
          cursor: not-allowed;
        }

        .rm-final-panel {
          display: flex;
          justify-content: space-between;
          gap: 24px;
          align-items: center;
          margin-top: 20px;
          padding: 24px;
          border-radius: 16px;
          background:
            linear-gradient(
              135deg,
              #111827,
              #0f172a
            );
          color: #ffffff;
        }

        .rm-final-panel h2 {
          margin: 6px 0;
        }

        .rm-final-panel p {
          max-width: 820px;
          margin: 0;
          color: #94a3b8;
          line-height: 1.55;
        }

        .rm-final-actions {
          display: flex;
          gap: 7px;
          flex-wrap: wrap;
          justify-content: flex-end;
        }

        .rm-final-actions button {
          padding: 10px 12px;
          border: 1px solid #334155;
          border-radius: 8px;
          background: #111827;
          color: #cbd5e1;
          font-weight: 850;
          cursor: pointer;
        }

        .rm-final-actions button.primary {
          border-color: #dc2626;
          background: #dc2626;
          color: #ffffff;
        }

        .rm-before-generate {
          padding: 44px;
          border: 1px dashed #cbd5e1;
          border-radius: 15px;
          text-align: center;
          background: #ffffff;
        }

        .rm-before-generate > div {
          font-size: 40px;
        }

        .rm-before-generate p {
          max-width: 680px;
          margin: 0 auto;
          color: #64748b;
          line-height: 1.55;
        }

        .rm-empty {
          padding: 35px;
          border: 1px dashed #cbd5e1;
          border-radius: 13px;
          text-align: center;
          background: #ffffff;
        }

        .rm-empty > div {
          font-size: 36px;
        }

        .rm-empty button {
          padding: 9px 12px;
          border: 0;
          border-radius: 8px;
          background: #111827;
          color: #ffffff;
          font-weight: 850;
          cursor: pointer;
        }

        .rm-footer {
          padding: 16px 2px 0;
          color: #94a3b8;
          font-size: 8px;
          line-height: 1.5;
        }

        .rm-state {
          min-height: 70vh;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          padding: 30px;
          text-align: center;
          color: #0f172a;
        }

        .rm-state > div {
          font-size: 42px;
        }

        .rm-state p {
          max-width: 650px;
          color: #64748b;
          line-height: 1.55;
        }

        .rm-state button {
          padding: 10px 14px;
          border: 0;
          border-radius: 8px;
          background: #dc2626;
          color: #ffffff;
          font-weight: 900;
          cursor: pointer;
        }

        @media(max-width: 1140px) {
          .rm-planner {
            grid-template-columns: 1fr;
          }

          .rm-summary-grid {
            grid-template-columns:
              repeat(3,minmax(0,1fr));
          }

          .rm-resource-section {
            grid-template-columns: 1fr;
          }
        }

        @media(max-width: 900px) {
          .rm-page {
            padding: 14px;
          }

          .rm-hero {
            grid-template-columns: 1fr;
            padding: 24px;
          }

          .rm-planner-controls {
            grid-template-columns:
              repeat(2,minmax(0,1fr));
          }

          .rm-strategy {
            grid-template-columns: 1fr;
          }

          .rm-controls {
            grid-template-columns:
              1fr
              1fr;
          }

          .rm-skill-summary {
            grid-template-columns:
              44px
              minmax(0,1fr);
          }

          .rm-skill-meta {
            grid-column:
              1 / -1;
            grid-template-columns:
              repeat(3,minmax(0,1fr));
            padding-left: 56px;
          }

          .rm-skill-meta > b {
            display: none;
          }

          .rm-skill-meta > div {
            align-items: flex-start;
          }

          .rm-topic-list {
            grid-template-columns: 1fr;
          }

          .rm-project {
            grid-template-columns: 1fr;
          }

          .rm-final-panel {
            align-items: stretch;
            flex-direction: column;
          }

          .rm-final-actions {
            justify-content: flex-start;
          }
        }

        @media(max-width: 600px) {
          .rm-summary-grid,
          .rm-planner-controls,
          .rm-controls,
          .rm-objective-grid {
            grid-template-columns: 1fr;
          }

          .rm-hero-progress {
            align-items: flex-start;
            flex-direction: column;
          }

          .rm-skill-summary {
            grid-template-columns: 1fr;
          }

          .rm-rank {
            width: 34px;
            height: 34px;
          }

          .rm-skill-meta {
            padding-left: 0;
          }

          .rm-reassess {
            align-items: stretch;
            flex-direction: column;
          }

          .rm-control-actions {
            width: 100%;
          }

          .rm-control-actions button {
            flex: 1;
          }
        }
      `}</style>
    </main>
  );
}
