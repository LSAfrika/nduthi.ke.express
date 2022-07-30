const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const upload = require("express-fileupload");

const LocalDBconnection = `mongodb://localhost:27017/NduthiDB`;
// app.use(express.json());
app.use(cors());
app.use(upload());

// for parsing application/json
app.use(express.json());

// for parsing application/xwww-
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use(express.static("public/adimages"));

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/user", require("./routes/user.routes"));

app.use("/ad", require("./routes/Ads.routes"));
app.use("/payments", require("./routes/mpesa.routes"));

app.post("/file", (req, res) => {
  if (req.files) {
    console.log(req.body);
    files = req.files;
    res.send({ files });
  }
});

mongoose
  .connect(LocalDBconnection, {
    useNewUrlParser: true,
    useunifiedtopology: true,
  })
  .then(() => {
    app.listen(5050, () => {
      console.log("app listening on: 5050");
    });
  })
  .catch((err) => console.log(err));

// randomgenerator();

// function test() {
//   const array = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
//   array.forEach((e) => {
//     console.log(e);
//   });
//   console.log("complete loop");
// }

// test();
