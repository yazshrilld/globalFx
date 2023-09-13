import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
// import { useContext } from "react";
// import { UserContext } from "context/UserContext";
import { getSolicitorsByStatusFn } from "utils/ApiFactory/solicitors";
import { LegalOfficerUnassignedSolicitorsTableColumns 
} from "assets/data";
import { resolveUserRoleAccess } from "utils/resolveUserRoleAccess";
import { useLocation } from "react-router-dom";
import { ReactComponent as SearchIcon } from "assets/svg/search.svg";
import BaseTable from "components/BaseTable";
import ApproveSolicitorModal from "components/solicitors/ApproveSolicitorModal";
import InputFormField from "components/InputFormField";

const Solicitors = () => {
  const { pathname } = useLocation();
  const status = "NOT_APPROVED";

  // const { user } = useContext(UserContext);
  const userRole = sessionStorage.getItem("__role");
  const myRole = resolveUserRoleAccess(userRole);
  // const myRole = resolveUserRoleAccess(user.role);


  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [activeSolicitor, setActiveSolicitor] = useState({});
  const [openModal, setOpenModal] = useState(false);

  const [search, setSearch] = useState("")

  const { data: SolicitorByStatus, isLoading } = useQuery({
    queryKey: ["solicitor-by-status"],
    queryFn: () => getSolicitorsByStatusFn(status),
    // select: (data) => {
    //   console.log("MyAllSolData: ", data)
    // },
    select: (transformedData) => {
        // console.log("TD: ", transformedData?.data?.data);
      const transform = transformedData?.data?.data?.map((itm) => ({
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
        myRole={myRole}
      />

      <div className="bg-white rounded-[10px] mb-8">
        <div className="flex items-center justify-between pb-4 p-8">
          <h1 className="text-xl font-semibold">{`${pathname
            .slice(5)[0]
            .toUpperCase()}${pathname.slice(6)}`}</h1>
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
          rows={SolicitorByStatus || []}
          columns={LegalOfficerUnassignedSolicitorsTableColumns}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          actionOptions={["View Details"]}
          actionItemOnClick={toggleModal}
          filterKey="nameOfLawFirm"
          search={search}
        />
      </div>
    </>
  );
};

export default Solicitors;
