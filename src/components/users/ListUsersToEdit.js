import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const UserList = () => {
  const queryClient = useQueryClient();

  // Fetch users
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:3001/api/user");
      return response.data;
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({ _id, updatedUser }) =>
      axios.put(`http://localhost:3001/api/user/${_id}`, updatedUser),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (_id) => axios.delete(`http://localhost:3001/api/user/${_id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  // Editable state for inline editing
  const [editableUser, setEditableUser] = useState(null);
  const [tempUsername, setTempUsername] = useState("");
  const [tempEmail, setTempEmail] = useState("");
  const [tempPassword, setTempPassword] = useState("");

  const handleEditClick = (user) => {
    setEditableUser(user._id);
    setTempUsername(user.username);
    setTempEmail(user.email);
    setTempPassword(user.password);
  };

  const handleSaveClick = (user) => {
    updateMutation.mutate({
      _id: user._id,
      updatedUser: { username: tempUsername, email: tempEmail, password: tempPassword },
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
                  value={tempUsername}
                  onChange={(e) => setTempUsername(e.target.value)}
                />
                <input
                  type="text"
                  value={tempEmail}
                  onChange={(e) => setTempEmail(e.target.value)}
                />
                <input
                  type="text"
                  value={tempPassword}
                  onChange={(e) => setTempPassword(e.target.value)}/>
                <button onClick={() => handleSaveClick(user)}>Save</button>
                <button onClick={handleCancelClick}>Cancel</button>
              </>
            ) : (
              <>
                <span>
                  {user.username} - {user.email} - {user.password}
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
