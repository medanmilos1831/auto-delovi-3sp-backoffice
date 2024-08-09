import { Button, Space, Upload, UploadProps } from "antd";

import { CATEGORY_PAGE_MODALS } from "../types";
import { ModalBtn } from "../../../context";

const useTableColumnHooks = () => {
  const props: UploadProps = {
    name: "file",
  };
  const columns = [
    {
      dataIndex: "image",
      key: "image",
      render(image: any) {
        return (
          <img
            src={image}
            style={{
              height: "5rem",
              width: "5rem",
              objectFit: "contain",
            }}
          />
        );
      },
    },
    {
      title: "Kategorija naziv",
      dataIndex: "naziv",
      key: "naziv",
    },
    {
      render(record: any) {
        return (
          <Upload
            {...props}
            action={`${import.meta.env.VITE_API}upload-category`}
            data={{
              slug: record.slug,
            }}
          >
            <Button>Click to Upload</Button>
          </Upload>
        );
      },
    },
    {
      title: "Naziv programa",
      dataIndex: "program",
      key: "program",
      render(_: any, record: any) {
        return (
          <>
            {record.program.map((item: any, index: number) => {
              return <div key={index}>{item.label}</div>;
            })}
          </>
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
                        CATEGORY_PAGE_MODALS.CREATE_EDIT_CATEGORY_MODAL,
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
                    type="primary"
                    danger
                    onClick={() => {
                      open(CATEGORY_PAGE_MODALS.REMOVE_CATEGORY_MODAL, record);
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
