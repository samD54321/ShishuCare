const asyncHandler=require('express-async-handler')
const Doctor = require("../models/DoctorModel")
const Diagnosis = require("../models/DiagnosisModel")

const getDoctors=asyncHandler(async(req,res)=>{
    const doctors=await Doctor.find()
    return res.status(200).json({ doctors });
})

const createDoctor = asyncHandler(async (req, res) => {
    const doctor = await Doctor.create(req.body);
    res.status(201).json({doctor});

})

module.exports={getDoctors, createDoctor}