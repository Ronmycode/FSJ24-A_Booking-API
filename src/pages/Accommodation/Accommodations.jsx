import React, { useEffect, useState } from "react";
import { createAccommodation, getAccommodations, updateAccommodation } from "../../services/accommodationServices";
import { PlusLg } from "react-bootstrap-icons";

import CustomCard from "./Card";
import AccommodationModal from "./AccommodationModal";

// import '.accommodations.css'
export default function Accommodations() {
  const [accommodations, setAccommodations] = useState([]);
  //estado para verificar si el usuario esta autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 
  const [isEditing, setIsEditing] = useState(false);
  const [editingAccommodationId, setEditingAccommodationId] = useState(null);
  const [editingAccommodationData, setEditingAccommodationData] = useState(null);


  //metodo para obtener la respuesta de la api
  const fetchData = async () => {
    try {
      const response = await getAccommodations();
      setAccommodations(response);
    } catch (error) {
      console.error("Error al cargar alojamientos:", error);
    } finally {
      setIsLoading(false); // Cambia el estado de carga
    }
  };

  const postData = async (newAcommodation) => {
    try {
      const response = await createAccommodation(newAcommodation);
      console.log('pintar en el principal', response);
      
    } catch (error) {
      console.error("Error al crear la acomodación:", error);
    } finally {
      setModalOpen(false); // Cierra el modal
      await fetchData();
    }
  };
  const handleEdit = (item) => {
    setIsEditing(true);
    setEditingAccommodationData(item); // Pasa los datos actuales al modal
    setModalOpen(true);
    console.log('editing..',item)
  };

  const updateData = async (updateData) => {
    console.log('updateData', updateData);
    
    // Validar que se tenga el id y los datos necesarios
    if (!editingAccommodationData || !editingAccommodationData.id) {
      console.error("No se puede actualizar: ID de alojamiento no encontrado.");
      return; // Salir si no hay un ID
    }
  
    try {
      const response = await updateAccommodation(editingAccommodationData.id, updateData);
      console.log('Alojamiento actualizado:', response);
    } catch (error) {
      console.error("Error al actualizar el alojamiento:", error);
      // Aquí podrías mostrar un mensaje de error al usuario
    } finally {
      setModalOpen(false);
      setIsEditing(false);
      setEditingAccommodationData(null); 
      fetchData();
    }
  };
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
        <button className="d-flex align-items-center gap-2 px-3 rounded-2" onClick={() => setModalOpen(true)}>
          <PlusLg size={16} />
          Nuevo Alojamiento
        </button>
      </div>

      {/** validamos si la persona esta autenticada */}
      <div>
      {isLoading ? (
        <div>Cargando...</div>
      ) : isAuthenticated ? (
        <div>
          {accommodations.map((item) => (
            <div key={item.id} className="mb-4 mt-4">
              <CustomCard
                name={item.name}
                direction={item.address}
                description={item.description}
                img={item.image}
                handleEdit={()=> handleEdit(item)}
              />
            </div>
          ))}
        </div>
      ) : (
        <h2>No estás autorizado, inicia sesión</h2>
      )}
        <AccommodationModal 
        isOpen={isModalOpen} 
        onClose={() => setModalOpen(false)}    
        onSubmit={(data) => isEditing ? updateData(data) : postData(data)}
        initialData={isEditing ? editingAccommodationData : null}
        />
      </div>
    </>
  );
}
