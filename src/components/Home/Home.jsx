import { useContext, useEffect } from "react"
import { ToDoContext } from "../../context/ToDoContext"
import { Link, useNavigate } from "react-router-dom"
import NameListPopUp from "../NameListPopUp/NameListPopUp"
import { UserAuth } from "../../context/AuthContext"

// CSS
import './Home.css'

const Home = () => {
  const { listsNames, isLoading, addList } = useContext(ToDoContext);
  const { user } = UserAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate('/');
    }
  }, [user])

  // loading animation
  if(isLoading) {
    return (
      <div className="loading-gif">
        <img src="../img/loading3.gif" alt="loading" />
      </div>
    )
  }

  return (
    <div className="todo-list-container home-container">

      {(listsNames.length === 0) ? (
        <>
          <h2 className="page-title mb-2"> Bienvenido/a </h2>
          <p className="m-0"> Para empezar, creá una nueva lista. </p>
        </>)
        : (
          <h1 className="page-title mb-3">Listas</h1>
        )}


      <ul className="list mt-2">
        {
          listsNames.map( (list) => (
            <li key={list.id}>
              <Link to={`/list/${list.id}`}> {list.name} </Link>
            </li>
          ))
        }
      </ul>

      <NameListPopUp handleNameChange={addList} buttonDescription={"Crear nueva lista"} isNewList={true} />

    </div>
  )
}

export default Home