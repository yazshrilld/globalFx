import { useQuery } from "@tanstack/react-query";
import { useState, useContext } from "react";
import { UserContext } from "context/UserContext";
import {
  getAllRequestByStatusFn,
  getAllRequestFn,
  getRequestByCSOFn,
  getRequestBySolicitorFn,
} from "utils/ApiFactory/request";
import {
  csoDashboardTableColumns,
  LegalOfficerDashboardTableColumns,
  solicitorDashboardTableColumns,
} from "assets/data";
import { resolveUserRoleAccess } from "utils/resolveUserRoleAccess";
import { ReactComponent as SearchIcon } from "assets/svg/search.svg";
import BaseTable from "components/BaseTable";
import Statistics from "components/Statistics/Statistics";
import AssignSolicitorRequest from "components/solicitors/AssignSolicitorRequest";
import CompareReportsModal from "components/solicitors/CompareReportsModal";
import AsReAssignSlicitorRequest from "components/solicitors/AsReAssignSlicitorRequest";
import InputFormField from "components/InputFormField";
import UpdateSolicitorRequest from "components/solicitors/UpdateSolicitorRequest";
import ViewCreatedRequestsModal from "components/requests/ViewCreatedRequestsModal";
import Warning from "components/solicitors/Warning";
import Button from "components/BaseButton";
import BatchAssignModal from "components/requests/BatchAssignModal";
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

  const queryKeys = {
    1: [
      "solicitor-requests",
      {
        page,
        size: rowsPerPage,
        sortBy: "status",
        sortOrder: "ASC",
        solicitorId: solicitorId,
      },
    ],
    2: [
      "cso-requests",
      {
        email: userEmail,
        page,
        size: rowsPerPage,
        sortBy: "status",
        sortOrder: "ASC",
      },
    ],
    3: [
      "all-requests",
      {
        page,
        size: rowsPerPage,
        sortBy: "status",
        sortOrder: "ASC",
        status: "ASSIGNED",
      },
    ],
    4: [
      "all-requests-by-status",
      {
        page,
        size: rowsPerPage,
        sortBy: "status",
        sortOrder: "ASC",
        // status: "COMPLETED",
      },
    ],
    5: [
      "all-requests-legal",
      {
        page,
        size: rowsPerPage,
        sortBy: "status",
        sortOrder: "ASC",
        status: "ASSIGNED",
      },
    ],
  };

  const queryFns = {
    1: () =>
      getRequestBySolicitorFn({
        page,
        size: rowsPerPage,
        sortBy: "status",
        sortOrder: "ASC",
        solicitorId: solicitorId,
      }),
    2: () =>
      getRequestByCSOFn({
        email: userEmail,
        page,
        size: rowsPerPage,
        sortBy: "status",
        sortOrder: "ASC",
      }),
    3: () =>
      getAllRequestFn({
        page,
        size: rowsPerPage,
        sortBy: "status",
        sortOrder: "ASC",
        // status: "ASSIGNED",
      }),
    4: () =>
      getAllRequestByStatusFn({
        page,
        size: rowsPerPage,
        sortBy: "status",
        sortOrder: "ASC",
        // status: "COMPLETED",
      }),
    5: () =>
      getAllRequestFn({
        page,
        size: rowsPerPage,
        sortBy: "status",
        sortOrder: "ASC",
        // status: "ASSIGNED",
      }),
  };

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

  const { data, isLoading } = useQuery({
    queryKey: queryKeys[myRole],
    queryFn: queryFns[myRole],
    select: (data) => {
      const totalCount = data?.data?.data?.totalElements;
      const rows = data?.data?.data?.content?.map((itm) => ({
        ...itm,
        action: "ActionButton",
      }));

      return { rows, totalCount };
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
      <AssignSolicitorRequest
        open={openModal === "unassign"}
        createdRequest={activeCreatedRequest}
        handleClose={() => setOpenModal("")}
      />
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
      <ViewCreatedRequestsModal
        open={openModal === "viewDetails"}
        createdRequest={activeCreatedRequest}
        handleClose={() => setOpenModal("")}
        myRole={myRole}
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
      <BatchAssignModal
        open={openModal === "batchAssign"}
        batchRows={selectedRows}
        handleClose={() => setOpenModal("")}
      />

      <Statistics />

      <div className="bg-white rounded-[10px] mb-8">
        <div className="flex items-center justify-between pb-4 p-8">
          <h1 className="text-xl font-semibold">DashboardNew</h1>
          <div className="flex items-center justify-between pb-4 p-8 gap-14">
            <DateSearchFilter />
            <InputFormField
              type="search"
              placeholder="Search"
              containerClassName="w-[250px]"
              appendIcon={<SearchIcon className="mr-3 absolute right-0" />}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        
        

        <BaseTable
          rows={data?.rows || []}
          columns={tableColumns[myRole]}
          page={page}
          showCheckbox
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          isLoading={isLoading}
          setRowsPerPage={setRowsPerPage}
          actionOptions={["View Details"]}
          actionItemOnClick={toggleModal}
          totalPage={data?.totalCount ?? 0}
          checkboxOnChange={checkboxOnChange}
          // allCheckboxOnChange={allCheckboxOnChange}
          search={search}
          filterKey="companyName"
          selectedRows={selectedRows.map(({ requestId }) => requestId)}
        />
        <Button
          customStyle="w-[150px] inline-block rounded-[10px] m-[15px] self-end h-[38px]"
          variant="primary"
          isLoading={false}
          onClick={showBatchModal}
          type="submit"
          disabled={selectedRows.length <= 1}
        >
          Batch Assign
        </Button>
      </div>
    </>
  );
};

export default DashboardNew;
