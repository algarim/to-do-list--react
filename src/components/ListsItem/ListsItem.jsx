import { Nav } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { useContext } from "react"
import { ToDoContext } from "../../context/ToDoContext"

// CSS
import './ListsItem.css'
import NameListPopUp from "../NameListPopUp/NameListPopUp"

const ListsItem = ({ list }) => {
    const { changeListName } = useContext(ToDoContext);

    const handleNameChange = (newName) => {
        changeListName(list.id, newName);
    }

    return (
        <div className="lists-item p-2">
            <Nav.Link as={NavLink} to={`/list/${list.id}`} className="p-0" >
                {list.name}
            </Nav.Link >
            < NameListPopUp handleNameChange={handleNameChange} />
        </div>
    )
}

export default ListsItem