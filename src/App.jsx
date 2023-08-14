import ToDoList from "./components/ToDoList/ToDoList"
import NavBar from "./components/NavBar/NavBar"
import Home from "./components/Home/Home"
import { ToDoProvider } from "./context/ToDoContext"
import { BrowserRouter, Route, Routes, Link } from "react-router-dom"
import { AuthContextProvider } from "./context/AuthContext"
import SignIn from "./components/SignIn/SignIn"

// CSS
import './App.css'

// BOOTSTRAP STYLE
import 'bootstrap/dist/css/bootstrap.min.css'


const App = () => {
  return (
    <>
      <BrowserRouter>

        <AuthContextProvider>

          <ToDoProvider>

            <NavBar />

            <Routes>
            <Route path="/" element={<SignIn />} />
              <Route path="/home" element={<Home />} />
              <Route path="/list/:idList" element={<ToDoList />} />
              <Route path="/*" element={
                <div className="todo-list-container">
                  <h3> La página que busca no existe </h3>
                </div>
              } />
            </Routes>

          </ToDoProvider>

        </AuthContextProvider>
      </BrowserRouter>
    </>
  )
}

export default App
