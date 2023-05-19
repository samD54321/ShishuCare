const asyncHandler = require("express-async-handler");
const { Patient, Visit, Diagnosis } = require("../models");
const { isPermissionGranted } = require("../config/accessControl");
const actions = require("../constants/action_RBAC");

const getPatients = asyncHandler(async (req, res) => {
  const permission = isPermissionGranted(req.role, "patient", actions.READ_ANY);
  if (!permission) {
    res.statusCode = 403;
    throw new Error("You are forbidden to access this");
  } else {
    const name = req.query.name;
    const patients =
      name === undefined
        ? await Patient.find().populate({
            path: "visits",
            model: "Visit",
            select: "-patient",
            populate: {
              path: "diagnosis",
              model: "Diagnosis",
              select: ["-patient", "-visit"],
            },
          })
        : await Patient.find({
            name: { $regex: name, $options: "i" },
          }).populate("visits");
    if (!patients.length) throw new Error("No such User exists");
    return res.status(200).json({ data: patients });
  }
});

const getPatient = asyncHandler(async (req, res) => {
  const permission = isPermissionGranted(req.role, "patient", actions.READ_ANY);
  if (!permission) {
    res.statusCode = 403;
    throw new Error("You are forbidden to access this");
  } else {
    const patient = await Patient.findOne({ _id: req.params.patientId });
    if (!patient)
      throw new Error(`Patient with id ${req.params.patientId} not found`);
    return res.status(200).json({ data: patient });
  }
});

const registerPatient = asyncHandler(async (req, res) => {
  const permission = isPermissionGranted(
    req.role,
    "patient",
    actions.CREATE_ANY
  );
  if (!permission) {
    res.statusCode = 403;
    throw new Error("You are forbidden to access this");
  } else {
    const duplicatePatient = await Patient.find({
      $and: [
        { name: req.body.name },
        { phone: req.body.phone },
        { DOB: req.body.DOB },
      ],
    });
    if (duplicatePatient.length)
      return res
        .status(200)
        .json({ data: duplicatePatient, msg: "already registered" });
    const newPatient = await Patient.create(req.body);
    return res.status(200).json({ data: newPatient });
  }
});

const updatePatient = asyncHandler(async (req, res) => {
  const permission = isPermissionGranted(
    req.role,
    "patient",
    actions.UPDATE_ANY
  );
  if (!permission) {
    res.statusCode = 403;
    throw new Error("You are forbidden to access this");
  } else {
    const patientExists = await Patient.findOne({ _id: req.params.patientId });
    if (!patientExists)
      throw new Error(`Patient with id ${req.params.patientId} doesn't exist`);
    await Patient.updateOne({ _id: req.params.patientId }, req.body);
    return res.status(200).json({
      data: { msg: `Patient with id ${req.params.patientId} is updated` },
    });
  }
});

const deletePatient = asyncHandler(async (req, res) => {
  const permission = isPermissionGranted(
    req.role,
    "patient",
    actions.DELETE_ANY
  );
  if (!permission) {
    res.statusCode = 403;
    throw new Error("You are forbidden to access this");
  } else {
    const patientExists = await Patient.findOne({ _id: req.params.patientId });
    if (!patientExists) {
      throw new Error(`Patient with id ${req.params.patienId} doesn't exist`);
    }
    await Patient.deleteOne({ _id: req.params.patientId });
    await Visit.deleteMany({ patient: req.params.patientId });
    await Diagnosis.deleteMany({ patient: req.params.patientId });
    return res.status(200).json({
      data: { msg: `Patient with id ${req.params.patientId} is deleted` },
    });
  }
});

module.exports = {
  getPatients,
  getPatient,
  registerPatient,
  updatePatient,
  deletePatient,
};
