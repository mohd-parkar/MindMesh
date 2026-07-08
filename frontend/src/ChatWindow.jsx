import "./ChatWindow.css";
import { MyContext } from "./MyContext";
import { useContext } from "react";
import axios from "axios";

import Chat from "./Chat";

function ChatWindow() {
  const { prompt, setPrompt, reply, setReply, currThreadId } =
    useContext(MyContext);

  // submit button handler
  const getReply = async () => {
    try {
      let res = await axios.post("http://localhost:8080/api/v1/chat", {
        message: prompt,
        threadId: currThreadId,
      });

      console.log(res.data); // we got reply to our user typed input

      setReply(res.data);
    } catch (err) {
      console.error(err);
    }
  };

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
