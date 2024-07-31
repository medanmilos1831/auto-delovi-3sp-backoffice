import { CONTACT_QUERY_KEY } from "./constants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, Row, Space } from "antd";
import { useEffect } from "react";
import { useApiProvider } from "../../context";
import { useNotification } from "../../hooks";

const ContactPage = () => {
  const [form] = Form.useForm();
  const { get, post } = useApiProvider();
  const client = useQueryClient();
  const { successNotifcation } = useNotification();
  const { data } = useQuery({
    queryKey: [CONTACT_QUERY_KEY],
    queryFn: async () => {
      return await get("/kontakt");
    },
  });
  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data]);
  const { mutate } = useMutation({
    mutationFn: (payload: any) => {
      return post("/kontakt", payload);
    },
    onSuccess() {
      successNotifcation(`Uspešno ste sacuvali`);
      client.invalidateQueries({
        queryKey: [CONTACT_QUERY_KEY],
      });
    },
  });

  useEffect(() => {
    if (data?.hasContact) {
      const { id, ...rest } = data.contact;
      form.setFieldsValue(rest);
    }
  }, [data]);

  return (
    <Form
      layout="vertical"
      name={"contact"}
      form={form}
      onFinish={(values) => {
        mutate(values);
      }}
      initialValues={{
        instagram: null,
        facebook: null,
        email: null,
        adresa: null,
        coordinate: null,
      }}
      className="py-2"
    >
      <Form.Item
        label="Instagram"
        name="instagram"
        rules={[{ required: false }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Facebook" name="facebook" rules={[{ required: false }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Phone" name="phone" rules={[{ required: false }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Email" name="email" rules={[{ required: false }]}>
        <Input />
      </Form.Item>
      <Form.Item label="adresa" name="adresa" rules={[{ required: false }]}>
        <Input />
      </Form.Item>
      <Form.Item
        label="coordinate"
        name="coordinate"
        rules={[{ required: false }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="radnimDanima"
        name="radnimDanima"
        rules={[{ required: false }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="subotom" name="subotom" rules={[{ required: false }]}>
        <Input />
      </Form.Item>
      <Form.Item label="nedeljom" name="nedeljom" rules={[{ required: false }]}>
        <Input />
      </Form.Item>

      <Row justify={"end"} className="mt-2">
        <Space>
          <Button htmlType="submit" type="primary">
            Sačuvaj
          </Button>
        </Space>
      </Row>
    </Form>
  );
};

export { ContactPage };
