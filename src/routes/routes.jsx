import CommonChart from "../components/chart/commonChart/CommonChart";

import User from "../pages/user/User";

import UserAdd from "../pages/user/UserAdd";
import UserEdit from "../pages/user/UserEdit";
import UserView from "../pages/user/UserView";
import UamMenu from "../components/uam/UamMenu";
import RolePermissionsEditAndView from "../pages/rbac/RolePermissionsEdit&View";
import Roles from "../pages/rbac/Roles";
import AddRole from "../pages/rbac/AddRole";
import Organization from "../hrms/pages/organization/Organization";
import OrganizationAdd from "../hrms/pages/organization/OrganizationAdd";
import OrganizationView from "../hrms/pages/organization/OrganizationView";
import OrganizationEdit from "../hrms/pages/organization/OrganizationEdit";

// .

const routes = [
  {
    path: "/products_list",
    name: "User",
    element: <User />,
  },
  {
    path: "/products_list/add",
    name: "Add User",
    element: <UserAdd />,
  },
  {
    path: "/products_list/edit",
    name: "Edit User",
    element: <UserEdit />,
  },
  {
    path: "/products_list/view",
    name: "View User",
    element: <UserView />,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    element: <CommonChart />,
  },

  {
    path: "/menu_builder",
    name: "Menu Builder",
    element: <UamMenu />,
  },

  {
    path: "/role_permissions",
    name: "Role Permissions",
    element: <Roles />,
  },
  {
    path: "/role_permissions/edit",
    name: "Role Permissions Edit",
    element: <RolePermissionsEditAndView />,
  },
  {
    path: "/role_permissions/view",
    name: "Role Permissions View",
    element: <RolePermissionsEditAndView />,
  },
  {
    path: "/role_permissions/add_Role",
    name: "Add Role",
    element: <AddRole />,
  },
  {
    path: "/organization_demo",
    name: "Organization List",
    element: <Organization />,
  },
  {
    path: "/organization_demo/add",
    name: "Organization List",
    element: <OrganizationAdd />,
  },
  {
    path: "/organization_demo/view",
    name: "Organization List",
    element: <OrganizationView />,
  },
  {
    path: "/organization_demo/edit",
    name: "Organization List",
    element: <OrganizationEdit />,
  },
];

export default routes;
