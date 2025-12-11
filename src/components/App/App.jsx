import { useEffect, useState } from "react";

import "./App.css";
import Main from "../Main/Main";
import Header from "../Header/Header";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [lowPriceRange, setLowPriceRange] = useState(0);
  const [highPriceRange, setHighPriceRange] = useState(1000);
  const [seacrhText, setSeacrhText] = useState("");
  const [category, setCategory] = useState("");
  function handleItemClick() {
    setActiveModal("preview");
  }
  function handleLowPriceRange(price) {
    setLowPriceRange(price);
  }
  function handleHighPriceRange(price) {
    setHighPriceRange(price);
  }
  function handleSearch(text) {
    setSeacrhText(text);
  }
  function handleCategory(text) {
    setCategory(text);
  }
  // console.log(`low-price: ${lowPriceRange}`);
  // console.log(`high-price: ${highPriceRange}`);
  return (
    <div className="page">
      <div className="page__content">
        <Header
          handleLowPriceRange={handleLowPriceRange}
          handleHighPriceRange={handleHighPriceRange}
          handleSearch={handleSearch}
          handleCategory={handleCategory}
          selectedCategory={category}
          lowPriceRange={lowPriceRange}
          highPriceRange={highPriceRange}
        />
        <Main
          handleItemClick={handleItemClick}
          lowPriceRange={lowPriceRange}
          highPriceRange={highPriceRange}
          seacrhTextValue={seacrhText}
          selectedCategory={category}
        />
      </div>
    </div>
  );
}

export default App;
