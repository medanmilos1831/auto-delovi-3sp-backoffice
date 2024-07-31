import { useTableColumnHooks } from "./hooks";
import { CreateEditCategoryModal, RemoveCategoryModal } from "./modals";

import { CATEGORIES_QUERY_KEY } from "./constants";
import { CATEGORY_PAGE_MODALS } from "./types";
import { PageTemplate } from "../../components";

const CategoryPage = () => {
  const columns = useTableColumnHooks();
  return (
    <>
      <PageTemplate
        columns={columns}
        fetchApiRouter={`/category`}
        registredModals={{
          [CATEGORY_PAGE_MODALS.CREATE_EDIT_CATEGORY_MODAL]: {
            element: CreateEditCategoryModal,
            antModalConfig: {
              width: 400,
            },
          },
          [CATEGORY_PAGE_MODALS.REMOVE_CATEGORY_MODAL]: {
            element: RemoveCategoryModal,
          },
        }}
        queryKey={CATEGORIES_QUERY_KEY}
        btnText="kategoriju"
        onClickBtn={(open) => {
          open(CATEGORY_PAGE_MODALS.CREATE_EDIT_CATEGORY_MODAL, {
            id: null,
            naziv: null,
          });
        }}
      />
    </>
  );
};

export { CategoryPage };
