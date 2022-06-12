import React, { useEffect } from 'react'
import "./Home.css";
import ProductCard from "./ProductCard.js";
// import { CgMouse } from "react-icons/all";
import { MetaData } from '../layouts/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../actions/productAction';
import Loader from '../Loader/Loader';


const Home = () => {
    const { loading, error, products, productsCount } = useSelector((state) => state.products)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProduct())
    }, [dispatch])

    return (

        <>
            {
                (loading) ? <Loader /> :
                    <>
                        <MetaData title="ECOMMERCE" />

                        <div className="banner">
                            <p>Welcome to Ecommerce</p>
                            <h1>FIND AMAZING PRODUCTS BELOW</h1>

                            <a href="#container">
                                <button>
                                    {/* Scroll <CgMouse /> */}
                                    Shop Now
                                </button>
                            </a>
                        </div>

                        <h2 className="homeHeading">Featured Products</h2>

                        <div className="container" id="container">
                            {
                                products && products.map(product => (
                                    <ProductCard product={product} />
                                ))
                            }

                        </div>
                    </>
            }
        </>
    )
}

export default Home