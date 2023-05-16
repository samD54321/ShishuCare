const asyncHandler = require('express-async-handler');
const {Diagnosis,Visit}= require('../models')
const mongoose = require('mongoose')

const getDiagnosis= asyncHandler(async(Req,res)=>{
    const diagnosis= await Diagnosis.find().populate('patient').populate('visit')
    res.status(200).json({data:diagnosis})
})

const createDiagnosis= asyncHandler(async(req,res)=>{
  const visit = await Visit.findById(req.params.visitId);
  const diagnosis= await Diagnosis.create({...req.body,visit:req.params.visitId,patient:visit.patient})
  await Visit.updateOne({_id:req.params.visitId},{diagnosis:diagnosis._id})
  res.status(201).json({data:diagnosis})
})

module.exports = { createDiagnosis, getDiagnosis };