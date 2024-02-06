import React, { useEffect, useState } from "react";
import "./CreateAccount.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Createaccount = ({ toggleForm }) => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const existingUser = JSON.parse(localStorage.getItem("user")) || {};
    if (existingUser?.email) {
      // user is already logged in
      navigate("account");
    }
  });

  const handleSignUp = (e) => {
    e.preventDefault();
    // Add logic for handling sign up (e.g., sending data to a server)
    localStorage.setItem("user", JSON.stringify({ email: userEmail }));
    console.log("Signing up with:", userEmail, password);
    toast.success("Registered Successfuly");
    navigate("/account");
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Sign Up</h2>
      </div>
      <form className="form-group" onSubmit={handleSignUp}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};
export default Createaccount;
