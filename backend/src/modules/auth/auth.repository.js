import pool from "../../config/db.js";

export const findUserByEmail = async (email) => {
  const query = `SELECT * FROM users WHERE email = $1 AND status = TRUE`;
  const { rows } = await pool.query(query, [email]);
  return rows[0];
};
