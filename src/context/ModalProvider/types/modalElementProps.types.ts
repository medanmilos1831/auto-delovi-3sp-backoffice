import {
  MODAL_BTN_TYPE,
  ICloseModalBtn,
  ISwitchModalBtn,
} from './ant.modal.types';
import {
  closeModalHandler,
  openModalHandler,
} from './modal.handler.provider.types';

export type modalBtnType<R> = R extends `${MODAL_BTN_TYPE.SWITCH_BTN}`
  ? ISwitchModalBtn
  : R extends `${MODAL_BTN_TYPE.CLOSE_BTN}`
  ? ICloseModalBtn
  : never;

export interface IModalElementProps<T = any> {
  elementProps: T;
  closeModal: closeModalHandler;
  openModal: openModalHandler;
  modals: any;
  activeModal: null | string;
}
