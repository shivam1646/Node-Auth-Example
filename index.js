const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv'); // loads environment variables from a .env file and assigns it to process.env
const app = express();

// import routes
const authRoute = require('./routes/auth');
const privateRoute = require('./routes/privateRoute');

dotenv.config();

// connect to database
mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true}, () => {
    console.log('connected to database');
});

//Middlewares
app.use(express.json()); // parses incoming requests with JSON payloads.
app.use('/api/user', authRoute); // use authRoute middleware for reqs. of type /api/user/*
app.use('/private', privateRoute);


app.listen(3000,() => console.log('Server up and running'));