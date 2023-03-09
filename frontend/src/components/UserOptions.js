import React, { useState } from 'react'
import './userOptions.css'
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import Backdrop from '@mui/material/Backdrop';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ListAltIcon from '@mui/icons-material/ListAlt';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import { useAlert } from "react-alert";
import { logout } from '../actions/userAction';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";




const UserOptions = ({ user }) => {
    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);


    const options = [
        { icon: <HomeIcon />, name: "Home", func: home },
        { icon: <PersonIcon />, name: "Profile", func: account },
        {
            icon: (
              <ShoppingCartIcon
                style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
              />
            ),
            name: `Cart(${cartItems.length})`,
            func: cart,
          },
        { icon: <ListAltIcon />, name: "Orders", func: orders },
        { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
    ];

    if (user.role === "admin") {
        options.unshift({
            icon: <DashboardIcon />,
            name: "Dashboard",
            func: dashboard,
        });
    }

    function dashboard() {
        navigate("/admin/dashboard");
    }

    function orders() {
        navigate("/orders");
    }
    function home() {
        navigate("/");
    }
    function account() {
        navigate("/account");
    }
      function cart() {
        navigate("/cart");
      }
    function logoutUser() {
        dispatch(logout());
        navigate("/");
        alert.success("Logout Successfully");
    }

    const [open, setOpen] = useState(false);
    return (
        <>
        <Backdrop open={open} style={{ color: '#fff' }} />
            <SpeedDial
                ariaLabel='SpeedDial tooltip example' 
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                direction="down"
                // style={{ zIndex: "11" }}
                className='speedDial'
                icon={<img className='speedDialIcon' src={user.avatar.url ? user.avatar.url : "/Profiler.png"} alt="Proflie" />}
            >{options.map((item) => (
                <SpeedDialAction
                    key={item.name}
                    icon={item.icon}
                    tooltipTitle={item.name}
                    onClick={item.func}
                    tooltipOpen={window.innerWidth <= 600 ? true : false}
                />
            ))}</SpeedDial>
        </>
    )
}

export default UserOptions