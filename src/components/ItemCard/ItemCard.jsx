import "./ItemCard.css";
function ItemCard({ item, onItemClick, onAddItem }) {
  const handleItemClick = () => {
    onItemClick(item);
  };
  let quantity = 1;
  function updateQuantity(e) {
    if (e.target.value && e.target.value > 0) {
      quantity = e.target.value;
    }
  }
  function handleAddToCart() {
    onAddItem(item, quantity);
  }
  return (
    <li className="item">
      <div className="item__image-container">
        <img
          onClick={handleItemClick}
          className="item__image"
          src={item.link}
          alt={`${item.name} image`}
        />
        <button className="item__like-btn"></button>
      </div>
      <div className="item__content">
        <h2 className="item__name">{item.name}</h2>
        <p className="item__description">{item.description}</p>
        <p className="item__price">${item.price}</p>
      </div>
    </li>
  );
}

export default ItemCard;
