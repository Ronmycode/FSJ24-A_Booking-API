import axios from "axios";

//obtenemos el token que se guarda en el sessionstorage
const token = sessionStorage.getItem('token_bookings')

const getAccommodations = async () => {
    try{

        const response = await axios.get("https://apibookingsaccomodations-production.up.railway.app/api/V1/accomodations", {
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

const createAccommodation = async (accommodationData) => {
    try {
        // Realizamos la solicitud POST
        const response = await axios.post("https://apibookingsaccomodations-production.up.railway.app/api/V1/accomodation", 
            accommodationData, 
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json' 
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error al crear el alojamiento", error);
    }
};

export { getAccommodations, createAccommodation }


