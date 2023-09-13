import { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { UserContext } from "context/UserContext";
import { getAllSolicitorFn } from "utils/ApiFactory/solicitors";
import { getRequestBySolicitorFn } from "utils/ApiFactory/request";
import { LegalOfficerSolicitorsTableColumns } from "assets/data";
import { Link, useLocation } from "react-router-dom";
import BaseTable from "components/BaseTable";
import ApproveSolicitorModal from "components/solicitors/ApproveSolicitorModal";
import Statistics from "components/Statistics/Statistics";

const Solicitors = () => {
  const { user } = useContext(UserContext);
  const solicitorId = user.solicitorId;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [activeSolicitor, setActiveSolicitor] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("")


  const { pathname } = useLocation();

  const { data: AllSolicitors, isLoading } = useQuery({
    queryKey: [
      "all-solicitors",
      {
        page,
        size: rowsPerPage,
        sortBy: "solicitorApprovalStatus",
        sortOrder: "ASC",
      },
    ],

    queryFn: () =>
      getAllSolicitorFn({
        page,
        size: rowsPerPage,
        sortBy: "solicitorApprovalStatus",
        sortOrder: "ASC",
      }),
    onSuccess: (data) => {
      // console.log("DataSol: ", data);
    },
    select: (transformedData) => {
      const transform = transformedData.data.data.content.map((itm) => ({
        ...itm,
        action: "ActionButton",
      }));
      return transform;
    },
    onError: (err) => {
      // console.log(err);
    },
  });

  const { data: SolicitorRequest, isLoading: SolicitorIsLoading } = useQuery({
    queryKey: [
      "solicitor-requests",
      {
        page,
        size: rowsPerPage,
        sortBy: "status",
        sortOrder: "ASC",
        solicitorId: solicitorId,
      },
    ],

    queryFn: () =>
      getRequestBySolicitorFn({
        page,
        size: rowsPerPage,
        sortBy: "status",
        sortOrder: "ASC",
        solicitorId: solicitorId,
      }),
    onSucccess: (data) => {
      // console.log("getAllSolicitorFnSol: ", data);
    },

    select: (transformedData) => {
      const transform = transformedData.data.data.content.map((itm) => ({
        ...itm,
        action: "ActionButton",
      }));
      return transform;
    },
    onError: (err) => {
      // console.log(err);
    },
  });

  const toggleModal = (_, _1, row) => {
    setActiveSolicitor(row);
    setOpenModal((prevS) => !prevS);
  };

  return (
    <>
      <ApproveSolicitorModal
        open={openModal}
        solicitor={activeSolicitor}
        handleClose={() => setOpenModal(false)}
      />
      <Statistics />

      <div className="bg-white rounded-[10px] mb-8">
        <div className="flex items-center justify-between pb-4 p-8">
          <h1 className="text-xl font-semibold">{`${pathname
            .slice(5)[0]
            .toUpperCase()}${pathname.slice(6)}`}</h1>
          <Link
            className="text-xs px-6 py-1 bg-primaryDark rounded text-white"
            to="/app/dashboard"
          >
            View All
          </Link>
        </div>

        {isLoading && (
          <h1>
            Loading...{" "}
            {`${pathname.slice(5)[0].toUpperCase()}${pathname.slice(6)}`} data
          </h1>
        )}
        <BaseTable
          rows={AllSolicitors || []}
          columns={LegalOfficerSolicitorsTableColumns}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          actionOptions={["View Details"]}
          actionItemOnClick={toggleModal}
          // actionItemOnClick={(itm, value, row) => console.log(itm, value, row)}
        />
      </div>
    </>
  );
};

export default Solicitors;
