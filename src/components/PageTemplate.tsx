import { useQuery } from "@tanstack/react-query";
import { Button, Col, Row, Table } from "antd";
import {
  modalsType,
  openModalHandler,
  useApiProvider,
  ModalProvider,
  ModalBtn,
} from "../context";

interface IPageTemplate {
  columns: any;
  fetchApiRouter: string;
  registredModals: modalsType;
  queryKey: string;
  btnText?: string;
  onClickBtn: (open: openModalHandler) => void;
  rowKey?: string;
}

const PageTemplate = ({
  columns,
  registredModals,
  queryKey,
  fetchApiRouter,
  btnText,
  onClickBtn,
  rowKey = "slug",
}: IPageTemplate) => {
  const { get } = useApiProvider();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      return await get(fetchApiRouter);
    },
  });
  return (
    <ModalProvider
      modals={registredModals}
      modalConfig={{
        destroyOnClose: true,
      }}
    >
      <>
        <Row justify={"end"} className="p-2">
          <Col className="mb-2">
            <ModalBtn>
              {(open) => {
                return (
                  <Button
                    type="primary"
                    onClick={() => onClickBtn(open)}
                  >{`Kreiraj ${btnText ? btnText : ``}`}</Button>
                );
              }}
            </ModalBtn>
          </Col>
          <Col span={24}>
            <Table
              loading={isLoading || isFetching}
              dataSource={data ? data : ([] as any)}
              columns={columns}
              rowKey={rowKey}
              locale={{ emptyText: "Nema podatak" }}
            />
          </Col>
        </Row>
      </>
    </ModalProvider>
  );
};

export { PageTemplate };
