import pool from "../config/db.js";

export const createUserTable = async () => {
  const queryText = `
    create table if not exists users(
    id serial primary key,
    name varchar(100) not null,
    email varchar(100) unique not null,
    created_at timestamp default NOW()
  )`;

  try {
    pool.query(queryText);
    console.log("User table created if not exists")
  } catch (err) {
    console.log("Error creating users table: ", err);
  }
}