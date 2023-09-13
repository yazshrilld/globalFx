import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ReactComponent as NotFoundIcon } from "../assets/svg/visibility.svg";

const MobileDeviceNotAllowed = () => {
  return (
    <Box className="mobile-screen">
      <NotFoundIcon className="laptop-icon" />
      <Typography
        sx={{
          fontSize: "1.25rem",
          fontWeight: 500,
        }}
      >
        Switch to a device with bigger screen resolution to use this app
      </Typography>
    </Box>
  );
};

export default MobileDeviceNotAllowed;
