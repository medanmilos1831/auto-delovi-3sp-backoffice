import { useRef, useState } from 'react';
import { ModalProps } from 'antd';
import { MODAL_DEFAULT_CONFIG_CONSTANTS } from '../constants';
import { useModalProvider } from '../context/ModalProvider/ModalProvider';
import { RegistredModalsService } from '../service';

const useModalHandlerService = () => {
  const { modals } = useModalProvider();
  const [activeModal, setActiveModal] = useState<null | string>(null);
  const activeConfig = useRef<ModalProps>(MODAL_DEFAULT_CONFIG_CONSTANTS);
  function setModalConfigOpen(modalName: string) {
    activeConfig.current = {
      ...activeConfig.current,
      ...modals[modalName].antModalConfig,
    };
  }

  function openModal(modalName: string, injectedData: any) {
    RegistredModalsService.HAS_MODAL_NAME(modals, modalName);

    // OPEN MODAL
    if (injectedData) {
      setElementProps(modalName, injectedData);
    } else {
      if (modals[modalName].elementProps.injectedData) {
        delete modals[modalName].elementProps.injectedData;
      }
    }
    setModalConfigOpen(modalName);
    setActiveModal(modalName);
    // END :: OPEN MODAL
  }
  function closeModal() {
    setActiveModal(null);
  }
  function setElementProps(modalName: string, injectedData: any) {
    modals[modalName].elementProps = {
      ...modals[modalName].elementProps,
      injectedData: {
        data: injectedData,
      },
    };
  }
  return {
    openModal,
    closeModal,
    activeModal,
    modals,
    setActiveModal,
    modalProps: () => {
      return {
        ...activeConfig.current,
        open: activeModal ? true : false,
      };
    },
  };
};

export { useModalHandlerService };
