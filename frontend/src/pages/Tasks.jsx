import "./Tasks.css";
import { useEffect, useState } from "react";
import API from "../services/api";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Tasks() {
  const { projectId } = useParams();

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [deadline, setDeadline] = useState("");

 
  const fetchTasks = async () => {
    try {
      const res = await API.get(`/tasks/${projectId}`);
      setTasks(res.data);
    } catch (err) {
      console.log("Fetch tasks error:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [projectId]);

  
  const addTask = async () => {
    if (!title) return alert("Enter task title");

    try {
      await API.post("/tasks", {
        title,
        projectId,
        assignedTo,
        deadline
      });

      setTitle("");
      setAssignedTo("");
      setDeadline("");

      fetchTasks();
    } catch (err) {
      console.log("Add task error:", err);
    }
  };

 
  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  
  const isOverdue = (task) => {
    return (
      task.deadline &&
      new Date(task.deadline) < new Date() &&
      task.status !== "Completed"
    );
  };

  return (
    <>
      <Navbar />
      <div className="tasks">
        <h2>Tasks</h2>

        <div className="task-input">
          <input
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            placeholder="Assign User ID"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
          />

          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />

          <button onClick={addTask}>Add</button>
        </div>

        {tasks.length === 0 && <p>No tasks yet</p>}

        {tasks.map((t) => (
          <div
            key={t._id}
            className={`task-card ${isOverdue(t) ? "overdue" : ""}`}
          >
            <p><strong>{t.title}</strong></p>

            <p>Assigned: {t.assignedTo?.name || "None"}</p>

            <p>
              Deadline:{" "}
              {t.deadline ? t.deadline.slice(0, 10) : "No deadline"}
            </p>

            {/* Status dropdown */}
            <select
              value={t.status}
              onChange={(e) =>
                API.put(`/tasks/${t._id}`, {
                  status: e.target.value
                }).then(fetchTasks)
              }
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>

            {/* Delete */}
            <button onClick={() => deleteTask(t._id)}>Delete</button>
          </div>
        ))}
      </div>
    </>
  );
}