const mongoose = require("mongoose");
const Appointment=require("./Appointments");
var userpschema=mongoose.Schema(
    {
      username:{ type: String },
      email: {
        type: String,
        lowercase: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
    password: { type: String },
      gender:String,
      Appointments:[{
        AppointmentId:{ type: mongoose.Schema.Types.ObjectId, ref: "Appointment" },
        DoctorName:String,
        date:String,
        time:String
      },],
      verificationKey: { type: String },
      verificationKeyExpires: { type: Number },
      isEmailVerified: { type: Boolean, default: false },
      isDeleted: { type: Boolean, default: false }
    }
  );

module.exports=mongoose.model("patient", userpschema);
