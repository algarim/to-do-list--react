import { useState, useEffect, createContext } from "react";
import { UserAuth } from "./AuthContext";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../services/config";

export const ToDoContext = createContext([]);

export const ToDoProvider = ({ children }) => {
    // Traigo el user del Auth
    const { user } = UserAuth();

    // STATES

    // lists of toDos
    const [lists, setLists] = useState([]);

    // Save the list in localStorage every time it changes
    /*useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(lists))
    }, [lists])*/

    // set value of lists using db and useEffect


    // Auxiliary function:
    // Function that replaces a specific list by another one provided as an argument
    function changeList(idList, newList) {

        const updatedLists = lists.map(list => {
            if (list.id === idList) {
                return { id: idList, name: list.name, toDos: newList };
            } else {
                return list;
            }
        })

        return updatedLists;
    }


    // METHODS:
    
    // Select list:
    const selectList = (idList) => {
        const collectionRef = collection(db, user.uid, idList );
        getDocs( collectionRef )
        .then( res => {
            const selectedList = res.map( (doc) => {
                const data = doc.data(); 
                return {id: doc.id, ...data };
            } )

            setList(selectedList);
        } )
        .catch(error => console.log(error))
    }

    // Add list
    const addList = (name) => {
        const id = name.replaceAll(' ', '-').toLowerCase();

        

        const existingList = lists.find(list => list.id === id);
        const newListID = existingList ? `${id}-1` : id;

        const newList = { id: newListID, name: name, toDos: [] };
        setLists([...lists, newList]);
    }

    // Change name of list
    const changeListName = (idList, newName) => {
        const updatedLists = lists.map(list => {
            if (list.id === idList) {
                return { id: idList, name: newName, toDos: list.toDos };
            } else {
                return list;
            }
        });

        setLists(updatedLists);
    }

    // Delete list
    const deleteList = (idList) => {
        const updatedLists = lists.filter(list => list.id !== idList);
        setLists(updatedLists);
    };

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
        <ToDoContext.Provider value={{ lists, selectList, addList, changeListName, deleteList, addToDo, deleteToDo, changePending }}>
            {children}
        </ToDoContext.Provider>
    )
}