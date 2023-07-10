import ToDoItem from "../ToDoItem/ToDoItem"
import { useState, useEffect } from "react"

// CSS
import './ToDoList.css'

const ToDoList = () => {
    const [newTask, setNewTask] = useState({ name: "", quantity: 0, addedQuantity: 0, pending: 0 });

    // addedQuantity tracks the quantity added to an already existing task

    const [toDos, setToDos] = useState(() => {
        const savedToDos = localStorage.getItem("ToDos");

        const startingToDos = savedToDos ? JSON.parse(savedToDos) : [];

        return startingToDos;
    });

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

    // AUXILIARY FUNCTIONS: delete and add toDo (joining repeats together)

    const deleteToDo = (taskName) => {
        const newToDos = toDos.filter((toDo) => toDo.name !== taskName);
        setToDos(newToDos);
    }

    const addToDo = (task, quantity) => {
        const existingToDo = toDos.find(toDo => toDo.name === task);

        if (existingToDo) {
            const updatedToDos = toDos.map( toDo => {
                if (toDo === existingToDo){
                    return {...existingToDo, quantity: existingToDo.quantity + quantity, pending: existingToDo.pending + quantity, addedQuantity: quantity};
                }
                else{
                    return toDo;
                }
            } )

            setToDos(updatedToDos);
        } 
        
        else {
            const newToDo = {
                name: task,
                quantity: quantity,
                addedQuantity: 0,
                pending: quantity
            }
            setToDos([...toDos, newToDo]);
        }

        setCounter(1);
    }


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
            addToDo(taskName, counter);
            setNewTask({ name: "", quantity: 0, addedQuantity: 0, pending: 0 });
        }
    }

    // Function that handles change event in input: changes only the name of the newTask object
    const handleInputChange = (e) => {
        let newTaskName = e.target.value;
        setNewTask({ ...newTask, name: newTaskName });
    }


    // Save the list in localStorage every time it changes
    useEffect(() => {
        localStorage.setItem("ToDos", JSON.stringify(toDos));
    }, [toDos])


    return (
        <div className="todo-list-container">
            <h1> Lista de tareas </h1>

            <form onSubmit={handleSubmit} className="add-todo-form">
                <input type="text" value={newTask.name} onChange={handleInputChange} />

                <div className="counter">
                    <button type="button" className="counter-btn" onClick={decreaseCounter}> - </button>
                    <input type="number" className="counter-input" value={counter} onChange={handleCounterChange} />
                    <button type="button" className="counter-btn" onClick={increaseCounter}> + </button>
                </div>

                <button type="submit" className="add-todo-btn">Agregar</button>
            </form>

            <ul>
                {
                    toDos.map((toDo, index) => (
                        <ToDoItem
                            key={index}
                            name={toDo.name}
                            quantity={toDo.quantity}
                            addedQuantity={toDo.addedQuantity}
                            deleteToDo={deleteToDo} />
                    ))
                }
            </ul>
        </div>
    )
}

export default ToDoList