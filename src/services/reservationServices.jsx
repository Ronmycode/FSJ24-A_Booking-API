import axios from "axios";

//obtenemos el token que se guarda en el sessionstorage
const token = sessionStorage.getItem('token_bookings')

const getReservations = async () => {
    try{

        const response = await axios.get("https://apibookingsaccomodations-production.up.railway.app/api/V1/bookings", {
            headers: {
                //agregamos el token para la autorizacion
                'Authorization': `Bearer ${token}`
            }
        });        
        return response.data;
    }catch(error){
        console.error("Error al obtener los alojamientos", error);
    }
}

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
        console.error("Error al crear la reservación", error);
        throw error;
    }
};

export { getReservations, createReservation }