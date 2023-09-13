import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";
import "./CreateRequestMenu.scss";

const CreateRequestMenu = ({ anchorEl, open, handleClose }) => {
  const subNavigation = [
    {
      name: "Business Name",
      href: "/create-new-request?q=business_name",
      cName: "subNav",
    },
    {
      name: "Limited Liability Company",
      href: "/create-new-request?q=limited_liability_company",
      cName: "subNav",
    },
    {
      name: "Incorporated Trustees",
      href: "/create-new-request?q=incorporated_trustees",
      cName: "subNav",
    },
  ];

  return (
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
          width: "15rem",
        },
      }}
      sx={{ transform: "translateX(80px)", marginTop: "-15px" }}
    >
      {subNavigation.map(({ name, href, cName }) => {
        return (
          <div key={name}>
            <MenuItem>
              <Link to={href} className={cName}>
                {name}
              </Link>
            </MenuItem>
            <Divider />
          </div>
        );
      })}
    </Menu>
  );
};

export default CreateRequestMenu;
