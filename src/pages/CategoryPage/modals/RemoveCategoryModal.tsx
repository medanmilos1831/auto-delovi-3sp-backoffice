import { Button, Row, Space } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CATEGORIES_QUERY_KEY } from "../constants";

import { IModalElementProps, useApiProvider } from "../../../context";
import { useNotification } from "../../../hooks";

const RemoveCategoryModal = ({
  closeModal,
  elementProps,
}: IModalElementProps) => {
  const client = useQueryClient();
  const { successNotifcation } = useNotification();
  const { injectedData } = elementProps;
  const id = injectedData.data.slug;
  const { remove } = useApiProvider();
  const { mutate } = useMutation({
    mutationFn: () => {
      return remove(`/category/${id}`);
    },
    onSuccess() {
      successNotifcation("Uspešno ste obrisali kategoriju!");
      client.invalidateQueries({
        queryKey: [CATEGORIES_QUERY_KEY],
      });
      closeModal();
    },
    onError(error, variables, context) {},
  });
  return (
    <>
      <Row>
        <span>Da li ste sigurni da zelite da obrisete kategoriju?</span>
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

export { RemoveCategoryModal };
