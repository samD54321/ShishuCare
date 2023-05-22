const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const { Doctor } = require("../models");
const generateToken = require("../config/generateToken");
const { isPermissionGranted } = require("../config/accessControl");
const actions = require("../constants/action_RBAC");

const getDoctors = asyncHandler(async (req, res) => {
  const permission = isPermissionGranted(req.role, "doctor", actions.READ_ANY);
  if (permission) {
    const doctors = await Doctor.find().select("-password");
    return res.status(200).json({ data: doctors });
  } else {
    res.statusCode = 403;
    throw new Error("You are forbidden to access this");
  }
});

const getDoctor = asyncHandler(async (req, res) => {
  const permission = isPermissionGranted(req.role, "doctor", actions.READ_ANY);
  if (permission) {
    const doctor = await Doctor.findOne({ _id: req.params.doctorId }).select(
      "-password"
    );
    if (!doctor) {
      res.statusCode = 400;
      throw new Error(`No doctor exists with id ${req.params.doctorId}`);
    }

    return res.status(200).json({ data: doctor });
  } else {
    res.statusCode = 403;
    throw new Error("You are forbidden to access this");
  }
});

const registerDoctor = asyncHandler(async (req, res) => {
  const checked_doctor = await Doctor.findOne({ email: req.body.email });

  // check if doctor is already registered
  if (checked_doctor) {
    res.statusCode = 400;
    throw new Error("Doctor with this email is already registered");
  }

  const { password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const doctor = await Doctor.create({ ...req.body, password: hashedPassword });
  return res.status(201).json({ data: doctor });
});

const loginDoctor = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const doctor = await Doctor.findOne({ email });
   if (!doctor) {
    res.statusCode=400
     throw new Error("Not registered. please register first");
   }
  const checkPassword = bcrypt.compareSync(password, doctor.password);
  if (!checkPassword) {
    res.statusCode = 401;
    throw new Error("Invalid credentials");
  } else {
    return res.status(200).json({
      data: {
        name: doctor.name,
        email: doctor.email,
        phone: doctor.phone,
        hospital: doctor.hospital,
        token: generateToken(doctor._id, "DOCTOR"),
      },
    });
  }
});

const updateDoctor = asyncHandler(async (req, res) => {
  const permission =
    req.ID === req.params.doctorId
      ? isPermissionGranted(req.role, "doctor", actions.UPDATE_OWN)
      : false;
  if (!permission) {
    res.statusCode = 403;
    throw new Error("You are forbidden to access this");
  } else {
    const doctor = await Doctor.findOne({ _id: req.params.doctorId });
    if (!doctor) {
      res.statusCode = 400;
      throw new Error("No doctor found with such id");
    }
    await Doctor.updateOne({ _id: req.params.doctorId }, req.body);
    const updatedDoctor = await Doctor.findOne({ _id: req.params.doctorId });
    return res.status(200).json({ data: updatedDoctor });
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const permission =
    req.ID === req.params.doctorId
      ? isPermissionGranted(req.role, "doctor", actions.DELETE_OWN)
      : false;
  if (!permission) {
    res.statusCode = 403;
    throw new Error("You are forbidden to access this");
  } else {
    const doctor = await Doctor.findOne({ _id: req.params.doctorId });
    if (!doctor) {
      res.statusCode = 400;
      throw new Error("No doctor found with such id");
    }
    await Doctor.deleteOne({ _id: req.params.doctorId });
    return res.status(200).json({
      data: { msg: `Doctor with id ${req.params.doctorId} is deleted` },
    });
  }
});

module.exports = {
  getDoctor,
  getDoctors,
  registerDoctor,
  updateDoctor,
  deleteUser,
  loginDoctor,
};
