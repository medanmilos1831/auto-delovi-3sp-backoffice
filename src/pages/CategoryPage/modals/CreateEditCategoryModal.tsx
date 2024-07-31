import { Button, Form, Input, Select } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CATEGORIES_QUERY_KEY } from "../constants";
import { useEffect } from "react";
import TextArea from "antd/es/input/TextArea";
import { useNotification } from "../../../hooks";
import { IModalElementProps, useApiProvider } from "../../../context";
import { useFetchPrograms } from "../../ProgramPage/hooks";

const CreateEditCategoryModal = ({
  closeModal,
  elementProps,
}: IModalElementProps) => {
  const { injectedData } = elementProps;
  const { successNotifcation } = useNotification();
  const { slug, ...rest } = injectedData.data;
  const [form] = Form.useForm();
  const client = useQueryClient();
  const { post, put } = useApiProvider();
  const { data, isLoading, isFetching } = useFetchPrograms();
  const { mutate } = useMutation({
    mutationFn: (payload: any) => {
      return slug
        ? put(`/category/${slug}`, {
            ...payload,
          })
        : post("/category", payload);
    },
    onSuccess() {
      successNotifcation(
        `uspesno ste ${slug ? "izmenili" : "kreirali"} kategoriju`
      );
      client.invalidateQueries({
        queryKey: [CATEGORIES_QUERY_KEY],
      });
      closeModal();
    },
  });
  useEffect(() => {
    if (slug) {
      form.setFieldsValue({
        naziv: rest.naziv,
        desc: rest.desc ?? null,
        caption: rest.caption ?? null,
        programId: rest.program.map((i: any) => {
          return i.value;
        }),
      });
    }
  }, []);
  return (
    <>
      <Form
        form={form}
        name="create_edit_category_form"
        onFinish={(values: any) => {
          mutate(values);
        }}
        className="py-2"
        style={{ maxWidth: 600 }}
        initialValues={{
          naziv: null,
          programId: [],
        }}
      >
        <Form.Item name="naziv" label="Naziv" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Caption" name="caption" rules={[{ required: false }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Opis" name="desc" rules={[{ required: false }]}>
          <TextArea />
        </Form.Item>
        <Form.Item
          name="programId"
          label="program"
          rules={[{ required: true }]}
        >
          <Select
            mode="multiple"
            disabled={isLoading || isFetching}
            placeholder="Izaberi program"
            allowClear
            options={(() => {
              return data?.map((item: any) => {
                return {
                  value: item.slug,
                  label: item.naziv,
                };
              });
            })()}
          ></Select>
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Sačuvaj
        </Button>
      </Form>
    </>
  );
};

export { CreateEditCategoryModal };
