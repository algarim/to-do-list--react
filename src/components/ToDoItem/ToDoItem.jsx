import { useState, useEffect } from "react";

// CSS
import './ToDoItem.css'

const ToDoItem = ({ name, quantity, addedQuantity, deleteToDo }) => {

  // Set a state that tracks the number of items in a task that are still pending completion.
  const [pending, setPending] = useState(quantity);


  // If quantity changes (by adding a repeat), pending changes correspondingly
  useEffect ( () => {
    setPending( prev => prev + addedQuantity);
  }, [quantity] )

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

    if(input <= 1){
      setCounter(1);
    } else if(input <= pending){
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
    <li className={(pending === 0) && 'completed' }>
      <span>{name} - {quantity}  |  Pendientes: {pending}</span>

      <form>
        <button type="submit" onClick={(e) => completeTask(e, counter)}>Completar</button>

        <button type="button" onClick={decreaseCounter}> - </button>
        <input type="number" value={counter} onChange={handleCounterChange}/>
        <button type="button" onClick={increaseCounter}> + </button>
      </form>

      <button onClick={() => deleteToDo(name)}>Borrar</button>
      <button onClick={() => resetTask(name)}>Reestablecer</button>
    </li>
  )
}

export default ToDoItem