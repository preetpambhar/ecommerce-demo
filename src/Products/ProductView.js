import React from 'react';
import {useState} from "react";
import "./ProductView.css";

const ProductView = ()=>{
  const [quantity, setQuantity] = useState(1);

 
  return (
    <div>
    <h1>ProductView</h1>
    <div class="product-container">
        <img class="product-image" src="https://m.media-amazon.com/images/I/41M54ztS6IL._AC_SY625._SX._UX._SY._UY_.jpg" alt="Product Image"/>
        <div class="product-details">
            <h2 class="product-title">Product Name</h2>
            <p class="product-price">$19.99</p>
            <p class="product-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <button class="qty-button"onClick={()=>setQuantity(prev=>prev===1 ? 1 : prev-1)}>-</button>
            {quantity}
            <button class="qty-button" onClick={()=>setQuantity(prev=>prev+1)}>+</button>
            <button class="buy-button">Add to Cart</button>
        </div>
    </div>
    </div>
  );
}
export default ProductView;
