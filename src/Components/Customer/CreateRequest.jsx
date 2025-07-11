import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import { MapPin } from 'lucide-react';
import axios from 'axios';
import '../../Css/EditRequest.css';
import Swal from 'sweetalert2';

function CreateRequest() {
  const customerId = parseInt(sessionStorage.getItem('userId'));
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    addr_line_1: '',
    addr_line_2: '',
    addr_line_3: '',
    service_id: '',
    customer_id: customerId,
    request_status: 'Pending',
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8088/ServiceManagement-EAD/categories');
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      Swal.fire('Error!', 'Failed to load the categories.', 'error');

    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'service_id' ? parseInt(value) : value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post('http://localhost:8089/contract-service/customers/contracts', formData);
      await Swal.fire('Created!', 'The contract has been created successfully.', 'success');
      navigate('/MyRequest');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        Swal.fire('Error!', error.response.data.message , 'error');
      } else {
        Swal.fire('Error!', 'Failed to create the contact.', 'error');
      }
    };
      
  };

  return (
    <>
      <Header />
      <div className="edit-container">
        <h2>Create New Service Request</h2>
        <p className="subtitle">Fill out the form below to request a service from our professionals.</p>

        <form className="form-card" onSubmit={handleSave}>
          <div className="form-group">
            <label>Service Title</label>
            <input type="text" name="title" required value={formData.title} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea rows="3" name="description" required value={formData.description} onChange={handleChange}></textarea>
          </div>

          <div className="form-group">
            <label><MapPin size={16} className="icon" /> Address Line 1</label>
            <input type="text" name="addr_line_1" required value={formData.addr_line_1} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label><MapPin size={16} className="icon" /> Address Line 2</label>
            <input type="text" name="addr_line_2" required value={formData.addr_line_2} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label><MapPin size={16} className="icon" /> Address Line 3</label>
            <input type="text" name="addr_line_3" required value={formData.addr_line_3} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select name="service_id" required value={formData.service_id} onChange={handleChange} style={{ padding: 13 }}>
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="btn-group">
            <button type="button" className="btn cancel" onClick={() => navigate(-1)}>Cancel</button>
            <button type="submit" className="btn save">Create a Request</button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default CreateRequest;
