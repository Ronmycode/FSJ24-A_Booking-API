import React, { useEffect, useState } from 'react'
import { getAccommodations } from '../../services/accommodationServices'
import { PlusLg } from 'react-bootstrap-icons'

import CustomCard from './Card'

// import '.accommodations.css'
export default function Accommodations() {
    const [Accommodations, setAccommodations] = useState([])
    //estado para verificar si el usuario esta autenticado
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    //metodo para obtener la respuesta de la api
    const fetchData = async () => {
        const response = await getAccommodations() //si esto es un exito devolvera un arreglo de alojamientos
        setAccommodations(response);
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
       <>
        <div className="w-100 d-flex justify-content-between">
            <h2>Accommodations</h2>
            <button className='d-flex align-items-center gap-2 px-3 rounded-4'>
            <PlusLg size={16} />
             Nuevo Alojamiento 
            </button>
         </div>
        
            {/** validamos si la persona esta autenticada */}
            <div className='pt-4'>
            {
                isAuthenticated ? (
                    <>
                        <div>
                            {/* {
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
                            } */}
                            <CustomCard />
                        </div>
                    </>
                ) : <h2>No estas autorizado, inicia sesion</h2>
            }

            </div>
       </>

    )
}
