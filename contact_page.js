const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const multiparty = require("multiparty");
require("dotenv").config();

const PORT = process.env.PORT || 80;

const app = express();

app.use(cors({ origin: "*" }));
/* 
var mysql = require('mysql2')

var connection = mysql.createConnection({
  host: '50.62.22.142',
  user: 'heta_website',
  password: 'website@123',
  database: 'heta_website'
})

connection.connect()
var query = "INSERT INTO contact_us (first_name, last_name, email,phone,message) VALUES ('$first_name', '$last_name', '$email','$phone','$message')"
connection.query(query, function (err, rows, fields) {
  if (err) throw err

  console.log('done !')
})

connection.end() */
app.use("/", express.static(process.cwd()));
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
let data = {};
app.post("/send", (req, res) => {
  let form = new multiparty.Form();

  form.parse(req, function (err, fields) {
    console.log(fields);
    Object.keys(fields).forEach(function (property) {
      data[property] = fields[property].toString();
    });
    console.log(data);
    // console.log(data.index);

    var basicInfo = `Hello team Hetadatain ! I am ${data.name}  ${data.lname}\n Email : ${data.email}\n  Mobile : ${data.phone}  `;
    const mail = {
      sender: `${data.name} <${data.email}>`,
      to: 'hdiddee@hetadatain.com', // receiver email,
      subject: data.subject,
      // text: `${data.name} <${data.email}> \n${data.message}`,
      text: `${basicInfo} ${data.message}`
    };
   /*  createLink(data.index);
    console.log(data.index); */
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send("Something went wrong.");
      } else {
        res.status(200);
      }
    });
  });
});

app.post("/presentation", (req, res) => {
  let form = new multiparty.Form();

  form.parse(req, function (err, fields) {
    console.log(fields);
    Object.keys(fields).forEach(function (property) {
      data[property] = fields[property].toString();
    });
    console.log(data);
    // console.log(data.index);

    var basicInfo = `Hello team Hetadatain ! I am ${data.first_name}  ${data.last_name}\n Email : ${data.email} \n I just requested a presentation. `;
    const mail = {
      sender: `${data.name} <${data.email}>`,
      to: 'hdiddee@hetadatain.com', // receiver email,
      subject: data.subject,
      // text: `${data.name} <${data.email}> \n${data.message}`,
      text: `${basicInfo}`
    };
    createLink(data.index);
    console.log(data.index);
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send("Something went wrong.");
      } else {
        res.status(200);
      }
    });
  });
});
//Index page (static HTML)
app.route("/").get(function (req, res) {
  res.sendFile(process.cwd() + "/index.html");

});
app.route("/products").get(function (req, res) {
  res.status(200).sendFile(process.cwd() + "/pages/pems.html");

});

/*
*/
// Express server listening...
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});


function sendLink(downloadLink) {
  console.log('send link working');
  const mail = {
    sender: process.env.EMAIL,
    to: data.email, // receiver email,
    subject: 'Presentation link from Heta Datain',
    text: "Here's your PDF : " + downloadLink
  };
  transporter.sendMail(mail, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Something went wrong.");
    } else {
      res.status(200);
    }
  });
}

function createLink(index) {
  console.log(index);
  var dlLink;




  switch (index) {
    case '0':
      dlLink = "https://hetadatain.com/docs/HETADATAIN%20PRESENTATION.pdf"
      break;
    case '1':
      dlLink = "https://hetadatain.com/docs/HD%20Pump%20Efficiency%20Presentation.pdf"

      break;
    case '2':
      dlink = "https://hetadatain.com/docs/HETA_IoT_AI_APR_2020.pdf"
      break;

    case '3':
      dlLink = "https://hetadatain.com/docs/M%26V%20Report.pdf"
      break;

    case '4':
      dlLink = "https://hetadatain.com/docs/HETA_PMS_EMS_APR_2020.pdf"
      break;

    case '5':
      dlLink = "https://hetadatain.com/docs/HETA_EMS_Institutions_Hostels.pdf"
      break;
    default:
      break;
  }

  sendLink(dlLink);
}
var fs = require('fs');
var crypto = require('crypto');
var path = require('path');

// Path where we store the download sessions
const DL_SESSION_FOLDER = '/var/download_sessions';


/* Creates a download session */
function createDownload(filePath, callback) {
  // Check the existence of DL_SESSION_FOLDER
  if (!fs.existsSync(DL_SESSION_FOLDER)) return callback(new Error('Session directory does not exist'));

  // Check the existence of the file
  if (!fs.existsSync(filePath)) return callback(new Error('File doest not exist'));

  // Generate the download sid (session id)
  var downloadSid = crypto.createHash('md5').update(Math.random().toString()).digest('hex');

  // Generate the download session filename
  var dlSessionFileName = path.join(DL_SESSION_FOLDER, downloadSid + '.pdf');

  // Write the link of the file to the download session file
  fs.writeFile(dlSessionFileName, filePath, function (err) {
    if (err) return callback(err);

    // If succeeded, return the new download sid
    callback(null, downloadSid);
  });
}

/* Gets the download file path related to a download sid */
function getDownloadFilePath(downloadSid, callback) {
  // Get the download session file name
  var dlSessionFileName = path.join(DL_SESSION_FOLDER, downloadSid + '.download');

  // Check if the download session exists
  if (!fs.existsSync(dlSessionFileName)) return callback(new Error('Download does not exist'));

  // Get the file path
  fs.readFile(dlSessionFileName, function (err, data) {
    if (err) return callback(err);

    // Return the file path
    callback(null, data);
  });
}

/* Deletes a download session */
function deleteDownload(downloadSid, callback) {
  // Get the download session file name
  var dlSessionFileName = path.join(DL_SESSION_FOLDER, downloadSid + '.download');

  // Check if the download session exists
  if (!fs.existsSync(dlSessionFileName)) return callback(new Error('Download does not exist'));

  // Delete the download session
  fs.unlink(dlSessionFileName, function (err) {
    if (err) return callback(err);

    // Return success (no error)
    callback();
  });
}


