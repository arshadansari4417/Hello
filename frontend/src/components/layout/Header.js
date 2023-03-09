import React, { useEffect , useState } from 'react'
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import './Header.css'


const Header = () => {
    const navigate = useNavigate();

    const [keyword,setKeyword]=useState("")

    const searchSubmitHandler =(e)=>{
        e.preventDefault(); 
        if(keyword.trim()){
            navigate(`/products/${keyword}`)
        }
        else{
            navigate("/products")   
        }
  
    }
    let location = useLocation();
    useEffect(() => {
    }, [location]);

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark  sticky-top navbar-custom" id='abcd' style={{boxShadow: "0 0 10px rgba(15,15,15,0.40)" }}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/" >Ragsaa Luxury</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link  ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link  ${location.pathname === "/products" ? "active" : ""}`} aria-current="page" to="/products">Cars</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link  ${location.pathname === "/about" ? "active" : ""}`} to="/about">AboutUs</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link  ${location.pathname === "/contact" ? "active" : ""}`} to="/contact">ContactUs</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link  ${location.pathname === "/orders" ? "active" : ""} `} to="/checkingorder">My Orders</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link  ${location.pathname === "/cart" ? "active" : ""} mx-3`} to="/cart"><i className="fa-solid fa-cart-shopping"></i></Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="/dropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="fa-solid fa-user"></i>
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/login">Login/SignUp</Link></li>
                                    <li><Link className="dropdown-item" to="/checkinprofile">User's Details</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                </ul>
                            </li>
                        </ul>

                        <form className="d-flex" onSubmit={searchSubmitHandler}>
                            <input className="form-control me-2" type="text" placeholder="Search Luxury Cars..." onChange={(e)=> setKeyword(e.target.value)} />
                            <Link to={`/products/${keyword}`}><input className='btn-search' type="submit" value="Search" style={{borderRadius:"10px", padding:"4px",backgroundColor:"white"}}/></Link>
                        </form>


                    </div>
                </div>
            </nav></>
    )
}

export default Header