const express = require("express");
const router = express.Router();

const referenceController = require("../controllers/referenceController");
// CRUD
router.post("/", referenceController.createReference);
router.get("/", referenceController.getAllReferences);
router.get("/:id", referenceController.getReferenceById);
router.put("/:id", referenceController.updateReference);
router.delete("/:id", referenceController.deleteReference);

module.exports = router;