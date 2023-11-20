const express = require("express");
const { query } = require("./database/Database");
const moment = require("moment");
const fileUpload = require("express-fileupload");

require("dotenv").config();

const mysql = require("mysql2");

const bodyParser = require("body-parser");
const cors = require("cors");

const port = process.env.APP_PORT;

const app = express();

// Middleware to parse JSON and urlencoded data

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({ origin: "*" }));

// Importing routes for different functionalities
const userRoute = require("./routes/user-route");
const albumRoute = require("./routes/album-route");
const artistsRoute = require("./routes/artist-route");
const songsroute = require("./routes/songs-route");
const ratingforalbumroute = require("./routes/ratingofalbum-route");
const ratingforsongroute = require("./routes/ratingofsong-route")

app.get("/homepage", (req, res) => {
  res.status(200).json({ message: "this is the home page" });
});

// Route for uploading album covers
app.get("/uploadalbumcover", (req, res) => {
  res.sendFile(__dirname + "/views/upload.html");
});
// Middleware for handling file uploads
app.use(fileUpload());

// Static route for uploaded files
app.use("/views/upload.html", express.static("uploads"));
// API routes
app.use("/api/users", userRoute);
app.use("/api/album", albumRoute);
app.use("/api/artist", artistsRoute);
app.use("/api/songs", songsroute);
app.use("/api/ratingforalbum", ratingforalbumroute);
app.use("/api/ratingforsong", ratingforsongroute);

// Serving static files from 'static' directory
app.use(express.static(__dirname + "/static"));

// Start the server on the specified port
app.listen(port, () => {
  console.log(`My app is listening ${port}`);
});
