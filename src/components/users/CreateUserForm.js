import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const CreateUserForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail  ] = useState("");
  const [password, setPassword] = useState(""); 

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newUser) => axios.post("http://localhost:3001", newUser),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]); // Ensure this matches your query keys
      setUsername("");
      setEmail("");
      setPassword("");
    },
    onError: (error) => {
      alert(error.response?.data?.message || "An error occurred");
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ username, email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="you@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
            <input
        type="text"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" style={{ color: "yellow" }}>Submit</button>
    </form>
  );
};

export default CreateUserForm;
