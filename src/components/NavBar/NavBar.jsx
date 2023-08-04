import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { ToDoContext } from '../../context/ToDoContext';

const NavBar = () => {
    const { lists, addList, deleteList } = useContext(ToDoContext);

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand>Tus listas</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">

                        <Nav.Link>
                            <span>lista 1</span>
                            <button> borrar </button>
                            <button> agregar nueva lista </button>
                        </Nav.Link>
                        {
                            lists.map ( (list) => (
                                <Nav.Link as={NavLink} to={ `/list/${list.id}` } key={list.id}> {list.name} </Nav.Link>
                            ) )
                        }

                        <button onClick={() => addList('Nueva lista')}> + </button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar