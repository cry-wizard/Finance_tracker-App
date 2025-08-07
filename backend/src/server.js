import express from "express";
import dotenv from "dotenv";
import { initDB } from "./config/db.js";
import Ratelimiter from "./controllers/middleware/reateLimiter.js";

import transactionRoutes from "./routes/transtaction.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware to parse JSON requests
app.use(Ratelimiter)
app.use(express.json());

// Initialize the database and create the transactions table if it doesn't exist


// Routes
app.use("/api/transactions", transactionRoutes);

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
