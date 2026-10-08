import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    userId: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleRegister = (event) => {
    event.preventDefault();

    const savedUsers =
      JSON.parse(localStorage.getItem("nextpathUsers")) || [];

    const alreadyExists = savedUsers.some(
      (user) =>
        user.userId === form.userId ||
        user.email === form.email
    );

    if (alreadyExists) {
      setError(
        "User ID or email already exists."
      );

      return;
    }

    const newUser = {
      fullName: form.fullName,
      userId: form.userId,
      email: form.email,
      password: form.password,
    };

    savedUsers.push(newUser);

    localStorage.setItem(
      "nextpathUsers",
      JSON.stringify(savedUsers)
    );

    navigate("/login");
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
          width: "400px",
          background: "white",
          padding: "40px",
          borderRadius: "18px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#C9151E",
          }}
        >
          Create Account
        </h1>

        <form onSubmit={handleRegister}>
          <Input
            label="Full Name"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
          />

          <Input
            label="User ID"
            name="userId"
            value={form.userId}
            onChange={handleChange}
          />

          <Input
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
          />

          <Input
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
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
              background: "#C9151E",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Create Account
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          Already have an account?{" "}
          <Link to="/login">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

function Input({
  label,
  name,
  type = "text",
  value,
  onChange,
}) {
  return (
    <div>
      <label>{label}</label>

      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required
        style={{
          width: "100%",
          boxSizing: "border-box",
          padding: "12px",
          marginTop: "7px",
          marginBottom: "17px",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      />
    </div>
  );
}

export default Register;