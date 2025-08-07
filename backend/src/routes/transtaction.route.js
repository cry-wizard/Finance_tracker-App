import express from "express";
import 'dotenv/config';
import { sql } from "../config/db.js";
import { createTransaction, deleteTransaction, getTransactionsByUserId, getTransactionSummary } from "../controllers/transaction.controller.js";

const router = express.Router();

router.get("/:userId", getTransactionsByUserId)

router.delete("/:id", deleteTransaction);

router.post("/", createTransaction);

router.get("/summary/:userId",getTransactionSummary);

export default router;