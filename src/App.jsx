import ToDoList from "./components/ToDoList/ToDoList"
import NavBar from "./components/NavBar/Navbar"
import Home from "./components/Home/Home"
import { ToDoProvider } from "./context/ToDoContext"
import { BrowserRouter, Route, Routes } from "react-router-dom"

// CSS
import './App.css'

// BOOTSTRAP STYLE
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  return (
    <>
      <BrowserRouter>
        <ToDoProvider>

          <NavBar />

          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/list/:idList" element={<ToDoList/>} />
          </Routes>

        </ToDoProvider>
      </BrowserRouter>
    </>
  )
}

export default App
