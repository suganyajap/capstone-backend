//const express=require('express');//"type":"commonjs"
import express from "express";//"type":"module"
import { MongoClient } from "mongodb";
import dotenv from 'dotenv';
import { ticketsRouter } from "./routes/ticket.js";
import { usersRouter } from "./routes/users.js";
import cors from "cors";

dotenv.config();//it will put all the key and value pair inside the process.env
console.log(process.env);
const app=express();
const PORT=process.env.PORT;
app.use(cors());//3rd party middleware,every request in the app is allowed access/access by any origin/any where
//middleware
app.use(express.json());//every request in the app body is parsed to json
//express.json()-inbuilt middleware


const MONGO_URL=process.env.MONGO_URL;
async function  createConnection(){
    const client=new MongoClient(MONGO_URL);
    await client.connect();//promise
    console.log("Mongo db Connected");
    return client;
}
export const client=await createConnection();
app.get('/',(request,response)=>
{
    response.send("Hello ***🌍😊");
});

app.use("/tickets",ticketsRouter);
app.use("/users",usersRouter);

  
app.listen(PORT,()=>console.log("App is started in ",PORT));


