import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import { Link } from "react-router-dom";

const Footer=() =>{
  return (
    <MDBFooter bgColor='black' className='text-center text-lg-start text-white'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <a target='_blank' href='https://www.facebook.com' className='me-4 text-reset'>
            <MDBIcon fab icon="facebook-f" />
          </a>
          <a target='_blank' href='https://www.twitter.com' className='me-4 text-reset'>
            <MDBIcon fab icon="twitter" />
          </a>
          <a target='_blank' href='https://www.google.com' className='me-4 text-reset'>
            <MDBIcon fab icon="google" />
          </a>
          <a target='_blank' href='https://www.instagram.com' className='me-4 text-reset'>
            <MDBIcon fab icon="instagram" />
          </a>
          <a target='_blank' href='https://www.linkedin.com' className='me-4 text-reset'>
            <MDBIcon fab icon="linkedin" />
          </a>
          <a target='_blank' href='https://www.github.com' className='me-4 text-reset'>
            <MDBIcon fab icon="github" />
          </a>
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon icon="gem" className="me-3" />
                Ragsaa Luxury Car Rental
                
              </h6>
              <p>
                Ragsaa Luxury Car Rental is a part of RagsaaCommunication Pvt. Ltd. In Ragsaa Luxury Car Rental You can Book Luxury Car.
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Products</h6>
              <p>
                <Link to='/products' className='text-reset'>
                  BMW
                </Link>
              </p>
              <p>
                <Link to='/products' className='text-reset'>
                  Mercedes
                </Link>
              </p>
              <p>
                <Link to='/products' className='text-reset'>
                  Audi
                </Link>
              </p>
              <p>
                <Link to='/products' className='text-reset'>
                  Other Luxury
                </Link>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
              <p>
                <Link to='/about' className='text-reset'>
                AboutUs
                </Link>
              </p>
              <p>
                <Link to='/contact' className='text-reset'>
                Contact Us
                </Link>
              </p>
            </MDBCol>
            
            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                10B, Sharma Colony, Nandpuri Colony, Sodala, Jaipur
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                contact@ragsaaluxurycarrental.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> +91 9461933266
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2023 Copyright : 
        <a className='text-reset fw-bold' target='_blank'  href='https://www.instagram.com/arshad_ansari_4417/'>
          Arshad Hussain Ansari (Developer)
        </a>
      </div>
    </MDBFooter>
  );
}

export default Footer