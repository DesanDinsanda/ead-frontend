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
<<<<<<< Updated upstream
      // id:'',
    title: '',
    description: '',
    addr_line_1: '',
    addr_line_2: '',
    addr_line_3: '',
    // service_id: '',
    // customer_id:'',
    // request_status:''
=======
    title: '',
    description: '',
    location: '',
>>>>>>> Stashed changes

  });

    useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8089/contract-service/customer/contracts/${id}`);
      const data = response.data;

      setFormData({
<<<<<<< Updated upstream
        id:data.id,
        title: data.title ,
        description: data.description,
        addr_line_1: data.addr_line_1,
        addr_line_2: data.addr_line_2,
        addr_line_3: data.addr_line_3,
        service_id: data.service_id,
        customer_id:data.customer_id,
        request_status:data.request_status
=======
        title: data.title || '',
        description: data.description || '',
        location: data.addr_line_3 || '',
>>>>>>> Stashed changes
        
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

<<<<<<< Updated upstream

      await axios.put('http://localhost:8089/contract-service/customer/contracts', {
        id : formData.id,
        title: formData.title,
        description: formData.description,
        addr_line_1: formData.addr_line_1,
        addr_line_2: formData.addr_line_2,
        addr_line_3: formData.addr_line_3,
        service_id: formData.service_id,
        customer_id:formData.customer_id,
        request_status: formData.request_status
=======
        const response = await axios.get(`http://localhost:8089/contract-service/customer/contracts/${id}`);
      const data = response.data;

      await axios.put('http://localhost:8089/contract-service/customer/contracts', {
        id : id,
        title: formData.title,
        description: formData.description,
        addr_line_3: formData.location,
        request_status: data.request_status
>>>>>>> Stashed changes
        
        
      });
      alert("Successfully updated!");
<<<<<<< Updated upstream
      navigate('/CustomerRequest'); // navigate back if needed
=======
      navigate('/editCustomerRequest'); // navigate back if needed
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
          <label><MapPin size={16} className="icon" /> Adress Line 1</label>
          <input
            type="text"
            name="addr_line_1"
            value={formData.addr_line_1}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label><MapPin size={16} className="icon" /> Adress Line 2</label>
          <input
            type="text"
            name="addr_line_2"
            value={formData.addr_line_2}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label><MapPin size={16} className="icon" /> Adress Line 3</label>
          <input
            type="text"
            name="addr_line_3"
            value={formData.addr_line_3}
=======
          <label><MapPin size={16} className="icon" /> Service Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
>>>>>>> Stashed changes
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