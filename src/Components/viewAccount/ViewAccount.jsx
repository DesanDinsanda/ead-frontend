import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewAccount.css';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';

export default function ViewAccount() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null); 
  const [userType, setUserType] = useState('');

  useEffect(() => {
    const id = sessionStorage.getItem('userId');
    const type = sessionStorage.getItem('userType');
    setUserType(type);

    const endpoint =
      type === 'worker'
        ? `http://localhost:8087/worker-app/workers/${id}`
        : `http://localhost:8086/customer-ms/customers/${id}`;

    axios
      .get(endpoint)
      .then((response) => setUser(response.data))
      .catch((error) => console.error('Error loading account:', error));
  }, []);

  return (
    <>
      <Header />
      <div className="account-container">
        <h2>My Account</h2>
        {user && (
          <div className="account-details">
            <div className="row">
              <label>First Name:</label>
              <span>{user.fname}</span>
            </div>
            <div className="row">
              <label>Last Name:</label>
              <span>{user.lname}</span>
            </div>
            <div className="row">
              <label>Contact:</label>
              <span>{user.contact}</span>
            </div>
            {userType === 'worker' && (
              <div className="row">
                <label>Location:</label>
                <span>{user.location}</span>
              </div>
            )}
            <div className="row">
              <label>Username:</label>
              <span>{user.username}</span>
            </div>
            {/* Show location only for workers */}
            

            <button onClick={() => navigate('/update')} className="buttonE" type="submit">
              Edit Account
            </button>
            <button onClick={() => navigate('/delete')} className="buttonD" type="submit">
              Delete Account
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
