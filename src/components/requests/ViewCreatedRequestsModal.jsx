// import { useQuery } from "@tanstack/react-query";
import Modal from "@mui/material/Modal";
import { ReactComponent as CloseIcon } from "assets/svg/close.svg";
import { ReactComponent as EyeOpenIcon } from "assets/svg/eye-open.svg";
// import axios from "axios";
// import { useState } from "react";
// import { fileFn } from "utils/ApiFactory/file";

// const baseURL = process.env.REACT_APP_PROD_BASE_URL;

const ViewCreatedRequestsModal = ({
  open,
  createdRequest,
  handleClose,
  myRole,
}) => {
  // const [hrefss, setHref] = useState("");

  // const fileName = createdRequest?.document?.cacDocument;

  // const handleFile = async () => {
  //   const token = sessionStorage.getItem("__tk");
  //   const url = `${baseURL}/file?fileName=${fileName}`;
  //   const res = await axios.get(url, {
  //     headers: {
  //       Authorization: token,
  //     },
  //   });
  //   // console.log("resString: ", JSON.stringify(res?.request?.responseURL));
  //   console.log("resString22: ", res?.request?.responseURL);
  //   // setHref(res?.request?.responseURL);
  // };

  const topDetails = [
    { label: "Company Name", value: createdRequest?.companyName },
    { label: "Date Submitted", value: createdRequest?.dateCreated },

    {
      label: "Company Registered Address",
      value: createdRequest?.companyRegisteredAddress,
    },
    { label: "RC Number", value: createdRequest?.rcNumber },
    { label: "Reason", value: createdRequest?.reason },
    { label: "Company Type", value: createdRequest?.companyType },
    {
      label: "Date Registered",
      value: createdRequest?.companyRegistrationDate,
    },
  ];

  const bottomDetails = [
    {
      label: "Shareholding Structure",
      value: createdRequest?.shareholdingStructure,
    },
    { label: "Secetary's Name", value: createdRequest?.secretaryName },
    { label: "Proprietor's Name", value: createdRequest?.proprietorsName },
    {
      label: "Residebtial Address of Proprietor",
      value: createdRequest?.proprietorsRegisteredAddress,
    },
    { label: "Status", value: createdRequest?.status },
  ];

  const uploadedDocuments = [
    { label: "Document 1", value: createdRequest?.document?.cacDocument },
    { label: "Document 2", value: createdRequest?.document?.cacDocument },
  ];

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
        <div className="">
          <h1 className="text-xl font-bold mb-3">View Details</h1>
          <div className="grid grid-cols-9 ">
            <div className="col-span-5">
              <div className="grid grid-cols-2 border-r border-b gap-3 pb-5">
                {topDetails?.map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-[#C2C2C2] text-[13px]">{label}</p>
                    <p className="text-[black] text-[16px] font-bold capitalize">
                      {value?.replace(/_/g, " ").toLowerCase()}
                    </p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 border-r gap-3 pt-4">
                {bottomDetails?.map(({ label, value }) => (
                  <div
                    key={label}
                    className={`${value?.length > 20 ? "col-span-2" : ""}`}
                  >
                    <p className="text-[#C2C2C2] text-[13px] mt-2">{label}</p>
                    <p
                      className={`text-[#263238] font-bold ${
                        value?.length > 20 ? "text-xs" : "text-base"
                      }`}
                    >
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-span-4 grid grid-cols-1">
              {/* <div className="grid grid-cols-1 gap-1 pb-3 h-fit border-b px-5 text-xs">
                 {[...Array(4).keys()].map((itm) => (
                  <div key={itm} className="">
                    <div className="flex items-center text-[#C2C2C2] font-medium">
                      <p className="">MD Approval</p>
                      <a href="http://" target="_blank" rel="noreferrer">
                        <EyeOpenIcon className="w-5 h-5 ml-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div> */}
              <div className="grid grid-cols-1 gap-1 pb-3 h-fit border-b px-5 text-xs">
                {/* <div className="flex items-center text-[#C2C2C2] font-medium">
                  <p className="">MD Approval</p>
                  <a href="http://" target="_blank" rel="noreferrer">
                    <EyeOpenIcon className="w-5 h-5 ml-3" />
                  </a>
                </div> */}
                {uploadedDocuments?.map(({ label, value }) => (
                  <div key={label} className={`flex items-center`}>
                    <p className="text-[#C2C2C2] text-[13px] mt-2">
                      Documents
                    </p>
                    <a
                  rel="noreferrer"
                  href="http://192.168.51.11:9000/api/v1/file?fileName=C:/Users/nagbara/src/main/resources/static/yaz%20enterpice/GST%20104.pdf"
                  target="_blank"
                >
                  <EyeOpenIcon className="w-5 h-5 ml-3" />
                </a>
                    {/* <a href={hrefss} target="_blank" rel="noreferrer">
                      <EyeOpenIcon
                        className="w-5 h-5 ml-3"
                        onClick={handleFile}
                      />
                    </a> */}

                    {/* <a href="http://192.168.51.11:9000/api/v1/file?fileName=C:/Users/nagbara/src/main/resources/static/yaz%20enterpice/GST%20104.pdf" target="_blank" rel="noreferrer">
                      <EyeOpenIcon
                        className="w-5 h-5 ml-3"
                        onClick={handleFile}
                      />
                    </a> */}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ViewCreatedRequestsModal;
