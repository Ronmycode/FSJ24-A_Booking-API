
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useDropzone } from 'react-dropzone';
import './Accommodations.css'

const AccommodationModal = ({ isOpen, onClose, onSubmit, initialData = {} }) => {
  const { register, handleSubmit,reset,  formState: { errors } } = useForm();
  const [selectedImage, setSelectedImage] = React.useState({ defaultValues: {
    name: '',
    address: '',
    description: ''
  }});
  

  // Configuración de react-dropzone
  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] },
    maxSize: 10 * 1024 * 1024, // 10 MB
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setSelectedImage(Object.assign(file, {
          preview: URL.createObjectURL(file)
        }));
      }
    }
  });
  useEffect(() => {
    if (initialData) {
      // Rellena el formulario con los datos de `initialData`
      reset({
        name: initialData.name || '',
        address: initialData.address || '',
        description: initialData.description || ''
      });
      setSelectedImage(initialData.image ? { preview: initialData.image } : null);
    } else {
      reset(); // Limpia el formulario si no hay `initialData`
      setSelectedImage(null);
    }
  }, [initialData, reset]);
  const handleClose = () => {
    reset({
      name: '',
      address: '',
      description: ''
    });
    setSelectedImage(null);
    onClose();
  };

  if (!isOpen) return null; // No renderizar si isOpen es false

  // Función que maneja el envío del formulario
  const handleFormSubmit = (data) => {
    onSubmit({...data, image: selectedImage, id: initialData.id,  }); // Enviar datos y la imagen al componente padre
    // console.log(data);
    onClose(); 
  };
  return (
    <>
     <div className="modal-backdrop fade show"></div>
      <div className="modal show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-start">Nuevo Alojamiento</h5>
            <button type="button" className="btn-close" aria-label="Close" 
            onClick={handleClose}></button>
          </div>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="modal-body text-start">
              <div className="mb-3">
                <label htmlFor="name" className="form-label ">
                 Nombre
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  id="name"
                  {...register('name', { required: 'Name is required' })}
                />
                {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
              </div>

              <div className="mb-3">
                <label htmlFor="address" className="form-label text-start">
                  Direccion 
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                  id="address"
                  {...register('address', { required: 'Address is required' })}
                />
                {errors.direction && <div className="invalid-feedback">{errors.address.message}</div>}
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label text-start">
                  Descripcion
                </label>
                <textarea
                  className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                  id="description"
                  rows="3"
                  {...register('description', { required: 'Description is required' })}
                />
                {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
              </div>
                {/* Área de arrastrar y soltar */}
                <div {...getRootProps()} 
                className="border border-dashed rounded p-4 text-center dropzone" 
                >
                  <input {...getInputProps()} />
                  {selectedImage ? (
                    <img src={selectedImage.preview} alt="Preview" className="img-fluid mt-3" style={{ maxHeight: '200px' }} />
                  ) : (
                    <p className="text-muted">
                      <strong>Subir una imagen o arrastra y suelta</strong><br />
                      PNG, JPG, GIF hasta 10MB
                    </p>
                  )}
                </div>
             
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline" onClick={handleClose}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-dark">
                <i className="bi bi-send-fill"></i> Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
   
  
  );
};

export default AccommodationModal;
