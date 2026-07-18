import "./Chat.css";
import React, { useContext, useState, useEffect } from "react";
import { MyContext } from "./MyContext";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

function Chat() {
    const { newChat, prevChat = [], reply } = useContext(MyContext);

    const [latestReply, setLatestReply] = useState(null);

    useEffect(() => {
        if (reply === null) {
            setLatestReply(null);
            return;
        }

        if (prevChat.length === 0) return;

        const words = reply.split(" ");

        let index = 0;

        const interval = setInterval(() => {
            setLatestReply(words.slice(0, index + 1).join(" "));
            index++;

            if (index >= words.length) {
                clearInterval(interval);
            }
        }, 40);

        return () => clearInterval(interval);
    }, [reply, prevChat]);

    return (
        <>
            {newChat && <h1>Start a New Chat!</h1>}

            <div className="chats">

                {prevChat.slice(0, -1).map((chat, index) => (
                    <div
                        key={index}
                        className={chat.role === "user" ? "userDiv" : "gptDiv"}
                    >
                        {chat.role === "user" ? (
                            <p className="userMessage">{chat.content}</p>
                        ) : (
                            <div className="gptMessage">
                                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                                    {chat.content}
                                </ReactMarkdown>
                            </div>
                        )}
                    </div>
                ))}

                {prevChat.length > 0 && (
                    <div
                        className={
                            prevChat[prevChat.length - 1].role === "user"
                                ? "userDiv"
                                : "gptDiv"
                        }
                    >
                        {prevChat[prevChat.length - 1].role === "user" ? (
                            <p className="userMessage">
                                {prevChat[prevChat.length - 1].content}
                            </p>
                        ) : (
                            <div className="gptMessage">
                                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                                    {latestReply === null
                                        ? prevChat[prevChat.length - 1].content
                                        : latestReply}
                                </ReactMarkdown>
                            </div>
                        )}
                    </div>
                )}

            </div>
        </>
    );
}

export default Chat;