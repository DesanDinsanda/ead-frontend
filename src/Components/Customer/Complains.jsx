import React, { useEffect, useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FileChartColumnIncreasing } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../Css/customerRequest.css';
import Swal from 'sweetalert2';

function Complains() {
  const [complains, setComplains] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedComplainId, setSelectedComplainId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchComplains();
  }, []);

  const fetchComplains = async () => {
    try {
      const customerId = sessionStorage.getItem('userId');
      const response = await axios.get(`http://localhost:8085/complain-service/complains?id=${customerId}`);
      setComplains(response.data);
      setIsLoaded(true);
    } catch (error) {
      console.error("Error fetching Complains:", error);
      Swal.fire('Error!', 'Failed to fetch the complains.', 'error');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8085/complain-service/complains/${selectedComplainId}`);
      await Swal.fire(
                          'Deleted!',
                          'The complain has been deleted successfully.',
                          'success'
                          );
      setShowModal(false);
      fetchComplains(); // refresh list
    } catch (error) {
      console.error("Error deleting complain:", error);
      Swal.fire('Error!', 'Failed to delete the complain.', 'error');
    }
  };

  const handleShowModal = (complainId) => {
    setSelectedComplainId(complainId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedComplainId(null);
  };

  return (
    <>
      <Header />
      <div className='customerRequest'>
        <div className='newReq'>
          <div className='newReqText'>
            <h2>My Complains</h2>
            <p>View and manage your complain about services</p>
          </div>
          <div className='newReqButton'>
            <Button variant="primary" onClick={() => navigate('/newComplain')}>New Complain</Button>
          </div>
        </div>

        {complains.length === 0 ? (
          <div className='requestList'>
            <FileChartColumnIncreasing size={50} />
            <h5>No complains</h5>
            <p>You have not submitted any complain yet.</p>
            <Button variant="primary">Submit a complain</Button>
          </div>
        ) : (
          complains.map((complain) => (
            <div className='serviceList' key={complain.id}>
              <div className='serviceDetails'>
                <h4>{complain.title} ({complain.status})</h4>
                <p>{complain.description}</p>
                <p>Date : {complain.date}</p>
              </div>
              <div className='changeButtons'>
                <Button variant="primary" className='me-3' onClick={() => navigate(`/editComplain/${complain.id}`)}>Update</Button>
                <Button variant="danger" onClick={() => handleShowModal(complain.id)}>Delete</Button>
              </div>
            </div>
          ))
        )}

        {/* Delete Confirmation Modal */}
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this complain?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <Footer />
    </>
  );
}

export default Complains;


