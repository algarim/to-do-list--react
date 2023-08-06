import { Nav } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { useContext } from "react"
import { ToDoContext } from "../../context/ToDoContext"
import NameListPopUp from "../NameListPopUp/NameListPopUp"
import DeleteListPopUp from "../DeleteListPopUp/DeleteListPopUp"

// CSS
import './ListsItem.css'

const ListsItem = ({ list }) => {
    const { changeListName } = useContext(ToDoContext);

    const handleNameChange = (newName) => {
        changeListName(list.id, newName);
    }

    return (
        <div className="lists-item py-2 px-1">
            <Nav.Link as={NavLink} to={`/list/${list.id}`} className="p-0" >
                {list.name}
            </Nav.Link >
            < NameListPopUp handleNameChange={handleNameChange} hideLg={true} previousName={list.name} />
            < DeleteListPopUp list = {list} withIconBtn={true} />
        </div>
    )
}

export default ListsItem