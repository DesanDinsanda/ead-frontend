import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

export default function Login() {

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8086/rest-app/customers/login', formData);
            sessionStorage.setItem('customerId', response.data.id);
            setMessage("Login successful!"); // Should return "Login successful!" or error
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setMessage("Invalid username or password!");
            } else {
                setMessage("Login failed!");
            }
        }
    };

  return (
    <div className='login-container'>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input className='login-input'
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <br />
                <input className='login-input'
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <br />
                <button className='login-button' type="submit">Login</button>
            </form>
            {message && (
            <p className={`login-message ${message === 'Login successful!' ? 'success' : 'error'}`}>
            {message}
            </p>
      )}
        </div>
  )
}
