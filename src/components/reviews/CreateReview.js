import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const CreateUserForm = () => {
  const [title, setTitle] = useState("");
  const [genre, setGenre  ] = useState("");
  const [text, setText] = useState(""); 
  const [rating, setRating] = useState(0);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newReview) => axios.post("http://localhost:3001/api/review", newReview),
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]); // Ensure this matches your query keys
      setTitle("");
      setGenre("");
      setText("");
      setRating(0);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ title, genre, text, rating });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Book Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <select value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value="fiction">Fiction</option>
          <option value="non-fiction">Non-Fiction</option>
          <option value="fantasy">Fantasy</option>
          <option value="sci-fi">Sci-Fi</option>
          <option value="mystery">Mystery</option>
            </select>
      <input
        type="text"
        placeholder="mystery"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        required
      />
            <input
        type="text"
        placeholder="review"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
          <input
          type="number"
          placeholder="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required  />
      <button type="submit" style={{ color: "yellow" }}>Submit</button>
    </form>
  );
};

export default CreateUserForm;
