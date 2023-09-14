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

const DashboardNew = () => {
  const { user } = useContext(UserContext);
  const solicitorId = user.solicitorId;
  // const staffBranch = user.branchCode;
  const userEmail = user.email || "ymusa@providusbank.com";
  // const userEmail = "ymusa@providusbank.com";
  const userRole = sessionStorage.getItem("__role");
  const myRole = resolveUserRoleAccess(userRole);
  // const myRole = resolveUserRoleAccess(user.role);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [activeCreatedRequest, setActiveCreatedRequest] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

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
          <h1 className="text-xl font-semibold">DashboardNew</h1>
          <div className="flex items-center justify-between pb-4 p-8 gap-14">
            <DateSearchFilter />
          </div>
        </div>

        <BaseTable
          rows={[]}
          // rows={data?.rows || []}
          columns={tableColumns[myRole]}
          page={page}
          showCheckbox
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          // isLoading={isLoading}
          setRowsPerPage={setRowsPerPage}
          actionOptions={["View Details"]}
          actionItemOnClick={toggleModal}
          totalPage={0}
          // totalPage={data?.totalCount ?? 0}
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
