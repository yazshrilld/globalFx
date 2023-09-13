import ReportsTable from "components/ReportsTable";
import Search from "components/Search";

const Reports = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl">Reports</h1>
        <Search />
      </div>
      <ReportsTable />
    </>
  );
};

export default Reports;
