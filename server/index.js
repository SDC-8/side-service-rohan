require("newrelic");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("express");
const Bars = require("../database/BarsPG.js");
const path = require("path");

const PORT = 3002;

app.disable("x-powered-by");

// app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/../client/dist"));

app.get("/api/sidebar/", function(req, res) {
  Bars.getInfo(1, res);
});

app.get("/api/sidebar/:page", function(req, res) {
  console.log(req.params);
  Bars.getInfo(req.params.page, res);
});

app.get("/:page", function(req, res) {
  res.sendFile(path.join(`${__dirname}/../client/dist/index.html`));
});

// app.post('/api/sidebar', function(req, res) {
//     console.log('post request', req);
// })

// create
app.post("/api/sidebar/:page", (req, res) => {
  Bars.postInfo(req.params.page, res);
});

// update
app.put("/api/sidebar/:page", (req, res) => {
  Bars.updateInfo(req.params.page, res);
});

// delete
app.delete("/api/sidebar/:page", (req, res) => {
  Bars.deleteOne(req.params.page, res);
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
