import { PropsWithChildren, createContext, useContext } from "react";
import { useModalHandlerService } from "../../hooks";
import { AntModal } from "../../components";
import {
  IModalHandlerContext,
  closeModalHandler,
  openModalHandler,
} from "../../types";

const ModalHandlerContext = createContext<IModalHandlerContext>({
  openModal: () => {},
  activeModal: null,
  closeModal: () => {},
});

const ModalHandlerProvider = ({ children }: PropsWithChildren) => {
  const { closeModal, activeModal, modalProps, modals, openModal } =
    useModalHandlerService();

  return (
    <ModalHandlerContext.Provider
      value={{
        openModal,
        activeModal,
        closeModal,
      }}
    >
      <>
        {children}
        <AntModal
          modals={modals}
          activeModal={activeModal}
          closeModal={closeModal}
          openModal={openModal}
          modalProps={modalProps}
        />
      </>
    </ModalHandlerContext.Provider>
  );
};

const ModalBtn = ({
  children,
}: {
  children: (open: openModalHandler, close: closeModalHandler) => any;
}) => {
  const { closeModal, openModal } = useContext(ModalHandlerContext);
  return children(openModal, closeModal);
};

const useModal = () => {
  const { openModal, activeModal } = useContext(ModalHandlerContext);
  return {
    openModal,
    activeModal,
  };
};

export { ModalHandlerProvider, ModalHandlerContext, ModalBtn, useModal };
