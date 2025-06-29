import React from 'react'
import Header from '../Header'
import '../../Css/CustomerHome.css'
import Footer from '../Footer'
import { CirclePlus,FileChartColumnIncreasing,SendHorizontal } from 'lucide-react';


function CustomerHome() {
  return (
    <>
    <Header/>
    <div className='mainContainer'>
        <div className='welcome'>
            <h2>Wecome, Desan</h2>
            <p>Here's what's happening with your service requests.</p>
            <div className='welcomeBoxes'>
                <div className='statbox'>
                    <h3>Active Requests</h3>
                    <p>3</p>
                </div>
                <div className='statbox'>
                    <h3>Completed Requests</h3>
                    <p>13</p>
                </div>
                <div className='statbox'>
                    <h3>Active Complaints</h3>
                    <p>1</p>
                </div>
                <div className='statbox'>
                    <h3>Resolved Complaints</h3>
                    <p>5</p>
                </div>
            </div>
        </div>

        <div className='quickActions'>
            <h2>Quick Actions</h2>

            <div className='allBoxes'>
            <div className='actionBox'>
                
                <div className='customerIcon'>
                    <CirclePlus  />
                </div>
                <div>
                    <h5>Create new service request</h5>
                <p>get help with your home tasks</p>
                </div>
                
            </div>
            <div className='actionBox'>
                <div className='customerIcon'>
                    <FileChartColumnIncreasing />
                </div>
                <div>
                    <h5>View all service requests</h5>
                    <p>Manage youe existing request</p>
                </div>
                
            </div>
            <div className='actionBox'>
                <div className='customerIcon'>
                    <SendHorizontal />
                </div>
                <div>
                <h5>Submi a complain </h5>
                <p>Report issues with service</p>
                </div>
                
            </div>
            </div>

        </div>
    </div>
    <Footer/>
    
    </>
  )
}

export default CustomerHome