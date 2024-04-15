import React, { useState } from "react";
//import "./Login.css"; // Assuming you have a CSS file for styling
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        toast.success("Logged in successfully");
        navigate("/account"); // Redirect to the account page upon successful login
      } else {
        const data = await response.json();
        toast.error(data.message || "Failed to log in");
      }
    } catch (error) {
      console.error("Error logging in:", error.message);
      toast.error("Failed to log in. Please try again later.");
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Login</h2>
      </div>
      <form className="form-group" onSubmit={handleLogin}>
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        <button type="submit">Login</button>
      </form>
      <span>
        Don't have an account?{" "}
        <button onClick={() => navigate("/CreateAccount")}>Sign Up</button>
      </span>
    </div>
  );
};

export default Login;
