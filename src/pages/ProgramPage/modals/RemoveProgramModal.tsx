import { Button, Row, Space } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PROGRAM_QUERY_KEY } from "../constants";
import { useNotification } from "../../../hooks";
import { IModalElementProps, useApiProvider } from "../../../context";

const RemoveProgramModal = ({
  closeModal,
  elementProps,
}: IModalElementProps) => {
  const client = useQueryClient();
  const { successNotifcation } = useNotification();
  const { injectedData } = elementProps;
  const slug = injectedData.data.slug;
  const { remove } = useApiProvider();
  const { mutate } = useMutation({
    mutationFn: () => {
      return remove(`program/${slug}`);
    },
    onSuccess() {
      successNotifcation("Uspešno ste obrisali program!");
      client.invalidateQueries({
        queryKey: [PROGRAM_QUERY_KEY],
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

export { RemoveProgramModal };
