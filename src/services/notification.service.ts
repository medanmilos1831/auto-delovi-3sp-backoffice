import { notification } from "antd";
import {
  SUCCESS_MESSAGE,
  NOTIFCATION_DURATION,
  ERROR_MESSAGE,
  WARNING_MESSAGE,
} from "../constants";

export const notificationService = {
  successNotifcation: (
    description: string = "Sve je ok",
    _?: {
      duration?: number;
    }
  ) => {
    notification.success({
      message: SUCCESS_MESSAGE,
      description,
      duration: NOTIFCATION_DURATION,
    });
  },
  errorNotifcation: (
    description: string | JSX.Element | JSX.Element[] = "Nije ok",
    customDuration: number = NOTIFCATION_DURATION
  ) => {
    notification.error({
      message: ERROR_MESSAGE,
      description,
      duration: customDuration,
    });
  },
  warningNotification: (description: string = "Pažnja") => {
    notification.error({
      message: WARNING_MESSAGE,
      description,
      duration: NOTIFCATION_DURATION,
    });
  },
};
