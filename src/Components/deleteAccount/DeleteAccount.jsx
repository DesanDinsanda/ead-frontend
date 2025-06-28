import React from 'react';
import axios from 'axios';

export default function DeleteAccount() {

    const handleDelete = async () => {
    const customerId = sessionStorage.getItem('customerId');
    try {
      await axios.delete(`http://localhost:8086/rest-app/customers/${customerId}`);
      alert("Account deleted successfully!");
      sessionStorage.clear();
    } catch (error) {
      alert("Error deleting account.");
    }
  };

  return (
    <button onClick={handleDelete}>Delete My Account</button>
  )
}
