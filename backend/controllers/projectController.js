const Project = require("../models/Project");


exports.createProject = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ msg: "Project name required" });
    }

    const project = await Project.create({
      name,
      createdBy: req.user.id,
      members: [] // optional
    });

    res.json(project);
  } catch (err) {
    console.log("CREATE PROJECT ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};


exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      $or: [
        { createdBy: req.user.id },  // ✅ projects created by user
        { members: req.user.id }     // ✅ projects where user is member
      ]
    });

    res.json(projects);
  } catch (err) {
    console.log("GET PROJECTS ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};