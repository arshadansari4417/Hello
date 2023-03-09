import React from "react";
import "./CartItemCard.css";
import { Link } from "react-router-dom";

const CartItemCard = ({ item, deleteCartItems }) => {
  const SizeIF =  JSON.parse(sessionStorage.getItem("SizeInfo"));
  const SizeIG =  JSON.parse(sessionStorage.getItem("CarType"));
  return (
    <div className="CartItemCard">
      <img src={item.image} alt="ssa" />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price: ₹${item.price}`}</span>
        <span>{`Car Type: ${SizeIF}`}</span>
        <span>{`Fuel Type: ${SizeIG}`}</span>
        <p onClick={() => deleteCartItems(item.product)}>Remove</p>
      </div>
    </div>
  );
};

export default CartItemCard;
