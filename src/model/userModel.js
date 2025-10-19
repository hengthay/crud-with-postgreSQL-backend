import pool from "../config/db.js"; 

// After create all of service that performance on database we have to use it in controller.
export const getAllUsersService = async () => {
  const result = await pool.query("select * from users");
  return result.rows;
}

export const getUsersByIdService = async (id) => {
  // Note $1 is a placeholder for prevent SQLInjection
  const result = await pool.query(
    "select * from users where id = $1",
    [id]
  );

  return result.rows[0];
}

export const createUsersService = async (name, email) => {
  const users = await getAllUsersService();
  // Find existing email in db
  const existingUsers = users.find(user => user.email === email);
  if(existingUsers) throw new Error("User is already exising in DB");
  // Note in case, that we run a query that such as insert update delete it will affected rows, so we have to RETURNING * to see rows that affected.
  const result = await pool.query(
    "insert into users(name, email) values($1, $2) RETURNING *", 
    [name, email]
  );
  // Return first element from database
  return result.rows[0];
}

export const deleteUsersService = async (id) => {
  const result = await pool.query(
    "delete from users where id = $1 RETURNING *",
    [id]
  );

  return result.rows[0];
}
export const updateUsersService = async (id, name, email) => {
  const result = await pool.query(
    "update users set name = $1, email = $2 where id = $3 RETURNING *", 
    [name, email, id]
  );

  return result.rows[0];
}