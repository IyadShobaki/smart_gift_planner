import "./ItemModal.css";
function ItemModal({ activeModal, item, onClose }) {
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__container modal__container_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close-btn modal__close-btn_type_preview"
        ></button>
        <img
          src={item.link}
          alt={`${item.name} image`}
          className="modal__image"
        />
        <div className="modal__footer">
          <h2 className="modal__caption">{item.name}</h2>
          <p className="modal__price">${item.price}</p>
          <p className="modal__description">{item.description}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
