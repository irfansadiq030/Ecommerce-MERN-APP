import React, { useEffect } from 'react'
// import { MetaData } from '../layouts/MetaData'
// import Carousel from 'react-material-ui-carousel'
import './ProductDetails.css'
import { useSelector, useDispatch } from 'react-redux'
import { getProductDetails } from '../../actions/productAction'
import { useParams } from 'react-router-dom'


const ProductDetails = () => {

    const { loading, product } = useSelector((state) => state.productDetails)

    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {

        dispatch(getProductDetails(id))

    }, [dispatch, id])

    return (
        <>
            <div className="productContainer">
                <div className="productImg">
                    <img src="https://picsum.photos/700/700?img=56" alt="" />
                </div>
                <div className="productDetails">
                    <h3>{product && product.name}</h3>
                    <p>Price : Rs: {product.price}</p>
                    <p>Reviews : {product.numOfReviews}</p>
                    <p>{product.description}</p>
                    <div className="quantityContainer">
                        <button type='button'>-</button>
                        <input value="1" type="text" />
                        <button>+</button>
                    </div>
                    <button id="addToCart">Add to Cart</button>
                    <p>Status : <span className={product.Stock > 0 ? 'redColor' : 'greenColor'}>{product.Stock < 1 ? 'Out of Stock' : 'In-Stock'}</span></p>
                </div>
            </div>
        </>
    )
}

export default ProductDetails