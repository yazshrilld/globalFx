import { useQuery } from "@tanstack/react-query";
import { useState, useContext } from "react";
import { UserContext } from "context/UserContext";
import { getRequestByCSOFnByStatus } from "utils/ApiFactory/request";
import { csoCreateRequestTableColumns } from "assets/data";
import { Link, useLocation } from "react-router-dom";
import BaseTable from "components/BaseTable";
import ViewCreatedRequestsModal from "components/requests/ViewCreatedRequestsModal";

const CreateRequest = () => {
  const { user } = useContext(UserContext);
  // const userEmail = user.email || "ymusa@providusbank.com"
  const userEmail = user.email || "ymusa@providusbank.com";
  // const userEmail = "ymusa@providusbank.com"

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [activeCreatedRequest, setActiveCreatedRequest] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { pathname } = useLocation();

  const {
    data: CsoEmailRequest,
    isLoading: CsoIsLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [
      "my-cso-request",
      {
        email: userEmail,
        page,
        size: rowsPerPage,
        sortBy: "status",
        sortOrder: "ASC",
        status: "ASSIGNED",
      },
    ],
    queryFn: () =>
      getRequestByCSOFnByStatus({
        email: userEmail,
        page,
        size: rowsPerPage,
        sortBy: "status",
        sortOrder: "ASC",
        status: "ASSIGNED",
      }),
    // onSucccess: (data) => {console.log("CSOData: ", data)},
    select: (data) => {
      const transform = data?.data?.data?.content?.map((itm) => ({
        ...itm,
        action: "ActionButton",
      }));
      console.log("transform", transform);
      // console.log("TransformedAllRequestDataSelect: ", data?.data?.data?.content);
      return transform;
    },
  });

  console.log("CsoEmail: ", CsoEmailRequest);

  const toggleModal = (_, _1, row) => {
    setActiveCreatedRequest(row);
    setOpenModal((prevS) => !prevS);
  };

  return (
    <>
      <ViewCreatedRequestsModal
        open={openModal}
        createdRequest={activeCreatedRequest}
        handleClose={() => setOpenModal(false)}
      />

      {/* <Statistics /> */}

      <div className="bg-white rounded-[10px] mb-8">
        <div className="flex items-center justify-between pb-4 p-8">
          <h1 className="text-xl font-semibold">Request</h1>
          <Link
            className="text-xs px-6 py-1 bg-primaryDark rounded text-white"
            to="/app/dashboard"
          >
            View All
          </Link>
        </div>
        {console.log("MyEmail: ", CsoEmailRequest)}
        {CsoIsLoading ? (
          <h1>
            Loading...{" "}
            {`${pathname.slice(5)[0].toUpperCase()}${pathname.slice(6)}`} data
          </h1>
        ) : isError ? (
          <p>{JSON.stringify(error)}</p>
        ) : CsoEmailRequest.length > 0 ? (
          <BaseTable
            rows={CsoEmailRequest || []}
            columns={csoCreateRequestTableColumns}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            actionOptions={["View Details"]}
            actionItemOnClick={toggleModal}
            filterKey="companyName"
          />
        ) : (
          <p>No records found</p>
        )}
        {/* <BaseTable
          rows={CsoEmailRequest || []}
          columns={csoDashboardTableColumns}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          // isLoading={isLoading}
          setRowsPerPage={setRowsPerPage}
          actionOptions={["View Details"]}
          actionItemOnClick={toggleModal}
          // search={search}
        /> */}
      </div>
    </>
  );
};

export default CreateRequest;
