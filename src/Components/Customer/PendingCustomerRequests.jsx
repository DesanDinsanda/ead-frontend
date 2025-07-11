import React, { useState, useEffect } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../../Css/customerRequest.css';
import { FileChartColumnIncreasing } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function PendingCustomerRequests() {
    const [contracts, setContracts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  // Modal control
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const status = "Pending";


  useEffect(() => {
    fetchContracts();
  }, []);

  const fetchContracts = async () => {
    try {
      const customerId = sessionStorage.getItem('userId');
      const response = await axios.get(`http://localhost:8089/contract-service/customers/contracts?status=${status}&id=${customerId}`);
      setContracts(response.data);
      setIsLoaded(true);
    } catch (error) {
      console.error("Error fetching Contracts:", error);
      Swal.fire('Error!', 'Failed to fetch the contract.', 'error');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8089/contract-service/customers/contracts/${selectedId}`);
      await Swal.fire(
                          'Deleted!',
                          'The complain has been deleted successfully.',
                          'success'
                        );
      setShowModal(false);
      fetchContracts(); // refresh the list
    } catch (error) {
      console.error("Error deleting contract:", error);
      if (error.response && error.response.status === 400) {
                    Swal.fire('Error!', error.response.data.message , 'error');
                  } else {
                    Swal.fire('Error!', 'Failed to delete the contract.', 'error');
                  }
    }
  };


  return (
    <>
    <Header />
      <div className='customerRequest'>
        <div className='newReq'>
          <div className='newReqText'>
            <h2>Pending Service Requests</h2>
            <p>View and manage all your service requests.</p>
          </div>
          <div className='newReqButton'>
            <Button variant="primary" onClick={() => navigate('/createRequest')}>New Request</Button>
          </div>
        </div>

        {contracts.length === 0 ? (
          <div className='requestList'>
            <FileChartColumnIncreasing size={50} />
            <h5>No service requests</h5>
            <p>Get started by creating a new service request.</p>
            <Button variant="primary" onClick={() => navigate('/createRequest')}>New Request</Button>
          </div>
        ) : (
          contracts.map((contract) => (
            <div className='serviceList' key={contract.id}>
              <div className='serviceDetails'>
                <h4>{contract.title} ({contract.request_status})</h4>
                <p>{contract.description}</p>
                <p>Location : {contract.addr_line_3}</p>
              </div>
              <div className='changeButtons'>
                <Button variant="primary" className='me-3' onClick={() => navigate(`/editCustomerRequest/${contract.id}`)}>Update</Button>
                <Button variant="danger" onClick={() => {
                  setSelectedId(contract.id);
                  setShowModal(true);
                }}>Delete</Button>
              </div>
            </div>
          ))
        )}
      </div>


      {/* Delete Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this request?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Footer />
    </>
  )
}

export default PendingCustomerRequests