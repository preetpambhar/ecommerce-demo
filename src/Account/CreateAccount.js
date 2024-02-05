import React, { useState } from 'react';
import './CreateAccount.css';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const Createaccount = ({ toggleForm }) => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();
    // Add logic for handling sign up (e.g., sending data to a server)
    console.log('Signing up with:', username, password);
    toast.success("Registered Successfuly");
    navigate('/account')
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
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
      <div className="form-footer">
        <p>
          Already have an account?{' '}
          <span className="form-link" onClick={toggleForm}>
            Login
          </span>
        </p>
      </div>
    </div>
  )
}
export default Createaccount;
