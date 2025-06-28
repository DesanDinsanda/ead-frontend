import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';

export default function Signup() {

  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    contact: '',
    username: '',
    password: ''
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
      setMessage('Password must be at least 10 characters long and include uppercase, lowercase, number, and special character.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post('http://localhost:8086/rest-app/customers/signup', formData);
      setMessage(response.data); // shows backend message like "Signup successful!"
      setFormData({ fname: '', lname: '', contact: '', username: '', password: '' }); // clear form
    } catch (error) {
      setMessage('Signup failed!');
    }
  };

  return (
    <div className='signup-container'>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="fname" value={formData.fname} onChange={handleChange} placeholder="First Name" required /><br />
        <input type="text" name="lname" value={formData.lname} onChange={handleChange} placeholder="Last Name" required /><br />
        <input type="text" name="contact" value={formData.contact} onChange={handleChange} placeholder="Contact Number" required /><br />
        <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required /><br />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required /><br />
        <button type="submit">Signup</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
