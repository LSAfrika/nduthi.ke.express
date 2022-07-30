const axios = require("axios").default;

exports.getaccesstoken = async (req, res) => {
  try {
    //*     get access token using consumer key and consumer secret
    // authsafcom(res)
    console.log("req body:", req.body.access_token);
    res.send({ acctoken: req.body.access_token });
  } catch (error) {
    res.send(error.message);
  }
};

exports.stkpush = async (req, res) => {
  console.log("token received in stkpush: ", req.body.access_token);
  try {
    const auth = "Bearer " + req.body.access_token;
    // console.log(auth);
    const timestamp = Timestamp();

    // *  to generate pass word we join the SHORTCODE + PASSKEY + TIMESTAMP into base 64 Buffer.from(shortcode+passkey+timestamp).toString('base64')
    const passwordbuffer = Buffer.from(
      "174379" +
        "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919" +
        timestamp
    ).toString("base64");
    // *  console.log('buffer password: ',passwordbuffer);
    // * the pass key and time stamp were attained from decoding the encoded password
    const testpassword = Buffer.from(
      "174379" +
        "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919" +
        "20160216165627"
    ).toString("base64");

    // * safcom test line 254708374149
    const stkpushurl =
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
    const stkresult = await axios.post(
      stkpushurl,
      {
        BusinessShortCode: "174379",
        Password:
          "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMTYwMjE2MTY1NjI3",
        Timestamp: "20160216165627",
        TransactionType: "CustomerPayBillOnline",
        Amount: "1",
        PartyA: "254713767648",
        PartyB: "174379",
        PhoneNumber: "254713767648",
        CallBackURL: "https://fa21-197-156-191-6.in.ngrok.io/callback",
        AccountReference: "Test",
        TransactionDesc: "Test",
      },
      { headers: { Authorization: auth } }
    );
    // * console.log('stk result:',stkresult.data);

    res.send({ message: stkresult.data });
  } catch (error) {
    // * console.log('error encounterd stk push: ',error.message);
    res.send({ message: error.message, err: error });
  }
};

exports.stkcallback = async (req, res) => {
  try {
    console.log("....................body after paynment....................");
    console.log(req.body);
    console.log(
      "....................body.body after paynment...................."
    );

    console.log(req.body.Body);
    console.log(
      "....................body.body.stkcallback after paynment...................."
    );
    console.log(req.body.Body.stkCallback.CallbackMetadata);

    res.send({ resp: req.body.Body.stkCallback });
  } catch (error) {
    console.log("stk callback error message: ", error.message);
    console.log("stk callback full error : ", error);
  }
};

exports.registerurl = async (req, res) => {
  try {
    const url = "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl";
    const auth = "Bearer " + req.body.access_token;
    console.log("token: ", auth);

    const response = await axios.post(
      url,
      {
        ShortCode: "600610",
        ResponseType: "Completed",
        ConfirmationURL: "https://fa21-197-156-191-6.in.ngrok.io/confirmation",
        ValidationURL: "https://fa21-197-156-191-6.in.ngrok.io/validation",
      },
      {
        headers: { Authorization: auth },
      }
    );
    console.log("registreation of url initiated: ", response);
  } catch (error) {
    console.log("error: ", error.response);
    res
      .status(500)
      .send({ message: "error while registering URLs", err: error });
  }
};

exports.simulatepaybill = async (req, res) => {
  try {
    const auth = "Bearer " + req.body.access_token;
    const url = "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/simulate";

    const response = await axios.post(
      url,
      {
        CommandID: "CustomerPayBillOnline",
        Amount: "10",
        Msisdn: "254724628580",
        BillRefNumber: "00000",
        ShortCode: "600247",
      },
      { headers: { Authorization: auth } }
    );

    console.log("simualation response: ", response.data);
    res.send({ result: response.data });
  } catch (error) {
    console.log("error in sumulating paybill online: ", error);
    res.send({ err: error });
  }
};

exports.validation = async (req, res) => {
  try {
    console.log("validation: ", req.body);
    res
      .status(200)
      .send({ message: "validation  url registered", body: req.body });
  } catch (error) {}
};

exports.confirmation = async (req, res) => {
  try {
    console.log("confirmation: ", req.body);
    res.status(200).send({ message: "confirmation url registered" });
  } catch (error) {}
};

function Timestamp() {
  const timestamp = new Date();

  const date =
    timestamp.getFullYear() +
    "" +
    mapmonth() +
    mapdate() +
    "" +
    maphour() +
    "" +
    mapminutes() +
    "" +
    mapseconds();

  return date;
}

function maphour() {
  const timestamp = new Date();
  let Returnedhour = "";
  const hour = timestamp.getHours();
  if (hour < 10) {
    Returnedhour = "0" + hour;
    //     console.log('hour:',Returnedhour);
    return Returnedhour;
  } else {
    Returnedhour = "" + hour;
    //    console.log(Returnedhour);
    return Returnedhour;
  }
}
function mapdate() {
  const timestamp = new Date();
  let day = "";
  const date = timestamp.getDate();
  if (date < 10) {
    day = "0" + date;
    //     console.log('date:',date);
    return day;
  } else {
    day = "" + date;
    //      console.log(day);
    return day;
  }
}
function mapmonth() {
  const timestamp = new Date();
  let returnedmonth = "";
  const month = timestamp.getMonth();
  if (month < 10) {
    returnedmonth = "0" + month;
    //  console.log('month:',month);
    return returnedmonth;
  } else {
    returnedmonth = "" + date;
    //  console.log(returnedmonth);
    return returnedmonth;
  }
}

function mapminutes() {
  const timestamp = new Date();
  let returnedminutes = "";
  const minutes = timestamp.getMinutes();
  if (minutes < 10) {
    returnedminutes = "0" + minutes;
    //  console.log('month:',month);
    return returnedminutes;
  } else {
    returnedminutes = "" + minutes;
    //  console.log(returnedminutes);
    return returnedminutes;
  }
}
function mapseconds() {
  const timestamp = new Date();
  let returnedseconds = "";
  const seconds = timestamp.getSeconds();
  if (seconds < 10) {
    returnedseconds = "0" + seconds;
    //  console.log('month:',month);
    return returnedseconds;
  } else {
    returnedseconds = "" + seconds;
    //  console.log(returnedseconds);
    return returnedseconds;
  }
}
