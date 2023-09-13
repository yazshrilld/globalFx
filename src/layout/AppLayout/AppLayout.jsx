import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import AccountMenu from "components/AccountMenu";
import "./AppLayout.styles.scss";
import SideNav from "../SideNav/SideNav";
import { UserContext } from "context/UserContext";
import { useContext, useEffect } from "react";

const AppLayout = ({ handleSelection }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!user?.exp || user.exp * 1000 < Date.now()) {
      sessionStorage.removeItem("__tk");
      sessionStorage.removeItem("__role");
      navigate("/auth/sign-in", { replace: true });
    }
  }, [pathname, navigate, user.exp]);

  return (
    <Grid container>
      <Grid
        item
        xs={2.5}
        sx={{
          minHeight: "100vh",
          width: "40em",
          bgcolor: "colors.lightAsh",
          // bgcolor: "red",
          // position: "fixed",
          // top: 0,
          // left: 0,
          // right: 0,
        }}
      >
        <SideNav handleSelection={handleSelection} />
      </Grid>
      <Grid
        item
        xs={9.5}
        sx={{
          minHeight: "100vh",
          bgcolor: "primary.lightGray",
        }}
      >
        <Box className="nav-bar bg-blue-500">
          <Box className="nav-bar-user-profile-notification bg-red-500">
            <Box className="nav-bar-accountMenu top-0 sticky bg-green-500">
              <AccountMenu />
            </Box>
          </Box>
        </Box>

        <Box
          m="1.25rem"
          sx={{
            borderRadius: "12px",
            minHeight: "70vh",
          }}
        >
          <Box display="flex" alignItems="center"></Box>
          <div className="py-4">
            <Outlet />
          </div>
        </Box>
      </Grid>
    </Grid>
  );
};

export default AppLayout;
