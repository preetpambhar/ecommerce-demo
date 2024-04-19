import { useEffect, useState } from "react";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./account.css";

const UserDetails = () => {
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    email: "",
    name: "",
    address: "",
    phoneNumber: "",
  });

  const existingUser = JSON.parse(localStorage.getItem("user"));
  if (!existingUser) {
    navigate("/createaccount");
  }

  //get user data
  useEffect(() => {
    const existingUser = JSON.parse(localStorage.getItem("user")) || {};
    console.log("existingUser", existingUser);
    setUserDetails({
      email: existingUser?.email || "",
      name: existingUser?.username || "",
      address: existingUser?.shipping_address || "",
      phoneNumber: existingUser?.phoneNumber || "",
    });
  }, []);

  // State to manage editable fields

  // Function to handle changes in input fields
  const handleInputChange = (field, value) => {
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  // Function to save edited details
  const saveDetails = () => {
    // You can now save the updated details to your server or perform other actions
    // For demonstration purposes, log the updated details to the console
    console.log("Updated User Details:", userDetails);
    localStorage.setItem("user", JSON.stringify(userDetails));
    // Disable editing mode
    setIsEditing(false);
  };
  console.log("userDetails", userDetails);
  return (
    <div className="account-container">
      <h1>User Account Details</h1>

      <form>
        <label>Email:</label>
        <input type="email" value={userDetails.email} disabled />

        <label>Name:</label>
        <input
          type="text"
          value={userDetails.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          disabled={!isEditing}
        />

        <label>Address:</label>
        <input
          type="text"
          value={userDetails.address}
          onChange={(e) => handleInputChange("address", e.target.value)}
          disabled={!isEditing}
        />

        <label>Phone Number:</label>
        <input
          type="tel"
          value={userDetails.phoneNumber}
          onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
          disabled={!isEditing}
        />

        {/* {isEditing ? (
          <button type="button" onClick={saveDetails}>
            Save Details
          </button>
        ) : (
          <button type="button" onClick={() => setIsEditing(true)}>
            Edit Details
          </button>
        )} */}
      </form>
    </div>
  );
};

export default UserDetails;
