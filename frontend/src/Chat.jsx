import { MyContext } from "./MyContext.jsx";
import { useContext } from "react";
import "./Chat.css";

function Chat() {
  const { newChat, prevChat } = useContext(MyContext);

  return (
    <>
      {newChat && <h1> What's on your mind today ?</h1>}
      <div className="chats">
        {prevChat?.map((chat, idx) => (
          <div
            className={chat.role === "user" ? "userDiv" : "gptDiv"}
            key={idx}
          >
            <p className={chat.role === "user" ? "userMessage" : "gptMessage"}>
              {chat.content}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Chat;
