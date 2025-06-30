import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';


export default function Signup() {
const navigate = useNavigate();


  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    contact: '',
    location: '',          // only used if worker
    username: '',
    password: '',
    userType: 'customer' // default
    
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
    const contactPattern = /^\d{10}$/;

    if (!contactPattern.test(formData.contact)) {
      setMessage('Contact number must be exactly 10 digits.');
      return false;
    }

    if (!passwordPattern.test(formData.password)) {
      setMessage('Password must include uppercase, lowercase, number, symbol, and be 10+ characters.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const endpoint =
        formData.userType === 'customer'
          ? 'http://localhost:8086/customer-ms/customers/signup'
          : 'http://localhost:8087/worker-app/workers';

      const response = await axios.post(endpoint, formData);
      setMessage(response.data); // Backend message

      if (formData.userType === 'customer') {
        navigate('/'); 
      }
      if (formData.userType === 'worker') {
        navigate('/'); 
      }

      // Clear form after submit
      setFormData({
        fname: '',
        lname: '',
        contact: '',
        location: '',
        username: '',
        password: '',
        userType: 'customer'
        
      });
    } catch (error) {
      setMessage('Signup failed!');
    }
  };

  return (
    <>
    <Header/>
    <div className='signup-container'>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>

        <select name="userType" value={formData.userType} onChange={handleChange} required>
          <option value="customer">Customer</option>
          <option value="worker">Worker</option>
        </select><br />

        <input type="text" name="fname" value={formData.fname} onChange={handleChange} placeholder="First Name" required /><br />
        <input type="text" name="lname" value={formData.lname} onChange={handleChange} placeholder="Last Name" required /><br />
        <input type="text" name="contact" value={formData.contact} onChange={handleChange} placeholder="Contact Number" required /><br />
        {formData.userType === 'worker' && (
          <><input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" required /><br /> </>
        )}
        <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required /><br />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required /><br />

        

        <button type="submit">Signup</button>
      </form>
      <p>{message}</p>
    </div>
    <Footer/>
    </>
  );
}
