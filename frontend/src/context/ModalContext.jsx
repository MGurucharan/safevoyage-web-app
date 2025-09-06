import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const useModalContext = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <ModalContext.Provider value={{ isModalOpen, setIsModalOpen }}>
      <div className={`${isModalOpen ? 'blur-sm' : ''} transition-all duration-200`}>
        {children}
      </div>
    </ModalContext.Provider>
  );
};
