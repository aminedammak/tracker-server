const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("./models/User");
const authRoutes = require("./routes/authRoutes");
const requireAuth = require("./middlewares/requireAuth");
const app = express();
app.use(bodyParser.json());
app.use(authRoutes);

const mongoUri =
  "mongodb+srv://admin:passwordpassword@cluster0.5figg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(mongoUri, { useNewUrlParser: true });

mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance");
});
mongoose.connection.on("error", (err) => {
  console.error("Error connecting to mongo ", err);
});
app.get("/", requireAuth, (req, res) => {
  res.send(`You are logged in as: ${req.user.email}`);
});

app.listen(3000, () => {
  console.log("listening on post 3000");
});
