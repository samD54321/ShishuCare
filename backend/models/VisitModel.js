const mongoose=require('mongoose');

const VisitSchema= mongoose.Schema({
    DOV:{type:Date,default: Date.now,required:true},
    height:{type:Number,required:true},
    weight:{type:Number,required:true},
    dehydration:{type:Boolean,required:true},
    skinColor:{type:String,required:true},
    note:{type:String,required:true,maxLength:1000},
    patient:{type:mongoose.Schema.Types.ObjectId,ref:'Patient',required:true},
    CHW:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"CHW"}
})

const VisitModel= mongoose.model('Visit',VisitSchema)

module.exports =VisitModel