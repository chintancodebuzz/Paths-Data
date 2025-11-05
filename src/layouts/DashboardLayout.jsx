import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../ui/Sidebar";
import Header from "../pages/header/Header";
import Logout from "../components/models/logout/Logout";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt_token");

  useEffect(() => {
    if (!token) {
      // navigate("/sign-in");
    }
  }, [token]);

  const [mobileToggle, setMobileToggle] = useState(false);
  console.log("🚀 ~ DashboardLayout ~ mobileToggle:", mobileToggle);
  const [show, setShow] = useState(false);
  const [isLogouLoading, setIsLogouLoading] = useState(false);

  const handleLogout = async () => setShow(true);
  const handleClose = () => setShow(false);

  const confirmLogout = () => {
    setIsLogouLoading(true);
    setTimeout(() => {
      localStorage.removeItem("jwt_token");
      localStorage.setItem("openCloudOption", false);
      localStorage.setItem("openUser", false);
      navigate("/sign-in");
      setIsLogouLoading(false);
    }, 500);
  };

  return (
    <div className="layout">
      <section className="main-section">
        <div className="layout has-sidebar fixed-sidebar fixed-header">
          <Sidebar
            mobileToggle={mobileToggle}
            setMobileToggle={setMobileToggle}
            handleLogout={handleLogout}
          />
          <div className="layout">
            <main className="content">
              <Header
                mobileToggle={mobileToggle}
                setMobileToggle={setMobileToggle}
                handleLogout={handleLogout}
              />
              <div className="outlet">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
      </section>

      <Logout
        show={show}
        handleClose={handleClose}
        handleLogout={confirmLogout}
        isLogouLoading={isLogouLoading}
      />
    </div>
  );
};

export default DashboardLayout;
