import axios from "axios";

//obtenemos el token que se guarda en el sessionstorage
const token = sessionStorage.getItem('token_bookings')

const getAccomodations = async () => {
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

export { getAccomodations }