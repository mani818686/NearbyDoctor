const express = require("express");
const app = express();
const path=require("path");


app.get("/verify/:userType", function (req, res) {
    res.sendFile(path.join(__dirname,"../../","/frontend/html/verify.html"));
  
});
  
app.get("/doctor/login", function (req, res) {
    res.sendFile(path.join(__dirname,"../../","/frontend/html/doctorlogin.html"));
  });
app.get("/search/:specialist/:location", function (req, res) {
    res.sendFile(path.join(__dirname,"../../","/frontend/html/search.html"));
  });

app.get("/doctor/register", function (req, res) {
    res.sendFile(path.join(__dirname,"../../","/frontend/html/doctorregister.html"));
  });

app.get("/patient/login", function (req, res) {
    res.sendFile(path.join(__dirname,"../../","/frontend/html/patientlogin.html"));
  });

app.get("/patient/register", function (req, res) {
    res.sendFile(path.join(__dirname,"../../","/frontend/html/patientregister.html"));
  });

app.get("/aboutus", function (req, res) {
    res.sendFile(path.join(__dirname,"../../","/frontend/html/aboutus.html"));
  });

app.get("/dashboard", function (req, res) {
    res.sendFile(path.join(__dirname,"../../","/frontend/html/dashboard.html"));
  });
  app.get("/doctor/dashboard", function (req, res) {
    res.sendFile(path.join(__dirname,"../../","/frontend/html/doctordashboard.html"));
  });

app.get("/appointments/:id", function (req, res) {
    res.sendFile(path.join(__dirname,"../../","/frontend/html/appointments.html"));
  });
  
module.exports = app