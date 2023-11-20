const { validationResult } = require("express-validator");
const {
  getUsers,
  getUserById,
  insertUser,
  updateUser,
  deleteUser,
} = require("../services/user-service");

const { insertArtist, updateArtist } = require("../services/artists-service");

const getUserController = async (req, res) => {
  try {
    const user = await getUsers();
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
};

const getUserByIdController = async (req, res) => {
  const user_id = req.params.id;

  try {
    const users = await getUserById(user_id);
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
};

const insertUserController = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    user_pass,
    user_username,
    user_firstname,
    user_lastname,
    user_dob,
    isartist,
    user_email,
  } = req.body;

  try {
    const response = await insertUser(
      user_pass,
      user_username,
      user_firstname,
      user_lastname,
      user_dob,
      isartist,
      user_email
    );

    let artistResponse = null;
    if (parseInt(isartist) === 1) {
      
      artistResponse = await insertArtist(
        response[0].user_id,
        req.body.artist_alias,
        req.body.artist_genre,
        req.body.artist_about
      );
    }

    res.status(201).json({ response });
  } catch (error) {
    res.status(500).json({ error: error?.message });
  }
};

const updateUserController = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    user_id,
    user_pass,
    user_username,
    user_firstname,
    user_lastname,
    user_dob,
    isartist,
    user_email,
  } = req.body;

  if (!user_id) {
    return res.status(400).json({ message: "missing data" });
  }

  try {
    const response = await updateUser(
      user_id,
      user_pass,
      user_username,
      user_firstname,
      user_lastname,
      user_dob,
      isartist,
      user_email
    );

    let artistResponse = null;
    if (parseInt(isartist) === 1) {
      // Assuming artist_alias, artist_genre, artist_about are available in req.body
      artistResponse = await updateArtist(
        user_id,
        req.body.artist_alias,
        req.body.artist_genre,
        req.body.artist_about
      );
    }
    res.status(201).json({ response });
  } catch (error) {
    res.status(500).json({ error: error?.message });
  }
};

const deleteUserController = async (req, res) => {
  const user_id = req.params.id;

  if (!user_id) {
    return res.status(400).json({ message: "missing user id" });
  }

  try {
    const deletion = await deleteUser(user_id);
    if (deletion.affectedRows === 0) {
      return res.status(400).json({ message: "user id not found" });
    }
    res.status(200).json({ deletion });
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
};

module.exports = {
  getUserController,
  getUserByIdController,
  insertUserController,
  updateUserController,
  deleteUserController,
};
