import ToDoItem from "../ToDoItem/ToDoItem"
import { useState, useContext } from "react";
import { ToDoContext } from "../../context/ToDoContext";
import { Navigate, useParams } from "react-router-dom";
import DeleteListPopUp from "../DeleteListPopUp/DeleteListPopUp";
import NameListPopUp from "../NameListPopUp/NameListPopUp";

// CSS
import './ToDoList.css'

const ToDoList = () => {

    // Create a state for the new task we will add to the list
    const [newTask, setNewTask] = useState({ name: "", quantity: 0, pending: 0 });

    const { lists, addToDo, changeListName } = useContext(ToDoContext);

    // Implement useParams to track which list we are working on
    const { idList } = useParams();

    // Define a variable for the toDos of the selected list
    let selectedList = lists.find(list => list.id === idList);
    let toDos = selectedList.toDos;

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

    return (
        <div className="todo-list-container">

            <div className="lists-item fs-5 p-2 mb-2">
                <h2 className="page-title"> {selectedList.name} </h2>
                < NameListPopUp handleNameChange={handleNameChange} previousName={selectedList.name} />
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

            <DeleteListPopUp list={selectedList} />
        </div>
    )
}

export default ToDoList