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

function AcceptedCustomerRequests() {
  const [workerContracts, setworkerContracts] = useState([]);
   const [contracts, setContracts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  const status = "Accepted";




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

    try {
      const workerRes = await axios.get('http://localhost:8089/contract-service/worker/contracts?status=Accepted');
      setworkerContracts(workerRes.data);
    } catch (error) {
      console.error("Error fetching Contracts:", error);
      alert("Failed to fetch contracts");
    }

  };

  const handleReject = async (CcontractId) => {
    
   

  const result = await Swal.fire({
    title: 'Are you sure?',
    text: 'Do you really want to cancel this contract?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, cancel it!'
  });

  if (result.isConfirmed) {
    try {
        await axios.patch(`http://localhost:8089/contract-service/customer/contracts/${CcontractId}/status`, {
        status: 'Cancelled'
      });

      await Swal.fire(
        'Cancelled!',
        'The contract has been cancelled successfully.',
        'success'
      );

      fetchContracts();
    } catch (error) {
      console.error('Error cancelling contract:', error.response?.data || error.message);
      Swal.fire('Error!', 'Failed to cancel the contract.', 'error');
    }
  }
};


  return (
    <>
    <Header />
      <div className='customerRequest'>
        <div className='newReq'>
          <div className='newReqText'>
            <h2>My Service Requests</h2>
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
                <Button variant="danger"  onClick={() => handleReject(contract.id)} >Reject</Button>
              </div>
            </div>
          ))
        )}
      </div>


      

      <Footer />
    </>
  )
}

export default AcceptedCustomerRequests