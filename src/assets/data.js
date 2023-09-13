import { ReactComponent as DashboardIcon } from "../assets/svg/home.svg"
import { ReactComponent as LogoutIcon } from "../assets/svg/pending_request.svg"

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
