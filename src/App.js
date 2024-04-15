import React, { useState, useEffect } from "react";
import Products from "./Products/Products";
import Recommended from "./Recommended/Recommended";
import Sidebar from "./Slidbar/Sidebar";
import Card from "./components/Card";
import "./index.css";

//Database
//import products from "./db/data";

function App() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    // Fetch products from backend
    fetch("http://localhost:5000/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  //----search input Filter----
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const filteredItems = products.filter(
    (product) =>
      product.title.toLocaleLowerCase().indexOf(query.toLocaleLowerCase()) !==
      -1
  );

  //----Radio Filter-----
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  //---Button Filter---
  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };

  function filteredData(products, selected, query) {
    let filteredProducts = products;

    //filtering Input Items
    if (query) {
      filteredProducts = filteredItems;
    }
    //Selected Filter
    if (selected) {
      filteredProducts = filteredProducts.filter(
        ({ category, company, title }) =>
          category === selected || company === selected || title === selected
      );
    }
    console.log("filteredProducts: ", filteredProducts);
    return filteredProducts.map(
      ({ _id, img, title, star, reviews, newPrice, prevPrice }) => (
        <Card
          prod_id={_id}
          key={Math.random()}
          img={img}
          title={title}
          star={star}
          reviews={reviews}
          newPrice={newPrice}
          prevPrice={prevPrice}
        />
      )
    );
  }
  const result = filteredData(products, selectedCategory, query);

  return (
    <>
      <Sidebar handleChange={handleChange} />
      <Recommended
        handleClick={handleClick}
        query={query}
        handleInputChange={handleInputChange}
      />
      <Products result={result} />
    </>
  );
}

export default App;
