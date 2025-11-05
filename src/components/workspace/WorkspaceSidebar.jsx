import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "../../ui/Sidebar.css";
// Import images
import logout from "../../assets/images/sidebar/logout.png";
import sidebarlogo from "../../assets/images/home/logo.png";
import smallLogo from "../../assets/images/sidebar/logo.png";
import dashboard from "../../assets/images/sidebar/dashboard.png";
import cluster from "../../assets/images/workspace_sidebar/clustor.png";
import cloud_resource from "../../assets/images/workspace_sidebar/cloud_resource.png";
import rightArrow from "../../assets/images/nvigation_arrows/right-arrow.png";

const WorkspaceSidebar = ({
  workspaceId,
  mobileToggle,
  setMobileToggle,
  handleLogout,
  onExpandChange,
}) => {
  const { pathname } = useLocation();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("");
  const [openMenu, setOpenMenu] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 991);

  // Handle resize and mobile detection
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 991;
      setIsMobile(mobile);

      // Auto-close sidebar on mobile when resizing to desktop
      if (!mobile && mobileToggle) {
        setMobileToggle(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileToggle, setMobileToggle]);

  const handleSidebarDismiss = () => {
    if (isMobile) {
      setMobileToggle(false);
    }
    setIsSidebarExpanded(false);
  };

  const toggleSidebar = () => {
    if (isMobile) {
      setMobileToggle(!mobileToggle);
    } else {
      setIsSidebarExpanded(!isSidebarExpanded);
      // Close all menus when collapsing sidebar
      if (isSidebarExpanded) {
        setOpenMenu(null);
      }
    }
  };

  // Reflect expanded state on body for layout offset
  useEffect(() => {
    if (isSidebarExpanded && !isMobile) {
      document.body.classList.add("sidebar-expanded");
    } else {
      document.body.classList.remove("sidebar-expanded");
    }

    if (typeof onExpandChange === "function") {
      onExpandChange(isSidebarExpanded && !isMobile);
    }

    return () => {
      document.body.classList.remove("sidebar-expanded");
    };
  }, [isSidebarExpanded, isMobile]);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
    setIsSidebarExpanded(false);
  };

  const toggleSubMenu = (menu) => {
    setIsSidebarExpanded(openMenu !== menu);
    setSelectedMenu(menu);
    setOpenMenu(menu);
  };

  // Determine sidebar classes
  const getSidebarClasses = () => {
    const classes = ["sidebar", "break-point-md", "has-bg-image"];

    if (isMobile) {
      classes.push("mobile-sidebar");
      if (mobileToggle) {
        classes.push("mobile-open");
      }
    } else {
      if (isSidebarExpanded) {
        classes.push("expanded");
      } else {
        classes.push("collapsed");
      }
    }

    return classes.join(" ");
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobile && mobileToggle && (
        <div
          className="sidebar-backdrop mobile-open"
          onClick={() => setMobileToggle(false)}
        />
      )}

      <div className="sidebar-container">
        <div id="sidebar" className={getSidebarClasses()}>
          <div className="sidebar-layout">
            <div className="sidebar-header">
              <div className="sidebar-header-content">
                {/* Desktop Collapsed State: Small logo with navigation button */}
                {!isMobile && !isSidebarExpanded && (
                  <div className="collapsed-header">
                    <div className="logo-section">
                      <img
                        src={smallLogo}
                        alt=""
                        className="img-fluid sidebar-small-logo"
                      />
                    </div>
                    <div className="toggle-section">
                      <button
                        className="sidebar-toggle-btn"
                        onClick={toggleSidebar}
                      >
                        <img
                          src={rightArrow}
                          alt="Toggle Sidebar"
                          className="toggle-arrow collapsed"
                        />
                      </button>
                    </div>
                  </div>
                )}

                {/* Desktop Expanded State: Main logo with navigation button */}
                {!isMobile && isSidebarExpanded && (
                  <div className="expanded-header">
                    <div className="main-logo-section">
                      <img
                        src={sidebarlogo}
                        alt="Pathsdata"
                        className="img-fluid sidebar-logo"
                      />
                    </div>
                    <div className="toggle-section">
                      <button
                        className="sidebar-toggle-btn"
                        onClick={toggleSidebar}
                      >
                        <img
                          src={rightArrow}
                          alt="Toggle Sidebar"
                          className="toggle-arrow expanded"
                        />
                      </button>
                    </div>
                  </div>
                )}

                {/* Mobile State: Only show main logo with close button */}
                {isMobile && mobileToggle && (
                  <div className="expanded-header">
                    <div className="main-logo-section">
                      <img
                        src={sidebarlogo}
                        alt="Pathsdata"
                        className="img-fluid sidebar-logo"
                      />
                    </div>
                    <div className="toggle-section">
                      <button
                        className="sidebar-toggle-btn"
                        onClick={() => setMobileToggle(false)}
                      >
                        <i className="ri-close-line ri-xl" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <nav className="menu open-current-submenu">
              <ul>
                <li className="menu-item">
                  <NavLink
                    to={`/workspace/${workspaceId}/home`}
                    className={({ isActive }) =>
                      `menu-link d-flex align-items-center ${
                        isActive ? "active" : ""
                      }`
                    }
                    onClick={handleSidebarDismiss}
                  >
                    <span className="menu-icon">
                      <img src={dashboard} alt="Dashboard" />
                    </span>
                    {(isSidebarExpanded || isMobile) && (
                      <span className="menu-title">Dashboard</span>
                    )}
                  </NavLink>
                </li>

                <li className="menu-item">
                  <NavLink
                    to={`/workspace/${workspaceId}/cluster`}
                    className={({ isActive }) =>
                      `menu-link d-flex align-items-center ${
                        isActive ? "active" : ""
                      }`
                    }
                    onClick={handleSidebarDismiss}
                  >
                    <span className="menu-icon">
                      <img src={cluster} alt="Cluster" />
                    </span>
                    {(isSidebarExpanded || isMobile) && (
                      <span className="menu-title">Cluster</span>
                    )}
                  </NavLink>
                </li>

                <li className="menu-item">
                  <NavLink
                    to={`/workspace/${workspaceId}/cloude-resource`}
                    className={({ isActive }) =>
                      `menu-link d-flex align-items-center ${
                        isActive ? "active" : ""
                      }`
                    }
                    onClick={handleSidebarDismiss}
                  >
                    <span className="menu-icon">
                      <img src={cloud_resource} alt="Cloud Resource" />
                    </span>
                    {(isSidebarExpanded || isMobile) && (
                      <span className="menu-title">Cloud Resource</span>
                    )}
                  </NavLink>
                </li>

                <li className="menu-item">
                  <Link
                    className="d-flex align-items-center menu-link"
                    onClick={() => {
                      handleLogout();
                      handleSidebarDismiss();
                    }}
                  >
                    <span className="menu-icon">
                      <img src={logout} alt="Logout" />
                    </span>
                    {(isSidebarExpanded || isMobile) && (
                      <span className="menu-title">Logout</span>
                    )}
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkspaceSidebar;
