import { useState } from "react";
import { uploadRecipientAvatar } from "../../utils/api";
import { baseUrl } from "../../utils/constants";

export default function UploadRecipientAvatarModal({
  open,
  onClose,
  recipient,
}) {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);

  if (!open || !recipient) return null;

  function handleFileChange(e) {
    const selected = e.target.files[0];
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  }

  async function handleSubmit() {
    try {
      const token = localStorage.getItem("token");
      const updated = await uploadRecipientAvatar(token, recipient._id, file);

      recipient.avatar = updated.avatar; // update UI immediately
      onClose();
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  }
  console.log("Recipient inside avatar modal:", recipient);

  return (
    <div className="recipient-avatar-overlay">
      <div className="recipient-avatar-modal">
        <h2>Upload Avatar for {recipient.name}</h2>

        <div className="avatar-preview-container">
          {preview ? (
            <img src={preview} className="avatar-preview" alt="Preview" />
          ) : (
            <img
              src={
                recipient.avatar
                  ? `${baseUrl}${recipient.avatar}`
                  : "avatarPH.jpg"
              }
              className="avatar-preview"
              alt="Recipient"
            />
          )}
        </div>

        <input type="file" className="file-input" onChange={handleFileChange} />

        <div className="modal-actions">
          <button className="modal-btn cancel" onClick={onClose}>
            Cancel
          </button>

          <button className="modal-btn save" onClick={handleSubmit}>
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}
