import { useState } from "react";
import { ReactComponent as UserIcon } from "../assets/svg/Avatar.svg";
import { ReactComponent as ChevronDownIcon } from "../assets/svg/expand_more.svg";
import { ReactComponent as ProvidusLogo } from "../assets/svg/providus.svg";
import { ReactComponent as Hamburger } from "../assets/svg/hamburger.svg";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

const AccountMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div className="sticky top-0 z-[20] flex justify-between bg-white h-[91px] px-[30px] xl:px-[55px]">
        <div className="flex items-center space-x-4 xl:hidden">
          <Hamburger className="" />
          <ProvidusLogo className="w-[100px] h-[40px]" />
        </div>
        <div className="ml-auto w-fit flex items-center" onClick={handleClick}>
          <div sx={{ ml: "1.75rem" }}>
            <Avatar sx={{ width: "3.18rem", height: "3.18rem" }}>
              <UserIcon />
            </Avatar>
          </div>
          <div>
            <IconButton>
              <ChevronDownIcon />
            </IconButton>
          </div>
        </div>
      </div>
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
              Yazid
            </p>
            <p className="text-sm text-fontLight font-medium">Musa</p>
          </div>
        </MenuItem>
        <Divider />
        <MenuItem onClick={console.log("I am logged out")}></MenuItem>
      </Menu>
    </>
  );
};

export default AccountMenu;
