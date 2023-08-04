import React from 'react'
import { Nav } from 'react-bootstrap'

const NavBarLink = () => {
  return (
    <Nav.Link as={NavLink} to={ `/list/:${list.id}` } key={list.id}> {list.name} </Nav.Link>
  )
}

export default NavBarLink