import { useContext } from "react";
import { useFormik } from "formik";
import { CreateSolicitorSchema } from "utils/Yup/YupSchemas";
import { useMutation } from "@tanstack/react-query";
import { createSolicitorFn } from "utils/ApiFactory/solicitors";
import { UserContext } from "context/UserContext";
import FileUpload from "components/FileUpload";
import InputFormField from "components/InputFormField";
import BaseButton from "components/BaseButton";

const NewCreateSolicitors = () => {
  const { showToast } = useContext(UserContext);
  const { mutate: createSolicitor, isLoading } = useMutation({
    mutationKey: "createSolicitors",
    mutationFn: createSolicitorFn,
    onSuccess: (data) => {
      showToast({
        severity: "success",
        message: "Solicitor Crerated successfully. ",
      });
    },
    onError: (error) => {
      showToast({
        severity: "error",
        message: error.response.data.detail || "An error occurred.",
      });
    },
  });
  const handleSubmit = (values) => {
    createSolicitor(values);
  };
  const formik = useFormik({
    initialValues: {
      nameOfLawFirm: "",
      address: "",
      officialEmailAddressOfFirm: "",
      nameOfPrincipalPartner: "",
      // nameOfPrincipalPartnerNumber: "",
      bankAccountName: "",
      bankAccountNumber: "",
      mdApproval: "",
      staffUsername: "",
    },
    onSubmit: handleSubmit,
    validationSchema: CreateSolicitorSchema,
  });

  const handleNumericFieldChange = (e) => {
    const result = e.target.value.replace(/[^\d]/g, "");
    const { name } = e.target;
    formik.setFieldValue(name, result);
  }

  return (
    <div className="bg-white rounded-[10px] mb-8 py-8">
      <p className="px-6 border-b pb-4 text-[20px] font-bold">
        New Create Solicitor
      </p>

      <form
        className="grid grid-cols-2 px-6 py-[30px] gap-8"
        onSubmit={formik.handleSubmit}
      >
        <InputFormField
          label="Name of the Law Firm"
          placeholder="Law Firm Name"
          name="nameOfLawFirm"
          value={formik.values.nameOfLawFirm}
          type="text"
          onChange={formik.handleChange}
          touched={formik.touched.nameOfLawFirm}
          error={formik.errors.nameOfLawFirm}
        />

        <InputFormField
          label="Address"
          placeholder="Address"
          name="address"
          value={formik.values.address}
          type="text"
          onChange={formik.handleChange}
          touched={formik.touched.address}
          error={formik.errors.address}
        />

        <InputFormField
          label="Official Email Address Of The Firm"
          placeholder="Email Address"
          name="officialEmailAddressOfFirm"
          value={formik.values.officialEmailAddressOfFirm}
          type="text"
          onChange={formik.handleChange}
          touched={formik.touched.officialEmailAddressOfFirm}
          error={formik.errors.officialEmailAddressOfFirm}
        />

        <InputFormField
          label="Name of Principal Partner"
          placeholder="Name of Principal Partner"
          name="nameOfPrincipalPartner"
          value={formik.values.nameOfPrincipalPartner}
          type="text"
          onChange={formik.handleChange}
          touched={formik.touched.nameOfPrincipalPartner}
          error={formik.errors.nameOfPrincipalPartner}
        />

        <InputFormField
          label="Staff Username"
          placeholder="Staff Username"
          name="staffUsername"
          value={formik.values.staffUsername}
          type="email"
          onChange={formik.handleChange}
          touched={formik.touched.staffUsername}
          error={formik.errors.staffUsername}
        />

        <InputFormField
          label="Account Name"
          placeholder="Account Name"
          name="bankAccountName"
          value={formik.values.bankAccountName}
          type="text"
          onChange={formik.handleChange}
          touched={formik.touched.bankAccountName}
          error={formik.errors.bankAccountName}
        />
        <InputFormField
          label="Account Number"
          placeholder="Account Number"
          name="bankAccountNumber"
          value={formik.values.bankAccountNumber}
          type="number"
          onChange={handleNumericFieldChange}
          touched={formik.touched.bankAccountNumber}
          error={formik.errors.bankAccountNumber}
        />

        <FileUpload
          label="Attach MD's Approval"
          placeholder="Attach MD's Approval"
          formik={formik}
          name=""
          // name="mdApproval"
          touched={formik.touched.mdApproval}
          error={formik.errors.mdApproval}
        />

        <div className="col-span-2 flex justify-end">
          <BaseButton
            customStyle="w-[10.5rem]"
            isLoading={isLoading}
            type="submit"
          >
            Create
          </BaseButton>
        </div>
      </form>
    </div>
  );
};

export default NewCreateSolicitors;
