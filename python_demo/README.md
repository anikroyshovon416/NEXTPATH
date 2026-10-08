# NEXTPATH — Career Intelligence Platform

This folder contains a standalone Python/Streamlit demo of the full NEXTPATH workflow so the dashboard and working principles are visible in one Python application.

## Workflow

```text
Target Career
→ Required Skills
→ Known skills only
→ Quiz + Problem Solving + Coding Assessment
→ Skill Gap
→ Personalized Roadmap
→ Progress Tracking
→ Re-Assessment
→ Verified Skill
→ NEXTPATH Credential
→ Opportunities
```

## Main logic

If a user does not select a skill as known:

```text
Demonstrated Score = 0
Skill Gap = 100%
```

For assessed skills:

```text
Gap % = max(0, (Required Score - Demonstrated Score) / Required Score × 100)
```

Career readiness:

```text
Career Readiness = 100 - Average Skill Gap %
```

For technical skills, the intended assessment weighting is:

```text
Quiz             = 30%
Problem Solving  = 30%
Coding           = 40%
```

A skill becomes verified when:

```text
Re-assessment Score >= Required Career Score
```

## Run the dashboard

Open PowerShell in this folder.

Create a virtual environment:

```powershell
python -m venv venv
```

Activate it:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy RemoteSigned
venv\Scripts\activate
```

Install dependencies:

```powershell
pip install -r requirements.txt
```

Run:

```powershell
streamlit run nextpath_demo.py
```

Then open the local URL shown by Streamlit, usually:

```text
http://localhost:8501
```

## Files

```text
NEXTPATH_Python_Demo/
├── nextpath_demo.py
├── README.md
└── requirements.txt
```

## Notes

- The Python file is a standalone visual demonstration of the project.
- It does not replace your React + FastAPI implementation.
- Career demand/salary values are prototype values.
- Text/code scoring in this demo is simplified.
- The demo does not execute arbitrary submitted code.
- Paid-course links are search links, not claims that one course is always best.
- NEXTPATH certificates are project-issued verification credentials, not official third-party certificates.
