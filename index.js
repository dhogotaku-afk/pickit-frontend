const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

mongoose.connect("mongodb+srv://pickitadmin:pickit123@pickit.zoce3ur.mongodb.net/pickit?retryWrites=true&w=majority");

const UserSchema = new mongoose.Schema({
  phone: String,
  password: String,
  balance: {
    type: Number,
    default: 0
  }
});

const User = mongoose.model("User", UserSchema);

app.post("/register", async (req, res) => {

  const { phone, password } = req.body;

  const existing = await User.findOne({ phone });

  if (existing) {
    return res.json({
      message: "User already exists"
    });
  }

  const user = new User({
    phone,
    password,
    balance: 0
  });

  await user.save();

  res.json({
    success: true
  });

});

app.post("/login", async (req, res) => {

  const { phone, password } = req.body;

  const user = await User.findOne({
    phone,
    password
  });

  if (!user) {
    return res.json({
      success: false
    });
  }

  res.json({
    success: true,
    phone: user.phone,
    balance: user.balance
  });

});

app.post("/balance", async (req, res) => {

  const { phone } = req.body;

  const user = await User.findOne({ phone });

  if (!user) {
    return res.json({
      balance: 0
    });
  }

  res.json({
    balance: user.balance
  });

});

app.post("/place", async (req, res) => {

  const { phone } = req.body;

  const user = await User.findOne({ phone });

  if (!user) {
    return res.json({
      success: false
    });
  }

  if (user.balance < 0.20) {
    return res.json({
      success: false,
      message: "Not enough balance"
    });
  }

  user.balance -= 0.20;

  await user.save();

  res.json({
    success: true,
    balance: user.balance
  });

});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("PickIt server running");
});