import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NameListPopUp from '../NameListPopUp/NameListPopUp';
import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ToDoContext } from '../../context/ToDoContext';
import ListsItem from '../ListsItem/ListsItem';

const NavBar = () => {
    const { lists, addList, deleteList } = useContext(ToDoContext);

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand as={Link} to="/" >Tus listas</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">

                        {/* <Nav.Link>
                            <span>lista 1</span>
                            <button> borrar </button>
                            <button> agregar nueva lista </button>
    </Nav.Link> */}
                        {
                            lists.map((list) => (
                                <ListsItem key={list.id} list={list} />
                            ))
                        }

                        <NameListPopUp handleNameChange={addList} buttonDescription={"+"} isNewList={true}/>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar