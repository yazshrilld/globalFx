import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getAllRequestFn } from "utils/ApiFactory/request";
import { csoCreateRequestTableColumns } from "assets/data";
import { ReactComponent as SearchIcon } from "assets/svg/search.svg";
import ViewCreatedRequestsModal from "components/requests/ViewCreatedRequestsModal";
import BaseTable from "components/BaseTable";
import InputFormField from "components/InputFormField";

const Requests = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [activeCreatedRequest, setActiveCreatedRequest] = useState(10);
  const [openModal, setOpenModal] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: [
      "all-requests",
      {
        page,
        size: rowsPerPage,
        sortBy: "status",
        sortOrder: "ASC",
      },
    ],
    queryFn: () =>
      getAllRequestFn({
        page,
        size: rowsPerPage,
        sortBy: "status",
        sortOrder: "ASC",
      }),
    onSuccess: (data) => {
      // console.log("DataOfAllRequests: ", data);
    },
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
  };

  return (
    <>
      <ViewCreatedRequestsModal
        open={openModal}
        createdRequest={activeCreatedRequest}
        handleClose={() => setOpenModal(false)}
      />

      <div className="bg-white rounded-[10px] mb-8">
        <div className="flex items-center justify-between pb-4 p-8">
          <h1 className="text-xl font-semibold">Request</h1>
          <InputFormField
            type="search"
            placeholder="Search"
            containerClassName="w-[354px]"
            appendIcon={<SearchIcon className="mr-3 absolute right-0" />}
          />
        </div>

        <BaseTable
          rows={data?.rows || []}
          columns={csoCreateRequestTableColumns}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          isLoading={isLoading}
          setRowsPerPage={setRowsPerPage}
          actionOptions={["View Details"]}
          totalPage={data?.totalCount ?? 0}
          actionItemOnClick={toggleModal}
        />
      </div>
    </>
  );
};

export default Requests;
