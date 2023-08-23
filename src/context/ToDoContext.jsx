import { useState, createContext, useEffect } from "react";
import { UserAuth } from "./AuthContext";
import { doc, collection, getDoc, updateDoc, deleteDoc, arrayRemove, arrayUnion, onSnapshot, addDoc, query, orderBy } from "firebase/firestore";
import { db } from "../services/config";
import { useNavigate } from "react-router-dom";

export const ToDoContext = createContext([]);

export const ToDoProvider = ({ children }) => {
    // Traigo el user del Auth
    const { user } = UserAuth();

    // useNavigate
    const navigate = useNavigate();

    // STATES
    // array of all lists' names and ids
    const [listsNames, setListsNames] = useState([]);
    
    // loading state (if it hasn't finished fetching data)
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        setTimeout(() => {
            if (user) {
                const collectionRef = query(collection(db, "users", user.uid, "lists"), orderBy("name", "asc") );
                onSnapshot(collectionRef, (snapshot) => {
                    let listsArray = [];
                    snapshot?.docs.forEach((doc) => {
                        const listData = doc.data();
                        listsArray = [...listsArray, { id: doc.id, name: listData.name }];
                    });

                    setListsNames(listsArray);
                    setIsLoading(false);
                })
            }
        }, 0);

    }, [user])

    // METHODS:

    // Add list
    const addList = (name) => {
        addDoc( collection(db, "users", user.uid, "lists"), { name: name, toDos: [] } )
        .then( newDocRef => {
            navigate(`/list/${newDocRef.id}`);
        } )
        .catch(error => console.log(error));
    }

    // Change name of list
    const changeListName = (idList, newName) => {
        const listRef = doc(db, "users", user.uid, "lists", idList);
        updateDoc(listRef, { name: newName })
            .catch(error => console.log(error))
    }

    // Delete list
    const deleteList = (idList) => {
        const listRef = doc(db, "users", user.uid, "lists", idList);
        deleteDoc(listRef);
    };

    // Delete to-do from list
    const deleteToDo = (idList, toDo) => {
        const listRef = doc(db, "users", user.uid, "lists", idList);

        updateDoc(listRef, {
            toDos: arrayRemove(toDo)
        })
    }

    // Add to-do to list
    const addToDo = (idList, task, quantity) => {
        const listRef = doc(db, "users", user.uid, "lists", idList);

        getDoc(listRef)
            .then(res => {
                const selectedList = res.data();
                const toDos = selectedList.toDos;
                const existingToDo = toDos.find(toDo => toDo.name === task);

                if (existingToDo) {
                    // It toDo existes, then I update the corresponding toDos using a map function
                    const updatedToDos = toDos.map(toDo => {
                        if (toDo === existingToDo) {
                            return { ...existingToDo, quantity: existingToDo.quantity + quantity, pending: existingToDo.pending + quantity };
                        }
                        else {
                            return toDo;
                        }
                    })

                    updateDoc(listRef, { toDos: updatedToDos })
                        .catch(error => console.log(error))
                }

                else {
                    updateDoc(listRef, {
                        toDos: arrayUnion({ name: task, quantity: quantity, pending: quantity })
                    })
                        .catch(error => console.log(error))
                }
            })
            .catch(error => console.log(error))
    }


    // Change "pending" number on a given task
    const changePending = (idList, task, newPending) => {
        const listRef = doc(db, "users", user.uid, "lists", idList);

        getDoc(listRef)
            .then(res => {
                const selectedList = res.data();

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

                updateDoc(listRef, { toDos: updatedToDos })
                    .catch(error => console.log(error))
            })
            .catch(error => console.log(error))
    };

    return (
        <ToDoContext.Provider value={{ listsNames, isLoading, addList, changeListName, deleteList, addToDo, deleteToDo, changePending }}>
            {children}
        </ToDoContext.Provider>
    )
}