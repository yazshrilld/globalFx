// import Dashboard from "pages/Dashboard/Dashboard";
import { useState } from "react";
import DashboardNew from "pages/Dashboard/DashboardNew";
import SignIn from "pages/Auth/SignIn";
import ResetPassword from "pages/Auth/ResetPassword";
import ForgotPassword from "pages/Auth/ForgotPassword";
import CompletedRequests from "pages/CompletedRequests/CompletedRequest";
import CompletedRequestis from "pages/CompletedRequest/CompletedRequestis";
import CreateRequest from "pages/CreateRequest/CreateRequest";
import PendingRequests from "pages/PendingRequests/PendingRequests";
import PendingRequestis from "pages/PendingRequest/PendingRequestis";
import ReassignRequest from "pages/ReassignRequest/ReassignRequest";
import Reports from "pages/Reports/Reports";
import Solicitors from "pages/Solicitors/Solicitors";
import Solicitor from "pages/Solicitor/Solicitor";
import TrackRequest from "pages/TrackRequest/TrackRequest";
import Requests from "pages/Requests/Requests";
import PageNotFound from "pages/PageNotFound/PageNotFound";
import { Routes, Route, Navigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import MobileDeviceNotAllowed from "components/MobileDeviceNotAllowed";
import NewCreateSolicitors from "pages/Solicitors/NewCreateSolicitors";
import BusinessRequestForm from "pages/CreateRequest/BusinessRequestForm";
import "./index.css";
import AppLayout from "layout/AppLayout/AppLayout";
import AuthLayout from "layout/AuthLayout";
import NewCreateReports from "pages/Reports/NewCreateReports";
import UserContextProvider from "context/UserContext";
import UnassignedSolicitors from "pages/UnassignedSolicitors/UnassignedSolicitors";

function App() {
  const matches = useMediaQuery("(min-width:600px)");
  const [difyForm, setDifyForm] = useState(null);

  const handleSelection = (createForm) => {
    setDifyForm(createForm);
  };
  // console.log("MyForm: ", difyForm);

  return matches ? (
    <div className="App">
      <Routes>
        {/* Authentication */}
        <Route path="/" element={<Navigate to="/auth/sign-in" replace />} />
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="sign-in" element={<SignIn />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* Dashboard */}

        <Route
          path="/app"
          element={
            <UserContextProvider>
              <AppLayout handleSelection={handleSelection} />
            </UserContextProvider>
          }
        >
          <Route path="completed-requests" element={<CompletedRequests />} />
          <Route path="completed-requestss" element={<CompletedRequestis />} />
          <Route path="create-request" element={<CreateRequest />} />
          <Route
            path="create-request/new-request"
            element={<BusinessRequestForm key={difyForm} />}
          />
          {/* <Route path="dashboard" element={<Dashboard />} /> */}
          <Route path="dashboard" element={<DashboardNew />} />
          <Route path="pending-request" element={<PendingRequests />} />
          <Route path="pending-requestss" element={<PendingRequestis />} />
          <Route path="reports" element={<Reports />} />
          <Route path="reports/new-report" element={<NewCreateReports key={difyForm}/>} />
          <Route path="solicitors" element={<Solicitors />} />
          <Route path="solicitor" element={<Solicitor />} />
          <Route
            path="unassigned-solicitors"
            element={<UnassignedSolicitors />}
          />
          <Route
            path="solicitors/create-new"
            element={<NewCreateSolicitors />}
          />
          <Route path="requests" element={<Requests />} />
          <Route path="track-request" element={<TrackRequest />} />
          <Route path="reassign-request" element={<ReassignRequest />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  ) : (
    <MobileDeviceNotAllowed />
  );
}

export default App;
