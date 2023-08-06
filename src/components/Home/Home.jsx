import { useContext } from "react"
import { ToDoContext } from "../../context/ToDoContext"
import { Link } from "react-router-dom"
import NameListPopUp from "../NameListPopUp/NameListPopUp"

// CSS
import './Home.css'

const Home = () => {
  const { lists, addList } = useContext(ToDoContext)

  return (
    <div className="todo-list-container">
      <h2> Bienvenido/a </h2>
      <p> Para seguir, seleccione una lista o cree una nueva. </p>

      <ul className="list">
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