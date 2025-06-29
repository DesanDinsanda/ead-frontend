import React from 'react'
import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


function Header() {
  const navigate = useNavigate();
  return (
    <>
    <Navbar expand="lg" className="bg-primary">
      <Container>
        <Navbar.Brand href="#home" className="fw-bold">ServiceConnect</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home" className='text-white'>Dashboard</Nav.Link>
            <Nav.Link href="#link" className='text-white'>My Request</Nav.Link>
            <Nav.Link href="#link" className='text-white'>Complain</Nav.Link>
          </Nav>
          <Button onClick={() => navigate('/login')} className='bg-white text-dark me-3'>Sign in</Button>
          <Button onClick={() => navigate('/signup')}className='bg-white text-dark'>Register</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}

export default Header