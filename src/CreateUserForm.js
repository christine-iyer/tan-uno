import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const CreateUserForm = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newUser) => axios.post("http://localhost:2028/api/users", newUser),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]); // Ensure this matches your query keys
      setName("");
      setAge("");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ name, age: Number(age) });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateUserForm;
