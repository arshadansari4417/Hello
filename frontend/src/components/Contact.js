import React from 'react'
import './About.css'
import Footer from './layout/Footer'
import Header from './layout/Header'
import MetaData from './layout/MetaData.js'


const Contact = () => {
  return (
    <>
      <Header />
      <MetaData title='Ragsaa Luxury Car Rental - Contact Us'/> 
      <div className="container"><div className="containerr">
        <div class="up1">
          <div className="up" style={{boxShadow: "0 0 50px rgba(15,15,15,0.25)"}}></div>
        </div>
        <div className="down">
        <div className="item"><h2>ContactUs</h2></div>
          <div className='p1'><p><b>Mobile :- +91 9461933266</b><br /><b>Email :- contact@ragsaaluxurycarrental.com</b><br/><b>Email :- info@ragsaaluxurycarrental.com</b><br/><b>Address :- 4F02, 4th Floor, Mahima Trinity, New Sanganer Rd, Goverdhan Colony, Shiva Colony, Sodala, Jaipur, Rajasthan 302019</b></p></div></div>
      </div>
      </div>
      <Footer />
    </>
  )
}

export default Contact