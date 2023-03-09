import React from 'react'
import Header from './layout/Header'
import './About.css'
import Footer from './layout/Footer'
import MetaData from './layout/MetaData.js'


const About = () => {
  return (
    <>
      <Header />
      <MetaData title='Ragsaa Luxury Car Rental - About Us'/> 
      <div className="container"><div className="containerr">
        <div class="up1">
          <div className="up" style={{boxShadow: "0 0 50px rgba(15,15,15,0.25)"}}></div>
        </div>
        <div className="down">
        <div className="item"><h2>About Work</h2></div>
          <div className='p1'><p>Ragsaa is a Jaipur based Indian and Luxury Car Rental Company. The company is committed to providing its customers with top-notch car rental services for various occasions and events, including weddings, corporate events, airport transfers, and sightseeing tours. The company offers a wide range of luxury cars, including sedans, SUVs, and luxury coaches, from some of the world's most renowned car brands, such as BMW, Audi, Mercedes-Benz, and Toyota, among others. These vehicles are well-maintained, regularly serviced, and equipped with modern amenities to ensure that customers enjoy a comfortable and safe ride. At Ragsaa Luxury Car Rental, customer satisfaction is a top priority, and the company goes the extra mile to ensure that every customer receives personalized attention and exceptional service All are curated by the founder Mr Abrar Ahmed Ansari</p></div>
        </div></div>
      </div>
      <Footer />
    </>
  )
}

export default About