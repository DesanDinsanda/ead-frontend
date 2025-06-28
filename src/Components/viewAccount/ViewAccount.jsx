import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewAccount.css'

export default function ViewAccount() {
    const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const customerId = sessionStorage.getItem('customerId'); // Example session storage
    axios.get(`http://localhost:8086/rest-app/customers/${customerId}`)
      .then(response => setCustomer(response.data))
      .catch(error => console.error('Error loading account:', error));
    }, []);
  return (
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
    </div>
  )}
</div>

  )
}
