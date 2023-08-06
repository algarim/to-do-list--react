import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useContext } from 'react';
import { ToDoContext } from '../../context/ToDoContext';
import { Link } from 'react-router-dom';

const DeleteListPopUp = ({list}) => {

    // Modal states and functions
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Context
    const { lists, deleteList } = useContext(ToDoContext);

    // Grab selected list as variable
   // const selectedList = lists.find(list => list.id === idList);

    const handleConfirmation = () => {
        deleteList(list.id);
        handleClose();
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Borrar lista
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>¿Borrar lista?</Modal.Title>
                </Modal.Header>
                <Modal.Body>¿Estás seguro de que querés borrar la lista "{list.name}"? Esta acción es irreversible.</Modal.Body>
                <Modal.Footer>
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