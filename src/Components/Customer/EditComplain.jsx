import React, { useEffect, useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../Css/EditComplain.css';
import Swal from 'sweetalert2';

function EditComplain() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [complainId, setComlainID] = useState('');
  const userId = sessionStorage.getItem('userId');

  useEffect(() => {
    fetchComplainDetails();
  }, []);

  const fetchComplainDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8085/complain-service/complains/${id}`);
      setTitle(response.data.title);
      setDescription(response.data.description);
      setComlainID(response.data.id);
    } catch (error) {
      console.error("Failed to fetch complain", error);
      alert("Failed to load complain details.");
    }
  };

  const handleComplain = async (e) => {
    e.preventDefault();

    const complain = {
      id: complainId,
      title:title,
      description:description,
      customerId: userId
    };

    try {
      const response = await axios.put('http://localhost:8085/complain-service/complains', complain);
      await Swal.fire(
                          'Updated!',
                          'The complain has been Updated successfully.',
                          'success'
                        );
      navigate("/Complain");
    } catch (error) {
      console.error("Error updating complain", error);
      Swal.fire('Error!', 'Failed to Update the account.', 'error');
    }
  };

  return (
    <>
      <Header />
      <div className='editCom'>
        <div className='editTitle'>
          <h2>Edit Complains</h2>
          <p>Update the details of your complaint.</p>
        </div>
        <form onSubmit={handleComplain}>
          <div className='editContent'>
            <div className='pairs'>
              <label htmlFor="title">Title</label><br />
              <input type="text"id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className='pairs'>
              <label htmlFor="description">Description</label><br />
              <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} ></textarea>
            </div>
          </div>

          <div className="btn-group">
            <button className="btn cancel" type="button" onClick={() => navigate(-1)}>Cancel</button>
            <button className="btn save" type="submit">Save Changes</button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default EditComplain;
