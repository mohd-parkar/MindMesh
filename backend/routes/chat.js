import express from "express";
import ThreadModel from "../model/model.js";
import getOpenAIAPIResponse from "../utils/openai.js";

const router = express.Router();

// test route to create a thread in db
router.post("/test",async(req,res)=>{

    let {threadId , title} = req.body;

    try{
        const newThread = await new ThreadModel({
            threadId : threadId,
            title : title
        });

        let result = await newThread.save();
        res.json(result);
    }catch(error){
        console.error(error);
        res.status(500).json({message : "Error while posting the thread"});
    }
});


// get all thread route
router.get("/thread", async(req,res)=>{
    try{
        const threads = await ThreadModel.find({}).sort({updatedAt : -1});
        // getting all threads but in recent order
    
        res.json(threads);
    }catch(error){
        console.error(error);
        res.status(500).json({message : "Error occured during fetching the threads"});
    }
});

// get particular thread
router.get("/thread/:threadId",async(req,res)=>{
    const threadId = req.params.threadId;

    try{
       const thread = await ThreadModel.findOne({threadId}); // the thread id field, not the actual Object id 
       
       if(!thread){
            return res.status(404).json({message : "Thread not found"});
       };

       res.json(thread);
    }catch(error){
        console.error(error);
        res.status(500).json({message : "Error occured during fetching the thread"});
    };
});

// delete the particular thread 
router.delete("/thread/:threadId", async(req,res)=>{
    const threadId = req.params.threadId;

    try{
        const deletedThread = await ThreadModel.findOneAndDelete({threadId});

        if(!deletedThread){
            return res.status(404).json({message : "Thread not found"});
        };

        res.status(200).json({message : "Thread deleted successfully"});
    }catch(error){
        console.error(error);
        res.status(500).json({message : "Error occured during deletion of thread"});
    };
});


// main route that saves the data in thread 
router.post("/chat", async(req,res)=>{
    const {threadId , message} = req.body;

    // validation
    if(!threadId || !message){
        return res.status(400).json({message : "not found"});
    };

    try{
        // now check if thread exists (old thread to append the data) or to create new threat to store the data into 
        let thread = await ThreadModel.findOne({threadId});

        if(!thread){ // new thread to create for storing the user message
            thread = new ThreadModel({
                threadId : threadId,
                title : message,
                messages : [{
                    role : "user",
                    content : message // here we store what user gave
                }]
            });
        }else{
            // old chat  - we just push in it
            thread.messages.push({
                role : "user",
                content : message
            });
        }

        // either way if thread is new or already existed , now we are saving the data from user in it 

        // now we store the api reply in the thread 
        const assistantReply = await getOpenAIAPIResponse(message);

        thread.messages.push({
            role : "assistant",
            content : assistantReply
        });

        thread.updatedAt = new Date();

        await thread.save();

        res.json({reply : assistantReply});
    }catch(error){
        console.error(error);
        res.status(500).json({message : "Error occured during storing the data in the thread"});
    }
})

export default router;

// CHECKING IF DB IS CONNECTED AND WORKING WHEN DATA IS POSTED 

