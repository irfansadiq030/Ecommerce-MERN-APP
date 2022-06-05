import React from "react";
import { Link } from "react-router-dom";
import ReactStars from 'react-rating-stars-component'
// import { Rating } from "@material-ui/lab";

const ProductCard = ({ product }) => {
    //   const options = {
    //     value: product.ratings,
    //     readOnly: true,
    //     precision: 0.5,
    //   };
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        value: product.rating
    }
    return (
        <Link className="productCard" to='/'>
            <img src={product.images[0].url} alt="" />
            <p>{product.name}</p>
            <div>
                <ReactStars {...options} />
                {" "}
                <span className="productCardSpan">
                    {" "}
                    ({product.numOfReviews} Reviews)
                </span>
            </div>
            <span>{`Rs : ${product.price}`}</span>
        </Link>
    );
};

export default ProductCard;