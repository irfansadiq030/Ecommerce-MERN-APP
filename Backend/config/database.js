const mongoose = require("mongoose");

const connectDatabase = async () => {
    try {
        await mongoose.connect(
            process.env.DB_URI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        console.log(`DB connected successFully`);
    }
    catch (error) {
        console.log(error.message);
    }
};

module.exports = connectDatabase