const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const LocalDBconnection = `mongodb://localhost:27017/NduthiDB`;
app.use(express.json());
app.use(cors());
const accountrefmodel = require("./models/mpesarefrence.model");

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/user", require("./routes/user.routes"));

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

function randomgenerator() {}
