const express = require('express');
const colors = require('colors');
const app = express();
const connectDB = require('./db');
const validator = require('validator');
const errorHandler = require('./middleware/errorHandle');
const cors = require('cors');

app.use(cors());
const PORT =3000;
app.use(express.json());

connectDB();

app.use(`/api`,require('./Router/UserRouter'));

app.use((req,res,next)=>{
    res.status(404).send(`request url ${req.url} not found`);
       next() 
    })
//Global error
app.use(errorHandler);

// app.use((err,req,res,next)=>{
//     res.status(statuscode).json({
//         message:err
//     })
// })

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`.yellow.bold);
})