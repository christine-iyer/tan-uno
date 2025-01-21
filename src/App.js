import React from "react";
import CreateUserForm from "./components/users/CreateUserForm.js";
import ListUsersToEdit from "./components/users/ListUsersToEdit.js";
const App = () => {
  return (
    <div>
      <h1>Create User</h1>
      <CreateUserForm />
      <ListUsersToEdit />

    </div>
  );
};

export default App;
