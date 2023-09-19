import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "context/UserContext";
import { useContext, useEffect, useState } from "react";
import { resolveUserRoleAccess } from "utils/resolveUserRoleAccess";
import { useQuery } from "@tanstack/react-query";
import { fetchFxFn } from "utils/ApiFactory/fxTxApi";
import AccountMenu from "components/AccountMenu";
import io from "socket.io-client";
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
import axios from "axios";

// import Loa

const AppLayout = ({ handleSelection }) => {
  const {
    user,
    showToast,
    fxStatus,
    setfxStatus,
    fxStatusIsLoading,
    setfxStatusIsLoading,
    fxSocketStatus,
    setFxSocketStatus,
  } = useContext(UserContext);
  const staff = user.username;
  const userRole = sessionStorage.getItem("__role");
  const myRole = resolveUserRoleAccess(userRole);
  const token = sessionStorage.getItem("__tk");
  const baseURL = process.env.REACT_APP_TEST_BASE_URL;
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // const socket = io.connect("http://127.0.0.1:4201")
  const socket = io.connect("http://192.168.52.173:4201");

  // let ToggleTrad = {
  //   updated_by: "ymusa",
  //   start_stop_flg: 1,
  // };

  let ToggleTradStart = {
    updated_by: "ymusa",
    start_stop_flg: 1,
  };

  let ToggleTradStop = {
    updated_by: "ymusa",
    start_stop_flg: 0,
  };

  const sendStatus = () => {
    // socket.emit("authenticate", token);
    socket.emit('TradeAction', ToggleTradStart);
  };
  
  console.log("My AppLayout: ", fxStatus)

  const [showPopUp, setShowPopUp] = useState({
    open: false,
    type: "start",
  });
  const [apiRequest, setApiRequest] = useState({
    isStartLoading: false,
    isStopLoading: false,
  });
  const [msg, setMsg] = useState("");
  const fxRates = sessionStorage.getItem("fxRate");
  const [isSelected, setIsSelected] = useState("");
  const [selected, setSelected] = useState({
    issSelected: "",
    isSuccess: false,
  });

  // const startFxFn = async () => {
  //   const trimStr = (str) => {
  //     if (str !== null && str !== undefined) {
  //       return str.trim();
  //     }
  //     return "";
  //   };
  //   const url = `${baseURL}/start_stop`;
  //   const payload = {
  //     updated_by: staff,
  //     start_stop_flg: 1,
  //   };
  //   setApiRequest((prevS) => ({
  //     ...prevS,
  //     isStartLoading: true,
  //   }));
  //   try {
  //     const res = await axios.post(url, payload, {
  //       headers: {
  //         Authorization: token,
  //       },
  //     });
  //     if (res) {
  //       console.log({ res });
  //       const successMessage = res?.data?.data?.responseMessage;
  //       if (showPopUp.type === "start") {
  //         showToast({
  //           severity: "success",
  //           message: "Fx has succesfully started",
  //         });
  //         setShowPopUp({
  //           open: false,
  //           type: "",
  //         });
  //         setSelected((prevS) => ({
  //           ...prevS,
  //           isSuccess: true,
  //         }));
  //         setfxStatus(true);
  //       }
  //       sessionStorage.setItem("start", true);
  //       sessionStorage.setItem("status", "Active");
  //       setMsg((prevS) => ({
  //         ...prevS,
  //         msg: trimStr(successMessage),
  //       }));
  //     }
  //   } catch (error) {
  //     if (error) {
  //       console.log("First Error: ", { error });
  //       showToast({
  //         severity: "error",
  //         message:
  //           error?.response?.data?.data?.responseMessage ||
  //           "Could not process request.",
  //       });
  //     }
  //   } finally {
  //     setApiRequest((prevS) => ({
  //       ...prevS,
  //       isStartLoading: false,
  //     }));
  //   }
  // };

  // const stopFxFn = async () => {
  //   const url = `${baseURL}/start_stop`;
  //   const payload = {
  //     updated_by: staff,
  //     start_stop_flg: 0,
  //   };
  //   setApiRequest((prevS) => ({
  //     ...prevS,
  //     isStopLoading: true,
  //   }));
  //   try {
  //     const res = await axios.post(url, payload, {
  //       headers: {
  //         Authorization: token,
  //       },
  //     });
  //     if (res) {
  //       console.log({ res });
  //       if (showPopUp.type === "stop") {
  //         showToast({
  //           severity: "success",
  //           message: "Fx has succesfully stopped",
  //         });
  //         setShowPopUp({
  //           open: false,
  //           type: "",
  //         });
  //         setSelected((prevS) => ({
  //           ...prevS,
  //           isSuccess: false,
  //         }));
  //         setfxStatus(false);
  //       }
  //       sessionStorage.setItem("start", false);
  //       sessionStorage.setItem("status", "Stop");
  //     }
  //   } catch (error) {
  //     if (error) {
  //       console.log("First Error: ", { error });
  //       showToast({
  //         severity: "error",
  //         message:
  //           error?.response?.data?.data?.responseMessage ||
  //           "Could not process request.",
  //       });
  //     }
  //   } finally {
  //     setApiRequest((prevS) => ({
  //       ...prevS,
  //       isStopLoading: false,
  //     }));
  //   }
  // };
  //WORKING CODE HERE
  // const handleIsToggle = () => {
  //   if (fxStatus) {
  //     handlePopUp("stop");
  //   } else {
  //     handlePopUp("start");
  //   }
  // };


  const handleIsToggle = () => {
    if (fxStatus) {
      handlePopUp("stop");
    } else {
      handlePopUp("start");
    }
  };

  const handlePopUp = (type) => {
    setShowPopUp({
      open: true,
      type,
    });
  };

  // const startFxAndSocket = () => {
  //   startFxFn();
  //   sendStatus();
  // }

  // const stopFxAndSocket = () => {
  //   stopFxFn();
  //   sendStatus();
  // }

  // const handleStartorStop = () => {
  //   if (showPopUp.type === "start") {
  //     return startFxFn();
  //   } else {
  //     return stopFxFn();
  //   }
  // };

  // const handleStartorStop = () => {
  //   if (showPopUp.type === "start") {
  //     return startFxAndSocket();
  //   } else {
  //     return stopFxAndSocket();
  //   }
  // };

  useEffect(() => {
    if (!user?.exp || user.exp * 1000 < Date.now()) {
      sessionStorage.removeItem("__tk");
      sessionStorage.removeItem("__role");
      navigate("/auth/sign-in", { replace: true });
    }
  }, [pathname, navigate, user.exp]);

  const { isLoading } = useQuery({
    queryKey: ["fetch-fx-now"],
    queryFn: () =>
      fetchFxFn({
        startdate: new Date(),
        enddate: new Date(),
      }),
    onSuccess: (data) => {
      const status = data.data.data.current_start_stop_flg > 0;
      setfxStatus(status);
      setfxStatusIsLoading(false);
    },
  });

  // console.log({selected});
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
              onClick={() =>
                setShowPopUp({ open: false, type: showPopUp.type })
              }
              // onClick={rejectReport}
            >
              No
            </Button>
            <Button
              isLoading={apiRequest.isStartLoading || apiRequest.isStopLoading}
              variant={`${showPopUp.type === "stop" ? "error" : "success"}`}
              customStyle="px-8 h-auto py-1 rounded-[4px] text-[14px]"
              onClick={() => console.log("I am clicked")}
              // onClick={handleStartorStop}
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
        <Box className="nav-bar bg-blue-500 shadow-md">

          {myRole === 4 && (
            <div className="flex items-center gap-3">
              <Button
                type="submit"
                customStyle="w-[100px] inline-block rounded-[10px] px-2 text-black self-end h-[38px]"
                variant="success"
                // onClick={() => handlePopUp("start")}
                onClick={sendStatus}
                disabled={false}
              >
                Socket
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

              <div
                onClick={handleIsToggle}
                // onClick={() => setIsSelected(!isSelected)}
                className={`flex w-10 h-5 rounded-full transition-all duration-500 ${
                  // selected.isSuccess ? "bg-green-500" : "bg-gray-500"
                  fxStatus ? "bg-green-500" : "bg-red-500"
                }`}
              >
                <span
                  className={`h-5 w-5 bg-gray-50 cursor-pointer rounded-full transition-all duration-500 shadow-2xl ${
                    fxStatus ? "ml-5" : ""
                  }`}
                ></span>
              </div>
            </div>
          )}
          
          <div
            className={`ml-5 p-[16px_20px] bg-transparent rounded-[10px] shadow-md font-medium ${
              !fxStatus ? "line-through" : ""
            }`}
          >
            FX RATE: {`₦${fxRates}`}
          </div>
          <Box className="nav-bar-user-profile-notification ml-auto">
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
