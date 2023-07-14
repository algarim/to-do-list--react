import ToDoList from "./components/ToDoList/ToDoList"
import { ToDoProvider } from "./context/ToDoContext"

// CSS
import './App.css'


const App = () => {
  return (
    <>
      <ToDoProvider>
        <ToDoList />
      </ToDoProvider>
    </>
  )
}

export default App
