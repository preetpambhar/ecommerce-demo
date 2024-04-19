import { AiOutlineShoppingCart, AiOutlineUserAdd } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import "./Nav.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Nav() {
  const [userExists, setUserExists] = useState(true);
  const existingUser = localStorage.getItem("user");

  useEffect(() => {
    if (existingUser) {
      setUserExists(true);
    } else {
      setUserExists(false);
    }
  }, []);

  return (
    <nav>
      <div className="logo-container">
        <Link to="/">
          <h1>WEST 49</h1>
        </Link>
      </div>
      <div className="profile-container">
        <Link to="cart">
          <AiOutlineShoppingCart className="nav-icons" />
        </Link>
        <Link to="account">
          <AiOutlineUserAdd className="nav-icons" />
        </Link>
        {userExists && (
          <Link to="logout">
            <FiLogOut className="nav-icons" />
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Nav;
