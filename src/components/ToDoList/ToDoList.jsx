import ToDoItem from "../ToDoItem/ToDoItem"
import { useState, useEffect } from "react"

const ToDoList = () => {
    const [newTask, setNewTask] = useState("");

    const [toDos, setToDos] = useState(() => {
        const savedToDos = localStorage.getItem("ToDos");

        const startingToDos = savedToDos ? JSON.parse(savedToDos) : [];

        return startingToDos;
    });


    // AUXILIARY FUNCTIONS: delete and add toDo

    const deleteToDo = (toDoToDelete) => {
        const newToDos = toDos.filter((toDo) => toDo !== toDoToDelete);
        setToDos(newToDos);
    }

    const addToDo = (toDo) => {
        setToDos([...toDos, toDo]);
    }

    // Function that handles the submit event: adds the new task to the list
    const handleSubmit = (e) => {
        e.preventDefault();

        if (newTask.trim()) {
            addToDo(newTask)
            setNewTask("");
        }
    }

    // Save the list in localStorage every time it changes
    useEffect(() => {
        localStorage.setItem("ToDos", JSON.stringify(toDos));
    }, [toDos])


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={newTask} placeholder="Ingrese una tarea" onChange={(e) => setNewTask(e.target.value)} />
                <button type="submit">Agregar tarea</button>
            </form>

            <ul>
                {
                    toDos.map((toDo, index) => (
                        <ToDoItem
                            key={index}
                            toDo={toDo}
                            deleteToDo={deleteToDo} />
                    ))
                }
            </ul>
        </div>
    )
}

export default ToDoList