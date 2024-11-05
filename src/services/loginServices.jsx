import axios from "axios";

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

const logout = () => {
    console.log("Has cerrado sesion");
}

//metodo para obteber usuarios
const getUsers = async () => {
    try {
      const response = await axios.get("https://apibookingsAccomodations-production.up.railway.app/api/V1/users");
      return response.data; // Ajusta esto según la estructura de la respuesta de tu API
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
      throw error;
    }
  };
  
export { login, logout, getUsers}