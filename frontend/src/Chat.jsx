import { MyContext } from "./MyContext.jsx";
import { useContext } from "react";
import "./Chat.css";
import ReactMarkdown from "react-markdown";
import rehypeHighLight from "rehype-highlight";

// importing css file to style the code snippet format in chat
import "highlight.js/styles/github-dark.css";
import Markdown from "react-markdown";

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
            <div
              className={chat.role === "user" ? "userMessage" : "gptMessage"}
            >
              <ReactMarkdown rehypePlugins={[rehypeHighLight]}>
                {chat.content}
              </ReactMarkdown>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Chat;
