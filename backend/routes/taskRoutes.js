const router = require("express").Router();
const auth = require("../middleware/authMiddleware");

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getAllTasks
} = require("../controllers/taskController");

router.post("/", auth, createTask);


router.get("/all", auth, getAllTasks);


router.get("/:projectId", auth, getTasks);


router.put("/:id", auth, updateTask);


router.delete("/:id", auth, deleteTask);

module.exports = router;