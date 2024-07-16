import React from 'react';
import './Modal.css';
import { useTranslation } from "react-i18next";



const Modal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  const handleConfirmAndReload = async () => {
    await onConfirm(); 
    onClose();
  };
  const { t, i18n } = useTranslation();


  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p className='message-modal'>{message}</p>
        <div className="modal-actions">
          <button onClick={handleConfirmAndReload} className="confirm-button">{t("confirm")}</button>
          <button onClick={onClose} className="cancel-button">{t("cancel")}</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
