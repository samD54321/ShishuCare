const asyncHandler = require("express-async-handler");
const { Diagnosis, Visit } = require("../models");
const { isPermissionGranted } = require("../config/accessControl");
const actions = require("../constants/action_RBAC");

const getDiagnosis = asyncHandler(async (req, res) => {
  const permission = isPermissionGranted(
    req.role,
    "diagnosis",
    actions.READ_ANY
  );
  if (!permission) {
    res.statusCode = 403;
    throw new Error("You are forbidden to access this");
  } else {
    const diagnosis = await Diagnosis.find()
      .populate("patient")
      .populate("visit")
      .populate("doctor");
    res.status(200).json({ data: diagnosis });
  }
});

const createDiagnosis = asyncHandler(async (req, res) => {
  const permission = isPermissionGranted(
    req.role,
    "diagnosis",
    actions.CREATE_ANY
  );
  if (!permission) {
    res.statusCode = 403;
    throw new Error("You are forbidden to access this");
  } else {
    const visit = await Visit.findById(req.params.visitId);
    const diagnosis = await Diagnosis.create({
      ...req.body,
      visit: req.params.visitId,
      patient: visit.patient,
      doctor: req.ID,
    });
    if (diagnosis){
      await Visit.updateOne(
        { _id: req.params.visitId },
        { isDiagnosed: true, diagnosis: diagnosis._id }
      );
    }
    // await Visit.updateOne(
    //   { _id: req.params.visitId },
    //   { }
    // );
    res.status(201).json({ data: diagnosis });
  }
});

const updateDiagnosis = asyncHandler(async (req, res) => {
  const permission = isPermissionGranted(
    req.role,
    "diagnosis",
    actions.UPDATE_OWN
  );

  if (!permission) {
    res.statusCode = 403;
    throw new Error("You are forbidden to access this");
  } else {
    const diagnosis = await Diagnosis.findOne({ visit: req.params.visitId });
    if (!diagnosis) {
      res.statusCode = 400;
      throw new Error("No diagnosis found with such id");
    }
    await Diagnosis.updateOne({ visit: req.params.visitId }, req.body);
    return res.status(200).json({ data: { msg: "sucessfully updated" } });
  }
});

module.exports = { createDiagnosis, getDiagnosis, updateDiagnosis };
