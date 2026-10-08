import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import TargetCareer from "./pages/TargetCareer";
import RequiredSkills from "./pages/RequiredSkills";
import Assessment from "./pages/Assessment";
import AssessmentReport from "./pages/AssessmentReport";
import SkillGap from "./pages/SkillGap";
import Roadmap from "./pages/Roadmap";
import Progress from "./pages/Progress";
import Projects from "./pages/Projects";
import Credentials from "./pages/Credentials";
import Opportunities from "./pages/Opportunities";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";

import "./App.css";

function isLoggedIn() {
  return localStorage.getItem("nextpathLoggedIn") === "true";
}

function ProtectedLayout() {
  const location = useLocation();

  if (!isLoggedIn()) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location.pathname,
        }}
      />
    );
  }

  return (
    <div className="app-shell">
      <Sidebar />

      <div className="app-main">
        <Routes>
          <Route
            path="/"
            element={<Dashboard />}
          />

          <Route
            path="/target-career"
            element={<TargetCareer />}
          />

          <Route
            path="/required-skills"
            element={<RequiredSkills />}
          />

          <Route
            path="/assessment"
            element={<Assessment />}
          />

          <Route
            path="/assessment-report"
            element={<AssessmentReport />}
          />

          <Route
            path="/skill-gap"
            element={<SkillGap />}
          />

          <Route
            path="/roadmap"
            element={<Roadmap />}
          />

          <Route
            path="/progress"
            element={<Progress />}
          />

          <Route
            path="/projects"
            element={<Projects />}
          />

          <Route
            path="/credentials"
            element={<Credentials />}
          />

          <Route
            path="/opportunities"
            element={<Opportunities />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />

          <Route
            path="*"
            element={
              <Navigate
                to="/"
                replace
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

function PublicOnlyRoute({ children }) {
  if (isLoggedIn()) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  return children;
}

export default function App() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicOnlyRoute>
            <Login />
          </PublicOnlyRoute>
        }
      />

      <Route
        path="/register"
        element={
          <PublicOnlyRoute>
            <Register />
          </PublicOnlyRoute>
        }
      />

      <Route
        path="/*"
        element={
          <ProtectedLayout />
        }
      />
    </Routes>
  );
}