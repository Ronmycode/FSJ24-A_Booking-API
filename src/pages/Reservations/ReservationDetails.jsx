import React from 'react';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function ReservationDetails() {
    const navigate = useNavigate();

    const handleClose = () => {
        navigate('/reservations'); // Redirige a la pantalla Reservations.jsx
    };

    return (
        <Container className="mt-3">
            <Card className="shadow">
                <Card.Body>
                    <Row className="mb-3">
                        <Col>
                            <h5>Detalles de la Reservación</h5>
                        </Col>
                        <Col className="text-end">
                            <span className="badge bg-warning text-dark">Pendiente</span>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col>
                            <small className="text-muted">ID: #N/A</small>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col>
                            <h6>Sin nombre</h6>
                            <p className="text-muted">Dirección no disponible</p>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col className="bg-light" style={{ height: '150px' }}>
                            {/* Aquí puedes integrar un mapa usando una API como Google Maps */}
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col>
                            <div>
                                <strong>Check-in</strong>
                                <p>Jueves, 24 de octubre de 2024</p>
                            </div>
                        </Col>
                        <Col>
                            <div>
                                <strong>Check-out</strong>
                                <p>Jueves, 24 de octubre de 2024</p>
                            </div>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col>
                            <strong>Información del Huésped</strong>
                            <p className="text-muted">Huésped no especificado</p>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col className="bg-light p-2 rounded">
                            <strong>Resumen de la Estancia</strong>
                            <p className="text-primary">0 noches</p>
                        </Col>
                    </Row>

                    <Row className="justify-content-between mt-3">
                        <Col className="text-center">
                            <Button variant="danger">Cancelar Reservación</Button>
                        </Col>
                        <Col className="text-end">
                            <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default ReservationDetails;