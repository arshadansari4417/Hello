import React, { useRef, useState, useEffect } from 'react';
import "./LoginSignup.css";
import Loader from './../layout/Loader';
import { Link } from "react-router-dom";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import FaceIcon from '@mui/icons-material/Face';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, login, register } from '../../actions/userAction';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";

const LoginSignup = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const alert = useAlert();
    const { loading, error, isAuthenticated } = useSelector(state => state.user)
    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });
    const { name, email, password } = user;

    const [avatar, setAvatar] = useState("https://res.cloudinary.com/ragsaatextiles01/image/upload/v1678357910/avatars/qokun9ufrgy88g1yqhyb-Circle_u5tfi9.png");
    const [avatarPreview, setAvatarPreview] = useState("https://res.cloudinary.com/ragsaatextiles01/image/upload/v1678357910/avatars/qokun9ufrgy88g1yqhyb-Circle_u5tfi9.png");

    const loginSubmit = (e) => {

        e.preventDefault();
        dispatch(login(loginEmail, loginPassword));
    }
    const registerSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("avatar", avatar);
        console.log("SignUp Form Submitted")
        dispatch(register(myForm));
    };

    const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview('https://res.cloudinary.com/ragsaatextiles01/image/upload/v1678357910/avatars/qokun9ufrgy88g1yqhyb-Circle_u5tfi9.png');
                    setAvatar('https://res.cloudinary.com/ragsaatextiles01/image/upload/v1678357910/avatars/qokun9ufrgy88g1yqhyb-Circle_u5tfi9.png');
                }
            };

            reader.readAsDataURL(e.target.files[0]);
        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };

    const redirect = location.search ? location.search.split("=")[1] : "/"    //account

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (isAuthenticated) {
            navigate(redirect);
        }
    }, [dispatch, error, alert, isAuthenticated, navigate,redirect]);
    const switchTabs = (e, tab) => {
        if (tab === "login") {
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");

            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }
        if (tab === "register") {
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");

            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }
    };




    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <div className="LoginSignUpContainer">
                        <div className="LoginSignUpBox">
                            <div>
                                <div className="login_signUp_toggle">
                                    <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                                    <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                                </div>
                                <button ref={switcherTab}></button>
                            </div>
                            <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                                <div className="loginEmail">
                                    <MailOutlineIcon />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        required
                                        value={loginEmail}
                                        onChange={(e) => setLoginEmail(e.target.value)}
                                    />
                                </div>
                                <div className="loginPassword">
                                    <LockOpenIcon />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        required
                                        value={loginPassword}
                                        onChange={(e) => setLoginPassword(e.target.value)}
                                    />
                                </div>
                                <Link to="/password/forgot">Forget Password ?</Link>
                                <input type="submit" value="Login" className="loginBtn" />
                            </form>
                            <form
                                className="signUpForm"
                                ref={registerTab}
                                encType="multipart/form-data"
                                onSubmit={registerSubmit}
                            >
                                <div className="signUpName">
                                    <FaceIcon />
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        required
                                        name="name"
                                        value={name}
                                        onChange={registerDataChange}
                                    />
                                </div>
                                <div className="signUpEmail">
                                    <MailOutlineIcon />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        required
                                        name="email"
                                        value={email}
                                        onChange={registerDataChange}
                                    />
                                </div>
                                <div className="signUpPassword">
                                    <LockOpenIcon />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        required
                                        name="password"
                                        value={password}
                                        onChange={registerDataChange}
                                    />
                                </div>

                                <div id="registerImage" style={{display:"flex",justifyContent:"Center",alignItems:"center"}}>
                                    <img src={avatarPreview} alt="Avatar Preview" />
                                    {/* <input
                                        type="file"
                                        name="avatar"
                                        accept="image/*"
                                        onChange={registerDataChange}
                                    /> */}
                                </div>
                                <input type="submit" value="Register" className="signUpBtn" />
                            </form>
                        </div>

                    </div>
                </>)}
        </>
    )
}

export default LoginSignup