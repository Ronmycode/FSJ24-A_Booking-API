import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getReservations } from '../../services/reservationServices';
import { getAccommodations } from '../../services/accommodationServices';
import { Button, Dropdown, Form, InputGroup, Row, Col } from 'react-bootstrap';
import 'react-calendar/dist/Calendar.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import toastr from 'toastr';
import './Reservations.css';

const localizer = momentLocalizer(moment);

export default function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [accommodations, setAccommodations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('All states');
  const [selectedAccommodation, setSelectedAccommodation] = useState('All accommodations');
  const [searchUser, setSearchUser] = useState('');
  const navigate = useNavigate();

  // Método para obtener la lista de reservaciones
  const fetchReservations = async () => {
    try {
      const response = await getReservations();
      setReservations(response);
      setFilteredReservations(response); // Inicialmente, todos los datos sin filtrar
    } catch (error) {
      toastr.error('Error al cargar las reservaciones.');
    }
  };

  // Método para obtener la lista de alojamientos
  const fetchAccommodations = async () => {
    try {
      const response = await getAccommodations();
      setAccommodations(response);
    } catch (error) {
      toastr.error('Error al cargar los alojamientos.');
    }
  };

  // Efecto para autenticar al usuario y cargar los datos iniciales
  useEffect(() => {
    const session_token = sessionStorage.getItem('token_bookings');
    if (session_token) {
      fetchReservations();
      fetchAccommodations();
    }
  }, []);

  // Función para manejar los filtros
  const handleFilters = () => {
    let filtered = reservations;

    if (selectedStatus !== 'All states') {
      filtered = filtered.filter(
        reservation => reservation.status === selectedStatus.toUpperCase()
      );
    }

    if (selectedAccommodation !== 'All accommodations') {
      filtered = filtered.filter(
        reservation => reservation.accomodation === selectedAccommodation
      );
    }

    if (searchUser) {
      filtered = filtered.filter(
        reservation => reservation.user.toLowerCase().includes(searchUser.toLowerCase())
      );
    }

    setFilteredReservations(filtered);
  };

  // Efecto para aplicar los filtros cada vez que cambian
  useEffect(() => {
    handleFilters();
  }, [selectedStatus, selectedAccommodation, searchUser, reservations]);

  // Manejar la selección de una reserva
  const handleReservationClick = (reservation) => {
    navigate(`/reservation/${reservation.id}`);
  };

  // Manejar la creación de una nueva reserva
  const handleNewReservation = () => {
    navigate('/reservation-new');
  };

  // Función para obtener el estilo del evento basado en su estado
  const eventStyleGetter = (event) => {
    let backgroundColor;
    switch (event.status) {
      case 'CANCELLED':
        backgroundColor = 'red';
        break;
      case 'PENDING':
        backgroundColor = 'yellow';
        break;
      case 'CONFIRMED':
      default:
        backgroundColor = 'green';
        break;
    }
    return {
      style: {
        backgroundColor,
        color: 'white',
        borderRadius: '5px',
        border: 'none',
      },
    };
  };

  return (
    <div className="reservations-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Reservations</h1>
        <Button variant="dark" onClick={handleNewReservation}>+ Create new reservation</Button>
      </div>

      <Row className="mb-3">
        <Col xs={3}>
          <Form.Select
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.target.value)}
          >
            <option>All states</option>
            <option>CONFIRMED</option>
            <option>PENDING</option>
            <option>CANCELLED</option>
          </Form.Select>
        </Col>
        <Col xs={3}>
          <Form.Select
            value={selectedAccommodation}
            onChange={e => setSelectedAccommodation(e.target.value)}
          >
            <option>All accommodations</option>
            {accommodations.map(accommodation => (
              <option key={accommodation.id} value={accommodation.name}>
                {accommodation.name}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col xs={6}>
          <InputGroup>
            <InputGroup.Text>Find customer</InputGroup.Text>
            <Form.Control
              placeholder="Customer's name"
              value={searchUser}
              onChange={e => setSearchUser(e.target.value)}
            />
          </InputGroup>
        </Col>
      </Row>

      <div className="calendar-container">
        <Calendar
          localizer={localizer}
          events={filteredReservations.map(reservation => ({
            id: reservation.id,
            title: reservation.user,
            start: new Date(reservation.check_in_date + 'T00:00:00'), // Ajuste para que las fechas sean exactas
            end: new Date(reservation.check_out_date + 'T00:00:00'), // Ajuste para que las fechas sean exactas
            allDay: true,
            status: reservation.status, // Añadir el estado para el estilo
          }))}
          style={{ width: "70rem", height:"40rem", margin: "5px" }}
          onSelectEvent={handleReservationClick}
          eventPropGetter={eventStyleGetter} // Aplicar el estilo basado en el estado
        />
      </div>
    </div>
  );
}
