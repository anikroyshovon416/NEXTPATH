import {
  NavLink,
  useNavigate,
} from "react-router-dom";


function Sidebar() {
  const navigate = useNavigate();

  const currentUser = JSON.parse(
    localStorage.getItem(
      "nextpathCurrentUser"
    ) || "null"
  );


  const links = [
    {
      name: "Dashboard",
      path: "/",
      icon: "⌂",
    },

    {
      name: "Target Career",
      path: "/target-career",
      icon: "◎",
    },

    {
      name: "Required Skills",
      path: "/required-skills",
      icon: "◈",
    },

    {
      name: "Assessment",
      path: "/assessment",
      icon: "✓",
    },

    {
      name: "Assessment Report",
      path: "/assessment-report",
      icon: "▤",
    },

    {
      name: "Skill Gap",
      path: "/skill-gap",
      icon: "△",
    },

    {
      name: "Roadmap",
      path: "/roadmap",
      icon: "➜",
    },

    {
      name: "Progress",
      path: "/progress",
      icon: "◫",
    },

    {
      name: "Credentials",
      path: "/credentials",
      icon: "◇",
    },

    {
      name: "Opportunities",
      path: "/opportunities",
      icon: "★",
    },

    {
      name: "Projects",
      path: "/projects",
      icon: "▣",
    },

    {
      name: "Profile",
      path: "/profile",
      icon: "○",
    },
  ];


  const logout = () => {
    localStorage.removeItem(
      "nextpathLoggedIn"
    );

    localStorage.removeItem(
      "nextpathCurrentUser"
    );

    navigate("/login");
  };


  return (
    <aside className="sidebar">

      {/* BRAND */}

      <div className="sidebar-brand">
        <div className="brand-icon">
          N
        </div>

        <div>
          <div className="brand-title">
            NEXTPATH
          </div>

          <div className="brand-subtitle">
            Career Intelligence
          </div>
        </div>
      </div>


      {/* USER */}

      <div className="sidebar-user">
        <div className="user-avatar">
          {(
            currentUser?.fullName ||
            currentUser?.name ||
            "U"
          )
            .charAt(0)
            .toUpperCase()}
        </div>

        <div>
          <div className="user-name">
            {currentUser?.fullName ||
              currentUser?.name ||
              "Student"}
          </div>

          <div className="user-role">
            Learner
          </div>
        </div>
      </div>


      {/* NAVIGATION */}

      <nav className="sidebar-nav">

        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={
              link.path === "/"
            }
            className={({
              isActive,
            }) =>
              isActive
                ? "nav-link active"
                : "nav-link"
            }
          >
            <span className="nav-icon">
              {link.icon}
            </span>

            <span>
              {link.name}
            </span>
          </NavLink>
        ))}

      </nav>


      {/* LOGOUT */}

      <div className="sidebar-footer">

        <button
          className="logout-button"
          onClick={logout}
        >
          Sign Out
        </button>

      </div>

    </aside>
  );
}


export default Sidebar;