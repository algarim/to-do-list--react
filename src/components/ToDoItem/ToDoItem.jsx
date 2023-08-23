import { useState, useContext, useEffect } from "react";
import { ToDoContext } from "../../context/ToDoContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../services/config";
import { UserAuth } from "../../context/AuthContext";

// CSS
import './ToDoItem.css'

const ToDoItem = ({ idList, itemName, quantity }) => {

  // Context
  const { deleteToDo, changePending } = useContext(ToDoContext);
  const { user } = UserAuth();

  // Define state for pending number of the toDo
  const [pending, setPending] = useState(quantity);

  // Get saved pending from database when rendering page
  useEffect(() => {
    const listRef = doc(db, "users", user.uid, "lists", idList);
    getDoc(listRef)
      .then(res => {
        const selectedList = res.data();
        const selectedToDo = selectedList.toDos.find(toDo => toDo.name === itemName);
        setPending(selectedToDo.pending);
      })
  }, [quantity]);

  // COUNTER

  const [counter, setCounter] = useState(1);

  const increaseCounter = () => {
    if (pending > counter) {
      setCounter(counter + 1);
    }
  }

  const decreaseCounter = () => {
    if (counter > 1) {
      setCounter(counter - 1);
    }
  }

  // Counter Event Handler
  const handleCounterChange = (e) => {
    let input = Number(e.target.value);

    if (input <= 1) {
      setCounter(1);
    } else if (input <= pending) {
      setCounter(input);
    } else {
      setCounter(pending);
    }
  }

  // Function that completes the number of tasks given by the counter

  const completeTask = (e, taskName, numberCompleted) => {
    e.preventDefault();
    if (pending >= numberCompleted) {
      changePending(idList, taskName, pending - numberCompleted);
      setCounter(1);
      setPending(prev => prev - numberCompleted);
    }
  }

  // Function that resets "pending" to its original number
  const resetTask = () => {
    changePending(idList, itemName, quantity);
    setPending(quantity);
  };

  // Focus handler: make it so it selects input text when on focus
  const handleFocus = (event) => event.target.select();

  return (
    <li className={`${(pending === 0) && 'completed'} todo-item-container`}>

      <h2 className="todo-description"> {itemName}</h2>
      <h3 className="todo-quantity"> Cantidad: {quantity} </h3>

      <h3 className="todo-quantity pending">Pendientes: {pending}</h3>

      <form className="complete-todo-form">
        <button type="submit" className="complete-todo-btn complete-todo-hover" onClick={(e) => completeTask(e, itemName, counter)}>Completar</button>

        <div className="counter">
          <button type="button" className="counter-btn complete-todo-hover" onClick={decreaseCounter}> - </button>
          <input type="number" className="counter-input" value={counter} onChange={handleCounterChange} onFocus={handleFocus} />
          <button type="button" className="counter-btn complete-todo-hover" onClick={increaseCounter}> + </button>
        </div>

      </form>


      <div className="todo-item-btns">
        <button className="delete-todo-btn" onClick={() => deleteToDo(idList, {name: itemName, quantity: quantity, pending: pending})}>Borrar</button>
        <button className="reset-todo-btn" onClick={resetTask}>Reestablecer</button>
      </div>
    </li>
  )
}

export default ToDoItem