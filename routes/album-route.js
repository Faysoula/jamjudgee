const express = require("express");
const {
  getAlbumsController,
  getAlbumsbyIdcontroller,
  insertAlbumcontroller,
  updateAlbumcontroller,
  deleteAlbumController,
} = require("../controllers/album-controller");
const {
  insertAlbumValid,
  updatealbumvalid,
  deletealbumvalid,
} = require("../validators/album-valid");

const router = express.Router();


router.get("/allalbums", getAlbumsController);
router.get("/getalbumbyid/:id", getAlbumsbyIdcontroller);
router.post("/insertalbum", insertAlbumValid, insertAlbumcontroller);
router.put("/updatealbum", updatealbumvalid, updateAlbumcontroller);
router.delete("/deletealbum/:id", deletealbumvalid, deleteAlbumController);

module.exports = router;
