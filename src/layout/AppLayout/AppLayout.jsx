import { Outlet, useNavigate, useLocation } from "react-router-dom";
import AccountMenu from "components/AccountMenu";
import { UserContext } from "context/UserContext";
import { useContext, useEffect, useState } from "react";
import "./AppLayout.styles.scss";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import SideNav from "../SideNav/SideNav";
import Button from "components/BaseButton";
import { resolveUserRoleAccess } from "utils/resolveUserRoleAccess";
import axios from "axios";

const AppLayout = ({ handleSelection }) => {
  const { user, showToast } = useContext(UserContext);
  const staff = user.username;
  const userRole = sessionStorage.getItem("__role");
  const myRole = resolveUserRoleAccess(userRole);
  const token = sessionStorage.getItem("__tk");
  const baseURL = process.env.REACT_APP_TEST_BASE_URL;
  console.log({ baseURL });
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [showPopUp, setShowPopUp] = useState({
    open: false,
    type: "start",
  });
  const [apiRequest, setApiRequest] = useState({
    isStartLoading: false,
    isStopLoading: false,
  });
  const [msg, setMsg] = useState("")

  const startFxFn = async () => {
    const trimStr = (str) => {
      if (str != null && str != undefined) {
        return str.trim();
      }
      return "";
    };
    const url = `${baseURL}/start_stop`;
    const payload = {
      updated_by: staff,
      start_stop_flg: 1,
    };
    setApiRequest((prevS) => ({
      ...prevS,
      isStartLoading: true,
    }));
    try {
      const res = await axios.post(url, payload, {
        headers: {
          Authorization: token,
        },
      });
      if (res) {
        console.log({ res });
        const successMessage = res?.data?.data?.responseMessage
        if (showPopUp.type === "start") {
          showToast({
            severity: "success",
            message: "Fx has succesfully started",
          });
          setShowPopUp({
            open: false,
            type: "",
          });
        }
        sessionStorage.setItem("start", true)
        setMsg((prevS) => ({
          ...prevS,
          msg: trimStr(successMessage),
        }))
      }
    } catch (error) {
      showToast({
        severity: "error",
        message: "Could not process confirmation.",
      });
    } finally {
      setApiRequest((prevS) => ({
        ...prevS,
        isStartLoading: false,
      }));
    }
  };

  const stopFxFn = async () => {
    const url = `${baseURL}/start_stop`;
    const payload = {
      updated_by: staff,
      start_stop_flg: 0,
    };
    setApiRequest((prevS) => ({
      ...prevS,
      isStopLoading: true,
    }));
    try {
      const res = await axios.post(url, payload, {
        headers: {
          Authorization: token,
        },
      });
      if (res) {
        console.log({ res });
        if (showPopUp.type === "stop") {
          showToast({
            severity: "success",
            message: "Fx has succesfully stopped",
          });
          setShowPopUp({
            open: false,
            type: "",
          });
        }
        sessionStorage.setItem("start", false)
      }
    } catch (error) {
      showToast({
        severity: "error",
        message: "Could not process confirmation.",
      });
    } finally {
      setApiRequest((prevS) => ({
        ...prevS,
        isStartLoading: false,
      }));
    }
  };

  const handlePopUp = (type) => {
    setShowPopUp({
      open: true,
      type,
    });
  };

  const handleStartorStop = () => {
    if (showPopUp.type === "start") {
      return startFxFn();
    } else {
      return stopFxFn();
    }
  };

  useEffect(() => {
    if (!user?.exp || user.exp * 1000 < Date.now()) {
      sessionStorage.removeItem("__tk");
      sessionStorage.removeItem("__role");
      navigate("/auth/sign-in", { replace: true });
    }
  }, [pathname, navigate, user.exp]);

  console.log("length: ", msg.length);

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
        <Dialog
          open={showPopUp.open}
          onClose={() => setShowPopUp({ open: false, type: "" })}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>
            CONFIRM TO {`${showPopUp.type.toUpperCase()} FX`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {`Kindly confirm if you want to ${showPopUp.type} this report`}
            </DialogContentText>
          </DialogContent>
          <DialogActions className="mt-6 mb-3">
            <Button
              variant="warning"
              customStyle="px-8 h-auto py-1 rounded-[4px] text-[14px]"
              onClick={() => setShowPopUp({ open: false, type: "" })}
              // onClick={rejectReport}
            >
              No
            </Button>
            <Button
              isLoading={apiRequest.isStartLoading}
              variant={`${showPopUp.type === "stop" ? "error" : "success"}`}
              customStyle="px-8 h-auto py-1 rounded-[4px] text-[14px]"
              onClick={handleStartorStop}
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
        <Box className="nav-bar bg-blue-500">
          {myRole === 4 && (
            <div className="flex items-center gap-3">
              <Button
                type="submit"
                customStyle="w-[100px] inline-block rounded-[10px] px-2 text-black self-end h-[38px]"
                variant="success"
                onClick={() => handlePopUp("start")}
                disabled={false}
              >
                Start Fx
              </Button>
              <Button
                type="submit"
                customStyle="w-[100px] inline-block rounded-[10px] px-2 text-black self-end h-[38px]"
                variant="error"
                onClick={() => handlePopUp("stop")}
                disabled={false}
              >
                Stop Fx
              </Button>
            </div>
          )}

          <Box className="nav-bar-user-profile-notification">
            <Box className="nav-bar-accountMenu top-0 sticky">
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
