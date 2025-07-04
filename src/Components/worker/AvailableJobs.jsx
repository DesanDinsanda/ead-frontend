import React, { useState, useEffect } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../../Css/customerRequest.css';
import { FileChartColumnIncreasing } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AvailableJobs() {

    const [contracts, setContracts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchContracts();
  }, []);

  const fetchContracts = async () => {
    try {
      const response = await axios.get('http://localhost:8089/contract-service/customer/contracts');
      setContracts(response.data);
      setIsLoaded(true);

    //   const response2 = await axios.get(`http://localhost:8086/customer-ms/customers/6/${contracts.customer_id}`);

    } catch (error) {
      console.error("Error fetching Contracts:", error);
      alert("Failed to fetch contracts");
    }
  };

  return (
    <>
    <Header />
      <div className='customerRequest'>
        <div className='newReq'>
          <div className='newReqText'>
            <h2>Available Jobs</h2>
            <p>Browse and accept new service requests from customers.</p>
          </div>
        </div>

        {contracts.length === 0 ? (
          <div className='requestList'>
            <FileChartColumnIncreasing size={50} />
            <h5>No Jobs</h5>
            <p>No any request</p>
          </div>
        ) : (
          contracts.map((contract) => (
            <div className='serviceList' key={contract.id}>
              <div className='serviceDetails'>
                <h4>{contract.title}</h4>
                <p>{contract.description}</p>
                <p>Location : {contract.addr_line_3}</p>
              </div>
              <div className='changeButtons'>
                <Button variant="primary" className='me-3' onClick={() => navigate(`/editCustomerRequest/${contract.id}`)}>Accept Job</Button>
              </div>
            </div>
          ))
        )}
      </div>

      <Footer />
    </>
  )
}

export default AvailableJobs