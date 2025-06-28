import React from 'react'
import Header from './Header'
import '../Css/Body.css'

function Body() {
  return (
    <>
    <Header/>
    <div class="title">
    <div class="content">
      <h1>ServiceConnect</h1>
      <p>The easiest way to find reliable service professionals for all your home maintenance and improvement needs.</p>
      <div class="buttons">
        <a href="#" class="btn primary">Get Started</a>
      </div>
    </div>
  </div>

  <div className='info'>
    <div className='infoDetails'>
        <h1></h1>
    </div>
    <div>

    </div>
  </div>
    </>
  )
}

export default Body