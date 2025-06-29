import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UpdateAccount.css';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';

export default function UpdateAccount() {
  const navigate = useNavigate();

    const [formData, setFormData] = useState({
    id: '',
    fname: '',
    lname: '',
    contact: '',
    username: '',
    password: ''
  });

  useEffect(() => {
  const customerId = sessionStorage.getItem('userId');
  axios.get(`http://localhost:8086/customer-ms/customers/${customerId}`)
    .then(response => {
      const customer = response.data;
      customer.password = ""; // Clear password so it's not shown
      setFormData(customer);
    })
    .catch(error => console.error(error));
    }, []);


  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put('http://localhost:8086/customer-ms/customers', formData);
      alert("Updated successfully!");
    } catch (error) {
      alert("Update failed!");
    }
  };

  return (
    <>
    <Header/>
    <div className='update-container'>
      <h2>Update Account</h2>
      <input name="fname" value={formData.fname} onChange={handleChange} placeholder="First Name" />
      <input name="lname" value={formData.lname} onChange={handleChange} placeholder="Last Name" />
      <input name="contact" value={formData.contact} onChange={handleChange} placeholder="Contact" />
      <input name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
      <input name="password" value={formData.password} onChange={handleChange} placeholder="New Password (optional)" />
      <button onClick={handleUpdate}>Update</button>
    </div>
    <Footer/>
    </>
  )
}
