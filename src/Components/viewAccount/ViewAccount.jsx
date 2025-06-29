import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewAccount.css'
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';

export default function ViewAccount() {
  const navigate = useNavigate();

  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const customerId = sessionStorage.getItem('userId'); // Example session storage
    axios.get(`http://localhost:8086/customer-ms/customers/${customerId}`)
      .then(response => setCustomer(response.data))
      .catch(error => console.error('Error loading account:', error));
    }, []);
  return (
    <>
    <Header/>
    <div className="account-container">
  <h2>My Account</h2>
  {customer && (
    <div className="account-details">
      <div className="row">
        <label>First Name:</label>
        <span>{customer.fname}</span>
      </div>
      <div className="row">
        <label>Last Name:</label>
        <span>{customer.lname}</span>
      </div>
      <div className="row">
        <label>Contact:</label>
        <span>{customer.contact}</span>
      </div>
      <div className="row">
        <label>Username:</label>
        <span>{customer.username}</span>
      </div>
      <button onClick={() => navigate('/update')} className='buttonE' type="submit">Edit Account</button>
      <button onClick={() => navigate('/delete')} className='buttonD' type="submit">Delete Account</button>
    </div>
    
  )}
</div>
<Footer/>
</>

  )
}
