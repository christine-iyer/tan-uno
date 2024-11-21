import React from 'react';
import { useQuery } from '@tanstack/react-query';

const fetchUsers = async () => {
  const response = await fetch("http://localhost:2028/api/users");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const ListUsers = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'], // Unique query key
    queryFn: fetchUsers, // Fetch function
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {data.map((user) => (
          <li key={user._id}>
            {user.name} ({user.age} years old)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListUsers;
