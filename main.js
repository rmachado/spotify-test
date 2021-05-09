const express = require("express");
const fs = require("fs");
const spotify = require("./spotify");

const app = express();
const port = 3000;
const redirect_uri = `http://localhost:${port}/spotify/callback`;

app.get("/", (req, res) => {
  fs.readFile("views/home.html", { encoding: "utf-8" }, (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

app.get("/login", (req, res) => {
  const url = spotify.getAuthorizationUrl(redirect_uri);
  res.redirect(url);
});

app.get("/spotify/callback", async (req, res) => {
  try {
    const code = req.query.code;
    const response = await spotify.getAccessToken(code, redirect_uri);
    res.json(response.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
