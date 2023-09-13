import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "context/UserContext";
import { getCompletedRequestBySolicitor } from "utils/ApiFactory/request";
import { ReactComponent as SearchIcon } from "assets/svg/search.svg";
import { LegalOfficerDashboardTableColumns } from "assets/data";
import { useLocation } from "react-router-dom";
import { resolveUserRoleAccess } from "utils/resolveUserRoleAccess";
import BaseTable from "components/BaseTable";
import InputFormField from "components/InputFormField";
// import CompareReportsModal from "components/solicitors/CompareReportsModal";
import Warning from "components/solicitors/Warning";

const CompletedRequestis = () => {
  const { user } = useContext(UserContext);
  const userRole = sessionStorage.getItem("__role");
  const myRole = resolveUserRoleAccess(userRole);
  const solicitorId = user.solicitorId;
  // const myRole = resolveUserRoleAccess(user.role);


  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [activeCreatedRequest, setActiveCreatedRequest] = useState(10);
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");
  // console.log("MySearch: ", search);

  const { pathname } = useLocation();

  const { data: CompletedRequest, isLoading } = useQuery({
    queryKey: [
      "Completed-request-solicitor",
      {
        page,
        size: rowsPerPage,
        solicitorId: solicitorId,
        sortBy: "status",
        sortOrder: "ASC",
        status: "COMPLETED",
      },
    ],
    queryFn: () =>
      getCompletedRequestBySolicitor({
        page,
        size: rowsPerPage,
        solicitorId: solicitorId,
        sortBy: "status",
        sortOrder: "ASC",
        status: "COMPLETED",
      }),
    onSuccess: (data) => {
      console.log("CompletedRequest: ", data);
    },
    select: (data) => {
      const transform = data.data.data.content.map((itm) => ({
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

    if (myRole === 1 && row.status === "COMPLETED") {
      setOpenModal("warning");
    }
  };
  return (
    <>
      <Warning
        open={openModal === "warning"}
        createdRequest={activeCreatedRequest}
        handleClose={() => setOpenModal("")}
      />

      <div className="bg-white rounded-[10px] mb-8">
        <div className="flex items-center justify-between pb-4 p-8">
          <h1 className="text-xl font-semibold">Completed Requests</h1>
          <InputFormField
            type="search"
            placeholder=""
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
          rows={CompletedRequest || []}
          columns={LegalOfficerDashboardTableColumns}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          actionOptions={["CLOSED"]}
          actionItemOnClick={toggleModal}
          search={search}
        />
      </div>
    </>
  );
};

export default CompletedRequestis;
