import express from "express";
import {
  createRequirement,
  getRequirements,
  getRequirementById,
  updateRequirement,
  deleteRequirement,
} from "../controllers/requirementController.js";

const router = express.Router();

// POST - Create a new requirement
router.post("/", createRequirement);

// GET - Get all requirements with optional filters
router.get("/", getRequirements);

// GET - Get requirement by ID
router.get("/:id", getRequirementById);

// PUT - Update requirement
router.put("/:id", updateRequirement);

// DELETE - Delete requirement
router.delete("/:id", deleteRequirement);

export default router;
