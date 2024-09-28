import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Ripple } from "primereact/ripple";
import { useNavigate } from "react-router-dom";
import Menu from "./Menu";
import styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteDetails, selectLoggedUser } from "../../pages/login/loginSlice";
import { deleteUser } from "../../pages/user/userSlice";

export default function Drawer({ children }) {
  const navigate = useNavigate();

  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();
  const loggedUser = useSelector(selectLoggedUser);

  useEffect(() => {
    if (loggedUser?.role === undefined) {
      navigate("/");
    }
  }, [loggedUser?.role, navigate]);

  const sideBar = [
    loggedUser?.role === "admin" && {
      div: "Admin",
      li: [
        {
          icon: "pi pi-home",
          name: "Dashboard",
          click: () => {
            navigate("/dashboard");
          },
        },
        {
          icon: "pi pi-user",
          name: "RBAC",
          li: [
            {
              icon: "pi pi-sitemap",
              name: "Menu Builder",
              click: () => {
                navigate("/menu_builder");
              },
            },
            {
              icon: "pi pi-user-edit",
              name: "Role Permissions",
              click: () => {
                navigate("/role_permissions");
              },
            },
          ],
        },
      ],
    },
    loggedUser?.role === "department_user" && {
      div: "Department",
      li: [
        {
          icon: "pi pi-cart-minus",
          name: "Products",
          li: [
            {
              icon: "pi pi-table",
              name: "Products List",
              click: () => {
                navigate("/products_list");
              },
            },
            {
              icon: "pi pi-cart-plus",
              name: "Add Product",
              click: () => {
                navigate("/products_list/add");
              },
            },
          ],
        },
      ],
    },
    loggedUser?.role === "demo" && {
      div: "Organization",
      li: [
        {
          icon: "pi pi-table",
          name: "Organization List",
          click: () => {
            navigate("/organization_demo");
          },
        },
        {
          icon: "pi pi-cart-plus",
          name: "Organization Add",
          click: () => {
            navigate("/organization_demo/add");
          },
        },
      ],
    },
  ].filter(Boolean);

  const [width, setWidth] = useState("2");

  // State to keep track of which menu sections and submenus are open.
  const [openSections, setOpenSections] = useState({});

  // Toggle the open/closed state of menu sections or submenus
  const toggleSection = (key) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const renderMenuItems = (items, parentKey) => {
    return items.map((item, index) => {
      const itemKey = `${parentKey}-${index}`;
      const hasChildren = item.li && item.li.length > 0;

      return (
        <li key={index} className="p-mb-2">
          {hasChildren ? (
            <>
              <div
                className={`${styles.screens} p-ripple flex align-items-center cursor-pointer p-3 border-round transition-duration-150 transition-colors w-full`}
                style={
                  width === "2"
                    ? { color: "var(--text-white)" }
                    : { justifyContent: "center", color: "var(--text-white)" }
                }
                onClick={() => toggleSection(itemKey)}
              >
                <i
                  className={`${item.icon}`}
                  style={
                    width === "2"
                      ? { color: "var(--text-white)" }
                      : { fontSize: "20px", color: "var(--text-white)" }
                  }
                ></i>
                {width === "2" && (
                  <span
                    style={{ color: "var(--text-white)" }}
                    className="font-medium ml-3"
                  >
                    {item.name}
                  </span>
                )}
                <i
                  style={{ color: "var(--text-white)" }}
                  className={
                    width !== "2"
                      ? "pi pi-chevron-down"
                      : "pi pi-chevron-down ml-auto"
                  }
                ></i>
                <Ripple />
              </div>
              {openSections[itemKey] && (
                <ul className="list-none py-0 pl-3 pr-0 m-0">
                  {renderMenuItems(item.li, itemKey)}
                </ul>
              )}
            </>
          ) : (
            <a
              onClick={item.click}
              className={`${styles.screens} p-ripple flex align-items-center cursor-pointer p-3 border-round transition-duration-150 transition-colors w-full`}
              style={
                width === "2"
                  ? { color: "var(--text-white)" }
                  : { justifyContent: "center", color: "var(--text-white)" }
              }
            >
              <i
                className={`${item.icon} mr-3`}
                style={
                  width === "2"
                    ? { color: "var(--text-white)" }
                    : { fontSize: "20px", color: "var(--text-white)" }
                }
              ></i>
              {width === "2" && (
                <span
                  className="font-medium"
                  style={{ color: "var(--text-white)" }}
                >
                  {item.name}
                </span>
              )}
              <Ripple />
            </a>
          )}
        </li>
      );
    });
  };

  return (
    <>
      {" "}
      <div className="">
        <Menu setVisible={setVisible} />
      </div>
      <div className="grid min-h-screen" style={{ margin: "0px" }}>
        <div className={`hidden lg:flex lg:col-${width} p-0`}>
          <div
            id="app-sidebar-2"
            className="surface-section h-screen block flex-shrink-0 absolute lg:static left-0 top-0 z-1 border-right-1 surface-border select-none"
            style={{ width: "100%" }}
          >
            <div
              className="flex flex-column h-full"
              style={{ backgroundColor: `var(--primary-color)` }}
            >
              <div className="flex align-items-center justify-content-between px-4 pt-3 flex-shrink-0">
                <span className="flex align-items-center justify-content-center ">
                  <img
                    src={
                      width === "2"
                        ? import.meta.env.VITE_LOGO_Large
                        : import.meta.env.VITE_LOGO_Small
                    }
                    width={"100%"}
                    alt="logo"
                  />
                </span>
                <span>
                  <Button
                    type="button"
                    icon={
                      width === "2"
                        ? "pi pi-chevron-left "
                        : "pi pi-chevron-right text-xs"
                    }
                    style={
                      width === "2"
                        ? { color: "var(--text-white)" }
                        : {
                            color: "var(--text-white)",
                            width: "25px",
                            height: "20px",
                          }
                    }
                    rounded
                    outlined
                    onClick={() =>
                      setWidth((prev) => (prev === "2" ? "1" : "2"))
                    }
                  ></Button>
                </span>
              </div>
              <div className="overflow-y-none">
                {sideBar.map((elem, index) => {
                  const sectionKey = `section-${index}`;
                  return (
                    <ul key={index} className="list-none p-2 m-0">
                      <li>
                        <div
                          className="p-ripple p-3 flex align-items-center justify-content-between text-600 cursor-pointer"
                          onClick={() => toggleSection(sectionKey)}
                        >
                          <span
                            className={
                              width === "2"
                                ? "font-medium "
                                : "font-medium text-sm "
                            }
                            style={{ color: "var(--text-white)" }}
                          >
                            {elem.div}
                          </span>
                          <i
                            className="pi pi-chevron-down "
                            style={{ color: "var(--text-white)" }}
                          ></i>
                          <Ripple />
                        </div>
                        {openSections[sectionKey] && (
                          <ul className="list-none p-0 m-0">
                            {renderMenuItems(elem.li, sectionKey)}
                          </ul>
                        )}
                      </li>
                    </ul>
                  );
                })}
              </div>
              <div className="mt-auto">
                <hr className="mb-3 mx-3 border-top-1 border-none surface-border" />
                <a
                  className="m-3 flex align-items-center cursor-pointer p-3 gap-2 border-round  font-semibold  transition-duration-150 transition-colors p-ripple"
                  style={{
                    justifyContent: "center",
                    color: "var(--text-white)",
                  }}
                  onClick={() => {
                    dispatch(deleteUser([]));
                    dispatch(deleteDetails());
                    navigate("/");
                  }}
                >
                  <i className="pi pi-sign-out" />
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{ flexDirection: "column", overflow: "hidden" }}
          className={`col-12 lg:col-${width === "2" ? "10" : "11"} p-0`}
        >
          <main style={{ marginLeft: "1%", marginRight: "1%" }}>
            {children}
          </main>
        </div>

        <div
          style={{
            display: visible ? "flex" : "none",
            justifyContent: "center",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            zIndex: "1000",
            color: "var(--text-white)",
          }}
          className="lg:hidden"
        >
          <div
            className="flex flex-column h-full"
            style={{ backgroundColor: `var(--primary-color)` }}
          >
            <div className="flex align-items-center justify-content-between px-4 pt-3 flex-shrink-0">
              <span className="flex align-items-center justify-content-center ">
                <img
                  src={
                    width === "2"
                      ? import.meta.env.VITE_LOGO_Large
                      : import.meta.env.VITE_LOGO_Small
                  }
                  width={"50%"}
                  alt="logo"
                />
              </span>
              <span>
                <Button
                  type="button"
                  icon={"pi pi-times"}
                  style={{ color: "var(--text-white)" }}
                  rounded
                  outlined
                  className="h-2rem w-2rem"
                  onClick={() => setVisible(false)}
                ></Button>
              </span>
            </div>
            <div className="overflow-y-none">
              {sideBar.map((elem, index) => {
                const mobileSectionKey = `mobile-section-${index}`;
                return (
                  <ul key={index} className="list-none p-2 m-0">
                    <li>
                      <div
                        className="p-ripple p-3 flex align-items-center justify-content-between text-600 cursor-pointer"
                        onClick={() => toggleSection(mobileSectionKey)}
                      >
                        <span
                          className={
                            width === "2"
                              ? "font-medium "
                              : "font-medium text-sm "
                          }
                          style={{ color: "var(--text-white)" }}
                        >
                          {elem.div}
                        </span>
                        <i
                          className="pi pi-chevron-down"
                          style={{ color: "var(--text-white)" }}
                        ></i>
                        <Ripple />
                      </div>
                      {openSections[mobileSectionKey] && (
                        <ul className="list-none p-0 m-0 overflow-hidden">
                          {renderMenuItems(elem.li, mobileSectionKey)}
                        </ul>
                      )}
                    </li>
                  </ul>
                );
              })}
            </div>
            <div className="mt-auto">
              <hr className="mb-3 mx-3 border-top-1 border-none surface-border" />
              <a
                className="m-3 flex align-items-center cursor-pointer p-3 gap-2 border-round  font-semibold  transition-duration-150 transition-colors p-ripple"
                style={{
                  justifyContent: "center",
                  color: "var(--text-white)",
                }}
                onClick={() => {
                  dispatch(deleteUser([]));
                  dispatch(deleteDetails());
                  navigate("/");
                }}
              >
                <i className="pi pi-sign-out" />
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
