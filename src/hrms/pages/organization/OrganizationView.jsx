import { useLocation } from "react-router-dom";
import CustomFormWrapper from "../../../components/form/customForm/CustomFormWrapper";
import { unProtectedCall } from "../../services/organizationService";
import { useEffect, useState } from "react";

const formDT = [
  {
    labelText: "Organization Name",
    name: "organizationName",
    id: "organizationName",
    placeholder: "Enter Organization Name",
    type: "text",
    defaultValue: "",
    disabled: "",
    required: "Enter Organization Name ",
  },
  {
    labelText: "Organization District",
    name: "organizationDistrict",
    id: "organizationDistrict",
    placeholder: "Organization District",
    type: "text",
    defaultValue: "",
    disabled: "",
    required: "Enter Organization District",
  },
  {
    labelText: "Phone Number",
    name: "phoneNumber",
    id: "phoneNumber",
    placeholder: "Phone Number",
    type: "text",
    defaultValue: "",
    disabled: "",
    required: "Enter Phone Number",
  },
  {
    labelText: "Email",
    name: "email",
    id: "email",
    placeholder: "Email",
    type: "text",
    defaultValue: "",
    disabled: "",
    required: "Enter Email",
  },
  {
    labelText: "Address",
    name: "address",
    id: "address",
    placeholder: "Address",
    type: "textarea",
    defaultValue: "",
    disabled: "",
    required: "Enter Address",
  },
  {
    labelText: "Logo",
    name: "logo",
    id: "logo",
    placeholder: "Logo",
    type: "text",
    defaultValue: "",
    disabled: "",
    required: "Enter Logo",
  },
];
export default function OrganizationView() {
  const { state } = useLocation();
  const [newFormData, setFormData] = useState();

  useEffect(
    () => async () => {
      const data = await unProtectedCall(`/organization/${state?.id}`);
      const formData = formDT?.map((elem) => {
        return { ...elem, defaultValue: data[elem?.id], disabled: true };
      });
      setFormData(formData);
    },
    [state?.id]
  );

  return (
    <CustomFormWrapper
      formName="Edit User"
      formDT={newFormData}
      submitButton={false}
    />
  );
}
