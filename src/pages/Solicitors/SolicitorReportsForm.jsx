import { useContext } from "react";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { solicitorReportFn } from "utils/ApiFactory/solicitors";
import { useSearchParams } from "react-router-dom";
import {
  BusinessReportSchema,
  LimitedLiabilityReportSchema,
  TrusteeReportSchema,
} from "utils/Yup/YupSchemas";
import {
  BusinessReportInitialValues,
  LimitedLiabilityReportInitialValues,
  TrusteeReportInitialValues,
} from "assets/data";
import { UserContext } from "context/UserContext";
import dayjs from "dayjs";
import SingleFileUpload from "components/SingleFileUpload";
import InputFormField from "components/InputFormField";
import BaseButton from "components/BaseButton";
import InputArrayFormField from "components/InputArrayFormField";

const SolicitorReportsForm = () => {
  const { showToast } = useContext(UserContext);
  let [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const title = {
    business_name: "Solicitor Report - Business Name",
    limited_liability_company: "Solicitor Report - Limited Liability Company",
    incorporated_trustees: "Solicitor Report - Incorporated Trustees",
  };

  const validationschema = {
    business_name: BusinessReportSchema,
    limited_liability_company: LimitedLiabilityReportSchema,
    incorporated_trustees: TrusteeReportSchema,
  };

  const initialValues = {
    business_name: BusinessReportInitialValues,
    limited_liability_company: LimitedLiabilityReportInitialValues,
    incorporated_trustees: TrusteeReportInitialValues,
  };

  const { mutate: solicitorReport, isLoading } = useMutation({
    mutationKey: "solicitorReport",
    mutationFn: solicitorReportFn,
    onSuccess: (data) => {
      showToast({
        severity: "success",
        message: "Solicitor approved successfully",
      });
    },
    onError: (error) => {
      showToast({
        severity: "error",
        message: error.response.data.detail || "COuld not process request.MD",
      });
    },
  });

  const handleSubmit = (values) => {
    const {
      companyRegistrationDate,
      directors,
      trustees,
      directorResidentialAddress,
      trusteeResidentialAddress,
      ...rest
    } = values;

    const dir = directors.map((itm, idx) => ({
      directorName: itm,
      directorResidentialAddress: directorResidentialAddress[idx],
    }));

    const tru = trustees.map((itm, idx) => ({
      trusteeName: itm,
      trusteeResidentialAddress: trusteeResidentialAddress[idx],
    }));

    solicitorReport({
      ...rest,
      directors: dir,
      trustees: tru,
      companyRegistrationDate: dayjs(companyRegistrationDate).format(
        "DD-MMM-YYYY"
      ),
    });
    // console.log({
    //   ...values,
    //   companyRegistrationDate: dayjs(companyRegistrationDate).format(
    //     "DD-MM-YYYY"
    //   ),
    // });
  };

  const formik = useFormik({
    initialValues: initialValues[query],
    validationSchema: validationschema[query],
    onSubmit: handleSubmit,
  });

  // console.log("Values", formik.values);
  // console.log("Errors", formik.errors);
  // console.log("Name", formik.values.directorName);
  // console.log("Address", formik.values.directorResidentialAddress);

  return (
    <div className="bg-white rounded-[10px] mb-8 py-8">
      <p className="px-6 border-b pb-4 text-[20px] font-bold">{title[query]}</p>
      <form
        className="grid grid-cols-2 px-6 py-[30px] gap-8"
        onSubmit={formik.handleSubmit}
      >
        <InputFormField
          label="Company Name"
          placeholder="Company Name"
          name="companyName"
          value={formik.values.companyName}
          type="text"
          onChange={formik.handleChange}
          touched={formik.touched.companyName}
          error={formik.errors.companyName}
        />

        <InputFormField
          label="RC Number"
          placeholder="RC Number"
          name="rcNumber"
          value={formik.values.rcNumber}
          type="text"
          onChange={formik.handleChange}
          touched={formik.touched.rcNumber}
          error={formik.errors.rcNumber}
        />

        <InputFormField
          label="Company's Registered Address"
          placeholder="Company's Registered Address"
          name="companyRegisteredAddress"
          value={formik.values.companyRegisteredAddress}
          type="text"
          onChange={formik.handleChange}
          touched={formik.touched.companyRegisteredAddress}
          error={formik.errors.companyRegisteredAddress}
        />

        <InputFormField
          label="Reason"
          placeholder="Reason"
          name="reason"
          value={formik.values.reason}
          type="text"
          onChange={formik.handleChange}
          touched={formik.touched.reason}
          error={formik.errors.reason}
        />

        <InputFormField
          label="Staff Email Address"
          placeholder="Email Address"
          name="staffUsername"
          value={formik.values.staffUsername}
          type="text"
          onChange={formik.handleChange}
          touched={formik.touched.staffUsername}
          error={formik.errors.staffUsername}
        />

        <InputFormField
          label="Shareholding Structure"
          placeholder="Shareholding Structure"
          name="shareholdingStructure"
          value={formik.values.shareholdingStructure}
          type="text"
          onChange={formik.handleChange}
          touched={formik.touched.shareholdingStructure}
          error={formik.errors.shareholdingStructure}
        />

        {query === "business_name" && (
          <InputFormField
            label="Residential Address Of Proprietor"
            placeholder="Residential Address Of Proprietor"
            name="proprietorsRegisteredAddress"
            value={formik.values.proprietorsRegisteredAddress}
            type="text"
            onChange={formik.handleChange}
            touched={formik.touched.proprietorsRegisteredAddress}
            error={formik.errors.proprietorsRegisteredAddress}
          />
        )}

        {query === "business_name" && (
          <InputFormField
            label="Proprietor's Name"
            placeholder="Proprietor's Name"
            name="proprietorsName"
            value={formik.values.proprietorsName}
            type="text"
            onChange={formik.handleChange}
            touched={formik.touched.proprietorsName}
            error={formik.errors.proprietorsName}
          />
        )}

        {query === "limited_liability_company" && (
          <InputArrayFormField
            label="Director's Name"
            placeholder="Director's Name"
            formik={formik}
            name="directors"
          />
        )}

        {query === "limited_liability_company" && (
          <InputArrayFormField
            label="Residential Address Of Director"
            placeholder="Residential Address Of Director"
            formik={formik}
            name="directorResidentialAddress"
          />
        )}

        {query === "incorporated_trustees" && (
          <InputArrayFormField
            label="Name of Trustee"
            placeholder="Name of Trustee"
            formik={formik}
            name="trustees"
          />
        )}

        {query === "incorporated_trustees" && (
          <InputArrayFormField
            label="Residential Address Of Trustees"
            placeholder="Residential Address Of Trustees"
            formik={formik}
            name="trusteeResidentialAddress"
          />
        )}

        <InputFormField
          label="Secetary's Name"
          placeholder="Secetary's Name"
          name="secretaryName"
          value={formik.values.secretaryName}
          type="text"
          onChange={formik.handleChange}
          touched={formik.touched.secretaryName}
          error={formik.errors.secretaryName}
        />

        <InputFormField
          label="Registration Date"
          placeholder="Registration Date"
          name="companyRegistrationDate"
          value={formik.values.companyRegistrationDate}
          pattern="\d{2}-\d{2}-\d{4}"
          type="date"
          onChange={formik.handleChange}
          touched={formik.touched.companyRegistrationDate}
          error={formik.errors.companyRegistrationDate}
        />

        <SingleFileUpload
          label="CAC Document"
          placeholder="CAC Document"
          formik={formik}
          name="solicitorReportDocument1"
          onChange={formik.handleChange}
          touched={formik.touched.solicitorReportDocument1}
          error={formik.errors.solicitorReportDocument1}
        />

        <SingleFileUpload
          label="Other Document"
          placeholder="Other Document"
          formik={formik}
          name="solicitorReportDocument2"
          onChange={formik.handleChange}
          touched={formik.touched.solicitorReportDocument2}
          error={formik.errors.solicitorReportDocument2}
        />

        <div className="col-span-2 flex justify-end">
          <BaseButton
            customStyle="w-[10.5rem]"
            isLoading={isLoading}
            type="submit"
          >
            Submit report
          </BaseButton>
        </div>
      </form>
    </div>
  );
};

export default SolicitorReportsForm;
