import { AiFillStar } from "react-icons/ai";
import { BsFillBagHeartFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Card({
  cartProdId,
  prod_id,
  img,
  title,
  star,
  reviews,
  newPrice,
  prevPrice,
  qty,
  handleQuantity,
  handleDelete,
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
    const user = localStorage.getItem("user");
    let userId = null;
    if (user) userId = JSON.parse(user)?.userId;

    let updatedCart = [];
    const itemExists = existingCartItems.find((p) => p.prod_id === prod_id);

    if (itemExists) {
      existingCartItems.map((p) => {
        if (p.prod_id === prod_id) p.qty = p.qty + 1;
      });
      updatedCart = existingCartItems;

      if (userId) {
        // update qty in Cart
        const requestOptions = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quantity: itemExists.qty,
          }),
          redirect: "follow",
        };

        fetch(
          `http://localhost:5000/carts/${itemExists.cartProdId}`,
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => {
            console.log(result);
          })
          .catch((error) => console.error(error));
      }

      toast.success("Product quantity updated in cart!");
    } else {
      // Add the new product ID to the cart
      updatedCart = [...existingCartItems, { prod_id, qty: 1, userId }];

      if (userId) {
        // add cart in database
        const raw = JSON.stringify({
          product_id: prod_id,
          quantity: 1,
          user_id: userId,
        });

        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: raw,
          redirect: "follow",
        };

        fetch("http://localhost:5000/carts", requestOptions)
          .then((response) => response.text())
          .then((result) => console.log(result))
          .catch((error) => console.error(error));
      }

      toast.success("Product added in cart successfully!");
    }

    // Store the updated cart in local storage
    console.log("updatedCart: ", updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
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
                  onClick={() => handleQuantity(cartProdId, "decrease")}
                >
                  -
                </button>
                {qty}
                <button
                  class="qty-button"
                  onClick={() => handleQuantity(cartProdId, "increase")}
                >
                  +
                </button>

                <button onClick={() => handleDelete(cartProdId)}>Delete</button>
              </>
            )}
          </div>
        </section>
      </div>
    </section>
  );
}

export default Card;
