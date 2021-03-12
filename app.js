var express = require("express");
var app = express();
const bodyParser = require("body-parser");
var mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

//mongoose Schemas
const Doctor = require("./backend/api/models/Doctor");
const Patient = require("./backend/api/models/patient");


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

//routers 
app.use(express.static(__dirname + '/frontend'));


const apiroutes = require("./backend/api/allapiroutes");
const uiroutes = require("./backend/ui/allrouters");
const dbURI = process.env.dbURI;

//database connection
mongoose
    .connect(dbURI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Database Connected"))
    .catch((err) => console.log(err)); 
    mongoose.Promise = global.Promise; 
console.log(Date.now())


var port = process.env.PORT || 3000;

app.use("/ui",uiroutes);
app.use("/api", apiroutes);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/frontend/html/home.html");
});

app.use((req, res, next) => {
  const error = new Error("Route not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
      error: {
          message: error.message,
      },
  });
});

//manideep apis----------------------------------

//end--------------------------------------------

app.listen(port, function () {
  console.log("Site Running on http://localhost:" + port);
});
