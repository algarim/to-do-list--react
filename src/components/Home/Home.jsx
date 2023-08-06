import { useContext } from "react"
import { ToDoContext } from "../../context/ToDoContext"
import { Link } from "react-router-dom"
import NameListPopUp from "../NameListPopUp/NameListPopUp"

// CSS
import './Home.css'

const Home = () => {
  const { lists, addList } = useContext(ToDoContext)

  return (
    <div className="todo-list-container home-container">

      {(lists === []) ? (
        <>
          <h2 className="page-title mb-2"> Bienvenido/a </h2>
          <p> Para seguir, seleccione una lista o cree una nueva. </p>
        </>)
        : (
          <h1 className="page-title mb-3">Tus listas de tareas</h1>
        )}


      <ul className="list mt-2">
        {
          lists.map(list => (
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