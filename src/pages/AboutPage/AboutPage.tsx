import { ABOUT_QUERY_KEY } from "./constants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, Row, Space, Upload, UploadProps } from "antd";
import { useEffect } from "react";
import TextArea from "antd/es/input/TextArea";
import { useNotification } from "../../hooks";
import { useApiProvider } from "../../context";

const AboutPage = () => {
  const [form] = Form.useForm();
  const { get, post } = useApiProvider();
  const client = useQueryClient();
  const { successNotifcation } = useNotification();
  const { data } = useQuery({
    queryKey: [ABOUT_QUERY_KEY],
    queryFn: async () => {
      return await get("/about");
    },
  });

  const { mutate } = useMutation({
    mutationFn: (payload: any) => {
      return post("/about", payload);
    },
    onSuccess() {
      successNotifcation(`Uspešno ste sacuvali`);
      client.invalidateQueries({
        queryKey: [ABOUT_QUERY_KEY],
      });
    },
  });

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data]);
  const props: UploadProps = {
    name: "file",
    action: `${import.meta.env.VITE_API}upload-about`,
    // headers: {
    //   authorization: 'authorization-text',
    // },
    onChange(info) {
      if (info.file.status !== "uploading") {
      }
      if (info.file.status === "done") {
        // message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        // message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <>
      <Upload {...props}>
        <Button>Click to header image</Button>
      </Upload>

      <Form
        layout="vertical"
        name={"ABOUT"}
        form={form}
        onFinish={(values) => {
          mutate(values);
        }}
        initialValues={{
          title: null,
          text: null,
          asortiman: [],
        }}
        className="py-2"
      >
        <Form.Item label="Naslov" name="headline">
          <Input />
        </Form.Item>

        <Form.Item label="Text" name="opis">
          <TextArea autoSize />
        </Form.Item>

        <Form.List name="items">
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field, index) => (
                  <div key={field.key}>
                    <Form.Item name={[index, "label"]} label="Label">
                      <Input />
                    </Form.Item>
                    <Form.Item name={[index, "value"]} label="Value">
                      <Input />
                    </Form.Item>
                    <Button
                      danger
                      type="primary"
                      className="dynamic-delete-button"
                      onClick={() => remove(field.name)}
                    >
                      obrisi
                    </Button>
                  </div>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    style={{ width: "60%" }}
                  >
                    dodaj opis
                  </Button>
                </Form.Item>
              </div>
            );
          }}
        </Form.List>

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

export { AboutPage };
