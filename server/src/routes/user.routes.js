const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const User = require("../db/models/user");

router.post("/", async (req, res) => {
  const exsitingUser = await User.findOne({ email: req.body.email });
  if (exsitingUser) {
    return res.status(400).send({
      success: false,
      message: "User is already Registered",
    });
  }
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send({
      success: true,
      message: "Registration successful",
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message || "Invalid Registration Inputs",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findByCredential(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.status(200).send({
      success: true,
      message: "Loggedin successfully",
      token,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message || "Login Failed",
    });
  }
});

router.post("/forgotPassword", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
      firtName: req.body.firtName,      
      lastName: req.body.lastName,      
    });

    if(user){
      user.password = req.body.password
      user.save();
      return res.status(200).send({
        success: true,
        message: "Password Changed successfully",
      });
    };
    res.status(400).send({
      success: false,
      message: "Unable to change Password, Please try again!",
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message || "Password Change Failed",
    });
  }
});

router.get("/getAUserProfile", auth, async (req, res) => {
  try {
    const { firstName, lastName} = req.user;
    res.status(200).send({
      success: true,
      message: "Loggedin successfully",
      user: { firstName, lastName},
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message || "Login Failed",
    });
  }
});

router.get("/logout", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.status(200).send({
      success: true,
      message: "Successfully Logout",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message || "Failed to Logout!",
    });
  }
});

module.exports = router;
