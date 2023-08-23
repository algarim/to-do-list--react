import ToDoItem from "../ToDoItem/ToDoItem"
import { useState, useContext, useEffect } from "react";
import { ToDoContext } from "../../context/ToDoContext";
import { useNavigate, useParams } from "react-router-dom";
import DeleteListPopUp from "../DeleteListPopUp/DeleteListPopUp";
import NameListPopUp from "../NameListPopUp/NameListPopUp";
import { doc, onSnapshot } from "firebase/firestore";
import { UserAuth } from "../../context/AuthContext";
import { db } from "../../services/config";

// CSS
import './ToDoList.css'

const ToDoList = () => {

    const navigate = useNavigate();

    // Create a state for the new task we will add to the list
    const [newTask, setNewTask] = useState({ name: "", quantity: 0, pending: 0 });

    const { addToDo, changeListName, isLoading} = useContext(ToDoContext);
    const { user } = UserAuth();

    // Implement useParams to track which list we are working on
    const { idList } = useParams();

    // State for toDos of currently selected list
    const [toDos, setToDos] = useState([]);
    const [listName, setListName] = useState('');

    // useEffect to create snapshot of currently selected list
    useEffect(() => {
        setTimeout(() => {
            if (user) {
                const listRef = doc(db, "users", user.uid, "lists", idList);
                onSnapshot(listRef, (doc) => {
                    const list = doc.data();
                    setToDos(list.toDos);
                    setListName(list.name);
                })
            }
            else {
                navigate('/home');
            }
        }, 0);
    }, [user, idList])

    // COUNTER

    const [counter, setCounter] = useState(1);

    const increaseCounter = () => {
        setCounter(counter + 1);
    }

    const decreaseCounter = () => {
        if (counter > 1) {
            setCounter(counter - 1);
        }
    }


    // HANDLER FUNCTIONS

    // Counter Event Handler
    const handleCounterChange = (e) => {
        let input = Number(e.target.value);

        (input > 1) ? setCounter(input) : setCounter(1);
    }

    // Counter Focus handler: make it so it selects input text when on focus
    const handleFocus = (event) => event.target.select();

    // Function that handles the submit event: adds the new task to the list
    const handleSubmit = (e) => {
        e.preventDefault();

        let taskName = newTask.name;

        if (taskName.trim()) {
            addToDo(idList, taskName, counter);

            setNewTask({ name: "", quantity: 0, pending: 0 });
            setCounter(1);
        }
    }

    // Function that handles change event in input: changes only the name of the newTask object
    const handleInputChange = (e) => {
        let newTaskName = e.target.value;
        setNewTask({ ...newTask, name: newTaskName });
    };

    const handleNameChange = (newName) => {
        changeListName(idList, newName);
    };

    // loading animation
    if (isLoading) {
        return (
            <div className="loading-gif">
                <img src="../img/loading3.gif" alt="loading" />
            </div>
        )
    }

    return (
        <div className="todo-list-container">

            <div className="lists-item fs-5 p-2 mb-2">
                <h2 className="page-title"> {listName} </h2>
                < NameListPopUp handleNameChange={handleNameChange} previousName={listName} />
            </div>

            <form onSubmit={handleSubmit} className="add-todo-form">
                <input type="text" value={newTask.name} onChange={handleInputChange} />

                <div className="counter">
                    <button type="button" className="counter-btn" onClick={decreaseCounter}> - </button>
                    <input type="number" className="counter-input" value={counter} onChange={handleCounterChange} onFocus={handleFocus} />
                    <button type="button" className="counter-btn" onClick={increaseCounter}> + </button>
                </div>

                <button type="submit" className="add-todo-btn">Agregar</button>
            </form>

            <ul className="todo-item-list-container">
                {
                    toDos.map((toDo, index) => (
                        <ToDoItem
                            key={index}
                            idList={idList}
                            itemName={toDo.name}
                            quantity={toDo.quantity} />
                    ))
                }
            </ul>

            <DeleteListPopUp listName={listName} listId={idList} />
        </div>
    )
}

export default ToDoList