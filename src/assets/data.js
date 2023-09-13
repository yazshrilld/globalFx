import { ReactComponent as DashboardIcon } from "../assets/svg/home.svg";
import { ReactComponent as LogoutIcon } from "../assets/svg/pending_request.svg";

const installDefaultPackages = [
  "@emotion/react @emotion/styled @mui/lab @mui/material @tanstack/react-query @tanstack/react-query-devtools axios dayjs formik node-sass react-router-dom react-toastify tw-elements-react yup",
];

export const navigation = (role) => [
  {
    name: "Dashboard",
    icon: <DashboardIcon />,
    href: "/app/dashboard",
    role: true,
  },

  {
    name: "Logout",
    icon: <LogoutIcon />,
    href: "/auth/sign-in",
    role: true,
  },
];

export const LOGIN_DUMMY_DATA = [
  {
    status: "success",
    message: "Login successful",
    data: {
      emplId: "221005",
      unit: {
        name: "Application Development",
        id: 1,
      },
      role: "Application Developer",
      roleaccess: "",
      empName: "MUSA, YAZID TOPA",
      id: 1303,
      responseMessage: "Authenticated Successfully",
      department: {
        name: "Information Technology",
        id: 1,
      },
      braCode: {
        name: "Head Office",
        id: 1,
      },
      supervisor: {
        name: "NDUKWE, NNAMDI NDUKWE",
        id: 442,
      },
      responseCode: "00",
    },
  },
];

export const FXTX_DUMMY_DATA = [
  {
    status: "success",
    message: "Fetch Successful",
    data: {
      blotter: [
        {
          date_added: "9/12/2023 3:04:06 PM",
          amount: 120.0,
          referenceNo: "test-12344Xs",
          narration: "Sell Fx to Bank with ref: test-12344Xs",
          channel: 2,
          source_account: "5900085856",
          fx_rate: 500.0,
          equ_amount: 60000.0,
          rowid: 1,
          destination_account: "1700085845",
        },
        {
          date_added: "9/12/2023 3:05:20 PM",
          amount: 1000.0,
          referenceNo: "test-4567890-098",
          narration: "Sell FX to Bank with Ref: test-4567890-098",
          channel: 8,
          source_account: "1300000002",
          fx_rate: 620.0,
          equ_amount: 620000.0,
          rowid: 2,
          destination_account: "1700000009",
        },
      ],
      current_start_stop_flg: 1,
      responseMessage: "Successful",
      responseCode: "00",
      current_fx_rate: 461.59,
    },
  },
];

export const UPDATE_SUCCESS_STOP = [
  {
    status: "success",
    message: "Update Successful",
    data: {
      responseMessage: "Sell_fx module stopped successfully.",
      responseCode: "00",
    },
  },
];

export const UPDATE_SUCCESS_START = [
  {
    status: "success",
    message: "Update Successful",
    data: {
      responseMessage:
        "Sell_fx module started successfully. Current rate is: 461.59",
      responseCode: "00",
    },
  },
];
