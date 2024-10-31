import React, { useEffect, useState } from "react";
import { createAccommodation, getAccommodations } from "../../services/accommodationServices";
import { PlusLg } from "react-bootstrap-icons";

import CustomCard from "./Card";
import AccommodationModal from "./AccommodationModal";

// import '.accommodations.css'
export default function Accommodations() {
  const [Accommodations, setAccommodations] = useState([]);
  //estado para verificar si el usuario esta autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  //metodo para obtener la respuesta de la api
  const fetchData = async () => {
    const response = await getAccommodations(); //si esto es un exito devolvera un arreglo de alojamientos
    setAccommodations(response);
  };

  const postData = async (newAcommodation) => {
    const response = await createAccommodation(newAcommodation)
    setAccommodations((prevAccommodations) => [...prevAccommodations, response.data])
    setModalOpen(false);
  }

  useEffect(() => {
    //validamos si el token existe
    const session_token = sessionStorage.getItem("token_bookings");
    if (session_token) {
      setIsAuthenticated(true);
      //va poder visualizar los alojamientos
      fetchData();
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <>
      <div className="w-auto d-flex justify-content-between">
        <h2>Accommodations</h2>
        <button className="d-flex align-items-center gap-2 px-3 rounded-4" onClick={() => setModalOpen(true)}>
          <PlusLg size={16} />
          Nuevo Alojamiento
        </button>
      </div>

      {/** validamos si la persona esta autenticada */}
      <div>
        {isAuthenticated ? (
          <>
            <div>
              {
                //mapeando los alojamientos
                Accommodations.map((item) => {
                  return (
                    <div key={item.id} className="mb-4 mt-4">
                      <CustomCard
                        key={item}
                        name={item.name}
                        direction={item.address}
                        description={item.description}
                        img={item.image}

                      />
                    </div>
                  );
                })
              }
            </div>
          </>
        ) : (
          <h2>No estas autorizado, inicia sesion</h2>
        )}
        <AccommodationModal 
        isOpen={isModalOpen} 
        onClose={() => setModalOpen(false)} 
         onSubmit={postData} 
        />
      </div>
    </>
  );
}
