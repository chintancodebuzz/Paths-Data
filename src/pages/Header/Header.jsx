

import React from "react";
import { Link, useLocation } from "react-router-dom";
import notification1 from "../../assets/images/notification1.png";
import dummyuser from "../../assets/images/dummy-user.jpg";
import bottomarrow from "../../assets/images/bottom-arrow.png";
import sidebarlogo from "../../assets/images/home/logo.png"; // Add this import
import "./Header.css";

const Header = ({ mobileToggle, setMobileToggle, handleLogout }) => {
  const { pathname } = useLocation();

  return (
    <header className="admin-header nav navbar navbar-expand-xl navbar-light iq-navbar">
      <div className="d-flex justify-content-between navbar-inner">
        {/* Left Section - Welcome Text (Visible only on desktop) & Logo (Visible on mobile) */}
        <div className="header-left">
          <div className="welcome-section">
            <span className="second-view-title">Welcome to PATHSDATA!</span>
            <p className="second-view-desc">
              All the tools you need to manage your workspace, users and
              security in one place.
            </p>
          </div>
          {/* Mobile Logo - Hidden on desktop, visible on mobile */}
          <div className="mobile-logo">
            <img
              src={sidebarlogo}
              alt="Pathsdata"
              className="img-fluid"
            />
          </div>
        </div>

        {/* Right Section - Navigation Items */}
        <div className="header-right">
          {/* Profile Dropdown */}
          <div className="nav-item dropdown profile-item">
            <Link
              className="nav-link profile-link"
              href="#"
              id="profile-dropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src={dummyuser}
                className="profile-image"
                alt="User profile"
                loading="lazy"
              />
              <span className="profile-name">Jameson S.</span>
              <img src={bottomarrow} className="profile-arrow" alt="Dropdown arrow" />
            </Link>

            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="profile-dropdown"
            >
              <li>
                <button
                  className="dropdown-item"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>

          {/* Notification Icon */}
          <div className="nav-item notification-item">
            <div className="notification-icon">
              <img
                src={notification1}
                alt="Notifications"
                loading="lazy"
              />
            </div>
          </div>

          {/* Burger Menu Icon - Visible only on mobile/tablet */}
          <button
            id="btn-toggle"
            className="burger-menu-btn"
            onClick={() => setMobileToggle(!mobileToggle)}
          >
            <i className="ri-menu-line ri-xl" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;