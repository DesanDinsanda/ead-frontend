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
    location: '', // optional for worker
    username: '',
    password: ''
    
  });

  const [userType, setUserType] = useState('');

  useEffect(() => {
    const userId = sessionStorage.getItem('userId');
    const type = sessionStorage.getItem('userType');
    setUserType(type);

    const endpoint =
      type === 'worker'
        ? `http://localhost:8087/worker-app/workers/${userId}`
        : `http://localhost:8086/customer-ms/customers/${userId}`;

    axios
      .get(endpoint)
      .then((response) => {
        const user = response.data;
        user.password = ''; // Clear password field for security
        setFormData(user);
      })
      .catch((error) => console.error('Error fetching account:', error));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const endpoint =
      userType === 'worker'
        ? `http://localhost:8087/worker-app/workers`
        : `http://localhost:8086/customer-ms/customers`;

    try {
      await axios.put(endpoint, formData);
      alert('Account updated successfully!');
    } catch (error) {
      alert('Failed to update account!');
    }
  };

  return (
    <>
    <Header/>
    <div className="update-container">
      <h2>Update Account</h2>
      <input
        name="fname"
        value={formData.fname}
        onChange={handleChange}
        placeholder="First Name"
      />
      <input
        name="lname"
        value={formData.lname}
        onChange={handleChange}
        placeholder="Last Name"
      />
      <input
        name="contact"
        value={formData.contact}
        onChange={handleChange}
        placeholder="Contact"
      />
      {userType === 'worker' && (
        <input
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
        />
      )}
      <input
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
      />
      <input
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="New Password (optional)"
      />

      

      <button onClick={handleUpdate}>Update</button>
    </div>
    <Footer/>
    </>
  );
}
