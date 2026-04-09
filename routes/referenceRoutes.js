const express = require("express");
const router = express.Router();

const referenceController = require("../controllers/referenceController");
const authMiddleware = require("../middleware/auth.middleware");

// CRUD
router.post("/", authMiddleware, referenceController.createReference);
router.get("/", referenceController.getAllReferences);
router.get("/:id", referenceController.getReferenceById);
router.put("/:id", authMiddleware, referenceController.updateReference);
router.delete("/:id", authMiddleware, referenceController.deleteReference);

module.exports = router;