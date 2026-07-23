import "./Sidebar.css";
import { useContext, useEffect } from "react";
import { MyContext } from "./MyContext";
import { v1 as uuidv1 } from "uuid";
import logo from "./assets/ai-brain.png";

function Sidebar() {
    const {
        allThreads,
        setAllThreads,
        currThreadId,
        setNewChat,
        setPrompt,
        setReply,
        setCurrThreadId,
        setPrevChat,
    } = useContext(MyContext);

    const getAllThreads = async () => {
        try {
            const response = await fetch("https://mindmesh-backend-5z3m.onrender.com/api/v1/thread");
            const res = await response.json();

            const filteredData = res.map((thread) => ({
                threadId: thread.threadId,
                title: thread.title,
            }));

            setAllThreads(filteredData);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getAllThreads();
    }, [currThreadId]);

    const createNewChat = () => {
        setNewChat(true);
        setPrompt("");
        setReply(null);
        setCurrThreadId(uuidv1());
        setPrevChat([]);
    };

    const changeThread = async (newThreadId) => {
        try {
            setCurrThreadId(newThreadId);

            const response = await fetch(
                `https://mindmesh-backend-5z3m.onrender.com/api/v1/thread/${newThreadId}`
            );

            const res = await response.json();

            setPrevChat(res.messages);
            setNewChat(false);
            setReply(null);
        } catch (err) {
            console.log(err);
        }
    };

    const deleteThread = async (threadId) => {
        try {
            const response = await fetch(
                `https://mindmesh-backend-5z3m.onrender.com/thread/api/v1/${threadId}`,
                {
                    method: "DELETE",
                }
            );

            await response.json();

            setAllThreads((prev) =>
                prev.filter((thread) => thread.threadId !== threadId)
            );

            if (threadId === currThreadId) {
                createNewChat();
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <section className="sidebar">
            <button onClick={createNewChat}>
                <img
                    src={logo}
                    alt="gpt logo"
                    className="logo"
                />
                <span>
                    <i className="fa-solid fa-pen-to-square"></i>
                </span>
            </button>

           

            <ul className="history">
                 <h4>Recents</h4>
                {allThreads?.map((thread) => (
                    <li
                        key={thread.threadId}
                        onClick={() => changeThread(thread.threadId)}
                        className={
                            thread.threadId === currThreadId
                                ? "highlighted"
                                : ""
                        }
                    >
                        <span>{thread.title}</span>
                    </li>
                ))}
            </ul>

            <div className="sign">
                <p>By Mohd Parkar</p>
            </div>
        </section>
    );
}

export default Sidebar;