const mongoose = require("mongoose");

const PatientSchema = mongoose.Schema({
  name: {
    type: "string",
    required: [true, "Please enter patient name"],
  },
  phone: {
    type: "string",
    required: [true, "Please enter patient phone number"],
  },
  address: {
    type: "string",
    required: [true, "Please enter patient address"],
  },
  DOB: {
    type: Date,
    required: [true, "Please enter date of birth of patient"],
  },
  gender: {
    type: "string",
    required: [true, "Please enter patient gender"],
  },
  guardian: {
    type: "string",
    required: [true, "Please enter patient's Guardian Name"],
  },
  visits: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Visit",
      required: false,
      cascade: true,
    },
  ],
});

const PatientModel = mongoose.model("Patient", PatientSchema);

module.exports = PatientModel;
