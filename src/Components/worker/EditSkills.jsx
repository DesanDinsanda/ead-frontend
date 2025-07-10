import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './EditSkills.css'; 
import Header from '../Header';
import Footer from '../Footer';
import Swal from 'sweetalert2';

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
    const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you really want to update this skill?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, update it!'
          });
    
          if (!result.isConfirmed) return;
    try {

      await axios.put('http://localhost:8087/worker-app/skills', formData);
      await Swal.fire(
                    'Updated!',
                    'The skill has been Updated successfully.',
                    'success'
                  );
      navigate('/view-skills');
    } catch (error) {
      console.error('Update error:', error);
      Swal.fire('Error!', 'Failed to Update the skill.', 'error');
    }
  };

  return (
    <>
      <Header/>
      <div className="edit-skill-container">
        <h2>Edit Skill</h2>
        <form onSubmit={handleUpdate} className="edit-skill-form">

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
