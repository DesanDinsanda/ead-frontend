import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './WorkerSkills.css';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import Swal from 'sweetalert2';

export default function WorkerSkills() {
  const navigate = useNavigate();
  
  const [skills, setSkills] = useState([]);
  const [services, setServices] = useState([]);
  const workerId = sessionStorage.getItem('userId');

  const fetchSkills = async () => {
    try {
      const [skillsRes, servicesRes] = await Promise.all([
        axios.get('http://localhost:8087/worker-app/skills'),
        axios.get('http://localhost:8088/ServiceManagement-EAD/categories') 
      ]);

      const allSkills = skillsRes.data;
      const filteredSkills = allSkills.filter(skill => skill.work_id == workerId);
      setSkills(filteredSkills);
      setServices(servicesRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getServiceName = (id) => {
    const service = services.find(s => s.id === id);
    return service ? service.name : 'Unknown';
  };

  const handleDelete = async (id) => {
    
    const result = await Swal.fire({
                title: 'Are you sure?',
                text: 'Do you really want to Delete this skill?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, Delete it!'
              });
        
              if (!result.isConfirmed) return;

      try {
        await axios.delete(`http://localhost:8087/worker-app/skills/${id}`);
        await Swal.fire(
                            'Deleted!',
                            'The skill has been Deleted successfully.',
                            'success'
                          );
        fetchSkills();
      } catch (error) {
        console.error('Error deleting skill:', error);
        Swal.fire('Error!', 'Failed to Delete the skill.', 'error');
      }
    
  };

  const handleEdit = (skill) => {
    navigate('/edit-skill', { state: skill });
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  return (
    <>
    <Header/>
    <div className="worker-skills-container">
      <h2>My Skills</h2>
      {skills.length > 0 ? (
        <table className="skills-table">
          <thead>
            <tr>
              <th>Service Name</th>
              <th>Experience (Years)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {skills.map((skill) => (
              <tr key={skill.id}>
                <td>{getServiceName(skill.service_id)}</td>
                <td>{skill.work_experience}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(skill)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(skill.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No skills found.</p>
      )}
    </div>

    <Footer/>
    </>
  );
}
