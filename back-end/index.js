require("dotenv").config();

const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

// https://dev.to/chandrapantachhetri/sending-emails-securely-using-node-js-nodemailer-smtp-gmail-and-oauth2-g3a
const createTransporter = async () => {
  const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
  });

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject();
      }
      resolve(token);
    });
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL,
      accessToken,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
    },
  });

  return transporter;
};
const sendEmail = async (emailOptions) => {
  let emailTransporter = await createTransporter();
  await emailTransporter.sendMail(emailOptions);
};

app.use(bodyParser.urlencoded({ extended: true }));
// add static
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "..", "front-end", "build")));

let code = "07485243";
let user = "k1909979";
let token = "4~92$*24!^£34£u5$£v6^£_0223($^023B25$";

app.post("/api/authenticate/request", (req, res) => {
  /*
  sendEmail({
    subject: "Test login credentials.",
    text: `Hello your secret login code for [${user}] is [${code}]. *This is an automatic email. Report to [k1909979@kingston.ac.uk] if you discover abuse.`,
    html: `Hello your secret login code for <strong>${user}</strong> is <strong>${code}</strong>.<br />This is an automatic email. Report to <strong>k1909979@kingston.ac.uk</strong> if you discover abuse.`,
    to: user + "@kingston.ac.uk",
    from: process.env.EMAIL,
  });
  */
  console.log(`/api/authenticate/request> [${user}] send [${code}]`);
  res.send("Verification code send to email");
});
app.post("/api/authenticate/provide", (req, res) => {
  if (user === req.body?.email && code === req.body?.code) {
    console.log(
      `/api/authenticate/provide> [${req.body?.email}]-[${req.body?.code}] -> [${token}]`
    );
    res.send(token);
  } else {
    console.log(
      `/api/authenticate/provide> [${req.body?.email}]-[${req.body?.code}] -> 400`
    );
    res.status(400);
    res.send("Invalid [Email] and [Verification code]");
  }
});
app.post("/api/authenticate/reset", (req, res) => {
  if (user === req.body?.email && token === req.body?.token) {
    console.log(`/api/authenticate/reset> [${req.body?.email}] -> 200`);
    res.send("Reset");
  } else {
    console.log(`/api/authenticate/reset> [${req.body?.email}] -> 400`);
    res.status(400);
    res.send("Invalid [Email] and [Verification code]");
  }
});

//
app.get("*", (req, res) => {
  res.sendFile("index.html", {
    root: path.join(__dirname, "..", "front-end", "build"),
  });
});

app.listen(80, () => {
  console.log("Server started on port 80");
});
