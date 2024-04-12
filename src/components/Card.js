import { AiFillStar } from "react-icons/ai";
import { BsFillBagHeartFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Card({
  prod_id,
  img,
  title,
  star,
  reviews,
  newPrice,
  prevPrice,
  qty,
  handleUpdateIncrement,
}) {
  const renderStarRating = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<AiFillStar className="rating-star" key={i} />);
    }
    return stars;
  };

  const handleAddToCart = (prod_id) => {
    // Retrieve existing cart items from local storage
    const existingCartItems = JSON.parse(localStorage.getItem("cart")) || [];

    let updatedCart = [];
    if (existingCartItems.find((p) => p.prod_id === prod_id)) {
      existingCartItems.map((p) => {
        if (p.prod_id === prod_id) p.qty = p.qty + 1;
      });
      updatedCart = existingCartItems;

      toast.success("Product quantity updated in cart!");
    } else {
      // Add the new product ID to the cart
      updatedCart = [...existingCartItems, { prod_id, qty: 1 }];

      toast.success("Product added in cart successfully!");
    }

    // Store the updated cart in local storage
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleQuantity = (prodId, operation) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    if (operation === "increase") {
      existingCart.map((item) => {
        if (item.prod_id === prodId) item.qty = item.qty + 1;
      });
    } else {
      existingCart.map((item) => {
        if (item.prod_id === prodId && item.qty != 1) item.qty = item.qty - 1;
      });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    handleUpdateIncrement();
  };

  const handleDelete = (prodId) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = existingCart.filter((item) => item.prod_id != prodId);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    handleUpdateIncrement();
  };
  return (
    <section className="card">
      <img src={img} alt={title} className="card-img"></img>
      <div className="card-details">
        <Link to={`/productview/${prod_id}`}>
          <h3 className="card-title">{title}</h3>
        </Link>
        <section className="card-reviews">
          {renderStarRating(star)} {}
          <span className="totol-reviews">{reviews}</span>
        </section>
        <section className="card-price">
          <div className="price">
            {qty ? (
              <>
                $<del>{prevPrice * qty}</del> {newPrice * qty}
              </>
            ) : (
              <>
                $<del>{prevPrice}</del> {newPrice}
              </>
            )}
          </div>
        </section>
        <section>
          <div className="card-footer">
            {!qty && (
              <button onClick={() => handleAddToCart(prod_id)}>
                <BsFillBagHeartFill className="bag-icon" />{" "}
                <label className="button-label">Add To Cart</label>
              </button>
            )}

            {qty && (
              <>
                <button
                  class="qty-button"
                  onClick={() => handleQuantity(prod_id, "decrease")}
                >
                  -
                </button>
                {qty}
                <button
                  class="qty-button"
                  onClick={() => handleQuantity(prod_id, "increase")}
                >
                  +
                </button>

                <button onClick={() => handleDelete(prod_id)}>Delete</button>
              </>
            )}
          </div>
        </section>
      </div>
    </section>
  );
}

export default Card;
