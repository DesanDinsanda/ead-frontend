import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../Header';
import Footer from '../Footer';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { MapPin,User,Phone,ListFilter,CalendarDays,Clock3,BookCheck } from 'lucide-react';

function CustomerNotificationList() {
  const [notifications, setNotifications] = useState([]);
  const customerId = sessionStorage.getItem('userId');
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Fetch notifications for the logged-in customer
  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`http://localhost:8090/notification-service/customer-notif/customer/${customerId}`);
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      Swal.fire('Error', 'Failed to fetch notifications1.', 'error');
    }
  };

  // Mark a notification as read
   const handleNotificationClick = async (notif) => {
    try {
      await axios.patch(`http://localhost:8090/notification-service/customer-notif/${notif.id}/mark-read`);

      // Redirect based on title
      if (notif.title === 'Your contract has been accepted') {
        navigate('/AcceptedCustomerRequests');
      } else if (notif.title === 'Your contract was cancelled') {
        navigate('/CancelledCustomerRequests');
      } else {
        // fallback or other titles
        fetchNotifications(); // just refresh
      }

    } catch (error) {
      console.error('Error updating notification status:', error);
      Swal.fire('Error', 'Failed to update notification.', 'error');
    }
  };

  return (
    <>
      <Header />
      <div className="notification-container" style={{ padding: '30px' }}>
        <h2>My Notifications</h2>

        {notifications.length === 0 ? (
          <p>No notifications available.</p>
        ) : (
          <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
  {[...notifications]
    .sort((a, b) => {
      if (a.status === 'Unread' && b.status !== 'Unread') return -1;
      if (a.status !== 'Unread' && b.status === 'Unread') return 1;
      return 0;
    })
    .map((notif) => (
      <li
        key={notif.id}
        style={{
          backgroundColor: notif.status === 'Unread' ? '#f2f2f2' : '#d4edda',
          padding: '15px',
          marginBottom: '10px',
          borderRadius: '5px',
          border: '1px solid #ccc'
        }}
      >
        <strong>{notif.title}</strong>
        <p>{notif.description}</p>
        <p style={{ color: "grey", marginBottom: "1.2px" }}><CalendarDays size={16} /> Date : {notif.date}</p>
        <p style={{ color: "grey", marginBottom: "1.2px" }}><Clock3 size={16} /> Time : {notif.time}</p>
        <p style={{ color: "grey", marginBottom: "1.2px" }}><BookCheck size={16} /> Status: {notif.status}</p>
        {notif.status === 'Unread' && (
          <button
            onClick={() => handleNotificationClick(notif)}
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Mark as Read & View
          </button>
        )}
      </li>
    ))}
</ul>

        )}
      </div>
      <Footer />
    </>
  );
}

export default CustomerNotificationList;