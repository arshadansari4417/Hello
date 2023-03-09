import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

function CheckingProfile() {
    const navigate = useNavigate();
    const {isAuthenticated } = useSelector((state) => state.user);
    useEffect(() => {
        if (isAuthenticated === false) {
            navigate("/login");
        }
        else{
            navigate("/account");
        }
    }, [navigate, isAuthenticated]);
  return (
    <>
    </>
  )
}
function CheckingOrder() {
    const navigate = useNavigate();
    const {isAuthenticated } = useSelector((state) => state.user);
    useEffect(() => {
        if (isAuthenticated === false) {
            navigate("/login");
        }
        else{
            navigate("/orders");
        }
    }, [navigate, isAuthenticated]);
  return (
    <>
    </>
  )
}

export  {CheckingProfile,CheckingOrder}