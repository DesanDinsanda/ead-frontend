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
        <Navbar.Brand  className="fw-bold" onClick={() => navigate('/ServiceConnect')}>ServiceConnect</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            { userType === 'customer' && (
              <>
              <Nav.Link className='text-white' onClick={() => navigate('/Dashboard')}>Dashboard</Nav.Link>

              {/* test dropdown*/}
              {/* <Nav.Link className='text-white' onClick={() => navigate('/MyRequest')}>My Request</Nav.Link> */}
              <NavDropdown title={<span style={{ color: 'white' }}>My Requests</span>} id="basic-nav-dropdown">
              <NavDropdown.Item onClick={() => navigate('/MyRequest')}>All Requests</NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate('/PendingCustomerRequests')}>
                Pending Requests
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate('/AcceptedCustomerRequests')}>Accepted Requests</NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate('/CancelledCustomerRequests')}>Cancelled Requests</NavDropdown.Item>
              
            </NavDropdown>

              {/* test dropdown*/}
              <Nav.Link href="#link" className='text-white' onClick={() => navigate('/Complain')}>Complain</Nav.Link>
              </>
            )
            }

            { userType === 'worker' && (
              <>
              <Nav.Link href="#home" className='text-white'>Dashboard</Nav.Link>
              <Nav.Link  className='text-white' onClick={() => navigate('/availableJobs')}>Available Jobs</Nav.Link>
              <Nav.Link onClick={() => navigate('/view-skills')} className='text-white'>My Skills</Nav.Link>
              <Nav.Link onClick={() => navigate('/my-jobs')} className='text-white'>My Jobs</Nav.Link>
              
              
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