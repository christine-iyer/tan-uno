import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// Function to update the user via API
const updateUser = async ({ id, name, age }) => {
  const response = await fetch(`http://localhost:2028/api/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, age }),
  });

  if (!response.ok) {
    throw new Error('Failed to update user');
  }

  return response.json();
};

// Custom hook for the mutation
const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation(updateUser, {
    onSuccess: (data) => {
      console.log('User updated successfully:', data);
      queryClient.invalidateQueries(['users']); // Refresh the users query
    },
    onError: (error) => {
      console.error('Error updating user:', error.message);
      alert(`Error: ${error.message}`);
    },
  });
};

const ListUsersToEdit = ({ users }) => {
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: '', age: '' });

  const { mutate: updateUser, isLoading } = useUpdateUser();

  const handleEdit = (user) => {
    setEditingId(user._id);
    setFormData({ name: user.name, age: user.age });
  };

  const handleSave = () => {
    if (!formData.name || !formData.age) {
      alert('Name and Age are required');
      return;
    }
    updateUser({ id: editingId, ...formData });
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <ul>
      {users && users.length > 0 ? (
        users.map((user) => (
          <li key={user._id}>
            {editingId === user._id ? (
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                />
                <button onClick={handleSave} disabled={isLoading}>
                  Save
                </button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                {user.name} ({user.age} years old)
                <button onClick={() => handleEdit(user)}>Edit</button>
              </div>
            )}
          </li>
        ))
      ) : (
        <div>No users available.</div>
      )}
    </ul>
  );
};

export default ListUsersToEdit;