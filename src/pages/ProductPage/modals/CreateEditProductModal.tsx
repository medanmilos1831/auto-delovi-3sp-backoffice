import { Button, Form, Input, Select } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PRODUCTS_QUERY_KEY } from "../constants";
import TextArea from "antd/es/input/TextArea";
import { useEffect } from "react";
import { useNotification } from "../../../hooks";
import { IModalElementProps, useApiProvider } from "../../../context";
import { useFetchProgramCategories } from "../../CategoryPage/hooks";

const CreateEditProductModal = ({
  closeModal,
  elementProps,
}: IModalElementProps) => {
  const { injectedData } = elementProps;
  const { successNotifcation } = useNotification();
  const { id, ...rest } = injectedData.data;
  const [form] = Form.useForm();
  const client = useQueryClient();
  const { post, put } = useApiProvider();
  const { data, isLoading, isFetching } = useFetchProgramCategories();
  useEffect(() => {
    form.setFieldsValue({
      ...rest,
      categoryId: rest?.categories ? rest?.categories[0] : null,
      programId: rest.programs ?? null,
    });
  }, []);
  console.log("data", data);
  const { mutate } = useMutation({
    mutationFn: (payload: any) => {
      return injectedData.data.slug
        ? put(`/product/${injectedData.data.slug}`, {
            ...payload,
            programId:
              typeof payload.programId[0] === "object"
                ? payload.programId.map((i: any) => i.value)
                : payload.programId,
            categoryId: [payload.categoryId],
          })
        : post("/product", payload);
    },
    onSuccess() {
      successNotifcation(
        `uspesno ste ${
          injectedData.data.slug ? "izmenili" : "kreirali"
        } kategoriju`
      );
      client.invalidateQueries({
        queryKey: [PRODUCTS_QUERY_KEY],
      });
      closeModal();
    },
  });
  return (
    <>
      <Form
        form={form}
        name="control-hooks"
        onFinish={(values: any) => {
          mutate(values);
        }}
        className="py-2"
        style={{ maxWidth: 600 }}
        initialValues={rest}
      >
        <Form.Item name="naziv" label="Naziv" rules={[{ required: false }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="kataloski_broj"
          label="kataloski broj"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="caption" label="Caption" rules={[{ required: false }]}>
          <Input />
        </Form.Item>
        <Form.Item name="cena" label="Cena" rules={[{ required: false }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Opis" name="opis">
          <TextArea autoSize rows={10} cols={10} />
        </Form.Item>
        <Form.Item name="categoryId" label="kategorija">
          <Select
            disabled={isLoading || isFetching}
            placeholder="Izaberi kategoriju"
            allowClear
            options={(() => {
              return data?.map((item: any) => {
                return {
                  value: item.slug,
                  label: `${item.naziv}`,
                  item,
                };
              });
            })()}
          ></Select>
        </Form.Item>
        <Form.Item
          shouldUpdate={(prev, curr) => {
            if (prev.categoryId != curr.categoryId) {
              return true;
            }
            return false;
          }}
        >
          {({ getFieldValue }) => {
            let opt: any = [];
            const category = getFieldValue("categoryId");
            // console.log('newProductSlug', category, data);
            if (category) {
              console.log("milos", category);
              if (typeof category === "string") {
                let d = data?.find((i: any) => i.slug === category);
                opt = d?.program;
              } else {
                let d = data?.find((i: any) => i.slug === category.value);
                opt = d?.program;
              }
            }
            return (
              <Form.Item name="programId" label="Program">
                <Select
                  mode="multiple"
                  disabled={isLoading || isFetching}
                  placeholder="Izaberi program"
                  allowClear
                  options={opt}
                  // options={(() => {
                  //   return data?.map((item: any, index: any) => {
                  //     return {
                  //       value: item.id,
                  //       label: `${item.category.naziv}-${item.program.naziv}`,
                  //       item,
                  //     };
                  //   });
                  // })()}
                ></Select>
              </Form.Item>
            );
          }}
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
                    {fields.length > 1 ? (
                      <Button
                        danger
                        type="primary"
                        className="dynamic-delete-button"
                        onClick={() => remove(field.name)}
                      >
                        obrisi
                      </Button>
                    ) : null}
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
        <Button type="primary" htmlType="submit">
          Sačuvaj
        </Button>
      </Form>
    </>
  );
};

export { CreateEditProductModal };
