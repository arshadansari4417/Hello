import React, { useEffect } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { createOrder, clearErrors } from "../../actions/orderAction.js";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const Payment = () => {
	const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
	const SizeIF =  JSON.parse(sessionStorage.getItem("SizeInfo"));
	const SizeIG =  JSON.parse(sessionStorage.getItem("CarType"));
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const alert = useAlert();
	const { shippingInfo, cartItems } = useSelector((state) => state.cart);
	const { user } = useSelector((state) => state.user);
	const { error } = useSelector((state) => state.newOrder);

	const paymentData = {
		amount: Math.round(orderInfo.totalPrice * 100),
	};

	const orderr = {
		shippingInfo,
		orderItems: cartItems,
		itemsPrice: orderInfo.subtotal,
		taxPrice: orderInfo.tax,
		shippingPrice: orderInfo.shippingCharges,
		totalPrice: orderInfo.totalPrice,
	};

	const checkoutHandlerONLINE = async () => {

		const { data: { key } } = await axios.get("https://ragsaatextiles.com/api/getkey")

		const { data: { order } } = await axios.post("https://ragsaatextiles.com/api/V1/checkout", {
			paymentData
		})

		const options = {
			key,
			amount: order.amount,
			currency: "INR",
			name: "RagsaaTexttiles",
			description: "Tutorial of RazorPay",
			image: "https://res.cloudinary.com/ragsaatextiles01/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1669026452/payment_avatar/lodo_payment_f3esye.jpg",
			order_id: order.id,
			handler: async function (response) {
				await sessionStorage.setItem("PaymentInfo", JSON.stringify(response))
				Roudy();
			},
			prefill: {

				name: user.name,
				email: user.email,
				contact: shippingInfo.phoneNo
			},
			notes: {
				address: {
					line1: shippingInfo.address,
					city: shippingInfo.city,
					state: shippingInfo.state,
					postal_code: shippingInfo.pinCode,
					country: shippingInfo.country,
				},
			},
			theme: {
				"color": "#FF6347"
			}
		};
		const razor = new window.Razorpay(options);
		razor.open();
	}

	const Roudy = async () => {
		const PaymentIF = await JSON.parse(sessionStorage.getItem("PaymentInfo"));
		const paymentt = {
			razorpay_payment_id: PaymentIF.razorpay_payment_id,
			razorpay_order_id: PaymentIF.razorpay_order_id,
			razorpay_signature: PaymentIF.razorpay_signature,
		}
		const { data } = await axios.post("https://ragsaatextiles.com/api/V1/paymentVerification", {
			paymentt
		})
		if (data.signatureIsValid === "true") {
			orderr.paymentInfo = {
				id: paymentt.razorpay_payment_id,
				status: "paid",
			};
			orderr.SizeInfo = SizeIF
			orderr.CarType = SizeIG
			dispatch(createOrder(orderr));
			navigate(`/success?reference=${paymentt.razorpay_payment_id}`)
			alert.success("Order Successfully")
			sessionStorage.clear()
		}
	}
	const Unpaid = "PAYMENT DUE"
	const checkoutHandlerCOD = async () => {
		orderr.paymentInfo = {
			id: "Payment Due ",
			status: "Cash On Delivery",
		};
		orderr.SizeInfo = SizeIF
		orderr.CarType = SizeIG
		dispatch(createOrder(orderr));
			navigate(`/success?reference=${Unpaid}`)
			alert.success("Order Successfully")
			sessionStorage.clear()
	}
	const checkoutHandlerCancel = async () => {
			navigate("/")
			alert.error("Payment Cancel")
	}
	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}
	}, [dispatch, error, alert]);
	
	return (

		<>
	<Header/>
			<MetaData title="Enquiry" />
			<CheckoutSteps activeStep={2} />
			<div className="container2" style={{display:"flex",marginTop:"4vmax",marginLeft:"10vmax",marginRight:"10vmax"}}>
				<h2 style={{ color: "tomato",display:"flex"}}>&rarr;Make Enquiry -</h2>
				<button type="button" style={{display:"flex" ,justifyContent:"center",alignItems:"center"}} onClick={checkoutHandlerCOD} className="btn btn-outline-success">Make Enquiry</button>
			</div>
			<div className="container1" style={{display:"flex",marginTop:"10vmax",marginLeft:"10vmax",marginRight:"10vmax"}}>
				<h2 style={{ color: "tomato",display:"flex"}}>&rarr;PAY ONLINE -</h2>
				<button type="button" disabled={true } style={{display:"flex",justifyContent:"center",alignItems:"center"}} onClick={checkoutHandlerONLINE} className="btn btn-outline-success">{`Pay - ₹${orderInfo && orderInfo.totalPrice}`}</button>
				<h2 style={{ color: "tomato",display:"flex"}}>Coming Soon!</h2>
			</div>
			<div className="container2" style={{display:"flex",marginTop:"10vmax",marginLeft:"10vmax",marginRight:"10vmax",justifyContent:"flex-end",alignItems:"center"}}>
				<p style={{ color: "tomato",display:"flex"}}>&rarr;Cancel-</p>
				<button type="button" style={{display:"flex",justifyContent:"center",alignItems:"center"}} onClick={checkoutHandlerCancel} className="btn btn-outline-success">Cancel</button>
			</div>
		<Footer/>
</>
	)
}

export default Payment

