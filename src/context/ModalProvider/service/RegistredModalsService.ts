import { REGISTRED_MODALS } from '../constants';
import { modalsType } from '../types';

class RegistredModalsService {
  static HAS_MODAL_NAME(modals: modalsType, modalName: string) {
    if (!modals[modalName]) {
      throw new Error(
        `${modalName} ${REGISTRED_MODALS.NO_MODAL} ${Object.keys(modals).join(
          ', '
        )}`
      );
    }
  }
}

export { RegistredModalsService };
