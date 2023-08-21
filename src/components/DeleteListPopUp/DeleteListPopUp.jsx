import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useContext } from 'react';
import { ToDoContext } from '../../context/ToDoContext';
import { Link } from 'react-router-dom';

// CSS
import './DeleteListPopUp.css'

const DeleteListPopUp = ({ listName, listId, withIconBtn = false }) => {

    // Modal states and functions
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Context
    const { deleteList } = useContext(ToDoContext);

    // Handler: confirm button
    const handleConfirmation = () => {
        deleteList(listId);
        handleClose();
    }

    return (
        <>

            {withIconBtn ? (
                <button className="m-lg-0 ms-1 lists-item-button" onClick={handleShow}> <img src="../img/bin.png" alt="edit" /> </button>
            ) : (
                <button className='btn-hover-red' onClick={handleShow}>
                    Borrar lista
                </button>
            )}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Borrar lista "{listName}"</Modal.Title>
                </Modal.Header>
                <Modal.Body className='text-center'>
                    ¿Estás seguro? Esta acción es irreversible.
                </Modal.Body>

                <Modal.Footer className='delete-popup-footer'>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Link to="/">
                        <Button variant="primary" onClick={handleConfirmation}>
                            Sí, borrar la lista
                        </Button>
                    </Link>
                </Modal.Footer>

            </Modal>
        </>
    )
}

export default DeleteListPopUp