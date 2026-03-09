import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import route from './routing/Routing.js';
dotenv.config();

const app=express();

app.listen(process.env.PORT,()=>
{
    console.log(`server running sucessfully on port number ${process.env.PORT}`);
});
mongoose.connect(process.env.MONGO_URI).then(()=>
{
    console.log(`mongoose connected scuesfully`);
}).catch((err)=>{
    console.log(`mongoose connection failed: ${err}`);
});
app.use(cors());
app.use(express.json());
app.use("/api",route);


