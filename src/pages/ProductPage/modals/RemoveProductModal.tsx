import { Button, Row, Space } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PRODUCTS_QUERY_KEY } from "../constants";
import { useNotification } from "../../../hooks";
import { IModalElementProps, useApiProvider } from "../../../context";

const RemoveProductModal = ({
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
      return remove(`product/${id}`);
    },
    onSuccess() {
      successNotifcation("Uspešno ste obrisali proizvod!");
      client.invalidateQueries({
        queryKey: [PRODUCTS_QUERY_KEY],
      });
      closeModal();
    },
    onError() {},
  });
  return (
    <>
      <Row>
        <span>Da li ste sigurni da zelite da obrisete proizvod?</span>
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

export { RemoveProductModal };
