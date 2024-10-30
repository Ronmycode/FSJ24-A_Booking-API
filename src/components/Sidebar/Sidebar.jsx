// src/components/Sidebar/Sidebar.jsx

import React from "react";
import { Link } from "react-router-dom";
import { PersonFill, HouseDoorFill, BoxArrowRight, GridFill } from "react-bootstrap-icons";
import "./Sidebar.css";


const Sidebar = ({ setIsAuthenticated}) => {

  //logout
  const handleLogout = () =>{
    sessionStorage.removeItem('token_bookings');
    setIsAuthenticated(false);
  }
  return (
    <aside>
      <div className="sidebar-header">
        <GridFill className="sidebar-icon" />
        <h5>Control Panel</h5>
      </div>
      
      <hr className="divider" />
      
      <nav className="sidebar-links">
        <Link to="/accommodations">
          <HouseDoorFill /> Accommodations
        </Link>
        <Link to="/reservations">
          <PersonFill /> Reservations
        </Link>
      </nav>

      <hr className="divider" />
      
      <div className="logout" onClick={()=>handleLogout()}>
        <BoxArrowRight /> Logout
      </div>
    </aside>
  );
  toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-bottom-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }
};

export default Sidebar;
