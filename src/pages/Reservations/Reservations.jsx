import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getReservations } from '../../services/reservationServices';
import { getAccommodations } from '../../services/accommodationServices';
import { Button, Form, InputGroup, Row, Col } from 'react-bootstrap';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import moment from 'moment';
import toastr from 'toastr';
import './Reservations.css';

export default function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [accommodations, setAccommodations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('All states');
  const [selectedAccommodation, setSelectedAccommodation] = useState('All accommodations');
  const [searchUser, setSearchUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const session_token = sessionStorage.getItem('token_bookings');
    if (session_token) {
      fetchReservations();
      fetchAccommodations();
    }
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await getReservations();
      setReservations(response);
      setFilteredReservations(response);
    } catch (error) {
      toastr.error('Error al cargar las reservaciones.');
    }
  };

  const fetchAccommodations = async () => {
    try {
      const response = await getAccommodations();
      setAccommodations(response);
    } catch (error) {
      toastr.error('Error al cargar los alojamientos.');
    }
  };

  const handleFilters = () => {
    let filtered = reservations;
    if (selectedStatus !== 'All states') {
      filtered = filtered.filter(
        reservation => reservation.status === selectedStatus.toUpperCase()
      );
    }
    if (selectedAccommodation !== 'All accommodations') {
      filtered = filtered.filter(
        reservation => reservation.accommodation === selectedAccommodation
      );
    }
    if (searchUser) {
      filtered = filtered.filter(
        reservation => reservation.user.toLowerCase().includes(searchUser.toLowerCase())
      );
    }
    setFilteredReservations(filtered);
  };

  useEffect(() => {
    handleFilters();
  }, [selectedStatus, selectedAccommodation, searchUser, reservations]);

  const handleEventClick = (info) => {
    navigate(`/reservation/${info.event.id}`);
  };

  const handleNewReservation = () => {
    navigate('/reservation-new');
  };

  return (
    <div className="reservations-container">
      <div className="header d-flex justify-content-between align-items-center mb-4">
        <h1>Reservations</h1>
        <Button variant="dark" onClick={handleNewReservation}>
          +
          <Col className="d-none d-md-inline"> Create new reservation</Col>
        </Button>
      </div>

      <Row className="mb-3 justify-content-center">
        <Col xs={12} md={3}>
          <Form.Select value={selectedStatus} onChange={e => setSelectedStatus(e.target.value)}>
            <option>All states</option>
            <option>CONFIRMED</option>
            <option>PENDING</option>
            <option>CANCELLED</option>
          </Form.Select>
        </Col>
        <Col xs={12} md={3}>
          <Form.Select value={selectedAccommodation} onChange={e => setSelectedAccommodation(e.target.value)}>
            <option>All accommodations</option>
            {accommodations.map(accommodation => (
              <option key={accommodation.id} value={accommodation.name}>
                {accommodation.name}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col xs={12} md={3}>
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

      <div className="calendar-responsive">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={filteredReservations.map(reservation => ({
            id: reservation.id,
            title: `${reservation.user} - ${reservation.accomodation}`, // Usar <br/> para saltos de línea
            start: reservation.check_in_date,
            end: moment(reservation.check_out_date).add(1, 'days').format('YYYY-MM-DD'), // Ajuste para mostrar el último día completo
            color: reservation.status === 'CANCELLED' ? '#ff8b94' :
                  reservation.status === 'PENDING' ? '#ffdd95' :
                  '#a8e6cf',
            textColor: 'white'
          }))}
          eventClick={handleEventClick}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek,dayGridDay'
          }}
          height="auto"
          contentHeight="auto"
          aspectRatio={1.35}
          eventDisplay="block"
          eventDidMount={(info) => {
            // Usar el DOM para agregar estilo y saltos de línea
            info.el.style.whiteSpace = 'normal'; // Asegurarse que el texto se muestre en varias líneas
          }}
        />
      </div>
    </div>
  );
}

