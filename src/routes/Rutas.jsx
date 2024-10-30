import React,{ useState, useEffect} from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Sidebar from '../components/Sidebar/Sidebar';
import Login from '../pages/Login/Login'
import Accommodations from '../pages/Accommodation/Accommodations'
import Reservations from '../pages/Reservations/Reservations'
import AccommodationDetails from '../pages/Accommodation/AccommodationDetails'
import AccommodationsForm from '../pages/Accommodation/AccommodationsForm'
import ReservationDetails from '../pages/Reservations/ReservationDetails'
import ReservationForm from '../pages/Reservations/ReservationForm'
import ReservationNew from '../pages/Reservations/ReservationNew';
import { Navigate } from 'react-router-dom';

export default function Rutas() {

  //Estados para verificar si el usuario está autenticado
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  //Actualizar en tiempo real la autenticación del usuario
  useEffect(() => {
    const token = sessionStorage.getItem('token_bookings');
    setIsAuthenticated(!!token);
    setLoading(false);
}, []);

//cuando se verifica el token, se evita la redirección al login 
if(loading){
  return <div>Cargando ... </div>
}

    return (
      <BrowserRouter>
        <Routes>
          {/* Ruta de Login sin el Sidebar */}
          <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          
          {/* Rutas protegidas que muestran el Sidebar*/}
          {isAuthenticated == true ? (
          <Route
          path="/*" 
          element={ 
            <div style={{ display: 'flex' }}>
              <Sidebar setIsAuthenticated={setIsAuthenticated}/>
              <div style={{ flex: 1, padding: '20px' }}>
                <Routes>
                  {/* Start Accommodations routes */}
                  <Route path="Accommodations" element={<Accommodations />} />
                  <Route path="Accommodation/:id" element={<AccommodationDetails />} />
                  <Route path="Accommodation-update/:id" element={<AccommodationsForm />} />
                  {/* End Accommodations routes */}

                  {/* Start Reservations routes */}
                  <Route path="reservations" element={<Reservations />} />
                  <Route path="reservation/:id" element={<ReservationDetails />} />
                  <Route path="reservation-update/:id" element={<ReservationForm />} />
                  <Route path="reservation-new" element={<ReservationNew />} />

                </Routes>
              </div>
            </div>
          }
        />
          ) : (<Route path="/*" element={<Navigate to="/" />} />)}
          
        </Routes>
      </BrowserRouter>
    );
  }