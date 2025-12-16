import "./RecipientCard.css";
import avatar from "../../assets/images/avatarPH.jpg";

function RecipientCard({
  recipient,
  onRecipientClick,
  onRecipientDelete,
  onFindGift,
  onUploadRecipientAvatar,
}) {
  const handleRecipientClick = () => {
    onRecipientClick(recipient);
  };
  function handleDeleteRecipient() {
    onRecipientDelete(recipient);
  }

  return (
    <li className="recipient">
      <div>
        <button className="recipient__edit-btn"></button>
      </div>
      <img
        src={recipient.avatar ? `${baseUrl}${recipient.avatar}` : avatar}
        alt={recipient.name}
        className="recipient__img"
      />
      <h2 className="recipient__name">{recipient.name}</h2>
      <div className="recipient__gift">
        <button className="recipient__gift-icon"></button>
        <p className="recipient__gifts-number">
          Gifts/{recipient.products.length}
        </p>
      </div>
      <div className="recipient__content">
        <button onClick={onFindGift} className="recipient__btn">
          Find Gifts
        </button>
        <button
          className="recipient__btn"
          onClick={() => onUploadRecipientAvatar(recipient)}
        >
          Upload Avatar
        </button>

        <button onClick={handleDeleteRecipient} className="recipient__btn">
          Delete
        </button>
      </div>
    </li>
  );
}

export default RecipientCard;
