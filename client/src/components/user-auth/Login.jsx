import React, { useState } from "react";
import axios from "axios";
const login = () => {
  //set user info to empty
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  //when user enters info into field
  const handleInputChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("clicked submit");
    try {
      await axios
        .post("http://localhost:3002/user-auth/login", user)
        .then((res) => {
          if (res.data.message) {
            window.alert(res.data.message);
            //alert user that error shows up
            console.log(res.data.message);
          }
          //if user is correct
          else {
            window.alert(`Successfully Logged In: ${res.data[0].username}`);
            localStorage.setItem("username", res.data[0].username);
          }
        });
    } catch (err) {
      console.log("Error: ", err);
    }
  };
  console.log("Login user state", user);
  return (
    <div>
      <form>
        <label>
          username:
          <input id="username" type="text" onChange={handleInputChange} />
        </label>
        <label>
          password:
          <input id="password" type="text" onChange={handleInputChange} />
        </label>
        <button onClick={handleSubmit}>Login</button>
      </form>
    </div>
  );
};

export default login;
