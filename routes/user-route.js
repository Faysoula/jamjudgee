const express = require("express");
const {
  getUserController,
  getUserByIdController,
  insertUserController,
  updateUserController,
  deleteUserController,
} = require("../controllers/user-controller");

const {
  insertedUserValidation,
  updateUserValidation,
  deleteuservalid,
} = require("../validators/user-valid");

const router = express.Router();

router.get("/users", getUserController);
router.get("/findbyid/:id", getUserByIdController);
router.post("/insertUser", insertedUserValidation, insertUserController);
router.put("/updateUser", updateUserValidation, updateUserController);
router.delete("/deleteUser/:id", deleteuservalid, deleteUserController);

module.exports = router;
