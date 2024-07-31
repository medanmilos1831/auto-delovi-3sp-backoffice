import { ModalProps } from 'antd';

export enum MODAL_PROVIDER_MODE {
  ANT = 'ant',
  CUSTOM = 'custom',
}

type ANTmodalConfig = Omit<ModalProps, 'open' | 'footer'>;

export interface IModalProvider {
  mode?: `${MODAL_PROVIDER_MODE.ANT}` | `${MODAL_PROVIDER_MODE.CUSTOM}`;
  modals: modalsType;
  modalConfig?: ANTmodalConfig;
}

export interface IModalContext {
  modals: modalsType;
}
export type modalsType = {
  [key: string]: {
    element: (props: any) => JSX.Element;
    elementProps?: any;
    antModalConfig?: ANTmodalConfig;
  };
};
