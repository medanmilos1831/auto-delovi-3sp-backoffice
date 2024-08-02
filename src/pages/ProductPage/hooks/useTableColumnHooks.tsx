import { Button, Space, Upload, UploadProps } from "antd";
import { PRODUCT_PAGE_MODALS } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PRODUCTS_QUERY_KEY } from "../constants";
import { useNotification } from "../../../hooks";
import { ModalBtn, useApiProvider } from "../../../context";

const useTableColumnHooks = () => {
  const client = useQueryClient();
  const { put } = useApiProvider();
  const props: UploadProps = {
    name: "file",
    // action: 'http://localhost:3000/upload',
    // headers: {
    //   authorization: 'authorization-text',
    // },
    onChange(info) {
      if (info.file.status !== "uploading") {
      }
      if (info.file.status === "done") {
        client.invalidateQueries({
          queryKey: [PRODUCTS_QUERY_KEY],
        });
        // message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        // message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const { successNotifcation } = useNotification();

  useMutation({
    mutationFn: (payload: any) => {
      return put(`/product-publish/${payload}`);
    },
    onSuccess() {
      successNotifcation(`Uspešno ste sacuvali`);
      client.invalidateQueries({
        queryKey: [PRODUCTS_QUERY_KEY],
      });
    },
  });

  const columns = [
    {
      dataIndex: "image",
      key: "image",
      render(image: any) {
        return (
          <>
            {image ? (
              <img
                src={image}
                style={{
                  height: "5rem",
                  width: "5rem",
                  objectFit: "contain",
                }}
              />
            ) : (
              "nema slike"
            )}
          </>
        );
      },
    },
    {
      title: "Prozvod naziv",
      dataIndex: "naziv",
      key: "naziv",
    },
    {
      title: "Kataloski broj",
      dataIndex: "kataloski_broj",
      key: "kataloski_broj",
    },
    {
      render(record: any) {
        return (
          <Upload
            {...props}
            action={`${import.meta.env.VITE_API}uploads/product`}
            data={{
              slug: record.slug,
            }}
          >
            <Button>Upload slike</Button>
          </Upload>
        );
      },
    },
    {
      title: "Ime kategorije",
      dataIndex: "categories",
      key: "categories",
      render(_: any, re: any) {
        return (
          <>
            {re.categories.map((i: any, index: any) => {
              return <span key={index}>{i.label}</span>;
            })}
          </>
        );
      },
    },
    {
      title: "Ime programa",
      dataIndex: "programs",
      key: "programs",
      render(_: any, re: any) {
        return (
          <div>
            {re.programs.map((i: any, index: number) => {
              return <div key={index}>{i.label}</div>;
            })}
          </div>
        );
      },
    },
    {
      render(record: any) {
        return (
          <Space>
            <ModalBtn>
              {(open) => {
                return (
                  <Button
                    type="primary"
                    onClick={() => {
                      open(
                        PRODUCT_PAGE_MODALS.CREATE_EDIT_PRODUCT_MODAL,
                        record
                      );
                    }}
                  >
                    Izmeni
                  </Button>
                );
              }}
            </ModalBtn>
            <ModalBtn>
              {(open) => {
                return (
                  <Button
                    danger
                    type="primary"
                    onClick={() => {
                      open(PRODUCT_PAGE_MODALS.REMOVE_PRODUCT_MODAL, record);
                    }}
                  >
                    Obriši
                  </Button>
                );
              }}
            </ModalBtn>
          </Space>
        );
      },
    },
  ];
  return columns;
};

export { useTableColumnHooks };
