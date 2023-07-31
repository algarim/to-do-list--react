import { useState, useEffect, createContext } from "react";

export const ToDoContext = createContext([]);

export const ToDoProvider = ({ children }) => {
    // STATES

    // lists of toDos
    const [lists, setLists] = useState(() => {
        const savedLists = localStorage.getItem("lists");

        const startingLists = savedLists ? JSON.parse(savedLists) : [];

        return startingLists;
    });

    // Save the list in localStorage every time it changes
    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(lists))
    }, [lists])


    // Auxiliary function:
    // Function that replaces a specific list by another one provided as an argument
    function changeList(idList, newList) {

        const updatedLists = lists.map(list => {
            if (list.id === idList) {
                return { id: idList, todos: newList };
            } else {
                return list;
            }
        })

        return updatedLists;
    }


    // METHODS: 

    // Delete to-do from list
    const deleteToDo = (idList, taskName) => {
        const selectedList = lists.find(list => list.id === idList);
        const toDos = selectedList.toDos;
        const newToDos = toDos.filter((toDo) => toDo.name !== taskName);

        const newLists = changeList(idList, newToDos);
        setLists(newLists);
    }

    // Add to-do to list
    const addToDo = (idList, task, quantity) => {
        const selectedList = lists.find(list => list.id === idList);
        const toDos = selectedList.toDos;
        const existingToDo = toDos.find(toDo => toDo.name === task);

        if (existingToDo) {
            const updatedToDos = toDos.map(toDo => {
                if (toDo === existingToDo) {
                    return { ...existingToDo, quantity: existingToDo.quantity + quantity, pending: existingToDo.pending + quantity };
                }
                else {
                    return toDo;
                }
            })

            const updatedLists = changeList(idList, updatedToDos);
            setLists(updatedLists);
        }

        else {
            const newToDo = {
                name: task,
                quantity: quantity,
                pending: quantity
            }

            const updatedLists = changeList(idList, [...toDos, newToDo]);
            setLists(updatedLists);
        }
    }


    // Change "pending" number on a given task
    const changePending = (idList, task, newPending) => {
        const selectedList = lists.find(list => list.id === idList);
        const toDos = selectedList.toDos;

        const selectedToDo = toDos.find(toDo => toDo.name === task);

        const updatedToDos = toDos.map(toDo => {
            if (toDo === selectedToDo) {
                return { ...selectedToDo, pending: newPending };
            }
            else {
                return toDo;
            }
        })

        const updatedLists = changeList(idList, updatedToDos);
        setLists(updatedLists);
    };

    return (
        <ToDoContext.Provider value={{ lists, addToDo, deleteToDo, changePending }}>
            {children}
        </ToDoContext.Provider>
    )
}