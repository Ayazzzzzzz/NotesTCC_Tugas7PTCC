import express from "express";
import {
  createNotes,
  deleteNotes,
  getNotes,
  getNoteById,
  updateNotes,
} from "../controller/NotesController.js";

const router = express.Router();

router.get("/Notes", getNotes);
router.get("/Notes/:id", getNoteById);
router.post("/add-Notes", createNotes);
router.put("/edit-Notes/:id", updateNotes);
router.delete("/delete-Notes/:id", deleteNotes);

export default router;