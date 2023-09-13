import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
// import { useQuery, useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { getAllSolicitorFn } from "utils/ApiFactory/solicitors";
import { ReactComponent as CloseIcon } from "assets/svg/close.svg";
// import { assignRequestToSolicitorFn } from "utils/ApiFactory/request";
import { UserContext } from "context/UserContext";
import Modal from "@mui/material/Modal";
import Button from "components/BaseButton";
import * as Yup from "yup";

const initialValues = {
  selectSolicitor: "",
};

const BatchAssignModal = ({
  open,
  batchRows,
  handleClose,
  createdRequest,
  selectedRows,
}) => {
  const { showToast } = useContext(UserContext);
//   const { user, showToast } = useContext(UserContext);
//   const requestId = batchRows?.requestId;
//   const userEmail = user.email;
  const sortBy = "solicitorApprovalStatus";
  const sortOrder = "ASC";

  const { data: allSolicitors } = useQuery({
    queryKey: ["all-solicitors-batch-assign", sortBy, sortOrder],
    queryFn: () =>
      getAllSolicitorFn({
        page: 0,
        size: 10,
        sortBy,
        sortOrder,
      }),
    select: (transformedData) => {
      const transform = transformedData.data.data.content.map(
        ({ solicitorId, nameOfLawFirm, solicitorApprovalStatus }) => ({
          solicitorId,
          nameOfLawFirm,
          solicitorApprovalStatus,
        })
        //This map here shows that you dont necessarily have to return a div, you can alo return values
      );
      return transform;
    },
    onError: (error) => {
      showToast({
        severity: "error",
        message: error.response?.data?.detail || "Could not process request.",
      });
    },
  });

  const validationSchema = Yup.object({
    selectSolicitor: Yup.string().required("Please Select a solicitor"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log({ values });
    },
  });

//   console.log("Batch: ", batchRows);
  //   console.log("Created: ", createdRequest);
//   const BatchedRequests = [
//     { label: "Company Name", value: batchRows?.companyName },
//     { label: "Request Id", value: batchRows },
//   ];

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="absolute w-[70%] top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-white rounded-[10px] p-[3rem]">
        <CloseIcon
          className="absolute w-6 h-6 top-5 right-5 hover:scale-150 transition-all cursor-pointer"
          onClick={handleClose}
        />
        <h1 className="text-xl font-bold mb-3">Batched Request</h1>
        <div className="grid grid-cols-9">
          <div className="col-span-5 border-r">
            {batchRows?.map(({companyName, companyType}, idx) => (
              <div key={idx} className="flex items-center gap-[5em] pb-[4px] text-[#C2C2C2] font-medium">
                <p className="text-[#263238] font-bold">{companyName}</p>
                <p className={`text-[#263238] font-bold`}>{companyType}</p>
              </div>
            ))}
          </div>
          <div className="col-span-4">
            <form onSubmit={formik.handleSubmit} className="flex flex-col">
              <div className="px-5 mb-[15em]">
                <p className="text-lg text-[#495057]">Solicitor</p>
                <select
                  name="selectSolicitor"
                  className="bg-[#F8F8F8] px-4 w-full h-[40px]"
                >
                  <option value="" disabled>
                    Select Solicitor
                  </option>

                  {allSolicitors?.map(
                    ({
                      solicitorId,
                      nameOfLawFirm,
                      solicitorApprovalStatus,
                    }) => (
                      <option
                        key={solicitorId}
                        value={JSON.stringify({
                          solicitorId,
                          solicitorApprovalStatus,
                        })}
                      >
                        {nameOfLawFirm}
                      </option>
                    )
                  )}
                </select>
                {formik.touched.selectSolicitor &&
                formik.errors.selectSolicitor ? (
                  <div className="error text-red-500 text-xs">
                    {formik.errors.selectSolicitor}
                  </div>
                ) : null}
              </div>
              <div className="flex justify-end flex-1 mt-[40px] px-5">
                <Button
                  type="button"
                  customStyle="w-[100px] inline-block rounded-[10px] px-2 text-black self-end h-[38px]"
                  variant="warning"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  customStyle="w-[100px] inline-block rounded-[10px] ml-[15px] self-end h-[38px]"
                  variant="primary"
                  isLoading={""}
                  type="submit"
                >
                  Assign
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default BatchAssignModal;
