import axios from "axios";

// Obtenemos el token que se guarda en sessionStorage
const token = sessionStorage.getItem('token_bookings');

// Obtener todas las reservaciones
const getReservations = async () => {
    try {
        const response = await axios.get("https://apibookingsaccomodations-production.up.railway.app/api/V1/bookings", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error al obtener las reservaciones:", error);
        throw error;
    }
};

// Crear nueva reservación
const createReservation = async (reservationData) => {
    try {
        const response = await axios.post(
            "https://apibookingsaccomodations-production.up.railway.app/api/V1/booking",
            reservationData,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error al crear la reservación:", error);
        throw error;
    }
};

// Actualizar reservación
const updateReservation = async (id, reservationData) => {
    try {
        const response = await axios.patch(
            `https://apibookingsaccomodations-production.up.railway.app/api/V1/status_booking/${id}`,
            reservationData,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error al actualizar la reservación:", error);
        throw error;
    }
};

export { getReservations, createReservation, updateReservation };
