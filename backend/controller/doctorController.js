const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const { Doctor } = require("../models");

const getDoctors = asyncHandler(async (req, res) => {
  const doctors = await Doctor.find().select("-password");
  return res.status(200).json({ data:doctors });
});

const getDoctor = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findOne({ _id: req.params.doctorId }).select("-password");
  if (!doctor) {
    res.statusCode = 400;
    throw new Error(`No doctor exists with id ${req.params.doctorId}`);
  }
  return res.status(200).json({ data: doctor });
});

const registerDoctor = asyncHandler(async (req, res) => {
  const checked_doctor = await Doctor.findOne({ email: req.body.email });
  console.log(checked_doctor);
  // check if doctor is already registered
  if (checked_doctor) {
    res.statusCode = 400;
    throw new Error("Doctor with this email is already registered");
  }
  const { password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const doctor = await Doctor.create({ ...req.body, password: hashedPassword });
  return res.status(201).json({ data:doctor });
});

const updateDoctor = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findOne({ _id: req.params.doctorId });
  if (!doctor) {
    res.statusCode = 400;
    throw new Error("No doctor found with such id");
  }
  await Doctor.updateOne({ _id: req.params.doctorId }, req.body);
  const updatedDoctor = await Doctor.findOne({ _id: req.params.doctorId });
  return res.status(200).json({ data: updatedDoctor });
});

const deleteUser = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findOne({ _id: req.params.doctorId });
  if (!doctor) {
    res.statusCode = 400;
    throw new Error("No doctor found with such id");
  }
  await Doctor.deleteOne({ _id: req.params.doctorId });
  return res
    .status(200)
    .json({
      data: { msg: `Doctor with id ${req.params.doctorId} is deleted` },
    });
});

module.exports = {
  getDoctor,
  getDoctors,
  registerDoctor,
  updateDoctor,
  deleteUser,
};
