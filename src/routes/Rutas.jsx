import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Sidebar from '../components/Sidebar/Sidebar';
import Login from '../pages/Login/Login'
import Accommodations from '../pages/Accommodation/Accommodations'
import Reservations from '../pages/Reservations/Reservations'
import ReservationDetails from '../pages/Reservations/ReservationDetails'
import ReservationForm from '../pages/Reservations/ReservationForm'
import ReservationNew from '../pages/Reservations/ReservationNew';
=======
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Login from "../pages/Login/Login";
import Accommodations from "../pages/Accommodation/Accommodations";
import Reservations from "../pages/Reservations/Reservations";
import AccommodationDetails from "../pages/Accommodation/AccommodationDetails";
import AccommodationsForm from "../pages/Accommodation/AccommodationsForm";
import ReservationForm from "../pages/Reservations/ReservationForm";
import ReservationNew from "../pages/Reservations/ReservationNew";
import ReservationDetails from "../pages/Reservations/ReservationDetails";

export default function Rutas() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta de Login sin el Sidebar */}
        <Route path="/" element={<Login />} />

                </div>
                <div className='col-10'>
                  <Routes>
                    {/* Start Accommodations routes */}
                    <Route path="Accommodations" element={<Accommodations />} />
                    <Route path="addAccommodation" element={''} />
                    <Route path="Accommodation-update/:id" element={''} />
                    {/* End Accommodations routes */}
  
                    {/* Start Reservations routes */}
                    <Route path="reservations" element={<Reservations />} />
                    <Route path="reservation/:id" element={<ReservationDetails />} />
                    <Route path="reservation-update/:id" element={<ReservationForm />} />
                    <Route path="reservation-new" element={<ReservationNew />} />
=======
        {/* Rutas protegidas que muestran el Sidebar */}
        <Route
          path="/*"
          element={
            <div className="d-flex flex-row">
              <div className="col-2">
                <Sidebar />
              </div>
              <div className="col-10">
                <Routes>
                  {/* Start Accommodations routes */}
                  <Route path="Accommodations" element={<Accommodations />} />
                  <Route
                    path="Accommodation/:id"
                    element={<AccommodationDetails />}
                  />
                  <Route
                    path="Accommodation-update/:id"
                    element={<AccommodationsForm />}
                  />
                  {/* End Accommodations routes */}

                  {/* Start Reservations routes */}
                  <Route path="reservations" element={<Reservations />} />
                  <Route
                    path="ReservationDetails/:id"
                    element={<ReservationDetails />}
                  />
                  <Route
                    path="reservation-update/:id"
                    element={<ReservationForm />}
                  />
                  <Route path="reservation-new" element={<ReservationNew />} />
                </Routes>
              </div>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
