const crypto = require("crypto");
const https = require("https");

var partnerCode = "MOMO0SVP20220703";
var accessKey = "BosTEwQEXA7DI4Kc";
var secretkey = "4ieDrN00kqJxb77gaSSmdCwi9NbaIUu7";
var orderInfo = "pay with MoMo";
var redirectUrl = "https://localhost:3000/payment"; //redirect fix

var notifyUrl = "https://webhook.site/454e7b77-f177-4ece-8236-ddf1c26ba7f8";

var requestType = "captureWallet";
var extraData = "";
/**
 * This function end single call
 * @returns {Promise<void>}
 * @param req
 */
exports.getMomoPaymentLink = async (req) => {
  var requestId = partnerCode + new Date().getTime();
  var orderId = requestId;

  var rawSignature =
    "accessKey=" +
    accessKey +
    "&amount=" +
    req.body.amount +
    "&extraData=" +
    extraData +
    "&ipnUrl=" +
    notifyUrl +
    "&orderId=" +
    orderId +
    "&orderInfo=" +
    orderInfo +
    "&partnerCode=" +
    partnerCode +
    "&redirectUrl=" +
    redirectUrl +
    "&requestId=" +
    requestId +
    "&requestType=" +
    requestType;
  console.log("--------------------RAW SIGNATURE----------------");
  console.log(rawSignature);

  var signature = crypto
    .createHmac("sha256", secretkey)
    .update(rawSignature)
    .digest("hex");
  console.log("--------------------SIGNATURE----------------");
  console.log(signature);

  const requestBody = JSON.stringify({
    partnerCode: partnerCode,
    accessKey: accessKey,
    requestId: requestId,
    amount: req.body.amount,
    orderId: orderId,
    orderInfo: orderInfo,
    redirectUrl: redirectUrl,
    ipnUrl: notifyUrl,
    extraData: extraData,
    requestType: requestType,
    signature: signature,
    lang: "en",
  });

  const options = {
    hostname: "test-payment.momo.vn",
    port: 443,
    path: "/v2/gateway/api/create",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(requestBody),
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      console.log(`Status: ${res.statusCode}`);
      console.log(`Headers: ${JSON.stringify(res.headers)}`);
      res.setEncoding("utf8");
      res.on("data", (body) => {
        console.log("Body: ");
        console.log(body);
        console.log("payUrl: ");
        console.log(JSON.parse(body).payUrl);
        resolve(JSON.parse(body));
      });
      res.on("end", () => {
        console.log("No more data in response.");
      });
    });

    req.on("error", (e) => {});

    console.log("Sending....");

    req.write(requestBody);
    req.end();
  });
};

exports.getSignature = async (req) => {
  var rawSignature =
    "accessKey=" +
    accessKey +
    "&amount=" +
    req.body.amount +
    "&extraData=" +
    req.body.extraData +
    "&message=" +
    req.body.message +
    "&orderId=" +
    req.body.orderId +
    "&orderInfo=" +
    req.body.orderInfo +
    "&orderType=" +
    req.body.orderType +
    "&partnerCode=" +
    req.body.partnerCode +
    "&payType=" +
    req.body.payType +
    "&requestId=" +
    req.body.requestId +
    "&responseTime=" +
    req.body.responseTime +
    "&resultCode=" +
    req.body.resultCode +
    "&transId=" +
    req.body.transId;

  console.log("--------------------RAW SIGNATURE----------------");
  console.log(rawSignature);

  var signature = crypto
    .createHmac("sha256", secretkey)
    .update(rawSignature)
    .digest("hex");
  console.log("--------------------SIGNATURE----------------");
  console.log(signature);
  return signature;
};
