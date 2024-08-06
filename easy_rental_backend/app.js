const express = require('express');
const app =express();

const connectDB = require('./src/config/db')

const carRoute = require('./src/routes/carRoute');
const feedbackRoute = require('./src/routes/feedbackRoute');
const paymentRoute = require('./src/routes/paymentRoute');
const rentalRoute = require('./src/routes/rentalRoute');
const userRoute = require('./src/routes/userRoute')
const profileRoute = require('./src/routes/userProfileRoute')

app.use(express.json());
const port = 5000;
//used to connect to the database
connectDB();


app.use('/api/user', userRoute)
// app.use('/api/auth', authRoute)
app.use('/api/car', carRoute);
app.use('/api/feedback', feedbackRoute);
app.use('/api/payment', paymentRoute);
app.use('/api/rental', rentalRoute);
app.use('/api/profile', profileRoute);

// const mongoose = require('mongoose');

// mongoose.connect('mongodb://127.0.0.1:27017/test')
//   .then(() => console.log('Connected!'));

app.listen(port,()=>{
    console.log(`Server is running on ${port}`)
})