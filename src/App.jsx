import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Components/Header'
import Body from './Components/Body'
import Signup from './Components/signup/Signup'
import Login from './Components/login/Login'
import ViewAccount from './Components/viewAccount/ViewAccount'
import UpdateAccount from './Components/updateAccount/UpdateAccount'
import DeleteAccount from './Components/deleteAccount/DeleteAccount'
import Footer from './Components/Footer'
import CustomerHome from './Components/Customer/CustomerHome'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      

      <Router>
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/customer-home" element={<CustomerHome />} />
        
      </Routes>
    </Router>
      


    </>
  )
}

export default App
