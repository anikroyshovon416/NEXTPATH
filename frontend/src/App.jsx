import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

import Dashboard from "./pages/Dashboard.jsx";
import TargetCareer from "./pages/TargetCareer.jsx";
import RequiredSkills from "./pages/RequiredSkills.jsx";
import Assessment from "./pages/Assessment.jsx";
import AssessmentReport from "./pages/AssessmentReport.jsx";
import SkillGap from "./pages/SkillGap.jsx";
import Roadmap from "./pages/Roadmap.jsx";
import Progress from "./pages/Progress.jsx";
import Credentials from "./pages/Credentials.jsx";
import Opportunities from "./pages/Opportunities.jsx";
import Projects from "./pages/Projects.jsx";
import Profile from "./pages/Profile.jsx";

import Sidebar from "./components/Sidebar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";


function AppLayout({ children }) {
  return (
    <div className="app-shell">
      <Sidebar />

      <main className="main-content">
        {children}
      </main>
    </div>
  );
}


function ProtectedPage({ children }) {
  return (
    <ProtectedRoute>
      <AppLayout>
        {children}
      </AppLayout>
    </ProtectedRoute>
  );
}


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* DASHBOARD */}

        <Route
          path="/"
          element={
            <ProtectedPage>
              <Dashboard />
            </ProtectedPage>
          }
        />


        {/* CAREER */}

        <Route
          path="/target-career"
          element={
            <ProtectedPage>
              <TargetCareer />
            </ProtectedPage>
          }
        />


        {/* REQUIRED SKILLS */}

        <Route
          path="/required-skills"
          element={
            <ProtectedPage>
              <RequiredSkills />
            </ProtectedPage>
          }
        />


        {/* ASSESSMENT */}

        <Route
          path="/assessment"
          element={
            <ProtectedPage>
              <Assessment />
            </ProtectedPage>
          }
        />


        {/* ASSESSMENT REPORT */}

        <Route
          path="/assessment-report"
          element={
            <ProtectedPage>
              <AssessmentReport />
            </ProtectedPage>
          }
        />


        {/* SKILL GAP */}

        <Route
          path="/skill-gap"
          element={
            <ProtectedPage>
              <SkillGap />
            </ProtectedPage>
          }
        />


        {/* ROADMAP */}

        <Route
          path="/roadmap"
          element={
            <ProtectedPage>
              <Roadmap />
            </ProtectedPage>
          }
        />


        {/* PROGRESS */}

        <Route
          path="/progress"
          element={
            <ProtectedPage>
              <Progress />
            </ProtectedPage>
          }
        />


        {/* CREDENTIALS */}

        <Route
          path="/credentials"
          element={
            <ProtectedPage>
              <Credentials />
            </ProtectedPage>
          }
        />


        {/* OPPORTUNITIES */}

        <Route
          path="/opportunities"
          element={
            <ProtectedPage>
              <Opportunities />
            </ProtectedPage>
          }
        />


        {/* PROJECTS */}

        <Route
          path="/projects"
          element={
            <ProtectedPage>
              <Projects />
            </ProtectedPage>
          }
        />


        {/* PROFILE */}

        <Route
          path="/profile"
          element={
            <ProtectedPage>
              <Profile />
            </ProtectedPage>
          }
        />


        {/* FALLBACK */}

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
    </BrowserRouter>
  );
}


export default App;