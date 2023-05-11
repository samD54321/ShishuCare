const Doctor = require("./DoctorModel");
const Diagnosis = require("./DiagnosisModel");
const Visit = require("./VisitModel");
const Patient = require("./PatientModel");
const CHW = require('./CHWModel')

const models = { Doctor, Diagnosis, Visit, Patient, CHW };

module.exports=models