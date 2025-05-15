import express from "express";
import SheetController from "../controllers/SheetController";

const router = express.Router();

// Endpoint untuk mendapatkan data lulus dalam JSON
router.get("/api/lulus", SheetController.getLulusData);

export default router;
