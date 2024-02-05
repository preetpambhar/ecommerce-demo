import React, { useEffect, useState } from "react";
import products from "../db/data";
import Card from "../components/Card";
import "../Products/ProductView.css"
import './cart.css'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Cart() {
  const [items, setItems] = useState([]);
  const [updateIncrement, setUpdateIncrement] = useState(1); // Update whenever cart is updated
  const [itemTotal, setItemTotal]= useState([])
  const [itemTax, setTax]= useState([])
  const [itemSubTotal, setSubTotal]= useState([])
 const navigate = useNavigate()


  const handleUpdateIncrement = () => setUpdateIncrement(updateIncrement + 1);

  const placeOrder = () =>{
    toast.success("Order Placed Successfuly");
    localStorage.setItem("cart", "[]")
    handleUpdateIncrement()
    navigate("/")
  };
  
  useEffect(() => {
    // load products from the LS
    const lsCartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItems = [];
    let subTotal =0;
    let total = 0;
    let tax = 0;
    products.map((p) => {
      const isExistInCart = lsCartItems.find(
        (lsi) => lsi.prod_id === p.prod_id
      ); // lsi: Local Storage Item
      if (isExistInCart) {
        cartItems.push({ ...p, qty: isExistInCart.qty });
        subTotal = subTotal + (p.newPrice * isExistInCart.qty)
        tax = (subTotal * 13)/100
        total = tax + subTotal
      }
    });

    setSubTotal(subTotal);
    setItemTotal(total);
    setTax(tax);
    if (cartItems) setItems(cartItems);
  }, [updateIncrement]);

  return (
  
      <div className="main-cart">
      <div className="Left"><h1>Cart</h1>
      <div className="container">
      {items.map(
        ({ prod_id, img, title, star, reviews, newPrice, prevPrice, qty }) => (
          <Card
            prod_id={prod_id}
            key={Math.random()}
            img={img}
            title={title}
            star={star}
            reviews={reviews}
            newPrice={newPrice}
            prevPrice={prevPrice}
            qty={qty}
            handleUpdateIncrement={handleUpdateIncrement}
          />
        )
      )}
      </div>
      </div>
        <div className="Right"><h1>Total</h1>
        
          <h2>Sub Total: ${itemSubTotal}</h2>
          <h2>Tax 13%: ${itemTax}</h2>
          <h2>Grand Total: ${itemTotal}</h2> 
          <button className="button" onClick={placeOrder}>Place Order</button>
        </div>
      </div>
  );
}

