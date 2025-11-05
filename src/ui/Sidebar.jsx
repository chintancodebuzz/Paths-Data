import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import setting from "../assets/images/sidebar/setting.png";
import logout from "../assets/images/sidebar/logout.png";
import "./Sidebar.css";
import sidebarlogo from "../assets/images/home/logo.png";
import smallLogo from "../assets/images/sidebar/logo.png";
import dashboard from "../assets/images/sidebar/dashboard.png";
import workspace from "../assets/images/sidebar/workspace.png";
import pie from "../assets/images/sidebar/pie.png";
import network from "../assets/images/sidebar/network.png";
import users from "../assets/images/sidebar/users.png";
import rightArrow from "../assets/images/nvigation_arrows/right-arrow.png";

const Sidebar = ({ mobileToggle, setMobileToggle, handleLogout, onExpandChange }) => {
  console.log("🚀 ~ Sidebar ~ mobileToggle:", mobileToggle)
  const { pathname } = useLocation();
  const openClodeOption = JSON.parse(localStorage.getItem("openCloudOption"));
  const openUser = JSON.parse(localStorage.getItem("openUser"));

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("");
  const [openMenu, setOpenMenu] = useState(null);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 991);

  // Menu structure with nested items
  const menuItems = [
    {
      id: "dashboard",
      name: "Dashboard",
      icon: dashboard,
      path:
        openClodeOption === true ||
          (openClodeOption === false && openUser === true)
          ? "/dashboard/home2"
          : "/dashboard/home",
      hasChildren: false,
    },
    {
      id: "workspace",
      name: "Workspace",
      icon: workspace,
      path: "/dashboard/workspace",
      hasChildren: false,
      activePaths: [
        "/dashboard/workspace",
        "/dashboard/workspace/add-workspace",
        "/dashboard/workspace/edit-workspace",
      ],
    },
    {
      id: "usage",
      name: "Usage",
      icon: pie,
      path: "/dashboard/usage",
      hasChildren: false,
    },
    {
      id: "users",
      name: "Users",
      icon: users,
      path: "/dashboard/users",
      hasChildren: false,
    },
    {
      id: "network",
      name: "Network",
      icon: network,
      path: "/dashboard/network",
      hasChildren: true,
      children: [
        {
          id: "vpc",
          name: "Network",
          path: "/dashboard/network",
          activePaths: ["/dashboard/network"],
        },
        {
          id: "resourcesIAM",
          name: "Cross Account IAM",
          path: "/dashboard/account-role",
          activePaths: [
            "/resourcesIAM",
            "/add-resourcesIAM",
            "/edit-resourcesIAM",
          ],
        },
      ],
    },
    {
      id: "settings",
      name: "Settings",
      icon: setting,
      path: "/dashboard/setting",
      hasChildren: false,
    },
  ];

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

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileToggle, setMobileToggle]);

  useEffect(() => {
    // Set active menu based on current path
    const cloudResourcePaths = [
      "/vpc",
      "/resourcesIAM",
      "/credential-configure",
      "/add-vpc",
      "/edit-vpc",
      "/add-resourcesIAM",
      "/edit-resourcesIAM",
      "/add-credential-configure",
      "/edit-credential-configure",
    ];
    const dataCatalogPaths = [
      "/data-catalog",
      "/create-data-source",
      "/additional",
      "/credential",
      "/table-details",
    ];

    if (cloudResourcePaths.some((path) => pathname.includes(path))) {
      setSelectedMenu("cloud-resource");
      setOpenMenu("cloud-resource");
    } else if (dataCatalogPaths.some((path) => pathname.includes(path))) {
      setSelectedMenu("data-catalog");
      setOpenMenu("data-catalog");
    }
  }, [pathname]);

  const handleSidebarDismiss = () => {
    if (isMobile) {
      setMobileToggle(false);
    }
    localStorage.setItem("openOrgFamily", false);
    localStorage.removeItem("org_id");
  };

  const toggleSidebar = () => {
    if (isMobile) {
      setMobileToggle(!mobileToggle);
    } else {
      setIsSidebarExpanded(!isSidebarExpanded);
      // Close all menus when collapsing sidebar
      if (isSidebarExpanded) {
        setOpenMenu(null);
        setOpenSubMenu(null);
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

  const toggleMenu = (menuId) => {
    if (openMenu === menuId) {
      setOpenMenu(null);
    } else {
      setOpenMenu(menuId);
    }
    localStorage.removeItem("org_id");
  };

  const toggleSubMenu = (menuId) => {
    setOpenSubMenu(openSubMenu === menuId ? null : menuId);
  };

  const isMenuItemActive = (item) => {
    if (item.activePaths) {
      return item.activePaths.some((path) => pathname.includes(path));
    }
    return pathname === item.path || pathname.startsWith(item.path);
  };

  const isChildActive = (children) => {
    return children.some((child) =>
      child.activePaths
        ? child.activePaths.some((path) => pathname.includes(path))
        : pathname === child.path
    );
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
                {menuItems.map((item) => (
                  <li
                    key={item.id}
                    className={`menu-item ${openMenu === item.id ? "open" : ""} ${(item.hasChildren && isChildActive(item.children)) ||
                        (!item.hasChildren && isMenuItemActive(item))
                        ? "active"
                        : ""
                      }`}
                  >
                    {item.hasChildren ? (
                      <>
                        <div
                          className={`menu-link d-flex align-items-center ${isChildActive(item.children) ? "active" : ""
                            }`}
                          onClick={() => toggleMenu(item.id)}
                        >
                          <span className="menu-icon">
                            <img src={item.icon} alt={item.name} />
                          </span>
                          {(isSidebarExpanded || isMobile) && (
                            <>
                              <span className="menu-title">{item.name}</span>
                              <span className="dropdown-arrow">
                                {openMenu === item.id ? "▼" : "▶"}
                              </span>
                            </>
                          )}
                        </div>

                        {(isSidebarExpanded || isMobile) && openMenu === item.id && (
                          <ul className="submenu">
                            {item.children.map((child) => (
                              <li key={child.id} className="menu-item">
                                <NavLink
                                  to={child.path}
                                  className={({ isActive }) =>
                                    `menu-link d-flex align-items-center ${isActive ||
                                      (child.activePaths &&
                                        child.activePaths.some((path) =>
                                          pathname.includes(path)
                                        ))
                                      ? "active"
                                      : ""
                                    }`
                                  }
                                  onClick={handleSidebarDismiss}
                                >
                                  <span className="menu-title">{child.name}</span>
                                </NavLink>
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    ) : (
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          `menu-link d-flex align-items-center ${isActive || isMenuItemActive(item) ? "active" : ""
                          }`
                        }
                        onClick={handleSidebarDismiss}
                      >
                        <span className="menu-icon">
                          <img src={item.icon} alt={item.name} />
                        </span>
                        {(isSidebarExpanded || isMobile) && (
                          <span className="menu-title">{item.name}</span>
                        )}
                      </NavLink>
                    )}
                  </li>
                ))}

                {/* Logout item */}
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

export default Sidebar;