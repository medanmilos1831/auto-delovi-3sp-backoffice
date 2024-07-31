import { Button, Form, Input, Row, Space } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PROGRAM_QUERY_KEY } from "../constants";
import TextArea from "antd/es/input/TextArea";
import { useEffect } from "react";
import { useNotification } from "../../../hooks";
import { IModalElementProps, useApiProvider } from "../../../context";
import { useError } from "../../../hooks/useError";

const CreateEditProgramModal = ({
  closeModal,
  elementProps,
}: IModalElementProps) => {
  const { injectedData } = elementProps;
  const { successNotifcation } = useNotification();
  const { slug, ...rest } = injectedData.data;
  const [form] = Form.useForm();
  const client = useQueryClient();
  const { post, put } = useApiProvider();
  const trigger = useError();
  const { mutate } = useMutation({
    mutationFn: (payload: any) => {
      return slug ? put(`program/${slug}`, payload) : post("program", payload);
    },
    onSuccess() {
      successNotifcation(
        `Uspešno ste ${slug ? "izmenili" : "kreirali"} program`
      );
      client.invalidateQueries({
        queryKey: [PROGRAM_QUERY_KEY],
      });
      closeModal();
    },
    onError(err) {
      trigger(err);
    },
  });
  useEffect(() => {
    if (slug) {
      form.setFieldsValue(rest);
    }
  }, []);
  return (
    <>
      <Form
        name={"create-edit-program-form"}
        form={form}
        onFinish={(values) => {
          mutate(values);
        }}
        initialValues={{
          naziv: null,
          headline: null,
          title: null,
          caption: null,
          desc: null,
        }}
        className="py-2"
      >
        <Form.Item
          label="Naziv Programa"
          name="naziv"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Caption" name="caption" rules={[{ required: false }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Opis" name="desc" rules={[{ required: false }]}>
          <TextArea />
        </Form.Item>

        <Row justify={"end"} className="mt-2">
          <Space>
            <Button htmlType="submit" type="primary">
              {slug ? "Izmeni" : "Sačuvaj"}
            </Button>
            <Button danger onClick={closeModal}>
              Odustani
            </Button>
          </Space>
        </Row>
      </Form>
    </>
  );
};

export { CreateEditProgramModal };
