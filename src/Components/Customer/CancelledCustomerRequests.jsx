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

function CancelledCustomerRequests() {
  const [contracts, setContracts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  // Modal control
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const status = "Cancelled";
  // const pending = "Pending";

  //Repost
  const [formData, setFormData] = useState({
        // id:'',
      title: '',
      description: '',
      addr_line_1: '',
      addr_line_2: '',
      addr_line_3: '',
      // service_id: '',
      // customer_id:'',
      // request_status:''
  
  
    });
    const repost = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8089/contract-service/customer/contracts/${id}`);
    const data = response.data;

    await axios.put('http://localhost:8089/contract-service/customer/contracts', {
      id: data.id,
      title: data.title,
      description: data.description,
      addr_line_1: data.addr_line_1,
      addr_line_2: data.addr_line_2,
      addr_line_3: data.addr_line_3,
      service_id: data.service_id,
      customer_id: data.customer_id,
      request_status: "Pending"
    });

    await Swal.fire(
                  'Reposted!',
                  'The contract has been reposted successfully.',
                  'success'
                  );
    fetchContracts(); 
  } catch (error) {
    console.error("Error fetching contract:", error);
    Swal.fire('Error!', 'Failed to repost the contact.', 'error');
  }
};



  useEffect(() => {
    fetchContracts();
  }, []);

  const fetchContracts = async () => {
    try {
      const customerId = sessionStorage.getItem('userId');
      const response = await axios.get(`http://localhost:8089/contract-service/customer/contracts?status=${status}&id=${customerId}`);
      setContracts(response.data);
      setIsLoaded(true);
    } catch (error) {
      console.error("Error fetching Contracts:", error);
      alert("Failed to fetch contracts");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8089/contract-service/customer/contracts/${selectedId}`);
      await Swal.fire(
                    'Deleted!',
                    'The contract has been deleted successfully.',
                    'success'
                    );
      setShowModal(false);
      fetchContracts(); // refresh the list
    } catch (error) {
      console.error("Error deleting contract:", error);
      Swal.fire('Error!', 'Failed to delete the contact.', 'error');
    }
  };


  return (
    <>
    <Header />
      <div className='customerRequest'>
        <div className='newReq'>
          <div className='newReqText'>
            <h2>Cancelled Service Requests</h2>
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
                <Button variant="primary" className='me-3' onClick={() => repost(contract.id)}>Repost</Button>
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

export default CancelledCustomerRequests