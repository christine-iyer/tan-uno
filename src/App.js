import React from "react";
import CreateUserForm from "./CreateUserForm.js";
import ListUsers from "./ListUsers.js"
import ListUsersToEdit from "./ListUsersToEdit.js";
const App = () => {
  return (
    <div>
      <h1>Create User</h1>
      <CreateUserForm />
      <ListUsers/>
<ListUsersToEdit/> 

    </div>
  );
};

export default App;
