import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MyJobs.css';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import Swal from 'sweetalert2';


export default function ViewAcceptedContracts() {
  const navigate = useNavigate();
  
  const [workerContracts, setworkerContracts] = useState([]);
  const [customerContarcts, setcustomerContarcts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const workerId = sessionStorage.getItem('userId');

  const fetchContacts = async () => {
    try {
      const [customerRes, workerRes, allCustomersRes] = await Promise.all([
        axios.get('http://localhost:8089/contract-service/customer/contracts'),
        axios.get('http://localhost:8089/contract-service/worker/contracts?status=Accepted'),
        axios.get('http://localhost:8086/customer-ms/customers') 
      ]);

      const allWcontracts = workerRes.data;
      const filteredWcontarcts = allWcontracts.filter(wContact => wContact.worker_id == workerId);
      setworkerContracts(filteredWcontarcts);
      setcustomerContarcts(customerRes.data);
      setCustomers(allCustomersRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getTitle = (id) => {
    const cContact = customerContarcts.find(c => c.id === id);
    return cContact ? cContact.title : 'Unknown';
  };

  const getDescription = (id) => {
    const cContact = customerContarcts.find(c => c.id === id);
    return cContact ? cContact.description : 'Unknown';
  };

  const getCustomerName = (id) => {
  const contract = customerContarcts.find(c => c.id === id);
  if (!contract) return 'Unknown';

  const customer = customers.find(c => c.id === contract.customer_id);
  return customer ? customer.fname : 'Unknown';
  };

  
  const handleReject = async (WcontractId, CcontractId) => {
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
      await axios.patch(`http://localhost:8089/contract-service/worker/contracts/${WcontractId}/status`, {
        status: 'Cancelled'
      });

      await axios.patch(`http://localhost:8089/contract-service/customer/contracts/${CcontractId}/status`, {
        status: 'Cancelled'
      });

      await Swal.fire(
        'Cancelled!',
        'The contract has been cancelled successfully.',
        'success'
      );

      fetchContacts();
    } catch (error) {
      console.error('Error cancelling contract:', error.response?.data || error.message);
      Swal.fire('Error!', 'Failed to cancel the contract.', 'error');
    }
  }
};




  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <>
    <Header/>
    <div className="worker-contact-container">
      <h2>Accepted Contracts</h2>
      {workerContracts.length > 0 ? (
        <table className="skills-table">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {workerContracts
            
            .map((wContact) => (
              <tr key={wContact.id}>
                <td>{getCustomerName(wContact.cust_contract_id)}</td>
                <td>{getTitle(wContact.cust_contract_id)}</td>
                <td>{getDescription(wContact.cust_contract_id)}</td>
                <td>{wContact.job_status}</td>
                <td>
                  <button className="reject-btn" onClick={() => handleReject(wContact.id,wContact.cust_contract_id)} >Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No contracts found.</p>
      )}
      
    </div>

      
      <Footer/>
    </>
  );
}
