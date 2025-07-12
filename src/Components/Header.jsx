import React from 'react'
import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Bell, Dot } from 'lucide-react';
import axios from 'axios';
import { useEffect, useState } from 'react';


function Header() {
  const navigate = useNavigate();
  const userType = sessionStorage.getItem('userType');
  const userId = sessionStorage.getItem('userId');
  const [hasUnread, setHasUnread] = useState(false);
  const [hasUnreadWorker, setHasUnreadWorker] = useState(false);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');
  };

  //Notification
  useEffect(() => {
  let interval;

  // Customer notifications
  const fetchNotifications = async () => {
    if (userType === 'customer' && userId) {
      try {
        const res = await axios.get(`http://localhost:8090/notification-service/customer-notif/customer/${userId}`);
        const unread = res.data.some(notif => notif.status?.toLowerCase() === 'unread');
        setHasUnread(unread);
      } catch (err) {
        console.error("Failed to fetch customer notifications", err);
      }
    }
  };

  // Worker notifications
  const fetchWorkerNotifications = async () => {
    if (userType === 'worker' && userId) {
      try {
        const res = await axios.get(`http://localhost:8090/notification-service/worker-notif/worker/${userId}`);
        const unread = res.data.some(notif => notif.status?.toLowerCase() === 'unread');
        setHasUnreadWorker(unread);
      } catch (err) {
        console.error("Failed to fetch worker notifications", err);
      }
    }
  };

  if (userType === 'customer') {
    fetchNotifications();
    interval = setInterval(fetchNotifications, 4000);
  } else if (userType === 'worker') {
    fetchWorkerNotifications();
    interval = setInterval(fetchWorkerNotifications, 4000);
  }

  // Always return cleanup
  return () => clearInterval(interval);

}, [userType, userId]);





  return (
    <>
      <Navbar expand="lg" className="bg-primary">
        <Container>
          <Navbar.Brand className="fw-bold" onClick={() => navigate('/ServiceConnect')}>ServiceConnect</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {userType === 'customer' && (
                <>

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
                  <Nav.Link className='text-white' onClick={() => navigate('/Complain')}>Complain</Nav.Link>
                  <div style={{ position: 'relative', display: 'inline-block', marginLeft: 20, cursor: 'pointer' }} onClick={() => navigate('/customerNotifications')}>
                    {hasUnread && (
                      <Dot size={50} color="#ff0000" style={{ paddingRight: 1, marginTop: -10, position: 'absolute', top: -10, left: 10 }} />
                    )}
                    <Bell style={{ marginTop: 10, color: 'white' }} />
                  </div>

                </>

              )
              }

              {userType === 'worker' && (
                <>
                  <Nav.Link className='text-white' onClick={() => navigate('/availableJobs')}>Available Jobs</Nav.Link>
                  <Nav.Link onClick={() => navigate('/view-skills')} className='text-white'>My Skills</Nav.Link>
                  <Nav.Link onClick={() => navigate('/my-jobs')} className='text-white'>My Jobs</Nav.Link>

                  <div style={{ position: 'relative', display: 'inline-block', marginLeft: 20, cursor: 'pointer' }} onClick={() => navigate('/workerNotifications')}>
                    {hasUnreadWorker && (
                      <Dot size={50} color="#ff0000" style={{ paddingRight: 1, marginTop: -10, position: 'absolute', top: -10, left: 10 }} />
                    )}
                    <Bell style={{ marginTop: 10, color: 'white' }} />
                  </div>


                </>
              )
              }

            </Nav>

            {!userType && (
              <>
                <Button onClick={() => navigate('/login')} className='bg-white text-dark me-3'>Sign in</Button>
                <Button onClick={() => navigate('/signup')} className='bg-white text-dark'>Register</Button>
              </>
            )
            }

            {userType && (
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