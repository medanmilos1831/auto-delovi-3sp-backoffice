import { Button, Col, Row } from "antd";
import { NavLink, Outlet } from "react-router-dom";
import { SPA_ROUTES } from "../constants";
import { useApiProvider } from "../context";

const HomePage = () => {
  const { post } = useApiProvider();
  const navLinkMap = [
    {
      label: "Programi",
      url: SPA_ROUTES.PROGRAM_PAGE,
    },
    {
      label: "Kategorije",
      url: SPA_ROUTES.CATEGORY_PAGE,
    },
    {
      label: "Prozivodi",
      url: SPA_ROUTES.PRODUCT_PAGE,
    },
    {
      label: "O nama",
      url: SPA_ROUTES.ABOUT,
    },
    {
      label: "Kontakt",
      url: SPA_ROUTES.CONTACT,
    },
    {
      label: "Pocetna strana",
      url: SPA_ROUTES.HOME,
    },
  ];
  return (
    <div className="h-100 w-100">
      <Row className="h-100 w-100">
        <Col span={6} className="h-100 bg-blue">
          <Row className="h-100 w-100 flex flex-column">
            {navLinkMap.map((item) => {
              return (
                <Col key={item.url}>
                  <NavLink to={item.url}>
                    {({ isActive }) => {
                      return (
                        <div
                          className={`p-1 transition-04 ${
                            isActive
                              ? "bg-white text-blue"
                              : "bg-blue text-white"
                          }`}
                        >
                          {item.label}
                        </div>
                      );
                    }}
                  </NavLink>
                </Col>
              );
            })}
          </Row>
        </Col>
        <Col span={18}>
          <div>
            <Button
              onClick={() => {
                post("/sync");
              }}
            >
              Sync
            </Button>
          </div>
          <Outlet></Outlet>
        </Col>
      </Row>
    </div>
  );
};

export { HomePage };
