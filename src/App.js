import { useMediaQuery } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import MobileDeviceNotAllowed from "components/MobileDeviceNotAllowed";
import "./index.css";
import SignIn from "pages/Auth/SignIn";

function App() {
  const matches = useMediaQuery("(min-width:600px)");

  return matches ? (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/auth/sign-in" replace />} />
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="sign-in" element={<SignIn />} />
        </Route>
      </Routes>
    </div>
  ) : (
    <MobileDeviceNotAllowed />
  );
}

export default App;
