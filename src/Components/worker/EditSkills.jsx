import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './EditSkills.css'; 
import Header from '../Header';
import Footer from '../Footer';

export default function EditSkills() {
  const navigate = useNavigate();
  const location = useLocation();
  const skill = location.state; 

  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    id: skill.id,
    work_id: skill.work_id,
    service_id: skill.service_id,
    work_experience: skill.work_experience
  });

  useEffect(() => {
    axios.get('http://localhost:8088/ServiceManagement-EAD/categories')
      .then(res => setServices(res.data))
      .catch(err => console.error('Error loading services:', err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      console.log('Submitting data:', formData); 

      await axios.put('http://localhost:8087/worker-app/skills', formData);
      alert('Skill updated successfully!');
      navigate('/view-skills');
    } catch (error) {
      console.error('Update error:', error);
      alert('Failed to update skill.');
    }
  };

  return (
    <>
      <Header/>
      <div className="edit-skill-container">
        <h2>Edit Skill</h2>
        <form onSubmit={handleUpdate} className="edit-skill-form">

          {/* Read-only work_id display (optional) */}
          <label>Worker ID</label>
          <input type="text" value={formData.work_id} readOnly />

          <label>Service</label>
          <select
            name="service_id"
            value={formData.service_id}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Service --</option>
            {services.map(service => (
              <option key={service.id} value={service.id}>{service.name}</option>
            ))}
          </select>

          <label>Work Experience (in years)</label>
          <input
            type="number"
            name="work_experience"
            value={formData.work_experience}
            onChange={handleChange}
            required
            min={0}
          />

          <button type="submit">Update Skill</button>
        </form>
      </div>
      <Footer />
    </>
  );
}
