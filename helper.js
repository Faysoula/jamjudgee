const { query } = require("./database/Database");

/**
 * Checks if a specific ID exists in a given table.
 *
 * @param {string} tableName The name of the table to search in.
 * @param {string} fieldName The field name to match against the ID.
 * @param {number|string} idVal The ID value to search for.
 * @returns {Promise<boolean>} True if the ID exists, false otherwise.
 */
const checkIfIdExists = async (tableName, fieldName, idVal) => {
  const result = await query(
    `SELECT ${fieldName} FROM ${tableName} WHERE ${fieldName} = ${idVal}`,
    [idVal]
  );

  return result.length === 1;
};

module.exports = {
  checkIfIdExists,
};

