import React from 'react'
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import { MapPin, Phone, Mail } from 'lucide-react';
import axios from 'axios';
import '../../Css/EditRequest.css'

function CreateRequest() {

  const customerId = parseInt(sessionStorage.getItem('userId'));
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8088/ServiceManagement-EAD/categories');
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      alert("Failed to load categories");
    }
  };

  const [formData, setFormData] = useState({
    // id:'',
    title: '',
    description: '',
    addr_line_1: '',
    addr_line_2: '',
    addr_line_3: '',
    service_id: '',
    customer_id: customerId,
    request_status: 'Pending'

  });


  const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData({...formData, [name]: name === "service_id" ? parseInt(value) : value
  });
};

  const handleSave = async () => {
    try {


      await axios.post('http://localhost:8089/contract-service/customer/contracts', {
        title: formData.title,
        description: formData.description,
        addr_line_1: formData.addr_line_1,
        addr_line_2: formData.addr_line_2,
        addr_line_3: formData.addr_line_3,
        service_id: formData.service_id,
        customer_id: formData.customer_id,
        request_status: formData.request_status


      });
      alert("Successfully created!");
      navigate('/MyRequest'); // navigate back if needed
    } catch (error) {
      console.error("crerate failed:", error);
      alert("Failed to create request.");
    }
  };
  return (
    <>
      <Header />
      <div className="edit-container">
        <h2>Create New Service Request</h2>
        <p className="subtitle">Fill out the form below to request a service from our professionals.</p>

        <div className="form-card">
          <div className="form-group">
            <label>Service Title</label>
            <input
              type="text"
              name="title"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              rows="3"
              name="description"
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="form-group">
            <label><MapPin size={16} className="icon" /> Adress Line 1</label>
            <input
              type="text"
              name="addr_line_1"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label><MapPin size={16} className="icon" /> Adress Line 2</label>
            <input
              type="text"
              name="addr_line_2"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label><MapPin size={16} className="icon" /> Adress Line 3</label>
            <input
              type="text"
              name="addr_line_3"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select name="service_id" value={formData.service_id} style={{padding:13}} onChange={handleChange}>
              <option value="" >Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>




          <div className="btn-group">
            <button className="btn cancel" onClick={() => navigate(-1)}>Cancel</button>
            <button className="btn save" onClick={handleSave}>Create a Request</button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default CreateRequest