require("dotenv").config();

const path = require("path");
const express = require("express");
const https = require("https");
const fs = require("fs");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db",
});
const connectionSecure = process.env.DOMAIN ? true : false;
const connectionPath = connectionSecure ? process.env.DOMAIN : process.env.IPV6;
const httpsOptions = {
  key: fs.readFileSync("certificate.key", "utf8"),
  cert: fs.readFileSync("certificate.pem", "utf8"),
};
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
        let token = jwt.sign({ email: email }, process.env.JWT_PRIVATE, {
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

app.post("/api/exercises/create", (req, res) => {
  let email = req.body?.email;
  let token = req.body?.token;
  let page = req.body?.page;
  let decoded = jwt.verify(token, process.env.JWT_PRIVATE);
  if (decoded?.email !== email) {
    res.status(400).send("Could not verify user.");
    return;
  }
  if (email === undefined || token === undefined || page === undefined) {
    res.status(400).send("Request missing data in body.");
    return;
  }
  connection.query(
    "INSERT INTO PAGES (email, data) VALUES (?, ?)",
    [email, JSON.stringify(page)],
    function (error, results, fields) {
      if (error) {
        res.status(500).send("Internal server error.");
        throw error;
      }
      // connected!
      res.send("Exercises created.");
    }
  );
});
function htmlEntities(data) {
  return String(data)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
app.get("/api/exercises/:id", (req, res) => {
  let id = parseInt(req.params.id);
  connection.query(
    `SELECT COUNT(CASE WHEN pages.id = likes.exercise THEN 1 END) as "likes", pages.email as "email", pages.date_added as "date_added", pages.data as "data" FROM pages JOIN likes WHERE pages.id=? GROUP BY pages.id`,
    id,
    function (error, results, fields) {
      if (error) {
        console.log("FAILED TO ACCESS DATABASE");
        res.status(500).send(""); // No message as it is read by Nooblab
        return;
      }
      try {
        var email = results[0].email;
        var date_added = results[0].date_added;
        var likes = results[0].likes;
        var data = JSON.parse(results[0].data);
      } catch {
        console.log("No rows selected!");
        res.status(400).send(""); // No message as it is read by Nooblab
        return;
      }
      console.log("Rendering page!");
      res.send(`
<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>${htmlEntities(data.title)}</title></head><body>

<div class="parameter" id="courseNo">n/a</div>
<div class="parameter" id="courseName">n/a</div>
<div class="parameter" id="lessonNo">n/a</div>
<div class="parameter" id="lessonName">${htmlEntities(
        data.title
      )} by ${htmlEntities(email)}</div>
<div class="parameter" id="learningOutcomes">n/a</div>
<div class="parameter" id="level">n/a</div>
<div class="parameter" id="notes">n/a</div>

<h1>${htmlEntities(data.title)} (${htmlEntities(likes)} likes)</h1>
<div class="section" id="Just a demo">
<h2 class="title">Task by ${htmlEntities(email)} on ${date_added.toLocaleString(
        "en-GB",
        {
          day: "numeric",
          month: "long",
          year: "numeric",
        }
      )}</h2>
<p><strong>Exercise generated by ${connectionPath}</strong></p>
<!-- USER CONTENT -->
${data.content
  .sort((a, b) => {
    return a.order - b.order;
  })
  .map((item) => {
    let content = htmlEntities(item.content);
    return item.type === "text"
      ? `<p>${content.replace(/(?:\r\n|\r|\n)/g, "<br />")}</p>`
      : item.type === "image"
      ? `<img src="${content}"/>`
      : `<pre class="prettyprint nopaste">${content}</pre>`;
  })
  .join("")}
<!-- USER TESTS -->
${
  data.tests === []
    ? "<p>[Tests] No tests found for this exercise!</p>"
    : `<p>Run test below</p>
<div class="testCase" id="Hello">
    <div class="medalType">bronze</div>
    <div class="medalDesc">Hello</div>
    <div class="test">
        ${data.tests
          .map((item) => {
            console.log(data.tests);
            switch (item.type) {
              case "testFinalOutput":
                return `<div class="testFinalOutput">${item.content}</div>`;
              case "codeIncludes":
                return `<div class="codeIncludes">${item.content}</div>`;
              default: // Code will exit as this feature needs more work to be fully secure.
                return "";
                return `<div class="testFinalOutputJS">
  ${item.content}
  feedback("Your program doesn't print the text we were expecting.");
</div>`;
            }
          })
          .join("")}
    </div>
</div>`
}
`);
    }
  );
});
app.post("/api/exercises/content/", (req, res) => {
  // page = 1 - 10000000000
  // order = recent or liked
  // search = "text for filtering" or undefined
  let selectedPage = parseInt(req.body.page);
  var queryOrderBy;
  switch (req.body.order) {
    case "recent":
      queryOrderBy = "ORDER BY date_added DESC";
      break;
    case "liked":
      queryOrderBy = "ORDER BY likes DESC";
      break;
    default:
      queryOrderBy = "ORDER BY likes DESC";
      break;
  }
  let query = `SELECT pages.id, COUNT(CASE WHEN pages.id = likes.exercise THEN 1 END) as "likes", pages.email, pages.date_added, pages.data FROM pages JOIN likes WHERE pages.email LIKE ? OR JSON_EXTRACT(pages.data, "$.description") LIKE ? OR JSON_EXTRACT(pages.data, "$.title") LIKE ? GROUP BY pages.id ${queryOrderBy} LIMIT ?,10`;

  let executionFunction = function (error, results, fields) {
    if (error) {
      res.status(500).send(""); // No message as it is read by Nooblab
      return;
    }
    try {
      res.send(results);
    } catch {
      res.status(400).send(""); // No message as it is read by Nooblab
      return;
    }
  };
  let search = req.body.search ? `%${req.body.search}%` : "%%";
  connection.query(
    query,
    [search, search, search, (selectedPage - 1) * 10],
    executionFunction
  );
});
app.post("/api/exercises/count/", (req, res) => {
  let search = req.body.search ? `%${req.body.search}%` : "%%";

  let query = `SELECT pages.id FROM pages JOIN likes WHERE pages.email LIKE ? OR JSON_EXTRACT(pages.data, "$.description") LIKE ? OR JSON_EXTRACT(pages.data, "$.title") LIKE ? GROUP BY pages.id`;
  connection.query(
    query,
    [search, search, search],
    (error, results, fields) => {
      if (error) {
        res.status(500).send(""); // No message as it is read by Nooblab
        return;
      }
      try {
        res.send(results);
      } catch {
        res.status(400).send(""); // No message as it is read by Nooblab
        return;
      }
    }
  );
});
app.post("/api/exercises/like/", (req, res) => {
  let exercise = parseInt(req.body.exercise); // kill request if fails
  let email = req.body.email;
  let decoded = jwt.verify(req.body.token, process.env.JWT_PRIVATE);
  if (decoded?.email !== email) {
    res.status(400).send("Could not verify user.");
    return;
  }
  connection.query(
    `SELECT * FROM likes WHERE exercise = ? AND user = ?`,
    [exercise, email],
    (error, results, fields) => {
      if (error) {
        console.log(error);
        res.status(500).send(""); // No message as it is read by Nooblab
        return;
      }
      if (results.length == 0) {
        // Exercise not liked so like
        connection.query(
          `INSERT INTO likes (exercise, user) VALUES (?, ?)`,
          [exercise, email],
          (error, results, fields) => {
            if (error) {
              console.log(error, exercise, email);
              res.status(400).send("Can't like. Bad data");
            } else {
              console.log("WORKED YES");
              res.send("Success");
            } // guardian leak tables
          }
        );
      } else {
        res.status(400).send("Can't like. Bad data");
      }
    }
  );
});
app.post("/api/exercises/likes/", (req, res) => {
  let exercise = parseInt(req.body.exercise); // kill request if fails
  let email = req.body.email;
  connection.query(
    `SELECT * FROM likes WHERE exercise = ? AND user = ?`,
    [exercise, email],
    (error, results, fields) => {
      if (error) {
        res.status(500).send(""); // No message as it is read by Nooblab
        return;
      }
      res.send(results);
    }
  );
});
//
app.get("*", (req, res) => {
  res.sendFile("index.html", {
    root: path.join(__dirname, "..", "front-end", "build"),
  });
});

if (connectionSecure) {
  app.listen(80, "192.168.0.25", () => {
    console.log(`Server started on port http://${connectionPath}:80/`);
  });
  https.createServer(httpsOptions, app).listen(443, "192.168.0.25", () => {
    console.log(`Server started on port https://${connectionPath}:443/`);
  });
} else {
  app.listen(80, "192.168.0.25", () => {
    console.log(`Server started on port http://${connectionPath}:80/`);
  });
}
