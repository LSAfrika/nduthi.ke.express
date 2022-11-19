const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const adsmodel = require("./models/Advert.model");
const upload = require("express-fileupload");
const dayjs = require("dayjs");
const cookieParser = require("cookie-parser");
// import dateTime from "date-time";

const LocalDBconnection = `mongodb://localhost:27017/NduthiDB`;
// app.use(express.json());
const corsOptions = {
  origin: "http://localhost:4200",
  optionsSuccessStatus: 200,
  credentials: true,
};
app.use(cors(corsOptions));
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header("Access-Control-Allow-Origin", req.headers.origin);
//   res.header(
//     "Access-Control-Allow-Methods",
//     "GET,PUT,POST,DELETE,UPDATE,OPTIONS"
//   );
//   res.header(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
//   );
//   next();
// });
app.use(upload());
app.use(cookieParser());

// for parsing application/json
app.use(express.json());

// for parsing application/xwww-
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public/"));
// app.use(express.static(__dirname + "/public/adimages/"));
// app.use(express.static(__dirname + "/public/userphoto/"));

app.get("/", (req, res) => {
  console.log("Cookies in aoo: ", req.cookies);
  res.send("hello world");
});

app.use("/user", require("./routes/user.routes"));
app.use("/ticket", require("./routes/tickets.routes"));

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

async function updatemodel() {
  try {
    const adref = await adsmodel.find();

    const setdate = {
      adactivation: Date.now(),
    };
    if (adref) {
      console.log("adverts docs \n", adref);
      adref.forEach(async (doc) => {
        Object.assign(doc, setdate);
        // console.log("updated doc: \n", doc);
        await doc.save();
      });
    }
  } catch (error) {}
}

async function datetest() {
  try {
    const nextmonth = dayjs().add(1, "month");

    console.log("next month: ", nextmonth.toDate());

    nextmonthstring = dayjs(nextmonth.toDate());
    const isodatestamp = Math.round(new Date(nextmonthstring).getTime());
    console.log("nd: ", isodatestamp);
  } catch (error) {}
}

//datetest();

// updatemodel();
