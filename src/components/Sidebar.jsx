import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { logout } from "../api/auth";

const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = async() => {
      try{
        await logout();
        navigate("/");
      }
      catch(error) {
        console.log(error);
      }
    }

  return (
    <div className="app-layout">
      <div className="sidebar">
        <div className="sidebar-brand-name">Financial<br />Dashboard</div>
        <div className="sidebar-brand-sub">Family Office</div>

        <nav className="sidebar-nav">
          <NavLink to="/family-tree">Family Tree</NavLink>
          <NavLink to="/wealth-assets">Wealth & Assets</NavLink>
        </nav>

        <div className="sidebar-bottom">
          <hr className="sidebar-divider" />
          <button onClick={handleLogout}>
            <i className="ti ti-logout" aria-hidden="true"></i>
            Logout
          </button>
        </div>
      </div>

      <main className="main-content">
        <Outlet />  
      </main>
    </div>
  );
};

export default Sidebar;
