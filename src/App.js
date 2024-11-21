import React from "react";
import CreateUserForm from "./CreateUserForm.js";
// import ListUsers from "./ListUsers.js"
import EditForm from "./EditForm.js"
const App = () => {
  return (
    <div>
      <h1>Create User</h1>
      <CreateUserForm />
     {/* <ListUsers/>  */}
  <EditForm/>
    </div>
  );
};

export default App;
