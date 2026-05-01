import "./Signup.css";
import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [data, setData] = useState({ name: "", email: "", password: "", role: "Member" });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    await API.post("/auth/signup", data);
    alert("Signup successful");
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Signup</h2>

        <input placeholder="Name" onChange={e => setData({...data, name: e.target.value})} />
        <input placeholder="Email" onChange={e => setData({...data, email: e.target.value})} />
        <input type="password" placeholder="Password" onChange={e => setData({...data, password: e.target.value})} />

        <select onChange={e => setData({...data, role: e.target.value})}>
          <option value="Member">Member</option>
          <option value="Admin">Admin</option>
        </select>

        <button onClick={handleSubmit}>Signup</button>

        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
}