import { useQuery } from "@tanstack/react-query";
import { useState, useContext } from "react";
import { UserContext } from "context/UserContext";

import {
  csoDashboardTableColumns,
  LegalOfficerDashboardTableColumns,
  solicitorDashboardTableColumns,
} from "assets/data";
import { resolveUserRoleAccess } from "utils/resolveUserRoleAccess";
import { ReactComponent as SearchIcon } from "assets/svg/search.svg";
import BaseTable from "components/BaseTable";
import CompareReportsModal from "components/solicitors/CompareReportsModal";
import AsReAssignSlicitorRequest from "components/solicitors/AsReAssignSlicitorRequest";
import InputFormField from "components/InputFormField";
import UpdateSolicitorRequest from "components/solicitors/UpdateSolicitorRequest";
import Warning from "components/solicitors/Warning";
import Button from "components/BaseButton";
import DateSearchFilter from "components/DateSearchFilter/DateSearchFilter";
import InProgressSolicitor from "components/solicitors/InProgressSolicitor";
import { fxDataColumns } from "assets/data";
import { FXTX_DUMMY_DATA } from "assets/data";
import { useSessionStorage } from "Hooks/useSessionStorage";
import { fetchFxFn } from "utils/ApiFactory/fxTxApi";

const DashboardNew = () => {
  const { user } = useContext(UserContext);
  const solicitorId = user.solicitorId;
  // const staffBranch = user.branchCode;
  const userEmail = user.email || "ymusa@providusbank.com";
  // const userEmail = "ymusa@providusbank.com";
  const userRole = sessionStorage.getItem("__role");
  const myRole = resolveUserRoleAccess(userRole);
  const data = FXTX_DUMMY_DATA;
  const fxData = data[0]?.data?.blotter;
  // const myRole = resolveUserRoleAccess(user.role);
  console.log("Length Of Fx :", fxData.length);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [activeCreatedRequest, setActiveCreatedRequest] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const { getSessionStorage } = useSessionStorage;
  const fxValue = sessionStorage.getItem("start");
  console.log({ fxValue });

  // const [allSelectedRows, setAllSelectedRows] = useState([]);
  // const branchCode = sessionStorage.getItem("__brc");
  // const [setSearch] = useState("");
  const [search, setSearch] = useState("");

  const showBatchModal = () => {
    setOpenModal("batchAssign");
  };
  const tableColumns = {
    1: solicitorDashboardTableColumns,
    2: csoDashboardTableColumns,
    3: LegalOfficerDashboardTableColumns,
    5: LegalOfficerDashboardTableColumns,
    // 4: solicitorDashboardTableColumns,
    // 4: csoDashboardTableColumns,
    // 4: LegalOfficerDashboardTableColumns,
  };

  const { data: FetchFx, isLoading } = useQuery({
    queryKey: [
      "fetch-fx-now",
      {
        // startdate: new Date(),
        // enddate: new Date(),
      },
    ],
    queryFn: () =>
      fetchFxFn({
        startdate: new Date(),
        enddate: new Date(),
      }),
    select: (data) => {
      const rate = data?.data?.data?.current_fx_rate
      sessionStorage.setItem("fxRate", rate)
      console.log("From Select: ", {rate, data });
    },
  });

  const toggleModal = (_, _1, row) => {
    setActiveCreatedRequest(row);
    setOpenModal((prevS) => !prevS);

    if (myRole === 1 && row.status === "ASSIGNED") {
      setOpenModal("updateSolicitor");
    } else if (myRole === 1 && row.status === "COMPLETED") {
      setOpenModal("warning");
    } else if (myRole === 1 && row.status === "IN_PROGRESS") {
      setOpenModal("inProgressSolicitor");
    } else if (myRole === 2) {
      setOpenModal("viewDetails");
    } else if (myRole === 3 && row.status === "UNASSIGNED") {
      setOpenModal("unassign");
    } else if (myRole === 3 && row.status === "ASSIGNED") {
      setOpenModal("reassign");
    } else if (myRole === 3 && row.status === "IN_PROGRESS") {
      setOpenModal("inProgress");
    } else if (myRole === 3 && row.status === "COMPLETED") {
      setOpenModal("complete");
    } else if (myRole === 5 && row.status === "UNASSIGNED") {
      setOpenModal("unassign");
    } else if (myRole === 5 && row.status === "ASSIGNED") {
      setOpenModal("reassign");
    } else if (myRole === 5 && row.status === "IN_PROGRESS") {
      setOpenModal("inProgress");
    } else if (myRole === 5 && row.status === "COMPLETED") {
      setOpenModal("complete");
    } else {
      setOpenModal("warning");
    }
  };

  const checkboxOnChange = (data) => {
    setSelectedRows((prevS) => {
      const index = prevS.findIndex((itm) => itm.requestId === data.requestId);
      if (index >= 0) {
        return prevS.filter((itm) => itm.requestId !== data.requestId);
      } else {
        return [...prevS, data];
      }
    });
  };

  // const allCheckboxOnChange = () => {
  //   setAllSelectedRows((prevS) => {
  //     const index = prevS.findIndex((itm) =>itm.action === "ActionButton" );
  //     console.log("My Index: ", index);
  //   })
  // }
  // console.log({ selectedRows });
  return (
    <>
      <AsReAssignSlicitorRequest
        open={openModal === "reassign"}
        createdRequest={activeCreatedRequest}
        handleClose={() => setOpenModal("")}
      />
      <CompareReportsModal
        open={openModal === "complete"}
        createdRequest={activeCreatedRequest}
        handleClose={() => setOpenModal("")}
        myRole={myRole}
      />
      <UpdateSolicitorRequest
        open={openModal === "updateSolicitor"}
        createdRequest={activeCreatedRequest}
        handleClose={() => setOpenModal("")}
      />
      <Warning
        open={openModal === "warning"}
        createdRequest={activeCreatedRequest}
        handleClose={() => setOpenModal("")}
        // yaz
      />
      <InProgressSolicitor
        open={openModal === "inProgressSolicitor"}
        createdRequest={activeCreatedRequest}
        handleClose={() => setOpenModal("")}
        // yaz
      />

      <div className="bg-white rounded-[10px] mb-8">
        <div className="flex items-center justify-between px-8">
          <div className="relative">
            <h1 className="text-xl font-semibold">Dashboard</h1>
            <button
              className={`absolute right-0 top-0 -translate-y-2 translate-x-4 h-[12px] w-[12px]  border-2 border-solid border-blue rounded-[50%] ${
                fxValue === "true" ? "bg-green-500" : "bg-red-500"
              }`}
            ></button>
          </div>
          <div className="flex items-center justify-between pb-4 p-8 gap-14">
            <DateSearchFilter />
          </div>
        </div>
        {/* {
          isLoading && (
            <h1>Loading Data...</h1>
          )
        } */}

        <BaseTable
          // rows={[]}
          rows={fxData || []}
          columns={fxDataColumns}
          // columns={tableColumns[myRole]}
          page={page}
          showCheckbox
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          // isLoading={isLoading}
          setRowsPerPage={setRowsPerPage}
          actionOptions={["View Details"]}
          actionItemOnClick={toggleModal}
          // totalPage={}
          totalPage={fxData?.length}
          checkboxOnChange={checkboxOnChange}
          // allCheckboxOnChange={allCheckboxOnChange}
          search={search}
          filterKey="companyName"
          selectedRows={selectedRows.map(({ requestId }) => requestId)}
        />
      </div>
    </>
  );
};

export default DashboardNew;
