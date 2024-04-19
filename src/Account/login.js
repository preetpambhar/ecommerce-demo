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
        const res = await response.json();
        console.log("data: ", res);
        // Update existing cart or create a new one
        updateCartWithUserId(res.data.userId);
        localStorage.setItem("user", JSON.stringify(res.data));
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

  const updateCartWithUserId = (userId) => {
    // Check if there's an existing cart in localStorage
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    // If there's an existing cart, update it with the user's ID
    if (existingCart.length > 0) {
      const updatedCart = existingCart.map((item) => {
        return { ...item, userId };
      });
      localStorage.setItem("cart", JSON.stringify(updatedCart));
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
