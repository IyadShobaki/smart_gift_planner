import "./GiftCard.css";

export default function GiftCard({ gift, index, onStatusChange, onDelete }) {
  const statusClass =
    gift.status === "Purchased"
      ? "Purchased"
      : gift.status === "Considering"
      ? "Considering"
      : "";

  return (
    <div className="giftcard">
      <div className="giftcard-top">
        <h4 className="giftcard-title">{gift.name}</h4>

        <button className="giftcard-close" onClick={() => onDelete(index)}>
          ✕
        </button>
      </div>

      <div className="giftcard-body">
        <img
          src={gift.link}
          alt={gift.name}
          className="giftcard-image"
          onError={(e) => (e.target.style.display = "none")}
        />

        <div className="giftcard-info">
          <p className="giftcard-price">${gift.price}</p>

          <label className="giftcard-status-label">Gift Status</label>

          <select
            className={`styled-dropdown ${statusClass}`}
            value={gift.status || "No Status"}
            onChange={(e) => onStatusChange(index, e.target.value)}
          >
            <option>No Status</option>
            <option>Considering</option>
            <option>Purchased</option>
          </select>
        </div>
      </div>
    </div>
  );
}
