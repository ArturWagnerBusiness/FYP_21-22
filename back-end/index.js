require("dotenv").config();

const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const jwt = require("jsonwebtoken");

const app = express();
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
app.use(bodyParser.json());
// add static
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "..", "front-end", "build")));
class Codes {
  storage = {};
  expire = 30 * 60000; // 30m
  refresh = 60000; // 1m

  /**
   * @private
   */
  generate() {
    return Math.floor(Math.random() * 100000000).toString();
  }

  /**
   * @param {string} email
   * @returns {string | undefined}
   */
  getCode(email) {
    return this.storage[email]?.code;
  }

  /**
   * @param {string} email
   * @param {number} expireDate
   * @returns {string | null} code
   */
  create(email) {
    if (this.storage[email] && this.storage[email].refreshDate > Date.now()) {
      return null;
    } else {
      let code = this.generate();
      this.storage[email] = {
        code: code,
        expireDate: Date.now() + this.expire,
        refreshDate: Date.now() + this.refresh,
      };
      return code;
    }
  }

  /**
   * @param {string} email
   * @param {string} code
   * @returns {boolean} isSuccessful
   */
  verify(email, code) {
    if (
      code != this.storage[email].code &&
      this.storage[email].expireDate > Date.now()
    ) {
      return true;
    }
    return false;
  }
}
const codes = new Codes();

app.post("/api/authenticate/request", (req, res) => {
  let email = req.body?.email;
  if (email) {
    let output = codes.create(email);
    if (output === null) {
      console.log(
        `/api/authenticate/request> [${email}] Denied as refresh is too early. -> 429`
      );
      res
        .status(429)
        .send(
          "Can not create new verification code. Please wait 60s before attempting again."
        );
    } else {
      let code = codes.getCode(email);
      /*
      sendEmail({
        subject: "Test login credentials.",
        text: `Hello your secret login code for [${email}] is [${code}].\n *This is an automatic email. Report to [k1909979@kingston.ac.uk] if you discover abuse.`,
        html: `Hello your secret login code for <strong>${email}</strong> is <strong>${code}</strong>.<br />This is an automatic email. Report to <strong>k1909979@kingston.ac.uk</strong> if you discover abuse.`,
        to: email + "@kingston.ac.uk",
        from: process.env.EMAIL,
      });
      */
      console.log(
        `/api/authenticate/request> [${email}] send [${code}] -> 200`
      );
      res.send("Verification code send to email");
    }
  } else {
    console.log(`/api/authenticate/request> Missing Email -> 400`);
    res.status(400).send("Missing Email");
  }
});
let wait = {};
app.post("/api/authenticate/provide", (req, res) => {
  if (req.body?.email && req.body?.code) {
    let email = req.body?.email;
    if (wait[email] > Date.now() || wait[email] === undefined) {
      wait[email] = Date.now() + 60000;
      if (codes.getCode(email) === req.body?.code) {
        let token = jwt.sign({ email: email }, process.env.JWT_SECRET, {
          expiresIn: "2d",
        });
        console.log(
          `/api/authenticate/provide> [${req.body?.email}]-[${req.body?.code}] Send Token -> 200`
        );
        res.send(token);
      } else {
        console.log(
          `/api/authenticate/provide> [${req.body?.email}]-[${req.body?.code}] Bad code -> 400`
        );
        res.status(400).send("Wrong Email or Verification code");
      }
    } else {
      console.log(
        `/api/authenticate/provide> [${req.body?.email}]-[${req.body?.code}] Bad code -> 429`
      );
      res.status(429).send("Please wait 30s before trying to login again.");
    }
  } else {
    console.log(
      `/api/authenticate/provide> Missing Email or Verification code`
    );
    res.status(400).send("Missing Email or Verification code");
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
