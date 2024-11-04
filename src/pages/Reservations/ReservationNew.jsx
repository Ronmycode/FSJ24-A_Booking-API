import React, { useState } from 'react';
import { Button, Form, Modal, InputGroup, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { createReservation } from '../../services/reservationServices';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import 'moment/locale/es';

moment.locale('es');

export default function ReservationNew() {
  const [accommodation, setAccommodation] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [errorMessage, setErrorMessage] = useState(''); 
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    setErrorMessage('');

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

    // Validar que la diferencia entre la fecha de inicio y la fecha de fin no sea mayor a un mes
    const oneMonthLater = new Date(checkInDate);
    oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);
    if (checkOutDate > oneMonthLater) {
      setErrorMessage('La fecha de fin no debe tener más de un mes de diferencia con respecto a la fecha de inicio.');
      return;
    }

    // Lógica para enviar los datos de la reservación
    const reservationData = {
      accommodation,
      customerName,
      checkInDate: moment(checkInDate).format('DD/MM/YYYY'),
      checkOutDate: moment(checkOutDate).format('DD/MM/YYYY'),
    };

    try {
      await createReservation(reservationData);
      alert('Reservación creada con éxito.');
      navigate('/reservations');
    } catch (error) {
      alert('Hubo un error al crear la reservación.');
    }
  };

  const handleClose = () => {
    navigate('/reservations'); 
  };

  return (
    <Modal show={true} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Nueva Reservación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorMessage && (
          <Alert variant="danger" className="mb-3">
            {errorMessage}
          </Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formAccommodation" className="mb-3">
            <Form.Label>Alojamiento</Form.Label>
            <Form.Select
              value={accommodation}
              onChange={(e) => setAccommodation(e.target.value)}
              required
            >
              <option value="">Seleccionar alojamiento</option>
              <option value="Apartamento Centro">Apartamento Centro</option>
              <option value="Casa de Campo">Casa de Campo</option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="formCustomerName" className="mb-3">
            <Form.Label>Huésped</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre del huésped"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              maxLength={50}
              required
            />
          </Form.Group>

          <Row>
            <Col>
              <Form.Group controlId="formCheckInDate" className="mb-3">
                <Form.Label>Fecha de inicio</Form.Label>
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
                <Form.Label>Fecha de fin</Form.Label>
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
            <Button variant="secondary" type="button" onClick={handleClose}>
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