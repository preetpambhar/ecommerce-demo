import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import "../Products/ProductView.css";
import "./cart.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Cart() {
  const [items, setItems] = useState([]);
  const [itemTotal, setItemTotal] = useState([]);
  const [itemTax, setTax] = useState([]);
  const [itemSubTotal, setSubTotal] = useState([]);
  const navigate = useNavigate();
  const [cartProds, setCart] = useState([]);
  console.log(
    "cartProds",
    cartProds.map((c) => ({
      product_id: c.product_id._id,
      quantity: c.quantity,
      user_id: c.user_id,
      cart_id: c._id,
    }))
  );
  const placeOrder = () => {
    const raw = JSON.stringify(
      cartProds.map((c) => ({
        product_id: c.product_id._id,
        quantity: c.quantity,
        user_id: c.user_id,
        cart_id: c._id,
      }))
    );

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:5000/orders", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));

    toast.success("Order Placed Successfuly");
    localStorage.removeItem("cart");
    navigate("/");
  };

  useEffect(() => {
    // Fetch product details when component mounts
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      fetchCartFromDB(parsedUser?.userId);
    } else {
      // set get from LS
    }
  }, []);

  const fetchCartFromDB = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/carts/${userId}`);
      if (response.ok) {
        const cartData = await response.json();
        setCart(cartData);
        const lsCartData = cartData.map((c) => ({
          prod_id: c.product_id._id,
          qty: c.quantity,
          userId: c.user_id,
          cartProdId: c._id,
        }));
        localStorage.setItem("cart", JSON.stringify(lsCartData));
      } else {
        console.error("Failed to fetch product details");
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  useEffect(() => {
    if (cartProds.length > 0) {
      let subTotal = 0;
      let total = 0;
      let tax = 0;
      cartProds.map((p) => {
        subTotal = subTotal + p.product_id.newPrice * p.quantity;
        tax = (subTotal * 13) / 100;
        total = tax + subTotal;
      });
      setItemTotal(total);
      setSubTotal(subTotal);
      setTax(tax);
    }
  }, [cartProds]);

  const handleQuantity = (cartProdId, operation) => {
    const prod = cartProds.find((p) => p._id === cartProdId);
    let payload = {
      quantity:
        operation === "increase" ? prod.quantity + 1 : prod.quantity - 1,
    };
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      redirect: "follow",
    };

    fetch(`http://localhost:5000/carts/${cartProdId}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        setCart(
          cartProds.map((p) => ({
            ...p,
            quantity:
              operation === "increase" ? p.quantity + 1 : p.quantity - 1,
          }))
        );
      })
      .catch((error) => console.error(error));
  };

  const handleDelete = (cartProdId) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
    };

    fetch(`http://localhost:5000/carts/${cartProdId}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        setCart(cartProds.filter((p) => p._id !== cartProdId));
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="main-cart">
      <div className="Left">
        <h1>Cart</h1>
        <div>
          {cartProds.map(
            ({
              _id,
              product_id: {
                prod_id,
                img,
                title,
                star,
                reviews,
                newPrice,
                prevPrice,
              },
              quantity,
            }) => (
              <Card
                prod_id={prod_id}
                // key={prod_id}
                cartProdId={_id}
                img={img}
                title={title}
                star={star}
                reviews={reviews}
                newPrice={newPrice}
                prevPrice={prevPrice}
                qty={quantity}
                handleQuantity={handleQuantity}
                handleDelete={handleDelete}
              />
            )
          )}
        </div>
      </div>
      <div className="Right">
        <h1>Total</h1>
        <h2>Sub Total: ${itemSubTotal}</h2>
        <h2>Tax 13%: ${itemTax}</h2>
        <h2>Grand Total: ${itemTotal}</h2>
        <button className="button1" onClick={placeOrder}>
          Place Order
        </button>
      </div>
    </div>
  );
}
