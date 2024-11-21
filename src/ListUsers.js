import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchUsers = async () => {
  const response = await axios.get('/api/users');
  return response.data;
};

const ListUsers = () => {
  const [showUsers, setShowUsers] = useState(false);
  
  const { data: users, isLoading, error } = useQuery(['users'], fetchUsers, {
    enabled: showUsers, // Fetch users only when `showUsers` is true
  });

  const handleShowUsers = () => {
    setShowUsers(true); // Enable the query
  };

  return (
    <div>
      <button onClick={handleShowUsers}>Show Users</button>
      
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      
      {users && (
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              {user.name} - {user.age}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListUsers;
