import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const UserList = () => {
  const queryClient = useQueryClient();

  // Fetch reviews
  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:3001/api/review");
      return response.data;
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({ _id, updatedReview }) =>
      axios.put(`http://localhost:3001/api/review/${_id}`, updatedReview),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (_id) => axios.delete(`http://localhost:3001/api/review/${_id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });

  // Editable state for inline editing
  const [editableReview, setEditableReview] = useState(null);
  const [tempTitle, setTempTitle] = useState("");
  const [tempGenre, setTempGenre] = useState("");
  const [tempText, setTempText] = useState("");

  const handleEditClick = (review) => {
    setEditableReview(review._id);
    setTempTitle(review.tempText);
    setTempGenre(review.tempGenre);
    setTempText(review.tempText);
    
  };

  const handleSaveClick = (review) => {
    updateMutation.mutate({
      _id: review._id,
      updatedUser: { username: tempTitle, email: tempGenre, password: Text },
    });
    setEditableReview(null); // Exit edit mode
  };

  const handleCancelClick = () => {
    setEditableReview(null); // Exit edit mode
  };

  const handleDelete = (_id) => {
    deleteMutation.mutate(_id);
  };

  return (
    <div>
      <ul>
        {reviews.map((review) => (
          <li key={review._id}>
            {editableReview === review._id ? (
              <>
                <input
                  type="text"
                  value={tempTitle}
                  onChange={(e) => setTempTitle(e.target.value)}
                />
                <input
                  type="text"
                  value={tempGenre}
                  onChange={(e) => setTempGenre(e.target.value)}
                />
                <input
                  type="text"
                  value={Text}
                  onChange={(e) => setTempText(e.target.value)}/>
                <button onClick={() => handleSaveClick(review)}>Save</button>
                <button onClick={handleCancelClick}>Cancel</button>
              </>
            ) : (
              <>
                <span>
                  {review.reviewname} - {review.email} - {review.password}
                </span>
                <button onClick={() => handleEditClick(review)}>Edit</button>
                <button onClick={() => handleDelete(review._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
