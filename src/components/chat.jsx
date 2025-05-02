import React, { useState, useEffect } from 'react';
import ChatSidebar from './chatSidebar';
import ChatWindow from './chatWindow';

const Chat = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const accessToken = localStorage.getItem('accessToken'); // Retrieve accessToken from local storage
      if (!accessToken) {
        console.error('No access token found');
        return;
      }

      const host = 'http://65.2.78.31:3000';
      try {
        const response = await fetch(`${host}/api/v1/users/getUsers`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });

        if (!response.ok) {
          throw new Error('Unauthorized');
        }

        const data = await response.json();
        console.log(data);
        setUsers(data.data); // Assuming the response contains a 'data' array with users
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="flex h-screen">
      <ChatSidebar users={users} setSelectedUser={setSelectedUser} />
      <ChatWindow selectedUser={selectedUser} />
    </div>
  );
};

export default Chat;