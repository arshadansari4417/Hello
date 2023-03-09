import React from 'react'
import { Link } from 'react-router-dom'
import { Rating } from '@mui/material'



const ProductCard = ({ product }) => {
  
  const Options = {
    value: product.ratings,
    readOnly:true,
    precision:0.5,
}
  return (
    <Link className="productCard" style={{overflow:"hidden"}}to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <span><i class="fa-sharp fa-solid fa-circle-dot"></i>{product.Manual?"Manual":"Automatic"}</span>
      <span><i class="fa-sharp fa-solid fa-circle-dot"></i>{(product.SizeXS?"Petrol":product.SizeS?"Deisel":product.SizeM?"CNG":"Electric")}</span>
      <div>
        <Rating {...Options} />{" "}
        <span className="productCardSpan">
          {" "}
          ({product.numOfReviews} Reviews)
        </span>
      </div>
      <span>Old Prize- <strike style={{color:"blue"}}>{`₹${product.price2}`}</strike>\hr</span>
      <span>Current Prize- <span style={{color:"blue"}}>{`₹${product.price}`}\hr</span></span>
    </Link>
  );
}

export default ProductCard