import { Button, Row, Space } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ABOUT_QUERY_KEY } from "../constants";
import { useNotification } from "../../../hooks";
import { API_ROUTES } from "../../../constants";
import { IModalElementProps, useApiProvider } from "../../../context";

const RemoveAboutModal = ({ closeModal, elementProps }: IModalElementProps) => {
  const client = useQueryClient();
  const { successNotifcation } = useNotification();
  const { injectedData } = elementProps;
  const id = injectedData.data;
  const { remove } = useApiProvider();
  const { mutate } = useMutation({
    mutationFn: () => {
      return remove(`${API_ROUTES.PROGRAM.REMOVE}/${id}`);
    },
    onSuccess() {
      successNotifcation("Uspešno ste obrisali program!");
      client.invalidateQueries({
        queryKey: [ABOUT_QUERY_KEY],
      });
      closeModal();
    },
  });
  return (
    <>
      <Row>
        <span>Da li ste sigurni da zelite da obrisete program?</span>
      </Row>
      <Row justify={"center"} className="mt-2">
        <Space>
          <Button type="primary">Ne</Button>
          <Button
            danger
            onClick={() => {
              mutate();
            }}
          >
            Da
          </Button>
        </Space>
      </Row>
    </>
  );
};

export { RemoveAboutModal };
