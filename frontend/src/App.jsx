import './App.css'
import ChatWindow from './ChatWindow'
import Sidebar from './Sidebar'
import { MyContext } from './MyContext'

function App() {

  const providerValues = {}// passing values

  return (
    <div className='app'>
    <MyContext.Provider values = {providerValues}>
      <Sidebar/>
      <ChatWindow/>
    </MyContext.Provider>
    </div>
  )
}

export default App
