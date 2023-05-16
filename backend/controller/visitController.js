const asyncHandler= require('express-async-handler');
const {Patient,Visit} = require('../models')
const mongoose = require('mongoose')

const allVisit=asyncHandler(async(req,res)=>{
    const visit= await Visit.find()
    res.json(visit)
})

const getVisit= asyncHandler(async(req,res)=>{
    const patientVisit= await Visit.findById(req.params.visitId).populate('diagnosis')
    if (!patientVisit) throw new Error(`No such visit id : ${req.params.visitId} exists. `)
    res.status(200).json({data: patientVisit})
})

const registerVisit= asyncHandler(async(req,res)=>{
    
    const patientVisit = await Visit.create({...req.body,patient:req.params.patientId})
    const patient= await Patient.findById(req.params.patientId)
    if (!patient) throw new Error(`Such Patient does not exist`)
    const patientID=new mongoose.Types.ObjectId(patientVisit._id)
    patient.visits.push(patientID)
    patient.save()
    res.status(201).json({ data: patientVisit });

})

module.exports = { getVisit, registerVisit, allVisit };