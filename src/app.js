import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import errorHandling from "./middlewares/errorHandling.js";
import { createUserTable } from "./data/createUserTable.js";

dotenv.config();

const app = express();

// middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/api" , userRoutes)
// Error handling middleware
app.use(errorHandling);

// Create table before startin server
createUserTable();

// Testing Connect DB
app.get('/', async (req, res) => {
  console.log("Start");
  // To run the query on postgress
   try {
    const result = await pool.query("select current_database()");
    console.log(`The database name is: ${result.rows[0].current_database}`);
  } catch (err) {
    console.error("Error connecting:", err.message);
    res.status(500).send("Database connection error");
  }
})

export default app;