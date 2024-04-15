import React, { useState } from "react";
import "./CreateAccount.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Createaccount = ({ toggleForm }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: userEmail,
          password: password,
          shipping_address: shippingAddress,
          // You can include other fields like username and shipping_address here if needed
        }),
      });

      if (response.ok) {
        toast.success("Registered successfully");
        navigate("/account");
      } else {
        // Handle registration failure
        const data = await response.json();
        toast.error(data.message || "Failed to register");
      }
    } catch (error) {
      // Handle network errors
      console.error("Error registering user:", error.message);
      toast.error("Failed to register. Please try again later.");
    }
  };

  const handleLoginRedirect = () => {
    // Redirect to the login page
    navigate("/login");
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
          type="text"
          name="email"
          placeholder="email"
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
        <input
          type="text"
          name="shipping_address"
          placeholder="shipping address"
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
        <span>Already have account ?</span>
        <button type="button" onClick={handleLoginRedirect}>
          Login
        </button>
      </form>
    </div>
  );
};
export default Createaccount;
