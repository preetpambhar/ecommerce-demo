import { useState } from "react";

import Navigation from "./Navigation/Nav";
import Products from "./Products/Products";
import Recommended from "./Recommended/Recommended";
import Sidebar from "./Slidbar/Sidebar";

//Database
import products from "./db/data";
import Card from "./components/Card";
function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [query, setQuery] = useState("");

  //----input Filter----
  const handelInputChange = (event) => {
    setQuery(event.target.value);
  };

  const filteredItems = products.filter((product) =>
    product.title.toLocaleLowerCase().indexOf(query.toLocaleLowerCase() !== -1)
  );

  //----Radio Filter-----
  const handleChange = event => {
    setSelectedCategory(event.target.value);
  };

  //---Button Filter---
  const handleClick = event => {
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
        ({ category, company, title}) =>
          category === selected || company === selected || title === selected
      );
    }

    return filteredProducts.map(({ img, title, star, reviews,newPrice, prevPrice}) => (
      <Card
        key={Math.random()}
        img={img}
        title={title}
        star={star}
        reviews={reviews}
        newPrice={newPrice}
        prevPrice={prevPrice}
      />
    ));
  }
 const result = filteredData(products, selectedCategory, query)

  return (
    <>
      <Sidebar handleChange={handleChange}/>
      <Navigation query={query}handelInputChange={handelInputChange}/>
      <Recommended handleClick={handleClick}/>
      <Products result={result}/>
    </>
  );
}

export default App;
