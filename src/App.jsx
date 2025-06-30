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
import CustomerRequest from './Components/Customer/CustomerRequest'
<<<<<<< Updated upstream
import WorkerHome from './Components/worker/WorkerHome'
=======
import EditRequest from './Components/Customer/EditRequest'
import Complains from './Components/Customer/Complains'
>>>>>>> Stashed changes

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      

      <Router>
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/home" element={<Body/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/customer-home" element={<CustomerHome />} />
        <Route path="/worker-home" element={<WorkerHome />} />
        <Route path="/dashboard" element={<CustomerHome/>} />
        <Route path="/customerRequest" element={<CustomerRequest/>} />
        <Route path="/profile" element={<ViewAccount />} />
        <Route path="/update" element={<UpdateAccount />} />
        <Route path="/delete" element={<DeleteAccount />} />
        <Route path="/ServiceConnect" element={<Body/>} />
        <Route path="/MyRequest" element={<CustomerRequest/>} />
        <Route path="/editCustomerRequest/:id" element={<EditRequest/>} />
        <Route path="/editCustomerRequest" element={<EditRequest/>} />
        <Route path="/Complain" element={<Complains/>} />
        
      </Routes>
    </Router>
      


    </>
  )
}

export default App
