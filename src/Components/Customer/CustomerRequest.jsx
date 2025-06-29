import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import Button from 'react-bootstrap/Button';
import '../../Css/customerRequest.css'
import {FileChartColumnIncreasing } from 'lucide-react';

function CustomerRequest() {
  return (
    <>
    <Header/>

    <div className='customerRequest'>
        <div className='newReq'>
            <div className='newReqText'>
                <h2>My Service Requests</h2>
                <p>View and manage all your service requests.</p>
            </div>
            <div className='newReqButton'>
                <Button variant="primary">New Request</Button>
            </div>
        </div>

        <div className='requestList'>
          <FileChartColumnIncreasing size={50}/>
          <h5>No service requests</h5>
          <p>Get started by creating a new service request.</p>
          <Button variant="primary">New Request</Button>
        </div>
    </div>

    <Footer/>
    </>
  )
}

export default CustomerRequest