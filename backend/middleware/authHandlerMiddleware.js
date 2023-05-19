const jwt = require("jsonwebtoken");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const asyncHandler = require("express-async-handler");

const protectedRoute = asyncHandler(async (req, res, next) => {
  let token = "";
  if (req.headers && req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
    try {
      const data = jwt.verify(token, process.env.SECRET_KEY);
      req.ID = data.id;
      req.role = data.role;
      next();
    } catch (error) {
      throw new Error("Not Authorized, Invalid Token");
    }
  } else {
    throw new Error("No authorization token. Please provide it.");
  }
});



module.exports = { protectedRoute };
