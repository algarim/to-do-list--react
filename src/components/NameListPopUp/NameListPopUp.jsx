import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

//CSS
import './NameListPopUp.css'

const NameListPopUp = ({ handleNameChange, buttonDescription, isNewList = false }) => {
    // Modal states and functions
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Define pop up description depending if it is a new or a previously existing list
    let popUpDescription = isNewList ? 'Crear nueva lista' : 'Cambiar nombre de la lista';

    // Set up useNavigate
    const navigate = useNavigate();

    // State for new name
    const [name, setName] = useState('');

    // Handler
    const handleConfirmation = (e) => {
        e.preventDefault();

        handleNameChange(name);

        if (isNewList) {
            let id = name.replaceAll(' ', '-').toLowerCase();
            navigate(`/list/${id}`)
        }

        setName('');
        handleClose();
    }

    return (
        <>
            {isNewList ? (
                <button variant="primary" onClick={handleShow}>
                    {buttonDescription}
                </button>
            ) : (
                <button className="m-0 lists-item-button" onClick={handleShow}> <img src="../img/pen.png" alt="edit" /> </button>
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