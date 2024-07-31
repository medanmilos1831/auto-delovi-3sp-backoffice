import { Button, Space } from "antd";
import { ABOUT_PAGE_MODALS } from "../types";
import { ModalBtn } from "../../../context";

const useTableColumnHooks = () => {
  const columns = [
    {
      title: "Program",
      dataIndex: "naziv",
      key: "naziv",
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
                      open(ABOUT_PAGE_MODALS.CREATE_EDIT_ABOUT_MODAL, record);
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
                      open(ABOUT_PAGE_MODALS.REMOVE_ABOUT_MODAL, record.id);
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
