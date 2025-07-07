import React from 'react'
import Header from './Header'
import '../Css/Body.css'
import plumber from '../images/plumber.jpg';
import electric from '../images/electric.jpg';
import landscape from '../images/landscape.jpg';
import homeCleaning from '../images/homeCleaning.jpg';
import flooring from '../images/flooring.jpg';
import painting from '../images/painting.jpg';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';





function Body() {
  const navigate = useNavigate();
  const serviceCard = [ {
    id:1,
    imgsrc:plumber,
    name:"Plumbing Services",
    desc:"Fix leaky pipes, install fixtures, and resolve all your plumbing issues."
  },
  {
    id:2,
    imgsrc:electric,
    name:"Electrical Work",
    desc:"Installation, maintenance and repair of electrical systems and fixtures."
  },
  {
    id:3,
    imgsrc:landscape,
    name:"Landscaping",
    desc:"Tree trimming, lawn maintenance, and garden design services."
  },
  {
    id:4,
    imgsrc:homeCleaning,
    name:"Home Cleaning",
    desc:"Professional cleaning services for your entire home or specific areas."
  },
  {
    id:5,
    imgsrc:flooring,
    name:"Flooring Installation",
    desc:"Expert installation of tile, hardwood, laminate, and other flooring types."
  },
  {
    id:6,
    imgsrc:painting,
    name:"Painting Services",
    desc:"Interior and exterior painting services with premium quality materials."
  },

]
  return (
    <>
    <Header/>
    <div class="title">
    <div class="content">
      <h1>ServiceConnect</h1>
      <p>The easiest way to find reliable service professionals for all your home maintenance and improvement needs.</p>
      <div class="buttons">
        <a  class="btn primary" onClick={() => navigate('/signup')}>Get Started</a>
      </div>
    </div>
  </div>

  <div className='info'>    
    <div className='infoDetails'>
        <h1>How ServiceConnect Works</h1>
        <p>Our platform makes it easy to connect with skilled professionals in just a few simple steps.</p>
    </div>
    <br />
    <div className='infoBox'>
        <div className='box'>
            <h4>1.Request a service</h4>
            <p>Fill out our simple form with details about the service you need and your location.</p>
            
        </div>
        <div className='box'>
            <h4>2.Get Connected</h4>
            <p>Available professionals in your area will see your request and can accept the job.</p>

        </div>
        <div className='box'>
            <h4>3.Job Complete</h4>
            <p>Once the service is complete, you can rate and review the professional's work.</p>
        </div>
    </div>
  </div>

  <div className='serviceImageContainer'>
    <div className='description'>
      <h1>Our Services</h1>
      <p>We connect you with professionals across a wide range of home services</p>
    </div>

    <div className='cardGrid'>
        {serviceCard.map((serviceCards)=>(
          <div className='card'>
        <img src={serviceCards.imgsrc} alt="" className='serviceImg'/>
        <h2>{serviceCards.name}</h2>
        
        <p>{serviceCards.desc}</p>

        </div>
        ))}
    </div>
  </div>

  <Footer/>
    </>
  )
}

export default Body