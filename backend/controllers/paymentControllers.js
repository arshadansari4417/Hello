const Razorpay =require("razorpay");
const crypto=require("crypto");
const { Payment } =require("../models/paymentModel.js");

const instance = new Razorpay({
    key_id: "rzp_live_SkoQjxFFBCtwh4",
    key_secret: "FowPENXFPUAA39AbwAX4Wcql",
  });

exports.checkout = async (req, res) => {
  const options = {
    amount: req.body.paymentData.amount,
    currency: "INR",
  };
  const order = await instance.orders.create(options);
  res.status(200).json({
    success: true,
    order,
  });
};

exports.paymentVerification = async (req, res) => {

  const body = req.body.paymentt.razorpay_order_id + "|" + req.body.paymentt.razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", "FowPENXFPUAA39AbwAX4Wcql")
    .update(body.toString())
    .digest("hex");

    response={"signatureIsValid":"false"}
  const isAuthentic = expectedSignature === req.body.paymentt.razorpay_signature;

  if (isAuthentic) {
    response={"signatureIsValid":"true"}
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body.paymentt;
    await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });
    res.send(response);
  } else {
    res.status(400).json({
      success: false,
    });
  }
};