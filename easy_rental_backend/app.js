const express = require('express');
const app =express();

const connectDB = require('./src/config/db')
app.use(express.json());
const port = 5000;
//used to connect to the database
connectDB();

// const mongoose = require('mongoose');

// mongoose.connect('mongodb://127.0.0.1:27017/test')
//   .then(() => console.log('Connected!'));

app.listen(port,()=>{
    console.log(`Server is running on ${port}`)
})