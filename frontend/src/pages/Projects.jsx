import "./Projects.css";
import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

 
  const fetchProjects = async () => {
    try {
      const res = await API.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.log("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  
  const createProject = async () => {
    if (!name) return alert("Enter project name");

    try {
      await API.post("/projects", { name });
      setName("");
      fetchProjects();
    } catch (err) {
      console.log("Create error:", err);
      alert("Only Admin can create projects");
    }
  };

  return (
    <>
      <Navbar />
      <div className="projects">
        <h2>Projects</h2>

        {/*  Show only for Admin */}
        {user?.role === "Admin" && (
          <div className="project-input">
            <input
              value={name}
              placeholder="New Project"
              onChange={(e) => setName(e.target.value)}
            />
            <button onClick={createProject}>Create</button>
          </div>
        )}

        {projects.length === 0 && <p>No projects yet</p>}

        {projects.map((p) => (
          <div key={p._id} className="project-card">
            <h3>{p.name}</h3>

            {/*  Show team size */}
            <p>Members: {p.members?.length || 0}</p>

            {/*  Navigate to tasks */}
            <Link to={`/tasks/${p._id}`}>
              <button>View Tasks</button>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}