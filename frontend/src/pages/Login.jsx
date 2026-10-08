import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();

    const savedUsers =
      JSON.parse(localStorage.getItem("nextpathUsers")) || [];

    const user = savedUsers.find(
      (item) =>
        item.userId === userId &&
        item.password === password
    );

    if (!user) {
      setError("Invalid User ID or password.");
      return;
    }

    localStorage.setItem(
      "nextpathLoggedIn",
      "true"
    );

    localStorage.setItem(
      "nextpathCurrentUser",
      JSON.stringify(user)
    );

    navigate("/");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#101827",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          width: "380px",
          background: "white",
          padding: "40px",
          borderRadius: "18px",
          boxShadow:
            "0 15px 40px rgba(0,0,0,0.25)",
        }}
      >
        <h1
          style={{
            color: "#C9151E",
            textAlign: "center",
            fontSize: "38px",
            marginBottom: "5px",
          }}
        >
          NEXTPATH
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#777",
            marginBottom: "30px",
          }}
        >
          Career Intelligence Platform
        </p>

        <h2>Sign In</h2>

        <form onSubmit={handleLogin}>
          <label>User ID</label>

          <input
            type="text"
            value={userId}
            onChange={(e) =>
              setUserId(e.target.value)
            }
            placeholder="Enter User ID"
            required
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "12px",
              marginTop: "7px",
              marginBottom: "18px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />

          <label>Password</label>

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            placeholder="Enter Password"
            required
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "12px",
              marginTop: "7px",
              marginBottom: "18px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />

          {error && (
            <p style={{ color: "#C9151E" }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "13px",
              border: "none",
              borderRadius: "8px",
              background: "#C9151E",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Sign In
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          New user?{" "}
          <Link to="/register">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;