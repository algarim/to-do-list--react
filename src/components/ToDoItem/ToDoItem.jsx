import React from 'react'

const ToDoItem = ({toDo, deleteToDo}) => {
  return (
    <li>
        <span>{toDo}</span>
        <button onClick={() => deleteToDo(toDo)}>Borrar</button>
    </li>
  )
}

export default ToDoItem