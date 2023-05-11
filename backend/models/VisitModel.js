const mongoose=require('mongoose');

const VistiSchema= mongoose.Schema({
    date:{type:Date,default:new Date.now(),required:true},
    height:{type:Number,required:true},
    weight:{type:Number,required:true},
    dehydration:{type:Boolean,required:true},
    skinColor:{type:String,required:true},
    note:{type:String,required:true,maxLength:1000},
    patient:{type:mongoose.Schema.Types.ObjectId,ref:'Patient',required:true},
    CHW:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"CHW"}
})

const VisitModel= mongoose.Model('Visit',VisitSchema)

module.exports =VisitModel