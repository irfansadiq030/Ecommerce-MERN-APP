const mongoose = require('mongoose');

const productScheme = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter Product Name"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Please enter Product Description"]
    },
    price: {
        type: Number,
        required: [true, "Please enter Product Price"],
        maxlength: [8, "Price cannot exceed 8 Characters"]

    },
    rating: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        },
    ],
    category: {
        type: String,
        required: [true, "Please enter Product Category"]

    },
    stock: {
        type: Number,
        required: [true, "Please enter Product Stock"],
        maxlength: [4, "Stock cannot exceed 4 Characters"],
        default: 1,

    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true
            },
            name: {
                type: String,
                required: [true, "Please enter User Name"]
            },
            rating: {
                type: Number,
                required: [true, "Please enter Ratings"]
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    userID: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model("Product", productScheme);