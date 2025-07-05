import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MyJobs.css';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import Swal from 'sweetalert2';


export default function ViewRejectedContracts() {
  const navigate = useNavigate();
  
  const [workerContracts, setworkerContracts] = useState([]);
  const [customerContarcts, setcustomerContarcts] = useState([]);
  const workerId = sessionStorage.getItem('userId');

  const fetchContacts = async () => {
    try {
      const [customerRes, workerRes] = await Promise.all([
        axios.get('http://localhost:8089/contract-service/customer/contracts'),
        axios.get('http://localhost:8089/contract-service/worker/contracts?status=Cancelled') 
      ]);

      const allWcontracts = workerRes.data;
      const filteredWcontarcts = allWcontracts.filter(wContact => wContact.worker_id == workerId);
      setworkerContracts(filteredWcontarcts);
      setcustomerContarcts(customerRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getTitle = (id) => {
    const cContact = customerContarcts.find(c => c.id === id);
    return cContact.title ? cContact.title : 'Unknown';
  };

  const getDescription = (id) => {
    const cContact = customerContarcts.find(c => c.id === id);
    return cContact.description ? cContact.description : 'Unknown';
  };

  
  




  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <>
    <Header/>
    <div className="worker-contact-container">
      <h2>Rejected Contracts</h2>
      {workerContracts.length > 0 ? (
        <table className="skills-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {workerContracts
            
            .map((wContact) => (
              <tr key={wContact.id}>
                <td>{getTitle(wContact.cust_contract_id)}</td>
                <td>{getDescription(wContact.cust_contract_id)}</td>
                <td>{wContact.job_status}</td>
                
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
