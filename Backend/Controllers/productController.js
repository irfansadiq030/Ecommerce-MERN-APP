const { findByIdAndUpdate } = require('../Models/productModel');
const Product = require('../Models/productModel');
const ApiFeatures = require('../utils/apifeatures');

/***************  Create Product API -- Admin Route  ***************/

exports.createProduct = async (req, resp, next) => {
    try {
        req.body.userID = req.user.id
        const product = await Product.create(req.body);
        resp.status(201).json({
            success: true,
            product
        })
    } catch (error) {
        console.log(error.message)
    }

}


/***************  View All Products API -- General Route  ***************/

exports.getAllProducts = async (req, resp) => {
    const resultPerPage = 5;
    // count Products
    const productCount = await Product.countDocuments();
    const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage);
    const products = await apiFeature.query;
    resp.status(200).json({
        success: true,
        products,
        productCount
    })
}

/***************  Update Products API -- Admin Route  ***************/

exports.updateProduct = async (req, resp, next) => {
    let product = await Product.findById(req.params.id);

    // if product not found then this response will be sent
    if (!product) {
        return resp.status(500).json({
            success: false,
            message: "Product Not Found"
        })
    }

    // if product find then lets update the product
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    resp.status(200).json({
        success: true,
        product
    })
}

/***************  Delete Products API -- Admin Route  ***************/

exports.deleteProduct = async (req, resp, next) => {
    let product = await Product.findById(req.params.id);

    // if product not found then this response will be sent
    if (!product) {
        return resp.status(500).json({
            success: false,
            message: "Product Not Found"
        })
    }

    // if product find then let's Delete the product


    // 1st Method to remove the product

    // product = await Product.findByIdAndDelete(req.params.id)
    // resp.status(200).json({
    //     success: true,
    //     message:"Product Deleted Successfully"
    // })

    // 2nd Method to remove the product

    await product.remove(req.params.id);
    resp.status(200).json({
        success: true,
        message: "Product Deleted Successfully"
    })
}

/***************  Get Single Product Details API -- General Route  ***************/

exports.getProductDetails = async (req, resp, next) => {
    let product = await Product.findById(req.params.id);

    // if product not found then this response will be sent
    if (!product) {
        return resp.status(500).json({
            success: false,
            message: "Product Not Found"
        })
    }

    resp.status(200).json({
        success: true,
        product
    })

}

// Create a new Review or Update existing review

exports.createProductReview = async (req, resp, next) => {
    const { rating, comment, productID } = req.body;

    const review = {
        user: req.user.id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    };

    const product = await Product.findById(productID);

    const isReviewed = product.reviews.find((rev) => rev.user.toString() === req.user._id.toString())

    if (isReviewed) {
        product.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user._id.toString())
                (rev.rating = rating), (rev.comment = comment);
        });
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    let avg = 0;

    product.reviews.forEach((rev) => {
        avg += rev.rating;
    });

    product.rating = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    resp.status(200).json({
        success: true
    })

}

// Get All Reviews of a product
exports.getProductReviews = async (req, resp, next) => {
    try {

        if (req.query.id.match(/^[0-9a-fA-F]{24}$/)) {

            const product = await Product.findById(req.query.id);
            resp.status(200).json({
                success: true,
                reviews: product.reviews,
            });
        }
        else {
            return resp.status(404).json({
                success: false,
                message: 'Product Not Found',
            });
        }


        // if(!product) {
        //     return resp.status(404).json({
        //         success: false,
        //         message: 'Product Not Found',
        //     });
        // }

        // resp.status(200).json({
        //     success: true,
        //     reviews: product.reviews,
        // });

    } catch (error) {
        resp.status(400).json({
            success: false,
            message: error.message,
        });
    }

};

// Delete Review API

exports.deleteReview = async (req, resp, next) => {
    const product = await Product.findById(req.query.productId);

    if (!product) {
        return resp.status(404).json({
            success: false,
            message: 'Product Not Found'
        })
    }

    const reviews = product.reviews.filter((rev) => rev._id.toString() !== req.query.id.toString());

    let avg = 0;

    reviews.forEach((rev) => {
        avg += rev.rating;
    });

    const ratings = avg / reviews.length;

    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    resp.status(200).json({
        success: true,
        message: 'Review Deleted'
    })
}

