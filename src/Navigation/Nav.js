import { AiOutlineShoppingCart, AiOutlineUserAdd } from "react-icons/ai";
import "./Nav.css";
import {Link} from'react-router-dom';

function Nav() {
  return (
    <nav>
       <div className="logo-container">
        <Link to="/">
        <h1>🛒</h1>
        </Link>
      </div>
      <div className="profile-container">
        <Link to="cart">
          <AiOutlineShoppingCart className="nav-icons" />
        </Link>
        <Link to="account">
          <AiOutlineUserAdd className="nav-icons" />
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
