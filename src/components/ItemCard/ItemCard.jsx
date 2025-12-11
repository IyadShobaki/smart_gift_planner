import "./ItemCard.css";
function ItemCard({ item, onItemClick }) {
  const handleItemClick = () => {
    onItemClick(item);
  };
  return (
    <li className="item">
      <img
        onClick={handleItemClick}
        className="item__image"
        src={item.link}
        alt={`${item.name} image`}
      />
      <h2 className="item__name">{item.name}</h2>
      <div className="item__content">
        <p className="item__price">${item.price}</p>
        <p className="item__description">{item.description}</p>
      </div>
    </li>
  );
}

export default ItemCard;
