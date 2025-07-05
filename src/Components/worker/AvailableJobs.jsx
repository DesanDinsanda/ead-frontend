import React, { useState, useEffect } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../../Css/customerRequest.css';
import { FileChartColumnIncreasing } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MapPin,User,Phone,ListFilter } from 'lucide-react';

function AvailableJobs() {

  const [contracts, setContracts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedServiceType, setSelectedServiceType] = useState('');
  const [serviceCategories, setServiceCategories] = useState([]);
  const pending = "Pending";
  const accepted = "Accepted";
  const userId = sessionStorage.getItem('userId');



  useEffect(() => {
  fetchContracts();
  }, []);

const fetchContracts = async () => {
  try {
    const response = await axios.get(`http://localhost:8089/contract-service/customer/contracts?status=${pending}`);
    const contracts = response.data;

    const customerRes = await axios.get('http://localhost:8086/customer-ms/customers');
    const customers = customerRes.data;

    const contractsWithCustomer = contracts.map(contract => {
    const customer = customers.find(c => c.id === contract.customer_id);
    const customerName = customer ? `${customer.fname} ${customer.lname}` : "Unknown";
    const customerContact = customer ? customer.contact : "N/A";
    return {
       ...contract, customerName, customerContact 
    };
    });

    setContracts(contractsWithCustomer);
    setIsLoaded(true);

  } catch (error) {
    console.error("Error fetching contracts or customers:", error);
    alert("Failed to fetch data");
  }
};

const handleSearch = async () => {
  try {
    const url = searchTerm.trim()
      ? `http://localhost:8089/contract-service/customer/contracts?keyword=${encodeURIComponent(searchTerm)}`
      : 'http://localhost:8089/contract-service/customer/contracts';

    const response = await axios.get(url);
    const contracts = response.data;

    const customerRes = await axios.get('http://localhost:8086/customer-ms/customers');
    const customers = customerRes.data;

    const contractsWithCustomer = contracts.map(contract => {
    const customer = customers.find(c => c.id === contract.customer_id);
    const customerName = customer ? `${customer.fname} ${customer.lname}` : "Unknown";
    const customerContact = customer ? customer.contact : "N/A";
      return {
        ...contract,
        customerName,
        customerContact
      };
    });

    setContracts(contractsWithCustomer);
  } catch (error) {
    console.error("Error during search:", error);
    alert("Failed to perform search.");
  }
};

const fetchServiceCategories = async () => {
  try {
    const response = await axios.get('http://localhost:8088/ServiceManagement-EAD/categories');
    setServiceCategories(response.data);
  } catch (error) {
    console.error("Error fetching service categories:", error);
    alert("Failed to load service categories");
  }
};

const getContractForCategory = async ()=>{
    try {
      const response = await axios.get(`http://localhost:8089/contract-service/customer/contracts?servId=${selectedServiceType}`);
      const contracts = response.data;

      const customerRes = await axios.get('http://localhost:8086/customer-ms/customers');
      const customers = customerRes.data;

      const contractsWithCustomer = contracts.map(contract => {
        const customer = customers.find(c => c.id === contract.customer_id);
        const customerName = customer ? `${customer.fname} ${customer.lname}` : "Unknown";
        const customerContact = customer ? customer.contact : "N/A";
        return {
          ...contract,
          customerName,
          customerContact
        };
      });

      setContracts(contractsWithCustomer);
      setShowFilterModal(false);
    } catch (error) {
      console.error("Error filtering by service type:", error);
      alert("Failed to filter by service type");
    }
  }


  const acceptJob = async (contractId) => {
  try {
    await axios.post('http://localhost:8089/contract-service/worker/contracts', {
      cust_contract_id: contractId,
      worker_id: userId,
      job_status: accepted
    });
    alert("Job Accepted");
    navigate('/availableJobs');

  } catch (error) {
    console.error("Accept failed:", error);
    alert("Failed to accept contract.");
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
          <div className='searchBar'>
            <ListFilter size={36} style={{ marginRight: 25 }} onClick={() => {
              fetchServiceCategories(); 
              setShowFilterModal(true);
              }}
/>
            <input type="text" style={{marginRight:10, width:500}} placeholder="Search by Keyword" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
            <Button variant="primary" onClick={handleSearch}>Search</Button>

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
                <p style={{marginBottom:"20px"}}>{contract.description}</p>
                <p style={{color:"grey", marginBottom:"1.2px"}}><MapPin size={16}  /> Location : {contract.addr_line_3}</p>
                <p style={{color:"grey", marginBottom:"1.2px"}}><User size={16} /> Customer: {contract.customerName}</p>
                <p style={{color:"grey", marginBottom:"1.2px"}}><Phone size={16}/> Contact Number: {contract.customerContact}</p>
              </div>
              <div className='changeButtons'>
                <Button variant="primary" className='me-3' onClick={() => acceptJob(contract.id)}>Accept Job</Button>
              </div>
            </div>
          ))
        )}
      </div>

      <Footer />

      <Modal show={showFilterModal} onHide={() => setShowFilterModal(false)} centered>
  <Modal.Header closeButton>
    <Modal.Title>Select Service Type</Modal.Title>
  </Modal.Header>
  <Modal.Body>
  {serviceCategories.length > 0 ? (
    serviceCategories.map((category) => (
      <div key={category.id}>
        <label>
          <input type="radio" name="serviceType" value={category.id} checked={selectedServiceType === category.id.toString()} onChange={(e) => setSelectedServiceType(e.target.value)}/>
          {category.name}
        </label>
      </div>
    ))
  ) : (
    <p>Loading service types...</p>
  )}
</Modal.Body>

  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowFilterModal(false)}> Close </Button>
    <Button variant="primary" onClick={getContractForCategory}> Searchs </Button>
  </Modal.Footer>
</Modal>

    </>
  )
}

export default AvailableJobs