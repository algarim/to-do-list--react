import { useState, useEffect } from "react";

// CSS
import './ToDoItem.css'

const ToDoItem = ({ name, quantity, addedQuantity, deleteToDo }) => {

  // Grab saved toDo list from localStorage
  const savedToDos = JSON.parse(localStorage.getItem("ToDos")) || [];

  // Set a state that tracks the number of items in a task that are still pending completion.
  const [pending, setPending] = useState(() => {
    const existingToDo = savedToDos.find(toDo => { toDo.name === name });

    let initialPending = existingToDo ? existingToDo.pending : quantity;

    return initialPending;
  });


  // If quantity changes (by adding a repeat), pending changes correspondingly
  useEffect(() => {
    setPending(prev => prev + addedQuantity);
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

  const completeTask = (e, quantity) => {
    if (pending >= counter) {
      e.preventDefault();
      setPending(prev => prev - quantity);

      setCounter(1);
    }
  }

  // Function that resets "pending" to its original number
  const resetTask = () => {
    setPending(quantity);
  }

  return (
    <li className={`${(pending === 0) && 'completed'} todo-item-container`}>

      <h2 className="todo-description"> {name}</h2>
      <h3 className="todo-quantity"> Cantidad: {quantity} </h3>

      <h3 className="todo-quantity pending">Pendientes: {pending}</h3>

      <form className="complete-todo-form">
        <button type="submit" className="complete-todo-btn complete-todo-hover" onClick={(e) => completeTask(e, counter)}>Completar</button>

        <div className="counter">
          <button type="button" className="counter-btn complete-todo-hover" onClick={decreaseCounter}> - </button>
          <input type="number" className="counter-input" value={counter} onChange={handleCounterChange} />
          <button type="button" className="counter-btn complete-todo-hover" onClick={increaseCounter}> + </button>
        </div>

      </form>





      <div className="todo-item-btns">
        <button className="delete-todo-btn" onClick={() => deleteToDo(name)}>Borrar</button>
        <button className="reset-todo-btn" onClick={() => resetTask(name)}>Reestablecer</button>
      </div>
    </li>
  )
}

export default ToDoItem