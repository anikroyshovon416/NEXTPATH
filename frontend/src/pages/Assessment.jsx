import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const QUESTION_BANK = {
  "SQL": [
    {
      "id": "sql_01",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which SQL clause filters rows before aggregation?",
        "options": [
          "WHERE",
          "HAVING",
          "ORDER BY",
          "GROUP BY"
        ],
        "answer": "WHERE"
      },
      "problem": {
        "question": "SQL problem-solving task 1: Explain how you would solve a realistic scenario involving join and key. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "join",
          "key",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "SQL practical/coding task 1: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates select and from. Explain important decisions.",
        "keywords": [
          "select",
          "from",
          "where"
        ],
        "minLength": 70
      },
      "project": {
        "title": "SQL Portfolio Project 1",
        "brief": "Build an employee analytics SQL case study with normalized tables and at least ten business queries.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "sql",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "sql_02",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which clause filters groups after aggregation?",
        "options": [
          "HAVING",
          "WHERE",
          "SELECT",
          "LIMIT"
        ],
        "answer": "HAVING"
      },
      "problem": {
        "question": "SQL problem-solving task 2: Explain how you would solve a realistic scenario involving group by and aggregate. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "group by",
          "aggregate",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "SQL practical/coding task 2: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates group by and count. Explain important decisions.",
        "keywords": [
          "group by",
          "count"
        ],
        "minLength": 70
      },
      "project": {
        "title": "SQL Portfolio Project 2",
        "brief": "Create a sales database and answer revenue, customer, product and monthly-trend questions.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "sql",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "sql_03",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which join returns matching rows from both tables?",
        "options": [
          "INNER JOIN",
          "LEFT JOIN",
          "CROSS JOIN",
          "FULL JOIN"
        ],
        "answer": "INNER JOIN"
      },
      "problem": {
        "question": "SQL problem-solving task 3: Explain how you would solve a realistic scenario involving window and partition. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "window",
          "partition",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "SQL practical/coding task 3: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates join and on. Explain important decisions.",
        "keywords": [
          "join",
          "on"
        ],
        "minLength": 100
      },
      "project": {
        "title": "SQL Portfolio Project 3",
        "brief": "Build a university analytics database with student, course, attendance and result tables.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "sql",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "sql_04",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which function counts rows?",
        "options": [
          "COUNT",
          "SUM",
          "AVG",
          "ROUND"
        ],
        "answer": "COUNT"
      },
      "problem": {
        "question": "SQL problem-solving task 4: Explain how you would solve a realistic scenario involving index and query. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "index",
          "query",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "SQL practical/coding task 4: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates with and select. Explain important decisions.",
        "keywords": [
          "with",
          "select"
        ],
        "minLength": 70
      },
      "project": {
        "title": "SQL Portfolio Project 4",
        "brief": "Build an employee analytics SQL case study with normalized tables and at least ten business queries.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "sql",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "sql_05",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which SQL feature is useful for reusable named query blocks?",
        "options": [
          "CTE",
          "INDEX",
          "TRIGGER",
          "VIEWPORT"
        ],
        "answer": "CTE"
      },
      "problem": {
        "question": "SQL problem-solving task 5: Explain how you would solve a realistic scenario involving null and coalesce. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "null",
          "coalesce",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "SQL practical/coding task 5: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates over and partition by. Explain important decisions.",
        "keywords": [
          "over",
          "partition by"
        ],
        "minLength": 70
      },
      "project": {
        "title": "SQL Portfolio Project 5",
        "brief": "Create a sales database and answer revenue, customer, product and monthly-trend questions.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "sql",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "sql_06",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which SQL clause filters rows before aggregation? Scenario set 6.",
        "options": [
          "WHERE",
          "HAVING",
          "ORDER BY",
          "GROUP BY"
        ],
        "answer": "WHERE"
      },
      "problem": {
        "question": "SQL problem-solving task 6: Explain how you would solve a realistic scenario involving join and key. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "join",
          "key",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "SQL practical/coding task 6: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates select and from. Explain important decisions.",
        "keywords": [
          "select",
          "from",
          "where"
        ],
        "minLength": 100
      },
      "project": {
        "title": "SQL Portfolio Project 6",
        "brief": "Build a university analytics database with student, course, attendance and result tables.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "sql",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "sql_07",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which clause filters groups after aggregation? Scenario set 7.",
        "options": [
          "HAVING",
          "WHERE",
          "SELECT",
          "LIMIT"
        ],
        "answer": "HAVING"
      },
      "problem": {
        "question": "SQL problem-solving task 7: Explain how you would solve a realistic scenario involving group by and aggregate. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "group by",
          "aggregate",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "SQL practical/coding task 7: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates group by and count. Explain important decisions.",
        "keywords": [
          "group by",
          "count"
        ],
        "minLength": 70
      },
      "project": {
        "title": "SQL Portfolio Project 7",
        "brief": "Build an employee analytics SQL case study with normalized tables and at least ten business queries.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "sql",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "sql_08",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which join returns matching rows from both tables? Scenario set 8.",
        "options": [
          "INNER JOIN",
          "LEFT JOIN",
          "CROSS JOIN",
          "FULL JOIN"
        ],
        "answer": "INNER JOIN"
      },
      "problem": {
        "question": "SQL problem-solving task 8: Explain how you would solve a realistic scenario involving window and partition. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "window",
          "partition",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "SQL practical/coding task 8: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates join and on. Explain important decisions.",
        "keywords": [
          "join",
          "on"
        ],
        "minLength": 70
      },
      "project": {
        "title": "SQL Portfolio Project 8",
        "brief": "Create a sales database and answer revenue, customer, product and monthly-trend questions.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "sql",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "sql_09",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which function counts rows? Scenario set 9.",
        "options": [
          "COUNT",
          "SUM",
          "AVG",
          "ROUND"
        ],
        "answer": "COUNT"
      },
      "problem": {
        "question": "SQL problem-solving task 9: Explain how you would solve a realistic scenario involving index and query. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "index",
          "query",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "SQL practical/coding task 9: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates with and select. Explain important decisions.",
        "keywords": [
          "with",
          "select"
        ],
        "minLength": 100
      },
      "project": {
        "title": "SQL Portfolio Project 9",
        "brief": "Build a university analytics database with student, course, attendance and result tables.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "sql",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "sql_10",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which SQL feature is useful for reusable named query blocks? Scenario set 10.",
        "options": [
          "CTE",
          "INDEX",
          "TRIGGER",
          "VIEWPORT"
        ],
        "answer": "CTE"
      },
      "problem": {
        "question": "SQL problem-solving task 10: Explain how you would solve a realistic scenario involving null and coalesce. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "null",
          "coalesce",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "SQL practical/coding task 10: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates over and partition by. Explain important decisions.",
        "keywords": [
          "over",
          "partition by"
        ],
        "minLength": 70
      },
      "project": {
        "title": "SQL Portfolio Project 10",
        "brief": "Build an employee analytics SQL case study with normalized tables and at least ten business queries.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "sql",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "sql_11",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which SQL clause filters rows before aggregation? Scenario set 11.",
        "options": [
          "WHERE",
          "HAVING",
          "ORDER BY",
          "GROUP BY"
        ],
        "answer": "WHERE"
      },
      "problem": {
        "question": "SQL problem-solving task 11: Explain how you would solve a realistic scenario involving join and key. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "join",
          "key",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "SQL practical/coding task 11: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates select and from. Explain important decisions.",
        "keywords": [
          "select",
          "from",
          "where"
        ],
        "minLength": 70
      },
      "project": {
        "title": "SQL Portfolio Project 11",
        "brief": "Create a sales database and answer revenue, customer, product and monthly-trend questions.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "sql",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "sql_12",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which clause filters groups after aggregation? Scenario set 12.",
        "options": [
          "HAVING",
          "WHERE",
          "SELECT",
          "LIMIT"
        ],
        "answer": "HAVING"
      },
      "problem": {
        "question": "SQL problem-solving task 12: Explain how you would solve a realistic scenario involving group by and aggregate. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "group by",
          "aggregate",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "SQL practical/coding task 12: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates group by and count. Explain important decisions.",
        "keywords": [
          "group by",
          "count"
        ],
        "minLength": 100
      },
      "project": {
        "title": "SQL Portfolio Project 12",
        "brief": "Build a university analytics database with student, course, attendance and result tables.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "sql",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "sql_13",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which join returns matching rows from both tables? Scenario set 13.",
        "options": [
          "INNER JOIN",
          "LEFT JOIN",
          "CROSS JOIN",
          "FULL JOIN"
        ],
        "answer": "INNER JOIN"
      },
      "problem": {
        "question": "SQL problem-solving task 13: Explain how you would solve a realistic scenario involving window and partition. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "window",
          "partition",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "SQL practical/coding task 13: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates join and on. Explain important decisions.",
        "keywords": [
          "join",
          "on"
        ],
        "minLength": 70
      },
      "project": {
        "title": "SQL Portfolio Project 13",
        "brief": "Build an employee analytics SQL case study with normalized tables and at least ten business queries.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "sql",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "sql_14",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which function counts rows? Scenario set 14.",
        "options": [
          "COUNT",
          "SUM",
          "AVG",
          "ROUND"
        ],
        "answer": "COUNT"
      },
      "problem": {
        "question": "SQL problem-solving task 14: Explain how you would solve a realistic scenario involving index and query. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "index",
          "query",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "SQL practical/coding task 14: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates with and select. Explain important decisions.",
        "keywords": [
          "with",
          "select"
        ],
        "minLength": 70
      },
      "project": {
        "title": "SQL Portfolio Project 14",
        "brief": "Create a sales database and answer revenue, customer, product and monthly-trend questions.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "sql",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "sql_15",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which SQL feature is useful for reusable named query blocks? Scenario set 15.",
        "options": [
          "CTE",
          "INDEX",
          "TRIGGER",
          "VIEWPORT"
        ],
        "answer": "CTE"
      },
      "problem": {
        "question": "SQL problem-solving task 15: Explain how you would solve a realistic scenario involving null and coalesce. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "null",
          "coalesce",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "SQL practical/coding task 15: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates over and partition by. Explain important decisions.",
        "keywords": [
          "over",
          "partition by"
        ],
        "minLength": 100
      },
      "project": {
        "title": "SQL Portfolio Project 15",
        "brief": "Build a university analytics database with student, course, attendance and result tables.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "sql",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "sql_16",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which SQL clause filters rows before aggregation? Scenario set 16.",
        "options": [
          "WHERE",
          "HAVING",
          "ORDER BY",
          "GROUP BY"
        ],
        "answer": "WHERE"
      },
      "problem": {
        "question": "SQL problem-solving task 16: Explain how you would solve a realistic scenario involving join and key. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "join",
          "key",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "SQL practical/coding task 16: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates select and from. Explain important decisions.",
        "keywords": [
          "select",
          "from",
          "where"
        ],
        "minLength": 70
      },
      "project": {
        "title": "SQL Portfolio Project 16",
        "brief": "Build an employee analytics SQL case study with normalized tables and at least ten business queries.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "sql",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "sql_17",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which clause filters groups after aggregation? Scenario set 17.",
        "options": [
          "HAVING",
          "WHERE",
          "SELECT",
          "LIMIT"
        ],
        "answer": "HAVING"
      },
      "problem": {
        "question": "SQL problem-solving task 17: Explain how you would solve a realistic scenario involving group by and aggregate. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "group by",
          "aggregate",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "SQL practical/coding task 17: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates group by and count. Explain important decisions.",
        "keywords": [
          "group by",
          "count"
        ],
        "minLength": 70
      },
      "project": {
        "title": "SQL Portfolio Project 17",
        "brief": "Create a sales database and answer revenue, customer, product and monthly-trend questions.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "sql",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "sql_18",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which join returns matching rows from both tables? Scenario set 18.",
        "options": [
          "INNER JOIN",
          "LEFT JOIN",
          "CROSS JOIN",
          "FULL JOIN"
        ],
        "answer": "INNER JOIN"
      },
      "problem": {
        "question": "SQL problem-solving task 18: Explain how you would solve a realistic scenario involving window and partition. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "window",
          "partition",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "SQL practical/coding task 18: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates join and on. Explain important decisions.",
        "keywords": [
          "join",
          "on"
        ],
        "minLength": 100
      },
      "project": {
        "title": "SQL Portfolio Project 18",
        "brief": "Build a university analytics database with student, course, attendance and result tables.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "sql",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    }
  ],
  "Excel": [
    {
      "id": "excel_01",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which Excel function calculates an arithmetic mean?",
        "options": [
          "AVERAGE",
          "SUM",
          "COUNT",
          "MAX"
        ],
        "answer": "AVERAGE"
      },
      "problem": {
        "question": "Excel problem-solving task 1: Explain how you would solve a realistic scenario involving pivot and category. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "pivot",
          "category",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Excel practical/coding task 1: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates average and range. Explain important decisions.",
        "keywords": [
          "average",
          "range"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Excel Portfolio Project 1",
        "brief": "Create an interactive sales dashboard using formulas, PivotTables, slicers and charts.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "excel",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "excel_02",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which feature summarizes categories and measures interactively?",
        "options": [
          "PivotTable",
          "Page Break",
          "Text Box",
          "Spell Check"
        ],
        "answer": "PivotTable"
      },
      "problem": {
        "question": "Excel problem-solving task 2: Explain how you would solve a realistic scenario involving lookup and key. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "lookup",
          "key",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Excel practical/coding task 2: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates xlookup and range. Explain important decisions.",
        "keywords": [
          "xlookup",
          "range"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Excel Portfolio Project 2",
        "brief": "Build a student-performance workbook with cleaning, lookups, conditional logic and KPIs.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "excel",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "excel_03",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which modern function performs flexible lookup?",
        "options": [
          "XLOOKUP",
          "PRINT",
          "RANDBETWEEN",
          "SUBTOTAL"
        ],
        "answer": "XLOOKUP"
      },
      "problem": {
        "question": "Excel problem-solving task 3: Explain how you would solve a realistic scenario involving if and condition. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "if",
          "condition",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Excel practical/coding task 3: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates if and condition. Explain important decisions.",
        "keywords": [
          "if",
          "condition"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Excel Portfolio Project 3",
        "brief": "Create a financial tracking workbook with monthly summaries, variance analysis and charts.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "excel",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "excel_04",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which function applies conditional logic?",
        "options": [
          "IF",
          "ABS",
          "ROUND",
          "CONCAT"
        ],
        "answer": "IF"
      },
      "problem": {
        "question": "Excel problem-solving task 4: Explain how you would solve a realistic scenario involving clean and duplicate. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "clean",
          "duplicate",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Excel practical/coding task 4: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates pivot and field. Explain important decisions.",
        "keywords": [
          "pivot",
          "field"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Excel Portfolio Project 4",
        "brief": "Create an interactive sales dashboard using formulas, PivotTables, slicers and charts.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "excel",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "excel_05",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which tool helps import and transform data?",
        "options": [
          "Power Query",
          "Goal Seek only",
          "Page Layout",
          "Themes"
        ],
        "answer": "Power Query"
      },
      "problem": {
        "question": "Excel problem-solving task 5: Explain how you would solve a realistic scenario involving chart and kpi. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "chart",
          "kpi",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Excel practical/coding task 5: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates power query and transform. Explain important decisions.",
        "keywords": [
          "power query",
          "transform"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Excel Portfolio Project 5",
        "brief": "Build a student-performance workbook with cleaning, lookups, conditional logic and KPIs.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "excel",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "excel_06",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which Excel function calculates an arithmetic mean? Scenario set 6.",
        "options": [
          "AVERAGE",
          "SUM",
          "COUNT",
          "MAX"
        ],
        "answer": "AVERAGE"
      },
      "problem": {
        "question": "Excel problem-solving task 6: Explain how you would solve a realistic scenario involving pivot and category. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "pivot",
          "category",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Excel practical/coding task 6: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates average and range. Explain important decisions.",
        "keywords": [
          "average",
          "range"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Excel Portfolio Project 6",
        "brief": "Create a financial tracking workbook with monthly summaries, variance analysis and charts.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "excel",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "excel_07",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which feature summarizes categories and measures interactively? Scenario set 7.",
        "options": [
          "PivotTable",
          "Page Break",
          "Text Box",
          "Spell Check"
        ],
        "answer": "PivotTable"
      },
      "problem": {
        "question": "Excel problem-solving task 7: Explain how you would solve a realistic scenario involving lookup and key. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "lookup",
          "key",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Excel practical/coding task 7: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates xlookup and range. Explain important decisions.",
        "keywords": [
          "xlookup",
          "range"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Excel Portfolio Project 7",
        "brief": "Create an interactive sales dashboard using formulas, PivotTables, slicers and charts.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "excel",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "excel_08",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which modern function performs flexible lookup? Scenario set 8.",
        "options": [
          "XLOOKUP",
          "PRINT",
          "RANDBETWEEN",
          "SUBTOTAL"
        ],
        "answer": "XLOOKUP"
      },
      "problem": {
        "question": "Excel problem-solving task 8: Explain how you would solve a realistic scenario involving if and condition. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "if",
          "condition",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Excel practical/coding task 8: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates if and condition. Explain important decisions.",
        "keywords": [
          "if",
          "condition"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Excel Portfolio Project 8",
        "brief": "Build a student-performance workbook with cleaning, lookups, conditional logic and KPIs.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "excel",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "excel_09",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which function applies conditional logic? Scenario set 9.",
        "options": [
          "IF",
          "ABS",
          "ROUND",
          "CONCAT"
        ],
        "answer": "IF"
      },
      "problem": {
        "question": "Excel problem-solving task 9: Explain how you would solve a realistic scenario involving clean and duplicate. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "clean",
          "duplicate",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Excel practical/coding task 9: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates pivot and field. Explain important decisions.",
        "keywords": [
          "pivot",
          "field"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Excel Portfolio Project 9",
        "brief": "Create a financial tracking workbook with monthly summaries, variance analysis and charts.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "excel",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "excel_10",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which tool helps import and transform data? Scenario set 10.",
        "options": [
          "Power Query",
          "Goal Seek only",
          "Page Layout",
          "Themes"
        ],
        "answer": "Power Query"
      },
      "problem": {
        "question": "Excel problem-solving task 10: Explain how you would solve a realistic scenario involving chart and kpi. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "chart",
          "kpi",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Excel practical/coding task 10: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates power query and transform. Explain important decisions.",
        "keywords": [
          "power query",
          "transform"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Excel Portfolio Project 10",
        "brief": "Create an interactive sales dashboard using formulas, PivotTables, slicers and charts.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "excel",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "excel_11",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which Excel function calculates an arithmetic mean? Scenario set 11.",
        "options": [
          "AVERAGE",
          "SUM",
          "COUNT",
          "MAX"
        ],
        "answer": "AVERAGE"
      },
      "problem": {
        "question": "Excel problem-solving task 11: Explain how you would solve a realistic scenario involving pivot and category. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "pivot",
          "category",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Excel practical/coding task 11: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates average and range. Explain important decisions.",
        "keywords": [
          "average",
          "range"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Excel Portfolio Project 11",
        "brief": "Build a student-performance workbook with cleaning, lookups, conditional logic and KPIs.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "excel",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "excel_12",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which feature summarizes categories and measures interactively? Scenario set 12.",
        "options": [
          "PivotTable",
          "Page Break",
          "Text Box",
          "Spell Check"
        ],
        "answer": "PivotTable"
      },
      "problem": {
        "question": "Excel problem-solving task 12: Explain how you would solve a realistic scenario involving lookup and key. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "lookup",
          "key",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Excel practical/coding task 12: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates xlookup and range. Explain important decisions.",
        "keywords": [
          "xlookup",
          "range"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Excel Portfolio Project 12",
        "brief": "Create a financial tracking workbook with monthly summaries, variance analysis and charts.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "excel",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "excel_13",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which modern function performs flexible lookup? Scenario set 13.",
        "options": [
          "XLOOKUP",
          "PRINT",
          "RANDBETWEEN",
          "SUBTOTAL"
        ],
        "answer": "XLOOKUP"
      },
      "problem": {
        "question": "Excel problem-solving task 13: Explain how you would solve a realistic scenario involving if and condition. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "if",
          "condition",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Excel practical/coding task 13: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates if and condition. Explain important decisions.",
        "keywords": [
          "if",
          "condition"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Excel Portfolio Project 13",
        "brief": "Create an interactive sales dashboard using formulas, PivotTables, slicers and charts.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "excel",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "excel_14",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which function applies conditional logic? Scenario set 14.",
        "options": [
          "IF",
          "ABS",
          "ROUND",
          "CONCAT"
        ],
        "answer": "IF"
      },
      "problem": {
        "question": "Excel problem-solving task 14: Explain how you would solve a realistic scenario involving clean and duplicate. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "clean",
          "duplicate",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Excel practical/coding task 14: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates pivot and field. Explain important decisions.",
        "keywords": [
          "pivot",
          "field"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Excel Portfolio Project 14",
        "brief": "Build a student-performance workbook with cleaning, lookups, conditional logic and KPIs.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "excel",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "excel_15",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which tool helps import and transform data? Scenario set 15.",
        "options": [
          "Power Query",
          "Goal Seek only",
          "Page Layout",
          "Themes"
        ],
        "answer": "Power Query"
      },
      "problem": {
        "question": "Excel problem-solving task 15: Explain how you would solve a realistic scenario involving chart and kpi. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "chart",
          "kpi",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Excel practical/coding task 15: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates power query and transform. Explain important decisions.",
        "keywords": [
          "power query",
          "transform"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Excel Portfolio Project 15",
        "brief": "Create a financial tracking workbook with monthly summaries, variance analysis and charts.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "excel",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "excel_16",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which Excel function calculates an arithmetic mean? Scenario set 16.",
        "options": [
          "AVERAGE",
          "SUM",
          "COUNT",
          "MAX"
        ],
        "answer": "AVERAGE"
      },
      "problem": {
        "question": "Excel problem-solving task 16: Explain how you would solve a realistic scenario involving pivot and category. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "pivot",
          "category",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Excel practical/coding task 16: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates average and range. Explain important decisions.",
        "keywords": [
          "average",
          "range"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Excel Portfolio Project 16",
        "brief": "Create an interactive sales dashboard using formulas, PivotTables, slicers and charts.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "excel",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "excel_17",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which feature summarizes categories and measures interactively? Scenario set 17.",
        "options": [
          "PivotTable",
          "Page Break",
          "Text Box",
          "Spell Check"
        ],
        "answer": "PivotTable"
      },
      "problem": {
        "question": "Excel problem-solving task 17: Explain how you would solve a realistic scenario involving lookup and key. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "lookup",
          "key",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Excel practical/coding task 17: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates xlookup and range. Explain important decisions.",
        "keywords": [
          "xlookup",
          "range"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Excel Portfolio Project 17",
        "brief": "Build a student-performance workbook with cleaning, lookups, conditional logic and KPIs.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "excel",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "excel_18",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which modern function performs flexible lookup? Scenario set 18.",
        "options": [
          "XLOOKUP",
          "PRINT",
          "RANDBETWEEN",
          "SUBTOTAL"
        ],
        "answer": "XLOOKUP"
      },
      "problem": {
        "question": "Excel problem-solving task 18: Explain how you would solve a realistic scenario involving if and condition. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "if",
          "condition",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Excel practical/coding task 18: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates if and condition. Explain important decisions.",
        "keywords": [
          "if",
          "condition"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Excel Portfolio Project 18",
        "brief": "Create a financial tracking workbook with monthly summaries, variance analysis and charts.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "excel",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    }
  ],
  "Power BI": [
    {
      "id": "power_bi_01",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which language is commonly used for measures in Power BI?",
        "options": [
          "DAX",
          "HTML",
          "Java",
          "Bash"
        ],
        "answer": "DAX"
      },
      "problem": {
        "question": "Power BI problem-solving task 1: Explain how you would solve a realistic scenario involving dax and measure. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "dax",
          "measure",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Power BI practical/coding task 1: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates sum and sales. Explain important decisions.",
        "keywords": [
          "sum",
          "sales"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Power BI Portfolio Project 1",
        "brief": "Build an executive sales dashboard with a star schema, DAX measures, slicers and drill-through.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "power",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "power_bi_02",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which component is commonly used for data transformation?",
        "options": [
          "Power Query",
          "Paint",
          "WordArt",
          "OneNote"
        ],
        "answer": "Power Query"
      },
      "problem": {
        "question": "Power BI problem-solving task 2: Explain how you would solve a realistic scenario involving relationship and model. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "relationship",
          "model",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Power BI practical/coding task 2: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates calculate and filter. Explain important decisions.",
        "keywords": [
          "calculate",
          "filter"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Power BI Portfolio Project 2",
        "brief": "Create a recruitment analytics report with hiring funnel, time-to-hire and diversity KPIs.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "power",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "power_bi_03",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which relationship is typical in a star schema?",
        "options": [
          "One-to-many",
          "Many-to-many everywhere",
          "No relationships",
          "Circular only"
        ],
        "answer": "One-to-many"
      },
      "problem": {
        "question": "Power BI problem-solving task 3: Explain how you would solve a realistic scenario involving power query and transform. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "power query",
          "transform",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Power BI practical/coding task 3: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates power query and transform. Explain important decisions.",
        "keywords": [
          "power query",
          "transform"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Power BI Portfolio Project 3",
        "brief": "Build a university dashboard for attendance, results and course-level performance.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "power",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "power_bi_04",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which feature filters report visuals interactively?",
        "options": [
          "Slicer",
          "Footer",
          "Theme",
          "Tooltip only"
        ],
        "answer": "Slicer"
      },
      "problem": {
        "question": "Power BI problem-solving task 4: Explain how you would solve a realistic scenario involving filter and context. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "filter",
          "context",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Power BI practical/coding task 4: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates measure and dax. Explain important decisions.",
        "keywords": [
          "measure",
          "dax"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Power BI Portfolio Project 4",
        "brief": "Build an executive sales dashboard with a star schema, DAX measures, slicers and drill-through.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "power",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "power_bi_05",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which DAX function changes filter context?",
        "options": [
          "CALCULATE",
          "PRINT",
          "IMPORT",
          "RENDER"
        ],
        "answer": "CALCULATE"
      },
      "problem": {
        "question": "Power BI problem-solving task 5: Explain how you would solve a realistic scenario involving dashboard and kpi. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "dashboard",
          "kpi",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Power BI practical/coding task 5: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates date and calendar. Explain important decisions.",
        "keywords": [
          "date",
          "calendar"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Power BI Portfolio Project 5",
        "brief": "Create a recruitment analytics report with hiring funnel, time-to-hire and diversity KPIs.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "power",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "power_bi_06",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which language is commonly used for measures in Power BI? Scenario set 6.",
        "options": [
          "DAX",
          "HTML",
          "Java",
          "Bash"
        ],
        "answer": "DAX"
      },
      "problem": {
        "question": "Power BI problem-solving task 6: Explain how you would solve a realistic scenario involving dax and measure. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "dax",
          "measure",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Power BI practical/coding task 6: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates sum and sales. Explain important decisions.",
        "keywords": [
          "sum",
          "sales"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Power BI Portfolio Project 6",
        "brief": "Build a university dashboard for attendance, results and course-level performance.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "power",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "power_bi_07",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which component is commonly used for data transformation? Scenario set 7.",
        "options": [
          "Power Query",
          "Paint",
          "WordArt",
          "OneNote"
        ],
        "answer": "Power Query"
      },
      "problem": {
        "question": "Power BI problem-solving task 7: Explain how you would solve a realistic scenario involving relationship and model. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "relationship",
          "model",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Power BI practical/coding task 7: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates calculate and filter. Explain important decisions.",
        "keywords": [
          "calculate",
          "filter"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Power BI Portfolio Project 7",
        "brief": "Build an executive sales dashboard with a star schema, DAX measures, slicers and drill-through.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "power",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "power_bi_08",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which relationship is typical in a star schema? Scenario set 8.",
        "options": [
          "One-to-many",
          "Many-to-many everywhere",
          "No relationships",
          "Circular only"
        ],
        "answer": "One-to-many"
      },
      "problem": {
        "question": "Power BI problem-solving task 8: Explain how you would solve a realistic scenario involving power query and transform. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "power query",
          "transform",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Power BI practical/coding task 8: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates power query and transform. Explain important decisions.",
        "keywords": [
          "power query",
          "transform"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Power BI Portfolio Project 8",
        "brief": "Create a recruitment analytics report with hiring funnel, time-to-hire and diversity KPIs.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "power",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "power_bi_09",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which feature filters report visuals interactively? Scenario set 9.",
        "options": [
          "Slicer",
          "Footer",
          "Theme",
          "Tooltip only"
        ],
        "answer": "Slicer"
      },
      "problem": {
        "question": "Power BI problem-solving task 9: Explain how you would solve a realistic scenario involving filter and context. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "filter",
          "context",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Power BI practical/coding task 9: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates measure and dax. Explain important decisions.",
        "keywords": [
          "measure",
          "dax"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Power BI Portfolio Project 9",
        "brief": "Build a university dashboard for attendance, results and course-level performance.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "power",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "power_bi_10",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which DAX function changes filter context? Scenario set 10.",
        "options": [
          "CALCULATE",
          "PRINT",
          "IMPORT",
          "RENDER"
        ],
        "answer": "CALCULATE"
      },
      "problem": {
        "question": "Power BI problem-solving task 10: Explain how you would solve a realistic scenario involving dashboard and kpi. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "dashboard",
          "kpi",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Power BI practical/coding task 10: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates date and calendar. Explain important decisions.",
        "keywords": [
          "date",
          "calendar"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Power BI Portfolio Project 10",
        "brief": "Build an executive sales dashboard with a star schema, DAX measures, slicers and drill-through.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "power",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "power_bi_11",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which language is commonly used for measures in Power BI? Scenario set 11.",
        "options": [
          "DAX",
          "HTML",
          "Java",
          "Bash"
        ],
        "answer": "DAX"
      },
      "problem": {
        "question": "Power BI problem-solving task 11: Explain how you would solve a realistic scenario involving dax and measure. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "dax",
          "measure",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Power BI practical/coding task 11: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates sum and sales. Explain important decisions.",
        "keywords": [
          "sum",
          "sales"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Power BI Portfolio Project 11",
        "brief": "Create a recruitment analytics report with hiring funnel, time-to-hire and diversity KPIs.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "power",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "power_bi_12",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which component is commonly used for data transformation? Scenario set 12.",
        "options": [
          "Power Query",
          "Paint",
          "WordArt",
          "OneNote"
        ],
        "answer": "Power Query"
      },
      "problem": {
        "question": "Power BI problem-solving task 12: Explain how you would solve a realistic scenario involving relationship and model. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "relationship",
          "model",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Power BI practical/coding task 12: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates calculate and filter. Explain important decisions.",
        "keywords": [
          "calculate",
          "filter"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Power BI Portfolio Project 12",
        "brief": "Build a university dashboard for attendance, results and course-level performance.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "power",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "power_bi_13",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which relationship is typical in a star schema? Scenario set 13.",
        "options": [
          "One-to-many",
          "Many-to-many everywhere",
          "No relationships",
          "Circular only"
        ],
        "answer": "One-to-many"
      },
      "problem": {
        "question": "Power BI problem-solving task 13: Explain how you would solve a realistic scenario involving power query and transform. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "power query",
          "transform",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Power BI practical/coding task 13: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates power query and transform. Explain important decisions.",
        "keywords": [
          "power query",
          "transform"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Power BI Portfolio Project 13",
        "brief": "Build an executive sales dashboard with a star schema, DAX measures, slicers and drill-through.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "power",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "power_bi_14",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which feature filters report visuals interactively? Scenario set 14.",
        "options": [
          "Slicer",
          "Footer",
          "Theme",
          "Tooltip only"
        ],
        "answer": "Slicer"
      },
      "problem": {
        "question": "Power BI problem-solving task 14: Explain how you would solve a realistic scenario involving filter and context. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "filter",
          "context",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Power BI practical/coding task 14: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates measure and dax. Explain important decisions.",
        "keywords": [
          "measure",
          "dax"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Power BI Portfolio Project 14",
        "brief": "Create a recruitment analytics report with hiring funnel, time-to-hire and diversity KPIs.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "power",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "power_bi_15",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which DAX function changes filter context? Scenario set 15.",
        "options": [
          "CALCULATE",
          "PRINT",
          "IMPORT",
          "RENDER"
        ],
        "answer": "CALCULATE"
      },
      "problem": {
        "question": "Power BI problem-solving task 15: Explain how you would solve a realistic scenario involving dashboard and kpi. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "dashboard",
          "kpi",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Power BI practical/coding task 15: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates date and calendar. Explain important decisions.",
        "keywords": [
          "date",
          "calendar"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Power BI Portfolio Project 15",
        "brief": "Build a university dashboard for attendance, results and course-level performance.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "power",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "power_bi_16",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which language is commonly used for measures in Power BI? Scenario set 16.",
        "options": [
          "DAX",
          "HTML",
          "Java",
          "Bash"
        ],
        "answer": "DAX"
      },
      "problem": {
        "question": "Power BI problem-solving task 16: Explain how you would solve a realistic scenario involving dax and measure. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "dax",
          "measure",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Power BI practical/coding task 16: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates sum and sales. Explain important decisions.",
        "keywords": [
          "sum",
          "sales"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Power BI Portfolio Project 16",
        "brief": "Build an executive sales dashboard with a star schema, DAX measures, slicers and drill-through.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "power",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "power_bi_17",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which component is commonly used for data transformation? Scenario set 17.",
        "options": [
          "Power Query",
          "Paint",
          "WordArt",
          "OneNote"
        ],
        "answer": "Power Query"
      },
      "problem": {
        "question": "Power BI problem-solving task 17: Explain how you would solve a realistic scenario involving relationship and model. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "relationship",
          "model",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Power BI practical/coding task 17: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates calculate and filter. Explain important decisions.",
        "keywords": [
          "calculate",
          "filter"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Power BI Portfolio Project 17",
        "brief": "Create a recruitment analytics report with hiring funnel, time-to-hire and diversity KPIs.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "power",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "power_bi_18",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which relationship is typical in a star schema? Scenario set 18.",
        "options": [
          "One-to-many",
          "Many-to-many everywhere",
          "No relationships",
          "Circular only"
        ],
        "answer": "One-to-many"
      },
      "problem": {
        "question": "Power BI problem-solving task 18: Explain how you would solve a realistic scenario involving power query and transform. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "power query",
          "transform",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Power BI practical/coding task 18: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates power query and transform. Explain important decisions.",
        "keywords": [
          "power query",
          "transform"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Power BI Portfolio Project 18",
        "brief": "Build a university dashboard for attendance, results and course-level performance.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "power",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    }
  ],
  "Statistics": [
    {
      "id": "statistics_01",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which measure is the middle ordered value?",
        "options": [
          "Median",
          "Mean",
          "Variance",
          "Range"
        ],
        "answer": "Median"
      },
      "problem": {
        "question": "Statistics problem-solving task 1: Explain how you would solve a realistic scenario involving mean and standard deviation. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "mean",
          "standard deviation",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Statistics practical/coding task 1: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates mean and std. Explain important decisions.",
        "keywords": [
          "mean",
          "std"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Statistics Portfolio Project 1",
        "brief": "Analyze a public dataset using descriptive statistics, probability and one hypothesis test.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "statistics",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "statistics_02",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which measure describes spread around the mean?",
        "options": [
          "Standard deviation",
          "Median",
          "Mode",
          "Percentile only"
        ],
        "answer": "Standard deviation"
      },
      "problem": {
        "question": "Statistics problem-solving task 2: Explain how you would solve a realistic scenario involving probability and distribution. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "probability",
          "distribution",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Statistics practical/coding task 2: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates probability and binomial. Explain important decisions.",
        "keywords": [
          "probability",
          "binomial"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Statistics Portfolio Project 2",
        "brief": "Study student marks and compare two groups using confidence intervals and hypothesis testing.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "statistics",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "statistics_03",
      "difficulty": "Advanced",
      "quiz": {
        "question": "A z-score measures distance from the mean in units of what?",
        "options": [
          "Standard deviation",
          "Variance squared",
          "Sample count",
          "Range"
        ],
        "answer": "Standard deviation"
      },
      "problem": {
        "question": "Statistics problem-solving task 3: Explain how you would solve a realistic scenario involving sample and population. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "sample",
          "population",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Statistics practical/coding task 3: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates z and mean. Explain important decisions.",
        "keywords": [
          "z",
          "mean"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Statistics Portfolio Project 3",
        "brief": "Analyze customer waiting times and explain variability, distribution and business implications.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "statistics",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "statistics_04",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which distribution models a fixed number of Bernoulli trials?",
        "options": [
          "Binomial",
          "Poisson",
          "Normal",
          "Uniform"
        ],
        "answer": "Binomial"
      },
      "problem": {
        "question": "Statistics problem-solving task 4: Explain how you would solve a realistic scenario involving hypothesis and p-value. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "hypothesis",
          "p-value",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Statistics practical/coding task 4: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates confidence and sample. Explain important decisions.",
        "keywords": [
          "confidence",
          "sample"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Statistics Portfolio Project 4",
        "brief": "Analyze a public dataset using descriptive statistics, probability and one hypothesis test.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "statistics",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "statistics_05",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which method is used to estimate a plausible range for a population parameter?",
        "options": [
          "Confidence interval",
          "Sorting",
          "Hashing",
          "Rendering"
        ],
        "answer": "Confidence interval"
      },
      "problem": {
        "question": "Statistics problem-solving task 5: Explain how you would solve a realistic scenario involving confidence and interval. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "confidence",
          "interval",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Statistics practical/coding task 5: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates test and pvalue. Explain important decisions.",
        "keywords": [
          "test",
          "pvalue"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Statistics Portfolio Project 5",
        "brief": "Study student marks and compare two groups using confidence intervals and hypothesis testing.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "statistics",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "statistics_06",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which measure is the middle ordered value? Scenario set 6.",
        "options": [
          "Median",
          "Mean",
          "Variance",
          "Range"
        ],
        "answer": "Median"
      },
      "problem": {
        "question": "Statistics problem-solving task 6: Explain how you would solve a realistic scenario involving mean and standard deviation. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "mean",
          "standard deviation",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Statistics practical/coding task 6: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates mean and std. Explain important decisions.",
        "keywords": [
          "mean",
          "std"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Statistics Portfolio Project 6",
        "brief": "Analyze customer waiting times and explain variability, distribution and business implications.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "statistics",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "statistics_07",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which measure describes spread around the mean? Scenario set 7.",
        "options": [
          "Standard deviation",
          "Median",
          "Mode",
          "Percentile only"
        ],
        "answer": "Standard deviation"
      },
      "problem": {
        "question": "Statistics problem-solving task 7: Explain how you would solve a realistic scenario involving probability and distribution. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "probability",
          "distribution",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Statistics practical/coding task 7: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates probability and binomial. Explain important decisions.",
        "keywords": [
          "probability",
          "binomial"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Statistics Portfolio Project 7",
        "brief": "Analyze a public dataset using descriptive statistics, probability and one hypothesis test.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "statistics",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "statistics_08",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "A z-score measures distance from the mean in units of what? Scenario set 8.",
        "options": [
          "Standard deviation",
          "Variance squared",
          "Sample count",
          "Range"
        ],
        "answer": "Standard deviation"
      },
      "problem": {
        "question": "Statistics problem-solving task 8: Explain how you would solve a realistic scenario involving sample and population. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "sample",
          "population",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Statistics practical/coding task 8: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates z and mean. Explain important decisions.",
        "keywords": [
          "z",
          "mean"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Statistics Portfolio Project 8",
        "brief": "Study student marks and compare two groups using confidence intervals and hypothesis testing.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "statistics",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "statistics_09",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which distribution models a fixed number of Bernoulli trials? Scenario set 9.",
        "options": [
          "Binomial",
          "Poisson",
          "Normal",
          "Uniform"
        ],
        "answer": "Binomial"
      },
      "problem": {
        "question": "Statistics problem-solving task 9: Explain how you would solve a realistic scenario involving hypothesis and p-value. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "hypothesis",
          "p-value",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Statistics practical/coding task 9: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates confidence and sample. Explain important decisions.",
        "keywords": [
          "confidence",
          "sample"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Statistics Portfolio Project 9",
        "brief": "Analyze customer waiting times and explain variability, distribution and business implications.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "statistics",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "statistics_10",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which method is used to estimate a plausible range for a population parameter? Scenario set 10.",
        "options": [
          "Confidence interval",
          "Sorting",
          "Hashing",
          "Rendering"
        ],
        "answer": "Confidence interval"
      },
      "problem": {
        "question": "Statistics problem-solving task 10: Explain how you would solve a realistic scenario involving confidence and interval. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "confidence",
          "interval",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Statistics practical/coding task 10: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates test and pvalue. Explain important decisions.",
        "keywords": [
          "test",
          "pvalue"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Statistics Portfolio Project 10",
        "brief": "Analyze a public dataset using descriptive statistics, probability and one hypothesis test.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "statistics",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "statistics_11",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which measure is the middle ordered value? Scenario set 11.",
        "options": [
          "Median",
          "Mean",
          "Variance",
          "Range"
        ],
        "answer": "Median"
      },
      "problem": {
        "question": "Statistics problem-solving task 11: Explain how you would solve a realistic scenario involving mean and standard deviation. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "mean",
          "standard deviation",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Statistics practical/coding task 11: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates mean and std. Explain important decisions.",
        "keywords": [
          "mean",
          "std"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Statistics Portfolio Project 11",
        "brief": "Study student marks and compare two groups using confidence intervals and hypothesis testing.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "statistics",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "statistics_12",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which measure describes spread around the mean? Scenario set 12.",
        "options": [
          "Standard deviation",
          "Median",
          "Mode",
          "Percentile only"
        ],
        "answer": "Standard deviation"
      },
      "problem": {
        "question": "Statistics problem-solving task 12: Explain how you would solve a realistic scenario involving probability and distribution. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "probability",
          "distribution",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Statistics practical/coding task 12: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates probability and binomial. Explain important decisions.",
        "keywords": [
          "probability",
          "binomial"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Statistics Portfolio Project 12",
        "brief": "Analyze customer waiting times and explain variability, distribution and business implications.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "statistics",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "statistics_13",
      "difficulty": "Foundation",
      "quiz": {
        "question": "A z-score measures distance from the mean in units of what? Scenario set 13.",
        "options": [
          "Standard deviation",
          "Variance squared",
          "Sample count",
          "Range"
        ],
        "answer": "Standard deviation"
      },
      "problem": {
        "question": "Statistics problem-solving task 13: Explain how you would solve a realistic scenario involving sample and population. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "sample",
          "population",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Statistics practical/coding task 13: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates z and mean. Explain important decisions.",
        "keywords": [
          "z",
          "mean"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Statistics Portfolio Project 13",
        "brief": "Analyze a public dataset using descriptive statistics, probability and one hypothesis test.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "statistics",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "statistics_14",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which distribution models a fixed number of Bernoulli trials? Scenario set 14.",
        "options": [
          "Binomial",
          "Poisson",
          "Normal",
          "Uniform"
        ],
        "answer": "Binomial"
      },
      "problem": {
        "question": "Statistics problem-solving task 14: Explain how you would solve a realistic scenario involving hypothesis and p-value. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "hypothesis",
          "p-value",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Statistics practical/coding task 14: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates confidence and sample. Explain important decisions.",
        "keywords": [
          "confidence",
          "sample"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Statistics Portfolio Project 14",
        "brief": "Study student marks and compare two groups using confidence intervals and hypothesis testing.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "statistics",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "statistics_15",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which method is used to estimate a plausible range for a population parameter? Scenario set 15.",
        "options": [
          "Confidence interval",
          "Sorting",
          "Hashing",
          "Rendering"
        ],
        "answer": "Confidence interval"
      },
      "problem": {
        "question": "Statistics problem-solving task 15: Explain how you would solve a realistic scenario involving confidence and interval. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "confidence",
          "interval",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Statistics practical/coding task 15: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates test and pvalue. Explain important decisions.",
        "keywords": [
          "test",
          "pvalue"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Statistics Portfolio Project 15",
        "brief": "Analyze customer waiting times and explain variability, distribution and business implications.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "statistics",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "statistics_16",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which measure is the middle ordered value? Scenario set 16.",
        "options": [
          "Median",
          "Mean",
          "Variance",
          "Range"
        ],
        "answer": "Median"
      },
      "problem": {
        "question": "Statistics problem-solving task 16: Explain how you would solve a realistic scenario involving mean and standard deviation. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "mean",
          "standard deviation",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Statistics practical/coding task 16: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates mean and std. Explain important decisions.",
        "keywords": [
          "mean",
          "std"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Statistics Portfolio Project 16",
        "brief": "Analyze a public dataset using descriptive statistics, probability and one hypothesis test.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "statistics",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "statistics_17",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which measure describes spread around the mean? Scenario set 17.",
        "options": [
          "Standard deviation",
          "Median",
          "Mode",
          "Percentile only"
        ],
        "answer": "Standard deviation"
      },
      "problem": {
        "question": "Statistics problem-solving task 17: Explain how you would solve a realistic scenario involving probability and distribution. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "probability",
          "distribution",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Statistics practical/coding task 17: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates probability and binomial. Explain important decisions.",
        "keywords": [
          "probability",
          "binomial"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Statistics Portfolio Project 17",
        "brief": "Study student marks and compare two groups using confidence intervals and hypothesis testing.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "statistics",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "statistics_18",
      "difficulty": "Advanced",
      "quiz": {
        "question": "A z-score measures distance from the mean in units of what? Scenario set 18.",
        "options": [
          "Standard deviation",
          "Variance squared",
          "Sample count",
          "Range"
        ],
        "answer": "Standard deviation"
      },
      "problem": {
        "question": "Statistics problem-solving task 18: Explain how you would solve a realistic scenario involving sample and population. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "sample",
          "population",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Statistics practical/coding task 18: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates z and mean. Explain important decisions.",
        "keywords": [
          "z",
          "mean"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Statistics Portfolio Project 18",
        "brief": "Analyze customer waiting times and explain variability, distribution and business implications.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "statistics",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    }
  ],
  "Data Visualization": [
    {
      "id": "data_visualization_01",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which chart is usually suitable for comparing categories?",
        "options": [
          "Bar chart",
          "Random 3D surface",
          "Paragraph",
          "Audio waveform"
        ],
        "answer": "Bar chart"
      },
      "problem": {
        "question": "Data Visualization problem-solving task 1: Explain how you would solve a realistic scenario involving bar and category. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "bar",
          "category",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Data Visualization practical/coding task 1: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates plot and bar. Explain important decisions.",
        "keywords": [
          "plot",
          "bar"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Data Visualization Portfolio Project 1",
        "brief": "Create a five-chart data story from one public dataset and write an executive summary.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "data",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "data_visualization_02",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which chart is commonly used to show a time trend?",
        "options": [
          "Line chart",
          "Pie chart for every timestamp",
          "Word cloud",
          "Gauge only"
        ],
        "answer": "Line chart"
      },
      "problem": {
        "question": "Data Visualization problem-solving task 2: Explain how you would solve a realistic scenario involving line and time. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "line",
          "time",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Data Visualization practical/coding task 2: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates plot and line. Explain important decisions.",
        "keywords": [
          "plot",
          "line"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Data Visualization Portfolio Project 2",
        "brief": "Build a compact dashboard showing trend, category comparison, distribution and relationship views.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "data",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "data_visualization_03",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which chart is useful for two continuous variables?",
        "options": [
          "Scatter plot",
          "Donut only",
          "Text box",
          "Table border"
        ],
        "answer": "Scatter plot"
      },
      "problem": {
        "question": "Data Visualization problem-solving task 3: Explain how you would solve a realistic scenario involving scatter and relationship. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "scatter",
          "relationship",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Data Visualization practical/coding task 3: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates scatter and x. Explain important decisions.",
        "keywords": [
          "scatter",
          "x"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Data Visualization Portfolio Project 3",
        "brief": "Redesign a cluttered dashboard into a clear decision-focused visual story.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "data",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "data_visualization_04",
      "difficulty": "Foundation",
      "quiz": {
        "question": "What should visual design prioritize?",
        "options": [
          "Clear comparison",
          "Maximum decoration",
          "Maximum colors",
          "3D effects"
        ],
        "answer": "Clear comparison"
      },
      "problem": {
        "question": "Data Visualization problem-solving task 4: Explain how you would solve a realistic scenario involving label and scale. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "label",
          "scale",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Data Visualization practical/coding task 4: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates title and label. Explain important decisions.",
        "keywords": [
          "title",
          "label"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Data Visualization Portfolio Project 4",
        "brief": "Create a five-chart data story from one public dataset and write an executive summary.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "data",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "data_visualization_05",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which practice improves dashboard readability?",
        "options": [
          "Consistent scales and labels",
          "Removing labels",
          "Using every color",
          "Hiding units"
        ],
        "answer": "Consistent scales and labels"
      },
      "problem": {
        "question": "Data Visualization problem-solving task 5: Explain how you would solve a realistic scenario involving dashboard and kpi. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "dashboard",
          "kpi",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Data Visualization practical/coding task 5: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates matplotlib and figure. Explain important decisions.",
        "keywords": [
          "matplotlib",
          "figure"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Data Visualization Portfolio Project 5",
        "brief": "Build a compact dashboard showing trend, category comparison, distribution and relationship views.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "data",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "data_visualization_06",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which chart is usually suitable for comparing categories? Scenario set 6.",
        "options": [
          "Bar chart",
          "Random 3D surface",
          "Paragraph",
          "Audio waveform"
        ],
        "answer": "Bar chart"
      },
      "problem": {
        "question": "Data Visualization problem-solving task 6: Explain how you would solve a realistic scenario involving bar and category. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "bar",
          "category",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Data Visualization practical/coding task 6: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates plot and bar. Explain important decisions.",
        "keywords": [
          "plot",
          "bar"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Data Visualization Portfolio Project 6",
        "brief": "Redesign a cluttered dashboard into a clear decision-focused visual story.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "data",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "data_visualization_07",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which chart is commonly used to show a time trend? Scenario set 7.",
        "options": [
          "Line chart",
          "Pie chart for every timestamp",
          "Word cloud",
          "Gauge only"
        ],
        "answer": "Line chart"
      },
      "problem": {
        "question": "Data Visualization problem-solving task 7: Explain how you would solve a realistic scenario involving line and time. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "line",
          "time",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Data Visualization practical/coding task 7: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates plot and line. Explain important decisions.",
        "keywords": [
          "plot",
          "line"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Data Visualization Portfolio Project 7",
        "brief": "Create a five-chart data story from one public dataset and write an executive summary.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "data",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "data_visualization_08",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which chart is useful for two continuous variables? Scenario set 8.",
        "options": [
          "Scatter plot",
          "Donut only",
          "Text box",
          "Table border"
        ],
        "answer": "Scatter plot"
      },
      "problem": {
        "question": "Data Visualization problem-solving task 8: Explain how you would solve a realistic scenario involving scatter and relationship. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "scatter",
          "relationship",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Data Visualization practical/coding task 8: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates scatter and x. Explain important decisions.",
        "keywords": [
          "scatter",
          "x"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Data Visualization Portfolio Project 8",
        "brief": "Build a compact dashboard showing trend, category comparison, distribution and relationship views.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "data",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "data_visualization_09",
      "difficulty": "Advanced",
      "quiz": {
        "question": "What should visual design prioritize? Scenario set 9.",
        "options": [
          "Clear comparison",
          "Maximum decoration",
          "Maximum colors",
          "3D effects"
        ],
        "answer": "Clear comparison"
      },
      "problem": {
        "question": "Data Visualization problem-solving task 9: Explain how you would solve a realistic scenario involving label and scale. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "label",
          "scale",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Data Visualization practical/coding task 9: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates title and label. Explain important decisions.",
        "keywords": [
          "title",
          "label"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Data Visualization Portfolio Project 9",
        "brief": "Redesign a cluttered dashboard into a clear decision-focused visual story.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "data",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "data_visualization_10",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which practice improves dashboard readability? Scenario set 10.",
        "options": [
          "Consistent scales and labels",
          "Removing labels",
          "Using every color",
          "Hiding units"
        ],
        "answer": "Consistent scales and labels"
      },
      "problem": {
        "question": "Data Visualization problem-solving task 10: Explain how you would solve a realistic scenario involving dashboard and kpi. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "dashboard",
          "kpi",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Data Visualization practical/coding task 10: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates matplotlib and figure. Explain important decisions.",
        "keywords": [
          "matplotlib",
          "figure"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Data Visualization Portfolio Project 10",
        "brief": "Create a five-chart data story from one public dataset and write an executive summary.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "data",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "data_visualization_11",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which chart is usually suitable for comparing categories? Scenario set 11.",
        "options": [
          "Bar chart",
          "Random 3D surface",
          "Paragraph",
          "Audio waveform"
        ],
        "answer": "Bar chart"
      },
      "problem": {
        "question": "Data Visualization problem-solving task 11: Explain how you would solve a realistic scenario involving bar and category. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "bar",
          "category",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Data Visualization practical/coding task 11: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates plot and bar. Explain important decisions.",
        "keywords": [
          "plot",
          "bar"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Data Visualization Portfolio Project 11",
        "brief": "Build a compact dashboard showing trend, category comparison, distribution and relationship views.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "data",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "data_visualization_12",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which chart is commonly used to show a time trend? Scenario set 12.",
        "options": [
          "Line chart",
          "Pie chart for every timestamp",
          "Word cloud",
          "Gauge only"
        ],
        "answer": "Line chart"
      },
      "problem": {
        "question": "Data Visualization problem-solving task 12: Explain how you would solve a realistic scenario involving line and time. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "line",
          "time",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Data Visualization practical/coding task 12: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates plot and line. Explain important decisions.",
        "keywords": [
          "plot",
          "line"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Data Visualization Portfolio Project 12",
        "brief": "Redesign a cluttered dashboard into a clear decision-focused visual story.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "data",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "data_visualization_13",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which chart is useful for two continuous variables? Scenario set 13.",
        "options": [
          "Scatter plot",
          "Donut only",
          "Text box",
          "Table border"
        ],
        "answer": "Scatter plot"
      },
      "problem": {
        "question": "Data Visualization problem-solving task 13: Explain how you would solve a realistic scenario involving scatter and relationship. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "scatter",
          "relationship",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Data Visualization practical/coding task 13: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates scatter and x. Explain important decisions.",
        "keywords": [
          "scatter",
          "x"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Data Visualization Portfolio Project 13",
        "brief": "Create a five-chart data story from one public dataset and write an executive summary.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "data",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "data_visualization_14",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "What should visual design prioritize? Scenario set 14.",
        "options": [
          "Clear comparison",
          "Maximum decoration",
          "Maximum colors",
          "3D effects"
        ],
        "answer": "Clear comparison"
      },
      "problem": {
        "question": "Data Visualization problem-solving task 14: Explain how you would solve a realistic scenario involving label and scale. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "label",
          "scale",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Data Visualization practical/coding task 14: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates title and label. Explain important decisions.",
        "keywords": [
          "title",
          "label"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Data Visualization Portfolio Project 14",
        "brief": "Build a compact dashboard showing trend, category comparison, distribution and relationship views.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "data",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "data_visualization_15",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which practice improves dashboard readability? Scenario set 15.",
        "options": [
          "Consistent scales and labels",
          "Removing labels",
          "Using every color",
          "Hiding units"
        ],
        "answer": "Consistent scales and labels"
      },
      "problem": {
        "question": "Data Visualization problem-solving task 15: Explain how you would solve a realistic scenario involving dashboard and kpi. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "dashboard",
          "kpi",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Data Visualization practical/coding task 15: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates matplotlib and figure. Explain important decisions.",
        "keywords": [
          "matplotlib",
          "figure"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Data Visualization Portfolio Project 15",
        "brief": "Redesign a cluttered dashboard into a clear decision-focused visual story.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "data",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "data_visualization_16",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which chart is usually suitable for comparing categories? Scenario set 16.",
        "options": [
          "Bar chart",
          "Random 3D surface",
          "Paragraph",
          "Audio waveform"
        ],
        "answer": "Bar chart"
      },
      "problem": {
        "question": "Data Visualization problem-solving task 16: Explain how you would solve a realistic scenario involving bar and category. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "bar",
          "category",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Data Visualization practical/coding task 16: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates plot and bar. Explain important decisions.",
        "keywords": [
          "plot",
          "bar"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Data Visualization Portfolio Project 16",
        "brief": "Create a five-chart data story from one public dataset and write an executive summary.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "data",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "data_visualization_17",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which chart is commonly used to show a time trend? Scenario set 17.",
        "options": [
          "Line chart",
          "Pie chart for every timestamp",
          "Word cloud",
          "Gauge only"
        ],
        "answer": "Line chart"
      },
      "problem": {
        "question": "Data Visualization problem-solving task 17: Explain how you would solve a realistic scenario involving line and time. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "line",
          "time",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Data Visualization practical/coding task 17: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates plot and line. Explain important decisions.",
        "keywords": [
          "plot",
          "line"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Data Visualization Portfolio Project 17",
        "brief": "Build a compact dashboard showing trend, category comparison, distribution and relationship views.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "data",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "data_visualization_18",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which chart is useful for two continuous variables? Scenario set 18.",
        "options": [
          "Scatter plot",
          "Donut only",
          "Text box",
          "Table border"
        ],
        "answer": "Scatter plot"
      },
      "problem": {
        "question": "Data Visualization problem-solving task 18: Explain how you would solve a realistic scenario involving scatter and relationship. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "scatter",
          "relationship",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Data Visualization practical/coding task 18: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates scatter and x. Explain important decisions.",
        "keywords": [
          "scatter",
          "x"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Data Visualization Portfolio Project 18",
        "brief": "Redesign a cluttered dashboard into a clear decision-focused visual story.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "data",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    }
  ],
  "Python": [
    {
      "id": "python_01",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which built-in type stores key-value pairs?",
        "options": [
          "dict",
          "list",
          "tuple",
          "set"
        ],
        "answer": "dict"
      },
      "problem": {
        "question": "Python problem-solving task 1: Explain how you would solve a realistic scenario involving list and loop. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "list",
          "loop",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Python practical/coding task 1: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates for and range. Explain important decisions.",
        "keywords": [
          "for",
          "range"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Python Portfolio Project 1",
        "brief": "Build a Python data-cleaning and KPI analysis tool that reads CSV data and exports a summary.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "python",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "python_02",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which keyword defines a function?",
        "options": [
          "def",
          "func",
          "method",
          "define"
        ],
        "answer": "def"
      },
      "problem": {
        "question": "Python problem-solving task 2: Explain how you would solve a realistic scenario involving function and return. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "function",
          "return",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Python practical/coding task 2: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates def and return. Explain important decisions.",
        "keywords": [
          "def",
          "return"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Python Portfolio Project 2",
        "brief": "Create a command-line student result analyzer with functions, validation and exception handling.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "python",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "python_03",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which block handles an exception?",
        "options": [
          "except",
          "case",
          "switch",
          "rescue only"
        ],
        "answer": "except"
      },
      "problem": {
        "question": "Python problem-solving task 3: Explain how you would solve a realistic scenario involving exception and try. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "exception",
          "try",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Python practical/coding task 3: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates try and except. Explain important decisions.",
        "keywords": [
          "try",
          "except"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Python Portfolio Project 3",
        "brief": "Build a reusable Python module that loads, cleans, summarizes and visualizes a dataset.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "python",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "python_04",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which library is widely used for tabular data analysis?",
        "options": [
          "pandas",
          "pygame",
          "tkinter",
          "socket"
        ],
        "answer": "pandas"
      },
      "problem": {
        "question": "Python problem-solving task 4: Explain how you would solve a realistic scenario involving pandas and dataframe. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "pandas",
          "dataframe",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Python practical/coding task 4: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates pandas and read_csv. Explain important decisions.",
        "keywords": [
          "pandas",
          "read_csv"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Python Portfolio Project 4",
        "brief": "Build a Python data-cleaning and KPI analysis tool that reads CSV data and exports a summary.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "python",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "python_05",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which expression gets the length of a list x?",
        "options": [
          "len(x)",
          "size(x)",
          "length[x]",
          "countall(x)"
        ],
        "answer": "len(x)"
      },
      "problem": {
        "question": "Python problem-solving task 5: Explain how you would solve a realistic scenario involving dictionary and key. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "dictionary",
          "key",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Python practical/coding task 5: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates dict and items. Explain important decisions.",
        "keywords": [
          "dict",
          "items"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Python Portfolio Project 5",
        "brief": "Create a command-line student result analyzer with functions, validation and exception handling.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "python",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "python_06",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which built-in type stores key-value pairs? Scenario set 6.",
        "options": [
          "dict",
          "list",
          "tuple",
          "set"
        ],
        "answer": "dict"
      },
      "problem": {
        "question": "Python problem-solving task 6: Explain how you would solve a realistic scenario involving list and loop. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "list",
          "loop",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Python practical/coding task 6: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates for and range. Explain important decisions.",
        "keywords": [
          "for",
          "range"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Python Portfolio Project 6",
        "brief": "Build a reusable Python module that loads, cleans, summarizes and visualizes a dataset.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "python",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "python_07",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which keyword defines a function? Scenario set 7.",
        "options": [
          "def",
          "func",
          "method",
          "define"
        ],
        "answer": "def"
      },
      "problem": {
        "question": "Python problem-solving task 7: Explain how you would solve a realistic scenario involving function and return. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "function",
          "return",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Python practical/coding task 7: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates def and return. Explain important decisions.",
        "keywords": [
          "def",
          "return"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Python Portfolio Project 7",
        "brief": "Build a Python data-cleaning and KPI analysis tool that reads CSV data and exports a summary.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "python",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "python_08",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which block handles an exception? Scenario set 8.",
        "options": [
          "except",
          "case",
          "switch",
          "rescue only"
        ],
        "answer": "except"
      },
      "problem": {
        "question": "Python problem-solving task 8: Explain how you would solve a realistic scenario involving exception and try. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "exception",
          "try",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Python practical/coding task 8: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates try and except. Explain important decisions.",
        "keywords": [
          "try",
          "except"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Python Portfolio Project 8",
        "brief": "Create a command-line student result analyzer with functions, validation and exception handling.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "python",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "python_09",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which library is widely used for tabular data analysis? Scenario set 9.",
        "options": [
          "pandas",
          "pygame",
          "tkinter",
          "socket"
        ],
        "answer": "pandas"
      },
      "problem": {
        "question": "Python problem-solving task 9: Explain how you would solve a realistic scenario involving pandas and dataframe. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "pandas",
          "dataframe",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Python practical/coding task 9: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates pandas and read_csv. Explain important decisions.",
        "keywords": [
          "pandas",
          "read_csv"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Python Portfolio Project 9",
        "brief": "Build a reusable Python module that loads, cleans, summarizes and visualizes a dataset.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "python",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "python_10",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which expression gets the length of a list x? Scenario set 10.",
        "options": [
          "len(x)",
          "size(x)",
          "length[x]",
          "countall(x)"
        ],
        "answer": "len(x)"
      },
      "problem": {
        "question": "Python problem-solving task 10: Explain how you would solve a realistic scenario involving dictionary and key. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "dictionary",
          "key",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Python practical/coding task 10: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates dict and items. Explain important decisions.",
        "keywords": [
          "dict",
          "items"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Python Portfolio Project 10",
        "brief": "Build a Python data-cleaning and KPI analysis tool that reads CSV data and exports a summary.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "python",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "python_11",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which built-in type stores key-value pairs? Scenario set 11.",
        "options": [
          "dict",
          "list",
          "tuple",
          "set"
        ],
        "answer": "dict"
      },
      "problem": {
        "question": "Python problem-solving task 11: Explain how you would solve a realistic scenario involving list and loop. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "list",
          "loop",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Python practical/coding task 11: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates for and range. Explain important decisions.",
        "keywords": [
          "for",
          "range"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Python Portfolio Project 11",
        "brief": "Create a command-line student result analyzer with functions, validation and exception handling.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "python",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "python_12",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which keyword defines a function? Scenario set 12.",
        "options": [
          "def",
          "func",
          "method",
          "define"
        ],
        "answer": "def"
      },
      "problem": {
        "question": "Python problem-solving task 12: Explain how you would solve a realistic scenario involving function and return. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "function",
          "return",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Python practical/coding task 12: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates def and return. Explain important decisions.",
        "keywords": [
          "def",
          "return"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Python Portfolio Project 12",
        "brief": "Build a reusable Python module that loads, cleans, summarizes and visualizes a dataset.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "python",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "python_13",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which block handles an exception? Scenario set 13.",
        "options": [
          "except",
          "case",
          "switch",
          "rescue only"
        ],
        "answer": "except"
      },
      "problem": {
        "question": "Python problem-solving task 13: Explain how you would solve a realistic scenario involving exception and try. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "exception",
          "try",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Python practical/coding task 13: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates try and except. Explain important decisions.",
        "keywords": [
          "try",
          "except"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Python Portfolio Project 13",
        "brief": "Build a Python data-cleaning and KPI analysis tool that reads CSV data and exports a summary.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "python",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "python_14",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which library is widely used for tabular data analysis? Scenario set 14.",
        "options": [
          "pandas",
          "pygame",
          "tkinter",
          "socket"
        ],
        "answer": "pandas"
      },
      "problem": {
        "question": "Python problem-solving task 14: Explain how you would solve a realistic scenario involving pandas and dataframe. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "pandas",
          "dataframe",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Python practical/coding task 14: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates pandas and read_csv. Explain important decisions.",
        "keywords": [
          "pandas",
          "read_csv"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Python Portfolio Project 14",
        "brief": "Create a command-line student result analyzer with functions, validation and exception handling.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "python",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "python_15",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which expression gets the length of a list x? Scenario set 15.",
        "options": [
          "len(x)",
          "size(x)",
          "length[x]",
          "countall(x)"
        ],
        "answer": "len(x)"
      },
      "problem": {
        "question": "Python problem-solving task 15: Explain how you would solve a realistic scenario involving dictionary and key. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "dictionary",
          "key",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Python practical/coding task 15: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates dict and items. Explain important decisions.",
        "keywords": [
          "dict",
          "items"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Python Portfolio Project 15",
        "brief": "Build a reusable Python module that loads, cleans, summarizes and visualizes a dataset.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "python",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "python_16",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which built-in type stores key-value pairs? Scenario set 16.",
        "options": [
          "dict",
          "list",
          "tuple",
          "set"
        ],
        "answer": "dict"
      },
      "problem": {
        "question": "Python problem-solving task 16: Explain how you would solve a realistic scenario involving list and loop. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "list",
          "loop",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Python practical/coding task 16: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates for and range. Explain important decisions.",
        "keywords": [
          "for",
          "range"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Python Portfolio Project 16",
        "brief": "Build a Python data-cleaning and KPI analysis tool that reads CSV data and exports a summary.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "python",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "python_17",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which keyword defines a function? Scenario set 17.",
        "options": [
          "def",
          "func",
          "method",
          "define"
        ],
        "answer": "def"
      },
      "problem": {
        "question": "Python problem-solving task 17: Explain how you would solve a realistic scenario involving function and return. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "function",
          "return",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Python practical/coding task 17: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates def and return. Explain important decisions.",
        "keywords": [
          "def",
          "return"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Python Portfolio Project 17",
        "brief": "Create a command-line student result analyzer with functions, validation and exception handling.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "python",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "python_18",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which block handles an exception? Scenario set 18.",
        "options": [
          "except",
          "case",
          "switch",
          "rescue only"
        ],
        "answer": "except"
      },
      "problem": {
        "question": "Python problem-solving task 18: Explain how you would solve a realistic scenario involving exception and try. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "exception",
          "try",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Python practical/coding task 18: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates try and except. Explain important decisions.",
        "keywords": [
          "try",
          "except"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Python Portfolio Project 18",
        "brief": "Build a reusable Python module that loads, cleans, summarizes and visualizes a dataset.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "python",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    }
  ],
  "Communication": [
    {
      "id": "communication_01",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which approach improves technical communication for nontechnical audiences?",
        "options": [
          "Use clear language and relevant examples",
          "Maximize jargon",
          "Remove structure",
          "Avoid context"
        ],
        "answer": "Use clear language and relevant examples"
      },
      "problem": {
        "question": "Communication problem-solving task 1: Explain how you would solve a realistic scenario involving audience and message. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "audience",
          "message",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Communication practical/coding task 1: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates structure and intro. Explain important decisions.",
        "keywords": [
          "structure",
          "intro"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Communication Portfolio Project 1",
        "brief": "Prepare a three-minute explanation of a technical project for a nontechnical jury.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "communication",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "communication_02",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "What should an executive summary emphasize?",
        "options": [
          "Key findings and decisions",
          "Every implementation detail",
          "Raw logs only",
          "Unrelated history"
        ],
        "answer": "Key findings and decisions"
      },
      "problem": {
        "question": "Communication problem-solving task 2: Explain how you would solve a realistic scenario involving evidence and recommendation. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "evidence",
          "recommendation",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Communication practical/coding task 2: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates finding and evidence. Explain important decisions.",
        "keywords": [
          "finding",
          "evidence"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Communication Portfolio Project 2",
        "brief": "Create an executive one-page brief that turns analytics results into a decision recommendation.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "communication",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "communication_03",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which practice improves presentation clarity?",
        "options": [
          "One clear message per section",
          "Dense text everywhere",
          "Tiny fonts",
          "No headings"
        ],
        "answer": "One clear message per section"
      },
      "problem": {
        "question": "Communication problem-solving task 3: Explain how you would solve a realistic scenario involving summary and decision. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "summary",
          "decision",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Communication practical/coding task 3: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates recommendation and action. Explain important decisions.",
        "keywords": [
          "recommendation",
          "action"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Communication Portfolio Project 3",
        "brief": "Design a five-slide stakeholder presentation with problem, evidence, insight, recommendation and next step.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "communication",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "communication_04",
      "difficulty": "Foundation",
      "quiz": {
        "question": "What best supports a recommendation?",
        "options": [
          "Evidence and reasoning",
          "Confidence alone",
          "Randomness",
          "No context"
        ],
        "answer": "Evidence and reasoning"
      },
      "problem": {
        "question": "Communication problem-solving task 4: Explain how you would solve a realistic scenario involving stakeholder and explain. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "stakeholder",
          "explain",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Communication practical/coding task 4: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates audience and technical. Explain important decisions.",
        "keywords": [
          "audience",
          "technical"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Communication Portfolio Project 4",
        "brief": "Prepare a three-minute explanation of a technical project for a nontechnical jury.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "communication",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "communication_05",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Why adapt communication to the audience?",
        "options": [
          "Different audiences need different depth and framing",
          "All audiences are identical",
          "To hide results",
          "To remove evidence"
        ],
        "answer": "Different audiences need different depth and framing"
      },
      "problem": {
        "question": "Communication problem-solving task 5: Explain how you would solve a realistic scenario involving story and data. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "story",
          "data",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Communication practical/coding task 5: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates slide and message. Explain important decisions.",
        "keywords": [
          "slide",
          "message"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Communication Portfolio Project 5",
        "brief": "Create an executive one-page brief that turns analytics results into a decision recommendation.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "communication",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "communication_06",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which approach improves technical communication for nontechnical audiences? Scenario set 6.",
        "options": [
          "Use clear language and relevant examples",
          "Maximize jargon",
          "Remove structure",
          "Avoid context"
        ],
        "answer": "Use clear language and relevant examples"
      },
      "problem": {
        "question": "Communication problem-solving task 6: Explain how you would solve a realistic scenario involving audience and message. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "audience",
          "message",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Communication practical/coding task 6: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates structure and intro. Explain important decisions.",
        "keywords": [
          "structure",
          "intro"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Communication Portfolio Project 6",
        "brief": "Design a five-slide stakeholder presentation with problem, evidence, insight, recommendation and next step.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "communication",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "communication_07",
      "difficulty": "Foundation",
      "quiz": {
        "question": "What should an executive summary emphasize? Scenario set 7.",
        "options": [
          "Key findings and decisions",
          "Every implementation detail",
          "Raw logs only",
          "Unrelated history"
        ],
        "answer": "Key findings and decisions"
      },
      "problem": {
        "question": "Communication problem-solving task 7: Explain how you would solve a realistic scenario involving evidence and recommendation. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "evidence",
          "recommendation",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Communication practical/coding task 7: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates finding and evidence. Explain important decisions.",
        "keywords": [
          "finding",
          "evidence"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Communication Portfolio Project 7",
        "brief": "Prepare a three-minute explanation of a technical project for a nontechnical jury.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "communication",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "communication_08",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which practice improves presentation clarity? Scenario set 8.",
        "options": [
          "One clear message per section",
          "Dense text everywhere",
          "Tiny fonts",
          "No headings"
        ],
        "answer": "One clear message per section"
      },
      "problem": {
        "question": "Communication problem-solving task 8: Explain how you would solve a realistic scenario involving summary and decision. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "summary",
          "decision",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Communication practical/coding task 8: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates recommendation and action. Explain important decisions.",
        "keywords": [
          "recommendation",
          "action"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Communication Portfolio Project 8",
        "brief": "Create an executive one-page brief that turns analytics results into a decision recommendation.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "communication",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "communication_09",
      "difficulty": "Advanced",
      "quiz": {
        "question": "What best supports a recommendation? Scenario set 9.",
        "options": [
          "Evidence and reasoning",
          "Confidence alone",
          "Randomness",
          "No context"
        ],
        "answer": "Evidence and reasoning"
      },
      "problem": {
        "question": "Communication problem-solving task 9: Explain how you would solve a realistic scenario involving stakeholder and explain. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "stakeholder",
          "explain",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Communication practical/coding task 9: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates audience and technical. Explain important decisions.",
        "keywords": [
          "audience",
          "technical"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Communication Portfolio Project 9",
        "brief": "Design a five-slide stakeholder presentation with problem, evidence, insight, recommendation and next step.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "communication",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "communication_10",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Why adapt communication to the audience? Scenario set 10.",
        "options": [
          "Different audiences need different depth and framing",
          "All audiences are identical",
          "To hide results",
          "To remove evidence"
        ],
        "answer": "Different audiences need different depth and framing"
      },
      "problem": {
        "question": "Communication problem-solving task 10: Explain how you would solve a realistic scenario involving story and data. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "story",
          "data",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Communication practical/coding task 10: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates slide and message. Explain important decisions.",
        "keywords": [
          "slide",
          "message"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Communication Portfolio Project 10",
        "brief": "Prepare a three-minute explanation of a technical project for a nontechnical jury.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "communication",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "communication_11",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which approach improves technical communication for nontechnical audiences? Scenario set 11.",
        "options": [
          "Use clear language and relevant examples",
          "Maximize jargon",
          "Remove structure",
          "Avoid context"
        ],
        "answer": "Use clear language and relevant examples"
      },
      "problem": {
        "question": "Communication problem-solving task 11: Explain how you would solve a realistic scenario involving audience and message. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "audience",
          "message",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Communication practical/coding task 11: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates structure and intro. Explain important decisions.",
        "keywords": [
          "structure",
          "intro"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Communication Portfolio Project 11",
        "brief": "Create an executive one-page brief that turns analytics results into a decision recommendation.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "communication",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "communication_12",
      "difficulty": "Advanced",
      "quiz": {
        "question": "What should an executive summary emphasize? Scenario set 12.",
        "options": [
          "Key findings and decisions",
          "Every implementation detail",
          "Raw logs only",
          "Unrelated history"
        ],
        "answer": "Key findings and decisions"
      },
      "problem": {
        "question": "Communication problem-solving task 12: Explain how you would solve a realistic scenario involving evidence and recommendation. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "evidence",
          "recommendation",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Communication practical/coding task 12: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates finding and evidence. Explain important decisions.",
        "keywords": [
          "finding",
          "evidence"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Communication Portfolio Project 12",
        "brief": "Design a five-slide stakeholder presentation with problem, evidence, insight, recommendation and next step.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "communication",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "communication_13",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which practice improves presentation clarity? Scenario set 13.",
        "options": [
          "One clear message per section",
          "Dense text everywhere",
          "Tiny fonts",
          "No headings"
        ],
        "answer": "One clear message per section"
      },
      "problem": {
        "question": "Communication problem-solving task 13: Explain how you would solve a realistic scenario involving summary and decision. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "summary",
          "decision",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Communication practical/coding task 13: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates recommendation and action. Explain important decisions.",
        "keywords": [
          "recommendation",
          "action"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Communication Portfolio Project 13",
        "brief": "Prepare a three-minute explanation of a technical project for a nontechnical jury.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "communication",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "communication_14",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "What best supports a recommendation? Scenario set 14.",
        "options": [
          "Evidence and reasoning",
          "Confidence alone",
          "Randomness",
          "No context"
        ],
        "answer": "Evidence and reasoning"
      },
      "problem": {
        "question": "Communication problem-solving task 14: Explain how you would solve a realistic scenario involving stakeholder and explain. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "stakeholder",
          "explain",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Communication practical/coding task 14: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates audience and technical. Explain important decisions.",
        "keywords": [
          "audience",
          "technical"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Communication Portfolio Project 14",
        "brief": "Create an executive one-page brief that turns analytics results into a decision recommendation.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "communication",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "communication_15",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Why adapt communication to the audience? Scenario set 15.",
        "options": [
          "Different audiences need different depth and framing",
          "All audiences are identical",
          "To hide results",
          "To remove evidence"
        ],
        "answer": "Different audiences need different depth and framing"
      },
      "problem": {
        "question": "Communication problem-solving task 15: Explain how you would solve a realistic scenario involving story and data. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "story",
          "data",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Communication practical/coding task 15: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates slide and message. Explain important decisions.",
        "keywords": [
          "slide",
          "message"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Communication Portfolio Project 15",
        "brief": "Design a five-slide stakeholder presentation with problem, evidence, insight, recommendation and next step.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "communication",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "communication_16",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which approach improves technical communication for nontechnical audiences? Scenario set 16.",
        "options": [
          "Use clear language and relevant examples",
          "Maximize jargon",
          "Remove structure",
          "Avoid context"
        ],
        "answer": "Use clear language and relevant examples"
      },
      "problem": {
        "question": "Communication problem-solving task 16: Explain how you would solve a realistic scenario involving audience and message. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "audience",
          "message",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Communication practical/coding task 16: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates structure and intro. Explain important decisions.",
        "keywords": [
          "structure",
          "intro"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Communication Portfolio Project 16",
        "brief": "Prepare a three-minute explanation of a technical project for a nontechnical jury.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "communication",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "communication_17",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "What should an executive summary emphasize? Scenario set 17.",
        "options": [
          "Key findings and decisions",
          "Every implementation detail",
          "Raw logs only",
          "Unrelated history"
        ],
        "answer": "Key findings and decisions"
      },
      "problem": {
        "question": "Communication problem-solving task 17: Explain how you would solve a realistic scenario involving evidence and recommendation. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "evidence",
          "recommendation",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Communication practical/coding task 17: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates finding and evidence. Explain important decisions.",
        "keywords": [
          "finding",
          "evidence"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Communication Portfolio Project 17",
        "brief": "Create an executive one-page brief that turns analytics results into a decision recommendation.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "communication",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "communication_18",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which practice improves presentation clarity? Scenario set 18.",
        "options": [
          "One clear message per section",
          "Dense text everywhere",
          "Tiny fonts",
          "No headings"
        ],
        "answer": "One clear message per section"
      },
      "problem": {
        "question": "Communication problem-solving task 18: Explain how you would solve a realistic scenario involving summary and decision. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "summary",
          "decision",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Communication practical/coding task 18: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates recommendation and action. Explain important decisions.",
        "keywords": [
          "recommendation",
          "action"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Communication Portfolio Project 18",
        "brief": "Design a five-slide stakeholder presentation with problem, evidence, insight, recommendation and next step.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "communication",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    }
  ],
  "Business Analysis": [
    {
      "id": "business_analysis_01",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which activity identifies stakeholder needs?",
        "options": [
          "Requirements elicitation",
          "Image compression",
          "Code minification",
          "Disk formatting"
        ],
        "answer": "Requirements elicitation"
      },
      "problem": {
        "question": "Business Analysis problem-solving task 1: Explain how you would solve a realistic scenario involving requirement and stakeholder. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "requirement",
          "stakeholder",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Business Analysis practical/coding task 1: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates requirement and acceptance. Explain important decisions.",
        "keywords": [
          "requirement",
          "acceptance"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Business Analysis Portfolio Project 1",
        "brief": "Create a business requirements document and process map for an online appointment system.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "business",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "business_analysis_02",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "What is a KPI?",
        "options": [
          "Key performance indicator",
          "Kernel processing interface",
          "Key program installer",
          "Known process item"
        ],
        "answer": "Key performance indicator"
      },
      "problem": {
        "question": "Business Analysis problem-solving task 2: Explain how you would solve a realistic scenario involving current and future. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "current",
          "future",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Business Analysis practical/coding task 2: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates process and step. Explain important decisions.",
        "keywords": [
          "process",
          "step"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Business Analysis Portfolio Project 2",
        "brief": "Analyze a manual university process and propose a measurable future-state workflow.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "business",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "business_analysis_03",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which artifact visualizes a business process?",
        "options": [
          "Process map",
          "CSS file",
          "Audio track",
          "Binary dump"
        ],
        "answer": "Process map"
      },
      "problem": {
        "question": "Business Analysis problem-solving task 3: Explain how you would solve a realistic scenario involving kpi and measure. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "kpi",
          "measure",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Business Analysis practical/coding task 3: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates kpi and formula. Explain important decisions.",
        "keywords": [
          "kpi",
          "formula"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Business Analysis Portfolio Project 3",
        "brief": "Build a stakeholder map, KPI framework and acceptance criteria for a digital service.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "business",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "business_analysis_04",
      "difficulty": "Foundation",
      "quiz": {
        "question": "What does gap analysis compare?",
        "options": [
          "Current state and desired state",
          "Two font sizes",
          "File names",
          "Passwords"
        ],
        "answer": "Current state and desired state"
      },
      "problem": {
        "question": "Business Analysis problem-solving task 4: Explain how you would solve a realistic scenario involving process and map. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "process",
          "map",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Business Analysis practical/coding task 4: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates stakeholder and matrix. Explain important decisions.",
        "keywords": [
          "stakeholder",
          "matrix"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Business Analysis Portfolio Project 4",
        "brief": "Create a business requirements document and process map for an online appointment system.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "business",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "business_analysis_05",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Why prioritize stakeholders?",
        "options": [
          "Different stakeholders have different influence and needs",
          "All stakeholders are identical",
          "To avoid communication",
          "To remove requirements"
        ],
        "answer": "Different stakeholders have different influence and needs"
      },
      "problem": {
        "question": "Business Analysis problem-solving task 5: Explain how you would solve a realistic scenario involving scope and priority. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "scope",
          "priority",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Business Analysis practical/coding task 5: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates gap and action. Explain important decisions.",
        "keywords": [
          "gap",
          "action"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Business Analysis Portfolio Project 5",
        "brief": "Analyze a manual university process and propose a measurable future-state workflow.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "business",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "business_analysis_06",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which activity identifies stakeholder needs? Scenario set 6.",
        "options": [
          "Requirements elicitation",
          "Image compression",
          "Code minification",
          "Disk formatting"
        ],
        "answer": "Requirements elicitation"
      },
      "problem": {
        "question": "Business Analysis problem-solving task 6: Explain how you would solve a realistic scenario involving requirement and stakeholder. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "requirement",
          "stakeholder",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Business Analysis practical/coding task 6: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates requirement and acceptance. Explain important decisions.",
        "keywords": [
          "requirement",
          "acceptance"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Business Analysis Portfolio Project 6",
        "brief": "Build a stakeholder map, KPI framework and acceptance criteria for a digital service.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "business",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "business_analysis_07",
      "difficulty": "Foundation",
      "quiz": {
        "question": "What is a KPI? Scenario set 7.",
        "options": [
          "Key performance indicator",
          "Kernel processing interface",
          "Key program installer",
          "Known process item"
        ],
        "answer": "Key performance indicator"
      },
      "problem": {
        "question": "Business Analysis problem-solving task 7: Explain how you would solve a realistic scenario involving current and future. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "current",
          "future",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Business Analysis practical/coding task 7: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates process and step. Explain important decisions.",
        "keywords": [
          "process",
          "step"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Business Analysis Portfolio Project 7",
        "brief": "Create a business requirements document and process map for an online appointment system.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "business",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "business_analysis_08",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which artifact visualizes a business process? Scenario set 8.",
        "options": [
          "Process map",
          "CSS file",
          "Audio track",
          "Binary dump"
        ],
        "answer": "Process map"
      },
      "problem": {
        "question": "Business Analysis problem-solving task 8: Explain how you would solve a realistic scenario involving kpi and measure. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "kpi",
          "measure",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Business Analysis practical/coding task 8: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates kpi and formula. Explain important decisions.",
        "keywords": [
          "kpi",
          "formula"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Business Analysis Portfolio Project 8",
        "brief": "Analyze a manual university process and propose a measurable future-state workflow.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "business",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "business_analysis_09",
      "difficulty": "Advanced",
      "quiz": {
        "question": "What does gap analysis compare? Scenario set 9.",
        "options": [
          "Current state and desired state",
          "Two font sizes",
          "File names",
          "Passwords"
        ],
        "answer": "Current state and desired state"
      },
      "problem": {
        "question": "Business Analysis problem-solving task 9: Explain how you would solve a realistic scenario involving process and map. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "process",
          "map",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Business Analysis practical/coding task 9: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates stakeholder and matrix. Explain important decisions.",
        "keywords": [
          "stakeholder",
          "matrix"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Business Analysis Portfolio Project 9",
        "brief": "Build a stakeholder map, KPI framework and acceptance criteria for a digital service.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "business",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "business_analysis_10",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Why prioritize stakeholders? Scenario set 10.",
        "options": [
          "Different stakeholders have different influence and needs",
          "All stakeholders are identical",
          "To avoid communication",
          "To remove requirements"
        ],
        "answer": "Different stakeholders have different influence and needs"
      },
      "problem": {
        "question": "Business Analysis problem-solving task 10: Explain how you would solve a realistic scenario involving scope and priority. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "scope",
          "priority",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Business Analysis practical/coding task 10: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates gap and action. Explain important decisions.",
        "keywords": [
          "gap",
          "action"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Business Analysis Portfolio Project 10",
        "brief": "Create a business requirements document and process map for an online appointment system.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "business",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "business_analysis_11",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which activity identifies stakeholder needs? Scenario set 11.",
        "options": [
          "Requirements elicitation",
          "Image compression",
          "Code minification",
          "Disk formatting"
        ],
        "answer": "Requirements elicitation"
      },
      "problem": {
        "question": "Business Analysis problem-solving task 11: Explain how you would solve a realistic scenario involving requirement and stakeholder. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "requirement",
          "stakeholder",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Business Analysis practical/coding task 11: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates requirement and acceptance. Explain important decisions.",
        "keywords": [
          "requirement",
          "acceptance"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Business Analysis Portfolio Project 11",
        "brief": "Analyze a manual university process and propose a measurable future-state workflow.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "business",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "business_analysis_12",
      "difficulty": "Advanced",
      "quiz": {
        "question": "What is a KPI? Scenario set 12.",
        "options": [
          "Key performance indicator",
          "Kernel processing interface",
          "Key program installer",
          "Known process item"
        ],
        "answer": "Key performance indicator"
      },
      "problem": {
        "question": "Business Analysis problem-solving task 12: Explain how you would solve a realistic scenario involving current and future. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "current",
          "future",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Business Analysis practical/coding task 12: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates process and step. Explain important decisions.",
        "keywords": [
          "process",
          "step"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Business Analysis Portfolio Project 12",
        "brief": "Build a stakeholder map, KPI framework and acceptance criteria for a digital service.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "business",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "business_analysis_13",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which artifact visualizes a business process? Scenario set 13.",
        "options": [
          "Process map",
          "CSS file",
          "Audio track",
          "Binary dump"
        ],
        "answer": "Process map"
      },
      "problem": {
        "question": "Business Analysis problem-solving task 13: Explain how you would solve a realistic scenario involving kpi and measure. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "kpi",
          "measure",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Business Analysis practical/coding task 13: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates kpi and formula. Explain important decisions.",
        "keywords": [
          "kpi",
          "formula"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Business Analysis Portfolio Project 13",
        "brief": "Create a business requirements document and process map for an online appointment system.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "business",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "business_analysis_14",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "What does gap analysis compare? Scenario set 14.",
        "options": [
          "Current state and desired state",
          "Two font sizes",
          "File names",
          "Passwords"
        ],
        "answer": "Current state and desired state"
      },
      "problem": {
        "question": "Business Analysis problem-solving task 14: Explain how you would solve a realistic scenario involving process and map. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "process",
          "map",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Business Analysis practical/coding task 14: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates stakeholder and matrix. Explain important decisions.",
        "keywords": [
          "stakeholder",
          "matrix"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Business Analysis Portfolio Project 14",
        "brief": "Analyze a manual university process and propose a measurable future-state workflow.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "business",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "business_analysis_15",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Why prioritize stakeholders? Scenario set 15.",
        "options": [
          "Different stakeholders have different influence and needs",
          "All stakeholders are identical",
          "To avoid communication",
          "To remove requirements"
        ],
        "answer": "Different stakeholders have different influence and needs"
      },
      "problem": {
        "question": "Business Analysis problem-solving task 15: Explain how you would solve a realistic scenario involving scope and priority. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "scope",
          "priority",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Business Analysis practical/coding task 15: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates gap and action. Explain important decisions.",
        "keywords": [
          "gap",
          "action"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Business Analysis Portfolio Project 15",
        "brief": "Build a stakeholder map, KPI framework and acceptance criteria for a digital service.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "business",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "business_analysis_16",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which activity identifies stakeholder needs? Scenario set 16.",
        "options": [
          "Requirements elicitation",
          "Image compression",
          "Code minification",
          "Disk formatting"
        ],
        "answer": "Requirements elicitation"
      },
      "problem": {
        "question": "Business Analysis problem-solving task 16: Explain how you would solve a realistic scenario involving requirement and stakeholder. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "requirement",
          "stakeholder",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Business Analysis practical/coding task 16: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates requirement and acceptance. Explain important decisions.",
        "keywords": [
          "requirement",
          "acceptance"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Business Analysis Portfolio Project 16",
        "brief": "Create a business requirements document and process map for an online appointment system.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "business",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "business_analysis_17",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "What is a KPI? Scenario set 17.",
        "options": [
          "Key performance indicator",
          "Kernel processing interface",
          "Key program installer",
          "Known process item"
        ],
        "answer": "Key performance indicator"
      },
      "problem": {
        "question": "Business Analysis problem-solving task 17: Explain how you would solve a realistic scenario involving current and future. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "current",
          "future",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Business Analysis practical/coding task 17: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates process and step. Explain important decisions.",
        "keywords": [
          "process",
          "step"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Business Analysis Portfolio Project 17",
        "brief": "Analyze a manual university process and propose a measurable future-state workflow.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "business",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "business_analysis_18",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which artifact visualizes a business process? Scenario set 18.",
        "options": [
          "Process map",
          "CSS file",
          "Audio track",
          "Binary dump"
        ],
        "answer": "Process map"
      },
      "problem": {
        "question": "Business Analysis problem-solving task 18: Explain how you would solve a realistic scenario involving kpi and measure. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "kpi",
          "measure",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Business Analysis practical/coding task 18: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates kpi and formula. Explain important decisions.",
        "keywords": [
          "kpi",
          "formula"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Business Analysis Portfolio Project 18",
        "brief": "Build a stakeholder map, KPI framework and acceptance criteria for a digital service.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "business",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    }
  ],
  "Machine Learning": [
    {
      "id": "machine_learning_01",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which task predicts a categorical label?",
        "options": [
          "Classification",
          "Regression",
          "Sorting",
          "Compression"
        ],
        "answer": "Classification"
      },
      "problem": {
        "question": "Machine Learning problem-solving task 1: Explain how you would solve a realistic scenario involving train and test. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "train",
          "test",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Machine Learning practical/coding task 1: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates train_test_split and fit. Explain important decisions.",
        "keywords": [
          "train_test_split",
          "fit"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Machine Learning Portfolio Project 1",
        "brief": "Build and compare two supervised models, justify the evaluation metric and analyze errors.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "machine",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "machine_learning_02",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which split is used for final unbiased evaluation?",
        "options": [
          "Test set",
          "Training set",
          "Feature set",
          "Parameter set"
        ],
        "answer": "Test set"
      },
      "problem": {
        "question": "Machine Learning problem-solving task 2: Explain how you would solve a realistic scenario involving overfit and validation. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "overfit",
          "validation",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Machine Learning practical/coding task 2: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates predict and score. Explain important decisions.",
        "keywords": [
          "predict",
          "score"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Machine Learning Portfolio Project 2",
        "brief": "Create a classification pipeline with preprocessing, cross-validation and a final test evaluation.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "machine",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "machine_learning_03",
      "difficulty": "Advanced",
      "quiz": {
        "question": "What occurs when a model fits training noise too closely?",
        "options": [
          "Overfitting",
          "Underflow",
          "Serialization",
          "Normalization"
        ],
        "answer": "Overfitting"
      },
      "problem": {
        "question": "Machine Learning problem-solving task 3: Explain how you would solve a realistic scenario involving feature and target. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "feature",
          "target",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Machine Learning practical/coding task 3: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates pipeline and transform. Explain important decisions.",
        "keywords": [
          "pipeline",
          "transform"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Machine Learning Portfolio Project 3",
        "brief": "Build a regression model and explain feature choices, residuals and model limitations.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "machine",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "machine_learning_04",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which metric balances precision and recall?",
        "options": [
          "F1 score",
          "MSE",
          "R-squared",
          "Mean"
        ],
        "answer": "F1 score"
      },
      "problem": {
        "question": "Machine Learning problem-solving task 4: Explain how you would solve a realistic scenario involving precision and recall. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "precision",
          "recall",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Machine Learning practical/coding task 4: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates classification and metric. Explain important decisions.",
        "keywords": [
          "classification",
          "metric"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Machine Learning Portfolio Project 4",
        "brief": "Build and compare two supervised models, justify the evaluation metric and analyze errors.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "machine",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "machine_learning_05",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which process transforms raw variables into useful model inputs?",
        "options": [
          "Feature engineering",
          "Rendering",
          "Pagination",
          "Routing"
        ],
        "answer": "Feature engineering"
      },
      "problem": {
        "question": "Machine Learning problem-solving task 5: Explain how you would solve a realistic scenario involving cross validation and model. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "cross validation",
          "model",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Machine Learning practical/coding task 5: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates cross_val and model. Explain important decisions.",
        "keywords": [
          "cross_val",
          "model"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Machine Learning Portfolio Project 5",
        "brief": "Create a classification pipeline with preprocessing, cross-validation and a final test evaluation.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "machine",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "machine_learning_06",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which task predicts a categorical label? Scenario set 6.",
        "options": [
          "Classification",
          "Regression",
          "Sorting",
          "Compression"
        ],
        "answer": "Classification"
      },
      "problem": {
        "question": "Machine Learning problem-solving task 6: Explain how you would solve a realistic scenario involving train and test. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "train",
          "test",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Machine Learning practical/coding task 6: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates train_test_split and fit. Explain important decisions.",
        "keywords": [
          "train_test_split",
          "fit"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Machine Learning Portfolio Project 6",
        "brief": "Build a regression model and explain feature choices, residuals and model limitations.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "machine",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "machine_learning_07",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which split is used for final unbiased evaluation? Scenario set 7.",
        "options": [
          "Test set",
          "Training set",
          "Feature set",
          "Parameter set"
        ],
        "answer": "Test set"
      },
      "problem": {
        "question": "Machine Learning problem-solving task 7: Explain how you would solve a realistic scenario involving overfit and validation. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "overfit",
          "validation",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Machine Learning practical/coding task 7: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates predict and score. Explain important decisions.",
        "keywords": [
          "predict",
          "score"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Machine Learning Portfolio Project 7",
        "brief": "Build and compare two supervised models, justify the evaluation metric and analyze errors.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "machine",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "machine_learning_08",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "What occurs when a model fits training noise too closely? Scenario set 8.",
        "options": [
          "Overfitting",
          "Underflow",
          "Serialization",
          "Normalization"
        ],
        "answer": "Overfitting"
      },
      "problem": {
        "question": "Machine Learning problem-solving task 8: Explain how you would solve a realistic scenario involving feature and target. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "feature",
          "target",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Machine Learning practical/coding task 8: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates pipeline and transform. Explain important decisions.",
        "keywords": [
          "pipeline",
          "transform"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Machine Learning Portfolio Project 8",
        "brief": "Create a classification pipeline with preprocessing, cross-validation and a final test evaluation.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "machine",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "machine_learning_09",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which metric balances precision and recall? Scenario set 9.",
        "options": [
          "F1 score",
          "MSE",
          "R-squared",
          "Mean"
        ],
        "answer": "F1 score"
      },
      "problem": {
        "question": "Machine Learning problem-solving task 9: Explain how you would solve a realistic scenario involving precision and recall. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "precision",
          "recall",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Machine Learning practical/coding task 9: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates classification and metric. Explain important decisions.",
        "keywords": [
          "classification",
          "metric"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Machine Learning Portfolio Project 9",
        "brief": "Build a regression model and explain feature choices, residuals and model limitations.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "machine",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "machine_learning_10",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which process transforms raw variables into useful model inputs? Scenario set 10.",
        "options": [
          "Feature engineering",
          "Rendering",
          "Pagination",
          "Routing"
        ],
        "answer": "Feature engineering"
      },
      "problem": {
        "question": "Machine Learning problem-solving task 10: Explain how you would solve a realistic scenario involving cross validation and model. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "cross validation",
          "model",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Machine Learning practical/coding task 10: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates cross_val and model. Explain important decisions.",
        "keywords": [
          "cross_val",
          "model"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Machine Learning Portfolio Project 10",
        "brief": "Build and compare two supervised models, justify the evaluation metric and analyze errors.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "machine",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "machine_learning_11",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which task predicts a categorical label? Scenario set 11.",
        "options": [
          "Classification",
          "Regression",
          "Sorting",
          "Compression"
        ],
        "answer": "Classification"
      },
      "problem": {
        "question": "Machine Learning problem-solving task 11: Explain how you would solve a realistic scenario involving train and test. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "train",
          "test",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Machine Learning practical/coding task 11: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates train_test_split and fit. Explain important decisions.",
        "keywords": [
          "train_test_split",
          "fit"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Machine Learning Portfolio Project 11",
        "brief": "Create a classification pipeline with preprocessing, cross-validation and a final test evaluation.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "machine",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "machine_learning_12",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which split is used for final unbiased evaluation? Scenario set 12.",
        "options": [
          "Test set",
          "Training set",
          "Feature set",
          "Parameter set"
        ],
        "answer": "Test set"
      },
      "problem": {
        "question": "Machine Learning problem-solving task 12: Explain how you would solve a realistic scenario involving overfit and validation. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "overfit",
          "validation",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Machine Learning practical/coding task 12: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates predict and score. Explain important decisions.",
        "keywords": [
          "predict",
          "score"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Machine Learning Portfolio Project 12",
        "brief": "Build a regression model and explain feature choices, residuals and model limitations.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "machine",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "machine_learning_13",
      "difficulty": "Foundation",
      "quiz": {
        "question": "What occurs when a model fits training noise too closely? Scenario set 13.",
        "options": [
          "Overfitting",
          "Underflow",
          "Serialization",
          "Normalization"
        ],
        "answer": "Overfitting"
      },
      "problem": {
        "question": "Machine Learning problem-solving task 13: Explain how you would solve a realistic scenario involving feature and target. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "feature",
          "target",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Machine Learning practical/coding task 13: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates pipeline and transform. Explain important decisions.",
        "keywords": [
          "pipeline",
          "transform"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Machine Learning Portfolio Project 13",
        "brief": "Build and compare two supervised models, justify the evaluation metric and analyze errors.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "machine",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "machine_learning_14",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which metric balances precision and recall? Scenario set 14.",
        "options": [
          "F1 score",
          "MSE",
          "R-squared",
          "Mean"
        ],
        "answer": "F1 score"
      },
      "problem": {
        "question": "Machine Learning problem-solving task 14: Explain how you would solve a realistic scenario involving precision and recall. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "precision",
          "recall",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Machine Learning practical/coding task 14: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates classification and metric. Explain important decisions.",
        "keywords": [
          "classification",
          "metric"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Machine Learning Portfolio Project 14",
        "brief": "Create a classification pipeline with preprocessing, cross-validation and a final test evaluation.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "machine",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "machine_learning_15",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which process transforms raw variables into useful model inputs? Scenario set 15.",
        "options": [
          "Feature engineering",
          "Rendering",
          "Pagination",
          "Routing"
        ],
        "answer": "Feature engineering"
      },
      "problem": {
        "question": "Machine Learning problem-solving task 15: Explain how you would solve a realistic scenario involving cross validation and model. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "cross validation",
          "model",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Machine Learning practical/coding task 15: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates cross_val and model. Explain important decisions.",
        "keywords": [
          "cross_val",
          "model"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Machine Learning Portfolio Project 15",
        "brief": "Build a regression model and explain feature choices, residuals and model limitations.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "machine",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "machine_learning_16",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which task predicts a categorical label? Scenario set 16.",
        "options": [
          "Classification",
          "Regression",
          "Sorting",
          "Compression"
        ],
        "answer": "Classification"
      },
      "problem": {
        "question": "Machine Learning problem-solving task 16: Explain how you would solve a realistic scenario involving train and test. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "train",
          "test",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Machine Learning practical/coding task 16: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates train_test_split and fit. Explain important decisions.",
        "keywords": [
          "train_test_split",
          "fit"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Machine Learning Portfolio Project 16",
        "brief": "Build and compare two supervised models, justify the evaluation metric and analyze errors.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "machine",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "machine_learning_17",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which split is used for final unbiased evaluation? Scenario set 17.",
        "options": [
          "Test set",
          "Training set",
          "Feature set",
          "Parameter set"
        ],
        "answer": "Test set"
      },
      "problem": {
        "question": "Machine Learning problem-solving task 17: Explain how you would solve a realistic scenario involving overfit and validation. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "overfit",
          "validation",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Machine Learning practical/coding task 17: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates predict and score. Explain important decisions.",
        "keywords": [
          "predict",
          "score"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Machine Learning Portfolio Project 17",
        "brief": "Create a classification pipeline with preprocessing, cross-validation and a final test evaluation.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "machine",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "machine_learning_18",
      "difficulty": "Advanced",
      "quiz": {
        "question": "What occurs when a model fits training noise too closely? Scenario set 18.",
        "options": [
          "Overfitting",
          "Underflow",
          "Serialization",
          "Normalization"
        ],
        "answer": "Overfitting"
      },
      "problem": {
        "question": "Machine Learning problem-solving task 18: Explain how you would solve a realistic scenario involving feature and target. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "feature",
          "target",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Machine Learning practical/coding task 18: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates pipeline and transform. Explain important decisions.",
        "keywords": [
          "pipeline",
          "transform"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Machine Learning Portfolio Project 18",
        "brief": "Build a regression model and explain feature choices, residuals and model limitations.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "machine",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    }
  ],
  "Deep Learning": [
    {
      "id": "deep_learning_01",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which algorithm computes gradients through a neural network?",
        "options": [
          "Backpropagation",
          "Sorting",
          "Hashing",
          "Tokenization only"
        ],
        "answer": "Backpropagation"
      },
      "problem": {
        "question": "Deep Learning problem-solving task 1: Explain how you would solve a realistic scenario involving gradient and backprop. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "gradient",
          "backprop",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Deep Learning practical/coding task 1: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates model and layer. Explain important decisions.",
        "keywords": [
          "model",
          "layer"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Deep Learning Portfolio Project 1",
        "brief": "Train a neural network and compare training and validation behavior with regularization.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "deep",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "deep_learning_02",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which activation is commonly used in hidden layers?",
        "options": [
          "ReLU",
          "CSV",
          "SQL",
          "HTTP"
        ],
        "answer": "ReLU"
      },
      "problem": {
        "question": "Deep Learning problem-solving task 2: Explain how you would solve a realistic scenario involving activation and relu. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "activation",
          "relu",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Deep Learning practical/coding task 2: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates relu and dense. Explain important decisions.",
        "keywords": [
          "relu",
          "dense"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Deep Learning Portfolio Project 2",
        "brief": "Build a small image classifier and document data preparation, architecture and evaluation.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "deep",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "deep_learning_03",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which architecture is strongly associated with image feature extraction?",
        "options": [
          "CNN",
          "B-tree",
          "REST",
          "PivotTable"
        ],
        "answer": "CNN"
      },
      "problem": {
        "question": "Deep Learning problem-solving task 3: Explain how you would solve a realistic scenario involving cnn and image. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "cnn",
          "image",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Deep Learning practical/coding task 3: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates conv and pool. Explain important decisions.",
        "keywords": [
          "conv",
          "pool"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Deep Learning Portfolio Project 3",
        "brief": "Create a neural-network experiment comparing two optimizers or regularization strategies.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "deep",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "deep_learning_04",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which optimizer is widely used for neural-network training?",
        "options": [
          "Adam",
          "JOIN",
          "DAX",
          "XLOOKUP"
        ],
        "answer": "Adam"
      },
      "problem": {
        "question": "Deep Learning problem-solving task 4: Explain how you would solve a realistic scenario involving optimizer and loss. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "optimizer",
          "loss",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Deep Learning practical/coding task 4: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates optimizer and loss. Explain important decisions.",
        "keywords": [
          "optimizer",
          "loss"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Deep Learning Portfolio Project 4",
        "brief": "Train a neural network and compare training and validation behavior with regularization.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "deep",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "deep_learning_05",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which regularization technique randomly disables units during training?",
        "options": [
          "Dropout",
          "Indexing",
          "Sharding",
          "Paging"
        ],
        "answer": "Dropout"
      },
      "problem": {
        "question": "Deep Learning problem-solving task 5: Explain how you would solve a realistic scenario involving dropout and overfit. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "dropout",
          "overfit",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Deep Learning practical/coding task 5: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates fit and epoch. Explain important decisions.",
        "keywords": [
          "fit",
          "epoch"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Deep Learning Portfolio Project 5",
        "brief": "Build a small image classifier and document data preparation, architecture and evaluation.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "deep",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "deep_learning_06",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which algorithm computes gradients through a neural network? Scenario set 6.",
        "options": [
          "Backpropagation",
          "Sorting",
          "Hashing",
          "Tokenization only"
        ],
        "answer": "Backpropagation"
      },
      "problem": {
        "question": "Deep Learning problem-solving task 6: Explain how you would solve a realistic scenario involving gradient and backprop. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "gradient",
          "backprop",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Deep Learning practical/coding task 6: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates model and layer. Explain important decisions.",
        "keywords": [
          "model",
          "layer"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Deep Learning Portfolio Project 6",
        "brief": "Create a neural-network experiment comparing two optimizers or regularization strategies.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "deep",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "deep_learning_07",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which activation is commonly used in hidden layers? Scenario set 7.",
        "options": [
          "ReLU",
          "CSV",
          "SQL",
          "HTTP"
        ],
        "answer": "ReLU"
      },
      "problem": {
        "question": "Deep Learning problem-solving task 7: Explain how you would solve a realistic scenario involving activation and relu. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "activation",
          "relu",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Deep Learning practical/coding task 7: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates relu and dense. Explain important decisions.",
        "keywords": [
          "relu",
          "dense"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Deep Learning Portfolio Project 7",
        "brief": "Train a neural network and compare training and validation behavior with regularization.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "deep",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "deep_learning_08",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which architecture is strongly associated with image feature extraction? Scenario set 8.",
        "options": [
          "CNN",
          "B-tree",
          "REST",
          "PivotTable"
        ],
        "answer": "CNN"
      },
      "problem": {
        "question": "Deep Learning problem-solving task 8: Explain how you would solve a realistic scenario involving cnn and image. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "cnn",
          "image",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Deep Learning practical/coding task 8: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates conv and pool. Explain important decisions.",
        "keywords": [
          "conv",
          "pool"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Deep Learning Portfolio Project 8",
        "brief": "Build a small image classifier and document data preparation, architecture and evaluation.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "deep",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "deep_learning_09",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which optimizer is widely used for neural-network training? Scenario set 9.",
        "options": [
          "Adam",
          "JOIN",
          "DAX",
          "XLOOKUP"
        ],
        "answer": "Adam"
      },
      "problem": {
        "question": "Deep Learning problem-solving task 9: Explain how you would solve a realistic scenario involving optimizer and loss. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "optimizer",
          "loss",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Deep Learning practical/coding task 9: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates optimizer and loss. Explain important decisions.",
        "keywords": [
          "optimizer",
          "loss"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Deep Learning Portfolio Project 9",
        "brief": "Create a neural-network experiment comparing two optimizers or regularization strategies.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "deep",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "deep_learning_10",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which regularization technique randomly disables units during training? Scenario set 10.",
        "options": [
          "Dropout",
          "Indexing",
          "Sharding",
          "Paging"
        ],
        "answer": "Dropout"
      },
      "problem": {
        "question": "Deep Learning problem-solving task 10: Explain how you would solve a realistic scenario involving dropout and overfit. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "dropout",
          "overfit",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Deep Learning practical/coding task 10: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates fit and epoch. Explain important decisions.",
        "keywords": [
          "fit",
          "epoch"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Deep Learning Portfolio Project 10",
        "brief": "Train a neural network and compare training and validation behavior with regularization.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "deep",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "deep_learning_11",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which algorithm computes gradients through a neural network? Scenario set 11.",
        "options": [
          "Backpropagation",
          "Sorting",
          "Hashing",
          "Tokenization only"
        ],
        "answer": "Backpropagation"
      },
      "problem": {
        "question": "Deep Learning problem-solving task 11: Explain how you would solve a realistic scenario involving gradient and backprop. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "gradient",
          "backprop",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Deep Learning practical/coding task 11: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates model and layer. Explain important decisions.",
        "keywords": [
          "model",
          "layer"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Deep Learning Portfolio Project 11",
        "brief": "Build a small image classifier and document data preparation, architecture and evaluation.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "deep",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "deep_learning_12",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which activation is commonly used in hidden layers? Scenario set 12.",
        "options": [
          "ReLU",
          "CSV",
          "SQL",
          "HTTP"
        ],
        "answer": "ReLU"
      },
      "problem": {
        "question": "Deep Learning problem-solving task 12: Explain how you would solve a realistic scenario involving activation and relu. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "activation",
          "relu",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Deep Learning practical/coding task 12: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates relu and dense. Explain important decisions.",
        "keywords": [
          "relu",
          "dense"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Deep Learning Portfolio Project 12",
        "brief": "Create a neural-network experiment comparing two optimizers or regularization strategies.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "deep",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "deep_learning_13",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which architecture is strongly associated with image feature extraction? Scenario set 13.",
        "options": [
          "CNN",
          "B-tree",
          "REST",
          "PivotTable"
        ],
        "answer": "CNN"
      },
      "problem": {
        "question": "Deep Learning problem-solving task 13: Explain how you would solve a realistic scenario involving cnn and image. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "cnn",
          "image",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Deep Learning practical/coding task 13: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates conv and pool. Explain important decisions.",
        "keywords": [
          "conv",
          "pool"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Deep Learning Portfolio Project 13",
        "brief": "Train a neural network and compare training and validation behavior with regularization.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "deep",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "deep_learning_14",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which optimizer is widely used for neural-network training? Scenario set 14.",
        "options": [
          "Adam",
          "JOIN",
          "DAX",
          "XLOOKUP"
        ],
        "answer": "Adam"
      },
      "problem": {
        "question": "Deep Learning problem-solving task 14: Explain how you would solve a realistic scenario involving optimizer and loss. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "optimizer",
          "loss",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Deep Learning practical/coding task 14: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates optimizer and loss. Explain important decisions.",
        "keywords": [
          "optimizer",
          "loss"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Deep Learning Portfolio Project 14",
        "brief": "Build a small image classifier and document data preparation, architecture and evaluation.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "deep",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "deep_learning_15",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which regularization technique randomly disables units during training? Scenario set 15.",
        "options": [
          "Dropout",
          "Indexing",
          "Sharding",
          "Paging"
        ],
        "answer": "Dropout"
      },
      "problem": {
        "question": "Deep Learning problem-solving task 15: Explain how you would solve a realistic scenario involving dropout and overfit. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "dropout",
          "overfit",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Deep Learning practical/coding task 15: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates fit and epoch. Explain important decisions.",
        "keywords": [
          "fit",
          "epoch"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Deep Learning Portfolio Project 15",
        "brief": "Create a neural-network experiment comparing two optimizers or regularization strategies.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "deep",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "deep_learning_16",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which algorithm computes gradients through a neural network? Scenario set 16.",
        "options": [
          "Backpropagation",
          "Sorting",
          "Hashing",
          "Tokenization only"
        ],
        "answer": "Backpropagation"
      },
      "problem": {
        "question": "Deep Learning problem-solving task 16: Explain how you would solve a realistic scenario involving gradient and backprop. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "gradient",
          "backprop",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Deep Learning practical/coding task 16: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates model and layer. Explain important decisions.",
        "keywords": [
          "model",
          "layer"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Deep Learning Portfolio Project 16",
        "brief": "Train a neural network and compare training and validation behavior with regularization.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "deep",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "deep_learning_17",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which activation is commonly used in hidden layers? Scenario set 17.",
        "options": [
          "ReLU",
          "CSV",
          "SQL",
          "HTTP"
        ],
        "answer": "ReLU"
      },
      "problem": {
        "question": "Deep Learning problem-solving task 17: Explain how you would solve a realistic scenario involving activation and relu. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "activation",
          "relu",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Deep Learning practical/coding task 17: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates relu and dense. Explain important decisions.",
        "keywords": [
          "relu",
          "dense"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Deep Learning Portfolio Project 17",
        "brief": "Build a small image classifier and document data preparation, architecture and evaluation.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "deep",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "deep_learning_18",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which architecture is strongly associated with image feature extraction? Scenario set 18.",
        "options": [
          "CNN",
          "B-tree",
          "REST",
          "PivotTable"
        ],
        "answer": "CNN"
      },
      "problem": {
        "question": "Deep Learning problem-solving task 18: Explain how you would solve a realistic scenario involving cnn and image. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "cnn",
          "image",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Deep Learning practical/coding task 18: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates conv and pool. Explain important decisions.",
        "keywords": [
          "conv",
          "pool"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Deep Learning Portfolio Project 18",
        "brief": "Create a neural-network experiment comparing two optimizers or regularization strategies.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "deep",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    }
  ],
  "MLOps": [
    {
      "id": "mlops_01",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which tool is commonly used to containerize applications?",
        "options": [
          "Docker",
          "Excel",
          "Photoshop",
          "PowerPoint"
        ],
        "answer": "Docker"
      },
      "problem": {
        "question": "MLOps problem-solving task 1: Explain how you would solve a realistic scenario involving docker and container. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "docker",
          "container",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "MLOps practical/coding task 1: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates dockerfile and from. Explain important decisions.",
        "keywords": [
          "dockerfile",
          "from"
        ],
        "minLength": 70
      },
      "project": {
        "title": "MLOps Portfolio Project 1",
        "brief": "Containerize an ML inference API and automate tests with CI.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "mlops",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "mlops_02",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which practice automates build, test and deployment workflows?",
        "options": [
          "CI/CD",
          "Manual copying only",
          "Page setup",
          "Pivoting"
        ],
        "answer": "CI/CD"
      },
      "problem": {
        "question": "MLOps problem-solving task 2: Explain how you would solve a realistic scenario involving ci and deploy. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "ci",
          "deploy",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "MLOps practical/coding task 2: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates github and workflow. Explain important decisions.",
        "keywords": [
          "github",
          "workflow"
        ],
        "minLength": 70
      },
      "project": {
        "title": "MLOps Portfolio Project 2",
        "brief": "Track model experiments with MLflow and document reproducible model selection.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "mlops",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "mlops_03",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which activity detects model performance degradation after deployment?",
        "options": [
          "Monitoring",
          "Formatting",
          "Compression",
          "Sorting"
        ],
        "answer": "Monitoring"
      },
      "problem": {
        "question": "MLOps problem-solving task 3: Explain how you would solve a realistic scenario involving monitor and drift. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "monitor",
          "drift",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "MLOps practical/coding task 3: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates mlflow and log. Explain important decisions.",
        "keywords": [
          "mlflow",
          "log"
        ],
        "minLength": 100
      },
      "project": {
        "title": "MLOps Portfolio Project 3",
        "brief": "Design a model-monitoring plan covering latency, errors, drift and performance metrics.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "mlops",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "mlops_04",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which tool is commonly used for experiment tracking?",
        "options": [
          "MLflow",
          "Paint",
          "WordArt",
          "Notepad only"
        ],
        "answer": "MLflow"
      },
      "problem": {
        "question": "MLOps problem-solving task 4: Explain how you would solve a realistic scenario involving experiment and tracking. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "experiment",
          "tracking",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "MLOps practical/coding task 4: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates monitor and metric. Explain important decisions.",
        "keywords": [
          "monitor",
          "metric"
        ],
        "minLength": 70
      },
      "project": {
        "title": "MLOps Portfolio Project 4",
        "brief": "Containerize an ML inference API and automate tests with CI.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "mlops",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "mlops_05",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "What should be versioned in an ML system?",
        "options": [
          "Code, model/data references and configuration",
          "Only screenshots",
          "Only passwords",
          "Nothing"
        ],
        "answer": "Code, model/data references and configuration"
      },
      "problem": {
        "question": "MLOps problem-solving task 5: Explain how you would solve a realistic scenario involving version and model. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "version",
          "model",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "MLOps practical/coding task 5: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates deploy and model. Explain important decisions.",
        "keywords": [
          "deploy",
          "model"
        ],
        "minLength": 70
      },
      "project": {
        "title": "MLOps Portfolio Project 5",
        "brief": "Track model experiments with MLflow and document reproducible model selection.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "mlops",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "mlops_06",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which tool is commonly used to containerize applications? Scenario set 6.",
        "options": [
          "Docker",
          "Excel",
          "Photoshop",
          "PowerPoint"
        ],
        "answer": "Docker"
      },
      "problem": {
        "question": "MLOps problem-solving task 6: Explain how you would solve a realistic scenario involving docker and container. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "docker",
          "container",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "MLOps practical/coding task 6: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates dockerfile and from. Explain important decisions.",
        "keywords": [
          "dockerfile",
          "from"
        ],
        "minLength": 100
      },
      "project": {
        "title": "MLOps Portfolio Project 6",
        "brief": "Design a model-monitoring plan covering latency, errors, drift and performance metrics.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "mlops",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "mlops_07",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which practice automates build, test and deployment workflows? Scenario set 7.",
        "options": [
          "CI/CD",
          "Manual copying only",
          "Page setup",
          "Pivoting"
        ],
        "answer": "CI/CD"
      },
      "problem": {
        "question": "MLOps problem-solving task 7: Explain how you would solve a realistic scenario involving ci and deploy. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "ci",
          "deploy",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "MLOps practical/coding task 7: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates github and workflow. Explain important decisions.",
        "keywords": [
          "github",
          "workflow"
        ],
        "minLength": 70
      },
      "project": {
        "title": "MLOps Portfolio Project 7",
        "brief": "Containerize an ML inference API and automate tests with CI.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "mlops",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "mlops_08",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which activity detects model performance degradation after deployment? Scenario set 8.",
        "options": [
          "Monitoring",
          "Formatting",
          "Compression",
          "Sorting"
        ],
        "answer": "Monitoring"
      },
      "problem": {
        "question": "MLOps problem-solving task 8: Explain how you would solve a realistic scenario involving monitor and drift. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "monitor",
          "drift",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "MLOps practical/coding task 8: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates mlflow and log. Explain important decisions.",
        "keywords": [
          "mlflow",
          "log"
        ],
        "minLength": 70
      },
      "project": {
        "title": "MLOps Portfolio Project 8",
        "brief": "Track model experiments with MLflow and document reproducible model selection.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "mlops",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "mlops_09",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which tool is commonly used for experiment tracking? Scenario set 9.",
        "options": [
          "MLflow",
          "Paint",
          "WordArt",
          "Notepad only"
        ],
        "answer": "MLflow"
      },
      "problem": {
        "question": "MLOps problem-solving task 9: Explain how you would solve a realistic scenario involving experiment and tracking. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "experiment",
          "tracking",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "MLOps practical/coding task 9: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates monitor and metric. Explain important decisions.",
        "keywords": [
          "monitor",
          "metric"
        ],
        "minLength": 100
      },
      "project": {
        "title": "MLOps Portfolio Project 9",
        "brief": "Design a model-monitoring plan covering latency, errors, drift and performance metrics.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "mlops",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "mlops_10",
      "difficulty": "Foundation",
      "quiz": {
        "question": "What should be versioned in an ML system? Scenario set 10.",
        "options": [
          "Code, model/data references and configuration",
          "Only screenshots",
          "Only passwords",
          "Nothing"
        ],
        "answer": "Code, model/data references and configuration"
      },
      "problem": {
        "question": "MLOps problem-solving task 10: Explain how you would solve a realistic scenario involving version and model. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "version",
          "model",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "MLOps practical/coding task 10: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates deploy and model. Explain important decisions.",
        "keywords": [
          "deploy",
          "model"
        ],
        "minLength": 70
      },
      "project": {
        "title": "MLOps Portfolio Project 10",
        "brief": "Containerize an ML inference API and automate tests with CI.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "mlops",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "mlops_11",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which tool is commonly used to containerize applications? Scenario set 11.",
        "options": [
          "Docker",
          "Excel",
          "Photoshop",
          "PowerPoint"
        ],
        "answer": "Docker"
      },
      "problem": {
        "question": "MLOps problem-solving task 11: Explain how you would solve a realistic scenario involving docker and container. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "docker",
          "container",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "MLOps practical/coding task 11: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates dockerfile and from. Explain important decisions.",
        "keywords": [
          "dockerfile",
          "from"
        ],
        "minLength": 70
      },
      "project": {
        "title": "MLOps Portfolio Project 11",
        "brief": "Track model experiments with MLflow and document reproducible model selection.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "mlops",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "mlops_12",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which practice automates build, test and deployment workflows? Scenario set 12.",
        "options": [
          "CI/CD",
          "Manual copying only",
          "Page setup",
          "Pivoting"
        ],
        "answer": "CI/CD"
      },
      "problem": {
        "question": "MLOps problem-solving task 12: Explain how you would solve a realistic scenario involving ci and deploy. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "ci",
          "deploy",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "MLOps practical/coding task 12: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates github and workflow. Explain important decisions.",
        "keywords": [
          "github",
          "workflow"
        ],
        "minLength": 100
      },
      "project": {
        "title": "MLOps Portfolio Project 12",
        "brief": "Design a model-monitoring plan covering latency, errors, drift and performance metrics.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "mlops",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "mlops_13",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which activity detects model performance degradation after deployment? Scenario set 13.",
        "options": [
          "Monitoring",
          "Formatting",
          "Compression",
          "Sorting"
        ],
        "answer": "Monitoring"
      },
      "problem": {
        "question": "MLOps problem-solving task 13: Explain how you would solve a realistic scenario involving monitor and drift. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "monitor",
          "drift",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "MLOps practical/coding task 13: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates mlflow and log. Explain important decisions.",
        "keywords": [
          "mlflow",
          "log"
        ],
        "minLength": 70
      },
      "project": {
        "title": "MLOps Portfolio Project 13",
        "brief": "Containerize an ML inference API and automate tests with CI.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "mlops",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "mlops_14",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which tool is commonly used for experiment tracking? Scenario set 14.",
        "options": [
          "MLflow",
          "Paint",
          "WordArt",
          "Notepad only"
        ],
        "answer": "MLflow"
      },
      "problem": {
        "question": "MLOps problem-solving task 14: Explain how you would solve a realistic scenario involving experiment and tracking. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "experiment",
          "tracking",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "MLOps practical/coding task 14: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates monitor and metric. Explain important decisions.",
        "keywords": [
          "monitor",
          "metric"
        ],
        "minLength": 70
      },
      "project": {
        "title": "MLOps Portfolio Project 14",
        "brief": "Track model experiments with MLflow and document reproducible model selection.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "mlops",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "mlops_15",
      "difficulty": "Advanced",
      "quiz": {
        "question": "What should be versioned in an ML system? Scenario set 15.",
        "options": [
          "Code, model/data references and configuration",
          "Only screenshots",
          "Only passwords",
          "Nothing"
        ],
        "answer": "Code, model/data references and configuration"
      },
      "problem": {
        "question": "MLOps problem-solving task 15: Explain how you would solve a realistic scenario involving version and model. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "version",
          "model",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "MLOps practical/coding task 15: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates deploy and model. Explain important decisions.",
        "keywords": [
          "deploy",
          "model"
        ],
        "minLength": 100
      },
      "project": {
        "title": "MLOps Portfolio Project 15",
        "brief": "Design a model-monitoring plan covering latency, errors, drift and performance metrics.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "mlops",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "mlops_16",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which tool is commonly used to containerize applications? Scenario set 16.",
        "options": [
          "Docker",
          "Excel",
          "Photoshop",
          "PowerPoint"
        ],
        "answer": "Docker"
      },
      "problem": {
        "question": "MLOps problem-solving task 16: Explain how you would solve a realistic scenario involving docker and container. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "docker",
          "container",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "MLOps practical/coding task 16: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates dockerfile and from. Explain important decisions.",
        "keywords": [
          "dockerfile",
          "from"
        ],
        "minLength": 70
      },
      "project": {
        "title": "MLOps Portfolio Project 16",
        "brief": "Containerize an ML inference API and automate tests with CI.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "mlops",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "mlops_17",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which practice automates build, test and deployment workflows? Scenario set 17.",
        "options": [
          "CI/CD",
          "Manual copying only",
          "Page setup",
          "Pivoting"
        ],
        "answer": "CI/CD"
      },
      "problem": {
        "question": "MLOps problem-solving task 17: Explain how you would solve a realistic scenario involving ci and deploy. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "ci",
          "deploy",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "MLOps practical/coding task 17: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates github and workflow. Explain important decisions.",
        "keywords": [
          "github",
          "workflow"
        ],
        "minLength": 70
      },
      "project": {
        "title": "MLOps Portfolio Project 17",
        "brief": "Track model experiments with MLflow and document reproducible model selection.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "mlops",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "mlops_18",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which activity detects model performance degradation after deployment? Scenario set 18.",
        "options": [
          "Monitoring",
          "Formatting",
          "Compression",
          "Sorting"
        ],
        "answer": "Monitoring"
      },
      "problem": {
        "question": "MLOps problem-solving task 18: Explain how you would solve a realistic scenario involving monitor and drift. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "monitor",
          "drift",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "MLOps practical/coding task 18: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates mlflow and log. Explain important decisions.",
        "keywords": [
          "mlflow",
          "log"
        ],
        "minLength": 100
      },
      "project": {
        "title": "MLOps Portfolio Project 18",
        "brief": "Design a model-monitoring plan covering latency, errors, drift and performance metrics.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "mlops",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    }
  ],
  "APIs": [
    {
      "id": "apis_01",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which HTTP method commonly retrieves a resource?",
        "options": [
          "GET",
          "POST",
          "DELETE",
          "PATCH"
        ],
        "answer": "GET"
      },
      "problem": {
        "question": "APIs problem-solving task 1: Explain how you would solve a realistic scenario involving endpoint and method. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "endpoint",
          "method",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "APIs practical/coding task 1: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates get and url. Explain important decisions.",
        "keywords": [
          "get",
          "url"
        ],
        "minLength": 70
      },
      "project": {
        "title": "APIs Portfolio Project 1",
        "brief": "Build a FastAPI service with CRUD endpoints, validation, health checks and API documentation.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "apis",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "apis_02",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which status code usually means success?",
        "options": [
          "200",
          "404",
          "500",
          "401"
        ],
        "answer": "200"
      },
      "problem": {
        "question": "APIs problem-solving task 2: Explain how you would solve a realistic scenario involving status and response. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "status",
          "response",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "APIs practical/coding task 2: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates post and json. Explain important decisions.",
        "keywords": [
          "post",
          "json"
        ],
        "minLength": 70
      },
      "project": {
        "title": "APIs Portfolio Project 2",
        "brief": "Create a REST API for skill records with authentication-aware endpoint design.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "apis",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "apis_03",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which status code usually means a resource was not found?",
        "options": [
          "404",
          "200",
          "201",
          "302"
        ],
        "answer": "404"
      },
      "problem": {
        "question": "APIs problem-solving task 3: Explain how you would solve a realistic scenario involving auth and token. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "auth",
          "token",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "APIs practical/coding task 3: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates header and authorization. Explain important decisions.",
        "keywords": [
          "header",
          "authorization"
        ],
        "minLength": 100
      },
      "project": {
        "title": "APIs Portfolio Project 3",
        "brief": "Build an API client that consumes a public JSON endpoint and handles errors robustly.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "apis",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "apis_04",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which format is commonly exchanged by REST APIs?",
        "options": [
          "JSON",
          "PSD only",
          "MP3 only",
          "EXE only"
        ],
        "answer": "JSON"
      },
      "problem": {
        "question": "APIs problem-solving task 4: Explain how you would solve a realistic scenario involving json and request. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "json",
          "request",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "APIs practical/coding task 4: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates fastapi and route. Explain important decisions.",
        "keywords": [
          "fastapi",
          "route"
        ],
        "minLength": 70
      },
      "project": {
        "title": "APIs Portfolio Project 4",
        "brief": "Build a FastAPI service with CRUD endpoints, validation, health checks and API documentation.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "apis",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "apis_05",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "What does API authentication protect?",
        "options": [
          "Access to protected endpoints",
          "Screen resolution",
          "Keyboard layout",
          "File extension"
        ],
        "answer": "Access to protected endpoints"
      },
      "problem": {
        "question": "APIs problem-solving task 5: Explain how you would solve a realistic scenario involving rest and resource. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "rest",
          "resource",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "APIs practical/coding task 5: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates response and status. Explain important decisions.",
        "keywords": [
          "response",
          "status"
        ],
        "minLength": 70
      },
      "project": {
        "title": "APIs Portfolio Project 5",
        "brief": "Create a REST API for skill records with authentication-aware endpoint design.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "apis",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "apis_06",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which HTTP method commonly retrieves a resource? Scenario set 6.",
        "options": [
          "GET",
          "POST",
          "DELETE",
          "PATCH"
        ],
        "answer": "GET"
      },
      "problem": {
        "question": "APIs problem-solving task 6: Explain how you would solve a realistic scenario involving endpoint and method. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "endpoint",
          "method",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "APIs practical/coding task 6: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates get and url. Explain important decisions.",
        "keywords": [
          "get",
          "url"
        ],
        "minLength": 100
      },
      "project": {
        "title": "APIs Portfolio Project 6",
        "brief": "Build an API client that consumes a public JSON endpoint and handles errors robustly.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "apis",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "apis_07",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which status code usually means success? Scenario set 7.",
        "options": [
          "200",
          "404",
          "500",
          "401"
        ],
        "answer": "200"
      },
      "problem": {
        "question": "APIs problem-solving task 7: Explain how you would solve a realistic scenario involving status and response. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "status",
          "response",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "APIs practical/coding task 7: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates post and json. Explain important decisions.",
        "keywords": [
          "post",
          "json"
        ],
        "minLength": 70
      },
      "project": {
        "title": "APIs Portfolio Project 7",
        "brief": "Build a FastAPI service with CRUD endpoints, validation, health checks and API documentation.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "apis",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "apis_08",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which status code usually means a resource was not found? Scenario set 8.",
        "options": [
          "404",
          "200",
          "201",
          "302"
        ],
        "answer": "404"
      },
      "problem": {
        "question": "APIs problem-solving task 8: Explain how you would solve a realistic scenario involving auth and token. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "auth",
          "token",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "APIs practical/coding task 8: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates header and authorization. Explain important decisions.",
        "keywords": [
          "header",
          "authorization"
        ],
        "minLength": 70
      },
      "project": {
        "title": "APIs Portfolio Project 8",
        "brief": "Create a REST API for skill records with authentication-aware endpoint design.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "apis",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "apis_09",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which format is commonly exchanged by REST APIs? Scenario set 9.",
        "options": [
          "JSON",
          "PSD only",
          "MP3 only",
          "EXE only"
        ],
        "answer": "JSON"
      },
      "problem": {
        "question": "APIs problem-solving task 9: Explain how you would solve a realistic scenario involving json and request. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "json",
          "request",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "APIs practical/coding task 9: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates fastapi and route. Explain important decisions.",
        "keywords": [
          "fastapi",
          "route"
        ],
        "minLength": 100
      },
      "project": {
        "title": "APIs Portfolio Project 9",
        "brief": "Build an API client that consumes a public JSON endpoint and handles errors robustly.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "apis",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "apis_10",
      "difficulty": "Foundation",
      "quiz": {
        "question": "What does API authentication protect? Scenario set 10.",
        "options": [
          "Access to protected endpoints",
          "Screen resolution",
          "Keyboard layout",
          "File extension"
        ],
        "answer": "Access to protected endpoints"
      },
      "problem": {
        "question": "APIs problem-solving task 10: Explain how you would solve a realistic scenario involving rest and resource. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "rest",
          "resource",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "APIs practical/coding task 10: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates response and status. Explain important decisions.",
        "keywords": [
          "response",
          "status"
        ],
        "minLength": 70
      },
      "project": {
        "title": "APIs Portfolio Project 10",
        "brief": "Build a FastAPI service with CRUD endpoints, validation, health checks and API documentation.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "apis",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "apis_11",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which HTTP method commonly retrieves a resource? Scenario set 11.",
        "options": [
          "GET",
          "POST",
          "DELETE",
          "PATCH"
        ],
        "answer": "GET"
      },
      "problem": {
        "question": "APIs problem-solving task 11: Explain how you would solve a realistic scenario involving endpoint and method. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "endpoint",
          "method",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "APIs practical/coding task 11: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates get and url. Explain important decisions.",
        "keywords": [
          "get",
          "url"
        ],
        "minLength": 70
      },
      "project": {
        "title": "APIs Portfolio Project 11",
        "brief": "Create a REST API for skill records with authentication-aware endpoint design.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "apis",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "apis_12",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which status code usually means success? Scenario set 12.",
        "options": [
          "200",
          "404",
          "500",
          "401"
        ],
        "answer": "200"
      },
      "problem": {
        "question": "APIs problem-solving task 12: Explain how you would solve a realistic scenario involving status and response. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "status",
          "response",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "APIs practical/coding task 12: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates post and json. Explain important decisions.",
        "keywords": [
          "post",
          "json"
        ],
        "minLength": 100
      },
      "project": {
        "title": "APIs Portfolio Project 12",
        "brief": "Build an API client that consumes a public JSON endpoint and handles errors robustly.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "apis",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "apis_13",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which status code usually means a resource was not found? Scenario set 13.",
        "options": [
          "404",
          "200",
          "201",
          "302"
        ],
        "answer": "404"
      },
      "problem": {
        "question": "APIs problem-solving task 13: Explain how you would solve a realistic scenario involving auth and token. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "auth",
          "token",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "APIs practical/coding task 13: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates header and authorization. Explain important decisions.",
        "keywords": [
          "header",
          "authorization"
        ],
        "minLength": 70
      },
      "project": {
        "title": "APIs Portfolio Project 13",
        "brief": "Build a FastAPI service with CRUD endpoints, validation, health checks and API documentation.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "apis",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "apis_14",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which format is commonly exchanged by REST APIs? Scenario set 14.",
        "options": [
          "JSON",
          "PSD only",
          "MP3 only",
          "EXE only"
        ],
        "answer": "JSON"
      },
      "problem": {
        "question": "APIs problem-solving task 14: Explain how you would solve a realistic scenario involving json and request. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "json",
          "request",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "APIs practical/coding task 14: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates fastapi and route. Explain important decisions.",
        "keywords": [
          "fastapi",
          "route"
        ],
        "minLength": 70
      },
      "project": {
        "title": "APIs Portfolio Project 14",
        "brief": "Create a REST API for skill records with authentication-aware endpoint design.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "apis",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "apis_15",
      "difficulty": "Advanced",
      "quiz": {
        "question": "What does API authentication protect? Scenario set 15.",
        "options": [
          "Access to protected endpoints",
          "Screen resolution",
          "Keyboard layout",
          "File extension"
        ],
        "answer": "Access to protected endpoints"
      },
      "problem": {
        "question": "APIs problem-solving task 15: Explain how you would solve a realistic scenario involving rest and resource. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "rest",
          "resource",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "APIs practical/coding task 15: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates response and status. Explain important decisions.",
        "keywords": [
          "response",
          "status"
        ],
        "minLength": 100
      },
      "project": {
        "title": "APIs Portfolio Project 15",
        "brief": "Build an API client that consumes a public JSON endpoint and handles errors robustly.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "apis",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "apis_16",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which HTTP method commonly retrieves a resource? Scenario set 16.",
        "options": [
          "GET",
          "POST",
          "DELETE",
          "PATCH"
        ],
        "answer": "GET"
      },
      "problem": {
        "question": "APIs problem-solving task 16: Explain how you would solve a realistic scenario involving endpoint and method. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "endpoint",
          "method",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "APIs practical/coding task 16: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates get and url. Explain important decisions.",
        "keywords": [
          "get",
          "url"
        ],
        "minLength": 70
      },
      "project": {
        "title": "APIs Portfolio Project 16",
        "brief": "Build a FastAPI service with CRUD endpoints, validation, health checks and API documentation.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "apis",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "apis_17",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which status code usually means success? Scenario set 17.",
        "options": [
          "200",
          "404",
          "500",
          "401"
        ],
        "answer": "200"
      },
      "problem": {
        "question": "APIs problem-solving task 17: Explain how you would solve a realistic scenario involving status and response. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "status",
          "response",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "APIs practical/coding task 17: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates post and json. Explain important decisions.",
        "keywords": [
          "post",
          "json"
        ],
        "minLength": 70
      },
      "project": {
        "title": "APIs Portfolio Project 17",
        "brief": "Create a REST API for skill records with authentication-aware endpoint design.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "apis",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "apis_18",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which status code usually means a resource was not found? Scenario set 18.",
        "options": [
          "404",
          "200",
          "201",
          "302"
        ],
        "answer": "404"
      },
      "problem": {
        "question": "APIs problem-solving task 18: Explain how you would solve a realistic scenario involving auth and token. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "auth",
          "token",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "APIs practical/coding task 18: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates header and authorization. Explain important decisions.",
        "keywords": [
          "header",
          "authorization"
        ],
        "minLength": 100
      },
      "project": {
        "title": "APIs Portfolio Project 18",
        "brief": "Build an API client that consumes a public JSON endpoint and handles errors robustly.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "apis",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    }
  ],
  "Cloud": [
    {
      "id": "cloud_01",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which cloud concept provides virtual compute resources?",
        "options": [
          "Compute instances",
          "Slides",
          "PivotTables",
          "Spreadsheets"
        ],
        "answer": "Compute instances"
      },
      "problem": {
        "question": "Cloud problem-solving task 1: Explain how you would solve a realistic scenario involving compute and scale. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "compute",
          "scale",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Cloud practical/coding task 1: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates deploy and service. Explain important decisions.",
        "keywords": [
          "deploy",
          "service"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Cloud Portfolio Project 1",
        "brief": "Deploy a small API or dashboard to a cloud platform with logs and environment variables.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "cloud",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "cloud_02",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which service type stores objects such as files and model artifacts?",
        "options": [
          "Object storage",
          "DNS only",
          "CPU register",
          "Clipboard"
        ],
        "answer": "Object storage"
      },
      "problem": {
        "question": "Cloud problem-solving task 2: Explain how you would solve a realistic scenario involving storage and object. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "storage",
          "object",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Cloud practical/coding task 2: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates bucket and storage. Explain important decisions.",
        "keywords": [
          "bucket",
          "storage"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Cloud Portfolio Project 2",
        "brief": "Design a secure cloud architecture using compute, storage, IAM and a managed database.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "cloud",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "cloud_03",
      "difficulty": "Advanced",
      "quiz": {
        "question": "What is IAM used for?",
        "options": [
          "Identity and access management",
          "Image animation",
          "Spreadsheet averages",
          "Audio mixing"
        ],
        "answer": "Identity and access management"
      },
      "problem": {
        "question": "Cloud problem-solving task 3: Explain how you would solve a realistic scenario involving iam and permission. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "iam",
          "permission",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Cloud practical/coding task 3: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates role and permission. Explain important decisions.",
        "keywords": [
          "role",
          "permission"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Cloud Portfolio Project 3",
        "brief": "Create a simple cost-aware deployment plan for an AI inference service.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "cloud",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "cloud_04",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which property helps a system handle increasing load?",
        "options": [
          "Scalability",
          "Indentation",
          "Font size",
          "Compression only"
        ],
        "answer": "Scalability"
      },
      "problem": {
        "question": "Cloud problem-solving task 4: Explain how you would solve a realistic scenario involving database and managed. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "database",
          "managed",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Cloud practical/coding task 4: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates environment and variable. Explain important decisions.",
        "keywords": [
          "environment",
          "variable"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Cloud Portfolio Project 4",
        "brief": "Deploy a small API or dashboard to a cloud platform with logs and environment variables.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "cloud",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "cloud_05",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which benefit is associated with managed services?",
        "options": [
          "Reduced infrastructure management burden",
          "No security responsibility ever",
          "No cost",
          "No monitoring needed"
        ],
        "answer": "Reduced infrastructure management burden"
      },
      "problem": {
        "question": "Cloud problem-solving task 5: Explain how you would solve a realistic scenario involving cost and deploy. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "cost",
          "deploy",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Cloud practical/coding task 5: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates log and monitor. Explain important decisions.",
        "keywords": [
          "log",
          "monitor"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Cloud Portfolio Project 5",
        "brief": "Design a secure cloud architecture using compute, storage, IAM and a managed database.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "cloud",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "cloud_06",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which cloud concept provides virtual compute resources? Scenario set 6.",
        "options": [
          "Compute instances",
          "Slides",
          "PivotTables",
          "Spreadsheets"
        ],
        "answer": "Compute instances"
      },
      "problem": {
        "question": "Cloud problem-solving task 6: Explain how you would solve a realistic scenario involving compute and scale. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "compute",
          "scale",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Cloud practical/coding task 6: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates deploy and service. Explain important decisions.",
        "keywords": [
          "deploy",
          "service"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Cloud Portfolio Project 6",
        "brief": "Create a simple cost-aware deployment plan for an AI inference service.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "cloud",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "cloud_07",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which service type stores objects such as files and model artifacts? Scenario set 7.",
        "options": [
          "Object storage",
          "DNS only",
          "CPU register",
          "Clipboard"
        ],
        "answer": "Object storage"
      },
      "problem": {
        "question": "Cloud problem-solving task 7: Explain how you would solve a realistic scenario involving storage and object. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "storage",
          "object",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Cloud practical/coding task 7: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates bucket and storage. Explain important decisions.",
        "keywords": [
          "bucket",
          "storage"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Cloud Portfolio Project 7",
        "brief": "Deploy a small API or dashboard to a cloud platform with logs and environment variables.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "cloud",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "cloud_08",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "What is IAM used for? Scenario set 8.",
        "options": [
          "Identity and access management",
          "Image animation",
          "Spreadsheet averages",
          "Audio mixing"
        ],
        "answer": "Identity and access management"
      },
      "problem": {
        "question": "Cloud problem-solving task 8: Explain how you would solve a realistic scenario involving iam and permission. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "iam",
          "permission",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Cloud practical/coding task 8: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates role and permission. Explain important decisions.",
        "keywords": [
          "role",
          "permission"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Cloud Portfolio Project 8",
        "brief": "Design a secure cloud architecture using compute, storage, IAM and a managed database.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "cloud",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "cloud_09",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which property helps a system handle increasing load? Scenario set 9.",
        "options": [
          "Scalability",
          "Indentation",
          "Font size",
          "Compression only"
        ],
        "answer": "Scalability"
      },
      "problem": {
        "question": "Cloud problem-solving task 9: Explain how you would solve a realistic scenario involving database and managed. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "database",
          "managed",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Cloud practical/coding task 9: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates environment and variable. Explain important decisions.",
        "keywords": [
          "environment",
          "variable"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Cloud Portfolio Project 9",
        "brief": "Create a simple cost-aware deployment plan for an AI inference service.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "cloud",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "cloud_10",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which benefit is associated with managed services? Scenario set 10.",
        "options": [
          "Reduced infrastructure management burden",
          "No security responsibility ever",
          "No cost",
          "No monitoring needed"
        ],
        "answer": "Reduced infrastructure management burden"
      },
      "problem": {
        "question": "Cloud problem-solving task 10: Explain how you would solve a realistic scenario involving cost and deploy. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "cost",
          "deploy",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Cloud practical/coding task 10: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates log and monitor. Explain important decisions.",
        "keywords": [
          "log",
          "monitor"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Cloud Portfolio Project 10",
        "brief": "Deploy a small API or dashboard to a cloud platform with logs and environment variables.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "cloud",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "cloud_11",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which cloud concept provides virtual compute resources? Scenario set 11.",
        "options": [
          "Compute instances",
          "Slides",
          "PivotTables",
          "Spreadsheets"
        ],
        "answer": "Compute instances"
      },
      "problem": {
        "question": "Cloud problem-solving task 11: Explain how you would solve a realistic scenario involving compute and scale. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "compute",
          "scale",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Cloud practical/coding task 11: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates deploy and service. Explain important decisions.",
        "keywords": [
          "deploy",
          "service"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Cloud Portfolio Project 11",
        "brief": "Design a secure cloud architecture using compute, storage, IAM and a managed database.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "cloud",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "cloud_12",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which service type stores objects such as files and model artifacts? Scenario set 12.",
        "options": [
          "Object storage",
          "DNS only",
          "CPU register",
          "Clipboard"
        ],
        "answer": "Object storage"
      },
      "problem": {
        "question": "Cloud problem-solving task 12: Explain how you would solve a realistic scenario involving storage and object. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "storage",
          "object",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Cloud practical/coding task 12: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates bucket and storage. Explain important decisions.",
        "keywords": [
          "bucket",
          "storage"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Cloud Portfolio Project 12",
        "brief": "Create a simple cost-aware deployment plan for an AI inference service.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "cloud",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "cloud_13",
      "difficulty": "Foundation",
      "quiz": {
        "question": "What is IAM used for? Scenario set 13.",
        "options": [
          "Identity and access management",
          "Image animation",
          "Spreadsheet averages",
          "Audio mixing"
        ],
        "answer": "Identity and access management"
      },
      "problem": {
        "question": "Cloud problem-solving task 13: Explain how you would solve a realistic scenario involving iam and permission. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "iam",
          "permission",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Cloud practical/coding task 13: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates role and permission. Explain important decisions.",
        "keywords": [
          "role",
          "permission"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Cloud Portfolio Project 13",
        "brief": "Deploy a small API or dashboard to a cloud platform with logs and environment variables.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "cloud",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "cloud_14",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which property helps a system handle increasing load? Scenario set 14.",
        "options": [
          "Scalability",
          "Indentation",
          "Font size",
          "Compression only"
        ],
        "answer": "Scalability"
      },
      "problem": {
        "question": "Cloud problem-solving task 14: Explain how you would solve a realistic scenario involving database and managed. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "database",
          "managed",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Cloud practical/coding task 14: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates environment and variable. Explain important decisions.",
        "keywords": [
          "environment",
          "variable"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Cloud Portfolio Project 14",
        "brief": "Design a secure cloud architecture using compute, storage, IAM and a managed database.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "cloud",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "cloud_15",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which benefit is associated with managed services? Scenario set 15.",
        "options": [
          "Reduced infrastructure management burden",
          "No security responsibility ever",
          "No cost",
          "No monitoring needed"
        ],
        "answer": "Reduced infrastructure management burden"
      },
      "problem": {
        "question": "Cloud problem-solving task 15: Explain how you would solve a realistic scenario involving cost and deploy. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "cost",
          "deploy",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Cloud practical/coding task 15: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates log and monitor. Explain important decisions.",
        "keywords": [
          "log",
          "monitor"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Cloud Portfolio Project 15",
        "brief": "Create a simple cost-aware deployment plan for an AI inference service.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "cloud",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "cloud_16",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which cloud concept provides virtual compute resources? Scenario set 16.",
        "options": [
          "Compute instances",
          "Slides",
          "PivotTables",
          "Spreadsheets"
        ],
        "answer": "Compute instances"
      },
      "problem": {
        "question": "Cloud problem-solving task 16: Explain how you would solve a realistic scenario involving compute and scale. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "compute",
          "scale",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Cloud practical/coding task 16: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates deploy and service. Explain important decisions.",
        "keywords": [
          "deploy",
          "service"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Cloud Portfolio Project 16",
        "brief": "Deploy a small API or dashboard to a cloud platform with logs and environment variables.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "cloud",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "cloud_17",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which service type stores objects such as files and model artifacts? Scenario set 17.",
        "options": [
          "Object storage",
          "DNS only",
          "CPU register",
          "Clipboard"
        ],
        "answer": "Object storage"
      },
      "problem": {
        "question": "Cloud problem-solving task 17: Explain how you would solve a realistic scenario involving storage and object. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "storage",
          "object",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Cloud practical/coding task 17: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates bucket and storage. Explain important decisions.",
        "keywords": [
          "bucket",
          "storage"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Cloud Portfolio Project 17",
        "brief": "Design a secure cloud architecture using compute, storage, IAM and a managed database.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "cloud",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "cloud_18",
      "difficulty": "Advanced",
      "quiz": {
        "question": "What is IAM used for? Scenario set 18.",
        "options": [
          "Identity and access management",
          "Image animation",
          "Spreadsheet averages",
          "Audio mixing"
        ],
        "answer": "Identity and access management"
      },
      "problem": {
        "question": "Cloud problem-solving task 18: Explain how you would solve a realistic scenario involving iam and permission. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "iam",
          "permission",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Cloud practical/coding task 18: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates role and permission. Explain important decisions.",
        "keywords": [
          "role",
          "permission"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Cloud Portfolio Project 18",
        "brief": "Create a simple cost-aware deployment plan for an AI inference service.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "cloud",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    }
  ],
  "Data Pipelines": [
    {
      "id": "data_pipelines_01",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which component coordinates dependent data tasks?",
        "options": [
          "Orchestrator",
          "Text editor",
          "Dashboard theme",
          "Mouse driver"
        ],
        "answer": "Orchestrator"
      },
      "problem": {
        "question": "Data Pipelines problem-solving task 1: Explain how you would solve a realistic scenario involving orchestrate and dependency. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "orchestrate",
          "dependency",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Data Pipelines practical/coding task 1: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates task and dependency. Explain important decisions.",
        "keywords": [
          "task",
          "dependency"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Data Pipelines Portfolio Project 1",
        "brief": "Create a scheduled pipeline with dependencies, retries, logging and success/failure tracking.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "data",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "data_pipelines_02",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Why are retries useful?",
        "options": [
          "To recover from transient failures",
          "To hide errors permanently",
          "To duplicate data intentionally",
          "To disable alerts"
        ],
        "answer": "To recover from transient failures"
      },
      "problem": {
        "question": "Data Pipelines problem-solving task 2: Explain how you would solve a realistic scenario involving retry and failure. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "retry",
          "failure",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Data Pipelines practical/coding task 2: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates retry and exception. Explain important decisions.",
        "keywords": [
          "retry",
          "exception"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Data Pipelines Portfolio Project 2",
        "brief": "Build a batch pipeline that ingests, validates and transforms daily data.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "data",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "data_pipelines_03",
      "difficulty": "Advanced",
      "quiz": {
        "question": "What is observability used for?",
        "options": [
          "Understanding pipeline health and behavior",
          "Changing fonts",
          "Encrypting screenshots only",
          "Sorting icons"
        ],
        "answer": "Understanding pipeline health and behavior"
      },
      "problem": {
        "question": "Data Pipelines problem-solving task 3: Explain how you would solve a realistic scenario involving monitor and log. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "monitor",
          "log",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Data Pipelines practical/coding task 3: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates log and metric. Explain important decisions.",
        "keywords": [
          "log",
          "metric"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Data Pipelines Portfolio Project 3",
        "brief": "Design a streaming event pipeline with consumer, checkpoint and monitoring concepts.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "data",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "data_pipelines_04",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which pattern processes data continuously?",
        "options": [
          "Streaming",
          "Batch only",
          "Manual copy",
          "Static archive"
        ],
        "answer": "Streaming"
      },
      "problem": {
        "question": "Data Pipelines problem-solving task 4: Explain how you would solve a realistic scenario involving stream and event. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "stream",
          "event",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Data Pipelines practical/coding task 4: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates stream and consumer. Explain important decisions.",
        "keywords": [
          "stream",
          "consumer"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Data Pipelines Portfolio Project 4",
        "brief": "Create a scheduled pipeline with dependencies, retries, logging and success/failure tracking.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "data",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "data_pipelines_05",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which feature helps make reruns safer?",
        "options": [
          "Idempotent design",
          "Random writes",
          "No keys",
          "No logs"
        ],
        "answer": "Idempotent design"
      },
      "problem": {
        "question": "Data Pipelines problem-solving task 5: Explain how you would solve a realistic scenario involving idempotent and rerun. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "idempotent",
          "rerun",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Data Pipelines practical/coding task 5: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates checkpoint and state. Explain important decisions.",
        "keywords": [
          "checkpoint",
          "state"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Data Pipelines Portfolio Project 5",
        "brief": "Build a batch pipeline that ingests, validates and transforms daily data.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "data",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "data_pipelines_06",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which component coordinates dependent data tasks? Scenario set 6.",
        "options": [
          "Orchestrator",
          "Text editor",
          "Dashboard theme",
          "Mouse driver"
        ],
        "answer": "Orchestrator"
      },
      "problem": {
        "question": "Data Pipelines problem-solving task 6: Explain how you would solve a realistic scenario involving orchestrate and dependency. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "orchestrate",
          "dependency",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Data Pipelines practical/coding task 6: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates task and dependency. Explain important decisions.",
        "keywords": [
          "task",
          "dependency"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Data Pipelines Portfolio Project 6",
        "brief": "Design a streaming event pipeline with consumer, checkpoint and monitoring concepts.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "data",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "data_pipelines_07",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Why are retries useful? Scenario set 7.",
        "options": [
          "To recover from transient failures",
          "To hide errors permanently",
          "To duplicate data intentionally",
          "To disable alerts"
        ],
        "answer": "To recover from transient failures"
      },
      "problem": {
        "question": "Data Pipelines problem-solving task 7: Explain how you would solve a realistic scenario involving retry and failure. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "retry",
          "failure",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Data Pipelines practical/coding task 7: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates retry and exception. Explain important decisions.",
        "keywords": [
          "retry",
          "exception"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Data Pipelines Portfolio Project 7",
        "brief": "Create a scheduled pipeline with dependencies, retries, logging and success/failure tracking.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "data",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "data_pipelines_08",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "What is observability used for? Scenario set 8.",
        "options": [
          "Understanding pipeline health and behavior",
          "Changing fonts",
          "Encrypting screenshots only",
          "Sorting icons"
        ],
        "answer": "Understanding pipeline health and behavior"
      },
      "problem": {
        "question": "Data Pipelines problem-solving task 8: Explain how you would solve a realistic scenario involving monitor and log. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "monitor",
          "log",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Data Pipelines practical/coding task 8: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates log and metric. Explain important decisions.",
        "keywords": [
          "log",
          "metric"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Data Pipelines Portfolio Project 8",
        "brief": "Build a batch pipeline that ingests, validates and transforms daily data.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "data",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "data_pipelines_09",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which pattern processes data continuously? Scenario set 9.",
        "options": [
          "Streaming",
          "Batch only",
          "Manual copy",
          "Static archive"
        ],
        "answer": "Streaming"
      },
      "problem": {
        "question": "Data Pipelines problem-solving task 9: Explain how you would solve a realistic scenario involving stream and event. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "stream",
          "event",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Data Pipelines practical/coding task 9: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates stream and consumer. Explain important decisions.",
        "keywords": [
          "stream",
          "consumer"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Data Pipelines Portfolio Project 9",
        "brief": "Design a streaming event pipeline with consumer, checkpoint and monitoring concepts.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "data",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "data_pipelines_10",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which feature helps make reruns safer? Scenario set 10.",
        "options": [
          "Idempotent design",
          "Random writes",
          "No keys",
          "No logs"
        ],
        "answer": "Idempotent design"
      },
      "problem": {
        "question": "Data Pipelines problem-solving task 10: Explain how you would solve a realistic scenario involving idempotent and rerun. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "idempotent",
          "rerun",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Data Pipelines practical/coding task 10: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates checkpoint and state. Explain important decisions.",
        "keywords": [
          "checkpoint",
          "state"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Data Pipelines Portfolio Project 10",
        "brief": "Create a scheduled pipeline with dependencies, retries, logging and success/failure tracking.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "data",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "data_pipelines_11",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which component coordinates dependent data tasks? Scenario set 11.",
        "options": [
          "Orchestrator",
          "Text editor",
          "Dashboard theme",
          "Mouse driver"
        ],
        "answer": "Orchestrator"
      },
      "problem": {
        "question": "Data Pipelines problem-solving task 11: Explain how you would solve a realistic scenario involving orchestrate and dependency. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "orchestrate",
          "dependency",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Data Pipelines practical/coding task 11: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates task and dependency. Explain important decisions.",
        "keywords": [
          "task",
          "dependency"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Data Pipelines Portfolio Project 11",
        "brief": "Build a batch pipeline that ingests, validates and transforms daily data.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "data",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "data_pipelines_12",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Why are retries useful? Scenario set 12.",
        "options": [
          "To recover from transient failures",
          "To hide errors permanently",
          "To duplicate data intentionally",
          "To disable alerts"
        ],
        "answer": "To recover from transient failures"
      },
      "problem": {
        "question": "Data Pipelines problem-solving task 12: Explain how you would solve a realistic scenario involving retry and failure. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "retry",
          "failure",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Data Pipelines practical/coding task 12: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates retry and exception. Explain important decisions.",
        "keywords": [
          "retry",
          "exception"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Data Pipelines Portfolio Project 12",
        "brief": "Design a streaming event pipeline with consumer, checkpoint and monitoring concepts.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "data",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "data_pipelines_13",
      "difficulty": "Foundation",
      "quiz": {
        "question": "What is observability used for? Scenario set 13.",
        "options": [
          "Understanding pipeline health and behavior",
          "Changing fonts",
          "Encrypting screenshots only",
          "Sorting icons"
        ],
        "answer": "Understanding pipeline health and behavior"
      },
      "problem": {
        "question": "Data Pipelines problem-solving task 13: Explain how you would solve a realistic scenario involving monitor and log. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "monitor",
          "log",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Data Pipelines practical/coding task 13: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates log and metric. Explain important decisions.",
        "keywords": [
          "log",
          "metric"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Data Pipelines Portfolio Project 13",
        "brief": "Create a scheduled pipeline with dependencies, retries, logging and success/failure tracking.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "data",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "data_pipelines_14",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which pattern processes data continuously? Scenario set 14.",
        "options": [
          "Streaming",
          "Batch only",
          "Manual copy",
          "Static archive"
        ],
        "answer": "Streaming"
      },
      "problem": {
        "question": "Data Pipelines problem-solving task 14: Explain how you would solve a realistic scenario involving stream and event. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "stream",
          "event",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Data Pipelines practical/coding task 14: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates stream and consumer. Explain important decisions.",
        "keywords": [
          "stream",
          "consumer"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Data Pipelines Portfolio Project 14",
        "brief": "Build a batch pipeline that ingests, validates and transforms daily data.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "data",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "data_pipelines_15",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which feature helps make reruns safer? Scenario set 15.",
        "options": [
          "Idempotent design",
          "Random writes",
          "No keys",
          "No logs"
        ],
        "answer": "Idempotent design"
      },
      "problem": {
        "question": "Data Pipelines problem-solving task 15: Explain how you would solve a realistic scenario involving idempotent and rerun. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "idempotent",
          "rerun",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Data Pipelines practical/coding task 15: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates checkpoint and state. Explain important decisions.",
        "keywords": [
          "checkpoint",
          "state"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Data Pipelines Portfolio Project 15",
        "brief": "Design a streaming event pipeline with consumer, checkpoint and monitoring concepts.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "data",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "data_pipelines_16",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which component coordinates dependent data tasks? Scenario set 16.",
        "options": [
          "Orchestrator",
          "Text editor",
          "Dashboard theme",
          "Mouse driver"
        ],
        "answer": "Orchestrator"
      },
      "problem": {
        "question": "Data Pipelines problem-solving task 16: Explain how you would solve a realistic scenario involving orchestrate and dependency. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "orchestrate",
          "dependency",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Data Pipelines practical/coding task 16: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates task and dependency. Explain important decisions.",
        "keywords": [
          "task",
          "dependency"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Data Pipelines Portfolio Project 16",
        "brief": "Create a scheduled pipeline with dependencies, retries, logging and success/failure tracking.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "data",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "data_pipelines_17",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Why are retries useful? Scenario set 17.",
        "options": [
          "To recover from transient failures",
          "To hide errors permanently",
          "To duplicate data intentionally",
          "To disable alerts"
        ],
        "answer": "To recover from transient failures"
      },
      "problem": {
        "question": "Data Pipelines problem-solving task 17: Explain how you would solve a realistic scenario involving retry and failure. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "retry",
          "failure",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Data Pipelines practical/coding task 17: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates retry and exception. Explain important decisions.",
        "keywords": [
          "retry",
          "exception"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Data Pipelines Portfolio Project 17",
        "brief": "Build a batch pipeline that ingests, validates and transforms daily data.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "data",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "data_pipelines_18",
      "difficulty": "Advanced",
      "quiz": {
        "question": "What is observability used for? Scenario set 18.",
        "options": [
          "Understanding pipeline health and behavior",
          "Changing fonts",
          "Encrypting screenshots only",
          "Sorting icons"
        ],
        "answer": "Understanding pipeline health and behavior"
      },
      "problem": {
        "question": "Data Pipelines problem-solving task 18: Explain how you would solve a realistic scenario involving monitor and log. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "monitor",
          "log",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Data Pipelines practical/coding task 18: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates log and metric. Explain important decisions.",
        "keywords": [
          "log",
          "metric"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Data Pipelines Portfolio Project 18",
        "brief": "Design a streaming event pipeline with consumer, checkpoint and monitoring concepts.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "data",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    }
  ],
  "ETL": [
    {
      "id": "etl_01",
      "difficulty": "Foundation",
      "quiz": {
        "question": "What does ETL stand for?",
        "options": [
          "Extract Transform Load",
          "Evaluate Test Launch",
          "Encode Transfer Link",
          "Edit Type List"
        ],
        "answer": "Extract Transform Load"
      },
      "problem": {
        "question": "ETL problem-solving task 1: Explain how you would solve a realistic scenario involving extract and source. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "extract",
          "source",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "ETL practical/coding task 1: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates read and transform. Explain important decisions.",
        "keywords": [
          "read",
          "transform"
        ],
        "minLength": 70
      },
      "project": {
        "title": "ETL Portfolio Project 1",
        "brief": "Build an ETL pipeline that reads CSV files, validates schema, cleans records and loads a database.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "etl",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "etl_02",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which stage cleans or standardizes data?",
        "options": [
          "Transform",
          "Extract only",
          "Load only",
          "Archive only"
        ],
        "answer": "Transform"
      },
      "problem": {
        "question": "ETL problem-solving task 2: Explain how you would solve a realistic scenario involving transform and clean. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "transform",
          "clean",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "ETL practical/coding task 2: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates dropna and clean. Explain important decisions.",
        "keywords": [
          "dropna",
          "clean"
        ],
        "minLength": 70
      },
      "project": {
        "title": "ETL Portfolio Project 2",
        "brief": "Create an incremental ETL process with duplicate handling and logging.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "etl",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "etl_03",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which practice helps ensure data quality?",
        "options": [
          "Validation checks",
          "Ignoring nulls",
          "Disabling logs",
          "Removing schemas"
        ],
        "answer": "Validation checks"
      },
      "problem": {
        "question": "ETL problem-solving task 3: Explain how you would solve a realistic scenario involving load and database. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "load",
          "database",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "ETL practical/coding task 3: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates to_sql and load. Explain important decisions.",
        "keywords": [
          "to_sql",
          "load"
        ],
        "minLength": 100
      },
      "project": {
        "title": "ETL Portfolio Project 3",
        "brief": "Design an ETL workflow with data-quality checks and failure recovery.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "etl",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "etl_04",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which mechanism runs ETL jobs automatically?",
        "options": [
          "Scheduler/orchestrator",
          "Image editor",
          "Browser theme",
          "Text formatter"
        ],
        "answer": "Scheduler/orchestrator"
      },
      "problem": {
        "question": "ETL problem-solving task 4: Explain how you would solve a realistic scenario involving validation and quality. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "validation",
          "quality",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "ETL practical/coding task 4: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates validate and schema. Explain important decisions.",
        "keywords": [
          "validate",
          "schema"
        ],
        "minLength": 70
      },
      "project": {
        "title": "ETL Portfolio Project 4",
        "brief": "Build an ETL pipeline that reads CSV files, validates schema, cleans records and loads a database.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "etl",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "etl_05",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "What should happen when an ETL step fails?",
        "options": [
          "Log, handle, and retry or alert appropriately",
          "Silently ignore every error",
          "Delete all data",
          "Disable monitoring"
        ],
        "answer": "Log, handle, and retry or alert appropriately"
      },
      "problem": {
        "question": "ETL problem-solving task 5: Explain how you would solve a realistic scenario involving schedule and retry. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "schedule",
          "retry",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "ETL practical/coding task 5: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates airflow and task. Explain important decisions.",
        "keywords": [
          "airflow",
          "task"
        ],
        "minLength": 70
      },
      "project": {
        "title": "ETL Portfolio Project 5",
        "brief": "Create an incremental ETL process with duplicate handling and logging.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "etl",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "etl_06",
      "difficulty": "Advanced",
      "quiz": {
        "question": "What does ETL stand for? Scenario set 6.",
        "options": [
          "Extract Transform Load",
          "Evaluate Test Launch",
          "Encode Transfer Link",
          "Edit Type List"
        ],
        "answer": "Extract Transform Load"
      },
      "problem": {
        "question": "ETL problem-solving task 6: Explain how you would solve a realistic scenario involving extract and source. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "extract",
          "source",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "ETL practical/coding task 6: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates read and transform. Explain important decisions.",
        "keywords": [
          "read",
          "transform"
        ],
        "minLength": 100
      },
      "project": {
        "title": "ETL Portfolio Project 6",
        "brief": "Design an ETL workflow with data-quality checks and failure recovery.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "etl",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "etl_07",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which stage cleans or standardizes data? Scenario set 7.",
        "options": [
          "Transform",
          "Extract only",
          "Load only",
          "Archive only"
        ],
        "answer": "Transform"
      },
      "problem": {
        "question": "ETL problem-solving task 7: Explain how you would solve a realistic scenario involving transform and clean. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "transform",
          "clean",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "ETL practical/coding task 7: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates dropna and clean. Explain important decisions.",
        "keywords": [
          "dropna",
          "clean"
        ],
        "minLength": 70
      },
      "project": {
        "title": "ETL Portfolio Project 7",
        "brief": "Build an ETL pipeline that reads CSV files, validates schema, cleans records and loads a database.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "etl",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "etl_08",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which practice helps ensure data quality? Scenario set 8.",
        "options": [
          "Validation checks",
          "Ignoring nulls",
          "Disabling logs",
          "Removing schemas"
        ],
        "answer": "Validation checks"
      },
      "problem": {
        "question": "ETL problem-solving task 8: Explain how you would solve a realistic scenario involving load and database. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "load",
          "database",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "ETL practical/coding task 8: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates to_sql and load. Explain important decisions.",
        "keywords": [
          "to_sql",
          "load"
        ],
        "minLength": 70
      },
      "project": {
        "title": "ETL Portfolio Project 8",
        "brief": "Create an incremental ETL process with duplicate handling and logging.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "etl",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "etl_09",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which mechanism runs ETL jobs automatically? Scenario set 9.",
        "options": [
          "Scheduler/orchestrator",
          "Image editor",
          "Browser theme",
          "Text formatter"
        ],
        "answer": "Scheduler/orchestrator"
      },
      "problem": {
        "question": "ETL problem-solving task 9: Explain how you would solve a realistic scenario involving validation and quality. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "validation",
          "quality",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "ETL practical/coding task 9: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates validate and schema. Explain important decisions.",
        "keywords": [
          "validate",
          "schema"
        ],
        "minLength": 100
      },
      "project": {
        "title": "ETL Portfolio Project 9",
        "brief": "Design an ETL workflow with data-quality checks and failure recovery.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "etl",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "etl_10",
      "difficulty": "Foundation",
      "quiz": {
        "question": "What should happen when an ETL step fails? Scenario set 10.",
        "options": [
          "Log, handle, and retry or alert appropriately",
          "Silently ignore every error",
          "Delete all data",
          "Disable monitoring"
        ],
        "answer": "Log, handle, and retry or alert appropriately"
      },
      "problem": {
        "question": "ETL problem-solving task 10: Explain how you would solve a realistic scenario involving schedule and retry. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "schedule",
          "retry",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "ETL practical/coding task 10: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates airflow and task. Explain important decisions.",
        "keywords": [
          "airflow",
          "task"
        ],
        "minLength": 70
      },
      "project": {
        "title": "ETL Portfolio Project 10",
        "brief": "Build an ETL pipeline that reads CSV files, validates schema, cleans records and loads a database.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "etl",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "etl_11",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "What does ETL stand for? Scenario set 11.",
        "options": [
          "Extract Transform Load",
          "Evaluate Test Launch",
          "Encode Transfer Link",
          "Edit Type List"
        ],
        "answer": "Extract Transform Load"
      },
      "problem": {
        "question": "ETL problem-solving task 11: Explain how you would solve a realistic scenario involving extract and source. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "extract",
          "source",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "ETL practical/coding task 11: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates read and transform. Explain important decisions.",
        "keywords": [
          "read",
          "transform"
        ],
        "minLength": 70
      },
      "project": {
        "title": "ETL Portfolio Project 11",
        "brief": "Create an incremental ETL process with duplicate handling and logging.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "etl",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "etl_12",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which stage cleans or standardizes data? Scenario set 12.",
        "options": [
          "Transform",
          "Extract only",
          "Load only",
          "Archive only"
        ],
        "answer": "Transform"
      },
      "problem": {
        "question": "ETL problem-solving task 12: Explain how you would solve a realistic scenario involving transform and clean. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "transform",
          "clean",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "ETL practical/coding task 12: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates dropna and clean. Explain important decisions.",
        "keywords": [
          "dropna",
          "clean"
        ],
        "minLength": 100
      },
      "project": {
        "title": "ETL Portfolio Project 12",
        "brief": "Design an ETL workflow with data-quality checks and failure recovery.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "etl",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "etl_13",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which practice helps ensure data quality? Scenario set 13.",
        "options": [
          "Validation checks",
          "Ignoring nulls",
          "Disabling logs",
          "Removing schemas"
        ],
        "answer": "Validation checks"
      },
      "problem": {
        "question": "ETL problem-solving task 13: Explain how you would solve a realistic scenario involving load and database. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "load",
          "database",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "ETL practical/coding task 13: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates to_sql and load. Explain important decisions.",
        "keywords": [
          "to_sql",
          "load"
        ],
        "minLength": 70
      },
      "project": {
        "title": "ETL Portfolio Project 13",
        "brief": "Build an ETL pipeline that reads CSV files, validates schema, cleans records and loads a database.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "etl",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "etl_14",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which mechanism runs ETL jobs automatically? Scenario set 14.",
        "options": [
          "Scheduler/orchestrator",
          "Image editor",
          "Browser theme",
          "Text formatter"
        ],
        "answer": "Scheduler/orchestrator"
      },
      "problem": {
        "question": "ETL problem-solving task 14: Explain how you would solve a realistic scenario involving validation and quality. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "validation",
          "quality",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "ETL practical/coding task 14: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates validate and schema. Explain important decisions.",
        "keywords": [
          "validate",
          "schema"
        ],
        "minLength": 70
      },
      "project": {
        "title": "ETL Portfolio Project 14",
        "brief": "Create an incremental ETL process with duplicate handling and logging.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "etl",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "etl_15",
      "difficulty": "Advanced",
      "quiz": {
        "question": "What should happen when an ETL step fails? Scenario set 15.",
        "options": [
          "Log, handle, and retry or alert appropriately",
          "Silently ignore every error",
          "Delete all data",
          "Disable monitoring"
        ],
        "answer": "Log, handle, and retry or alert appropriately"
      },
      "problem": {
        "question": "ETL problem-solving task 15: Explain how you would solve a realistic scenario involving schedule and retry. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "schedule",
          "retry",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "ETL practical/coding task 15: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates airflow and task. Explain important decisions.",
        "keywords": [
          "airflow",
          "task"
        ],
        "minLength": 100
      },
      "project": {
        "title": "ETL Portfolio Project 15",
        "brief": "Design an ETL workflow with data-quality checks and failure recovery.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "etl",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "etl_16",
      "difficulty": "Foundation",
      "quiz": {
        "question": "What does ETL stand for? Scenario set 16.",
        "options": [
          "Extract Transform Load",
          "Evaluate Test Launch",
          "Encode Transfer Link",
          "Edit Type List"
        ],
        "answer": "Extract Transform Load"
      },
      "problem": {
        "question": "ETL problem-solving task 16: Explain how you would solve a realistic scenario involving extract and source. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "extract",
          "source",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "ETL practical/coding task 16: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates read and transform. Explain important decisions.",
        "keywords": [
          "read",
          "transform"
        ],
        "minLength": 70
      },
      "project": {
        "title": "ETL Portfolio Project 16",
        "brief": "Build an ETL pipeline that reads CSV files, validates schema, cleans records and loads a database.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "etl",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "etl_17",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which stage cleans or standardizes data? Scenario set 17.",
        "options": [
          "Transform",
          "Extract only",
          "Load only",
          "Archive only"
        ],
        "answer": "Transform"
      },
      "problem": {
        "question": "ETL problem-solving task 17: Explain how you would solve a realistic scenario involving transform and clean. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "transform",
          "clean",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "ETL practical/coding task 17: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates dropna and clean. Explain important decisions.",
        "keywords": [
          "dropna",
          "clean"
        ],
        "minLength": 70
      },
      "project": {
        "title": "ETL Portfolio Project 17",
        "brief": "Create an incremental ETL process with duplicate handling and logging.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "etl",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "etl_18",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which practice helps ensure data quality? Scenario set 18.",
        "options": [
          "Validation checks",
          "Ignoring nulls",
          "Disabling logs",
          "Removing schemas"
        ],
        "answer": "Validation checks"
      },
      "problem": {
        "question": "ETL problem-solving task 18: Explain how you would solve a realistic scenario involving load and database. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "load",
          "database",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "ETL practical/coding task 18: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates to_sql and load. Explain important decisions.",
        "keywords": [
          "to_sql",
          "load"
        ],
        "minLength": 100
      },
      "project": {
        "title": "ETL Portfolio Project 18",
        "brief": "Design an ETL workflow with data-quality checks and failure recovery.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "etl",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    }
  ],
  "Big Data": [
    {
      "id": "big_data_01",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which engine is widely used for distributed data processing?",
        "options": [
          "Apache Spark",
          "Excel Paint",
          "PowerPoint",
          "SQLite only"
        ],
        "answer": "Apache Spark"
      },
      "problem": {
        "question": "Big Data problem-solving task 1: Explain how you would solve a realistic scenario involving spark and dataframe. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "spark",
          "dataframe",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Big Data practical/coding task 1: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates spark and read. Explain important decisions.",
        "keywords": [
          "spark",
          "read"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Big Data Portfolio Project 1",
        "brief": "Use Spark to process a large dataset and explain partitioning and output format decisions.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "big",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "big_data_02",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "What does partitioning help distribute?",
        "options": [
          "Data and work",
          "Font settings",
          "Passwords only",
          "Mouse input"
        ],
        "answer": "Data and work"
      },
      "problem": {
        "question": "Big Data problem-solving task 2: Explain how you would solve a realistic scenario involving partition and data. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "partition",
          "data",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Big Data practical/coding task 2: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates repartition and dataframe. Explain important decisions.",
        "keywords": [
          "repartition",
          "dataframe"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Big Data Portfolio Project 2",
        "brief": "Build a distributed aggregation pipeline and analyze shuffle behavior.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "big",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "big_data_03",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which Spark abstraction is commonly used for structured data?",
        "options": [
          "DataFrame",
          "Slide",
          "Canvas layer",
          "Audio track"
        ],
        "answer": "DataFrame"
      },
      "problem": {
        "question": "Big Data problem-solving task 3: Explain how you would solve a realistic scenario involving shuffle and join. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "shuffle",
          "join",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Big Data practical/coding task 3: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates groupby and agg. Explain important decisions.",
        "keywords": [
          "groupby",
          "agg"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Big Data Portfolio Project 3",
        "brief": "Compare a small local workflow with a Spark workflow and explain when distribution is justified.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "big",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "big_data_04",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which operation often triggers distributed data movement?",
        "options": [
          "Shuffle",
          "Variable naming",
          "Comments",
          "Whitespace"
        ],
        "answer": "Shuffle"
      },
      "problem": {
        "question": "Big Data problem-solving task 4: Explain how you would solve a realistic scenario involving distributed and cluster. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "distributed",
          "cluster",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Big Data practical/coding task 4: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates join and spark. Explain important decisions.",
        "keywords": [
          "join",
          "spark"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Big Data Portfolio Project 4",
        "brief": "Use Spark to process a large dataset and explain partitioning and output format decisions.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "big",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "big_data_05",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which format is commonly used for columnar analytics storage?",
        "options": [
          "Parquet",
          "BMP",
          "WAV",
          "TXT only"
        ],
        "answer": "Parquet"
      },
      "problem": {
        "question": "Big Data problem-solving task 5: Explain how you would solve a realistic scenario involving parquet and columnar. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "parquet",
          "columnar",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Big Data practical/coding task 5: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates write and parquet. Explain important decisions.",
        "keywords": [
          "write",
          "parquet"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Big Data Portfolio Project 5",
        "brief": "Build a distributed aggregation pipeline and analyze shuffle behavior.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "big",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "big_data_06",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which engine is widely used for distributed data processing? Scenario set 6.",
        "options": [
          "Apache Spark",
          "Excel Paint",
          "PowerPoint",
          "SQLite only"
        ],
        "answer": "Apache Spark"
      },
      "problem": {
        "question": "Big Data problem-solving task 6: Explain how you would solve a realistic scenario involving spark and dataframe. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "spark",
          "dataframe",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Big Data practical/coding task 6: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates spark and read. Explain important decisions.",
        "keywords": [
          "spark",
          "read"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Big Data Portfolio Project 6",
        "brief": "Compare a small local workflow with a Spark workflow and explain when distribution is justified.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "big",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "big_data_07",
      "difficulty": "Foundation",
      "quiz": {
        "question": "What does partitioning help distribute? Scenario set 7.",
        "options": [
          "Data and work",
          "Font settings",
          "Passwords only",
          "Mouse input"
        ],
        "answer": "Data and work"
      },
      "problem": {
        "question": "Big Data problem-solving task 7: Explain how you would solve a realistic scenario involving partition and data. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "partition",
          "data",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Big Data practical/coding task 7: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates repartition and dataframe. Explain important decisions.",
        "keywords": [
          "repartition",
          "dataframe"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Big Data Portfolio Project 7",
        "brief": "Use Spark to process a large dataset and explain partitioning and output format decisions.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "big",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "big_data_08",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which Spark abstraction is commonly used for structured data? Scenario set 8.",
        "options": [
          "DataFrame",
          "Slide",
          "Canvas layer",
          "Audio track"
        ],
        "answer": "DataFrame"
      },
      "problem": {
        "question": "Big Data problem-solving task 8: Explain how you would solve a realistic scenario involving shuffle and join. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "shuffle",
          "join",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Big Data practical/coding task 8: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates groupby and agg. Explain important decisions.",
        "keywords": [
          "groupby",
          "agg"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Big Data Portfolio Project 8",
        "brief": "Build a distributed aggregation pipeline and analyze shuffle behavior.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "big",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "big_data_09",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which operation often triggers distributed data movement? Scenario set 9.",
        "options": [
          "Shuffle",
          "Variable naming",
          "Comments",
          "Whitespace"
        ],
        "answer": "Shuffle"
      },
      "problem": {
        "question": "Big Data problem-solving task 9: Explain how you would solve a realistic scenario involving distributed and cluster. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "distributed",
          "cluster",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Big Data practical/coding task 9: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates join and spark. Explain important decisions.",
        "keywords": [
          "join",
          "spark"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Big Data Portfolio Project 9",
        "brief": "Compare a small local workflow with a Spark workflow and explain when distribution is justified.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "big",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "big_data_10",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which format is commonly used for columnar analytics storage? Scenario set 10.",
        "options": [
          "Parquet",
          "BMP",
          "WAV",
          "TXT only"
        ],
        "answer": "Parquet"
      },
      "problem": {
        "question": "Big Data problem-solving task 10: Explain how you would solve a realistic scenario involving parquet and columnar. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "parquet",
          "columnar",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Big Data practical/coding task 10: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates write and parquet. Explain important decisions.",
        "keywords": [
          "write",
          "parquet"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Big Data Portfolio Project 10",
        "brief": "Use Spark to process a large dataset and explain partitioning and output format decisions.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "big",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "big_data_11",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which engine is widely used for distributed data processing? Scenario set 11.",
        "options": [
          "Apache Spark",
          "Excel Paint",
          "PowerPoint",
          "SQLite only"
        ],
        "answer": "Apache Spark"
      },
      "problem": {
        "question": "Big Data problem-solving task 11: Explain how you would solve a realistic scenario involving spark and dataframe. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "spark",
          "dataframe",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Big Data practical/coding task 11: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates spark and read. Explain important decisions.",
        "keywords": [
          "spark",
          "read"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Big Data Portfolio Project 11",
        "brief": "Build a distributed aggregation pipeline and analyze shuffle behavior.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "big",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "big_data_12",
      "difficulty": "Advanced",
      "quiz": {
        "question": "What does partitioning help distribute? Scenario set 12.",
        "options": [
          "Data and work",
          "Font settings",
          "Passwords only",
          "Mouse input"
        ],
        "answer": "Data and work"
      },
      "problem": {
        "question": "Big Data problem-solving task 12: Explain how you would solve a realistic scenario involving partition and data. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "partition",
          "data",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Big Data practical/coding task 12: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates repartition and dataframe. Explain important decisions.",
        "keywords": [
          "repartition",
          "dataframe"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Big Data Portfolio Project 12",
        "brief": "Compare a small local workflow with a Spark workflow and explain when distribution is justified.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "big",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "big_data_13",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which Spark abstraction is commonly used for structured data? Scenario set 13.",
        "options": [
          "DataFrame",
          "Slide",
          "Canvas layer",
          "Audio track"
        ],
        "answer": "DataFrame"
      },
      "problem": {
        "question": "Big Data problem-solving task 13: Explain how you would solve a realistic scenario involving shuffle and join. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "shuffle",
          "join",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Big Data practical/coding task 13: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates groupby and agg. Explain important decisions.",
        "keywords": [
          "groupby",
          "agg"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Big Data Portfolio Project 13",
        "brief": "Use Spark to process a large dataset and explain partitioning and output format decisions.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "big",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "big_data_14",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which operation often triggers distributed data movement? Scenario set 14.",
        "options": [
          "Shuffle",
          "Variable naming",
          "Comments",
          "Whitespace"
        ],
        "answer": "Shuffle"
      },
      "problem": {
        "question": "Big Data problem-solving task 14: Explain how you would solve a realistic scenario involving distributed and cluster. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "distributed",
          "cluster",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Big Data practical/coding task 14: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates join and spark. Explain important decisions.",
        "keywords": [
          "join",
          "spark"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Big Data Portfolio Project 14",
        "brief": "Build a distributed aggregation pipeline and analyze shuffle behavior.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "big",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "big_data_15",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which format is commonly used for columnar analytics storage? Scenario set 15.",
        "options": [
          "Parquet",
          "BMP",
          "WAV",
          "TXT only"
        ],
        "answer": "Parquet"
      },
      "problem": {
        "question": "Big Data problem-solving task 15: Explain how you would solve a realistic scenario involving parquet and columnar. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "parquet",
          "columnar",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Big Data practical/coding task 15: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates write and parquet. Explain important decisions.",
        "keywords": [
          "write",
          "parquet"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Big Data Portfolio Project 15",
        "brief": "Compare a small local workflow with a Spark workflow and explain when distribution is justified.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "big",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "big_data_16",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which engine is widely used for distributed data processing? Scenario set 16.",
        "options": [
          "Apache Spark",
          "Excel Paint",
          "PowerPoint",
          "SQLite only"
        ],
        "answer": "Apache Spark"
      },
      "problem": {
        "question": "Big Data problem-solving task 16: Explain how you would solve a realistic scenario involving spark and dataframe. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "spark",
          "dataframe",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Big Data practical/coding task 16: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates spark and read. Explain important decisions.",
        "keywords": [
          "spark",
          "read"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Big Data Portfolio Project 16",
        "brief": "Use Spark to process a large dataset and explain partitioning and output format decisions.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "big",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "big_data_17",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "What does partitioning help distribute? Scenario set 17.",
        "options": [
          "Data and work",
          "Font settings",
          "Passwords only",
          "Mouse input"
        ],
        "answer": "Data and work"
      },
      "problem": {
        "question": "Big Data problem-solving task 17: Explain how you would solve a realistic scenario involving partition and data. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "partition",
          "data",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Big Data practical/coding task 17: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates repartition and dataframe. Explain important decisions.",
        "keywords": [
          "repartition",
          "dataframe"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Big Data Portfolio Project 17",
        "brief": "Build a distributed aggregation pipeline and analyze shuffle behavior.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "big",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "big_data_18",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which Spark abstraction is commonly used for structured data? Scenario set 18.",
        "options": [
          "DataFrame",
          "Slide",
          "Canvas layer",
          "Audio track"
        ],
        "answer": "DataFrame"
      },
      "problem": {
        "question": "Big Data problem-solving task 18: Explain how you would solve a realistic scenario involving shuffle and join. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "shuffle",
          "join",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Big Data practical/coding task 18: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates groupby and agg. Explain important decisions.",
        "keywords": [
          "groupby",
          "agg"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Big Data Portfolio Project 18",
        "brief": "Compare a small local workflow with a Spark workflow and explain when distribution is justified.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "big",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    }
  ],
  "Data Modeling": [
    {
      "id": "data_modeling_01",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which key uniquely identifies a table row?",
        "options": [
          "Primary key",
          "Foreign key only",
          "Color key",
          "Sort icon"
        ],
        "answer": "Primary key"
      },
      "problem": {
        "question": "Data Modeling problem-solving task 1: Explain how you would solve a realistic scenario involving entity and relationship. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "entity",
          "relationship",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Data Modeling practical/coding task 1: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates create table and primary key. Explain important decisions.",
        "keywords": [
          "create table",
          "primary key"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Data Modeling Portfolio Project 1",
        "brief": "Design an OLTP ER model and an analytics star schema for the same business domain.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "data",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "data_modeling_02",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which key references another table?",
        "options": [
          "Foreign key",
          "Font key",
          "Chart key",
          "Theme key"
        ],
        "answer": "Foreign key"
      },
      "problem": {
        "question": "Data Modeling problem-solving task 2: Explain how you would solve a realistic scenario involving primary key and foreign key. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "primary key",
          "foreign key",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Data Modeling practical/coding task 2: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates foreign key and references. Explain important decisions.",
        "keywords": [
          "foreign key",
          "references"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Data Modeling Portfolio Project 2",
        "brief": "Create a university data model covering students, courses, enrollment, attendance and results.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "data",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "data_modeling_03",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which model is common in analytics warehouses?",
        "options": [
          "Star schema",
          "Random graph only",
          "Plain text",
          "No schema"
        ],
        "answer": "Star schema"
      },
      "problem": {
        "question": "Data Modeling problem-solving task 3: Explain how you would solve a realistic scenario involving normalize and redundancy. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "normalize",
          "redundancy",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Data Modeling practical/coding task 3: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates fact and dimension. Explain important decisions.",
        "keywords": [
          "fact",
          "dimension"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Data Modeling Portfolio Project 3",
        "brief": "Design a retail star schema with fact sales and reusable dimensions.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "data",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "data_modeling_04",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Why is normalization used in transactional models?",
        "options": [
          "Reduce redundancy and update anomalies",
          "Add duplicate data",
          "Remove all keys",
          "Prevent queries"
        ],
        "answer": "Reduce redundancy and update anomalies"
      },
      "problem": {
        "question": "Data Modeling problem-solving task 4: Explain how you would solve a realistic scenario involving fact and dimension. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "fact",
          "dimension",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Data Modeling practical/coding task 4: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates normalize and table. Explain important decisions.",
        "keywords": [
          "normalize",
          "table"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Data Modeling Portfolio Project 4",
        "brief": "Design an OLTP ER model and an analytics star schema for the same business domain.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "data",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "data_modeling_05",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "What does an ER diagram represent?",
        "options": [
          "Entities and relationships",
          "CPU instructions",
          "Image pixels",
          "CSS animations"
        ],
        "answer": "Entities and relationships"
      },
      "problem": {
        "question": "Data Modeling problem-solving task 5: Explain how you would solve a realistic scenario involving star and schema. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "star",
          "schema",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Data Modeling practical/coding task 5: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates schema and relationship. Explain important decisions.",
        "keywords": [
          "schema",
          "relationship"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Data Modeling Portfolio Project 5",
        "brief": "Create a university data model covering students, courses, enrollment, attendance and results.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "data",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "data_modeling_06",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which key uniquely identifies a table row? Scenario set 6.",
        "options": [
          "Primary key",
          "Foreign key only",
          "Color key",
          "Sort icon"
        ],
        "answer": "Primary key"
      },
      "problem": {
        "question": "Data Modeling problem-solving task 6: Explain how you would solve a realistic scenario involving entity and relationship. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "entity",
          "relationship",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Data Modeling practical/coding task 6: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates create table and primary key. Explain important decisions.",
        "keywords": [
          "create table",
          "primary key"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Data Modeling Portfolio Project 6",
        "brief": "Design a retail star schema with fact sales and reusable dimensions.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "data",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "data_modeling_07",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which key references another table? Scenario set 7.",
        "options": [
          "Foreign key",
          "Font key",
          "Chart key",
          "Theme key"
        ],
        "answer": "Foreign key"
      },
      "problem": {
        "question": "Data Modeling problem-solving task 7: Explain how you would solve a realistic scenario involving primary key and foreign key. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "primary key",
          "foreign key",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Data Modeling practical/coding task 7: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates foreign key and references. Explain important decisions.",
        "keywords": [
          "foreign key",
          "references"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Data Modeling Portfolio Project 7",
        "brief": "Design an OLTP ER model and an analytics star schema for the same business domain.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "data",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "data_modeling_08",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which model is common in analytics warehouses? Scenario set 8.",
        "options": [
          "Star schema",
          "Random graph only",
          "Plain text",
          "No schema"
        ],
        "answer": "Star schema"
      },
      "problem": {
        "question": "Data Modeling problem-solving task 8: Explain how you would solve a realistic scenario involving normalize and redundancy. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "normalize",
          "redundancy",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Data Modeling practical/coding task 8: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates fact and dimension. Explain important decisions.",
        "keywords": [
          "fact",
          "dimension"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Data Modeling Portfolio Project 8",
        "brief": "Create a university data model covering students, courses, enrollment, attendance and results.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "data",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "data_modeling_09",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Why is normalization used in transactional models? Scenario set 9.",
        "options": [
          "Reduce redundancy and update anomalies",
          "Add duplicate data",
          "Remove all keys",
          "Prevent queries"
        ],
        "answer": "Reduce redundancy and update anomalies"
      },
      "problem": {
        "question": "Data Modeling problem-solving task 9: Explain how you would solve a realistic scenario involving fact and dimension. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "fact",
          "dimension",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Data Modeling practical/coding task 9: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates normalize and table. Explain important decisions.",
        "keywords": [
          "normalize",
          "table"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Data Modeling Portfolio Project 9",
        "brief": "Design a retail star schema with fact sales and reusable dimensions.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "data",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "data_modeling_10",
      "difficulty": "Foundation",
      "quiz": {
        "question": "What does an ER diagram represent? Scenario set 10.",
        "options": [
          "Entities and relationships",
          "CPU instructions",
          "Image pixels",
          "CSS animations"
        ],
        "answer": "Entities and relationships"
      },
      "problem": {
        "question": "Data Modeling problem-solving task 10: Explain how you would solve a realistic scenario involving star and schema. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "star",
          "schema",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Data Modeling practical/coding task 10: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates schema and relationship. Explain important decisions.",
        "keywords": [
          "schema",
          "relationship"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Data Modeling Portfolio Project 10",
        "brief": "Design an OLTP ER model and an analytics star schema for the same business domain.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "data",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "data_modeling_11",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which key uniquely identifies a table row? Scenario set 11.",
        "options": [
          "Primary key",
          "Foreign key only",
          "Color key",
          "Sort icon"
        ],
        "answer": "Primary key"
      },
      "problem": {
        "question": "Data Modeling problem-solving task 11: Explain how you would solve a realistic scenario involving entity and relationship. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "entity",
          "relationship",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Data Modeling practical/coding task 11: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates create table and primary key. Explain important decisions.",
        "keywords": [
          "create table",
          "primary key"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Data Modeling Portfolio Project 11",
        "brief": "Create a university data model covering students, courses, enrollment, attendance and results.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "data",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "data_modeling_12",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which key references another table? Scenario set 12.",
        "options": [
          "Foreign key",
          "Font key",
          "Chart key",
          "Theme key"
        ],
        "answer": "Foreign key"
      },
      "problem": {
        "question": "Data Modeling problem-solving task 12: Explain how you would solve a realistic scenario involving primary key and foreign key. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "primary key",
          "foreign key",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Data Modeling practical/coding task 12: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates foreign key and references. Explain important decisions.",
        "keywords": [
          "foreign key",
          "references"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Data Modeling Portfolio Project 12",
        "brief": "Design a retail star schema with fact sales and reusable dimensions.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "data",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "data_modeling_13",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which model is common in analytics warehouses? Scenario set 13.",
        "options": [
          "Star schema",
          "Random graph only",
          "Plain text",
          "No schema"
        ],
        "answer": "Star schema"
      },
      "problem": {
        "question": "Data Modeling problem-solving task 13: Explain how you would solve a realistic scenario involving normalize and redundancy. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "normalize",
          "redundancy",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Data Modeling practical/coding task 13: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates fact and dimension. Explain important decisions.",
        "keywords": [
          "fact",
          "dimension"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Data Modeling Portfolio Project 13",
        "brief": "Design an OLTP ER model and an analytics star schema for the same business domain.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "data",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "data_modeling_14",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Why is normalization used in transactional models? Scenario set 14.",
        "options": [
          "Reduce redundancy and update anomalies",
          "Add duplicate data",
          "Remove all keys",
          "Prevent queries"
        ],
        "answer": "Reduce redundancy and update anomalies"
      },
      "problem": {
        "question": "Data Modeling problem-solving task 14: Explain how you would solve a realistic scenario involving fact and dimension. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "fact",
          "dimension",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Data Modeling practical/coding task 14: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates normalize and table. Explain important decisions.",
        "keywords": [
          "normalize",
          "table"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Data Modeling Portfolio Project 14",
        "brief": "Create a university data model covering students, courses, enrollment, attendance and results.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "data",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "data_modeling_15",
      "difficulty": "Advanced",
      "quiz": {
        "question": "What does an ER diagram represent? Scenario set 15.",
        "options": [
          "Entities and relationships",
          "CPU instructions",
          "Image pixels",
          "CSS animations"
        ],
        "answer": "Entities and relationships"
      },
      "problem": {
        "question": "Data Modeling problem-solving task 15: Explain how you would solve a realistic scenario involving star and schema. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "star",
          "schema",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Data Modeling practical/coding task 15: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates schema and relationship. Explain important decisions.",
        "keywords": [
          "schema",
          "relationship"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Data Modeling Portfolio Project 15",
        "brief": "Design a retail star schema with fact sales and reusable dimensions.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "data",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "data_modeling_16",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which key uniquely identifies a table row? Scenario set 16.",
        "options": [
          "Primary key",
          "Foreign key only",
          "Color key",
          "Sort icon"
        ],
        "answer": "Primary key"
      },
      "problem": {
        "question": "Data Modeling problem-solving task 16: Explain how you would solve a realistic scenario involving entity and relationship. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "entity",
          "relationship",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Data Modeling practical/coding task 16: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates create table and primary key. Explain important decisions.",
        "keywords": [
          "create table",
          "primary key"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Data Modeling Portfolio Project 16",
        "brief": "Design an OLTP ER model and an analytics star schema for the same business domain.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "data",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "data_modeling_17",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which key references another table? Scenario set 17.",
        "options": [
          "Foreign key",
          "Font key",
          "Chart key",
          "Theme key"
        ],
        "answer": "Foreign key"
      },
      "problem": {
        "question": "Data Modeling problem-solving task 17: Explain how you would solve a realistic scenario involving primary key and foreign key. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "primary key",
          "foreign key",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Data Modeling practical/coding task 17: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates foreign key and references. Explain important decisions.",
        "keywords": [
          "foreign key",
          "references"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Data Modeling Portfolio Project 17",
        "brief": "Create a university data model covering students, courses, enrollment, attendance and results.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "data",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "data_modeling_18",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which model is common in analytics warehouses? Scenario set 18.",
        "options": [
          "Star schema",
          "Random graph only",
          "Plain text",
          "No schema"
        ],
        "answer": "Star schema"
      },
      "problem": {
        "question": "Data Modeling problem-solving task 18: Explain how you would solve a realistic scenario involving normalize and redundancy. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "normalize",
          "redundancy",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Data Modeling practical/coding task 18: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates fact and dimension. Explain important decisions.",
        "keywords": [
          "fact",
          "dimension"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Data Modeling Portfolio Project 18",
        "brief": "Design a retail star schema with fact sales and reusable dimensions.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "data",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    }
  ],
  "Generative AI": [
    {
      "id": "generative_ai_01",
      "difficulty": "Foundation",
      "quiz": {
        "question": "What does RAG commonly combine with generation?",
        "options": [
          "Retrieved external context",
          "Random colors",
          "Database deletion",
          "Image resizing only"
        ],
        "answer": "Retrieved external context"
      },
      "problem": {
        "question": "Generative AI problem-solving task 1: Explain how you would solve a realistic scenario involving rag and retrieval. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "rag",
          "retrieval",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Generative AI practical/coding task 1: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates prompt and response. Explain important decisions.",
        "keywords": [
          "prompt",
          "response"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Generative AI Portfolio Project 1",
        "brief": "Build a grounded assistant that retrieves context, calls an LLM and records evaluation results.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "generative",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "generative_ai_02",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "What are embeddings typically used to represent?",
        "options": [
          "Semantic vectors",
          "Passwords in plain text",
          "CSS colors only",
          "CPU clocks"
        ],
        "answer": "Semantic vectors"
      },
      "problem": {
        "question": "Generative AI problem-solving task 2: Explain how you would solve a realistic scenario involving embedding and similarity. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "embedding",
          "similarity",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Generative AI practical/coding task 2: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates embedding and vector. Explain important decisions.",
        "keywords": [
          "embedding",
          "vector"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Generative AI Portfolio Project 2",
        "brief": "Create a small RAG prototype using embeddings and semantic search.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "generative",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "generative_ai_03",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which practice helps reduce unsupported LLM claims?",
        "options": [
          "Grounding and evaluation",
          "Increasing temperature only",
          "Removing context",
          "Skipping validation"
        ],
        "answer": "Grounding and evaluation"
      },
      "problem": {
        "question": "Generative AI problem-solving task 3: Explain how you would solve a realistic scenario involving prompt and context. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "prompt",
          "context",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Generative AI practical/coding task 3: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates retrieve and context. Explain important decisions.",
        "keywords": [
          "retrieve",
          "context"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Generative AI Portfolio Project 3",
        "brief": "Design an LLM evaluation harness for answer quality, grounding and latency.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "generative",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "generative_ai_04",
      "difficulty": "Foundation",
      "quiz": {
        "question": "What does prompt engineering focus on?",
        "options": [
          "Designing instructions and context for model behavior",
          "Changing monitor brightness",
          "Compiling kernels",
          "Formatting disks"
        ],
        "answer": "Designing instructions and context for model behavior"
      },
      "problem": {
        "question": "Generative AI problem-solving task 4: Explain how you would solve a realistic scenario involving evaluate and hallucination. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "evaluate",
          "hallucination",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Generative AI practical/coding task 4: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates api and model. Explain important decisions.",
        "keywords": [
          "api",
          "model"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Generative AI Portfolio Project 4",
        "brief": "Build a grounded assistant that retrieves context, calls an LLM and records evaluation results.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "generative",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "generative_ai_05",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which component often stores vectors for semantic retrieval?",
        "options": [
          "Vector database",
          "Spreadsheet theme",
          "DNS cache only",
          "Printer queue"
        ],
        "answer": "Vector database"
      },
      "problem": {
        "question": "Generative AI problem-solving task 5: Explain how you would solve a realistic scenario involving vector and search. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "vector",
          "search",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Generative AI practical/coding task 5: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates evaluate and output. Explain important decisions.",
        "keywords": [
          "evaluate",
          "output"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Generative AI Portfolio Project 5",
        "brief": "Create a small RAG prototype using embeddings and semantic search.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "generative",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "generative_ai_06",
      "difficulty": "Advanced",
      "quiz": {
        "question": "What does RAG commonly combine with generation? Scenario set 6.",
        "options": [
          "Retrieved external context",
          "Random colors",
          "Database deletion",
          "Image resizing only"
        ],
        "answer": "Retrieved external context"
      },
      "problem": {
        "question": "Generative AI problem-solving task 6: Explain how you would solve a realistic scenario involving rag and retrieval. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "rag",
          "retrieval",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Generative AI practical/coding task 6: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates prompt and response. Explain important decisions.",
        "keywords": [
          "prompt",
          "response"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Generative AI Portfolio Project 6",
        "brief": "Design an LLM evaluation harness for answer quality, grounding and latency.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "generative",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "generative_ai_07",
      "difficulty": "Foundation",
      "quiz": {
        "question": "What are embeddings typically used to represent? Scenario set 7.",
        "options": [
          "Semantic vectors",
          "Passwords in plain text",
          "CSS colors only",
          "CPU clocks"
        ],
        "answer": "Semantic vectors"
      },
      "problem": {
        "question": "Generative AI problem-solving task 7: Explain how you would solve a realistic scenario involving embedding and similarity. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "embedding",
          "similarity",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Generative AI practical/coding task 7: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates embedding and vector. Explain important decisions.",
        "keywords": [
          "embedding",
          "vector"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Generative AI Portfolio Project 7",
        "brief": "Build a grounded assistant that retrieves context, calls an LLM and records evaluation results.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "generative",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "generative_ai_08",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which practice helps reduce unsupported LLM claims? Scenario set 8.",
        "options": [
          "Grounding and evaluation",
          "Increasing temperature only",
          "Removing context",
          "Skipping validation"
        ],
        "answer": "Grounding and evaluation"
      },
      "problem": {
        "question": "Generative AI problem-solving task 8: Explain how you would solve a realistic scenario involving prompt and context. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "prompt",
          "context",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Generative AI practical/coding task 8: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates retrieve and context. Explain important decisions.",
        "keywords": [
          "retrieve",
          "context"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Generative AI Portfolio Project 8",
        "brief": "Create a small RAG prototype using embeddings and semantic search.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "generative",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "generative_ai_09",
      "difficulty": "Advanced",
      "quiz": {
        "question": "What does prompt engineering focus on? Scenario set 9.",
        "options": [
          "Designing instructions and context for model behavior",
          "Changing monitor brightness",
          "Compiling kernels",
          "Formatting disks"
        ],
        "answer": "Designing instructions and context for model behavior"
      },
      "problem": {
        "question": "Generative AI problem-solving task 9: Explain how you would solve a realistic scenario involving evaluate and hallucination. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "evaluate",
          "hallucination",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Generative AI practical/coding task 9: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates api and model. Explain important decisions.",
        "keywords": [
          "api",
          "model"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Generative AI Portfolio Project 9",
        "brief": "Design an LLM evaluation harness for answer quality, grounding and latency.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "generative",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "generative_ai_10",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which component often stores vectors for semantic retrieval? Scenario set 10.",
        "options": [
          "Vector database",
          "Spreadsheet theme",
          "DNS cache only",
          "Printer queue"
        ],
        "answer": "Vector database"
      },
      "problem": {
        "question": "Generative AI problem-solving task 10: Explain how you would solve a realistic scenario involving vector and search. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "vector",
          "search",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Generative AI practical/coding task 10: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates evaluate and output. Explain important decisions.",
        "keywords": [
          "evaluate",
          "output"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Generative AI Portfolio Project 10",
        "brief": "Build a grounded assistant that retrieves context, calls an LLM and records evaluation results.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "generative",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "generative_ai_11",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "What does RAG commonly combine with generation? Scenario set 11.",
        "options": [
          "Retrieved external context",
          "Random colors",
          "Database deletion",
          "Image resizing only"
        ],
        "answer": "Retrieved external context"
      },
      "problem": {
        "question": "Generative AI problem-solving task 11: Explain how you would solve a realistic scenario involving rag and retrieval. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "rag",
          "retrieval",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Generative AI practical/coding task 11: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates prompt and response. Explain important decisions.",
        "keywords": [
          "prompt",
          "response"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Generative AI Portfolio Project 11",
        "brief": "Create a small RAG prototype using embeddings and semantic search.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "generative",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "generative_ai_12",
      "difficulty": "Advanced",
      "quiz": {
        "question": "What are embeddings typically used to represent? Scenario set 12.",
        "options": [
          "Semantic vectors",
          "Passwords in plain text",
          "CSS colors only",
          "CPU clocks"
        ],
        "answer": "Semantic vectors"
      },
      "problem": {
        "question": "Generative AI problem-solving task 12: Explain how you would solve a realistic scenario involving embedding and similarity. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "embedding",
          "similarity",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Generative AI practical/coding task 12: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates embedding and vector. Explain important decisions.",
        "keywords": [
          "embedding",
          "vector"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Generative AI Portfolio Project 12",
        "brief": "Design an LLM evaluation harness for answer quality, grounding and latency.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "generative",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "generative_ai_13",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which practice helps reduce unsupported LLM claims? Scenario set 13.",
        "options": [
          "Grounding and evaluation",
          "Increasing temperature only",
          "Removing context",
          "Skipping validation"
        ],
        "answer": "Grounding and evaluation"
      },
      "problem": {
        "question": "Generative AI problem-solving task 13: Explain how you would solve a realistic scenario involving prompt and context. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "prompt",
          "context",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Generative AI practical/coding task 13: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates retrieve and context. Explain important decisions.",
        "keywords": [
          "retrieve",
          "context"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Generative AI Portfolio Project 13",
        "brief": "Build a grounded assistant that retrieves context, calls an LLM and records evaluation results.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "generative",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "generative_ai_14",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "What does prompt engineering focus on? Scenario set 14.",
        "options": [
          "Designing instructions and context for model behavior",
          "Changing monitor brightness",
          "Compiling kernels",
          "Formatting disks"
        ],
        "answer": "Designing instructions and context for model behavior"
      },
      "problem": {
        "question": "Generative AI problem-solving task 14: Explain how you would solve a realistic scenario involving evaluate and hallucination. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "evaluate",
          "hallucination",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Generative AI practical/coding task 14: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates api and model. Explain important decisions.",
        "keywords": [
          "api",
          "model"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Generative AI Portfolio Project 14",
        "brief": "Create a small RAG prototype using embeddings and semantic search.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "generative",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "generative_ai_15",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which component often stores vectors for semantic retrieval? Scenario set 15.",
        "options": [
          "Vector database",
          "Spreadsheet theme",
          "DNS cache only",
          "Printer queue"
        ],
        "answer": "Vector database"
      },
      "problem": {
        "question": "Generative AI problem-solving task 15: Explain how you would solve a realistic scenario involving vector and search. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "vector",
          "search",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Generative AI practical/coding task 15: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates evaluate and output. Explain important decisions.",
        "keywords": [
          "evaluate",
          "output"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Generative AI Portfolio Project 15",
        "brief": "Design an LLM evaluation harness for answer quality, grounding and latency.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "generative",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "generative_ai_16",
      "difficulty": "Foundation",
      "quiz": {
        "question": "What does RAG commonly combine with generation? Scenario set 16.",
        "options": [
          "Retrieved external context",
          "Random colors",
          "Database deletion",
          "Image resizing only"
        ],
        "answer": "Retrieved external context"
      },
      "problem": {
        "question": "Generative AI problem-solving task 16: Explain how you would solve a realistic scenario involving rag and retrieval. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "rag",
          "retrieval",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Generative AI practical/coding task 16: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates prompt and response. Explain important decisions.",
        "keywords": [
          "prompt",
          "response"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Generative AI Portfolio Project 16",
        "brief": "Build a grounded assistant that retrieves context, calls an LLM and records evaluation results.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "generative",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "generative_ai_17",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "What are embeddings typically used to represent? Scenario set 17.",
        "options": [
          "Semantic vectors",
          "Passwords in plain text",
          "CSS colors only",
          "CPU clocks"
        ],
        "answer": "Semantic vectors"
      },
      "problem": {
        "question": "Generative AI problem-solving task 17: Explain how you would solve a realistic scenario involving embedding and similarity. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "embedding",
          "similarity",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Generative AI practical/coding task 17: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates embedding and vector. Explain important decisions.",
        "keywords": [
          "embedding",
          "vector"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Generative AI Portfolio Project 17",
        "brief": "Create a small RAG prototype using embeddings and semantic search.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "generative",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "generative_ai_18",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which practice helps reduce unsupported LLM claims? Scenario set 18.",
        "options": [
          "Grounding and evaluation",
          "Increasing temperature only",
          "Removing context",
          "Skipping validation"
        ],
        "answer": "Grounding and evaluation"
      },
      "problem": {
        "question": "Generative AI problem-solving task 18: Explain how you would solve a realistic scenario involving prompt and context. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "prompt",
          "context",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Generative AI practical/coding task 18: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates retrieve and context. Explain important decisions.",
        "keywords": [
          "retrieve",
          "context"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Generative AI Portfolio Project 18",
        "brief": "Design an LLM evaluation harness for answer quality, grounding and latency.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "generative",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    }
  ],
  "Product Analytics": [
    {
      "id": "product_analytics_01",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which metric shows users who continue returning over time?",
        "options": [
          "Retention",
          "CPU speed",
          "File size",
          "Color depth"
        ],
        "answer": "Retention"
      },
      "problem": {
        "question": "Product Analytics problem-solving task 1: Explain how you would solve a realistic scenario involving funnel and conversion. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "funnel",
          "conversion",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Product Analytics practical/coding task 1: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates groupby and cohort. Explain important decisions.",
        "keywords": [
          "groupby",
          "cohort"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Product Analytics Portfolio Project 1",
        "brief": "Analyze a product funnel, build retention cohorts and recommend one experiment.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "product",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "product_analytics_02",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which analysis follows users through sequential steps?",
        "options": [
          "Funnel analysis",
          "Image crop",
          "DNS lookup",
          "Sorting only"
        ],
        "answer": "Funnel analysis"
      },
      "problem": {
        "question": "Product Analytics problem-solving task 2: Explain how you would solve a realistic scenario involving retention and cohort. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "retention",
          "cohort",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Product Analytics practical/coding task 2: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates conversion and funnel. Explain important decisions.",
        "keywords": [
          "conversion",
          "funnel"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Product Analytics Portfolio Project 2",
        "brief": "Create a product KPI dashboard with activation, retention and conversion metrics.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "product",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "product_analytics_03",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which method groups users by a shared start period?",
        "options": [
          "Cohort analysis",
          "Random merge",
          "Static export",
          "Text wrapping"
        ],
        "answer": "Cohort analysis"
      },
      "problem": {
        "question": "Product Analytics problem-solving task 3: Explain how you would solve a realistic scenario involving experiment and variant. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "experiment",
          "variant",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Product Analytics practical/coding task 3: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates ab and test. Explain important decisions.",
        "keywords": [
          "ab",
          "test"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Product Analytics Portfolio Project 3",
        "brief": "Design an A/B experiment plan with success metric, guardrail and sample assumptions.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "product",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "product_analytics_04",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which method can evaluate causal impact when properly designed?",
        "options": [
          "A/B experiment",
          "Screenshot comparison",
          "Manual guess",
          "Color theme"
        ],
        "answer": "A/B experiment"
      },
      "problem": {
        "question": "Product Analytics problem-solving task 4: Explain how you would solve a realistic scenario involving activation and user. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "activation",
          "user",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Product Analytics practical/coding task 4: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates retention and date. Explain important decisions.",
        "keywords": [
          "retention",
          "date"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Product Analytics Portfolio Project 4",
        "brief": "Analyze a product funnel, build retention cohorts and recommend one experiment.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "product",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "product_analytics_05",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which metric can represent users reaching a product's first key value moment?",
        "options": [
          "Activation",
          "Pagination",
          "Storage size",
          "Latency only"
        ],
        "answer": "Activation"
      },
      "problem": {
        "question": "Product Analytics problem-solving task 5: Explain how you would solve a realistic scenario involving metric and product. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "metric",
          "product",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Product Analytics practical/coding task 5: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates event and user. Explain important decisions.",
        "keywords": [
          "event",
          "user"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Product Analytics Portfolio Project 5",
        "brief": "Create a product KPI dashboard with activation, retention and conversion metrics.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "product",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "product_analytics_06",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which metric shows users who continue returning over time? Scenario set 6.",
        "options": [
          "Retention",
          "CPU speed",
          "File size",
          "Color depth"
        ],
        "answer": "Retention"
      },
      "problem": {
        "question": "Product Analytics problem-solving task 6: Explain how you would solve a realistic scenario involving funnel and conversion. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "funnel",
          "conversion",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Product Analytics practical/coding task 6: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates groupby and cohort. Explain important decisions.",
        "keywords": [
          "groupby",
          "cohort"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Product Analytics Portfolio Project 6",
        "brief": "Design an A/B experiment plan with success metric, guardrail and sample assumptions.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "product",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "product_analytics_07",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which analysis follows users through sequential steps? Scenario set 7.",
        "options": [
          "Funnel analysis",
          "Image crop",
          "DNS lookup",
          "Sorting only"
        ],
        "answer": "Funnel analysis"
      },
      "problem": {
        "question": "Product Analytics problem-solving task 7: Explain how you would solve a realistic scenario involving retention and cohort. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "retention",
          "cohort",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Product Analytics practical/coding task 7: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates conversion and funnel. Explain important decisions.",
        "keywords": [
          "conversion",
          "funnel"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Product Analytics Portfolio Project 7",
        "brief": "Analyze a product funnel, build retention cohorts and recommend one experiment.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "product",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "product_analytics_08",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which method groups users by a shared start period? Scenario set 8.",
        "options": [
          "Cohort analysis",
          "Random merge",
          "Static export",
          "Text wrapping"
        ],
        "answer": "Cohort analysis"
      },
      "problem": {
        "question": "Product Analytics problem-solving task 8: Explain how you would solve a realistic scenario involving experiment and variant. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "experiment",
          "variant",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Product Analytics practical/coding task 8: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates ab and test. Explain important decisions.",
        "keywords": [
          "ab",
          "test"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Product Analytics Portfolio Project 8",
        "brief": "Create a product KPI dashboard with activation, retention and conversion metrics.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "product",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "product_analytics_09",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which method can evaluate causal impact when properly designed? Scenario set 9.",
        "options": [
          "A/B experiment",
          "Screenshot comparison",
          "Manual guess",
          "Color theme"
        ],
        "answer": "A/B experiment"
      },
      "problem": {
        "question": "Product Analytics problem-solving task 9: Explain how you would solve a realistic scenario involving activation and user. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "activation",
          "user",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Product Analytics practical/coding task 9: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates retention and date. Explain important decisions.",
        "keywords": [
          "retention",
          "date"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Product Analytics Portfolio Project 9",
        "brief": "Design an A/B experiment plan with success metric, guardrail and sample assumptions.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "product",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "product_analytics_10",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which metric can represent users reaching a product's first key value moment? Scenario set 10.",
        "options": [
          "Activation",
          "Pagination",
          "Storage size",
          "Latency only"
        ],
        "answer": "Activation"
      },
      "problem": {
        "question": "Product Analytics problem-solving task 10: Explain how you would solve a realistic scenario involving metric and product. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "metric",
          "product",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Product Analytics practical/coding task 10: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates event and user. Explain important decisions.",
        "keywords": [
          "event",
          "user"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Product Analytics Portfolio Project 10",
        "brief": "Analyze a product funnel, build retention cohorts and recommend one experiment.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "product",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "product_analytics_11",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which metric shows users who continue returning over time? Scenario set 11.",
        "options": [
          "Retention",
          "CPU speed",
          "File size",
          "Color depth"
        ],
        "answer": "Retention"
      },
      "problem": {
        "question": "Product Analytics problem-solving task 11: Explain how you would solve a realistic scenario involving funnel and conversion. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "funnel",
          "conversion",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Product Analytics practical/coding task 11: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates groupby and cohort. Explain important decisions.",
        "keywords": [
          "groupby",
          "cohort"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Product Analytics Portfolio Project 11",
        "brief": "Create a product KPI dashboard with activation, retention and conversion metrics.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "product",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "product_analytics_12",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which analysis follows users through sequential steps? Scenario set 12.",
        "options": [
          "Funnel analysis",
          "Image crop",
          "DNS lookup",
          "Sorting only"
        ],
        "answer": "Funnel analysis"
      },
      "problem": {
        "question": "Product Analytics problem-solving task 12: Explain how you would solve a realistic scenario involving retention and cohort. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "retention",
          "cohort",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Product Analytics practical/coding task 12: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates conversion and funnel. Explain important decisions.",
        "keywords": [
          "conversion",
          "funnel"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Product Analytics Portfolio Project 12",
        "brief": "Design an A/B experiment plan with success metric, guardrail and sample assumptions.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "product",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "product_analytics_13",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which method groups users by a shared start period? Scenario set 13.",
        "options": [
          "Cohort analysis",
          "Random merge",
          "Static export",
          "Text wrapping"
        ],
        "answer": "Cohort analysis"
      },
      "problem": {
        "question": "Product Analytics problem-solving task 13: Explain how you would solve a realistic scenario involving experiment and variant. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "experiment",
          "variant",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Product Analytics practical/coding task 13: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates ab and test. Explain important decisions.",
        "keywords": [
          "ab",
          "test"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Product Analytics Portfolio Project 13",
        "brief": "Analyze a product funnel, build retention cohorts and recommend one experiment.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "product",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "product_analytics_14",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which method can evaluate causal impact when properly designed? Scenario set 14.",
        "options": [
          "A/B experiment",
          "Screenshot comparison",
          "Manual guess",
          "Color theme"
        ],
        "answer": "A/B experiment"
      },
      "problem": {
        "question": "Product Analytics problem-solving task 14: Explain how you would solve a realistic scenario involving activation and user. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "activation",
          "user",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Product Analytics practical/coding task 14: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates retention and date. Explain important decisions.",
        "keywords": [
          "retention",
          "date"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Product Analytics Portfolio Project 14",
        "brief": "Create a product KPI dashboard with activation, retention and conversion metrics.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "product",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "product_analytics_15",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which metric can represent users reaching a product's first key value moment? Scenario set 15.",
        "options": [
          "Activation",
          "Pagination",
          "Storage size",
          "Latency only"
        ],
        "answer": "Activation"
      },
      "problem": {
        "question": "Product Analytics problem-solving task 15: Explain how you would solve a realistic scenario involving metric and product. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "metric",
          "product",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Product Analytics practical/coding task 15: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates event and user. Explain important decisions.",
        "keywords": [
          "event",
          "user"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Product Analytics Portfolio Project 15",
        "brief": "Design an A/B experiment plan with success metric, guardrail and sample assumptions.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "product",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "product_analytics_16",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which metric shows users who continue returning over time? Scenario set 16.",
        "options": [
          "Retention",
          "CPU speed",
          "File size",
          "Color depth"
        ],
        "answer": "Retention"
      },
      "problem": {
        "question": "Product Analytics problem-solving task 16: Explain how you would solve a realistic scenario involving funnel and conversion. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "funnel",
          "conversion",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Product Analytics practical/coding task 16: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates groupby and cohort. Explain important decisions.",
        "keywords": [
          "groupby",
          "cohort"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Product Analytics Portfolio Project 16",
        "brief": "Analyze a product funnel, build retention cohorts and recommend one experiment.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "product",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "product_analytics_17",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which analysis follows users through sequential steps? Scenario set 17.",
        "options": [
          "Funnel analysis",
          "Image crop",
          "DNS lookup",
          "Sorting only"
        ],
        "answer": "Funnel analysis"
      },
      "problem": {
        "question": "Product Analytics problem-solving task 17: Explain how you would solve a realistic scenario involving retention and cohort. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "retention",
          "cohort",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Product Analytics practical/coding task 17: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates conversion and funnel. Explain important decisions.",
        "keywords": [
          "conversion",
          "funnel"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Product Analytics Portfolio Project 17",
        "brief": "Create a product KPI dashboard with activation, retention and conversion metrics.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "product",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "product_analytics_18",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which method groups users by a shared start period? Scenario set 18.",
        "options": [
          "Cohort analysis",
          "Random merge",
          "Static export",
          "Text wrapping"
        ],
        "answer": "Cohort analysis"
      },
      "problem": {
        "question": "Product Analytics problem-solving task 18: Explain how you would solve a realistic scenario involving experiment and variant. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "experiment",
          "variant",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Product Analytics practical/coding task 18: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates ab and test. Explain important decisions.",
        "keywords": [
          "ab",
          "test"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Product Analytics Portfolio Project 18",
        "brief": "Design an A/B experiment plan with success metric, guardrail and sample assumptions.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "product",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    }
  ],
  "Marketing Analytics": [
    {
      "id": "marketing_analytics_01",
      "difficulty": "Foundation",
      "quiz": {
        "question": "What does ROAS measure?",
        "options": [
          "Revenue relative to advertising spend",
          "Rows in a spreadsheet",
          "Server uptime",
          "Image resolution"
        ],
        "answer": "Revenue relative to advertising spend"
      },
      "problem": {
        "question": "Marketing Analytics problem-solving task 1: Explain how you would solve a realistic scenario involving roas and spend. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "roas",
          "spend",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Marketing Analytics practical/coding task 1: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates revenue and spend. Explain important decisions.",
        "keywords": [
          "revenue",
          "spend"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Marketing Analytics Portfolio Project 1",
        "brief": "Build a campaign-performance dashboard and recommend a budget reallocation using ROAS and CAC.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "marketing",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "marketing_analytics_02",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "What does CAC represent?",
        "options": [
          "Customer acquisition cost",
          "Cloud access control",
          "Chart axis color",
          "Code accuracy count"
        ],
        "answer": "Customer acquisition cost"
      },
      "problem": {
        "question": "Marketing Analytics problem-solving task 2: Explain how you would solve a realistic scenario involving cac and customer. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "cac",
          "customer",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Marketing Analytics practical/coding task 2: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates cost and customer. Explain important decisions.",
        "keywords": [
          "cost",
          "customer"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Marketing Analytics Portfolio Project 2",
        "brief": "Analyze channel conversion and customer segments to recommend a growth action.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "marketing",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "marketing_analytics_03",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which metric measures visitors who complete a desired action?",
        "options": [
          "Conversion rate",
          "Refresh rate",
          "Frame rate",
          "Clock speed"
        ],
        "answer": "Conversion rate"
      },
      "problem": {
        "question": "Marketing Analytics problem-solving task 3: Explain how you would solve a realistic scenario involving conversion and rate. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "conversion",
          "rate",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Marketing Analytics practical/coding task 3: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates conversion and visits. Explain important decisions.",
        "keywords": [
          "conversion",
          "visits"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Marketing Analytics Portfolio Project 3",
        "brief": "Create a marketing attribution comparison and explain its limitations.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "marketing",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "marketing_analytics_04",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Why segment customers?",
        "options": [
          "To analyze groups with different behavior",
          "To remove all variation",
          "To avoid targeting",
          "To disable measurement"
        ],
        "answer": "To analyze groups with different behavior"
      },
      "problem": {
        "question": "Marketing Analytics problem-solving task 4: Explain how you would solve a realistic scenario involving segment and audience. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "segment",
          "audience",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Marketing Analytics practical/coding task 4: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates groupby and segment. Explain important decisions.",
        "keywords": [
          "groupby",
          "segment"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Marketing Analytics Portfolio Project 4",
        "brief": "Build a campaign-performance dashboard and recommend a budget reallocation using ROAS and CAC.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "marketing",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "marketing_analytics_05",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "What does attribution attempt to estimate?",
        "options": [
          "Which touchpoints contributed to conversion",
          "CPU temperature",
          "File ownership only",
          "Screen brightness"
        ],
        "answer": "Which touchpoints contributed to conversion"
      },
      "problem": {
        "question": "Marketing Analytics problem-solving task 5: Explain how you would solve a realistic scenario involving attribution and channel. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "attribution",
          "channel",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Marketing Analytics practical/coding task 5: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates channel and revenue. Explain important decisions.",
        "keywords": [
          "channel",
          "revenue"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Marketing Analytics Portfolio Project 5",
        "brief": "Analyze channel conversion and customer segments to recommend a growth action.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "marketing",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "marketing_analytics_06",
      "difficulty": "Advanced",
      "quiz": {
        "question": "What does ROAS measure? Scenario set 6.",
        "options": [
          "Revenue relative to advertising spend",
          "Rows in a spreadsheet",
          "Server uptime",
          "Image resolution"
        ],
        "answer": "Revenue relative to advertising spend"
      },
      "problem": {
        "question": "Marketing Analytics problem-solving task 6: Explain how you would solve a realistic scenario involving roas and spend. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "roas",
          "spend",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Marketing Analytics practical/coding task 6: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates revenue and spend. Explain important decisions.",
        "keywords": [
          "revenue",
          "spend"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Marketing Analytics Portfolio Project 6",
        "brief": "Create a marketing attribution comparison and explain its limitations.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "marketing",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "marketing_analytics_07",
      "difficulty": "Foundation",
      "quiz": {
        "question": "What does CAC represent? Scenario set 7.",
        "options": [
          "Customer acquisition cost",
          "Cloud access control",
          "Chart axis color",
          "Code accuracy count"
        ],
        "answer": "Customer acquisition cost"
      },
      "problem": {
        "question": "Marketing Analytics problem-solving task 7: Explain how you would solve a realistic scenario involving cac and customer. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "cac",
          "customer",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Marketing Analytics practical/coding task 7: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates cost and customer. Explain important decisions.",
        "keywords": [
          "cost",
          "customer"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Marketing Analytics Portfolio Project 7",
        "brief": "Build a campaign-performance dashboard and recommend a budget reallocation using ROAS and CAC.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "marketing",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "marketing_analytics_08",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which metric measures visitors who complete a desired action? Scenario set 8.",
        "options": [
          "Conversion rate",
          "Refresh rate",
          "Frame rate",
          "Clock speed"
        ],
        "answer": "Conversion rate"
      },
      "problem": {
        "question": "Marketing Analytics problem-solving task 8: Explain how you would solve a realistic scenario involving conversion and rate. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "conversion",
          "rate",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Marketing Analytics practical/coding task 8: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates conversion and visits. Explain important decisions.",
        "keywords": [
          "conversion",
          "visits"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Marketing Analytics Portfolio Project 8",
        "brief": "Analyze channel conversion and customer segments to recommend a growth action.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "marketing",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "marketing_analytics_09",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Why segment customers? Scenario set 9.",
        "options": [
          "To analyze groups with different behavior",
          "To remove all variation",
          "To avoid targeting",
          "To disable measurement"
        ],
        "answer": "To analyze groups with different behavior"
      },
      "problem": {
        "question": "Marketing Analytics problem-solving task 9: Explain how you would solve a realistic scenario involving segment and audience. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "segment",
          "audience",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Marketing Analytics practical/coding task 9: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates groupby and segment. Explain important decisions.",
        "keywords": [
          "groupby",
          "segment"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Marketing Analytics Portfolio Project 9",
        "brief": "Create a marketing attribution comparison and explain its limitations.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "marketing",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "marketing_analytics_10",
      "difficulty": "Foundation",
      "quiz": {
        "question": "What does attribution attempt to estimate? Scenario set 10.",
        "options": [
          "Which touchpoints contributed to conversion",
          "CPU temperature",
          "File ownership only",
          "Screen brightness"
        ],
        "answer": "Which touchpoints contributed to conversion"
      },
      "problem": {
        "question": "Marketing Analytics problem-solving task 10: Explain how you would solve a realistic scenario involving attribution and channel. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "attribution",
          "channel",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Marketing Analytics practical/coding task 10: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates channel and revenue. Explain important decisions.",
        "keywords": [
          "channel",
          "revenue"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Marketing Analytics Portfolio Project 10",
        "brief": "Build a campaign-performance dashboard and recommend a budget reallocation using ROAS and CAC.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "marketing",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "marketing_analytics_11",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "What does ROAS measure? Scenario set 11.",
        "options": [
          "Revenue relative to advertising spend",
          "Rows in a spreadsheet",
          "Server uptime",
          "Image resolution"
        ],
        "answer": "Revenue relative to advertising spend"
      },
      "problem": {
        "question": "Marketing Analytics problem-solving task 11: Explain how you would solve a realistic scenario involving roas and spend. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "roas",
          "spend",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Marketing Analytics practical/coding task 11: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates revenue and spend. Explain important decisions.",
        "keywords": [
          "revenue",
          "spend"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Marketing Analytics Portfolio Project 11",
        "brief": "Analyze channel conversion and customer segments to recommend a growth action.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "marketing",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "marketing_analytics_12",
      "difficulty": "Advanced",
      "quiz": {
        "question": "What does CAC represent? Scenario set 12.",
        "options": [
          "Customer acquisition cost",
          "Cloud access control",
          "Chart axis color",
          "Code accuracy count"
        ],
        "answer": "Customer acquisition cost"
      },
      "problem": {
        "question": "Marketing Analytics problem-solving task 12: Explain how you would solve a realistic scenario involving cac and customer. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "cac",
          "customer",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Marketing Analytics practical/coding task 12: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates cost and customer. Explain important decisions.",
        "keywords": [
          "cost",
          "customer"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Marketing Analytics Portfolio Project 12",
        "brief": "Create a marketing attribution comparison and explain its limitations.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "marketing",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "marketing_analytics_13",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which metric measures visitors who complete a desired action? Scenario set 13.",
        "options": [
          "Conversion rate",
          "Refresh rate",
          "Frame rate",
          "Clock speed"
        ],
        "answer": "Conversion rate"
      },
      "problem": {
        "question": "Marketing Analytics problem-solving task 13: Explain how you would solve a realistic scenario involving conversion and rate. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "conversion",
          "rate",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Marketing Analytics practical/coding task 13: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates conversion and visits. Explain important decisions.",
        "keywords": [
          "conversion",
          "visits"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Marketing Analytics Portfolio Project 13",
        "brief": "Build a campaign-performance dashboard and recommend a budget reallocation using ROAS and CAC.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "marketing",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "marketing_analytics_14",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Why segment customers? Scenario set 14.",
        "options": [
          "To analyze groups with different behavior",
          "To remove all variation",
          "To avoid targeting",
          "To disable measurement"
        ],
        "answer": "To analyze groups with different behavior"
      },
      "problem": {
        "question": "Marketing Analytics problem-solving task 14: Explain how you would solve a realistic scenario involving segment and audience. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "segment",
          "audience",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Marketing Analytics practical/coding task 14: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates groupby and segment. Explain important decisions.",
        "keywords": [
          "groupby",
          "segment"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Marketing Analytics Portfolio Project 14",
        "brief": "Analyze channel conversion and customer segments to recommend a growth action.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "marketing",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "marketing_analytics_15",
      "difficulty": "Advanced",
      "quiz": {
        "question": "What does attribution attempt to estimate? Scenario set 15.",
        "options": [
          "Which touchpoints contributed to conversion",
          "CPU temperature",
          "File ownership only",
          "Screen brightness"
        ],
        "answer": "Which touchpoints contributed to conversion"
      },
      "problem": {
        "question": "Marketing Analytics problem-solving task 15: Explain how you would solve a realistic scenario involving attribution and channel. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "attribution",
          "channel",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Marketing Analytics practical/coding task 15: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates channel and revenue. Explain important decisions.",
        "keywords": [
          "channel",
          "revenue"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Marketing Analytics Portfolio Project 15",
        "brief": "Create a marketing attribution comparison and explain its limitations.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "marketing",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "marketing_analytics_16",
      "difficulty": "Foundation",
      "quiz": {
        "question": "What does ROAS measure? Scenario set 16.",
        "options": [
          "Revenue relative to advertising spend",
          "Rows in a spreadsheet",
          "Server uptime",
          "Image resolution"
        ],
        "answer": "Revenue relative to advertising spend"
      },
      "problem": {
        "question": "Marketing Analytics problem-solving task 16: Explain how you would solve a realistic scenario involving roas and spend. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "roas",
          "spend",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Marketing Analytics practical/coding task 16: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates revenue and spend. Explain important decisions.",
        "keywords": [
          "revenue",
          "spend"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Marketing Analytics Portfolio Project 16",
        "brief": "Build a campaign-performance dashboard and recommend a budget reallocation using ROAS and CAC.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "marketing",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "marketing_analytics_17",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "What does CAC represent? Scenario set 17.",
        "options": [
          "Customer acquisition cost",
          "Cloud access control",
          "Chart axis color",
          "Code accuracy count"
        ],
        "answer": "Customer acquisition cost"
      },
      "problem": {
        "question": "Marketing Analytics problem-solving task 17: Explain how you would solve a realistic scenario involving cac and customer. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "cac",
          "customer",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Marketing Analytics practical/coding task 17: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates cost and customer. Explain important decisions.",
        "keywords": [
          "cost",
          "customer"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Marketing Analytics Portfolio Project 17",
        "brief": "Analyze channel conversion and customer segments to recommend a growth action.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "marketing",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "marketing_analytics_18",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which metric measures visitors who complete a desired action? Scenario set 18.",
        "options": [
          "Conversion rate",
          "Refresh rate",
          "Frame rate",
          "Clock speed"
        ],
        "answer": "Conversion rate"
      },
      "problem": {
        "question": "Marketing Analytics problem-solving task 18: Explain how you would solve a realistic scenario involving conversion and rate. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "conversion",
          "rate",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Marketing Analytics practical/coding task 18: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates conversion and visits. Explain important decisions.",
        "keywords": [
          "conversion",
          "visits"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Marketing Analytics Portfolio Project 18",
        "brief": "Create a marketing attribution comparison and explain its limitations.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "marketing",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    }
  ],
  "Data Architecture": [
    {
      "id": "data_architecture_01",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which system is optimized for analytical workloads?",
        "options": [
          "Data warehouse",
          "Keyboard driver",
          "Text editor",
          "Image cache"
        ],
        "answer": "Data warehouse"
      },
      "problem": {
        "question": "Data Architecture problem-solving task 1: Explain how you would solve a realistic scenario involving warehouse and analytics. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "warehouse",
          "analytics",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Data Architecture practical/coding task 1: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates source and warehouse. Explain important decisions.",
        "keywords": [
          "source",
          "warehouse"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Data Architecture Portfolio Project 1",
        "brief": "Design a data platform architecture covering ingestion, storage, BI, ML, governance and security.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "data",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "data_architecture_02",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which architecture often stores raw and diverse data at scale?",
        "options": [
          "Data lake",
          "PivotTable",
          "Browser bookmark",
          "Slide deck"
        ],
        "answer": "Data lake"
      },
      "problem": {
        "question": "Data Architecture problem-solving task 2: Explain how you would solve a realistic scenario involving lake and raw. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "lake",
          "raw",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Data Architecture practical/coding task 2: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates bucket and lake. Explain important decisions.",
        "keywords": [
          "bucket",
          "lake"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Data Architecture Portfolio Project 2",
        "brief": "Create a batch-plus-streaming architecture for an e-commerce analytics platform.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "data",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "data_architecture_03",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which pattern processes events continuously?",
        "options": [
          "Streaming",
          "Batch only",
          "Manual export",
          "Static copy"
        ],
        "answer": "Streaming"
      },
      "problem": {
        "question": "Data Architecture problem-solving task 3: Explain how you would solve a realistic scenario involving stream and event. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "stream",
          "event",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Data Architecture practical/coding task 3: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates stream and consumer. Explain important decisions.",
        "keywords": [
          "stream",
          "consumer"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Data Architecture Portfolio Project 3",
        "brief": "Design a cloud data architecture with IAM, lineage, observability and cost controls.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "data",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "data_architecture_04",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Why use data governance?",
        "options": [
          "To manage quality, ownership, access and policies",
          "To remove security",
          "To prevent documentation",
          "To disable lineage"
        ],
        "answer": "To manage quality, ownership, access and policies"
      },
      "problem": {
        "question": "Data Architecture problem-solving task 4: Explain how you would solve a realistic scenario involving governance and access. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "governance",
          "access",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Data Architecture practical/coding task 4: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates iam and policy. Explain important decisions.",
        "keywords": [
          "iam",
          "policy"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Data Architecture Portfolio Project 4",
        "brief": "Design a data platform architecture covering ingestion, storage, BI, ML, governance and security.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "data",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "data_architecture_05",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "What does scalability mean in architecture?",
        "options": [
          "Ability to handle growing workload",
          "Adding more colors",
          "Reducing labels",
          "Changing fonts"
        ],
        "answer": "Ability to handle growing workload"
      },
      "problem": {
        "question": "Data Architecture problem-solving task 5: Explain how you would solve a realistic scenario involving scale and architecture. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "scale",
          "architecture",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Data Architecture practical/coding task 5: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates partition and scale. Explain important decisions.",
        "keywords": [
          "partition",
          "scale"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Data Architecture Portfolio Project 5",
        "brief": "Create a batch-plus-streaming architecture for an e-commerce analytics platform.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "data",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "data_architecture_06",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which system is optimized for analytical workloads? Scenario set 6.",
        "options": [
          "Data warehouse",
          "Keyboard driver",
          "Text editor",
          "Image cache"
        ],
        "answer": "Data warehouse"
      },
      "problem": {
        "question": "Data Architecture problem-solving task 6: Explain how you would solve a realistic scenario involving warehouse and analytics. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "warehouse",
          "analytics",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Data Architecture practical/coding task 6: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates source and warehouse. Explain important decisions.",
        "keywords": [
          "source",
          "warehouse"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Data Architecture Portfolio Project 6",
        "brief": "Design a cloud data architecture with IAM, lineage, observability and cost controls.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "data",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "data_architecture_07",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which architecture often stores raw and diverse data at scale? Scenario set 7.",
        "options": [
          "Data lake",
          "PivotTable",
          "Browser bookmark",
          "Slide deck"
        ],
        "answer": "Data lake"
      },
      "problem": {
        "question": "Data Architecture problem-solving task 7: Explain how you would solve a realistic scenario involving lake and raw. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "lake",
          "raw",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Data Architecture practical/coding task 7: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates bucket and lake. Explain important decisions.",
        "keywords": [
          "bucket",
          "lake"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Data Architecture Portfolio Project 7",
        "brief": "Design a data platform architecture covering ingestion, storage, BI, ML, governance and security.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "data",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "data_architecture_08",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which pattern processes events continuously? Scenario set 8.",
        "options": [
          "Streaming",
          "Batch only",
          "Manual export",
          "Static copy"
        ],
        "answer": "Streaming"
      },
      "problem": {
        "question": "Data Architecture problem-solving task 8: Explain how you would solve a realistic scenario involving stream and event. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "stream",
          "event",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Data Architecture practical/coding task 8: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates stream and consumer. Explain important decisions.",
        "keywords": [
          "stream",
          "consumer"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Data Architecture Portfolio Project 8",
        "brief": "Create a batch-plus-streaming architecture for an e-commerce analytics platform.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "data",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "data_architecture_09",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Why use data governance? Scenario set 9.",
        "options": [
          "To manage quality, ownership, access and policies",
          "To remove security",
          "To prevent documentation",
          "To disable lineage"
        ],
        "answer": "To manage quality, ownership, access and policies"
      },
      "problem": {
        "question": "Data Architecture problem-solving task 9: Explain how you would solve a realistic scenario involving governance and access. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "governance",
          "access",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Data Architecture practical/coding task 9: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates iam and policy. Explain important decisions.",
        "keywords": [
          "iam",
          "policy"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Data Architecture Portfolio Project 9",
        "brief": "Design a cloud data architecture with IAM, lineage, observability and cost controls.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "data",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "data_architecture_10",
      "difficulty": "Foundation",
      "quiz": {
        "question": "What does scalability mean in architecture? Scenario set 10.",
        "options": [
          "Ability to handle growing workload",
          "Adding more colors",
          "Reducing labels",
          "Changing fonts"
        ],
        "answer": "Ability to handle growing workload"
      },
      "problem": {
        "question": "Data Architecture problem-solving task 10: Explain how you would solve a realistic scenario involving scale and architecture. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "scale",
          "architecture",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Data Architecture practical/coding task 10: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates partition and scale. Explain important decisions.",
        "keywords": [
          "partition",
          "scale"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Data Architecture Portfolio Project 10",
        "brief": "Design a data platform architecture covering ingestion, storage, BI, ML, governance and security.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "data",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "data_architecture_11",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which system is optimized for analytical workloads? Scenario set 11.",
        "options": [
          "Data warehouse",
          "Keyboard driver",
          "Text editor",
          "Image cache"
        ],
        "answer": "Data warehouse"
      },
      "problem": {
        "question": "Data Architecture problem-solving task 11: Explain how you would solve a realistic scenario involving warehouse and analytics. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "warehouse",
          "analytics",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Data Architecture practical/coding task 11: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates source and warehouse. Explain important decisions.",
        "keywords": [
          "source",
          "warehouse"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Data Architecture Portfolio Project 11",
        "brief": "Create a batch-plus-streaming architecture for an e-commerce analytics platform.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "data",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "data_architecture_12",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which architecture often stores raw and diverse data at scale? Scenario set 12.",
        "options": [
          "Data lake",
          "PivotTable",
          "Browser bookmark",
          "Slide deck"
        ],
        "answer": "Data lake"
      },
      "problem": {
        "question": "Data Architecture problem-solving task 12: Explain how you would solve a realistic scenario involving lake and raw. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "lake",
          "raw",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Data Architecture practical/coding task 12: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates bucket and lake. Explain important decisions.",
        "keywords": [
          "bucket",
          "lake"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Data Architecture Portfolio Project 12",
        "brief": "Design a cloud data architecture with IAM, lineage, observability and cost controls.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "data",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "data_architecture_13",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which pattern processes events continuously? Scenario set 13.",
        "options": [
          "Streaming",
          "Batch only",
          "Manual export",
          "Static copy"
        ],
        "answer": "Streaming"
      },
      "problem": {
        "question": "Data Architecture problem-solving task 13: Explain how you would solve a realistic scenario involving stream and event. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "stream",
          "event",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Data Architecture practical/coding task 13: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates stream and consumer. Explain important decisions.",
        "keywords": [
          "stream",
          "consumer"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Data Architecture Portfolio Project 13",
        "brief": "Design a data platform architecture covering ingestion, storage, BI, ML, governance and security.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "data",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "data_architecture_14",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Why use data governance? Scenario set 14.",
        "options": [
          "To manage quality, ownership, access and policies",
          "To remove security",
          "To prevent documentation",
          "To disable lineage"
        ],
        "answer": "To manage quality, ownership, access and policies"
      },
      "problem": {
        "question": "Data Architecture problem-solving task 14: Explain how you would solve a realistic scenario involving governance and access. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "governance",
          "access",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Data Architecture practical/coding task 14: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates iam and policy. Explain important decisions.",
        "keywords": [
          "iam",
          "policy"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Data Architecture Portfolio Project 14",
        "brief": "Create a batch-plus-streaming architecture for an e-commerce analytics platform.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "data",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "data_architecture_15",
      "difficulty": "Advanced",
      "quiz": {
        "question": "What does scalability mean in architecture? Scenario set 15.",
        "options": [
          "Ability to handle growing workload",
          "Adding more colors",
          "Reducing labels",
          "Changing fonts"
        ],
        "answer": "Ability to handle growing workload"
      },
      "problem": {
        "question": "Data Architecture problem-solving task 15: Explain how you would solve a realistic scenario involving scale and architecture. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "scale",
          "architecture",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Data Architecture practical/coding task 15: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates partition and scale. Explain important decisions.",
        "keywords": [
          "partition",
          "scale"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Data Architecture Portfolio Project 15",
        "brief": "Design a cloud data architecture with IAM, lineage, observability and cost controls.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "data",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "data_architecture_16",
      "difficulty": "Foundation",
      "quiz": {
        "question": "Which system is optimized for analytical workloads? Scenario set 16.",
        "options": [
          "Data warehouse",
          "Keyboard driver",
          "Text editor",
          "Image cache"
        ],
        "answer": "Data warehouse"
      },
      "problem": {
        "question": "Data Architecture problem-solving task 16: Explain how you would solve a realistic scenario involving warehouse and analytics. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "warehouse",
          "analytics",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Data Architecture practical/coding task 16: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates source and warehouse. Explain important decisions.",
        "keywords": [
          "source",
          "warehouse"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Data Architecture Portfolio Project 16",
        "brief": "Design a data platform architecture covering ingestion, storage, BI, ML, governance and security.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "data",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "data_architecture_17",
      "difficulty": "Intermediate",
      "quiz": {
        "question": "Which architecture often stores raw and diverse data at scale? Scenario set 17.",
        "options": [
          "Data lake",
          "PivotTable",
          "Browser bookmark",
          "Slide deck"
        ],
        "answer": "Data lake"
      },
      "problem": {
        "question": "Data Architecture problem-solving task 17: Explain how you would solve a realistic scenario involving lake and raw. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "lake",
          "raw",
          "validate"
        ],
        "minLength": 55
      },
      "coding": {
        "question": "Data Architecture practical/coding task 17: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates bucket and lake. Explain important decisions.",
        "keywords": [
          "bucket",
          "lake"
        ],
        "minLength": 70
      },
      "project": {
        "title": "Data Architecture Portfolio Project 17",
        "brief": "Create a batch-plus-streaming architecture for an e-commerce analytics platform.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "data",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    },
    {
      "id": "data_architecture_18",
      "difficulty": "Advanced",
      "quiz": {
        "question": "Which pattern processes events continuously? Scenario set 18.",
        "options": [
          "Streaming",
          "Batch only",
          "Manual export",
          "Static copy"
        ],
        "answer": "Streaming"
      },
      "problem": {
        "question": "Data Architecture problem-solving task 18: Explain how you would solve a realistic scenario involving stream and event. Include your assumptions, reasoning, steps, trade-offs, expected result, and how you would validate the outcome.",
        "keywords": [
          "stream",
          "event",
          "validate"
        ],
        "minLength": 80
      },
      "coding": {
        "question": "Data Architecture practical/coding task 18: Provide executable-looking code, SQL, DAX, formula, pseudo-code, configuration, architecture steps, or another precise implementation that demonstrates stream and consumer. Explain important decisions.",
        "keywords": [
          "stream",
          "consumer"
        ],
        "minLength": 100
      },
      "project": {
        "title": "Data Architecture Portfolio Project 18",
        "brief": "Design a cloud data architecture with IAM, lineage, observability and cost controls.",
        "deliverables": [
          "Problem statement and objective",
          "Implementation or working artifact",
          "Evidence such as code, screenshots, query, dashboard, notebook, diagram or report",
          "Short explanation of design choices",
          "Result, limitation and next improvement"
        ],
        "keywords": [
          "data",
          "result",
          "evidence"
        ],
        "minLength": 100
      }
    }
  ]
};

const WEIGHTS = {
  quiz: 0.20,
  problem: 0.25,
  coding: 0.35,
  project: 0.20,
};

const STORAGE_KEYS = {
  target: "nextpathTargetCareer",
  targetData: "nextpathTargetCareerData",
  selectedSkills: "nextpathSelectedSkills",
  report: "nextpathAssessmentReport",
  scores: "nextpathSkillScores",
  gaps: "nextpathSkillGaps",
  roadmap: "nextpathRoadmapPlan",
  roadmapProgress: "nextpathRoadmapProgress",
  verified: "nextpathVerifiedSkills",
  certificates: "nextpathCertificates",
  mode: "nextpathAssessmentMode",
  reassessmentSkills: "nextpathReassessmentSkills",
};

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function number(value, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function normalizeCareerSkills(career) {
  if (!career?.skills) {
    return [];
  }

  if (Array.isArray(career.skills)) {
    return career.skills.map((skill) => ({
      ...skill,
      name:
        skill.name ||
        skill.skill ||
        skill.skillName ||
        "Unknown Skill",
      required_score: number(
        skill.required_score ??
          skill.requiredScore ??
          skill.score ??
          7,
        7
      ),
    }));
  }

  return Object.entries(career.skills).map(
    ([name, score]) => ({
      name,
      required_score: number(score, 7),
    })
  );
}

function fallbackSet(skill, index) {
  return {
    id: `fallback_${skill.replace(/\s+/g, "_")}_${index}`,
    difficulty: "General",
    quiz: {
      question:
        `Which statement best demonstrates practical competence in ${skill}?`,
      options: [
        "Can apply it to a realistic task and explain the result",
        "Only recognizes the skill name",
        "Has never practiced the skill",
        "Avoids all practical use",
      ],
      answer:
        "Can apply it to a realistic task and explain the result",
    },
    problem: {
      question:
        `Describe a realistic problem ${skill} can solve. Explain your assumptions, reasoning, steps, expected result and validation approach.`,
      keywords: [
        skill.split(" ")[0].toLowerCase(),
        "validate",
      ],
      minLength: 60,
    },
    coding: {
      question:
        `Provide code, pseudo-code, formula, query, DAX, configuration, architecture steps, or a precise implementation plan that demonstrates ${skill}.`,
      keywords: [
        skill.split(" ")[0].toLowerCase(),
        "result",
      ],
      minLength: 70,
    },
    project: {
      title:
        `${skill} Applied Portfolio Project`,
      brief:
        `Build a practical mini project using ${skill} and document its objective, implementation, result and limitation.`,
      deliverables: [
        "Problem statement",
        "Implementation",
        "Evidence",
        "Result",
        "Limitation",
      ],
      keywords: [
        skill.split(" ")[0].toLowerCase(),
        "result",
        "evidence",
      ],
      minLength: 100,
    },
  };
}

function getQuestionSet(
  skill,
  mode,
  skillIndex
) {
  const pool =
    QUESTION_BANK[skill] || [];

  if (!pool.length) {
    return fallbackSet(
      skill,
      skillIndex
    );
  }

  const previousReport =
    readJSON(
      STORAGE_KEYS.report,
      null
    );

  const previousId =
    previousReport
      ?.detailedResults
      ?.[skill]
      ?.questionSetId ||
    "";

  const modeOffset =
    mode === "reassessment"
      ? 7
      : 0;

  let index =
    (
      skillIndex +
      modeOffset
    ) %
    pool.length;

  if (
    pool[index]?.id ===
    previousId
  ) {
    index =
      (index + 1) %
      pool.length;
  }

  return pool[index];
}

function scoreTextResponse(
  text,
  keywords,
  minLength,
  options = {}
) {
  const value =
    String(text || "")
      .trim()
      .toLowerCase();

  if (!value) {
    return 0;
  }

  const cleanedKeywords =
    (keywords || [])
      .map((item) =>
        String(item)
          .trim()
          .toLowerCase()
      )
      .filter(Boolean);

  const matched =
    cleanedKeywords.filter(
      (keyword) =>
        value.includes(keyword)
    ).length;

  const keywordScore =
    cleanedKeywords.length
      ? (
          matched /
          cleanedKeywords.length
        ) *
        100
      : 55;

  const lengthScore =
    clamp(
      (
        value.length /
        Math.max(
          1,
          minLength || 1
        )
      ) *
      100,
      0,
      100
    );

  const reasoningSignals = [
    "because",
    "therefore",
    "first",
    "next",
    "then",
    "finally",
    "validate",
    "test",
    "check",
    "result",
    "trade-off",
    "tradeoff",
    "assumption",
    "limitation",
  ];

  const reasoningMatches =
    reasoningSignals.filter(
      (signal) =>
        value.includes(signal)
    ).length;

  const reasoningScore =
    clamp(
      reasoningMatches * 12.5,
      0,
      100
    );

  const evidenceBonus =
    options.hasEvidence
      ? 8
      : 0;

  const raw =
    keywordScore * 0.55 +
    lengthScore * 0.25 +
    reasoningScore * 0.20 +
    evidenceBonus;

  return Math.round(
    clamp(
      raw,
      0,
      100
    ) *
      10
  ) / 10;
}

function ScoreRing({
  value,
  label = "Complete",
}) {
  const safe =
    clamp(
      number(value),
      0,
      100
    );

  return (
    <div
      className="as-ring"
      style={{
        background:
          `conic-gradient(#dc2626 ${safe * 3.6}deg,#e2e8f0 0deg)`,
      }}
    >
      <div>
        <strong>
          {safe.toFixed(0)}%
        </strong>

        <small>
          {label}
        </small>
      </div>
    </div>
  );
}

function EvidenceCard({
  icon,
  label,
  weight,
  description,
}) {
  return (
    <article className="as-evidence-card">
      <div className="as-evidence-icon">
        {icon}
      </div>

      <div>
        <span>{label}</span>
        <strong>{weight}</strong>
        <small>{description}</small>
      </div>
    </article>
  );
}

function ScorePreview({
  title,
  value,
}) {
  return (
    <div className="as-preview-metric">
      <span>{title}</span>

      <strong>
        {value === null
          ? "—"
          : `${number(value).toFixed(0)}%`}
      </strong>
    </div>
  );
}

function ProjectDeliverables({
  items,
}) {
  return (
    <ul className="as-project-deliverables">
      {(items || []).map(
        (item) => (
          <li key={item}>
            <span>✓</span>
            {item}
          </li>
        )
      )}
    </ul>
  );
}

function SkillSidebarItem({
  skill,
  active,
  complete,
  required,
  onClick,
}) {
  return (
    <button
      className={
        active
          ? "as-skill-nav-item active"
          : "as-skill-nav-item"
      }
      onClick={onClick}
    >
      <span className="as-skill-nav-status">
        {complete
          ? "✓"
          : "•"}
      </span>

      <span className="as-skill-nav-copy">
        <strong>{skill}</strong>
        <small>
          Required {required}/10
        </small>
      </span>
    </button>
  );
}

export default function Assessment() {
  const navigate =
    useNavigate();

  const career =
    readJSON(
      STORAGE_KEYS.targetData,
      null
    );

  const selectedSkills =
    readJSON(
      STORAGE_KEYS.selectedSkills,
      {}
    );

  const reassessmentSkills =
    readJSON(
      STORAGE_KEYS.reassessmentSkills,
      []
    );

  const mode =
    localStorage.getItem(
      STORAGE_KEYS.mode
    ) ||
    "initial";

  const skills =
    mode === "reassessment"
      ? reassessmentSkills
      : Object.keys(
          selectedSkills
        );

  const [
    answers,
    setAnswers,
  ] =
    useState({});

  const [
    activeSkill,
    setActiveSkill,
  ] =
    useState(
      skills[0] || ""
    );

  const [
    activeSection,
    setActiveSection,
  ] =
    useState("quiz");

  const [
    showInstructions,
    setShowInstructions,
  ] =
    useState(true);

  const [
    submitting,
    setSubmitting,
  ] =
    useState(false);

  const [
    showPreview,
    setShowPreview,
  ] =
    useState(true);

  const careerSkills =
    normalizeCareerSkills(
      career
    );

  const requiredMap =
    Object.fromEntries(
      careerSkills.map(
        (skill) => [
          skill.name,
          number(
            skill.required_score,
            7
          ),
        ]
      )
    );

  const questionSets =
    useMemo(
      () =>
        Object.fromEntries(
          skills.map(
            (
              skill,
              index
            ) => [
              skill,
              getQuestionSet(
                skill,
                mode,
                index
              ),
            ]
          )
        ),
      [
        skills.join("|"),
        mode,
      ]
    );

  function updateAnswer(
    skill,
    field,
    value
  ) {
    setAnswers(
      (current) => ({
        ...current,
        [skill]: {
          ...(current[skill] || {}),
          [field]: value,
        },
      })
    );
  }

  function updateProjectField(
    skill,
    field,
    value
  ) {
    setAnswers(
      (current) => ({
        ...current,
        [skill]: {
          ...(current[skill] || {}),
          project: {
            ...(
              current[skill]
                ?.project ||
              {}
            ),
            [field]:
              value,
          },
        },
      })
    );
  }

  const completionState =
    useMemo(
      () => {
        const details =
          skills.map(
            (skill) => {
              const answer =
                answers[skill] ||
                {};

              const project =
                answer.project ||
                {};

              const parts = {
                quiz:
                  Boolean(
                    answer.quiz
                  ),
                problem:
                  String(
                    answer.problem ||
                      ""
                  )
                    .trim()
                    .length >
                  0,
                coding:
                  String(
                    answer.coding ||
                      ""
                  )
                    .trim()
                    .length >
                  0,
                project:
                  String(
                    project.description ||
                      ""
                  )
                    .trim()
                    .length >
                  0,
              };

              const completedParts =
                Object.values(
                  parts
                ).filter(Boolean)
                  .length;

              return {
                skill,
                parts,
                complete:
                  completedParts ===
                  4,
                completedParts,
              };
            }
          );

        const completeSkills =
          details.filter(
            (item) =>
              item.complete
          ).length;

        const totalParts =
          skills.length *
          4;

        const completedParts =
          details.reduce(
            (
              sum,
              item
            ) =>
              sum +
              item.completedParts,
            0
          );

        return {
          details,
          completeSkills,
          totalParts,
          completedParts,
          percentage:
            totalParts
              ? (
                  completedParts /
                  totalParts
                ) *
                100
              : 0,
        };
      },
      [
        skills.join("|"),
        answers,
      ]
    );

  function isSkillComplete(
    skill
  ) {
    return Boolean(
      completionState.details.find(
        (item) =>
          item.skill ===
          skill
      )?.complete
    );
  }

  function calculatePreview(
    skill
  ) {
    const set =
      questionSets[skill];

    const answer =
      answers[skill] ||
      {};

    if (!set) {
      return null;
    }

    const quizScore =
      answer.quiz
        ? (
            String(
              answer.quiz
            )
              .trim()
              .toLowerCase() ===
            String(
              set.quiz.answer
            )
              .trim()
              .toLowerCase()
          )
          ? 100
          : 0
        : null;

    const problemScore =
      String(
        answer.problem ||
          ""
      )
        .trim()
        .length
        ? scoreTextResponse(
            answer.problem,
            set.problem.keywords,
            set.problem.minLength
          )
        : null;

    const codingScore =
      String(
        answer.coding ||
          ""
      )
        .trim()
        .length
        ? scoreTextResponse(
            answer.coding,
            set.coding.keywords,
            set.coding.minLength
          )
        : null;

    const project =
      answer.project ||
      {};

    const hasEvidence =
      Boolean(
        String(
          project.evidence ||
            ""
        ).trim()
      );

    const projectScore =
      String(
        project.description ||
          ""
      )
        .trim()
        .length
        ? scoreTextResponse(
            project.description,
            set.project.keywords,
            set.project.minLength,
            {
              hasEvidence,
            }
          )
        : null;

    const values = {
      quizScore,
      problemScore,
      codingScore,
      projectScore,
    };

    const available =
      Object.values(
        values
      ).filter(
        (value) =>
          value !== null
      );

    const weighted =
      quizScore !== null &&
      problemScore !== null &&
      codingScore !== null &&
      projectScore !== null
        ? (
            quizScore *
              WEIGHTS.quiz +
            problemScore *
              WEIGHTS.problem +
            codingScore *
              WEIGHTS.coding +
            projectScore *
              WEIGHTS.project
          )
        : null;

    return {
      ...values,
      weighted,
      availableCount:
        available.length,
    };
  }

  function moveToSkill(
    newSkill
  ) {
    if (!newSkill) {
      return;
    }

    setActiveSkill(
      newSkill
    );

    setActiveSection(
      "quiz"
    );

    setTimeout(
      () => {
        document
          .getElementById(
            "assessment-workspace"
          )
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      },
      0
    );
  }

  function submitAssessment() {
    if (
      !career ||
      !skills.length ||
      submitting
    ) {
      return;
    }

    if (
      completionState
        .completeSkills <
      skills.length
    ) {
      const confirmed =
        window.confirm(
          `You have fully completed ${completionState.completeSkills} of ${skills.length} skill assessments. Submit anyway? Missing sections will receive 0.`
        );

      if (
        !confirmed
      ) {
        return;
      }
    }

    setSubmitting(true);

    try {
      const cumulativeScores =
        readJSON(
          STORAGE_KEYS.scores,
          {}
        );

      const detailedResults =
        {};

      const passedSkills =
        [];

      let totalFinal =
        0;

      skills.forEach(
        (
          skill,
          index
        ) => {
          const set =
            questionSets[skill] ||
            fallbackSet(
              skill,
              index
            );

          const answer =
            answers[skill] ||
            {};

          const project =
            answer.project ||
            {};

          const quizScore =
            String(
              answer.quiz ||
                ""
            )
              .trim()
              .toLowerCase() ===
            String(
              set.quiz.answer ||
                ""
            )
              .trim()
              .toLowerCase()
              ? 100
              : 0;

          const problemScore =
            scoreTextResponse(
              answer.problem,
              set.problem.keywords,
              set.problem.minLength
            );

          const codingScore =
            scoreTextResponse(
              answer.coding,
              set.coding.keywords,
              set.coding.minLength
            );

          const projectScore =
            scoreTextResponse(
              project.description,
              set.project.keywords,
              set.project.minLength,
              {
                hasEvidence:
                  Boolean(
                    String(
                      project.evidence ||
                        ""
                    )
                      .trim()
                  ),
              }
            );

          const weightedPercent =
            quizScore *
              WEIGHTS.quiz +
            problemScore *
              WEIGHTS.problem +
            codingScore *
              WEIGHTS.coding +
            projectScore *
              WEIGHTS.project;

          const finalScore =
            Math.round(
              (
                weightedPercent /
                10
              ) *
                10
            ) /
            10;

          const requiredScore =
            requiredMap[skill] ||
            7;

          cumulativeScores[
            skill
          ] =
            finalScore;

          if (
            mode ===
              "reassessment" &&
            finalScore >=
              requiredScore
          ) {
            passedSkills.push(
              skill
            );
          }

          detailedResults[
            skill
          ] = {
            questionSetId:
              set.id,
            difficulty:
              set.difficulty,
            quiz:
              quizScore,
            problem:
              problemScore,
            coding:
              codingScore,
            project:
              projectScore,
            weightedPercent:
              Math.round(
                weightedPercent *
                  10
              ) /
              10,
            final:
              finalScore,
            required:
              requiredScore,
            passed:
              finalScore >=
              requiredScore,
            remainingGap:
              Math.max(
                0,
                Math.round(
                  (
                    requiredScore -
                    finalScore
                  ) *
                    10
                ) /
                  10
              ),
            projectSubmission:
              {
                title:
                  set.project
                    .title,
                brief:
                  set.project
                    .brief,
                description:
                  project.description ||
                  "",
                evidence:
                  project.evidence ||
                  "",
                repository:
                  project.repository ||
                  "",
              },
          };

          totalFinal +=
            finalScore;
        }
      );

      const overallScore =
        Math.round(
          (
            totalFinal /
            Math.max(
              1,
              skills.length
            )
          ) *
            10
        ) /
        10;

      localStorage.setItem(
        STORAGE_KEYS.scores,
        JSON.stringify(
          cumulativeScores
        )
      );

      if (
        mode ===
        "reassessment"
      ) {
        const verifiedSkills =
          readJSON(
            STORAGE_KEYS.verified,
            {}
          );

        const certificates =
          readJSON(
            STORAGE_KEYS.certificates,
            []
          );

        passedSkills.forEach(
          (skill) => {
            verifiedSkills[
              skill
            ] =
              cumulativeScores[
                skill
              ];

            const alreadyExists =
              certificates.some(
                (certificate) =>
                  certificate.skill ===
                  skill
              );

            if (
              !alreadyExists
            ) {
              certificates.push({
                id:
                  "NP-" +
                  Date.now() +
                  "-" +
                  skill
                    .replace(
                      /\s+/g,
                      "-"
                    )
                    .toUpperCase(),
                skill,
                career:
                  career.name,
                score:
                  cumulativeScores[
                    skill
                  ],
                required:
                  requiredMap[
                    skill
                  ] ||
                  7,
                date:
                  new Date()
                    .toISOString()
                    .slice(
                      0,
                      10
                    ),
                issuer:
                  "NEXTPATH Project",
                type:
                  "Project Skill Verification",
              });
            }
          }
        );

        localStorage.setItem(
          STORAGE_KEYS.verified,
          JSON.stringify(
            verifiedSkills
          )
        );

        localStorage.setItem(
          STORAGE_KEYS.certificates,
          JSON.stringify(
            certificates
          )
        );
      }

      localStorage.setItem(
        STORAGE_KEYS.report,
        JSON.stringify({
          mode,
          targetCareer:
            career.name,
          assessedSkills:
            skills,
          skillScores:
            Object.fromEntries(
              skills.map(
                (skill) => [
                  skill,
                  cumulativeScores[
                    skill
                  ],
                ]
              )
            ),
          detailedResults,
          passedSkills,
          overallScore,
          weights:
            WEIGHTS,
          completedAt:
            new Date()
              .toISOString(),
        })
      );

      localStorage.setItem(
        STORAGE_KEYS.mode,
        "initial"
      );

      localStorage.removeItem(
        STORAGE_KEYS.reassessmentSkills
      );

      navigate(
        "/assessment-report"
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (!career) {
    return (
      <main className="as-state">
        <div className="as-state-icon">
          🎯
        </div>

        <h2>
          No target career found
        </h2>

        <p>
          Select your target career before starting the assessment.
        </p>

        <button
          onClick={() =>
            navigate(
              "/target-career"
            )
          }
        >
          Choose Target Career
        </button>
      </main>
    );
  }

  if (!skills.length) {
    return (
      <main className="as-state">
        <div className="as-state-icon">
          🧪
        </div>

        <h2>
          No skills selected
        </h2>

        <p>
          Select the skills you already know so NEXTPATH can verify them.
        </p>

        <button
          onClick={() =>
            navigate(
              "/required-skills"
            )
          }
        >
          Go to Required Skills
        </button>
      </main>
    );
  }

  const activeSet =
    questionSets[
      activeSkill
    ] ||
    fallbackSet(
      activeSkill,
      0
    );

  const activeAnswer =
    answers[
      activeSkill
    ] ||
    {};

  const activeProject =
    activeAnswer.project ||
    {};

  const activePreview =
    calculatePreview(
      activeSkill
    );

  const activeIndex =
    Math.max(
      0,
      skills.indexOf(
        activeSkill
      )
    );

  return (
    <main className="as-page">
      <section className="as-hero">
        <div className="as-hero-copy">
          <span className="as-kicker">
            {mode ===
            "reassessment"
              ? "SKILL VERIFICATION ROUND"
              : "CAREER-ALIGNED SKILL ASSESSMENT"}
          </span>

          <h1>
            {mode ===
            "reassessment"
              ? "Prove your improvement with new evidence."
              : "Prove what you can actually do."}
          </h1>

          <p>
            Your target career is{" "}
            <strong>
              {career.name}
            </strong>.
            Each selected skill is evaluated using four evidence layers:
            objective quiz, problem solving, practical/code implementation,
            and a portfolio-style project submission.
          </p>
        </div>

        <div className="as-hero-progress">
          <ScoreRing
            value={
              completionState.percentage
            }
            label="Assessment"
          />

          <div>
            <strong>
              {
                completionState.completeSkills
              }
              /
              {skills.length}
            </strong>

            <span>
              skills fully complete
            </span>

            <small>
              {
                completionState.completedParts
              }
              /
              {
                completionState.totalParts
              }{" "}
              evidence sections
            </small>
          </div>
        </div>
      </section>

      <section className="as-evidence-grid">
        <EvidenceCard
          icon="🧠"
          label="Knowledge Quiz"
          weight="20%"
          description="Objective concept verification"
        />

        <EvidenceCard
          icon="🧩"
          label="Problem Solving"
          weight="25%"
          description="Reasoning, trade-offs and validation"
        />

        <EvidenceCard
          icon="💻"
          label="Code / Practical"
          weight="35%"
          description="Implementation evidence"
        />

        <EvidenceCard
          icon="🛠️"
          label="Project Evidence"
          weight="20%"
          description="Applied portfolio-style work"
        />
      </section>

      {showInstructions && (
        <section className="as-instructions">
          <div>
            <span className="as-kicker">
              BEFORE YOU START
            </span>

            <h2>
              Assessment instructions
            </h2>

            <ul>
              <li>
                Complete the quiz without outside help for a more meaningful score.
              </li>

              <li>
                For problem solving, explain why you chose your approach.
              </li>

              <li>
                For coding skills, provide executable-looking code where appropriate.
              </li>

              <li>
                For Excel, Power BI, statistics, cloud, business analysis or architecture,
                formulas, DAX, queries, configuration, pseudo-code or precise implementation steps are accepted.
              </li>

              <li>
                Project evidence should describe a real or realistic artifact and can include a repository or evidence link.
              </li>

              <li>
                Re-assessment uses a different question-set offset from the initial assessment.
              </li>
            </ul>
          </div>

          <button
            onClick={() =>
              setShowInstructions(
                false
              )
            }
          >
            Hide Instructions
          </button>
        </section>
      )}

      <section className="as-layout">
        <aside className="as-skill-sidebar">
          <div className="as-sidebar-head">
            <span>
              ASSESSED SKILLS
            </span>

            <strong>
              {skills.length}
            </strong>
          </div>

          <div className="as-skill-nav-list">
            {skills.map(
              (skill) => (
                <SkillSidebarItem
                  key={skill}
                  skill={skill}
                  active={
                    skill ===
                    activeSkill
                  }
                  complete={
                    isSkillComplete(
                      skill
                    )
                  }
                  required={
                    requiredMap[
                      skill
                    ] ||
                    7
                  }
                  onClick={() =>
                    moveToSkill(
                      skill
                    )
                  }
                />
              )
            )}
          </div>

          <div className="as-sidebar-note">
            <strong>
              Scoring Model
            </strong>

            <p>
              Quiz 20% + Problem 25% + Practical 35% + Project 20%.
            </p>
          </div>
        </aside>

        <section
          className="as-workspace"
          id="assessment-workspace"
        >
          <div className="as-skill-head">
            <div>
              <span className="as-difficulty">
                {
                  activeSet.difficulty
                }
              </span>

              <h2>
                {activeSkill}
              </h2>

              <p>
                Question set{" "}
                <code>
                  {
                    activeSet.id
                  }
                </code>
              </p>
            </div>

            <div className="as-required">
              <small>
                Career Requirement
              </small>

              <strong>
                {
                  requiredMap[
                    activeSkill
                  ] ||
                  7
                }
                /10
              </strong>

              <span>
                for {career.name}
              </span>
            </div>
          </div>

          <div className="as-section-tabs">
            <button
              className={
                activeSection ===
                "quiz"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveSection(
                  "quiz"
                )
              }
            >
              01 Quiz
            </button>

            <button
              className={
                activeSection ===
                "problem"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveSection(
                  "problem"
                )
              }
            >
              02 Problem Solving
            </button>

            <button
              className={
                activeSection ===
                "coding"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveSection(
                  "coding"
                )
              }
            >
              03 Code / Practical
            </button>

            <button
              className={
                activeSection ===
                "project"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveSection(
                  "project"
                )
              }
            >
              04 Project
            </button>
          </div>

          {activeSection ===
            "quiz" && (
            <article className="as-question-card">
              <div className="as-question-label">
                KNOWLEDGE QUIZ · 20%
              </div>

              <h3>
                {
                  activeSet.quiz
                    .question
                }
              </h3>

              <div className="as-options">
                {
                  activeSet.quiz.options.map(
                    (
                      option,
                      index
                    ) => (
                      <label
                        key={
                          option
                        }
                        className={
                          activeAnswer.quiz ===
                          option
                            ? "selected"
                            : ""
                        }
                      >
                        <input
                          type="radio"
                          name={`${activeSkill}-quiz`}
                          checked={
                            activeAnswer.quiz ===
                            option
                          }
                          onChange={() =>
                            updateAnswer(
                              activeSkill,
                              "quiz",
                              option
                            )
                          }
                        />

                        <span className="as-option-letter">
                          {
                            [
                              "A",
                              "B",
                              "C",
                              "D",
                            ][
                              index
                            ]
                          }
                        </span>

                        <span>
                          {
                            option
                          }
                        </span>
                      </label>
                    )
                  )
                }
              </div>

              <div className="as-question-tip">
                <strong>
                  Assessment purpose:
                </strong>{" "}
                verifies core knowledge before practical evidence is considered.
              </div>
            </article>
          )}

          {activeSection ===
            "problem" && (
            <article className="as-question-card">
              <div className="as-question-label">
                PROBLEM SOLVING · 25%
              </div>

              <h3>
                {
                  activeSet.problem
                    .question
                }
              </h3>

              <div className="as-rubric">
                <span>
                  Include:
                </span>

                <b>
                  assumptions
                </b>

                <b>
                  approach
                </b>

                <b>
                  trade-offs
                </b>

                <b>
                  validation
                </b>

                <b>
                  expected result
                </b>
              </div>

              <textarea
                className="as-textarea"
                rows={13}
                value={
                  activeAnswer.problem ||
                  ""
                }
                onChange={(event) =>
                  updateAnswer(
                    activeSkill,
                    "problem",
                    event.target.value
                  )
                }
                placeholder="Explain your reasoning step by step..."
              />

              <div className="as-response-meta">
                <span>
                  {
                    String(
                      activeAnswer.problem ||
                        ""
                    ).length
                  }{" "}
                  characters
                </span>

                <span>
                  Suggested minimum:{" "}
                  {
                    activeSet.problem
                      .minLength
                  }
                </span>
              </div>
            </article>
          )}

          {activeSection ===
            "coding" && (
            <article className="as-question-card">
              <div className="as-question-label">
                CODE / PRACTICAL · 35%
              </div>

              <h3>
                {
                  activeSet.coding
                    .question
                }
              </h3>

              <p className="as-help">
                For programming skills, write code. For SQL, write a query.
                For Power BI, use DAX or Power Query. For Excel, use formulas
                or transformation steps. For cloud, architecture, communication
                or business analysis, provide precise implementation steps or configuration.
              </p>

              <div className="as-code-toolbar">
                <div>
                  <i />
                  <i />
                  <i />
                </div>

                <strong>
                  NEXTPATH PRACTICAL WORKSPACE
                </strong>

                <button
                  onClick={() =>
                    updateAnswer(
                      activeSkill,
                      "coding",
                      ""
                    )
                  }
                >
                  Clear
                </button>
              </div>

              <textarea
                className="as-code-editor"
                rows={20}
                spellCheck="false"
                value={
                  activeAnswer.coding ||
                  ""
                }
                onChange={(event) =>
                  updateAnswer(
                    activeSkill,
                    "coding",
                    event.target.value
                  )
                }
                placeholder={
                  activeSkill ===
                  "SQL"
                    ? "SELECT ...\nFROM ...\nWHERE ..."
                    : activeSkill ===
                      "Python"
                    ? "def solution(...):\n    ..."
                    : "Write code, formula, query, DAX, pseudo-code, configuration or precise implementation steps..."
                }
              />

              <div className="as-response-meta dark">
                <span>
                  {
                    String(
                      activeAnswer.coding ||
                        ""
                    ).length
                  }{" "}
                  characters
                </span>

                <span>
                  Suggested minimum:{" "}
                  {
                    activeSet.coding
                      .minLength
                  }
                </span>
              </div>
            </article>
          )}

          {activeSection ===
            "project" && (
            <article className="as-question-card as-project-card">
              <div className="as-question-label">
                APPLIED PROJECT · 20%
              </div>

              <div className="as-project-title-row">
                <div>
                  <span>
                    PORTFOLIO PROJECT
                  </span>

                  <h3>
                    {
                      activeSet.project
                        .title
                    }
                  </h3>
                </div>

                <div className="as-project-badge">
                  {
                    activeSkill
                  }
                </div>
              </div>

              <div className="as-project-brief">
                <strong>
                  Project Brief
                </strong>

                <p>
                  {
                    activeSet.project
                      .brief
                  }
                </p>
              </div>

              <div className="as-project-grid">
                <section>
                  <h4>
                    Required Deliverables
                  </h4>

                  <ProjectDeliverables
                    items={
                      activeSet.project
                        .deliverables
                    }
                  />
                </section>

                <section>
                  <h4>
                    What NEXTPATH Evaluates
                  </h4>

                  <ul className="as-project-deliverables">
                    <li>
                      <span>✓</span>
                      relevance to the skill
                    </li>

                    <li>
                      <span>✓</span>
                      implementation clarity
                    </li>

                    <li>
                      <span>✓</span>
                      evidence of result
                    </li>

                    <li>
                      <span>✓</span>
                      explanation of decisions
                    </li>

                    <li>
                      <span>✓</span>
                      limitation and next improvement
                    </li>
                  </ul>
                </section>
              </div>

              <label className="as-field">
                <span>
                  Project description / evidence
                </span>

                <textarea
                  rows={12}
                  value={
                    activeProject.description ||
                    ""
                  }
                  onChange={(event) =>
                    updateProjectField(
                      activeSkill,
                      "description",
                      event.target.value
                    )
                  }
                  placeholder="Describe what you built, how you built it, the result, evidence, limitations and what you would improve..."
                />
              </label>

              <div className="as-two-fields">
                <label className="as-field">
                  <span>
                    Repository link (optional)
                  </span>

                  <input
                    value={
                      activeProject.repository ||
                      ""
                    }
                    onChange={(event) =>
                      updateProjectField(
                        activeSkill,
                        "repository",
                        event.target.value
                      )
                    }
                    placeholder="https://github.com/..."
                  />
                </label>

                <label className="as-field">
                  <span>
                    Evidence link / note (optional)
                  </span>

                  <input
                    value={
                      activeProject.evidence ||
                      ""
                    }
                    onChange={(event) =>
                      updateProjectField(
                        activeSkill,
                        "evidence",
                        event.target.value
                      )
                    }
                    placeholder="Dashboard, notebook, screenshot, report, demo link, or evidence note"
                  />
                </label>
              </div>

              <div className="as-response-meta">
                <span>
                  {
                    String(
                      activeProject.description ||
                        ""
                    ).length
                  }{" "}
                  characters
                </span>

                <span>
                  Suggested minimum:{" "}
                  {
                    activeSet.project
                      .minLength
                  }
                </span>
              </div>
            </article>
          )}

          {showPreview && (
            <section className="as-preview-panel">
              <div className="as-preview-head">
                <div>
                  <span className="as-kicker">
                    LIVE EVIDENCE PREVIEW
                  </span>

                  <h3>
                    Current evidence quality
                  </h3>
                </div>

                <button
                  onClick={() =>
                    setShowPreview(
                      false
                    )
                  }
                >
                  Hide
                </button>
              </div>

              <div className="as-preview-grid">
                <ScorePreview
                  title="Quiz"
                  value={
                    activePreview
                      ?.quizScore ??
                    null
                  }
                />

                <ScorePreview
                  title="Problem"
                  value={
                    activePreview
                      ?.problemScore ??
                    null
                  }
                />

                <ScorePreview
                  title="Practical"
                  value={
                    activePreview
                      ?.codingScore ??
                    null
                  }
                />

                <ScorePreview
                  title="Project"
                  value={
                    activePreview
                      ?.projectScore ??
                    null
                  }
                />
              </div>

              <div className="as-weighted-preview">
                <span>
                  Weighted Preview
                </span>

                <strong>
                  {
                    activePreview
                      ?.weighted ===
                    null
                      ? "Complete all 4 sections"
                      : `${(
                          activePreview.weighted /
                          10
                        ).toFixed(
                          1
                        )}/10`
                  }
                </strong>
              </div>

              <p>
                Open-response and project preview scores use a prototype heuristic
                based on relevant concepts, completeness and reasoning signals.
                A production system should add sandbox execution, rubric-based
                evaluation, expert review, plagiarism checks where appropriate,
                and secure evidence validation.
              </p>
            </section>
          )}

          {!showPreview && (
            <button
              className="as-show-preview"
              onClick={() =>
                setShowPreview(
                  true
                )
              }
            >
              Show Evidence Preview
            </button>
          )}

          <div className="as-workspace-navigation">
            <button
              disabled={
                activeIndex ===
                0
              }
              onClick={() =>
                moveToSkill(
                  skills[
                    activeIndex -
                      1
                  ]
                )
              }
            >
              ← Previous Skill
            </button>

            <div>
              <span>
                Skill{" "}
                {activeIndex + 1}{" "}
                of{" "}
                {skills.length}
              </span>

              <strong>
                {activeSkill}
              </strong>
            </div>

            <button
              disabled={
                activeIndex ===
                skills.length -
                  1
              }
              onClick={() =>
                moveToSkill(
                  skills[
                    activeIndex +
                      1
                  ]
                )
              }
            >
              Next Skill →
            </button>
          </div>
        </section>
      </section>

      <section className="as-submit-section">
        <div>
          <span className="as-kicker">
            FINAL SUBMISSION
          </span>

          <h2>
            Convert your evidence into demonstrated skill scores.
          </h2>

          <p>
            NEXTPATH will compare each final score against the required score
            for {career.name}. In re-assessment mode, a skill is verified only
            when the new demonstrated score meets or exceeds the career requirement.
          </p>
        </div>

        <div className="as-submit-status">
          <div>
            <span>
              Fully complete
            </span>

            <strong>
              {
                completionState.completeSkills
              }
              /
              {skills.length}
            </strong>
          </div>

          <button
            disabled={
              submitting
            }
            onClick={
              submitAssessment
            }
          >
            {submitting
              ? "Calculating Scores..."
              : mode ===
                "reassessment"
              ? "Submit Re-Assessment →"
              : "Submit Assessment →"}
          </button>
        </div>
      </section>

      <footer className="as-footer">
        NEXTPATH assessment scoring in this hackathon build is a prototype.
        Objective quiz scoring is deterministic, while open-response, practical
        and project sections use lightweight heuristics until a secure execution
        and rubric-evaluation layer is added.
      </footer>

      <style>{`
        .as-page {
          max-width: 1360px;
          margin: 0 auto;
          padding: 24px;
          color: #0f172a;
        }

        .as-hero {
          display: grid;
          grid-template-columns:
            minmax(0, 1.35fr)
            minmax(300px, .65fr);
          gap: 24px;
          padding: 34px;
          border: 1px solid #e2e8f0;
          border-radius: 27px;
          background:
            radial-gradient(
              circle at top right,
              rgba(220,38,38,.11),
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

        .as-kicker {
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 1.45px;
          color: #dc2626;
        }

        .as-hero h1 {
          max-width: 900px;
          margin: 10px 0 14px;
          font-size:
            clamp(
              38px,
              4vw,
              56px
            );
          line-height: 1.04;
          letter-spacing: -1.4px;
        }

        .as-hero p {
          max-width: 850px;
          margin: 0;
          color: #64748b;
          line-height: 1.7;
        }

        .as-hero-progress {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 17px;
          padding: 18px;
          border: 1px solid #e2e8f0;
          border-radius: 17px;
          background: #ffffff;
        }

        .as-ring {
          width: 112px;
          height: 112px;
          display: grid;
          place-items: center;
          border-radius: 50%;
        }

        .as-ring > div {
          width: 84px;
          height: 84px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          border-radius: 50%;
          background: #ffffff;
        }

        .as-ring strong {
          font-size: 20px;
        }

        .as-ring small {
          color: #64748b;
          font-size: 9px;
        }

        .as-hero-progress > div:last-child {
          display: flex;
          flex-direction: column;
        }

        .as-hero-progress > div:last-child strong {
          font-size: 26px;
        }

        .as-hero-progress > div:last-child span {
          color: #334155;
          font-size: 11px;
          font-weight: 800;
        }

        .as-hero-progress > div:last-child small {
          margin-top: 4px;
          color: #94a3b8;
        }

        .as-evidence-grid {
          display: grid;
          grid-template-columns:
            repeat(4, minmax(0,1fr));
          gap: 10px;
          margin: 18px 0;
        }

        .as-evidence-card {
          display: flex;
          align-items: center;
          gap: 12px;
          min-height: 88px;
          padding: 15px;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          background: #ffffff;
        }

        .as-evidence-icon {
          display: grid;
          place-items: center;
          width: 42px;
          height: 42px;
          flex: 0 0 auto;
          border-radius: 11px;
          background: #f8fafc;
          font-size: 20px;
        }

        .as-evidence-card > div:last-child {
          display: flex;
          flex-direction: column;
        }

        .as-evidence-card span {
          color: #334155;
          font-size: 11px;
          font-weight: 850;
        }

        .as-evidence-card strong {
          margin: 2px 0;
          color: #dc2626;
          font-size: 20px;
        }

        .as-evidence-card small {
          color: #94a3b8;
          line-height: 1.35;
        }

        .as-instructions {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 18px;
          padding: 20px;
          border: 1px solid #bfdbfe;
          border-radius: 15px;
          background: #eff6ff;
        }

        .as-instructions h2 {
          margin: 6px 0;
        }

        .as-instructions ul {
          margin: 10px 0 0;
          padding-left: 20px;
          color: #475569;
        }

        .as-instructions li {
          margin: 6px 0;
          line-height: 1.5;
        }

        .as-instructions button {
          height: fit-content;
          padding: 8px 11px;
          border: 1px solid #93c5fd;
          border-radius: 8px;
          background: #ffffff;
          color: #1d4ed8;
          font-weight: 800;
          cursor: pointer;
        }

        .as-layout {
          display: grid;
          grid-template-columns:
            260px
            minmax(0,1fr);
          gap: 16px;
          align-items: start;
        }

        .as-skill-sidebar {
          position: sticky;
          top: 18px;
          padding: 14px;
          border: 1px solid #e2e8f0;
          border-radius: 15px;
          background: #ffffff;
        }

        .as-sidebar-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 5px 4px 12px;
          border-bottom: 1px solid #e2e8f0;
        }

        .as-sidebar-head span {
          color: #64748b;
          font-size: 9px;
          font-weight: 900;
          letter-spacing: .8px;
        }

        .as-sidebar-head strong {
          display: grid;
          place-items: center;
          width: 27px;
          height: 27px;
          border-radius: 50%;
          background: #fee2e2;
          color: #b91c1c;
        }

        .as-skill-nav-list {
          display: grid;
          gap: 6px;
          margin-top: 10px;
        }

        .as-skill-nav-item {
          display: flex;
          align-items: center;
          gap: 9px;
          width: 100%;
          padding: 10px;
          border: 1px solid transparent;
          border-radius: 9px;
          background: transparent;
          text-align: left;
          cursor: pointer;
        }

        .as-skill-nav-item:hover {
          background: #f8fafc;
        }

        .as-skill-nav-item.active {
          border-color: #fecaca;
          background: #fff1f2;
        }

        .as-skill-nav-status {
          display: grid;
          place-items: center;
          width: 22px;
          height: 22px;
          flex: 0 0 auto;
          border-radius: 50%;
          background: #f1f5f9;
          color: #64748b;
          font-weight: 900;
        }

        .as-skill-nav-item.active
        .as-skill-nav-status {
          background: #dc2626;
          color: #ffffff;
        }

        .as-skill-nav-copy {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .as-skill-nav-copy strong {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 11px;
        }

        .as-skill-nav-copy small {
          margin-top: 2px;
          color: #94a3b8;
          font-size: 8px;
        }

        .as-sidebar-note {
          margin-top: 12px;
          padding: 11px;
          border-radius: 9px;
          background: #f8fafc;
        }

        .as-sidebar-note strong {
          font-size: 10px;
        }

        .as-sidebar-note p {
          margin: 5px 0 0;
          color: #64748b;
          font-size: 9px;
          line-height: 1.45;
        }

        .as-workspace {
          min-width: 0;
          padding: 24px;
          border: 1px solid #e2e8f0;
          border-radius: 17px;
          background: #ffffff;
          box-shadow:
            0 12px 30px
            rgba(15,23,42,.04);
        }

        .as-skill-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 15px;
        }

        .as-difficulty {
          display: inline-flex;
          padding: 5px 8px;
          border-radius: 999px;
          background: #f3e8ff;
          color: #7c3aed;
          font-size: 9px;
          font-weight: 900;
        }

        .as-skill-head h2 {
          margin: 8px 0 3px;
          font-size: 32px;
        }

        .as-skill-head p {
          margin: 0;
          color: #94a3b8;
          font-size: 10px;
        }

        .as-skill-head code {
          color: #64748b;
        }

        .as-required {
          display: flex;
          align-items: flex-end;
          flex-direction: column;
          min-width: 150px;
          padding: 11px 13px;
          border: 1px solid #fecaca;
          border-radius: 12px;
          background: #fff1f2;
        }

        .as-required small {
          color: #b91c1c;
          font-size: 8px;
          font-weight: 900;
        }

        .as-required strong {
          margin: 3px 0;
          color: #991b1b;
          font-size: 23px;
        }

        .as-required span {
          color: #b91c1c;
          font-size: 8px;
        }

        .as-section-tabs {
          display: flex;
          gap: 7px;
          flex-wrap: wrap;
          margin: 19px 0 15px;
          padding-bottom: 13px;
          border-bottom: 1px solid #e2e8f0;
        }

        .as-section-tabs button {
          padding: 8px 11px;
          border: 1px solid #cbd5e1;
          border-radius: 999px;
          background: #ffffff;
          color: #475569;
          font-weight: 800;
          cursor: pointer;
        }

        .as-section-tabs button.active {
          border-color: #111827;
          background: #111827;
          color: #ffffff;
        }

        .as-question-card {
          padding: 20px;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          background: #f8fafc;
        }

        .as-question-label {
          color: #dc2626;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 1px;
        }

        .as-question-card h3 {
          margin: 9px 0 14px;
          font-size: 19px;
          line-height: 1.5;
        }

        .as-options {
          display: grid;
          grid-template-columns:
            repeat(2,minmax(0,1fr));
          gap: 9px;
        }

        .as-options label {
          display: flex;
          align-items: center;
          gap: 10px;
          min-height: 52px;
          padding: 11px;
          border: 1px solid #cbd5e1;
          border-radius: 10px;
          background: #ffffff;
          cursor: pointer;
        }

        .as-options label.selected {
          border-color: #dc2626;
          background: #fff1f2;
        }

        .as-options input {
          display: none;
        }

        .as-option-letter {
          display: grid;
          place-items: center;
          width: 27px;
          height: 27px;
          flex: 0 0 auto;
          border-radius: 8px;
          background: #f1f5f9;
          color: #475569;
          font-size: 10px;
          font-weight: 900;
        }

        .as-options label.selected
        .as-option-letter {
          background: #dc2626;
          color: #ffffff;
        }

        .as-question-tip {
          margin-top: 12px;
          padding: 10px;
          border-radius: 8px;
          background: #ffffff;
          color: #64748b;
          font-size: 10px;
          line-height: 1.45;
        }

        .as-rubric {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          margin-bottom: 12px;
        }

        .as-rubric span {
          color: #64748b;
          font-size: 9px;
          font-weight: 900;
        }

        .as-rubric b {
          padding: 4px 7px;
          border-radius: 999px;
          background: #ffffff;
          color: #475569;
          font-size: 8px;
        }

        .as-textarea,
        .as-field textarea,
        .as-field input {
          width: 100%;
          box-sizing: border-box;
          padding: 13px;
          border: 1px solid #cbd5e1;
          border-radius: 10px;
          outline: none;
          background: #ffffff;
          color: #0f172a;
          line-height: 1.55;
        }

        .as-textarea:focus,
        .as-field textarea:focus,
        .as-field input:focus {
          border-color: #dc2626;
          box-shadow:
            0 0 0 3px
            rgba(220,38,38,.07);
        }

        .as-help {
          margin: -4px 0 12px;
          color: #64748b;
          font-size: 11px;
          line-height: 1.55;
        }

        .as-code-toolbar {
          display: grid;
          grid-template-columns:
            auto
            minmax(0,1fr)
            auto;
          align-items: center;
          gap: 10px;
          padding: 9px 11px;
          border-radius: 10px 10px 0 0;
          background: #111827;
          color: #cbd5e1;
        }

        .as-code-toolbar > div {
          display: flex;
          gap: 5px;
        }

        .as-code-toolbar i {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #475569;
        }

        .as-code-toolbar strong {
          font-size: 9px;
          letter-spacing: .8px;
        }

        .as-code-toolbar button {
          padding: 5px 8px;
          border: 1px solid #334155;
          border-radius: 6px;
          background: #0f172a;
          color: #cbd5e1;
          font-size: 9px;
          cursor: pointer;
        }

        .as-code-editor {
          width: 100%;
          box-sizing: border-box;
          padding: 15px;
          border: 1px solid #334155;
          border-top: 0;
          border-radius: 0;
          outline: none;
          resize: vertical;
          background: #0f172a;
          color: #e2e8f0;
          font-family:
            ui-monospace,
            SFMono-Regular,
            Menlo,
            Monaco,
            Consolas,
            monospace;
          font-size: 12px;
          line-height: 1.6;
          tab-size: 2;
        }

        .as-response-meta {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          margin-top: 6px;
          color: #94a3b8;
          font-size: 9px;
        }

        .as-response-meta.dark {
          margin: 0;
          padding: 7px 10px;
          border-radius: 0 0 9px 9px;
          background: #111827;
          color: #64748b;
        }

        .as-project-card {
          background:
            linear-gradient(
              180deg,
              #f8fafc,
              #ffffff
            );
        }

        .as-project-title-row {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          align-items: flex-start;
        }

        .as-project-title-row > div:first-child > span {
          color: #16a34a;
          font-size: 9px;
          font-weight: 900;
          letter-spacing: .8px;
        }

        .as-project-title-row h3 {
          margin: 5px 0;
        }

        .as-project-badge {
          padding: 7px 10px;
          border-radius: 999px;
          background: #dcfce7;
          color: #166534;
          font-size: 9px;
          font-weight: 900;
        }

        .as-project-brief {
          margin-top: 12px;
          padding: 14px;
          border: 1px solid #bbf7d0;
          border-radius: 11px;
          background: #f0fdf4;
        }

        .as-project-brief strong {
          color: #166534;
          font-size: 10px;
        }

        .as-project-brief p {
          margin: 5px 0 0;
          color: #4d7c0f;
          line-height: 1.55;
        }

        .as-project-grid {
          display: grid;
          grid-template-columns:
            repeat(2,minmax(0,1fr));
          gap: 10px;
          margin: 13px 0;
        }

        .as-project-grid > section {
          padding: 13px;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          background: #ffffff;
        }

        .as-project-grid h4 {
          margin: 0 0 8px;
        }

        .as-project-deliverables {
          display: grid;
          gap: 7px;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .as-project-deliverables li {
          display: flex;
          gap: 8px;
          color: #475569;
          font-size: 10px;
          line-height: 1.4;
        }

        .as-project-deliverables li span {
          color: #16a34a;
          font-weight: 900;
        }

        .as-field {
          display: block;
          margin-top: 11px;
        }

        .as-field > span {
          display: block;
          margin-bottom: 6px;
          color: #334155;
          font-size: 10px;
          font-weight: 850;
        }

        .as-two-fields {
          display: grid;
          grid-template-columns:
            repeat(2,minmax(0,1fr));
          gap: 10px;
        }

        .as-preview-panel {
          margin-top: 15px;
          padding: 16px;
          border: 1px solid #bbf7d0;
          border-radius: 13px;
          background: #f0fdf4;
        }

        .as-preview-head {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          align-items: flex-start;
        }

        .as-preview-head h3 {
          margin: 4px 0;
        }

        .as-preview-head button {
          padding: 6px 9px;
          border: 1px solid #bbf7d0;
          border-radius: 7px;
          background: #ffffff;
          color: #166534;
          cursor: pointer;
        }

        .as-preview-grid {
          display: grid;
          grid-template-columns:
            repeat(4,minmax(0,1fr));
          gap: 8px;
          margin-top: 10px;
        }

        .as-preview-metric {
          display: flex;
          flex-direction: column;
          padding: 10px;
          border: 1px solid #dcfce7;
          border-radius: 9px;
          background: #ffffff;
        }

        .as-preview-metric span {
          color: #64748b;
          font-size: 8px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .as-preview-metric strong {
          margin-top: 4px;
          font-size: 18px;
        }

        .as-weighted-preview {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          align-items: center;
          margin-top: 9px;
          padding: 11px;
          border-radius: 9px;
          background: #166534;
          color: #ffffff;
        }

        .as-weighted-preview span {
          font-size: 9px;
          font-weight: 900;
        }

        .as-weighted-preview strong {
          font-size: 16px;
        }

        .as-preview-panel p {
          margin: 10px 0 0;
          color: #4d7c0f;
          font-size: 9px;
          line-height: 1.5;
        }

        .as-show-preview {
          margin-top: 12px;
          padding: 8px 11px;
          border: 1px solid #bbf7d0;
          border-radius: 8px;
          background: #ffffff;
          color: #166534;
          font-weight: 800;
          cursor: pointer;
        }

        .as-workspace-navigation {
          display: grid;
          grid-template-columns:
            auto
            minmax(0,1fr)
            auto;
          gap: 12px;
          align-items: center;
          margin-top: 16px;
          padding-top: 15px;
          border-top: 1px solid #e2e8f0;
        }

        .as-workspace-navigation button {
          padding: 9px 11px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          background: #ffffff;
          color: #334155;
          font-weight: 800;
          cursor: pointer;
        }

        .as-workspace-navigation button:disabled {
          opacity: .4;
          cursor: not-allowed;
        }

        .as-workspace-navigation > div {
          display: flex;
          align-items: center;
          flex-direction: column;
        }

        .as-workspace-navigation span {
          color: #94a3b8;
          font-size: 8px;
        }

        .as-workspace-navigation strong {
          margin-top: 2px;
          font-size: 11px;
        }

        .as-submit-section {
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

        .as-submit-section h2 {
          margin: 6px 0;
        }

        .as-submit-section p {
          max-width: 820px;
          margin: 0;
          color: #94a3b8;
          line-height: 1.55;
        }

        .as-submit-status {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 280px;
        }

        .as-submit-status > div {
          display: flex;
          flex-direction: column;
        }

        .as-submit-status span {
          color: #94a3b8;
          font-size: 8px;
          text-transform: uppercase;
        }

        .as-submit-status strong {
          font-size: 21px;
        }

        .as-submit-status button {
          padding: 13px 16px;
          border: 0;
          border-radius: 9px;
          background: #dc2626;
          color: #ffffff;
          font-weight: 900;
          white-space: nowrap;
          cursor: pointer;
        }

        .as-submit-status button:disabled {
          opacity: .6;
          cursor: wait;
        }

        .as-footer {
          padding: 17px 2px 0;
          color: #94a3b8;
          font-size: 9px;
          line-height: 1.5;
        }

        .as-state {
          min-height: 70vh;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          padding: 30px;
          text-align: center;
          color: #0f172a;
        }

        .as-state-icon {
          font-size: 40px;
        }

        .as-state p {
          max-width: 600px;
          color: #64748b;
        }

        .as-state button {
          padding: 11px 14px;
          border: 0;
          border-radius: 8px;
          background: #dc2626;
          color: #ffffff;
          font-weight: 900;
          cursor: pointer;
        }

        @media(max-width: 1080px) {
          .as-hero {
            grid-template-columns: 1fr;
          }

          .as-evidence-grid {
            grid-template-columns:
              repeat(2,minmax(0,1fr));
          }

          .as-layout {
            grid-template-columns: 1fr;
          }

          .as-skill-sidebar {
            position: static;
          }

          .as-skill-nav-list {
            grid-template-columns:
              repeat(2,minmax(0,1fr));
          }
        }

        @media(max-width: 760px) {
          .as-page {
            padding: 14px;
          }

          .as-hero {
            padding: 24px;
          }

          .as-evidence-grid {
            grid-template-columns: 1fr;
          }

          .as-instructions {
            flex-direction: column;
          }

          .as-workspace {
            padding: 17px;
          }

          .as-skill-nav-list {
            grid-template-columns: 1fr;
          }

          .as-skill-head {
            flex-direction: column;
          }

          .as-required {
            align-items: flex-start;
          }

          .as-options {
            grid-template-columns: 1fr;
          }

          .as-project-grid,
          .as-two-fields {
            grid-template-columns: 1fr;
          }

          .as-preview-grid {
            grid-template-columns:
              repeat(2,minmax(0,1fr));
          }

          .as-workspace-navigation {
            grid-template-columns: 1fr;
          }

          .as-workspace-navigation button {
            width: 100%;
          }

          .as-submit-section {
            flex-direction: column;
            align-items: stretch;
          }

          .as-submit-status {
            min-width: 0;
            justify-content: space-between;
          }
        }

        @media(max-width: 480px) {
          .as-preview-grid {
            grid-template-columns: 1fr;
          }

          .as-submit-status {
            align-items: stretch;
            flex-direction: column;
          }
        }
      `}</style>
    </main>
  );
}

/*
ASSESSMENT IMPLEMENTATION / QA DOCUMENTATION
*/
