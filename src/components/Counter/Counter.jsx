import { useState } from "react"

const Counter = ({ addFunction }) => {
    const [counter, setCounter] = useState(1);

    const increaseCounter = () => {
        setCounter(counter + 1);
    }

    const decreaseCounter = () => {
        if (counter > 1) {
            setCounter(counter - 1);
        }
    }

    return (
        <div className="add-to-cart-button">
            <div className="d-flex align-items-center">
                <button onClick={decreaseCounter} className="btn"> - </button>
                <span> {counter} </span>
                <button onClick={increaseCounter} className="btn"> + </button>
            </div>

            <button onClick={() => addFunction(counter)} >Agregar tarea</button>
        </div>
    )
}

export default Counter