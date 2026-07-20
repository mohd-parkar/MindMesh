import './App.css'
import ChatWindow from './ChatWindow'
import Sidebar from './Sidebar'
import { MyContext } from './MyContext'
import { useState } from 'react'
import {v1 as uuidv1} from 'uuid';

function App() {

  const [prompt,setPrompt] = useState("");
  const[reply,setReply] = useState(null);
  const[currThreadId,setCurrThreadId] = useState(uuidv1());
  const[prevChat,setPrevChat] = useState([]); // array to store the chat (user prompt + reply)
  const[newChat,setNewChat] = useState(true); // track if newchat
  const [allThreads, setAllThreads] = useState([]);
  

  const providerValues = {prompt,setPrompt,reply,setReply,currThreadId,setCurrThreadId,prevChat,setPrevChat,newChat,setNewChat,allThreads,setAllThreads};// passing values

  return (
    <div className='app'>
    <MyContext.Provider value = {providerValues}>
      <Sidebar/>
      <ChatWindow/>
    </MyContext.Provider>
    </div>
  )
}

export default App
