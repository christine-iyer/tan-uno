import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const UserList = () => {
  const queryClient = useQueryClient();

  // Fetch users
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:2028/api/users");
      return response.data;
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({ _id, updatedUser }) =>
      axios.put(`http://localhost:2028/api/users/${_id}`, updatedUser),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (_id) => axios.delete(`http://localhost:2028/api/users/${_id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  // Editable state for inline editing
  const [editableUser, setEditableUser] = useState(null);
  const [tempName, setTempName] = useState("");
  const [tempAge, setTempAge] = useState("");

  const handleEditClick = (user) => {
    setEditableUser(user._id);
    setTempName(user.name);
    setTempAge(user.age);
  };

  const handleSaveClick = (user) => {
    updateMutation.mutate({
      _id: user._id,
      updatedUser: { name: tempName, age: Number(tempAge) },
    });
    setEditableUser(null); // Exit edit mode
  };

  const handleCancelClick = () => {
    setEditableUser(null); // Exit edit mode
  };

  const handleDelete = (_id) => {
    deleteMutation.mutate(_id);
  };

  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {editableUser === user._id ? (
              <>
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                />
                <input
                  type="number"
                  value={tempAge}
                  onChange={(e) => setTempAge(e.target.value)}
                />
                <button onClick={() => handleSaveClick(user)}>Save</button>
                <button onClick={handleCancelClick}>Cancel</button>
              </>
            ) : (
              <>
                <span>
                  {user.name} - {user.age}
                </span>
                <button onClick={() => handleEditClick(user)}>Edit</button>
                <button onClick={() => handleDelete(user._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
