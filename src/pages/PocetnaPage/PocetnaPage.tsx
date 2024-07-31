import { HOME_QUERY_KEY } from "./constants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, Row, Space, Upload, UploadProps } from "antd";
import { useEffect } from "react";
import TextArea from "antd/es/input/TextArea";
import { useApiProvider } from "../../context";
import { useNotification } from "../../hooks";

const PocetnaPage = () => {
  const props: UploadProps = {
    name: "file",
    action: `${import.meta.env.VITE_API}/upload-pocetna`,
    onChange(info) {
      if (info.file.status !== "uploading") {
      }
      if (info.file.status === "done") {
      } else if (info.file.status === "error") {
      }
    },
  };
  const [form] = Form.useForm();
  const { get, post } = useApiProvider();
  const client = useQueryClient();
  const { successNotifcation } = useNotification();
  const { data } = useQuery({
    queryKey: [HOME_QUERY_KEY],
    queryFn: async () => {
      return await get("/pocetna");
    },
  });

  const { mutate } = useMutation({
    mutationFn: (payload: any) => {
      return post("/pocetna", payload);
    },
    onSuccess() {
      successNotifcation(`Uspešno ste sacuvali`);
      client.invalidateQueries({
        queryKey: [HOME_QUERY_KEY],
      });
    },
  });

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data]);

  return (
    <>
      <Upload {...props}>
        <Button>Click to Upload</Button>
      </Upload>
      <Form
        layout="vertical"
        name={"pocetna"}
        form={form}
        onFinish={(values) => {
          mutate(values);
        }}
        initialValues={{
          headline: null,
          desc: null,
        }}
        className="py-2"
      >
        <Form.Item label="Naslov" name="headline" rules={[{ required: false }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Opis" name="desc" rules={[{ required: false }]}>
          <TextArea />
        </Form.Item>

        <Row justify={"end"} className="mt-2">
          <Space>
            <Button htmlType="submit" type="primary">
              Sačuvaj
            </Button>
          </Space>
        </Row>
      </Form>
    </>
  );
};

export { PocetnaPage };
