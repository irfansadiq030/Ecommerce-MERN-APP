const Order = require('../Models/orderModel');

exports.newOrder = async (req, resp, next) => {
    try {
        const {
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            ShippingPrice,
            totalPrice
        } = req.body;

        const order = await Order.create({
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            ShippingPrice,
            totalPrice,
            paidAt: Date.now(),
            user: req.user._id
        })

        resp.status(201).json({
            success: true,
            message: 'Order Created',
            order
        })

    } catch (error) {
        resp.status(400).json({
            success: false,
            message: error.message
        })
    }

}

// get Single Order

exports.getSingleOrder = async (req, resp, next) => {
    const order = await Order.findById(req.params.id).populate(
        "user",
        "name email"
    )

    if (!order) {
        return resp.status(404).json({
            success: false,
            message: 'Order Not Found'
        })
    }

    return resp.status(200).json({
        success: true,
        order
    })


}

// get all Orders -- Admin
exports.getAllOrders = async (req, res, next) => {
    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach((order) => {
        totalAmount += order.totalPrice;
    });

    res.status(200).json({
        success: true,
        totalAmount,
        orders,
    });
};

// get loggend in user Orders
exports.myOrders = async (req, resp, next) => {
    const orders = await Order.find({ user: req.user._id })

    if (!orders) {
        return resp.status(404).json({
            success: false,
            message: 'Order Not Found'
        })
    }

    return resp.status(200).json({
        success: true,
        orders
    })


}

// Update Orders Status --Admin Route

exports.updateOrderStatus = async (req, resp, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        return resp.status(404).json({
            success: false,
            message: 'Order Not Found'
        })
    }

    if (order.orderStatus === 'Delivered') {
        return resp.status(400).json({
            success: false,
            message: 'Order Delivered'
        })
    }

    order.orderItems.forEach(async (order) => {
        await updateStock(order.Product, order.quantity)
    })

    order.orderStatus = req.body.status;

    if (req.body.status === 'Delivered') {
        order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });

}

// Update Stock Function

async function updateStock(id, quantity) {
    const product = await Product.findById(id)

    product.stock = product.stock - quantity;
    await product.save({ validateBeforeSave: false })

}

// Delete Orders API

exports.deleteOrder = async (req, resp, next) => {
    const order = await Order.findById(req.params.id)

    if (!order) {
        return resp.status(404).json({
            success: false,
            message: 'Order Not Found'
        })
    }

    await order.remove()

    return resp.status(200).json({
        success: true,
        order
    })


}