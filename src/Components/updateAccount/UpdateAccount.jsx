import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UpdateAccount.css';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import Swal from 'sweetalert2';

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
  const [message, setMessage] = useState('');

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

  const validateForm = () => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
    const contactPattern = /^\d{10}$/;

    if (!contactPattern.test(formData.contact)) {
      setMessage('Contact number must be exactly 10 digits.');
      return false;
    }

    if (!passwordPattern.test(formData.password) && formData.password !== '') {
      setMessage('Password must include uppercase, lowercase, number, symbol, and be 10+ characters.');
      return false;
    }

    return true;
  };

  const handleUpdate = async () => {

    if (!validateForm()) return;

    const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you really want to update this account?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, update it!'
      });

      if (!result.isConfirmed) return;

    const endpoint =
      userType === 'worker'
        ? `http://localhost:8087/worker-app/workers/update`
        : `http://localhost:8086/customer-ms/customers/update`;

    try {
      await axios.put(endpoint, formData);
      await Swal.fire(
              'Updated!',
              'The contract has been Updated successfully.',
              'success'
            );

           setMessage(''); 

    } catch (error) {
      if (error.response && error.response.status === 400) {
        setMessage(error.response.data.message);
      } else {
        setMessage('An unexpected error occurred.');
      }
      Swal.fire('Error!', 'Failed to Update the account.', 'error');
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
      <p>{message}</p>
    </div>
    <Footer/>
    </>
  );
}
