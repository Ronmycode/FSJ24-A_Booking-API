import React, { useEffect, useState } from 'react'
import { getAccommodations } from '../../services/accommodationServices'

export default function Accommodations() {
    const [Accommodations, setAccommodations] = useState([])
    //estado para verificar si el usuario esta autenticado
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    //metodo para obtener la respuesta de la api
    const fetchData = async () => {

        const response = await getAccommodations() //si esto es un exito devolvera un arreglo de alojamientos
        setAccommodations(response || []);
    }

    useEffect(() => {
        //validamos si el token existe
        const session_token = sessionStorage.getItem('token_bookings');
        if(session_token){
            setIsAuthenticated(true)
            //va poder visualizar los alojamientos
            fetchData()
        }else{
            setIsAuthenticated(false)
        }

    }, [])

    return (
        <div>
            {/** validamos si la persona esta autenticada */}
            {
                isAuthenticated ? (
                    <>
                        <h1>Accommodations List</h1>
                        <div>
                            {
                                //mapeando los alojamientos
                                Accommodations.map((item) => {
                                    return (
                                        <div key={item.id}>
                                            <h3>{item.name}</h3>
                                            <img src={item.image} alt="" />
                                            <p>Direccion: {item.address}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </>
                ) : <h2>No estas autorizado, inicia sesion</h2>
            }
        </div>
    )
}
