import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../Header';
import Footer from '../Footer';
import Swal from 'sweetalert2';

function WorkerNotificationList() {
  const [notifications, setNotifications] = useState([]);
  const workerId = sessionStorage.getItem('userId'); // make sure userId is worker's ID

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Fetch worker notifications
  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`http://localhost:8090/notification-service/worker-notif/worker/${workerId}`);
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      Swal.fire('Error', 'Failed to fetch worker notifications.', 'error');
    }
  };

  // Mark a notification as read
  const handleMarkAsRead = async (notificationId) => {
    try {
      await axios.patch(`http://localhost:8090/notification-service/worker-notif/${notificationId}/mark-read`);
      Swal.fire('Success', 'Notification marked as read.', 'success');
      fetchNotifications(); // refresh list
    } catch (error) {
      console.error('Error updating notification status:', error);
      Swal.fire('Error', 'Failed to mark notification as read.', 'error');
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
            {notifications.map((notif) => (
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
                <p>Status: {notif.status}</p>
                {notif.status === 'Unread' && (
                  <button
                    onClick={() => handleMarkAsRead(notif.id)}
                    style={{
                      backgroundColor: '#007bff',
                      color: 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '5px',
                      cursor: 'pointer'
                    }}
                  >
                    Mark as Read
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

export default WorkerNotificationList;