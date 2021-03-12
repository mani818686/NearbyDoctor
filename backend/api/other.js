const express = require("express");
const mongoose = require("mongoose");
const item = require("../lib/itemlib");
const Doctor = require("./models/Doctor");
const Patient = require("./models/patient");
const Appointment = require("./models/Appointments");
const sgMail = require("@sendgrid/mail");
const emailTemplates = require("../email");

sgMail.setApiKey(process.env.SendgridAPIKey);
const app = express.Router();

app.get("/Appointments/:id", (req, res) => {
    Patient.findById(req.params.id, function (err, result) {
      if (err || result.length <= 0) {
        res.status(400).json({
          message: "some error occurred" + err,
        });
      } else {
        res.status(200).json({
          result: result,
        });
        //console.log(result);
      }
    });
  });
  app.get("/DoctorAppointments/:id", (req, res) => {
    Doctor.findById(req.params.id, function (err, result) {
      if (err || result.length <= 0) {
        res.status(400).json({
          message: "some error occurred" + err,
        });
      } else {
        res.status(200).json({
          result: result,
        });
        //console.log(result);
      }
    });
  });
  app.get("/filter/:specialist/:locate", function (req, res) {
    //console.log(req.params.specialist);
    item.getItemByQuery({ specialist: req.params.specialist, location: req.params.locate}, Doctor, (err, user)=> {
      //console.log(user);
      res.send({result: user});
    });
  });


  app.post("/createAppointment/:id", async function (req, res, next) {
    const UserId = req.params.id;
    const Appointment1 = {
      _id: new mongoose.Types.ObjectId(),
      userId: UserId,
      doctorId: req.body.doctorId,
      doctorName: req.body.doctorName,
      date: req.body.date,
      time: req.body.time,
    };
    //console.log(req.body);
    var ti = new Appointment(Appointment1);
    ti.save();
    AppointmentId = ti._id;
    const DoctorName = ti.doctorName;
    var username;
    //console.log(AppointmentId);
    const Items= await Patient.findOneAndUpdate({ _id: UserId },{$push: {Appointments: {AppointmentId: AppointmentId,DoctorName: DoctorName,date: req.body.date,time: req.body.time,},},},);
    item.getItemByQuery({ _id: req.body.doctorId}, Doctor, (err, result)=> {
      //console.log("Appointment Query")        
      //console.log(result[0].email);
     
               const msg = {
                   to: result[0].email,
                   from: process.env.sendgridEmail,
                   subject: "NEAR_BY_Doctor: Appointment",
                   text: " ",
                   html: emailTemplates.APPOINTMENT_EMAIL(result),
                };

               sgMail
               .send(msg)
               .then((result) => {
                   console.log("Email sent");
               })
      });
    console.log("p",username);
    Doctor.findOneAndUpdate(
      { _id: req.body.doctorId },
      { $push: { Appointments: {
        AppointmentId: AppointmentId,
        PatientName: Items.username,
        date: req.body.date,
        time: req.body.time,
      },} },
      (err, itemDetails) => {
        if (err) console.log("ERROR: " + err);
        console.log(itemDetails);
      }
    );
    res.status(201).json({
      message: "created",
      ti,
    });
  });

  module.exports = app;
