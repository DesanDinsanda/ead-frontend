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
  const userType = sessionStorage.getItem('userType');

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');
  };



  return (
    <>
    <Navbar expand="lg" className="bg-primary">
      <Container>
        <Navbar.Brand href="#home" className="fw-bold">ServiceConnect</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            { userType === 'customer' && (
              <>
              <Nav.Link href="#home" className='text-white'>Dashboard</Nav.Link>
              <Nav.Link href="#link" className='text-white'>My Request</Nav.Link>
              <Nav.Link href="#link" className='text-white'>Complain</Nav.Link>
              </>
            )
            }

            { userType === 'worker' && (
              <>
              <Nav.Link href="#home" className='text-white'>Dashboard</Nav.Link>
              <Nav.Link href="#link" className='text-white'>Available Jobs</Nav.Link>
              <Nav.Link href="#link" className='text-white'>My Jobs</Nav.Link>
              </>
            )
            }
            
          </Nav>

          { !userType && (
              <>
              <Button onClick={() => navigate('/login')} className='bg-white text-dark me-3'>Sign in</Button>
              <Button onClick={() => navigate('/signup')}className='bg-white text-dark'>Register</Button>
              </>
            )
          }

          { userType && (
              <>
              <Button onClick={() => navigate('/profile')} className='bg-white text-dark me-3'>Profile</Button>
              <Button onClick={handleLogout} className='bg-white text-dark'>Logout</Button>
              </>
            )
          }

          
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}

export default Header