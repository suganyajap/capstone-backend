import express from "express";
const router=express.Router();
import { getTickets, 
    createTickets, 
    getTicketById, 
    deleteTicketById, 
    updateTicketById } from '../helper.js';
//import { auth } from "../middleware/auth.js";

router
.route("/")
.get( async (request,response)=>
{
    
    const ticket=  await getTickets();//cursor to array
     response.send(ticket);
})
.post(async(request,response)=>{
    const data =request.body;
    const  result = await createTickets(data);
    response.send(result);
});
router.route("/:id")
.get(async (request,response)=>
{
    console.log(request.params);
    const { id } = request.params;
    const ticket = await getTicketById(id);
    console.log(ticket);
  ticket ? response.send(ticket) : response.status(404).send({message:"No matching ticket found"});

})
.delete(async (request,response)=>
{
    console.log(request.params);
    const { id } = request.params;
    //db.tickets.deleteOne({id:"102"})
    const result = await deleteTicketById(id);
   
    console.log(result);
  result.deletedCount > 0 
  ? response.send(result) 
  : response.status(404).send({message:"No matching ticket found"});

})
.put(async (request,response)=>
{
    console.log(request.params);
    const { id } = request.params;
    const data=request.body;
    const result = await updateTicketById(id, data);
    const ticket = await getTicketById(id);
    response.send(ticket);

});
export const ticketsRouter=router;