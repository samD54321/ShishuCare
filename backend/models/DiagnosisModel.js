const mongoose = require('mongoose');

const DiagnoseSchema = mongoose.Schema({
    conclusion:{type: 'string',required:[true,'Please provide conclusion']},
    severity:{type: String,required: true,maxLength:20},
    prescriptions:{type: String,required: [true,'Please provide a prescription']},
    // doctor:[{type:mongoose.Schema.Types.ObjectId,required:true,ref:'Doctor'}],
    visit:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'Visit'},
    patient:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'Patient'},
})  

module.exports = mongoose.model('Diagnosis',DiagnoseSchema)