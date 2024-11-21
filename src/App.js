import React from "react";
import CreateUserForm from "./CreateUserForm.js";
import ListUsers from "./ListUsers.js"

const App = () => {
  return (
    <div>
      <h1>Create User</h1>
      <CreateUserForm />
 <ListUsers/> 
    </div>
  );
};

export default App;
