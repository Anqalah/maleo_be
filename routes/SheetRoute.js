import express from "express";
import SheetController from "../controllers/SheetController.js";

const router = express.Router();

// Endpoint untuk mendapatkan data lulus dalam JSON
router.get("/", SheetController.getLulusData);

export default router;
