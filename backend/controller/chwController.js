const asyncHandler = require("express-async-handler");
const { CHW } = require("../models");
const bcrypt = require("bcrypt");
const generateToken = require("../config/generateToken");
const { isPermissionGranted } = require("../config/accessControl");
const actions = require("../constants/action_RBAC");

const getCHWs = asyncHandler(async (req, res) => {
  const permission = isPermissionGranted(req.role, "chw", actions.READ_ANY);
  if (permission) {
    const CHWs = await CHW.find().select("-password");
    return res.status(200).json({ data: CHWs });
  } else {
    res.statusCode = 403;
    throw new Error("You are forbidden to access this.");
  }
});

const getCHW = asyncHandler(async (req, res) => {
  const permission = isPermissionGranted(req.role, "chw", actions.READ_OWN);
  console.log(permission);
  if (permission) {
    console.log("asdad")
    const chw = await CHW.findOne({ _id: req.params.chwId }).select(
      "-password"
    );
    return res.status(200).json({ data: chw });
  } else {
    res.statusCode = 403;
    throw new Error("You are forbidden to access this.");
  }
});

const registerCHW = asyncHandler(async (req, res) => {
  const chw = await CHW.findOne({ email: req.body.email });
  if (chw) {
    res.statusCode = 400;
    throw new Error("CHW with email " + req.body.email + " already exists.");
  }
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  const newCHW = await CHW.create({ ...req.body, password: hashedPassword });
  return res.status(200).json({ data: newCHW });
});

const loginCHW = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const chw = await CHW.findOne({ email });
  if (!chw) {
    res.statusCode = 400;
    throw new Error("Not registered. please register first");
  }
  const checkPassword =await bcrypt.compare(password, chw.password);
  if (!checkPassword) {
    res.statusCode = 401;
    throw new Error("Invalid credentials");
  } else {
    return res.status(200).json({
      data: {
        name: chw.name,
        email: chw.email,
        phone: chw.phone,
        token: generateToken(chw._id, "CHW"),
      },
    });
  }
});

const updateCHW = asyncHandler(async (req, res) => {
  const permission =
    req.ID === req.params.chwId
      ? isPermissionGranted(req.role, "chw", actions.UPDATE_OWN)
      : false;
  if (!permission) {
    res.statusCode = 403;
    throw new Error("You are forbidden to access this.");
  } else {
    const chw = await CHW.findOne({ _id: req.params.chwId });
    if (!chw) {
      throw new Error("CHW with id " + req.params.chwId + " does not exist");
    }
    await CHW.updateOne({ _id: req.params.chwId }, req.body);
    return res.status(200).json({
      data: {
        msg: "CHW with id " + req.params.chwId + " updated successfully",
      },
    });
  }
});

const deleteCHW = asyncHandler(async (req, res) => {
  const permission =
    req.ID === req.params.chwId
      ? isPermissionGranted(req.role, "chw", actions.DELETE_OWN)
      : false;
  if (!permission) {
    res.statusCode = 403;
    throw new Error("You are forbidden to access this.");
  } else {
    const chw = await CHW.findOne({ _id: req.params.chwId });
    if (!chw) {
      throw new Error("CHW with id " + req.params.chwId + " does not exist");
    }
    await CHW.deleteOne({ _id: req.params.chwId });
    return res.status(200).json({
      data: {
        msg: "CHW with id " + req.params.chwId + " deleted successfully",
      },
    });
  }
});

module.exports = {
  getCHWs,
  getCHW,
  registerCHW,
  loginCHW,
  updateCHW,
  deleteCHW,
};
