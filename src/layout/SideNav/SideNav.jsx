import { Link } from "react-router-dom";
import { resolveUserRoleAccess } from "utils/resolveUserRoleAccess";
import SideBarNavLink from "./SideBarNavLink";
import { navigation } from "assets/data";
// import { useContext } from "react";
// import { UserContext } from "context/UserContext";
import Logo from "assets/svg/logo2.png";

const SideNav = ({ handleSelection }) => {
  //for manual testing
  // const userRole = sessionStorage.getItem("Solicitor");
  // const userRole = sessionStorage.getItem("Customer Service Officer");
  // const userRole = sessionStorage.getItem("Legal Officer");
  // const userRole = sessionStorage.getItem("Team Lead, Legal Services");
  
  // const { user } = useContext(UserContext);
  // const myRole = resolveUserRoleAccess(user.role);

  const userRole = sessionStorage.getItem("__role");
  const myRole = resolveUserRoleAccess(userRole); 
  return (
    <>
      <div className="top-0 left-0 sticky">
        <Link to="/dashboard">
          {/* <img
            src="/images/brand-logo.webp"
            alt="Providus Logo"
            className="mx-auto w-[136px] h-[50px] mt-16"
          /> */}
          <img
            className="mx-auto w-[120px] h-[50px] mt-16"
            src={Logo}
            alt="Providus Logo"
          />
        </Link>
      </div>

      <div className="mt-12 top-0 left-0 sticky">
        {navigation(myRole).map(({ name, icon, href, role, dropdown }, idx) => {
          return (
            role && (
              <SideBarNavLink
                key={idx}
                icon={icon}
                title={name}
                dropdown={dropdown}
                href={href}
                handleSelection={handleSelection}
              />
            )
          );
        })}
      </div>
    </>
  );
};

export default SideNav;
