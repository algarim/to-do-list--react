import { useState, useEffect, useContext } from "react";
import { ToDoContext } from "../../context/ToDoContext";

// CSS
import './ToDoItem.css'

const ToDoItem = ({ name, quantity }) => {

  const { toDos, deleteToDo, changePending } = useContext(ToDoContext);

  // Define variables for the particular toDo we are working with and its pending number:
  let selectedToDo = toDos.find ( toDo => toDo.name === name );
  let pending = selectedToDo.pending;

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
      changePending(taskName, pending - numberCompleted );
      setCounter(1);
    }
  }

  // Function that resets "pending" to its original number
  const resetTask = (taskName) => {
    changePending(taskName, quantity);
  }

  return (
    <li className={`${(pending === 0) && 'completed'} todo-item-container`}>

      <h2 className="todo-description"> {name}</h2>
      <h3 className="todo-quantity"> Cantidad: {quantity} </h3>

      <h3 className="todo-quantity pending">Pendientes: {pending}</h3>

      <form className="complete-todo-form">
        <button type="submit" className="complete-todo-btn complete-todo-hover" onClick={(e) => completeTask(e, name, counter)}>Completar</button>

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