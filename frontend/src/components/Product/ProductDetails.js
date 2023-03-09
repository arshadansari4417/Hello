import React, { useEffect, useState } from 'react'
import './ProductDetails.css'
import Carousel from 'react-material-ui-carousel'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { clearErrors, getProductDetails, newReview } from '../../actions/productAction'
import { addItemsToCart } from '../../actions/cartAction'
import Loader from '../layout/Loader'
import Header from '../layout/Header'
import Footer from '../layout/Footer'
import ReviewCard from './ReviewCard.js'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from '@mui/material'
import { NEW_REVIEW_RESET } from '../../constants/productConstants'

const ProductDetails = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { product, loading, error } = useSelector((state) => state.productDetails)
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );
  var { id } = useParams()


  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert, reviewError, success]);

  const Options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  }
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");


  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };
  let counter1=0;
  let counter2=0;
  const sizeHandler = async(e) => {
    if(e.target.value==="Petrol"){
      alert.success("Petrol Selected")
      await sessionStorage.setItem("SizeInfo", JSON.stringify(e.target.value))
    }
    if(e.target.value==="Diesel"){
      alert.success("Diesel Selected")
      await sessionStorage.setItem("SizeInfo", JSON.stringify(e.target.value))
    }
    else if(e.target.value==="CNG"){
      alert.success("CNG Selected")
      await sessionStorage.setItem("SizeInfo", JSON.stringify(e.target.value))
    }
    else if(e.target.value==="EV"){
      alert.success("EV Selected")
      await sessionStorage.setItem("SizeInfo", JSON.stringify(e.target.value))
    }
    counter1=counter1+1;
    
  };
  const typeHandler = async(e) => {
    if(e.target.value==="Automatic"){
      alert.success("Automatic Selected")
      await sessionStorage.setItem("CarType", JSON.stringify(e.target.value))
    }
    else if(e.target.value==="Manual"){
      alert.success("Manual Selected")
      await sessionStorage.setItem("CarType", JSON.stringify(e.target.value))
    }
    counter2=counter2+1;
  }
  
  
  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    if(counter1!==0&&counter2!==0){
    dispatch(addItemsToCart(id, quantity));
    alert.success("Item Added To Cart");
    navigate("/cart");}
    else if(counter1===0&&counter2!==0){
      alert.error("First Select Fuel Type Then Book Ride");
    }
    else if(counter1!==0&&counter2===0){
      alert.error("First Select Car Type Then Book Ride");
    }
    else {
      alert.error("First Select Fuel Type & Car Type Then Book Ride");
    }
  };

  
  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };
  const reviewSubmitHandler = () => {
    const myForm = new FormData();
    
    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  return (
    <>
      <Header />
      {loading ? (<Loader />) : (<>
        <div className='ProductDetails'>
          <div className='flex-1'>
            <Carousel>
              {product.images && product.images.map((item, i) => (
                <img
                  className='CarouselImage'
                  key={item.url}
                  src={item.url}
                  alt={`${i} Slide`} />
              ))}
            </Carousel>
          </div>
          <div className='flex-2'>
            <div className="detailsBlock-1">
              <h2>{product.name}</h2>
              <p>Product# {product._id}</p>
            </div>
            <div className="SizeButtons">
              <p>Select Fuel Type</p>
              <button type="button" style={{margin:"0.5vmax"}} value={"Petrol"} disabled={product.SizeXS > 1 ? false : true} onClick={sizeHandler} className="btn btn-outline-warning">Petrol</button>
              <button type="button" style={{margin:"0.5vmax"}} value={"Diesel"} disabled={product.SizeS > 1 ? false : true} onClick={sizeHandler} className="btn btn-outline-warning">Diesel</button>
              <button type="button" style={{margin:"0.5vmax"}} value={"CNG"} disabled={product.SizeM > 1 ? false : true} onClick={sizeHandler} className="btn btn-outline-warning">CNG</button>
              <button type="button" style={{margin:"0.5vmax"}} value={"EV"} disabled={product.SizeL > 1 ? false : true} onClick={sizeHandler} className="btn btn-outline-warning">Electric</button>
              
            <div>
              <p>Select Engine Type</p>
              <button type="button" style={{margin:"0.5vmax"}} value={"Automatic"} disabled={product.SizeXL > 1 ? true : false} onClick={typeHandler} className="btn btn-outline-warning">Automatic</button>
              <button type="button" style={{margin:"0.5vmax"}} value={"Manual"} disabled={product.SizeXXL > 1 ? true : true} onClick={typeHandler} className="btn btn-outline-warning">Manual</button>
            </div>
            </div>
            <div className="detailsBlock-2">
              <Rating {...Options} />
              <span className='detailsBlock-2-span'>({product.numOfReviews} Reviews)</span>
            </div>
            <div className="detailsBlock-3">
            <span>Old Prize- <strike style={{color:"red"}}>{`₹${product.price2}`}</strike>\hr</span>
              <h1>{`₹${product.price} Per Hours`}</h1>
              <h6 style={{color:"red"}}>&#42; Please First Select Your Car Type And Fuel Type</h6>
              <div className="detailsBlock-3-1">
                <div className="detailsBlock-3-1-1">
                  <p>Select Time in Hours</p>
                  <button onClick={decreaseQuantity}>-</button>
                  <input readOnly type="number" value={quantity} />
                  <button onClick={increaseQuantity}>+</button>
                </div>
                <button onClick={addToCartHandler} style={{ display: product.Stock < 1 ? "none" :""}}>Book Your Ride</button>
              </div>
              <p>
                Status:
                <b className="helloworld" style={{ color: product.Stock < 1 ? "red" : "green" }}>
                  {product.Stock < 1 ? "OutOfStock" : "InStock"}
                </b><br />
              </p>
            </div>
            <div className="detailsBlock-4">
              Description : <p>{product.description}</p>
            </div>
            <button className='submitReview' onClick={submitReviewToggle}>Submit Review</button>
          </div>
        </div>
        <h3 className='reviewsHeading'>REVIEWS</h3>

        <Dialog
          aria-labelledby="simple-dialog-title"
          open={open}
          onClose={submitReviewToggle}
        >
          <DialogTitle>Submit Review</DialogTitle>
          <DialogContent className="submitDialog">
            <Rating
              onChange={(e) => setRating(e.target.value)}
              value={rating}
              size="large"
            />

            <textarea
              className="submitDialogTextArea"
              cols="30"
              rows="5"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </DialogContent>
          <DialogActions>
            <Button onClick={submitReviewToggle} color="secondary">
              Cancel
            </Button>
            <Button onClick={reviewSubmitHandler} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>

        {product.reviews && product.reviews[0] ? (
          <div className='reviews'>
            {product.reviews && product.reviews.map((review) => <ReviewCard review={review} />)}
          </div>
        ) : (<p className='noReviews'>No Review Yet</p>)}
      </>)
      }
      <Footer /> </>
  )
}

export default ProductDetails