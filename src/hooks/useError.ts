import { SERVICE_UNAVAILABLE, ERROR_TRY_AGAIN } from "../constants";
import { notificationService } from "../services";

const useError = () => {
  const errorResolver = (
    status: typeof SERVICE_UNAVAILABLE | number,
    data?: string
  ) => {
    switch (status) {
      case 422:
        notificationService.errorNotifcation(data);
        break;
      default:
        notificationService.errorNotifcation(ERROR_TRY_AGAIN);
    }
  };
  const trigger = (errorObj: any) => {
    errorResolver(
      errorObj?.status ? errorObj?.status : SERVICE_UNAVAILABLE,
      errorObj?.data ? errorObj?.data : ERROR_TRY_AGAIN
    );
  };

  return trigger;
};

export { useError };
