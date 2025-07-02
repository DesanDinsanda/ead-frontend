import React, { useEffect, useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../Css/EditComplain.css';

function NewComplain() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const userId = sessionStorage.getItem('userId');


  const handleComplain = async (e) => {
    e.preventDefault();

    const complain = {
      title:title,
      description:description,
      customerId: userId
    };

    try {
      const response = await axios.post('http://localhost:8085/complain-service/complains', complain);
      alert("Complain created successfully!");
      navigate("/Complain");
    } catch (error) {
      console.error("Error creating complain", error);
      alert("Failed to create complain");
    }
  };
  return (
    <>
    <Header />
      <div className='editCom'>
        <div className='editTitle'>
          <h2>Submit a Complaint</h2>
          <p>Please provide details about your complaint. We take all complaints seriously and will respond as soon as possible.</p>
        </div>
        <form onSubmit={handleComplain}>
          <div className='editContent'>
            <div className='pairs'>
              <label htmlFor="title">Title</label><br />
              <input type="text"id="title" onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className='pairs'>
              <label htmlFor="description">Description</label><br />
              <textarea id="description" onChange={(e) => setDescription(e.target.value)} ></textarea>
            </div>
          </div>

          <div className="btn-group">
            <button className="btn cancel" type="button" onClick={() => navigate(-1)}>Cancel</button>
            <button className="btn save" type="submit">Create Complain</button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  )
}

export default NewComplain