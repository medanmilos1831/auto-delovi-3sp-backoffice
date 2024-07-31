import { PropsWithChildren, createContext, useContext } from "react";
import { IModalContext, IModalProvider } from "../../types";

import { RegistredModalsStore } from "../../service";
import { ModalHandlerProvider, ModalBtn } from "../ModalHandler";

const ModalContext = createContext<IModalContext>({
  modals: {},
});

const ModalProvider = ({
  children,
  modals,
  modalConfig = {},
}: PropsWithChildren<IModalProvider>) => {
  return (
    <ModalContext.Provider
      value={{
        ...new RegistredModalsStore({ ...modals }, modalConfig),
      }}
    >
      <ModalHandlerProvider>{children}</ModalHandlerProvider>
    </ModalContext.Provider>
  );
};

const useModalProvider = () => {
  const { modals } = useContext(ModalContext);
  return {
    modals,
  };
};

export { ModalProvider, useModalProvider, ModalBtn };
