import axios from "axios";

//get token


// get accommodation
const getAccommodations = async () => {
    try{
     const response = await axios.get("https://apibookingsaccomodations-production.up.railway.app/api/V1/accomodations", {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token_bookings')}`
           
            }
        });   
        
        return response.data;
      
    }catch(error){
        console.error("Error al obtener los alojamientos", error);
    }
}

const getAccommodationById = async (id) => {
    try {
        const response = await axios.get(`https://apibookingsaccomodations-production.up.railway.app/api/V1/accomodation/${id}`, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token_bookings')}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error al obtener alojamiento por ID", error);
        throw error;
    }
};

// Create Accommodation
const createAccommodation = async (accommodationData) => {
    try {
        const response = await axios.post("https://apibookingsaccomodations-production.up.railway.app/api/V1/accomodation", 
            accommodationData, 
            {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token_bookings')}`,
                    'Content-Type': 'application/json' 
                }
            }
        );
      

        return response.data;
    } catch (error) {
        console.error("Error al crear el alojamiento", error);
        throw error; 
    }
};

const updateAccommodation = async (id, accommodationData) => {
    try{
        const response = await  axios.put(`https://apibookingsaccomodations-production.up.railway.app/api/V1/accomodation/${id}`,
         accommodationData,
        { headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token_bookings')}`,
            'Content-Type': 'application/json' 
         }
        }
        )
        return response.data

    }catch(error){
        console.error("Error al crear el alojamiento", error);
        throw error; 
    }

}




export { getAccommodations, getAccommodationById, createAccommodation, updateAccommodation }


