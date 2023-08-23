import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

//CSS
import './NameListPopUp.css'

const NameListPopUp = ({ handleNameChange, buttonDescription, isNewList = false, hideLg = false, previousName = '' }) => {
    // State for new name
    const [name, setName] = useState(previousName);

    // Modal states and functions
    const [show, setShow] = useState(false);

    const handleClose = () => {
       // setName('');
        setShow(false);
    };

    const handleShow = () => {
        setName(previousName);
        setShow(true);
    };

    // Define pop up description depending if it is a new or a previously existing list
    let popUpDescription = isNewList ? 'Crear nueva lista' : 'Cambiar nombre de la lista';

    // Handler
    const handleConfirmation = (e) => {
        e.preventDefault();

        handleNameChange(name);

        setName('');
        handleClose();
    }

    return (
        <>
            {isNewList ? (
                <button className='navbar-btn add-list-btn' onClick={handleShow}>
                   <p className='m-0'> {buttonDescription} </p>  
                </button>
            ) : (
                <button className={`m-lg-0 ms-1 lists-item-button ${hideLg && 'd-lg-none'}`} onClick={handleShow}> <img src="../img/pen.png" alt="edit" /> </button>
            )}


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title> {popUpDescription} </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <input
                            className='popup-form-input'
                            type="text"
                            placeholder="Ingrese el nombre de la lista"
                            value={name}
                            autoFocus
                            onChange={(e) => setName(e.target.value)}
                        />

                        <hr />

                        <div className='popup-form-buttons'>
                            <Button variant="secondary" onClick={handleClose}>
                                Cancelar
                            </Button>
                            <Button type='submit' variant="primary" onClick={handleConfirmation}>
                                Guardar cambios
                            </Button>
                        </div>

                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default NameListPopUp