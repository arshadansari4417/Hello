import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./orderSuccess.css";
import { Typography } from "@material-ui/core";
import { useSearchParams } from "react-router-dom"
import { Link } from "react-router-dom";


const OrderSuccess = () => {
  const seachQuery = useSearchParams()[0]
  const referenceNum = seachQuery.get("reference")
  
  return (
    <div className="orderSuccess">
      <CheckCircleIcon />

      <Typography>Your Order has been Placed successfully </Typography>
      <Link to="/orders">View Orders</Link>
      <h6>
        Reference No.{referenceNum}
      </h6>

    </div>
  );
};

export default OrderSuccess;
