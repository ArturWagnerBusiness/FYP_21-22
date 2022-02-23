const path = require("path");
const express = require("express");
const app = express();

// add static
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "..", "front-end", "build")));

//
app.get("*", (req, res) => {
  res.sendFile("index.html", {
    root: path.join(__dirname, "..", "front-end", "build"),
  });
});

app.listen(80, () => {
  console.log("Server started on port 80");
});
