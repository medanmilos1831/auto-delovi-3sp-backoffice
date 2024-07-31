import { ModalProps } from 'antd';
import { MODAL_DEFAULT_CONFIG_CONSTANTS } from '../constants';

class ModalConfig {
  public defaultModalConfig: ModalProps = MODAL_DEFAULT_CONFIG_CONSTANTS;
  constructor(config: ModalProps) {
    this.defaultModalConfig = {
      ...this.defaultModalConfig,
      ...config,
    };
  }
}

export { ModalConfig };
