const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database')

// Config
dotenv.config({path:'Backend/config/config.env'});

// Connecting to Database
connectDatabase();

app.listen(process.env.PORT,()=>console.log(`Server is Running on http:://localhost:${process.env.PORT}`))