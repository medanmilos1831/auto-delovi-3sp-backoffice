import { PropsWithChildren, createContext, useContext } from 'react';
import { IModalElementProps } from '../../types';
const ModalElementContext = createContext<any>(undefined);

const ModalElementProvider = ({
  children,
  value,
}: PropsWithChildren<{ value: IModalElementProps }>) => {
  return (
    <ModalElementContext.Provider value={value}>
      {children}
    </ModalElementContext.Provider>
  );
};

const useModalElementProvider = () => {
  const { elementProps, closeModal, modals, activeModal, openModal } =
    useContext(ModalElementContext) as IModalElementProps;
  return { elementProps, closeModal, modals, activeModal, openModal };
};

export { ModalElementProvider, useModalElementProvider };
