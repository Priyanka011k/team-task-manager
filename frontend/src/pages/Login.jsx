import "./Login.css";
import { useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await API.post("/auth/login", data);
      login(res.data.token);
      navigate("/");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>

        <input placeholder="Email" onChange={e => setData({...data, email: e.target.value})} />
        <input type="password" placeholder="Password" onChange={e => setData({...data, password: e.target.value})} />

        <button onClick={handleSubmit}>Login</button>

        <p>Don't have an account? <Link to="/signup">Signup</Link></p>
      </div>
    </div>
  );
}