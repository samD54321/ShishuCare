const mongoose = require("mongoose");

const DoctorSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please mandatorily provide a name!"],
        trim: true,
        },
    phone:{
        type: String,
        required: [true, "Please mandatorily provide a phone number!"],
    },
    email:{
        type: String,
        required: [true, "Please mandatorily provide an email!"],
    },
    hospital:{
        type: String,
        required: [true, "Please mandatorily provide a hospital name!"],
    }
})

module.exports = mongoose.model("Doctor", DoctorSchema);
