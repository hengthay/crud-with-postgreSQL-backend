import pkg from 'pg';
import dotenv from "dotenv";

// Retrive Pool from pkg
const { Pool } = pkg;

dotenv.config();

// Initialize instance of pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

pool.on("connect", () => {
  console.log("Connection pool establised with Database");
})

export default pool;
