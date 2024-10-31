import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PersonFill, HouseDoorFill, BoxArrowRight, GridFill, ChevronRight, ChevronLeft } from "react-bootstrap-icons";
import "./Sidebar.css";

const Sidebar = () => {
  const [isVisible, setIsVisible] = useState(true); // Estado para mostrar u ocultar el sidebar
  const [activeLink, setActiveLink] = useState("/accommodations"); // Estado para gestionar el enlace activo

  const toggleSidebar = () => {
    setIsVisible(!isVisible);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link); // Actualiza el enlace activo
  };

  return (
    <>
      {isVisible && (
        <aside className="sidebar pinned">
          <div className="sidebar-header">
            <GridFill className="sidebar-icon" />
            <h5>Control Panel</h5>
          </div>

          <hr className="divider" />

          <nav className="sidebar-links">
            <Link
              to="/accommodations"
              className={activeLink === "/accommodations" ? "active" : ""}
              onClick={() => handleLinkClick("/accommodations")}
            >
              <HouseDoorFill className="sidebar-icon" /> <span>Accommodations</span>
            </Link>
            <Link
              to="/reservations"
              className={activeLink === "/reservations" ? "active" : ""}
              onClick={() => handleLinkClick("/reservations")}
            >
              <PersonFill className="sidebar-icon" /> <span>Reservations</span>
            </Link>
          </nav>

          <hr className="divider" />

          <Link to="/logout" className="logout" onClick={() => handleLinkClick("/logout")}>
            <BoxArrowRight className="sidebar-icon" /> <span>Logout</span>
          </Link>
        </aside>
      )}

      {/* Botón para mostrar/ocultar el sidebar */}
      <button
        className={`sidebar-toggle ${isVisible ? "hide" : "show"}`}
        onClick={toggleSidebar}
        style={{ display: window.innerWidth <= 768 ? 'none' : 'block' }} // Ocultar en pantallas pequeñas
      >
        {isVisible ? <ChevronLeft className="toggle-icon" /> : <ChevronRight className="toggle-icon" />}
      </button>
    </>
  );
};

export default Sidebar;
