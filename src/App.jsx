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

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <Body/> */}
      <CustomerHome/>
      


    </>
  )
}

export default App
