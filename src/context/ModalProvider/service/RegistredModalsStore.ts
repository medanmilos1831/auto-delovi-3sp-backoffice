import { ModalProps } from 'antd';
import { ModalConfig } from '../config';

class RegistredModalsStore {
  public modals: any;
  constructor(registedModals: any, modalConfig: ModalProps) {
    const config = new ModalConfig(modalConfig);
    const modalNames = Object.keys(registedModals);
    modalNames.forEach((modalName) => {
      registedModals[modalName].antModalConfig
        ? (registedModals[modalName].antModalConfig = {
            ...config.defaultModalConfig,
            ...registedModals[modalName].antModalConfig,
          })
        : (registedModals[modalName].antModalConfig = {
            ...config.defaultModalConfig,
          });
      if (!registedModals[modalName].elementProps) {
        registedModals[modalName].elementProps = {};
      }
    });
    this.modals = registedModals;
  }
}

export { RegistredModalsStore };
