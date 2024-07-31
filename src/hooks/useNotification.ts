import { notification } from "antd";
import {
  ERROR_MESSAGE,
  NOTIFCATION_DURATION,
  SUCCESS_MESSAGE,
  WARNING_MESSAGE,
} from "../constants";

const useNotification = () => {
  const successNotifcation = (
    description: string = "Sve je ok",
    obj?: {
      duration?: number;
    }
  ) => {
    notification.success({
      message: SUCCESS_MESSAGE,
      description,
      duration: NOTIFCATION_DURATION,
    });
  };

  const errorNotifcation = (
    description: string | JSX.Element | JSX.Element[] = "Nije ok",
    customDuration: number = NOTIFCATION_DURATION
  ) => {
    notification.error({
      message: ERROR_MESSAGE,
      description,
      duration: customDuration,
    });
  };

  const warningNotification = (description: string = "Pažnja") => {
    notification.error({
      message: WARNING_MESSAGE,
      description,
      duration: NOTIFCATION_DURATION,
    });
  };
  return {
    successNotifcation,
    errorNotifcation,
    warningNotification,
  };
};

export { useNotification };
