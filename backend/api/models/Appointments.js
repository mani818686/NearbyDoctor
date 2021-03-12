const mongoose = require("mongoose");
const Patient=require("./patient")
const Doctor=require("./Doctor")
var AppointmentsSchema=mongoose.Schema(
    {
      userId:{ type: mongoose.Schema.Types.ObjectID, ref: "Patient" },
      doctorId:{ type: mongoose.Schema.Types.ObjectID, ref: "Doctor" },
      doctorName:String,
      date:String,
      time:String
    }
  );
  module.exports=mongoose.model("Appointments", AppointmentsSchema);