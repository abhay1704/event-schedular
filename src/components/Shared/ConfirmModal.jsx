import React from "react";
import Modal from "react-modal";
import "./ConfirmModal.css"; // Import the CSS file

const ConfirmModal = ({
  confirmModalIsOpen,
  setConfimModalIsOpen,
  onConfirmed,
}) => {
  return (
    <Modal
      isOpen={confirmModalIsOpen}
      onRequestClose={() => setConfimModalIsOpen(false)}
      className="modal"
      overlayClassName="overlay"
    >
      <div className="container">
        <h2>Are you sure you want to delete this event permanently?</h2>
        <div className="btn-group">
          <button
            className="btn cancel-btn"
            onClick={() => {
              setConfimModalIsOpen(false);
            }}
          >
            Cancel
          </button>
          <button className="btn delete-btn" onClick={onConfirmed}>
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
