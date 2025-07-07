import React from 'react';
import axios from 'axios';
import './deleteAccount.css';
import Header from '../Header';
import Footer from '../Footer';
import { useNavigate } from 'react-router-dom'; 
import Swal from 'sweetalert2';

export default function DeleteAccount() {
  const navigate = useNavigate(); 

  const handleDelete = async (e) => {
    e.preventDefault(); 

    const userId = sessionStorage.getItem('userId');
    const userType = sessionStorage.getItem('userType');

    const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you really want to Delete this account?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, Delete it!'
          });
    
          if (!result.isConfirmed) return;

    // Choose correct endpoint based on user type
    const endpoint = userType === 'worker'
      ? `http://localhost:8087/worker-app/workers/${userId}`
      : `http://localhost:8086/customer-ms/customers/${userId}`;

    try {
      await axios.delete(endpoint);
      await Swal.fire(
                    'Deleted!',
                    'The account has been Deleted successfully.',
                    'success'
                  );
      sessionStorage.clear();
      navigate('/'); 
    } catch (error) {
      console.error("Delete error:", error);
      Swal.fire('Error!', 'Failed to Delete the account.', 'error');
    }
  };

  return (
    <>
      <Header />
      <div className='delete-container'>
        <form className='delete-form'>
          <h2 className='delete-title'>Confirm Delete</h2>
          <span className='delete-message'>Are you sure you want to delete this account?</span>
          
          <button type="button" className='delete-button' onClick={handleDelete}>
            Delete My Account
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}
