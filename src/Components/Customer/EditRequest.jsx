import React from 'react'
import  { useEffect,useState } from 'react';
import { useParams,useNavigate  } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import { MapPin, Phone, Mail } from 'lucide-react';
import axios from 'axios';
import '../../Css/EditRequest.css'

function EditRequest() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',

  });

    useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8089/contract-service/customer/contracts/${id}`);
      const data = response.data;

      setFormData({
        title: data.title || '',
        description: data.description || '',
        location: data.addr_line_3 || '',
        
      });
    } catch (error) {
      console.error("Error fetching contract:", error);
      alert("Failed to load contract data.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {

        const response = await axios.get(`http://localhost:8089/contract-service/customer/contracts/${id}`);
      const data = response.data;

      await axios.put('http://localhost:8089/contract-service/customer/contracts', {
        id : id,
        title: formData.title,
        description: formData.description,
        addr_line_3: formData.location,
        request_status: data.request_status
        
        
      });
      alert("Successfully updated!");
      navigate('/editCustomerRequest'); // navigate back if needed
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update contract.");
    }
  };


  return (
    <>
    <Header/>
    <div className="edit-container">
      <h2>Edit Service Request</h2>
      <p className="subtitle">Update the details of your service request.</p>

      <div className="form-card">
        <div className="form-group">
          <label>Service Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            rows="3"
            name="description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="form-group">
          <label><MapPin size={16} className="icon" /> Service Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>



        <div className="btn-group">
          <button className="btn cancel" onClick={() => navigate(-1)}>Cancel</button>
          <button className="btn save" onClick={handleSave}>Save Changes</button>
        </div>
      </div>
    </div>

    <Footer/>
    </>
  )
}

export default EditRequest