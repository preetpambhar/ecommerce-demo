import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem("cart");
    localStorage.removeItem("user");
    navigate("/");
  }, []);

  return <></>;
};

export default Logout;
