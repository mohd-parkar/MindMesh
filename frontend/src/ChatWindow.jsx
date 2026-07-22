import "./ChatWindow.css";
import { MyContext } from "./MyContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import {ScaleLoader , HashLoader } from 'react-spinners';

import Chat from "./Chat";

function ChatWindow() {
  const { prompt, setPrompt, reply, setReply, currThreadId ,prevChat, setPrevChat,setNewChat } =
    useContext(MyContext);

    const [loading,setLoading] = useState(false); 

  // submit button handler
  const getReply = async () => {
    setLoading(true);
    setNewChat(false);
    try {
      let res = await axios.post("http://localhost:8080/api/v1/chat", {
        message: prompt,
        threadId: currThreadId,
      });


      setReply(res.data.reply);

      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

 useEffect(() => {
  if (prompt && reply) {
    setPrevChat(prev => [
      ...prev,
      {
        role: "user",
        content: prompt,
      },
      {
        role: "assistant",
        content: reply,
      },
    ]);
  }

  setPrompt("");
}, [reply]);


  return (
    <div className="ChatWindow">
      <div className="navbar">
        <span>
          MindMesh&nbsp;<i className="fa-solid fa-chevron-down"></i>
        </span>
        <div className="userIconDiv">
          <span className="userIcon">
            <i className="fa-solid fa-user"></i>
          </span>
        </div>
      </div>

      <Chat />

       {loading ? <ScaleLoader color="#fff" /> : ""}

      <div className="chatInput">
        <div className="inputBox">
          <input
            type="text"
            placeholder="Ask anything"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e)=> e.key == 'Enter' ? getReply() : ''}
          />
          <div id="submit" onClick={getReply}>
            <i className="fa-solid fa-paper-plane"></i>
          </div>
        </div>
        <p className="info">
          * MindMesh can make mistakes. Check important info.
        </p>
      </div>
    </div>
  );
}

export default ChatWindow;
