const asyncHandler=require('express-async-handler')
const Doctor = require("../models/DoctorModel")

const getDoctor=asyncHandler(async(req,res)=>{
    throw new Error('Not Found')
    // return res.status(200).json({ msg: "Hello I am doctor" });
})

const createDoctor = asyncHandler(async (req, res) => {
    const doctor = await Doctor.create(req.body);
    res.status(201).json({doctor});

})

module.exports={getDoctor, createDoctor}