import { useState } from "react";

function Projects() {
  const stored =
    localStorage.getItem(
      "nextpathProjects"
    );

  const [projects, setProjects] =
    useState(
      stored
        ? JSON.parse(stored)
        : []
    );

  const [form, setForm] =
    useState({
      title: "",
      skill: "",
      description: "",
      github: "",
    });

  const saveProject = (e) => {
    e.preventDefault();

    const project = {
      id: Date.now(),
      ...form,
      status: "Submitted",
      submittedAt:
        new Date().toLocaleDateString(),
    };

    const updated = [
      ...projects,
      project,
    ];

    setProjects(updated);

    localStorage.setItem(
      "nextpathProjects",
      JSON.stringify(updated)
    );

    setForm({
      title: "",
      skill: "",
      description: "",
      github: "",
    });
  };

  const updateField = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  return (
    <div>
      <h1>Projects & Evidence</h1>

      <p style={{ color: "#6B7280" }}>
        Demonstrate your skills through
        practical projects.
      </p>

      <div
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "16px",
          border:
            "1px solid #E5E7EB",
          marginTop: "24px",
        }}
      >
        <h2>Submit Project Evidence</h2>

        <form onSubmit={saveProject}>
          <Input
            name="title"
            placeholder="Project Title"
            value={form.title}
            onChange={updateField}
          />

          <Input
            name="skill"
            placeholder="Skill Demonstrated"
            value={form.skill}
            onChange={updateField}
          />

          <textarea
            name="description"
            placeholder="Describe what you built..."
            value={
              form.description
            }
            onChange={updateField}
            required
            style={{
              width: "100%",
              minHeight: "100px",
              boxSizing: "border-box",
              padding: "12px",
              marginBottom: "15px",
              borderRadius: "8px",
              border:
                "1px solid #D1D5DB",
            }}
          />

          <Input
            name="github"
            placeholder="GitHub or Portfolio URL"
            value={form.github}
            onChange={updateField}
          />

          <button
            type="submit"
            style={{
              padding: "12px 20px",
              background: "#C9151E",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            Submit Evidence
          </button>
        </form>
      </div>

      <h2
        style={{
          marginTop: "32px",
        }}
      >
        Your Projects
      </h2>

      {projects.length === 0 && (
        <p style={{ color: "#6B7280" }}>
          No project evidence submitted yet.
        </p>
      )}

      {projects.map((project) => (
        <div
          key={project.id}
          style={{
            background: "white",
            padding: "22px",
            borderRadius: "14px",
            border:
              "1px solid #E5E7EB",
            marginTop: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
            }}
          >
            <h2>{project.title}</h2>

            <span
              style={{
                background: "#FEF3C7",
                color: "#92400E",
                padding: "6px 10px",
                borderRadius:
                  "999px",
                height: "fit-content",
              }}
            >
              {project.status}
            </span>
          </div>

          <p>
            Skill:
            {" "}
            <strong>
              {project.skill}
            </strong>
          </p>

          <p>
            {project.description}
          </p>

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
            >
              View Evidence
            </a>
          )}
        </div>
      ))}
    </div>
  );
}

function Input({
  name,
  placeholder,
  value,
  onChange,
}) {
  return (
    <input
      required
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={{
        width: "100%",
        boxSizing: "border-box",
        padding: "12px",
        marginBottom: "15px",
        borderRadius: "8px",
        border:
          "1px solid #D1D5DB",
      }}
    />
  );
}

export default Projects;