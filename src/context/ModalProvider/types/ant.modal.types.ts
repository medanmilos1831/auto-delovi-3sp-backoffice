import { ButtonProps } from 'antd/es/button/button';

export enum MODAL_BTN_TYPE {
  SWITCH_BTN = 'switchBtn',
  CLOSE_BTN = 'closeBtn',
}

export interface ISwitchModalBtn extends ButtonProps {
  modalName: string;
  modalBtnType: `${MODAL_BTN_TYPE.SWITCH_BTN}`;
  btnTxt?: string;
  injectedData?: any;
}

export interface ICloseModalBtn extends ButtonProps {
  modalBtnType: `${MODAL_BTN_TYPE.CLOSE_BTN}`;
  btnTxt?: string;
}
