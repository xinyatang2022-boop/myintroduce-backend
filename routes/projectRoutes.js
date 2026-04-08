const express = require("express");
const router = express.Router();

const projectController = require("../controllers/projectController");
const authMiddleware = require("../middleware/auth.middleware");

// CRUD
router.post("/", authMiddleware, projectController.createProject);   // CREATE
router.get("/", projectController.getProjects);                     // READ ALL
router.get("/:id", projectController.getProjectById);               // READ ONE
router.put("/:id", authMiddleware, projectController.updateProject); // UPDATE
router.delete("/:id", authMiddleware, projectController.deleteProject); // DELETE

module.exports = router;