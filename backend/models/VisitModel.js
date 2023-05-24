const mongoose=require('mongoose');

const VisitSchema = mongoose.Schema({
  DOV: { type: Date, default: Date.now, required: true },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  temperature: { type: Number, required: true },
  skinColor: { type: String, required: true },
  note: { type: String, required: true, maxLength: 1000 },
  breathRate: { type: String, required: true },
  drinkMilk: { type: Boolean, required: true },
  dehydration: { type: Boolean, required: true },
  isDiagnosed: { type: Boolean, default: false},
  patient: { type: mongoose.SchemaTypes.ObjectId, ref: "Person" },
  diagnosis: { type: mongoose.SchemaTypes.ObjectId, ref: "Diagnosis" },
  CHW:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"CHW"}
});

const VisitModel= mongoose.model('Visit',VisitSchema)

module.exports =VisitModel