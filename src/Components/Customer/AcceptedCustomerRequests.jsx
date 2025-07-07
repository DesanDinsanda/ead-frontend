import React, { useState, useEffect } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import Button from 'react-bootstrap/Button';
import { FileChartColumnIncreasing } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../../Css/customerRequest.css';
import { MapPin,User,Phone,ListFilter } from 'lucide-react';

function AcceptedCustomerRequests() {
  const [contracts, setContracts] = useState([]);
  const navigate = useNavigate();
  const status = "Accepted";

  useEffect(() => {
    fetchContractsWithWorkerDetails();
  }, []);

  const fetchContractsWithWorkerDetails = async () => {
    try {
      const customerId = sessionStorage.getItem('userId');

      // 1. Get accepted customer contracts
      const response = await axios.get(`http://localhost:8089/contract-service/customer/contracts?status=${status}&id=${customerId}`);
      const customerContracts = response.data;

      // 2. Get all accepted worker contracts
      const workerContractsRes = await axios.get('http://localhost:8089/contract-service/worker/contracts?status=Accepted');
      const workerContracts = workerContractsRes.data;

      // 3. Get all workers
      const workersRes = await axios.get('http://localhost:8087/worker-app/workers');
      const allWorkers = workersRes.data;

      // 4. Combine data
      const contractsWithWorkers = customerContracts.map(contract => {
        const relatedWorkerContract = workerContracts.find(wc => wc.cust_contract_id === contract.id);
        const worker = relatedWorkerContract ? allWorkers.find(w => w.id === relatedWorkerContract.worker_id) : null;

        const workerName = worker ? worker.fname : 'Unknown';
        const workerPhone = worker ? worker.contact : 'N/A';
        const workerLocation = worker ? worker.location : 'N/A';

        return {
          ...contract,
          workerName,
          workerPhone,
          workerLocation,
        };
      });

      setContracts(contractsWithWorkers);
    } catch (error) {
      console.error("Error fetching contracts or workers:", error);
      alert("Failed to fetch contract or worker data.");
    }
  };

  const handleReject = async (contractId) => {
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
        await axios.patch(`http://localhost:8089/contract-service/customer/contracts/${contractId}/status`, {
          status: 'Cancelled'
        });

        Swal.fire('Cancelled!', 'The contract has been cancelled.', 'success');
        fetchContractsWithWorkerDetails(); // Refresh
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
            <h2>Accepted Service Requests</h2>
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
                <p style={{color:"grey", marginBottom:"1.2px"}}><User size={16} /> Accepted By: {contract.workerName}</p>
                <p style={{color:"grey", marginBottom:"1.2px"}}><MapPin size={16}></MapPin> Worker's Location: {contract.workerLocation}</p>
                <p style={{color:"grey", marginBottom:"1.2px"}}><Phone size={16}/> Phone: {contract.workerPhone}</p>
              </div>
              <div className='changeButtons'>
                <Button variant="primary" className='me-3 mb-2' onClick={() => navigate(`/editCustomerRequest/${contract.id}`)}>Update</Button>
                <Button variant="danger" onClick={() => handleReject(contract.id)}>Reject</Button>
              </div>
            </div>
          ))
        )}
      </div>
      <Footer />
    </>
  );
}

export default AcceptedCustomerRequests;
