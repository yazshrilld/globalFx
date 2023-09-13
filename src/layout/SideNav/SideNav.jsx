import { Link } from "react-router-dom";
import { resolveUserRoleAccess } from "utils/resolveUserRoleAccess";
import { navigation } from "assets/data";
import SideBarNavLink from "./SideBarNavLink";
import Logo from "../../assets/svg/logo2.png";

const SideNav = () => {
  const userRole = sessionStorage.getItem("__role");
  const myRole = resolveUserRoleAccess(userRole);

  return (
    <div className="w-[371px] xl:w-full fixed xl:relative top-0 -left-[371px] xl:left-0 h-screen bg-white z-[30] xl:z-[1]">
      <div>
        <Link to="/dashboard">
          <img
            className="mx-auto w-[120px] h-[50px] mt-16"
            src={Logo}
            alt="Providus Logo"
          />
        </Link>
      </div>

      <div className="mt-12">
        {navigation(myRole).map(({ name, icon, href, role }, idx) => {
          return (
            role && (
              <SideBarNavLink key={idx} icon={icon} title={name} href={href} />
            )
          );
        })}
      </div>
    </div>
  );
};

export default SideNav;
