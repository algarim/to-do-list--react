import ToDoItem from "../ToDoItem/ToDoItem"
import { useState, useContext } from "react";
import { ToDoContext } from "../../context/ToDoContext";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

// CSS
import './ToDoList.css'

const ToDoList = () => {

    // Create a state for the new task we will add to the list
    const [newTask, setNewTask] = useState({ name: "", quantity: 0, pending: 0 });

    const { lists, addToDo, deleteList } = useContext(ToDoContext);

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
    }

    // Delete list handler
    /// COMPLETAR

    return (
        <div className="todo-list-container">
            <h1> Lista de tareas </h1>

            <h2> {selectedList.name} </h2>

            <form onSubmit={handleSubmit} className="add-todo-form">
                <input type="text" value={newTask.name} onChange={handleInputChange} />

                <div className="counter">
                    <button type="button" className="counter-btn" onClick={decreaseCounter}> - </button>
                    <input type="number" className="counter-input" value={counter} onChange={handleCounterChange} />
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

            <button onClick={handleDelete}> Borrar lista </button>
        </div>
    )
}

export default ToDoList