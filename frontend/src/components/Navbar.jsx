import "./Navbar.css";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="navbar">
      <h2>Task Manager</h2>

      <div>
        <button onClick={() => navigate("/")}>Dashboard</button>
        <button onClick={() => navigate("/projects")}>Projects</button>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}