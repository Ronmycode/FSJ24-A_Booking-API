import axios from "axios";
import toastr from "toastr";
import { useNavigate } from 'react-router-dom';


//metodo para iniciar sesion
const login = async (user) => {
    try{
        //axios => es una libreria donde podemos hacer peticiones HTTP
        /**
         * Peticiones HTTP: GET, POST, PUT, DELETE, PATCH
         */
        const response = await axios.post("https://apibookingsAccomodations-production.up.railway.app/api/V1/login", user);
        return response.data;
    }catch(error){
        console.error("Error al autenticarse", error);
    }
}



export { login }