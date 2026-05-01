const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminOnly");
const { createProject, getProjects } = require("../controllers/projectController");


router.post("/", auth, adminOnly, createProject);


router.get("/", auth, getProjects);

module.exports = router;