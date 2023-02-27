import React, { ReactNode } from 'react';

type ModalProps = {
  setIsModalOpen: (isOpen: boolean) => void;
  onClose: () => Promise<void>;
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
        <h2>Booker un meeting Zoom</h2>
        {props.children}
        <p>
          <button type="button" onClick={() => props.setIsModalOpen(false)}>
            Annuler
          </button>

          <button type="button" onClick={onClose}>
            Valider
          </button>
        </p>
      </div>
      <div className="ModalBackground" onClick={() => props.setIsModalOpen(false)} />
    </>
  );
};

export default Modal;
