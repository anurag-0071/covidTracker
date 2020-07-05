const express = require("express");
const http = require('http');
const Mongoose = require('mongoose');
const readline = require('readline');
const cron = require("node-cron");
const ejs = require("ejs");
const nodemailer = require("nodemailer");

const userController = require("./controllers/userController");
const covidController = require("./controllers/covidController");

const DB_URL = 'mongodb://localhost:27017/covidTracker';
const PORT = 8080;

const app = express();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

app.use(express.json());

app.post('/createUser', userController.createUser);

const sendMail = async (toMail, htmlData) => {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'asbinha@gmail.com',
      pass: 'Anurag@123'
    }
  });
  const mailOptions = {
    from: 'asbinha@email.com',
    to: toMail.join(),
    subject: "Toady's COVID-19 data",
    html: htmlData
  };
  try {
    const mailInfo = await transporter.sendMail(mailOptions);
    console.log(mailInfo)
    return mailInfo;
  } catch (error) {
    throw new Error(error);
  }
}

const initSchudeler = async () => {
  cron.schedule('0 6 * * *', async () => {
    // fetch subscribers
    try {
      const users = await userController.fetchUsersEmailId();
      const emailIds = users.map(user => user.email);
      // fetch covid data
      const covidData = await covidController.fetchCovidData();
      const htmlData = await ejs.renderFile(__dirname + "/helpers/ejsFiles/emailTemplate.ejs", { data: covidData });
      // send  mail
      console.log("emailIds", emailIds);
      if (emailIds && emailIds.length) {
        sendMail(emailIds, htmlData);
      }

    } catch (error) {
      console.error("Error")
    }
  });
}

const startServer = async () => {

  try {
    await Mongoose.connect(DB_URL, { useNewUrlParser: true });
    http.createServer(app).listen(PORT, () => {
      console.log("Server started on port:", PORT);
      initSchudeler();
    });
  } catch (error) {
    console.error("Error in mongoose connection", error.message);
    rl.question("Type `rs` to restart server", (answer) => {
      if (answer === 'rs') {
        startServer();
      } else {
        return;
      }
    })
  }
}

startServer();