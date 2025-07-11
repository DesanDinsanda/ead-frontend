import React, { useState, useEffect } from 'react';
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
    location: '',
    username: '',
    password: '',
    userType: 'customer'
  });

  const [categories, setCategories] = useState([]);
  const [skills, setSkills] = useState([
    { service_id: '', work_experience: '' },
    { service_id: '', work_experience: '' },
    { service_id: '', work_experience: '' }
  ]);

  const [message, setMessage] = useState('');

  // Fetch categories only if userType is worker
  useEffect(() => {
    if (formData.userType === 'worker') {
      axios.get('http://localhost:8088/ServiceManagement-EAD/categories')
        .then(res => setCategories(res.data))
        .catch(err => console.error(err));
    }
  }, [formData.userType]);

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
          : 'http://localhost:8087/worker-app/workers/create';

      const response = await axios.post(endpoint, formData);
      setMessage('Signup successful!');

      // If user is a worker, save skills
      if (formData.userType === 'worker') {
        const savedWorker = response.data; // must return worker ID

        for (const skill of skills) {
          if (skill.service_id && skill.work_experience) {
            await axios.post('http://localhost:8087/worker-app/skills', {
              work_id: savedWorker.id,
              service_id: skill.service_id,
              work_experience: skill.work_experience
            });
          }
        }
      }

      navigate('/');

      // Reset form
      setFormData({
        fname: '',
        lname: '',
        contact: '',
        location: '',
        username: '',
        password: '',
        userType: 'customer'
      });
      setSkills([
        { service_id: '', work_experience: '' },
        { service_id: '', work_experience: '' },
        { service_id: '', work_experience: '' }
      ]);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setMessage(error.response.data.message);
      } else {
        setMessage('An unexpected error occurred.');
      }
    }
  };

  return (
    <>
      <Header />
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
            <>
              <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" required /><br />

              <h4>Select Skills (Max 3)</h4>
              {skills.map((skill, index) => (
                <div key={index}>
                  <select
                    value={skill.service_id}
                    onChange={(e) => {
                      const updatedSkills = [...skills];
                      updatedSkills[index].service_id = e.target.value;
                      setSkills(updatedSkills);
                    }}
                    
                  >
                    <option value="">Select Service</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                  <input type="text" placeholder="Experience" value={skill.work_experience} onChange={(e) => {
                      const updatedSkills = [...skills];
                      updatedSkills[index].work_experience = e.target.value;
                      setSkills(updatedSkills);
                    }} /> <br />
                </div>
              ))}
            </>
          )}

          <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required /><br />
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required /><br />

          <button type="submit">Signup</button>
        </form>
        <p>{message}</p>
      </div>
      <Footer />
    </>
  );
}
