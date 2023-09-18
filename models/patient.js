const mongoose = require("mongoose");

const patientSchema = mongoose.Schema({
    Name:{
        type: String,
        required:true
    },
    Age:{
        type: Number,
        required:true
    },
    Mobile:{
        type: Number,
        required:true
    },
    Address:{
        type: String,
        required:true
    },
    Disease:{
        type: String,
        required:true
    },
    Admision:{
        type: String,
        required:true
    },
   },
{
    timestamps:true,
});

module.exports = mongoose.model("patient", patientSchema);