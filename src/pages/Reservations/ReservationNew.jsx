import React, { useState, useEffect } from 'react';
import { Button, Form, Modal, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { createReservation } from '../../services/reservationServices';
import { getAccommodations } from '../../services/accommodationServices';
import { getUsers } from '../../services/loginServices';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import 'moment/locale/es';

moment.locale('es');

export default function ReservationNew() {
  const [booking, setBooking] = useState('');
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [totalAmount, setTotalAmount] = useState('');
  const [accommodationId, setAccommodationId] = useState('');
  const [userId, setUserId] = useState('');
  const [accommodationsList, setAccommodationsList] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        const data = await getAccommodations();
        setAccommodationsList(data);
      } catch (error) {
        setErrorMessage('Error al cargar los alojamientos');
      }
    };
    
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsersList(data); 
      } catch (error) {
        setErrorMessage('Error al cargar los usuarios');
      }
    };

    fetchAccommodations();
    fetchUsers();
  }, []);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault();
    setErrorMessage('');


    
    // Validar que el ID de usuario exista en la lista obtenida
    const validUser = usersList.some(user => user.id === parseInt(userId));
    if (!validUser) {
      setErrorMessage('El ID de usuario no es válido.');
      return;
    }

        // Validar que el ID de alojamiento exista en la lista obtenida
    const validAccommodation = accommodationsList.some(accom => accom.id === parseInt(accommodationId));
    if (!validAccommodation) {
      setErrorMessage('El ID de alojamiento no es válido.');
      return;
    }

    // Validar que la fecha de fin no sea menor que la fecha de inicio
    if (checkOutDate < checkInDate) {
      setErrorMessage('La fecha de fin no puede ser menor que la fecha de inicio.');
      return;
    }

    // Validar que la fecha de inicio no sea menor a la fecha actual
    if (checkInDate < new Date()) {
      setErrorMessage('La fecha de inicio no puede ser menor que la fecha actual.');
      return;
    }

    // Lógica para enviar los datos de la reservación
    const reservationData = {
      booking,
      check_in_date: moment(checkInDate).format('YYYY-MM-DD'),
      check_out_date: moment(checkOutDate).format('YYYY-MM-DD'),
      total_amount: parseFloat(totalAmount),
      accomodation_id: parseInt(accommodationId),
      user_id: parseInt(userId),
    };

    try {
      await createReservation(reservationData);
      setShowSuccessMessage(true); 
      setTimeout(() => {
        setShowSuccessMessage(false);
        navigate('/reservations'); 
      }, 3000);
    } catch (error) {
      setErrorMessage('Hubo un error al crear la reservación.');
    }
  };

  return (
    <Modal show={true} onHide={() => navigate('/reservations')} centered>
      <Modal.Header closeButton>
        <Modal.Title>Nueva Reservación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {showSuccessMessage && (
          <Alert variant="success" className="mt-3">
            <Alert.Heading>¡Reservación creada con éxito!</Alert.Heading>
            <p>La reservación se ha guardado correctamente y los datos han sido procesados.</p>
          </Alert>
        )}
        {errorMessage && (
          <Alert variant="danger" className="mb-3">
            {errorMessage}
          </Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBooking" className="mb-3">
            <Form.Label>Código de Reserva</Form.Label>
            <Form.Control
              type="text"
              placeholder="Código de reserva (e.g., BK123456)"
              value={booking}
              onChange={(e) => setBooking(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formTotalAmount" className="mb-3">
            <Form.Label>Monto Total</Form.Label>
            <Form.Control
              type="number"
              placeholder="Monto total"
              value={totalAmount}
              onChange={(e) => setTotalAmount(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formUserId" className="mb-3">
            <Form.Label>Usuario</Form.Label>
            <Form.Select
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            >
              <option value="">Seleccionar usuario</option>
              {usersList.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} 
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="formAccommodationId" className="mb-3">
            <Form.Label>Alojamiento</Form.Label>
            <Form.Select
              value={accommodationId}
              onChange={(e) => setAccommodationId(e.target.value)}
              required
            >
              <option value="">Seleccionar Alojamiento</option>
              {accommodationsList.map((accom) => (
                <option key={accom.id} value={accom.id}>
                  {accom.name} 
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Row>
            <Col>
              <Form.Group controlId="formCheckInDate" className="mb-3">
                <Form.Label>Fecha de Inicio</Form.Label>
                <DatePicker
                  selected={checkInDate}
                  onChange={(date) => setCheckInDate(date)}
                  dateFormat="dd/MM/yyyy"
                  className="form-control"
                  placeholderText="Seleccionar fecha"
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formCheckOutDate" className="mb-3">
                <Form.Label>Fecha de Fin</Form.Label>
                <DatePicker
                  selected={checkOutDate}
                  onChange={(date) => setCheckOutDate(date)}
                  dateFormat="dd/MM/yyyy"
                  className="form-control"
                  placeholderText="Seleccionar fecha"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex justify-content-between">
            <Button variant="secondary" type="button" onClick={() => navigate('/reservations')}>
              Cancelar
            </Button>
            <Button variant="dark" type="submit">
              Guardar
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}