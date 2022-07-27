const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

const LocalDBconnection = `mongodb://localhost:27017/NduthiDB`;
// app.use(express.json());
app.use(cors());

// for parsing application/json
app.use(express.json());

// for parsing application/xwww-
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/user", require("./routes/user.routes"));
app.use("/ad", require("./routes/Ads.routes"));

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
