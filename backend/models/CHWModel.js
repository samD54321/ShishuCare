const mongoose = require("mongoose");

const CHWSchema = mongoose.Schema({
  name: {
    type: "string",
    required: [true, "Please provide a valid name"],
  },
  email: {
    type: "string",
    required: [true, "Please provide a valid email address"],
  },
  phone: {
    type: "string",
    required: [true, "Please provide a valid phone number"],
  },
  password: {
    type: "string",
    required: [true, "Please provide a valid password"],
  },
});

 const CHWModel=mongoose.model('CHW',CHWSchema)

 module.exports=CHWModel;