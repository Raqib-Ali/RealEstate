import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRotes from './routes/user.route.js'
import authRoutes from "./routes/auth.route.js";
import listingRoutes from './routes/listing.route.js'
import cors from 'cors'
import cookieParser from "cookie-parser";


dotenv.config();  

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Connected to Mongo!")
}).catch(err => {
    console.log(err)
});

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/user' , userRotes);
app.use('/api/listing', listingRoutes);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});

app.listen(3000, ()=>{
    console.log("Server is listening on port 3000!");
})