import React, { ReactNode, useState } from 'react';

type ModalProps = {
  setIsModalOpen: (isOpen: boolean) => void;
  onClose?: () => void;
  children: ReactNode;
};

const Modal = (props: ModalProps) => {
  const onClose = async () => {
    if (props.onClose) {
      await props.onClose();
    }
    props.setIsModalOpen(false);
  };

  return (
    <>
      <div className="Modal">
        <h2>Booker un meting Zoom</h2>
        {props.children}
        <button type="button" onClick={() => props.setIsModalOpen(false)}>
          Annuler
        </button>

        <button type="button" onClick={onClose}>
          Valider
        </button>
      </div>
      <div className="ModalBackground" onClick={() => props.setIsModalOpen(false)} />
    </>
  );
};

export default Modal;
