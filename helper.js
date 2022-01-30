import bcrypt  from "bcrypt";
import { ObjectId } from "mongodb";
import { client } from "./index.js";


 async function updateTicketById(id, data) {
    return await client
        .db("b28wd")
        .collection("capstone")
        .updateOne({id:id}, { $set: data });
}
 async function createTickets(data) {
    return await client.db("b28wd").collection("capstone").insertMany(data);
}
async function createUser(data) {
    return await client.db("b28wd").collection("capstone_users").insertOne(data);
}

 async function getTickets() {
    return await client
        .db("b28wd")
        .collection("capstone")
        .find({})
        .toArray();
}
 async function deleteTicketById(id) {
    return await client
        .db("b28wd")
        .collection("capstone")
        .deleteOne({ id: id});
}//_id: ObjectId(id) id:id
 async function getTicketById(id) {
     console.log("***",id);
    return await client
        .db("b28wd")
        .collection("capstone")
        .findOne({ id: id});
}
async function getUserByName(username) {
    
   return await client
       .db("b28wd")
       .collection("capstone_users")
       .findOne({ username:username});
}
async function genPassword(password){
    const NO_OF_ROUNDS=10;
    const salt= await bcrypt.genSalt(NO_OF_ROUNDS);
    console.log(salt);
    const hashedPassword= await bcrypt.hash(password,salt);
    console.log(hashedPassword);
    return hashedPassword;
}
export { getTickets, 
    createTickets, 
    getTicketById, 
    deleteTicketById, 
    updateTicketById ,
    genPassword,
    createUser,
    getUserByName
}