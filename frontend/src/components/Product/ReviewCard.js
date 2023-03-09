import React from 'react'
import { Rating } from '@mui/material'
import profilePng from './../../Images/profile.png'
import './ProductDetails.css'

const ReviewCard = ({ review }) => {

    const Options = {
        size: "large",
        value: review.rating,
        readOnly:true,
        precision:0.5,
    }

    return (
        <div className='ReviewCard'>
            <img src={profilePng} alt="User" />
            <p>{review.name}</p>
            <Rating {...Options} />
            <span className='reviewCardComment'>{review.comment}</span>
        </div>
    )
}

export default ReviewCard