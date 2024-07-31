import { useTableColumnHooks } from "./hooks";
import { PROGRAM_PAGE_MODALS } from "./types";
import { CreateEditProgramModal, RemoveProgramModal } from "./modals";
import { PROGRAM_QUERY_KEY } from "./constants";
import { Form } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { PageTemplate } from "../../components";
import { useApiProvider } from "../../context";

const ProgramPage = () => {
  const columns = useTableColumnHooks();
  const [form] = Form.useForm();
  const { get } = useApiProvider();
  const { data } = useQuery({
    queryKey: ["programi-page"],
    queryFn: async () => {
      return await get("/programi");
    },
  });

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data]);
  return (
    <>
      <PageTemplate
        columns={columns}
        fetchApiRouter={"/program"}
        registredModals={{
          [PROGRAM_PAGE_MODALS.CREATE_EDIT_PROGRAM_MODAL]: {
            element: CreateEditProgramModal,
            antModalConfig: {
              width: 400,
            },
          },
          [PROGRAM_PAGE_MODALS.REMOVE_PROGRAM_MODAL]: {
            element: RemoveProgramModal,
          },
        }}
        queryKey={PROGRAM_QUERY_KEY}
        btnText="program"
        onClickBtn={(open) => {
          open(PROGRAM_PAGE_MODALS.CREATE_EDIT_PROGRAM_MODAL, {
            id: null,
            naziv: null,
          });
        }}
      />
    </>
  );
};

export { ProgramPage };
