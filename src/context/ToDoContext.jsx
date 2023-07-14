import { useState, useEffect, createContext } from "react";

export const ToDoContext = createContext([]);

export const ToDoProvider = ({ children }) => {
    // STATES

    // to-do list
    const [toDos, setToDos] = useState(() => {
        const savedToDos = localStorage.getItem("toDos");

        const startingToDos = savedToDos ? JSON.parse(savedToDos) : [];

        return startingToDos;
    });

    // Save the list in localStorage every time it changes
    useEffect(() => {
        localStorage.setItem('toDos', JSON.stringify(toDos))
    }, [toDos])

    // METHODS: 

    // Delete to-do from list
    const deleteToDo = (taskName) => {
        const newToDos = toDos.filter((toDo) => toDo.name !== taskName);
        setToDos(newToDos);
    }

    // Add to-do to list
    const addToDo = (task, quantity) => {
        const existingToDo = toDos.find(toDo => toDo.name === task);

        if (existingToDo) {
            const updatedToDos = toDos.map(toDo => {
                if (toDo === existingToDo) {
                    return { ...existingToDo, quantity: existingToDo.quantity + quantity, pending: existingToDo.pending + quantity};
                }
                else {
                    return toDo;
                }
            })

            setToDos(updatedToDos);
        }

        else {
            const newToDo = {
                name: task,
                quantity: quantity,
                pending: quantity
            }
            setToDos([...toDos, newToDo]);
        }
    }

    
    // Change "pending" number on a given task
    const changePending = (task, newPending) => {
        const selectedToDo = toDos.find(toDo => toDo.name === task);

        const updatedToDos = toDos.map(toDo => {
            if (toDo === selectedToDo) {
                return { ...selectedToDo, pending: newPending };
            }
            else {
                return toDo;
            }
        })

        setToDos(updatedToDos);
    };

    return (
        <ToDoContext.Provider value={{ toDos, addToDo, deleteToDo, changePending }}>
            {children}
        </ToDoContext.Provider>
    )
}