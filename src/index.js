//require('dotenv').config({path: './env'})
//import mongoose from "mongoose";
//import {DB_NAME} from "./constants";

import dotenv from "dotenv"; 
import connectDB from "./db/index.js";
import {app} from './app.js';
dotenv.config({
    path: './env'
})

// import express from "express";
// const app = express();
// function connectDb(){

// }



/*
(async ()=>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        app.on("error",(error)=>{
            console.log("Error:",error);
            throw error
        })
        app.listen(process.env.PORT,()=>{
            console.log(`app is listening on port ${process.env.PORT}`)
        })
    }
    catch(error){
        console.log("ERROR: ",error);
        throw error
    }
})()
*/


connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000 ,() =>{
        console.log(`Server is running at port: ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("mongodb connection failed !!!",err);
})