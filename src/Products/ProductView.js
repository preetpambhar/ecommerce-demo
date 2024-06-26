import React from "react";
import { BsFillBagHeartFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import "./ProductView.css";
import { useParams } from "react-router-dom";
import { data } from "../db/data";
import { toast } from "react-toastify";

const ProductView = () => {
  const [quantity, setQuantity] = useState(1);
  const { prodId } = useParams();
  const [product, setProduct] = useState(null);
  console.log({ prodId });

  useEffect(() => {
    // Fetch product details when component mounts
    fetchProductDetails(prodId);
  }, [prodId]);

  const fetchProductDetails = async (prod_id) => {
    try {
      const response = await fetch(`http://localhost:5000/products/${prod_id}`);
      if (response.ok) {
        const productData = await response.json();
        setProduct(productData);
      } else {
        console.error("Failed to fetch product details");
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  // useEffect(() => {
  //   // Find the product with the matching id
  //   const selectedProduct = data.find(
  //     (product) => product.prod_id === parseInt(prodId)
  //   );
  //   setProduct(selectedProduct);
  // }, [prodId]);

  if (!product) {
    return <div>Loading...</div>; // You can show a loading indicator while fetching the product
  }

  //button fuction
  const handleAddToCart = (prod_id) => {
    // Retrieve existing cart items from local storage
    const existingCartItems = JSON.parse(localStorage.getItem("cart")) || [];
    let updatedCart = [];
    if (existingCartItems.find((p) => p.prod_id === prod_id)) {
      existingCartItems.map((p) => {
        if (p.prod_id === prod_id) p.qty = p.qty + quantity;
      });
      updatedCart = existingCartItems;

      toast.success("Product quantity updated in cart!");
    } else {
      // Add the new product ID to the cart
      updatedCart = [...existingCartItems, { prod_id, qty: quantity }];

      toast.success("Product added in cart successfully!");
    }

    // Store the updated cart in local storage
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div>
      <h1 className="title">ProductView</h1>
      <div class="product-container">
        <img class="product-image" src={product.img} alt="Product Image" />
        <div class="product-details">
          <h2 class="product-title">{product.title}</h2>
          <p class="product-price">
            Price: $<del>{product.prevPrice}</del>
            {product.newPrice}
          </p>
          <p class="product-description">
            Reviews: {product.star}
            {product.star}
            {product.star}
            {product.star} {product.reviews}
          </p>
          <p class="product-description">Color: {product.color}</p>
          <p class="product-description">Type: {product.category}</p>
          <button
            class="qty-button"
            onClick={() => setQuantity((prev) => (prev === 1 ? 1 : prev - 1))}
          >
            -
          </button>
          {quantity}
          <button
            class="qty-button"
            onClick={() => setQuantity((prev) => prev + 1)}
          >
            +
          </button>

          <button
            class="buy-button"
            onClick={() => handleAddToCart(product.prod_id)}
          >
            <BsFillBagHeartFill className="bag-icon" /> Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProductView;
