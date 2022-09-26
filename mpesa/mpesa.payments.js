const axios = require("axios").default;
const mpesamodel = require("../models/mpesarefrence.model");
const LNMORecipts = require("../models/LNMO.model");
const admodel = require("../models/Advert.model");
const dealeraccount = require('../models/dealerpaymentinfo.model')
const dealerpaymentinfo = require("../models/dealerpaymentinfo.model");
const dayjs = require("dayjs");
const { Timestamp } = require("../utilityfunctions/time");

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
  // console.log("token received in stkpush: ", req.body.access_token);
  try {
    const auth = "Bearer " + req.body.access_token;

    const { mpesaid, no,accounttype } = req.body;
    // res.send({
    //   message: `api hit \n mpesaid:${mpesaid} \n  phone no: ${no} \n token:${auth}`,
    // });
    // return;

    
    console.log('account from  individual user: ',accounttype);

    if(accounttype !=='individual') return res.status(409).send({message:'has to be an individual account'})

    const phonenumbersave = parseInt(no);

    const boolnum = isNaN(phonenumbersave);
    // console.log(boolnum);
    if (boolnum) {
      return res.send("please enter valid phone number");
    }
    console.log(mpesaid, phonenumbersave);
    mpesaref = await mpesamodel.findOne({ accountref: mpesaid });

    // console.log("ref before save: ", mpesaref.phonenumber);
    if (mpesaref) {
      mpesaref.phonenumber = phonenumbersave;
      // console.log(mpesaref);
      await mpesaref.save();
    }

    // return;
    console.log(auth);
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
        PartyA: `${phonenumbersave}`,
        PartyB: "174379",
        PhoneNumber: `${phonenumbersave}`,
        CallBackURL:
          "https://50c3-197-232-61-237.ap.ngrok.io/payments/stkcallback",
        AccountReference: `${mpesaid}`,
        TransactionDesc: `payment for ${mpesaid}`,
      },
      { headers: { Authorization: auth } }
    );

    res.send({ message: stkresult.data });
  } catch (error) {
    console.log("error encounterd stk push: ", error.message);
    res.send({ message: error.message, err: error });
  }
};

exports.stkpushdealer = async (req, res) => {
  // console.log("token received in stkpush: ", req.body.access_token);
  try {
    const auth = "Bearer " + req.body.access_token;

    const { no, ownerid ,accounttype,plan,authtoken } = req.body;
    if(accounttype !=='dealer') return res.status(409).send({message:'has to be a dealer account'})


    console.log('dealer account values: ',no, ownerid ,accounttype,plan,authtoken);

    const dealer = await dealeraccount.findOne({dealerid:ownerid})

    console.log('dealer found in dealer model: ',dealer);

    if(dealer === null){

     let maxadcount=0
      if(plan==='bronze')maxadcount=8
      if(plan==='silver')maxadcount=20
      if(plan==='gold')maxadcount=50

      const newdealeraccount= await dealeraccount.create({
        dealerid:ownerid,
        paymentnumber:no,
        account:plan,
        totalads:maxadcount
      })

      console.log('a new dealer has been created: ',newdealeraccount);
    }else{

       const activesub=dayjs.unix(dealer.adactivation).toDate()
       console.log('date to ad expiry: ',activesub);
       const calenderdate= dayjs(activesub).format('DD,MMM YYYY')
       const displaydate=calenderdate.toString()
      if(dealer.adactivation>Math.floor(Date.now()/1000))return res.send({message:`you have an active subscrition wait till ${displaydate}`})

      let maxadcount=0
      if(plan==='bronze')maxadcount=8
      if(plan==='silver')maxadcount=20
      if(plan==='gold')maxadcount=50

      dealer.paymentnumber=no 
      dealer.account=plan
      dealer.totalads=maxadcount

      await dealer.save()
      console.log('dealer updated record: ',dealer);
    }

    
    return res.send({message:'await payment notification on your phone'})
    // console.log('account from  subscription user: ',accounttype);

    // res.send({
    //   message: `api hit \n mpesaid:${mpesaid} \n  phone no: ${no} \n token:${auth}`,
    // });
    // return;

    const phonenumbersave = parseInt(no);

    const boolnum = isNaN(phonenumbersave);
    // console.log(boolnum);
    if (boolnum) {
      return res.send({ message: "please enter valid phone number" });
    }
    // console.log(mpesaid, phonenumbersave);
    const dealerpaymentrefrence = await dealerpaymentinfo.find({
      dealerid: ownerid,
    });

    if (dealerpaymentrefrence) {
    }

    return;
    console.log(auth);
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
        PartyA: `${phonenumbersave}`,
        PartyB: "174379",
        PhoneNumber: `${phonenumbersave}`,
        CallBackURL:
          "https://50c3-197-232-61-237.ap.ngrok.io/payments/stkcallback",
        AccountReference: `${mpesaid}`,
        TransactionDesc: `payment for ${mpesaid}`,
      },
      { headers: { Authorization: auth } }
    );

    res.send({ message: stkresult.data });
  } catch (error) {
    console.log("error encounterd stk push dealer: ", error.message);
    res.send({ message: error.message, err: error });
  }
};

exports.stkcallback = async (req, res) => {
  try {
    // console.log("callbackdata:\n", req);

    console.log("callbackdata:\n", req.body.Body.stkCallback);
    // return;
    const stkbody = req.body.Body.stkCallback;
    console.log("stkbody:\n", stkbody);
    // console.log(req.body.Body.stkCallback);
    // const stkbody = req.body.Body.stkCallback;
    //console.log("stk body const:\n ", stkbody);
    if (stkbody.ResultCode === 0) {
      // //* get metadata from call back
      const responsearray = stkbody.CallbackMetadata.Item;

      const cellnumber = responsearray[responsearray.length - 1].Value;
      // console.log("payment number: ", cellnumber);

      const mpesapaymentdoc = await mpesamodel.findOne({
        phonenumber: cellnumber,
      });

      // console.log(("mpesa accnt doc: ", mpesapaymentdoc));
      if (mpesapaymentdoc) {
        // // console.log("mpesa doc: ", mpesapaymentdoc);
        mpesapaymentdoc.phonenumber = 0;
        await mpesapaymentdoc.save();

        console.log("mpesa doc after removing phone number: ", mpesapaymentdoc);

        const retrivead = await admodel.findOne({
          mpesaid: mpesapaymentdoc.accountref,
        });

        if (retrivead) {
          console.log("ad to update: \n", retrivead);

          const nextmonth = dayjs().add(1, "month");

          console.log("next month: ", nextmonth.toDate());

          nextmonthstring = dayjs(nextmonth.toDate());
          const updatetimestamp = Math.round(
            new Date(nextmonthstring).getTime()
          );

          retrivead.adactivation = updatetimestamp;
          await retrivead.save();

          console.log("updated ad: ", retrivead);
          console.log("nm: ", updatetimestamp);
          console.log("tm: ", Date.now());
          console.log("redirect to success ");

          res.redirect("/payments/success");
        }
      }
      // console.log("ad to update: \n", retrivead);
    } else if (
      req.body.Body.stkCallback.ResultCode === 1032 ||
      req.body.Body.stkCallback.ResultDesc === "Request cancelled by user"
    ) {
      console.log("....................error....................");

      console.log(req.body.Body.stkCallback.ResultDesc);
    } else {
      console.log("error encountered: \n", stkbody);
      console.log();
    }
  } catch (error) {
    console.log("stk callback error message: ", error.message);
    console.log("stk callback full error : ", error);
  }
};

exports.stkcallbacksuccess = async (req, res) => {
  try {
    const { mpesa } = req.query;

    const paidad = await admodel.findOne({ mpesaid: mpesa });

    if (paidad) {
      console.log("ad time stamp: ", paidad.adactivation);
      if (paidad.adactivation < Date.now())
        return res.send({ message: "ad has not been paid" });

      const actualtimestamp = paidad.adactivation + 10800000;
      console.log("timestamp: ", paidad.adactivation);
      const expirydate = dayjs(actualtimestamp);
      console.log("exppiry date: ", expirydate);
      res.send({ message: `ad is active untill ${expirydate}` });
    }
  } catch (error) {
    console.log("success callback error: ", error);
    res.send({
      message: "error at success callback",
      errmessage: error.message,
      fullerr: error,
    });
  }
};

exports.registerurl = async (req, res) => {
  try {
    const url = "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl";
    const auth = "Bearer " + req.body.access_token;
    console.log("register url authtoken: ", auth);

    const response = await axios.post(
      url,
      {
        ShortCode: "600610",
        ResponseType: "Completed",
        ConfirmationURL:
          "https://50c3-197-232-61-237.ap.ngrok.io/payments/confirmation",
        ValidationURL:
          "https://50c3-197-232-61-237.ap.ngrok.io/payments/validation",
      },
      {
        headers: { Authorization: auth },
      }
    );
    console.log("registreation of url initiated: ", response.data);
    res.send("registration successful");
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
        Msisdn: "254708374149",
        BillRefNumber: "00000",
        ShortCode: "174379",
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
  } catch (error) {
    console.log("validation error; ", error);
  }
};

exports.confirmation = async (req, res) => {
  try {
    console.log("confirmation: ", req.body);
    res.status(200).send({ message: "confirmation url registered" });
  } catch (error) {
    console.log("confirmation error; ", error);
  }
};

exports.callback = async (req, res) => {
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
    console.log("call back error: ", error.message);
    res.status(500).send({ message: "err caught at callback", err: error });
  }
};

function Dealerpayment() {}
