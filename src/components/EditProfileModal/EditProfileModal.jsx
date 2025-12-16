import "./EditProfileModal.css";
import { useState } from "react";

export default function EditProfileModal({
  open,
  onClose,
  onSave,
  currentAvatar,
}) {
  if (!open) return null;

  const [avatarFile, setAvatarFile] = useState(null);
  const [preview, setPreview] = useState(currentAvatar || "");
  function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;

    setAvatarFile(file);

    setPreview(URL.createObjectURL(file));
  }

  function handleSubmit() {
    onSave(avatarFile);
  }

  return (
    <div className="modal-overlay">
      <div className="modal-box edit-profile-modal">
        <h2 className="modal-title">Edit Profile</h2>

        <div className="avatar-section">
          {preview ? (
            <img src={preview} className="avatar-preview" />
          ) : currentAvatar ? (
            <img src={currentAvatar} className="avatar-preview" />
          ) : (
            <div className="avatar-placeholder"></div>
          )}
        </div>

        <div className="file-upload-container">
          <label className="file-label">Upload New Avatar</label>
          <input
            type="file"
            accept="image/*"
            className="file-input"
            onChange={handleFile}
          />
        </div>

        <div className="modal-actions">
          <button className="modal-btn cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="modal-btn save" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
