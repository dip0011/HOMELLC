const jwt = require("jsonwebtoken");
const User = require("../db/models/user");

//Authentication Middleware
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      return res.status(401).send({
        success: false,
        message: "Please Authenticate!",
      });
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).send({
      success: false,
      message: "Please Authenticate!",
    });
  }
};

module.exports = auth;
