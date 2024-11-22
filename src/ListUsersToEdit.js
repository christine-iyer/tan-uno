import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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

const ListUsersToEdit = ({ users }) => {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: '', age: '' });

  // Mutation for updating user data
  const mutation = useMutation(updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['users']); // Refresh the user list
    },
    onError: (error) => {
      // Handle error when mutation fails
      console.error('Error updating user:', error);
      alert(`Error: ${error.message}`);
    },
  });

  const handleEdit = (user) => {
    setEditingId(user._id);
    setFormData({ name: user.name, age: user.age });
  };

  const handleSave = () => {
    if (!formData.name || !formData.age) {
      alert('Name and Age are required');
      return;
    }
    mutation.mutate({ id: editingId, ...formData });
    setEditingId(null); // Exit editing mode after save
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <ul>
      {users.map((user) => (
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
              <button onClick={handleSave}>Save</button>
              <button onClick={() => setEditingId(null)}>Cancel</button>
            </div>
          ) : (
            <div>
              {user.name} ({user.age} years old)
              <button onClick={() => handleEdit(user)}>Edit</button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ListUsersToEdit;
