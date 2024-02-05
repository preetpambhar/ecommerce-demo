import { BsFillBagHeartFill } from "react-icons/bs";
import {Link} from'react-router-dom';

function Card({ img, title, star, reviews,newPrice, prevPrice}) {
  return ( 
  <section className="card">
  <img
    src={img}
    alt={title} className="card-img"
  ></img>
  <div className="card-details">
    <Link to="productview">
    <h3 className="card-title">{title}</h3>
    </Link>
    <section className="card-reviews">
     {star}{star}{star}{star}
     <span className="totol-reviews">{reviews}</span>
    </section>
    <section className="card-price">
      <div className="price">
        <del>{prevPrice}</del> {newPrice}
      </div>
    </section>
    <section>
    <div className="card-footer">
        <button onClick={()=> {}}><BsFillBagHeartFill className="bag-icon"/> Add To Cart</button>
      </div>
    </section>
  </div>
</section>
  );
}

export default Card;