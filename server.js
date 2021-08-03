const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const multiparty = require("multiparty");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors({ origin: "*" }));

var mysql = require('mysql2')

var connection = mysql.createConnection({
  host: '50.62.22.142',
  user: 'heta_website',
  password: 'website@123',
  database: 'heta_website'
})

/* connection.connect()
var query = "INSERT INTO contact_us (first_name, last_name, email,phone,message) VALUES ('$first_name', '$last_name', '$email','$phone','$message')"
connection.query(query, function (err, rows, fields) {
  if (err) throw err

  console.log('done !')
})

connection.end() */
app.use("/public", express.static(process.cwd() + "/public"));
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

// verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});
app.post("/send", (req, res) => {
  let form = new multiparty.Form();
  let data = {};
  form.parse(req, function (err, fields) {
    console.log(fields);
    Object.keys(fields).forEach(function (property) {
      data[property] = fields[property].toString();
    });
    console.log(data);
    var basicInfo =  `Hello team Hetadatain ! I am ${data.first_name}  ${data.last_name}\n Email : ${data.email}\n  Mobile : ${data.phone}`; 
    const mail = {
      sender: `${data.name} <${data.email}>`,
      to: process.env.EMAIL, // receiver email,
      subject: data.subject,
     // text: `${data.name} <${data.email}> \n${data.message}`,
    text: `${basicInfo} ${data.mesasage}` 
    };
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send("Something went wrong.");
      } else {
        res.status(200).send("Email successfully sent to recipient!");
      }
    });
  });
});

//Index page (static HTML)
app.route("/").get(function (req, res) {
  res.sendFile(process.cwd() + "/public/index.html");
});

/*************************************************/
// Express server listening...
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
