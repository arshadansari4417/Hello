import React, { useEffect, useState } from 'react'
import './Products.css'
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, getProduct } from '../../actions/productAction'
import Loader from '../layout/Loader'
import ProductCard from '../ProductCard'
import Header from '../layout/Header'
import Footer from '../layout/Footer'
import { useParams } from 'react-router-dom'
import Pagination from 'react-js-pagination'
import { useAlert } from 'react-alert'
import Slider from '@material-ui/core/Slider'
import { Typography } from '@material-ui/core'



const categories1 = [
    "Mercedes",
    "Audi",
    "LandRover",
    "Volvo",
    "Jaguar",
    "Lexus",
  ]
const categories2 = [
    "Fortuner",
    "Cooper",
    "Maserati",
    "Vintage",
    "Porsche",
    "BMW",
  ]

const Products = (props) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const [currentPage, setCurrentPage] = useState(1);
    const [ratings, setRatings] = useState(0);
    const [price, setPrice] = useState([0, 9999]);
    const [category, setCategory] = useState("");
    const { products, loading, error, productsCount, resultPerPage, filteredProductsCount } = useSelector((state) => state.products)
    var { keyword } = useParams();
    const setCurrentPageNo = (e) => {
        setCurrentPage(e)
    }
    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    }
    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        dispatch(getProduct(keyword, currentPage, price, category, ratings))
    }, [dispatch, keyword, currentPage, price, alert, error, category, ratings]);
    let count = filteredProductsCount;

    return (
        <>
            <Header />
            <div className="main">
                <div className="filterBox">
                    <Typography className='a123'>Categories - </Typography>
                    <ul className='categoryBox1'  >
                        {categories1.map((category) => (
                            <li className='category-link'
                                key={category}
                                onClick={() => setCategory(category)}>
                                {category}
                            </li>

                        ))}
                    </ul>
                    <ul className='categoryBox2'  >
                        {categories2.map((category) => (
                            <li className='category-link'
                                key={category}
                                onClick={() => setCategory(category)}>
                                {category}
                            </li>

                        ))}
                    </ul>
                    <Typography className='a123'>Price - </Typography>
                    <div className='priceBox' >
                        <Slider className='slider'
                            value={price}
                            onChange={priceHandler}
                            valueLabelDisplay="on"
                            aria-labelledby="range-slider"
                            min={0}
                            max={9999}
                        /></div>
                    
                        <Typography className='a123'>Ratings Above - </Typography>
                        <div className='ratingBox' >
                            <Slider className='slider-2'
                                value={ratings}
                                onChange={(e, newRating) => {
                                    setRatings(newRating)
                                }}
                                valueLabelDisplay="on"
                                aria-labelledby="continuous-slider"
                                min={0}
                                max={5}
                            /></div>

                </div>
            </div>
            {loading ? <Loader /> : <>
                <h2 className='productsHeading'>Products</h2>

                <div className='container'>
                    {products && products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>



                {resultPerPage < count && (
                    <div className="paginationBox">
                        <Pagination
                            activePage={currentPage}
                            itemsCountPerPage={resultPerPage}
                            totalItemsCount={productsCount}
                            onChange={setCurrentPageNo}
                            nextPageText="Next"
                            prevPageText="Prev"
                            firstPageText="1st"
                            lastPageText="Last"
                            itemClass="page-item"
                            linkClass="page-link"
                            activeClass="pageItemActive"
                            activeLinkClass="pageLinkActive"
                        />
                    </div>
                )}
            </>
            }
            <Footer />
        </>
    )
}

export default Products