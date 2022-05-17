const { findByIdAndUpdate } = require('../Models/productModel');
const Product = require('../Models/productModel');
const ApiFeatures = require('../utils/apifeatures');

/***************  Create Product API -- Admin Route  ***************/

exports.createProduct = async (req, resp, next) => {
    try {
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

