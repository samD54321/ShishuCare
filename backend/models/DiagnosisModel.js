const mongoose = require('mongoose');

const DiagnoseSchema = mongoose.Schema({
    diagnosis:{type: Boolean,required: true},
    severity:{type: String,required: true,maxLength:20},
    prescriptions:{type: String,required: [true,'Please provide a prescription']},
    doctor:[{type:mongoose.Schema.Types.ObjectId,required:true,ref:'Doctor'}],
    visit:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'Visit'},
})  

module.exports = mongoose.model('Diagnosis',DiagnoseSchema)