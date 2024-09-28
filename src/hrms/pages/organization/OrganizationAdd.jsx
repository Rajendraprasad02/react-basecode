import CustomForm from "../../../components/form/customForm/CustomForm";

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
const formStyles = {
  noOfFledsInARow: {
    sm: 12,
    md: 12,
    lg: 12,
    xl: 12,
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

export default function OrganizationAdd() {
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "50% 50%" }}>
        <div>
          {" "}
          <CustomForm
            formDT={formDT}
            formStyles={formStyles}
            submitButton={() => {}}
            extraButtons={[
              {
                BorASubmit: "a",
                name: "Cancel",
                icon: { iconName: "pi pi-times", BorAname: "b" },
                btnAction: () => {},
                style: { background: "red" },
              },
            ]}
            steps={{
              isStepperNeeded: true,
              noFieldsInAStep: 3,
              stepperLabel: [
                { label: "personal info" },
                { label: "other info" },
                { label: "other info" },
                { label: "other info" },
              ],
            }}
          />
        </div>
        <div></div>
      </div>
    </>
  );
}
