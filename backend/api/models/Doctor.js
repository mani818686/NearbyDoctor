const mongoose = require("mongoose");
const Appointment=require("./Appointments")
var userdschema=mongoose.Schema(
    {
      userType : { type: String, default: "doctor" },
      username:String,
      email:{
        type: String,
        lowercase: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
      },
      password:String,
      specialist:String,
      location:String,
      hname:String,
      hadrs:String,
      time:String,
      cfee:String,
      passResetKey:  String,
      passKeyExpires: Number,
      verificationKey: { type: String },
      verificationKeyExpires: { type: Number },
      isEmailVerified: { type: Boolean, default: false },
      isDeleted: { type: Boolean, default: false },
      Appointments:[{
        AppointmentId:{ type: mongoose.Schema.Types.ObjectId, ref: Appointment },
        PatientName:String,
        date:String,
        time:String
      },],
      
    }
  );
module.exports=mongoose.model("doctor", userdschema);