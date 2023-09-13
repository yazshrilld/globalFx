import { Link, NavLink } from "react-router-dom";

const navClass =
  "flex items-center group relative h-[71px] text-font space-x-4 text-[20px] font-medium";

const SideBarNavLink = ({ title, icon, href }) => {
  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        isActive ? `${navClass} nav-icon bg-primary` : navClass
      }
    >
      <span className="ml-6">{icon}</span>
      <span className="font-medium text-base">{title}</span>
    </NavLink>
  );
};

export default SideBarNavLink;
