import React from 'react'
import Header from '../Header'
import '../../Css/CustomerHome.css'

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

        <div>

        </div>
    </div>
    </>
  )
}

export default CustomerHome