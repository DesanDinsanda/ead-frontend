import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';


export default function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
    username: '',
    password: '',
    userType: 'customer' // default user type
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const endpoint = formData.userType === 'customer'
        ? 'http://localhost:8086/customer-ms/customers/login'
        : 'http://localhost:8087/worker-app/workers/login';

      const response = await axios.post(endpoint, formData);
      sessionStorage.setItem('userId', response.data.id);
      sessionStorage.setItem('userType', formData.userType);
      setMessage('Login successful!');
      if (formData.userType === 'customer') {
        navigate('/customer-home'); 
      }
      if (formData.userType === 'worker') {
        navigate('/worker-home'); 
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setMessage('Invalid username or password!');
      } else {
        setMessage('Login failed!');
      }
    }
    };

  return (
    <>
    <Header/>
    <div className='login-container'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>

        {/* Select user type */}
        <select
          name="userType"
          value={formData.userType}
          onChange={handleChange}
          className='login-input'
          required
        >
          <option value="customer">Customer</option>
          <option value="worker">Worker</option>
        </select><br />

        {/* Username input */}
        <input
          className='login-input'
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        /><br />

        {/* Password input */}
        <input
          className='login-input'
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        /><br />

        
        <button className='login-button' type="submit">Login</button> 

        <p className="create-account-text">
        Don’t have an account? <Link to="/signup">Create one</Link>
      </p>

      </form>
      

      {/* Display message */}
      {message && (
        <p className={`login-message ${message === 'Login successful!' ? 'success' : 'error'}`}>
          {message}
        </p>
      )}
    </div>
    <Footer/>
    </>
  )
}
