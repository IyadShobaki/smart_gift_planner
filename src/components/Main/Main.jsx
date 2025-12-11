import "./Main.css";
import ItemCard from "../ItemCard/ItemCard";
import { testItems } from "../../utils/constants";
function Main({
  handleItemClick,
  lowPriceRange,
  highPriceRange,
  seacrhTextValue,
}) {
  let filteredItems;
  if (seacrhTextValue.length > 0) {
    filteredItems = testItems
      .filter((item) => {
        return (
          lowPriceRange <= item.price &&
          item.price <= highPriceRange &&
          item.name.toLowerCase().includes(seacrhTextValue)
        );
      })
      .map((item) => {
        return (
          <ItemCard key={item._id} item={item} onItemClick={handleItemClick} />
        );
      });
  } else {
    filteredItems = testItems
      .filter((item) => {
        return lowPriceRange <= item.price && item.price <= highPriceRange;
      })
      .map((item) => {
        return (
          <ItemCard key={item._id} item={item} onItemClick={handleItemClick} />
        );
      });
  }

  return (
    <main>
      <section className="items">
        <ul className="items__list">{filteredItems}</ul>
      </section>
    </main>
  );
}

export default Main;
