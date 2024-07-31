import { createElement } from 'react';
import { Modal, ModalProps } from 'antd';
import { closeModalHandler, modalsType, openModalHandler } from '../../types';
import { ModalElementProvider } from '../../context/ElementProvider/ElementProvider';

const AntModal = ({
  activeModal,
  closeModal,
  openModal,
  modals,
  modalProps,
}: {
  activeModal: null | string;
  closeModal: closeModalHandler;
  modals: modalsType;
  modalProps: () => ModalProps;
  openModal: openModalHandler;
}) => {
  return (
    <Modal
      onCancel={() => {
        closeModal();
      }}
      {...modalProps()}
    >
      {activeModal ? (
        <ModalElementProvider
          value={{
            elementProps: modals[activeModal].elementProps,
            closeModal,
            modals,
            activeModal,
            openModal,
          }}
        >
          {createElement(modals[activeModal].element, {
            elementProps: modals[activeModal].elementProps,
            closeModal,
            modals,
            activeModal,
            openModal,
          })}
        </ModalElementProvider>
      ) : null}
    </Modal>
  );
};

export { AntModal };
