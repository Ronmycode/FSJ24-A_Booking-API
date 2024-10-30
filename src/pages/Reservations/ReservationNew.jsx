import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

export default function ReservationNew() {
  const [accommodation, setAccommodation] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar los datos de la reservacion
  };

  return (
    <div className="reservations-container">
      <h2>Create New Reservation</h2>
      <Form onSubmit={handleSubmit}>

      <Form.Group controlId="formAccommodation">
          <Form.Label>Accommodation</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter accommodation name"
            value={accommodation}
            onChange={(e) => setAccommodation(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formCustomerName">
          <Form.Label>Customer Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter customer's name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formCheckInDate">
          <Form.Label>Check-in Date</Form.Label>
          <Form.Control
            type="date"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formCheckOutDate">
          <Form.Label>Check-out Date</Form.Label>
          <Form.Control
            type="date"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Create Reservation
        </Button>
      </Form>
    </div>
  );
}
