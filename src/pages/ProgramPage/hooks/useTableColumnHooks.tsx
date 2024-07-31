import { Button, Space, Upload, UploadProps } from "antd";

import { PROGRAM_PAGE_MODALS } from "../types";
import { ModalBtn } from "../../../context";

const useTableColumnHooks = () => {
  const props: UploadProps = {
    name: "file",
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
      title: "Program",
      dataIndex: "naziv",
      key: "naziv",
    },
    {
      render(record: any) {
        return (
          <Upload
            {...props}
            action={`${import.meta.env.VITE_API}/upload`}
            data={{
              id: record.id,
              slug: record.slug,
            }}
          >
            <Button>Click to Upload</Button>
          </Upload>
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
                        PROGRAM_PAGE_MODALS.CREATE_EDIT_PROGRAM_MODAL,
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
                      open(PROGRAM_PAGE_MODALS.REMOVE_PROGRAM_MODAL, record);
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
