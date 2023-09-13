import { useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { ReactComponent as UserIcon } from "assets/svg/Avatar.svg";
import { ReactComponent as ChevronDownIcon } from "assets/svg/expand_more.svg";
import { UserContext } from "context/UserContext";
import { useContext } from "react";
import { useSessionStorage } from "Hooks/useSessionStorage";
import { useNavigate } from "react-router-dom";

const AccountMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { removeItem } = useSessionStorage();
  const { user, setIsLoggedOut } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    setIsLoggedOut(true);
    removeItem("tk");
    removeItem("role");

    navigate("/auth/sign-in", { replace: true });
  };

  return (
    <>
      <Box>
        <Stack
          direction="row"
          alignItems="center"
          onClick={handleClick}
          sx={{
            cursor: "pointer",
          }}
        >
          <Box sx={{ ml: "1.75rem" }}>
            <Avatar sx={{ width: "3.18rem", height: "3.18rem" }}>
              <UserIcon />
            </Avatar>
          </Box>
          <Box>
            <IconButton>
              <ChevronDownIcon />
            </IconButton>
          </Box>
        </Stack>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            ml: -4,
            "& .MuiAvatar-root": {
              width: 52,
              height: 52,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 34,
              width: 10,
              height: 10,
              bgcolor: "colors.lightAsh",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
      >
        <MenuItem>
          <Avatar>
            <UserIcon />
          </Avatar>
          <div className="ml-2">
            <p className="font-semibold text-base text-font capitalize">
              {user?.name ?? user?.nameOfLawFirm}
            </p>
            <p className="text-sm text-fontLight font-medium">{user?.role}</p>
          </div>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogOut}>
          <span className="font-medium">Logout</span>
        </MenuItem>
      </Menu>
    </>
  );
};

export default AccountMenu;
