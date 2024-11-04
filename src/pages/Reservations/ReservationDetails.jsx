import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Row, Col, Alert, Modal } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { getReservations, updateReservation } from '../../services/reservationServices';

function ReservationDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [reservation, setReservation] = useState(null);
    const [isCancelling, setIsCancelling] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    useEffect(() => {
        const fetchReservation = async () => {
            try {
                const data = await getReservations();
                const reservationDetails = data.find(res => res.id === parseInt(id));
                if (reservationDetails) {
                    setReservation(reservationDetails);
                } else {
                    console.error("Reservación no encontrada");
                }
            } catch (error) {
                console.error("Error al cargar los detalles de la reservación", error);
            }
        };

        fetchReservation();
    }, [id]);

    const handleCancelReservation = async () => {
        setIsCancelling(true);
        try {
            await updateReservation(id, { status: 'CANCELLED' });
            setShowSuccessAlert(true);
            setTimeout(() => {
                setShowSuccessAlert(false);
                navigate('/reservations');
            }, 3000);
        } catch (error) {
            console.error("Error al cancelar la reservación", error);
            alert('No se pudo cancelar la reservación');
        } finally {
            setIsCancelling(false);
            setShowConfirmModal(false);
        }
    };

    const handleShowConfirmModal = () => {
        setShowConfirmModal(true);
    };

    const handleCloseConfirmModal = () => {
        setShowConfirmModal(false);
    };

    const handleClose = () => {
        navigate('/reservations');
    };

    if (!reservation) {
        return <div>Cargando...</div>;
    }

    const checkInDate = new Date(reservation.check_in_date + 'T00:00:00');
    const checkOutDate = new Date(reservation.check_out_date + 'T00:00:00');
    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));

    return (
        <Container className="mt-3">
            {showSuccessAlert && (
                <Alert variant="success">
                    Reservación cancelada exitosamente.
                </Alert>
            )}

            <Card className="shadow">
                <Card.Body>
                    <Row className="mb-3">
                        <Col>
                            <h5>Detalles de la Reservación</h5>
                        </Col>
                        <Col className="text-end">
                            <span className={`badge ${reservation.status === 'CANCELLED' ? 'bg-danger' : 'bg-warning text-dark'}`}>
                                {reservation.status}
                            </span>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col>
                            <small className="text-muted">ID: {reservation.id}</small>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col>
                            <div>
                                <strong>Check-in</strong>
                                <p>{checkInDate.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            </div>
                        </Col>
                        <Col>
                            <div>
                                <strong>Check-out</strong>
                                <p>{checkOutDate.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            </div>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col>
                            <strong>Información del Huésped</strong>
                            <p className="text-muted">Usuario: {reservation.user}</p>
                            <p className="text-muted">Alojamiento: {reservation.accomodation}</p>
                            <p className="text-muted">Costo Total: ${reservation.total_amount}</p>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col className="bg-light p-2 rounded">
                            <strong>Resumen de la Estancia</strong>
                            <p className="text-primary">{nights} noches</p>
                        </Col>
                    </Row>

                    <Row className="justify-content-between mt-3">
                        <Col className="text-center">
                            <Button
                                variant="danger"
                                onClick={handleShowConfirmModal}
                                disabled={reservation.status === 'CANCELLED' || isCancelling}
                            >
                                {isCancelling ? 'Cancelando...' : 'Cancelar Reservación'}
                            </Button>
                        </Col>
                        <Col className="text-end">
                            <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            {/* Modal de confirmación */}
            <Modal show={showConfirmModal} onHide={handleCloseConfirmModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Cancelación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro de que deseas cancelar esta reservación?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseConfirmModal}>
                        No
                    </Button>
                    <Button variant="danger" onClick={handleCancelReservation}>
                        Sí, cancelar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default ReservationDetails;
