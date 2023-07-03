

const ToDoItem = ({toDo, numberOfItems, deleteToDo}) => {
  return (
    <li>
        <span>{toDo} - {numberOfItems}</span>
        <span>Pendientes</span>
        <button onClick={() => deleteToDo(toDo)}>Borrar</button>
    </li>
  )
}

export default ToDoItem