export interface IModalHandlerContext {
  openModal: openModalHandler;
  activeModal: null | string;
  closeModal: closeModalHandler;
}

export type openModalHandler = (modalName: string, injectedData?: any) => void;

export type closeModalHandler = () => void;
