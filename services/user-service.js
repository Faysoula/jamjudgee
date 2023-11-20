const { query } = require("../database/Database");
const moment = require("moment");

/**
 * Retrieves all users from the database.
 *
 * @returns {users} An array of user objects.
 */
const getUsers = async () => {
  try {
    let sql = `select * from users`;
    const users = await query(sql);
    return users;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Retrieves a specific user by their user ID.
 *
 * @param {number} user_id The ID of the user to retrieve.
 * @returns {user} A user object if found.
 */
const getUserById = async (user_id) => {
  try {
    let sql = `SELECT * FROM users WHERE user_id = ?`;
    const user = await query(sql, [user_id]);
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Inserts a new user into the database.
 *
 * @param {string} user_pass The password of the user.
 * @param {string} user_username The username of the user.
 * @param {string} user_firstname The first name of the user.
 * @param {string} user_lastname The last name of the user.
 * @param {string} user_dob The date of birth of the user.
 * @param {boolean} isartist Whether the user is an artist.
 * @param {string} user_email The email of the user.
 * @returns {change} The inserted user object.
 */
const insertUser = async (
  user_pass,
  user_username,
  user_firstname,
  user_lastname,
  user_dob,
  isartist,
  user_email
) => {
  try {
    let sql = `INSERT INTO users (user_pass, user_username, user_firstname, 
        user_lastname, user_dob, isartist, user_email) 
        values (?,?,?,?,?,?,?)`;

    const change = await query(sql, [
      user_pass,
      user_username,
      user_firstname,
      user_lastname,
      moment(user_dob).format("YYYY-MM-DD"),
      isartist,
      user_email,
    ]);

    let insertedUser = await query(`SELECT * FROM users WHERE user_id = ?`, [
      change?.insertId,
    ]);

    return insertedUser;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Updates an existing user in the database.
 *
 * @param {number} user_id The ID of the user to update.
 * @param {string} user_pass New password of the user.
 * @param {string} user_username New username of the user.
 * @param {string} user_firstname New first name of the user.
 * @param {string} user_lastname New last name of the user.
 * @param {string} user_dob New date of birth of the user.
 * @param {boolean} isartist Updated artist status of the user.
 * @param {string} user_email New email of the user.
 * @returns {result} The result of the update operation.
 */
const updateUser = async (
  user_id,
  user_pass,
  user_username,
  user_firstname,
  user_lastname,
  user_dob,
  isartist,
  user_email
) => {
  try {
    let sql = `UPDATE users set
        user_pass = ?,
        user_username = ?,
        user_firstname = ?,
        user_lastname = ?,
        user_dob = ?,
        isartist = ?,
        user_email = ? where user_id = ?`;

    const result = query(sql, [
      user_pass,
      user_username,
      user_firstname,
      user_lastname,
      moment(user_dob).format("YYYY-MM-DD"),
      isartist,
      user_email,
      user_id,
    ]);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Deletes a user from the database based on their ID.
 *
 * @param {number} user_id The ID of the user to delete.
 * @returns {Promise} The result of the delete operation.
 */
const deleteUser = async (user_id) => {
  try {
    return await query(`DELETE FROM users WHERE user_id = ?`, [user_id]);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getUsers,
  getUserById,
  insertUser,
  updateUser,
  deleteUser,
};
