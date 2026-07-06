import mongoose, { mongo, Schema } from "mongoose";

// We have two Schema - 1. Message
//                      2. Thread (a sequence of chats/messages)


const MessageSchema = new Schema({
    role : {
        type : String,
        enum : ["user", "assistant"],
        required : true
    },
    content : {
        type : String,
        required : true
    },
    timestamp : {
        type : Date,
        default : Date.now
    }
});

const ThreadSchema = new Schema({
    threadId : {
        type : String,
        required : true,
        unique : true
    },
    title : {
        type : String,
        default : "New Chat"
    },
    messages : [MessageSchema], // IMP
    createdAt : {
        type : Date,
        default : Date.now
    },
    updatedAt : {
        type : Date,
        default : Date.now
    }
});

export default mongoose.model("Thread", ThreadSchema);