import { useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";
import Table from "../../../components/table/Table";
import { unProtectedCall } from "../../services/organizationService";

import { Toast } from "primereact/toast";

const tableName = "User Management";

const formStyles = {
  noOfFledsInARow: {
    sm: 12,
    md: 6,
    lg: 3,
    xl: 3,
  },
  inputFields: {
    text: "",
    bgColor: "",
    border: "",
    padding: "",
    fontWeight: "",
    fontSize: "",
  },
  labelStyle: {
    text: "",
    padding: "",
    fontWeight: "600",
    fontSize: "",
  },
};

const tableStyle = {
  addBtn: {
    wrapperBg: "",
    wrapperBorder: "",
    wrapperBorderRadius: "",
    btnBg: "",
    btnText: "",
    btnFontSize: "",
    btnFontWeight: "",
    btnBorder: "",
    btnBorderRadius: "",
  },
  pagination: {
    bg: "",
    fontSize: "",
    fontWeight: "",
    alignment: "end",
  },
  tableHeader: {
    text: " ",
    bg: "",
    iconBorder: "",
    fontSize: "",
    fontWeight: "",
  },
  tableBody: {
    text: "",
    bg: "",
    fontSize: "",
    fontWeight: "",
  },
};

export default function Organization() {
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  const [row, setRow] = useState({});
  const [isMenuOpen, setMenuOpen] = useState(false);

  const head = Object.keys(
    products.length ? { ...products[0], action: "action" } : {}
  ).filter((elem) => elem !== "id" && elem !== "logo");

  const actions = [
    {
      label: "Edit",
      icon: "pi pi-pen-to-square",
      command: () => {
        navigate("/organization_demo/edit", { state: { id: row?.id } });
      },
    },
    {
      label: "View",
      icon: "pi pi-eye",
      command: () => {
        navigate("/organization_demo/view", { state: { id: row?.id } });
      },
    },
    {
      label: "Delete",
      icon: "pi pi-trash",
      command: async () => {
        await unProtectedCall("/organization/delete", { id: row?.id }, "post");

        setMenuOpen(false);
      },
    },
  ];
  useEffect(
    () => async () => {
      const data = await unProtectedCall("/organization");
      setProducts(data);
    },
    []
  );

  return (
    <>
      <Table
        products={products}
        setProducts={setProducts}
        size="large"
        actions={actions}
        head={head}
        addBtnAction={() => {
          navigate("/organization_demo/add");
        }}
        tableStyle={tableStyle}
        tableName={tableName}
        btnStyle={{}}
        btnWrapperStyle={{}}
        tableHeaderStyle={{}}
        paginationStyle={{}}
        tableBodyStyle={{}}
        btnClassName=""
        btnWrapperClassName=""
        tableHeaderClassName=""
        paginationClassName=""
        tableBodyClassName=""
        formStyles={formStyles}
        setRow={setRow}
        setMenuOpen={setMenuOpen}
        isMenuOpen={isMenuOpen}
      />
    </>
  );
}
