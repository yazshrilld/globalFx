import { Outlet, useNavigate, useLocation } from "react-router-dom";
import AccountMenu from "components/AccountMenu";
import "./AppLayout.styles.scss";
import SideNav from "layout/SideNav/SideNav";

const AppLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="overflow-hidden layout grid w-full h-screen grid-cols-1">
      <SideNav />
      <div className="content overflow-y-auto h-screen bg-[#F4F4F4]">
        <AccountMenu />
        <div className="m-6 rounded-xl">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
