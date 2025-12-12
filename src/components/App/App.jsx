import { useEffect, useState } from "react";

import "./App.css";
import Main from "../Main/Main";
import Header from "../Header/Header";
import ItemModal from "../ItemModal/ItemModal";
import FormModal from "../FormModal/FormModal";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [lowPriceRange, setLowPriceRange] = useState(0);
  const [highPriceRange, setHighPriceRange] = useState(1000);
  const [seacrhText, setSeacrhText] = useState("");
  const [category, setCategory] = useState("");
  const [selectedItem, setSelectedItem] = useState({});

  function handleItemClick(item) {
    setActiveModal("preview");
    setSelectedItem(item);
  }
  function closeActiveModal() {
    setActiveModal("");
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
      <ItemModal
        activeModal={activeModal}
        item={selectedItem}
        onClose={closeActiveModal}
      />
    </div>
  );
}

export default App;
