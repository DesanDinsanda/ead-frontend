import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../Css/admin.css';
import Header from '../Header';
import Footer from '../Footer';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';



export default function Admin() {
  const [activeTab, setActiveTab] = useState('workers');
  const [workers, setWorkers] = useState([]);
  const [complains, setComplains] = useState([]);
  const [services, setServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newService, setNewService] = useState('');
  const [editService, setEditService] = useState({ id: null, category: '' });

  useEffect(() => {
    if (activeTab === 'workers') fetchWorkers();
    else if (activeTab === 'complains') fetchComplains();
    else fetchServices();
  }, [activeTab]);

  const fetchWorkers = async () => {
    try {
      const res = await axios.get('http://localhost:8087/worker-app/workers');
      setWorkers(res.data);
    } catch (error) {
      console.error('Error fetching workers:', error);
    }
  };

  const fetchComplains = async () => {
    try {
      const res = await axios.get('http://localhost:8085/complain-service/complains');
      setComplains(res.data);
    } catch (error) {
      console.error('Error fetching complains:', error);
    }
  };

  const fetchServices = async () => {
    try {
      const res = await axios.get('http://localhost:8088/ServiceManagement-EAD/categories');
      setServices(res.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const res = await axios.get(`http://localhost:8087/worker-app/workers?fname=${searchQuery}`);
      setWorkers(res.data);
    } catch (error) {
      console.error('Error searching workers:', error);
    }
  };

  const addService = async () => {
    if (!newService.trim()) return;
    try {
      await axios.post('http://localhost:8088/ServiceManagement-EAD/categories', { name: newService });
      
      fetchServices();
    } catch (error) {
      console.error('Error adding service:', error);
    }
  };

  const deleteService = async (id) => {

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
      await axios.delete(`http://localhost:8088/ServiceManagement-EAD/categories/${id}`);

      await Swal.fire(
                          'Deleted!',
                          'The skill has been Deleted successfully.',
                          'success'
                        );

      fetchServices();
    } catch (error) {
      console.error('Error deleting service:', error);
      Swal.fire('Error!', 'Failed to Delete the account.', 'error');
    }
  };

  const startEdit = (service) => {
    setEditService({ id: service.id, category: service.category });
  };

  const updateService = async () => {
    try {

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

      await axios.put('http://localhost:8088/ServiceManagement-EAD/categories', {
        id:editService.id,name: editService.category
      });

      await Swal.fire(
                          'Updated!',
                          'The skill has been updated successfully.',
                          'success'
                        );

      setEditService({ id: null, category: '' });
      fetchServices();
    } catch (error) {
      console.error('Error updating service:', error);
      Swal.fire('Error!', 'Failed to update the skill.', 'error');
    }
  };

  const resolveComplain = async (complainId) =>{
    const result = await Swal.fire({
                title: 'Are you sure?',
                text: 'Do you really want to resolve this complain?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, resolve it!'
              });
        
              if (!result.isConfirmed) return;
    try {
      await axios.put(`http://localhost:8085/complain-service/complains?id=${complainId}`, {
        id:editService.id,name: editService.category
      });

      await Swal.fire(
                          'Resolved!',
                          'The complain has been resolved successfully.',
                          'success'
                        );
      
      fetchComplains();
    } catch (error) {
      console.error('Error updating service:', error);
      Swal.fire('Error!', 'Failed to Resolve the complain.', 'error');
    }
  }

  return (
    <>
    <Header/>
    <div className="admin-dashboard">
      <h1>Admin Panel</h1>

      <div className="adminButtons" style={{ marginBottom: '20px' }}>
        <button type="button" class="btn btn-primary me-3" onClick={() => setActiveTab('workers')}>Workers</button>
        <button type="button" class="btn btn-primary me-3" onClick={() => setActiveTab('complains')}>Complains</button>
        <button type="button" class="btn btn-primary me-3" onClick={() => setActiveTab('services')}>Services</button>
      </div>

      {/* Workers Tab */}
      {activeTab === 'workers' && (
        <div>
          <h2>All Workers</h2>
          <input
          className='inputSearch'
            type="text"
            placeholder="Search by Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="button" class="btn btn-primary me-3" onClick={handleSearch}>Search</button>

          <table border="1" cellPadding="10" style={{ marginTop: '20px' }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Location</th>
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>
              {workers.map((worker) => (
                <tr key={worker.id}>
                  <td>{worker.id}</td>
                  <td>{worker.fname}</td>
                  <td>{worker.location}</td>
                  <td>{worker.contact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Complains Tab */}
      {activeTab === 'complains' && (
        <div>
          <h2>All Complains</h2>
          <table border="1" cellPadding="10">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {complains.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.title}</td>
                  <td>{c.description}</td>
                  <td>{c.status}</td>
                  <td><button type="button" class="btn btn-primary me-3" style={{ width: '100px' }} onClick={() => resolveComplain(c.id)}>Resolve</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Services Tab */}
      {activeTab === 'services' && (
        <div>
          <h2>All Services</h2>

          <input
          className='inputSearch'
            type="text"
            placeholder="New Service Category"
            value={newService}
            onChange={(e) => setNewService(e.target.value)}
          />
          <button type="button" class="btn btn-primary me-3" onClick={addService}>Add Service</button>

          <table border="1" cellPadding="10" style={{ marginTop: '20px' }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Service Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id}>
                  <td>{service.id}</td>
                  <td>
                    {editService.id === service.id ? (
                      <input
                        type="text"
                        value={editService.category}
                        onChange={(e) =>
                          setEditService({ ...editService, category: e.target.value })
                        }
                      />
                    ) : (
                      service.name
                    )}
                  </td>
                  <td>
                    {editService.id === service.id ? (
                      <button type="button" class="btn btn-primary me-3"  onClick={updateService}>Save</button>
                    ) : (
                      <button type="button" class="btn btn-primary me-3" onClick={() => startEdit(service)}>Edit</button>
                    )}
                    {/* <button type="button" class="btn btn-primary">Primary</button> */}
                    <button type="button" class="btn btn-danger" onClick={() => deleteService(service.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    <Footer/>
    </>
  );
}
