import "./Dashboard.css";
import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await API.get("/tasks/all");
        setTasks(res.data);
      } catch (err) {
        console.log("Dashboard error:", err);
      }
    };

    fetchTasks();
  }, []);

  const total = tasks.length;

  const completed = tasks.filter(
    (t) => t.status === "Completed"
  ).length;

  const pending = tasks.filter(
    (t) => t.status !== "Completed"
  ).length;

 
  const overdue = tasks.filter(
    (t) =>
      t.deadline &&
      new Date(t.deadline) < new Date() &&
      t.status !== "Completed"
  ).length;

  return (
    <>
      <Navbar />
      <div className="dashboard">
        <h2>Dashboard</h2>

        <div className="stats">
          <div className="card total">Total: {total}</div>
          <div className="card completed">Completed: {completed}</div>
          <div className="card pending">Pending: {pending}</div>
          <div className="card overdue">Overdue: {overdue}</div>
        </div>
      </div>
    </>
  );
}