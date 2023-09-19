// import { useState } from "react";
import { ReactComponent as CloseIcon } from "assets/svg/close.svg";
import { useFormik } from "formik";
import { Checkbox } from "@mui/material";
import Modal from "@mui/material/Modal";

// import { ReactComponent as EyeOpenIcon } from "assets/svg/eye-open.svg";
// import UpdateStatus from "components/UpdateStatus";
import * as Yup from "yup";
import Button from "components/BaseButton";
import TextAreaField from "components/TextAreaField";

const initialValues = {
  rejectedReport: "",
  chek: false,
};

const CompareReportsModal = ({ open, createdRequest, handleClose, myRole }) => {
  // const [chek, setChek] = useState(false);

  const handleCheck = (e) => {
    const { name } = e.target
    const result = e.target.checked;
    formik.setFieldValue(name, result)
  };

  const validationSchema = Yup.object().shape({
    chek: Yup.boolean(),
    rejectedReport: Yup.string().when("chek", {
      is: true,
      then: () => Yup.string().required(
        "Please fill for rejections, if not proceed to approve the report"
      ),
    }),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const report = formik.values.rejectedReport;
  // console.log("Formik Values: ", formik.values);

  const csoRequest = [
    {
      label: "Company Name",
      value: createdRequest?.companyName,
    },
    {
      label: "Date Submitted",
      value: createdRequest?.dateCreated,
    },
    {
      label: "Company Registered Address",
      value: createdRequest?.companyRegisteredAddress,
    },
    {
      label: "RC Number",
      value: createdRequest?.rcNumber,
    },
    {
      label: "Company Type",
      value: createdRequest?.companyType,
    },
    {
      label: "Date Registered",
      value: createdRequest?.companyRegistrationDate,
    },
    {
      label: "Shareholding Structure",
      value: createdRequest?.shareholdingStructure,
    },
    createdRequest?.proprietorsName
      ? {
          label: "Proprietor's Name",
          value: createdRequest?.proprietorsName,
        }
      : createdRequest?.directors?.[0]?.directorName
      ? {
          label: "Directors's Name",
          value: createdRequest?.directors?.[0]?.directorName,
        }
      : createdRequest?.trustees?.[0]?.trusteeName
      ? {
          label: "Trustee's Name",
          value: createdRequest?.trustees?.[0]?.trusteeName,
        }
      : {},
    createdRequest?.proprietorsRegisteredAddress
      ? {
          label: "Proprietor's Registration Address",
          value: createdRequest?.proprietorsRegisteredAddress,
        }
      : createdRequest?.directors?.[0]?.directorResidentialAddress
      ? {
          label: "Directors's Registration Address",
          value: createdRequest?.directors?.[0]?.directorResidentialAddress,
        }
      : createdRequest?.trustees?.[0]?.trusteeResidentialAddress
      ? {
          label: "Trustee's Registration Address",
          value: createdRequest?.trustees?.[0]?.trusteeResidentialAddress,
        }
      : {},
    createdRequest?.reason
      ? {
          label: "Reason",
          value: createdRequest?.reason,
        }
      : {},
    {
      label: "Status",
      value: createdRequest?.status,
    },
    { label: "Secetary's Name", value: createdRequest?.secretaryName },
  ];

  const SolicitorReport = [
    {
      label: "Company Name",
      value: createdRequest?.solicitorReport?.companyName,
    },
    {
      label: "Date Submitted",
      value: createdRequest?.solicitorReport?.dateUpdated,
    },

    {
      label: "Company Registered Address",
      value: createdRequest?.solicitorReport?.companyRegisteredAddress,
    },
    { label: "RC Number", value: createdRequest?.solicitorReport?.rcNumber },
    {
      label: "Company Type",
      value: createdRequest?.solicitorReport?.companyType,
    },
    {
      label: "Date Registered",
      value: createdRequest?.solicitorReport?.companyRegistrationDate,
    },
    {
      label: "Shareholding Structure",
      value: createdRequest?.solicitorReport?.shareholdingStructure,
    },
    createdRequest?.solicitorReport?.proprietorsName
      ? {
          label: "Proprietor's Name",
          value: createdRequest?.solicitorReport?.proprietorsName,
        }
      : createdRequest?.solicitorReport?.directors?.[0]?.directorName
      ? {
          label: "Directors's Name",
          value: createdRequest?.solicitorReport?.directors?.[0]?.directorName,
        }
      : createdRequest?.solicitorReport?.trustees?.[0]?.trusteeName
      ? {
          label: "Trustee's Name",
          value: createdRequest?.solicitorReport?.trustees?.[0]?.trusteeName,
        }
      : {},
    createdRequest?.solicitorReport?.proprietorsRegisteredAddress
      ? {
          label: "Proprietor's Registration Address",
          value: createdRequest?.solicitorReport?.proprietorsRegisteredAddress,
        }
      : createdRequest?.solicitorReport?.directors?.[0]
          ?.directorResidentialAddress
      ? {
          label: "Directors's Registration Address",
          value:
            createdRequest?.solicitorReport?.directors?.[0]
              ?.directorResidentialAddress,
        }
      : createdRequest?.solicitorReport?.trustees?.[0]
          ?.trusteeResidentialAddress
      ? {
          label: "Trustee's Registration Address",
          value:
            createdRequest?.solicitorReport?.trustees?.[0]
              ?.trusteeResidentialAddress,
        }
      : {},
    createdRequest?.solicitorReport?.status
      ? {
          label: "Reason",
          value: createdRequest?.solicitorReport?.status,
        }
      : {},
    createdRequest?.solicitorReport?.reason
      ? {
          label: "Reason",
          value: createdRequest?.solicitorReport?.reason,
        }
      : {},
    {
      label: "Secetary's Name",
      value: createdRequest?.solicitorReport?.secretaryName,
    },
  ];

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      {/* //Modal works fine now, I dont know the magic, but I just deleted the class oveflow-scroll d=from the content and out it at the modal, and it started working */}
      <div className="absolute w-[70%] top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-white rounded-[10px] p-[3rem] h-full max-h-[500] overflow-scroll">
        <CloseIcon
          className="absolute w-6 h-6 top-5 right-5 hover:scale-150 transition-all cursor-pointer"
          onClick={handleClose}
        />
        <div className="">
          <h1 className="text-xl font-bold mb-3">Completed Details</h1>
          <div className="grid grid-cols-10 ">
            <div className="col-span-5">
              <h3 className="mb-3 text-2xl font-bold text-[#f3c737fc] py-[12px]">
                CSO Reports Data
                <p className="text-[#263238] text-sm font-bold">{`(${createdRequest?.createdBy})`}</p>
              </h3>
              <div className="grid grid-cols-2 border-r px-[12px] ">
                {csoRequest?.map(({ label, value }, idx) => (
                  <div
                    key={label + idx}
                    className={`${value?.length > 20 ? "col-span-2" : ""}`}
                  >
                    <p className="text-[#C2C2C2] text-[13px] mt-2">{label}</p>
                    <p
                      className={`text-[#263238] font-bold capitalize ${
                        value?.length > 20 ? "text-xs" : "text-base"
                      }`}
                    >
                      {value?.replace(/_/g, " ").toLowerCase()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-span-5">
              <h3 className="mb-3 text-2xl font-bold text-[#f3c737fc] py-[12px]">
                Solicitor Reports Data
                <p className="text-[#263238] text-sm font-bold capitalize">{`(${createdRequest?.solicitor?.nameOfLawFirm})`}</p>
              </h3>
              <div className="grid grid-cols-2 px-[12px] ">
                {SolicitorReport?.map(({ label, value }, idx) => (
                  <div
                    key={label + idx}
                    className={`${value?.length > 20 ? "col-span-2" : ""}`}
                  >
                    <p className="text-[#C2C2C2] text-[13px] mt-2">{label}</p>
                    <p
                      className={`text-[#263238] font-bold capitalize ${
                        value?.length > 20 ? "text-xs" : "text-base"
                      }`}
                    >
                      {value?.replace(/_/g, " ").toLowerCase()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <label className="flex items-center select-none mt-3">
            <Checkbox size="small" name="chek" onChange={handleCheck} />
            <p className="text-xs font-medium">Rejection</p>
          </label>
          <TextAreaField
            label="Remarks for rejection"
            placeholder="..."
            name="rejectedReport"
            values={formik.values.rejectedReport}
            onChange={formik.handleChange}
            touched={formik.touched.rejectedReport}
            error={formik.errors.rejectedReport}
            containerClassName="mt-5 w-2/5"
            rows="5"
            disabled={!formik.values.chek}
          />
          {myRole === 4 || myRole === 1 ? (
            ""
          ) : (
            <div className="flex justify-end flex-1 mt-8 px-5">
              <Button
                type="submit"
                customStyle="w-[100px] inline-block rounded-[10px] px-2 text-black self-end h-[38px]"
                variant="error"
                disabled={!formik.values.chek || report.length <= 10}
                // disabled={report}
              >
                Decline
              </Button>
              <Button
                customStyle="w-[100px] inline-block rounded-[10px] ml-[15px] self-end h-[38px]"
                variant="success"
                isLoading={false}
                type="submit"
                onClick={() => console.log("I am clicked")}
                disabled={(formik.values.chek || report.length > 0)}
              >
                Approve
              </Button>
            </div>
          )}
        </form>
      </div>
    </Modal>
  );
};

export default CompareReportsModal;
