import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const CreateUserForm = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newUser) => axios.post("http://localhost:5000/users", newUser),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users"); // Update data if needed
        setName("");
        setAge("");
      },
    }
  );

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
