const axios = require("axios").default;

exports.authtoken = async (req, res, next) => {
  // get basic auth by conination of  consumer key:consumer secret to base 64
  try {
    const consumerkey = "pRYr6zjq0i8L1zzwQDMLpZB3yPCkhMsc";
    const consumersecret = "Rf22BfZog0qQGlV9";
    const keytoencode = consumerkey + ":" + consumersecret;
    const auth = Buffer.from(keytoencode).toString("base64");
    // console.log("auth token: ",auth);

    const result = await axios.get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        headers: { Authorization: `Basic ${auth}` },
      }
    );

    // console.log(result.data.access_token);
    req.body.access_token = result.data.access_token;

    next();
  } catch (error) {
    console.log("error caught: ", error.message);
    res.status(500).send({ message: "server error", err: error.message });
  }
};
