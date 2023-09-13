import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
// import { useState, useContext } from "react";
// import { UserContext } from "context/UserContext";
import { getAllRequestByStatusFn } from "utils/ApiFactory/request";
import { ReactComponent as SearchIcon } from "assets/svg/search.svg";
import { LegalOfficerDashboardTableColumns } from "assets/data";
import { useLocation } from "react-router-dom";
import BaseTable from "components/BaseTable";
import InputFormField from "components/InputFormField";
import AssignSolicitorRequest from "components/solicitors/AssignSolicitorRequest";

const PendingRequests = () => {
  // const { user } = useContext(UserContext);
  // const userEmail = user.email || "ymusa@providusbank.com";

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [activeCreatedRequest, setActiveCreatedRequest] = useState(10);
  const [openModal, setOpenModal] = useState(false);

  const [search, setSearch] = useState("");
  // console.log("MySearch: ", search);

  const { pathname } = useLocation();

  const { data: PendingRequest, isLoading } = useQuery({
    queryKey: [
      "pending-request",
      {
        page,
        size: rowsPerPage,
        sortBy: "status",
        sortOrder: "ASC",
        status: "UNASSIGNED",
      },
    ],
    queryFn: () =>
      getAllRequestByStatusFn({
        page,
        size: rowsPerPage,
        sortBy: "status",
        sortOrder: "ASC",
        status: "UNASSIGNED",
      }),
    onSuccess: (data) => {
      // console.log("PendingRequest: ", data);
    },
    select: (data) => {
      const transform = data.data.data.content.map((itm, idx) => ({
        ...itm,
        action: "ActionButton",
      }));
      // console.log("TransformedAllRequestDataSelect: ", transform);
      return transform;
    },
  });

  const toggleModal = (_, _1, row) => {
    setActiveCreatedRequest(row);
    setOpenModal((prevS) => !prevS);
    if(row.status === "UNASSIGNED") {
      setOpenModal('unassign');
    }
  };
  return (
    <>
      <AssignSolicitorRequest
        open={openModal === "unassign"}
        createdRequest={activeCreatedRequest}
        handleClose={() => setOpenModal("")}
      />

      <div className="bg-white rounded-[10px] mb-8">
        <div className="flex items-center justify-between pb-4 p-8">
          <h1 className="text-xl font-semibold">Pending Requests</h1>
          <InputFormField
            type="search"
            placeholder="Search"
            containerClassName="w-[354px]"
            appendIcon={<SearchIcon className="mr-3 absolute right-0" />}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {isLoading && (
          <h1>
            Loading...{" "}
            {`${pathname.slice(5)[0].toUpperCase()}${pathname.slice(6)}`} data
          </h1>
        )}
        <BaseTable
          rows={PendingRequest || []}
          columns={LegalOfficerDashboardTableColumns}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          actionOptions={["View Details"]}
          actionItemOnClick={toggleModal}
          search={search}
        />
      </div>
    </>
  );
};

export default PendingRequests;
