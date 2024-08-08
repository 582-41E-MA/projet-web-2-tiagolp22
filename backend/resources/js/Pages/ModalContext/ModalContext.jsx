import React, { createContext, useState, useContext } from 'react';
import LoginModal from '../User/Login/LoginModal'; 

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  const openLoginModal = () => setLoginModalOpen(true);
  const closeLoginModal = () => setLoginModalOpen(false);

  return (
    <ModalContext.Provider value={{ openLoginModal, closeLoginModal }}>
      {children}
      {isLoginModalOpen && <LoginModal onClose={closeLoginModal} />}
    </ModalContext.Provider>
  );
}

export const useModal = () => useContext(ModalContext);
