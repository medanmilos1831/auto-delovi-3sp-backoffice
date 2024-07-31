import { useTableColumnHooks } from "./hooks";
import { CreateEditProductModal, RemoveProductModal } from "./modals";
import { PRODUCT_PAGE_MODALS } from "./types";
import { PRODUCTS_QUERY_KEY } from "./constants";
import { PageTemplate } from "../../components";

const ProductPage = () => {
  const columns = useTableColumnHooks();
  return (
    <>
      <>
        <PageTemplate
          columns={columns}
          fetchApiRouter={"/product"}
          rowKey="id"
          registredModals={{
            [PRODUCT_PAGE_MODALS.CREATE_EDIT_PRODUCT_MODAL]: {
              element: CreateEditProductModal,
              antModalConfig: {
                width: 1200,
              },
            },
            [PRODUCT_PAGE_MODALS.REMOVE_PRODUCT_MODAL]: {
              element: RemoveProductModal,
            },
          }}
          queryKey={PRODUCTS_QUERY_KEY}
          btnText="proizvod"
          onClickBtn={(open) => {
            open(PRODUCT_PAGE_MODALS.CREATE_EDIT_PRODUCT_MODAL, {
              id: null,
              naziv: null,
              cena: null,
            });
          }}
        />
      </>
    </>
  );
};

export { ProductPage };
