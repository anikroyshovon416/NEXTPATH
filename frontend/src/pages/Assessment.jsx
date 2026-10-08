import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";


/* =========================================================
   NEXTPATH ASSESSMENT QUESTION BANK

   Each skill can contain:
   1. quiz
   2. problem solving
   3. coding / technical practical task
========================================================= */

const questionBank = {

  /* =======================================================
     SQL
  ======================================================= */

  SQL: {
    quiz: {
      question:
        "Which SQL clause is used to filter rows based on a condition?",

      options: [
        "WHERE",
        "ORDER BY",
        "GROUP BY",
        "SELECT",
      ],

      answer: "WHERE",
    },

    problem: {
      question:
        "A company has an Employees table with employee_id, employee_name, department and salary. You need to find all employees earning more than ₹50,000. Explain the steps or SQL logic you would use.",

      keywords: [
        "select",
        "from",
        "where",
        "salary",
        "50000",
      ],
    },

    coding: {
      question:
        "Write an SQL query to display employee_name, department and salary for all employees whose salary is greater than 50000.",

      placeholder:
`SELECT employee_name, department, salary
FROM employees
WHERE ...`,

      keywords: [
        "select",
        "employee_name",
        "department",
        "salary",
        "from",
        "employees",
        "where",
        "50000",
      ],
    },
  },


  /* =======================================================
     PYTHON
  ======================================================= */

  Python: {
    quiz: {
      question:
        "Which Python data structure stores data using key-value pairs?",

      options: [
        "List",
        "Tuple",
        "Dictionary",
        "Set",
      ],

      answer: "Dictionary",
    },

    problem: {
      question:
        "You have student marks [78, 85, 91, 66, 80]. Explain how you would calculate the average mark using Python.",

      keywords: [
        "sum",
        "len",
        "average",
        "divide",
      ],
    },

    coding: {
      question:
        "Write Python code to calculate and print the average of [78, 85, 91, 66, 80].",

      placeholder:
`marks = [78, 85, 91, 66, 80]

# Write your solution here`,

      keywords: [
        "78",
        "85",
        "91",
        "66",
        "80",
        "sum",
        "len",
        "print",
      ],
    },
  },


  /* =======================================================
     EXCEL
  ======================================================= */

  Excel: {
    quiz: {
      question:
        "Which Excel function calculates the arithmetic average of a range?",

      options: [
        "SUM()",
        "AVERAGE()",
        "COUNT()",
        "MAX()",
      ],

      answer: "AVERAGE()",
    },

    problem: {
      question:
        "Monthly sales values are stored in cells B2:B13. Explain how you would calculate average sales and identify the highest monthly sales value.",

      keywords: [
        "average",
        "max",
        "b2",
        "b13",
        "formula",
      ],
    },

    coding: {
      question:
        "Write the Excel formulas for calculating the average and maximum values of cells B2:B13.",

      placeholder:
`Average formula:
=...

Maximum formula:
=...`,

      keywords: [
        "average",
        "max",
        "b2",
        "b13",
      ],
    },
  },


  /* =======================================================
     POWER BI
  ======================================================= */

  "Power BI": {
    quiz: {
      question:
        "Which language is primarily used to create calculated measures in Power BI?",

      options: [
        "DAX",
        "HTML",
        "Java",
        "C++",
      ],

      answer: "DAX",
    },

    problem: {
      question:
        "You receive sales data containing Date, Region, Product and Revenue. Explain how you would design a Power BI dashboard that lets management compare regional sales and monthly revenue trends.",

      keywords: [
        "region",
        "revenue",
        "date",
        "chart",
        "dashboard",
        "filter",
      ],
    },

    coding: {
      question:
        "Write a DAX measure called Total Revenue that calculates the total of the Revenue column in the Sales table.",

      placeholder:
`Total Revenue =
SUM(...)`,

      keywords: [
        "total revenue",
        "sum",
        "sales",
        "revenue",
      ],
    },
  },


  /* =======================================================
     STATISTICS
  ======================================================= */

  Statistics: {
    quiz: {
      question:
        "Which statistical measure represents the arithmetic average of a dataset?",

      options: [
        "Mean",
        "Median",
        "Mode",
        "Range",
      ],

      answer: "Mean",
    },

    problem: {
      question:
        "The values are 5, 10, 15, 20 and 25. Calculate or explain how you would calculate their mean.",

      keywords: [
        "15",
        "mean",
        "sum",
        "divide",
      ],
    },

    coding: {
      question:
        "Write Python code to calculate the mean of [5, 10, 15, 20, 25].",

      placeholder:
`data = [5, 10, 15, 20, 25]

# Calculate mean`,

      keywords: [
        "5",
        "10",
        "15",
        "20",
        "25",
        "sum",
        "len",
      ],
    },
  },


  /* =======================================================
     MACHINE LEARNING
  ======================================================= */

  "Machine Learning": {
    quiz: {
      question:
        "Which of these is a supervised machine-learning algorithm?",

      options: [
        "Linear Regression",
        "K-Means",
        "PCA",
        "Apriori",
      ],

      answer: "Linear Regression",
    },

    problem: {
      question:
        "A company wants to predict house prices from area, number of bedrooms and location. Identify the type of machine-learning problem and explain an appropriate approach.",

      keywords: [
        "regression",
        "supervised",
        "price",
        "features",
        "model",
      ],
    },

    coding: {
      question:
        "Write basic Python code using scikit-learn to create and train a LinearRegression model using X_train and y_train.",

      placeholder:
`from sklearn.linear_model import LinearRegression

# Create model

# Train model`,

      keywords: [
        "sklearn",
        "linearregression",
        "model",
        "fit",
        "x_train",
        "y_train",
      ],
    },
  },


  /* =======================================================
     DEEP LEARNING
  ======================================================= */

  "Deep Learning": {
    quiz: {
      question:
        "Which component introduces non-linearity into a neural network?",

      options: [
        "Activation Function",
        "CSV File",
        "Database",
        "DataFrame",
      ],

      answer: "Activation Function",
    },

    problem: {
      question:
        "You are developing an image-classification application. Explain why a convolutional neural network can be suitable for this task.",

      keywords: [
        "cnn",
        "image",
        "convolution",
        "features",
        "classification",
      ],
    },

    coding: {
      question:
        "Write simple TensorFlow/Keras code that creates a Sequential neural network containing one Dense hidden layer.",

      placeholder:
`from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense

model = Sequential([
    # add layers
])`,

      keywords: [
        "sequential",
        "dense",
        "model",
      ],
    },
  },


  /* =======================================================
     MLOPS
  ======================================================= */

  MLOps: {
    quiz: {
      question:
        "Which activity is an important part of MLOps?",

      options: [
        "Deploying and monitoring machine-learning models",
        "Only creating HTML pages",
        "Only storing images",
        "Only designing presentations",
      ],

      answer:
        "Deploying and monitoring machine-learning models",
    },

    problem: {
      question:
        "A deployed fraud-detection model becomes less accurate several months after deployment. Explain what you would monitor and what actions you might take.",

      keywords: [
        "monitor",
        "drift",
        "accuracy",
        "retrain",
        "data",
        "model",
      ],
    },

    coding: {
      question:
        "Write Python-style pseudocode showing how you might load a trained model and make a prediction for new_data.",

      placeholder:
`model = ...

prediction = ...

print(prediction)`,

      keywords: [
        "model",
        "predict",
        "new_data",
      ],
    },
  },


  /* =======================================================
     ETL
  ======================================================= */

  ETL: {
    quiz: {
      question:
        "What does ETL stand for?",

      options: [
        "Extract, Transform, Load",
        "Execute, Test, Learn",
        "Extract, Transfer, Link",
        "Evaluate, Transform, Learn",
      ],

      answer: "Extract, Transform, Load",
    },

    problem: {
      question:
        "Customer data arrives from several CSV files containing missing and inconsistent values. Explain an ETL workflow that prepares the data for an analytics database.",

      keywords: [
        "extract",
        "transform",
        "clean",
        "load",
        "database",
      ],
    },

    coding: {
      question:
        "Write simple Python/Pandas code to load customers.csv, remove rows containing missing values and save the cleaned data as cleaned_customers.csv.",

      placeholder:
`import pandas as pd

# Load file

# Clean missing values

# Save result`,

      keywords: [
        "pandas",
        "read_csv",
        "dropna",
        "to_csv",
      ],
    },
  },


  /* =======================================================
     DATA PIPELINES
  ======================================================= */

  "Data Pipelines": {
    quiz: {
      question:
        "What is the main purpose of a data pipeline?",

      options: [
        "Move and process data between systems",
        "Create logos",
        "Design presentations",
        "Increase monitor brightness",
      ],

      answer:
        "Move and process data between systems",
    },

    problem: {
      question:
        "A website produces thousands of user events every minute. Explain a pipeline that could collect, clean and store these events for analytics.",

      keywords: [
        "collect",
        "process",
        "clean",
        "transform",
        "store",
        "database",
      ],
    },

    coding: {
      question:
        "Write simple Python pseudocode that reads events, transforms each event and then saves the transformed results.",

      placeholder:
`events = ...

for event in events:
    # transform

# save results`,

      keywords: [
        "events",
        "for",
        "transform",
        "save",
      ],
    },
  },


  /* =======================================================
     BIG DATA
  ======================================================= */

  "Big Data": {
    quiz: {
      question:
        "Which technology is commonly used for distributed large-scale data processing?",

      options: [
        "Apache Spark",
        "Microsoft Paint",
        "PowerPoint",
        "Notepad",
      ],

      answer: "Apache Spark",
    },

    problem: {
      question:
        "A company must analyze hundreds of millions of transaction records. Explain why distributed processing may be preferable to processing everything on one small computer.",

      keywords: [
        "distributed",
        "parallel",
        "scale",
        "large",
        "performance",
      ],
    },

    coding: {
      question:
        "Write basic PySpark code or pseudocode to read a CSV dataset into a Spark DataFrame.",

      placeholder:
`spark = ...

df = spark.read...`,

      keywords: [
        "spark",
        "read",
        "csv",
        "dataframe",
      ],
    },
  },


  /* =======================================================
     DATA VISUALIZATION
  ======================================================= */

  "Data Visualization": {
    quiz: {
      question:
        "Which chart is generally most suitable for showing change over time?",

      options: [
        "Line Chart",
        "Pie Chart",
        "Single KPI Card",
        "Treemap",
      ],

      answer: "Line Chart",
    },

    problem: {
      question:
        "You have monthly revenue data covering two years. Explain which visualization you would choose and how you would make the trend easy for management to understand.",

      keywords: [
        "line",
        "time",
        "month",
        "trend",
        "revenue",
      ],
    },

    coding: {
      question:
        "Write Python code using Matplotlib to plot months against revenue as a line chart.",

      placeholder:
`import matplotlib.pyplot as plt

# plot months and revenue

# display chart`,

      keywords: [
        "matplotlib",
        "plot",
        "months",
        "revenue",
        "show",
      ],
    },
  },


  /* =======================================================
     BUSINESS ANALYSIS
  ======================================================= */

  "Business Analysis": {
    quiz: {
      question:
        "Which activity is an important responsibility of a Business Analyst?",

      options: [
        "Understanding business requirements",
        "Only repairing hardware",
        "Only writing CSS",
        "Only managing network cables",
      ],

      answer:
        "Understanding business requirements",
    },

    problem: {
      question:
        "A company says its customer onboarding process is taking too long. Explain how you would investigate the issue as a Business Analyst.",

      keywords: [
        "stakeholder",
        "requirements",
        "process",
        "problem",
        "analysis",
      ],
    },

    coding: null,
  },


  /* =======================================================
     COMMUNICATION
  ======================================================= */

  Communication: {
    quiz: {
      question:
        "What is usually most effective when presenting analytics findings to non-technical managers?",

      options: [
        "Clear business language supported by evidence",
        "Only source code",
        "Only technical jargon",
        "Avoiding recommendations",
      ],

      answer:
        "Clear business language supported by evidence",
    },

    problem: {
      question:
        "Your analysis shows that customer retention has declined. Explain how you would communicate the finding and recommendation to management.",

      keywords: [
        "finding",
        "evidence",
        "recommendation",
        "business",
        "clear",
      ],
    },

    coding: null,
  },


  /* =======================================================
     PRODUCT ANALYTICS
  ======================================================= */

  "Product Analytics": {
    quiz: {
      question:
        "Which metric measures how many users continue using a product over time?",

      options: [
        "Retention Rate",
        "Screen Resolution",
        "Storage Capacity",
        "CPU Speed",
      ],

      answer: "Retention Rate",
    },

    problem: {
      question:
        "A mobile app receives many downloads but very few users return after the first week. Explain which product metrics you would investigate.",

      keywords: [
        "retention",
        "engagement",
        "active",
        "users",
        "churn",
      ],
    },

    coding: {
      question:
        "Write an SQL query or pseudocode that counts unique active users from a user_events table.",

      placeholder:
`SELECT ...
FROM user_events ...`,

      keywords: [
        "select",
        "count",
        "distinct",
        "user",
      ],
    },
  },


  /* =======================================================
     MARKETING ANALYTICS
  ======================================================= */

  "Marketing Analytics": {
    quiz: {
      question:
        "Which metric measures the percentage of users who complete a desired action?",

      options: [
        "Conversion Rate",
        "Storage Usage",
        "CPU Usage",
        "File Size",
      ],

      answer: "Conversion Rate",
    },

    problem: {
      question:
        "Two advertising campaigns have different costs and sales results. Explain the metrics you would compare before deciding which campaign performed better.",

      keywords: [
        "conversion",
        "roi",
        "cost",
        "revenue",
        "campaign",
      ],
    },

    coding: {
      question:
        "Write a formula or pseudocode to calculate conversion rate using conversions and total_visitors.",

      placeholder:
`conversion_rate = ...`,

      keywords: [
        "conversion",
        "total",
        "100",
      ],
    },
  },


  /* =======================================================
     GENERATIVE AI
  ======================================================= */

  "Generative AI": {
    quiz: {
      question:
        "What is a core capability of generative AI systems?",

      options: [
        "Generating new content",
        "Only storing files",
        "Only sorting numbers",
        "Only creating folders",
      ],

      answer: "Generating new content",
    },

    problem: {
      question:
        "A company wants an AI assistant that answers questions using internal documents. Describe an appropriate high-level architecture.",

      keywords: [
        "documents",
        "retrieval",
        "context",
        "llm",
        "rag",
      ],
    },

    coding: {
      question:
        "Write Python-style code or pseudocode that sends a user's prompt to an AI client/API and stores the returned response.",

      placeholder:
`client = ...

prompt = "..."

response = ...

print(response)`,

      keywords: [
        "client",
        "prompt",
        "response",
      ],
    },
  },


  /* =======================================================
     APIs
  ======================================================= */

  APIs: {
    quiz: {
      question:
        "Which HTTP method is normally used to retrieve data from a REST API?",

      options: [
        "GET",
        "DELETE",
        "DROP",
        "TRUNCATE",
      ],

      answer: "GET",
    },

    problem: {
      question:
        "A React frontend needs career information from a FastAPI backend. Explain the request and response flow.",

      keywords: [
        "request",
        "endpoint",
        "get",
        "response",
        "json",
      ],
    },

    coding: {
      question:
        "Write JavaScript using fetch() to retrieve career data from http://127.0.0.1:8000/career-market.",

      placeholder:
`fetch("http://127.0.0.1:8000/career-market")
  .then(...)
  .then(...)`,

      keywords: [
        "fetch",
        "career-market",
        "then",
        "json",
      ],
    },
  },


  /* =======================================================
     DATA MODELING
  ======================================================= */

  "Data Modeling": {
    quiz: {
      question:
        "What is a primary purpose of data modeling?",

      options: [
        "Define how data is structured and related",
        "Design logos",
        "Increase monitor brightness",
        "Write advertisements",
      ],

      answer:
        "Define how data is structured and related",
    },

    problem: {
      question:
        "Design the main relationships needed for a university system containing Students, Courses and Enrollments.",

      keywords: [
        "student",
        "course",
        "enrollment",
        "id",
        "relationship",
      ],
    },

    coding: {
      question:
        "Write SQL CREATE TABLE statements or pseudocode showing the relationship between Student and Enrollment tables.",

      placeholder:
`CREATE TABLE students (...);

CREATE TABLE enrollments (...);`,

      keywords: [
        "create table",
        "student",
        "enrollment",
        "primary key",
        "foreign key",
      ],
    },
  },


  /* =======================================================
     CLOUD
  ======================================================= */

  Cloud: {
    quiz: {
      question:
        "Which is a common advantage of cloud computing?",

      options: [
        "Scalable computing resources",
        "Unlimited free hardware",
        "No security responsibility",
        "No network is ever needed",
      ],

      answer:
        "Scalable computing resources",
    },

    problem: {
      question:
        "An analytics workload varies greatly from month to month. Explain why cloud infrastructure could be useful.",

      keywords: [
        "scale",
        "resources",
        "demand",
        "cost",
        "cloud",
      ],
    },

    coding: {
      question:
        "Write simple Python-style pseudocode for uploading a file called data.csv to cloud storage.",

      placeholder:
`client = ...

client.upload(...)`,

      keywords: [
        "client",
        "upload",
        "data.csv",
      ],
    },
  },


  /* =======================================================
     DATA ARCHITECTURE
  ======================================================= */

  "Data Architecture": {
    quiz: {
      question:
        "What does data architecture mainly describe?",

      options: [
        "How data is collected, stored, integrated and used",
        "Keyboard layout",
        "Computer wallpaper",
        "Marketing slogans",
      ],

      answer:
        "How data is collected, stored, integrated and used",
    },

    problem: {
      question:
        "Customer data exists separately in Sales, Support and Marketing systems. Describe a high-level architecture that could support integrated analytics.",

      keywords: [
        "integration",
        "pipeline",
        "warehouse",
        "database",
        "data",
      ],
    },

    coding: {
      question:
        "Write pseudocode showing a basic pipeline from source systems to transformation and then to a data warehouse.",

      placeholder:
`sources = [...]

# extract

# transform

# load to warehouse`,

      keywords: [
        "source",
        "extract",
        "transform",
        "load",
        "warehouse",
      ],
    },
  },
};


/* =========================================================
   FALLBACK QUESTIONS

   If a skill exists in career_market.json but not above,
   NEXTPATH can still create an assessment.
========================================================= */

function createFallbackQuestions(skillName) {
  return {
    quiz: {
      question:
        `Which statement best describes the importance of ${skillName} in a professional career?`,

      options: [
        `${skillName} supports role-specific professional tasks`,
        `${skillName} has no professional purpose`,
        `${skillName} cannot be learned`,
        `${skillName} is only used for entertainment`,
      ],

      answer:
        `${skillName} supports role-specific professional tasks`,
    },

    problem: {
      question:
        `Describe a realistic workplace problem where ${skillName} could be useful and explain how you would approach the problem.`,

      keywords: [
        skillName.toLowerCase(),
        "problem",
        "solution",
      ],
    },

    coding: null,
  };
}


/* =========================================================
   MAIN ASSESSMENT COMPONENT
========================================================= */

function Assessment() {
  const navigate = useNavigate();


  /* =======================================================
     LOAD CAREER
  ======================================================= */

  const careerData = JSON.parse(
    localStorage.getItem(
      "nextpathTargetCareerData"
    ) || "null"
  );


  /* =======================================================
     LOAD USER-SELECTED KNOWN SKILLS
  ======================================================= */

  const selectedSkills = JSON.parse(
    localStorage.getItem(
      "nextpathSelectedSkills"
    ) || "{}"
  );


  /* =======================================================
     ASSESSMENT MODE

     initial:
     verify skills selected in Required Skills

     reassessment:
     verify skills after Roadmap learning
  ======================================================= */

  const assessmentMode =
    localStorage.getItem(
      "nextpathAssessmentMode"
    ) || "initial";


  const reassessmentSkills = JSON.parse(
    localStorage.getItem(
      "nextpathReassessmentSkills"
    ) || "[]"
  );


  const [answers, setAnswers] =
    useState({});

  const [submitError, setSubmitError] =
    useState("");


  /* =======================================================
     NORMALIZE CAREER SKILLS
  ======================================================= */

  const allCareerSkills = useMemo(() => {
    if (!careerData?.skills) {
      return [];
    }

    return careerData.skills.map(
      (skill) => {
        if (typeof skill === "string") {
          return {
            name: skill,
            required_score: 7,
          };
        }

        return skill;
      }
    );
  }, [careerData]);


  /* =======================================================
     CHOOSE WHICH SKILLS WILL BE ASSESSED
  ======================================================= */

  const skillsToAssess = useMemo(() => {
    if (
      assessmentMode ===
      "reassessment"
    ) {
      return allCareerSkills.filter(
        (skill) =>
          reassessmentSkills.includes(
            skill.name
          )
      );
    }

    /*
      Initial assessment:
      ONLY skills user said they know.
    */

    return allCareerSkills.filter(
      (skill) =>
        Boolean(
          selectedSkills[skill.name]
        )
    );
  }, [
    allCareerSkills,
    selectedSkills,
    reassessmentSkills,
    assessmentMode,
  ]);


  /* =======================================================
     GENERATE ASSESSMENT

     Every selected skill gets:

     Quiz
     +
     Problem Solving
     +
     Coding if applicable
  ======================================================= */

  const assessmentSections =
    useMemo(() => {

      return skillsToAssess.map(
        (skill, index) => {

          const content =
            questionBank[skill.name] ||
            createFallbackQuestions(
              skill.name
            );

          const questions = [];


          /*
            QUIZ
          */

          questions.push({
            id:
              `${skill.name}-quiz-${index}`,

            skill:
              skill.name,

            requiredScore:
              Number(
                skill.required_score
              ),

            type:
              "quiz",

            ...content.quiz,
          });


          /*
            PROBLEM SOLVING
          */

          questions.push({
            id:
              `${skill.name}-problem-${index}`,

            skill:
              skill.name,

            requiredScore:
              Number(
                skill.required_score
              ),

            type:
              "problem",

            ...content.problem,
          });


          /*
            CODING

            Only if appropriate for
            this particular skill.
          */

          if (content.coding) {
            questions.push({
              id:
                `${skill.name}-coding-${index}`,

              skill:
                skill.name,

              requiredScore:
                Number(
                  skill.required_score
                ),

              type:
                "coding",

              ...content.coding,
            });
          }


          return {
            skill:
              skill.name,

            requiredScore:
              Number(
                skill.required_score
              ),

            questions,
          };

        }
      );

    }, [skillsToAssess]);


  const allQuestions =
    assessmentSections.flatMap(
      (section) =>
        section.questions
    );


  /* =======================================================
     ANSWER HANDLING
  ======================================================= */

  const handleAnswer = (
    questionId,
    value
  ) => {
    setAnswers(
      (previous) => ({
        ...previous,
        [questionId]:
          value,
      })
    );

    setSubmitError("");
  };


  /* =======================================================
     KEYWORD SCORING

     Used for problem solving and coding.
  ======================================================= */

  const calculateKeywordScore = (
    answer,
    keywords
  ) => {
    if (!answer) {
      return 0;
    }

    const normalized =
      answer
        .toLowerCase()
        .replace(/\s+/g, " ");


    const matches =
      keywords.filter(
        (keyword) =>
          normalized.includes(
            keyword.toLowerCase()
          )
      ).length;


    return (
      matches /
      keywords.length
    );
  };


  /* =======================================================
     CHECK ALL QUESTIONS ANSWERED
  ======================================================= */

  const unansweredQuestions =
    allQuestions.filter(
      (question) => {
        const answer =
          answers[question.id];

        return (
          answer === undefined ||
          answer === null ||
          String(answer).trim() === ""
        );
      }
    );


  /* =======================================================
     SUBMIT
  ======================================================= */

  const submitAssessment = () => {

    if (
      unansweredQuestions.length >
      0
    ) {
      setSubmitError(
        `Please complete all questions. ${unansweredQuestions.length} question(s) are still unanswered.`
      );

      return;
    }


    const skillResults = {};


    skillsToAssess.forEach(
      (skill) => {

        skillResults[
          skill.name
        ] = {
          quizPoints: 0,
          quizMaximum: 0,

          problemPoints: 0,
          problemMaximum: 0,

          codingPoints: 0,
          codingMaximum: 0,

          requiredScore:
            Number(
              skill.required_score
            ),
        };

      }
    );


    /* =====================================================
       SCORE EACH QUESTION
    ===================================================== */

    allQuestions.forEach(
      (question) => {

        const result =
          skillResults[
            question.skill
          ];


        /* QUIZ */

        if (
          question.type ===
          "quiz"
        ) {

          result.quizMaximum += 1;

          if (
            answers[
              question.id
            ] ===
            question.answer
          ) {

            result.quizPoints += 1;

          }

        }


        /* PROBLEM */

        if (
          question.type ===
          "problem"
        ) {

          result.problemMaximum += 1;

          result.problemPoints +=
            calculateKeywordScore(
              answers[
                question.id
              ],
              question.keywords
            );

        }


        /* CODING */

        if (
          question.type ===
          "coding"
        ) {

          result.codingMaximum += 1;

          result.codingPoints +=
            calculateKeywordScore(
              answers[
                question.id
              ],
              question.keywords
            );

        }

      }
    );


    /* =====================================================
       CALCULATE PER-SKILL SCORES

       Quiz            = 30%
       Problem Solving = 30%
       Coding          = 40%

       For non-coding skills:
       Quiz            = 40%
       Problem Solving = 60%
    ===================================================== */

    const skillScores = {};

    const detailedResults = {};


    Object.entries(
      skillResults
    ).forEach(
      ([skill, result]) => {

        const quizPercentage =
          result.quizMaximum > 0
            ? (
                result.quizPoints /
                result.quizMaximum
              ) * 100
            : 0;


        const problemPercentage =
          result.problemMaximum > 0
            ? (
                result.problemPoints /
                result.problemMaximum
              ) * 100
            : 0;


        const codingPercentage =
          result.codingMaximum > 0
            ? (
                result.codingPoints /
                result.codingMaximum
              ) * 100
            : null;


        let finalPercentage;


        if (
          result.codingMaximum > 0
        ) {

          finalPercentage =
            quizPercentage * 0.30 +
            problemPercentage * 0.30 +
            codingPercentage * 0.40;

        } else {

          finalPercentage =
            quizPercentage * 0.40 +
            problemPercentage * 0.60;

        }


        const scoreOutOf10 =
          finalPercentage / 10;


        skillScores[skill] =
          Number(
            scoreOutOf10.toFixed(1)
          );


        detailedResults[skill] = {

          requiredScore:
            result.requiredScore,

          quizPercentage:
            Number(
              quizPercentage.toFixed(
                1
              )
            ),

          problemSolvingPercentage:
            Number(
              problemPercentage.toFixed(
                1
              )
            ),

          codingPercentage:
            codingPercentage === null
              ? null
              : Number(
                  codingPercentage.toFixed(
                    1
                  )
                ),

          finalPercentage:
            Number(
              finalPercentage.toFixed(
                1
              )
            ),

          scoreOutOf10:
            Number(
              scoreOutOf10.toFixed(
                1
              )
            ),
        };

      }
    );


    /* =====================================================
       UPDATE CUMULATIVE VERIFIED SCORES
    ===================================================== */

    const previousSkillScores =
      JSON.parse(
        localStorage.getItem(
          "nextpathSkillScores"
        ) || "{}"
      );


    const mergedSkillScores = {
      ...previousSkillScores,
      ...skillScores,
    };


    localStorage.setItem(
      "nextpathSkillScores",
      JSON.stringify(
        mergedSkillScores
      )
    );


    /* =====================================================
       FIND VERIFIED / PASSED SKILLS

       Pass only when:
       assessment score >= market required score
    ===================================================== */

    const passedSkills = [];


    skillsToAssess.forEach(
      (skill) => {

        const score =
          Number(
            skillScores[
              skill.name
            ] || 0
          );

        const required =
          Number(
            skill.required_score
          );


        if (
          score >= required
        ) {

          passedSkills.push({
            skill:
              skill.name,

            score,

            requiredScore:
              required,
          });

        }

      }
    );


    /* =====================================================
       CERTIFICATE ONLY DURING RE-ASSESSMENT
    ===================================================== */

    if (
      assessmentMode ===
      "reassessment"
    ) {

      const verifiedSkills =
        JSON.parse(
          localStorage.getItem(
            "nextpathVerifiedSkills"
          ) || "{}"
        );


      const certificates =
        JSON.parse(
          localStorage.getItem(
            "nextpathCertificates"
          ) || "[]"
        );


      passedSkills.forEach(
        (item) => {

          verifiedSkills[
            item.skill
          ] = {
            score:
              item.score,

            requiredScore:
              item.requiredScore,

            verifiedAt:
              new Date().toISOString(),
          };


          const alreadyExists =
            certificates.some(
              (certificate) =>
                certificate.skill ===
                  item.skill &&
                certificate.career ===
                  careerData.career
            );


          if (!alreadyExists) {

            certificates.push({

              id:
                `NXP-${item.skill
                  .replace(/\s+/g, "-")
                  .toUpperCase()}-${Date.now()}`,

              skill:
                item.skill,

              score:
                item.score,

              requiredScore:
                item.requiredScore,

              career:
                careerData.career,

              issuedAt:
                new Date().toISOString(),

            });

          }

        }
      );


      localStorage.setItem(
        "nextpathVerifiedSkills",
        JSON.stringify(
          verifiedSkills
        )
      );


      localStorage.setItem(
        "nextpathCertificates",
        JSON.stringify(
          certificates
        )
      );

    }


    /* =====================================================
       OVERALL SCORE
    ===================================================== */

    const scoreValues =
      Object.values(
        skillScores
      );


    const overallScore =
      scoreValues.length > 0
        ? scoreValues.reduce(
            (total, score) =>
              total + score,
            0
          ) /
          scoreValues.length
        : 0;


    /* =====================================================
       SAVE ASSESSMENT REPORT
    ===================================================== */

    const report = {

      mode:
        assessmentMode,

      targetCareer:
        careerData.career,

      assessedSkills:
        skillsToAssess.map(
          (skill) =>
            skill.name
        ),

      skillScores,

      detailedResults,

      passedSkills,

      overallScore:
        Number(
          overallScore.toFixed(
            1
          )
        ),

      submittedAnswers:
        answers,

      completedAt:
        new Date().toISOString(),

    };


    localStorage.setItem(
      "nextpathAssessmentReport",
      JSON.stringify(
        report
      )
    );


    /*
      Reset mode after assessment
    */

    localStorage.setItem(
      "nextpathAssessmentMode",
      "initial"
    );


    navigate(
      "/assessment-report"
    );

  };


  /* =========================================================
     NO CAREER
  ========================================================= */

  if (!careerData) {

    return (

      <MessageCard
        title="Select a Target Career First"
        description="NEXTPATH needs a target career before generating your assessment."
        buttonText="Choose Career"
        onClick={() =>
          navigate(
            "/target-career"
          )
        }
      />

    );

  }


  /* =========================================================
     NO SKILLS
  ========================================================= */

  if (
    skillsToAssess.length === 0
  ) {

    return (

      <MessageCard
        title="No Skills Selected for Verification"
        description="Select the skills you already know. Skills you do not select will automatically become 100% gaps and do not require assessment."
        buttonText="Select Known Skills"
        onClick={() =>
          navigate(
            "/required-skills"
          )
        }
      />

    );

  }


  /* =========================================================
     PAGE
  ========================================================= */

  return (

    <div
      style={{
        maxWidth:
          "1050px",

        margin:
          "0 auto",

        paddingBottom:
          "50px",
      }}
    >

      {/* HEADER */}

      <div
        style={{
          marginBottom:
            "30px",
        }}
      >

        <p
          style={{
            color:
              "#C9151E",

            fontWeight:
              "800",

            letterSpacing:
              "1px",
          }}
        >

          {assessmentMode ===
          "reassessment"
            ? "PROGRESS RE-ASSESSMENT"
            : "SKILL VERIFICATION ASSESSMENT"}

        </p>


        <h1
          style={{
            fontSize:
              "38px",

            margin:
              "0 0 10px",
          }}
        >
          {careerData.career}
        </h1>


        <p
          style={{
            color:
              "#6B7280",

            lineHeight:
              "1.7",

            maxWidth:
              "850px",
          }}
        >

          Your assessment contains
          knowledge quizzes, practical
          problem-solving scenarios and
          coding challenges for the skills
          you selected.

        </p>

      </div>


      {/* ASSESSMENT SUMMARY */}

      <div
        style={{
          display:
            "grid",

          gridTemplateColumns:
            "repeat(auto-fit, minmax(180px, 1fr))",

          gap:
            "12px",

          marginBottom:
            "30px",
        }}
      >

        <SummaryCard
          title="Skills"
          value={
            skillsToAssess.length
          }
        />

        <SummaryCard
          title="Questions"
          value={
            allQuestions.length
          }
        />

        <SummaryCard
          title="Quiz"
          value={
            allQuestions.filter(
              (q) =>
                q.type ===
                "quiz"
            ).length
          }
        />

        <SummaryCard
          title="Problem Solving"
          value={
            allQuestions.filter(
              (q) =>
                q.type ===
                "problem"
            ).length
          }
        />

        <SummaryCard
          title="Coding"
          value={
            allQuestions.filter(
              (q) =>
                q.type ===
                "coding"
            ).length
          }
        />

      </div>


      {/* SKILLS */}

      <div
        style={{
          background:
            "#FFFFFF",

          padding:
            "20px",

          borderRadius:
            "14px",

          border:
            "1px solid #E5E7EB",

          marginBottom:
            "30px",
        }}
      >

        <strong>
          Skills being verified
        </strong>


        <div
          style={{
            marginTop:
              "10px",
          }}
        >

          {skillsToAssess.map(
            (skill) => (

              <span
                key={
                  skill.name
                }

                style={{
                  display:
                    "inline-block",

                  padding:
                    "7px 11px",

                  margin:
                    "4px",

                  background:
                    "#F3F4F6",

                  borderRadius:
                    "999px",

                  fontSize:
                    "13px",
                }}
              >

                {skill.name}

                {" • Required "}

                {
                  skill.required_score
                }
                /10

              </span>

            )
          )}

        </div>

      </div>


      {/* =====================================================
          SKILL SECTIONS
      ===================================================== */}

      {assessmentSections.map(
        (
          section,
          skillIndex
        ) => (

          <div
            key={
              section.skill
            }
          >

            {/* SKILL TITLE */}

            <div
              style={{
                marginTop:
                  "36px",

                marginBottom:
                  "15px",

                display:
                  "flex",

                alignItems:
                  "center",

                gap:
                  "12px",
              }}
            >

              <div
                style={{
                  width:
                    "42px",

                  height:
                    "42px",

                  background:
                    "#C9151E",

                  color:
                    "#FFFFFF",

                  display:
                    "flex",

                  alignItems:
                    "center",

                  justifyContent:
                    "center",

                  borderRadius:
                    "10px",

                  fontWeight:
                    "900",
                }}
              >

                {
                  skillIndex + 1
                }

              </div>


              <div>

                <h2
                  style={{
                    margin:
                      0,
                  }}
                >
                  {
                    section.skill
                  }
                </h2>


                <small
                  style={{
                    color:
                      "#6B7280",
                  }}
                >

                  Required level:
                  {" "}
                  {
                    section.requiredScore
                  }
                  /10

                </small>

              </div>

            </div>


            {/* QUESTIONS */}

            {section.questions.map(
              (
                question,
                questionIndex
              ) => (

                <QuestionCard
                  key={
                    question.id
                  }

                  number={
                    questionIndex +
                    1
                  }

                  skill={
                    question.skill
                  }

                  type={
                    question.type
                  }
                >

                  <h3
                    style={{
                      lineHeight:
                        "1.5",
                    }}
                  >

                    {
                      question.question
                    }

                  </h3>


                  {/* QUIZ */}

                  {question.type ===
                    "quiz" && (

                    <div>

                      {question.options.map(
                        (
                          option
                        ) => {

                          const selected =
                            answers[
                              question.id
                            ] ===
                            option;


                          return (

                            <label
                              key={
                                option
                              }

                              style={{
                                display:
                                  "block",

                                padding:
                                  "13px",

                                marginBottom:
                                  "9px",

                                border:
                                  selected
                                    ? "2px solid #C9151E"
                                    : "1px solid #E5E7EB",

                                background:
                                  selected
                                    ? "#FFF7F7"
                                    : "#FFFFFF",

                                borderRadius:
                                  "9px",

                                cursor:
                                  "pointer",
                              }}
                            >

                              <input
                                type="radio"

                                name={
                                  question.id
                                }

                                checked={
                                  selected
                                }

                                onChange={() =>
                                  handleAnswer(
                                    question.id,
                                    option
                                  )
                                }
                              />

                              {" "}

                              {option}

                            </label>

                          );

                        }
                      )}

                    </div>

                  )}


                  {/* PROBLEM SOLVING */}

                  {question.type ===
                    "problem" && (

                    <div>

                      <p
                        style={{
                          color:
                            "#6B7280",

                          fontSize:
                            "13px",
                        }}
                      >

                        Explain your reasoning
                        and solution clearly.

                      </p>


                      <textarea
                        value={
                          answers[
                            question.id
                          ] || ""
                        }

                        onChange={
                          (event) =>
                            handleAnswer(
                              question.id,
                              event.target.value
                            )
                        }

                        rows="7"

                        placeholder="Explain your solution step by step..."

                        style={{
                          width:
                            "100%",

                          padding:
                            "15px",

                          border:
                            "1px solid #D1D5DB",

                          borderRadius:
                            "10px",

                          boxSizing:
                            "border-box",

                          resize:
                            "vertical",

                          fontSize:
                            "14px",

                          lineHeight:
                            "1.6",
                        }}
                      />

                    </div>

                  )}


                  {/* CODING */}

                  {question.type ===
                    "coding" && (

                    <div>

                      <p
                        style={{
                          color:
                            "#6B7280",

                          fontSize:
                            "13px",
                        }}
                      >

                        Write your solution
                        in the editor below.

                      </p>


                      <textarea
                        value={
                          answers[
                            question.id
                          ] || ""
                        }

                        onChange={
                          (event) =>
                            handleAnswer(
                              question.id,
                              event.target.value
                            )
                        }

                        rows="12"

                        spellCheck={
                          false
                        }

                        placeholder={
                          question.placeholder ||
                          "Write your code here..."
                        }

                        style={{
                          width:
                            "100%",

                          padding:
                            "17px",

                          background:
                            "#111827",

                          color:
                            "#F9FAFB",

                          border:
                            "1px solid #374151",

                          borderRadius:
                            "10px",

                          boxSizing:
                            "border-box",

                          resize:
                            "vertical",

                          fontFamily:
                            "Consolas, Monaco, 'Courier New', monospace",

                          fontSize:
                            "14px",

                          lineHeight:
                            "1.7",

                          tabSize:
                            4,
                        }}
                      />

                    </div>

                  )}

                </QuestionCard>

              )
            )}

          </div>

        )
      )}


      {/* ERROR */}

      {submitError && (

        <div
          style={{
            background:
              "#FEE2E2",

            color:
              "#B91C1C",

            padding:
              "14px",

            borderRadius:
              "10px",

            marginTop:
              "25px",

            fontWeight:
              "700",
          }}
        >

          {submitError}

        </div>

      )}


      {/* SUBMIT */}

      <button
        onClick={
          submitAssessment
        }

        style={{
          width:
            "100%",

          marginTop:
            "25px",

          padding:
            "16px",

          background:
            "#C9151E",

          color:
            "#FFFFFF",

          border:
            "none",

          borderRadius:
            "11px",

          fontSize:
            "16px",

          fontWeight:
            "800",

          cursor:
            "pointer",
        }}
      >

        {assessmentMode ===
        "reassessment"
          ? "Submit Re-Assessment & Verify Progress"
          : "Submit Assessment & Calculate Skill Gap"}

      </button>


      <p
        style={{
          textAlign:
            "center",

          color:
            "#9CA3AF",

          fontSize:
            "12px",

          marginTop:
            "12px",
        }}
      >

        Quiz, problem-solving and coding
        performance are combined to
        calculate your demonstrated skill
        score.

      </p>

    </div>

  );

}


/* =========================================================
   QUESTION CARD
========================================================= */

function QuestionCard({
  number,
  skill,
  type,
  children,
}) {

  const typeLabel =
    type === "quiz"
      ? "Quiz"
      : type === "problem"
      ? "Problem Solving"
      : "Coding";


  const typeColor =
    type === "quiz"
      ? {
          background:
            "#DBEAFE",

          color:
            "#1D4ED8",
        }

      : type === "problem"
      ? {
          background:
            "#FEF3C7",

          color:
            "#92400E",
        }

      : {
          background:
            "#EDE9FE",

          color:
            "#6D28D9",
        };


  return (

    <div
      style={{
        background:
          "#FFFFFF",

        padding:
          "24px",

        borderRadius:
          "15px",

        border:
          "1px solid #E5E7EB",

        marginBottom:
          "16px",

        boxShadow:
          "0 3px 12px rgba(0,0,0,0.04)",
      }}
    >

      <div
        style={{
          display:
            "flex",

          justifyContent:
            "space-between",

          alignItems:
            "center",

          gap:
            "10px",

          marginBottom:
            "12px",
        }}
      >

        <span
          style={{
            color:
              "#6B7280",

            fontWeight:
              "700",
          }}
        >

          Question {number}

        </span>


        <div
          style={{
            display:
              "flex",

            gap:
              "8px",
          }}
        >

          <span
            style={{
              background:
                "#F3F4F6",

              padding:
                "6px 10px",

              borderRadius:
                "999px",

              fontSize:
                "12px",

              fontWeight:
                "700",
            }}
          >

            {skill}

          </span>


          <span
            style={{
              ...typeColor,

              padding:
                "6px 10px",

              borderRadius:
                "999px",

              fontSize:
                "12px",

              fontWeight:
                "800",
            }}
          >

            {typeLabel}

          </span>

        </div>

      </div>


      {children}

    </div>

  );

}


/* =========================================================
   SUMMARY CARD
========================================================= */

function SummaryCard({
  title,
  value,
}) {

  return (

    <div
      style={{
        background:
          "#FFFFFF",

        padding:
          "17px",

        borderRadius:
          "12px",

        border:
          "1px solid #E5E7EB",
      }}
    >

      <small
        style={{
          color:
            "#6B7280",
        }}
      >

        {title}

      </small>


      <h2
        style={{
          margin:
            "5px 0 0",
        }}
      >

        {value}

      </h2>

    </div>

  );

}


/* =========================================================
   MESSAGE CARD
========================================================= */

function MessageCard({
  title,
  description,
  buttonText,
  onClick,
}) {

  return (

    <div
      style={{
        maxWidth:
          "700px",

        background:
          "#FFFFFF",

        padding:
          "30px",

        borderRadius:
          "16px",

        border:
          "1px solid #E5E7EB",
      }}
    >

      <h2>
        {title}
      </h2>


      <p
        style={{
          color:
            "#6B7280",

          lineHeight:
            "1.6",
        }}
      >

        {description}

      </p>


      <button
        onClick={
          onClick
        }

        style={{
          background:
            "#C9151E",

          color:
            "#FFFFFF",

          border:
            "none",

          borderRadius:
            "9px",

          padding:
            "12px 20px",

          cursor:
            "pointer",

          fontWeight:
            "800",
        }}
      >

        {buttonText}

      </button>

    </div>

  );

}


export default Assessment;