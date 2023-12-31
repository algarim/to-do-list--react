import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NameListPopUp from '../NameListPopUp/NameListPopUp';
import { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ToDoContext } from '../../context/ToDoContext';
import ListsItem from '../ListsItem/ListsItem';
import { UserAuth } from '../../context/AuthContext';

// CSS
import './NavBar.css'

const NavBar = () => {
    const { listsNames, addList } = useContext(ToDoContext);
    const { user,logOut } = UserAuth();

    const handleSignOut = async () => {
        try {
          await logOut();
        } catch (error) {
          console.log(error);
        }
      }

    return (

        <>

            {user ? (
                <Navbar id='navbar' expand="lg" className="bg-body-tertiary">
                    <Container>
                        <Navbar.Brand as={Link} to="/" >Pedidos</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                {
                                    listsNames.map((list) => (
                                        <ListsItem key={list.id} list={list} />
                                    ))
                                }

                                <NameListPopUp handleNameChange={addList} buttonDescription={'Nueva lista'} isNewList={true} />

                                <hr />

                                <button className='navbar-btn logout-btn' onClick={handleSignOut}> Cerrar sesión </button>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            ) : (<></>)
            }

        </>


    )
}

export default NavBar