import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useDropzone } from "react-dropzone";
import "./Accommodations.css";

const AccommodationModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = {},
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [selectedImage, setSelectedImage] = React.useState({
    defaultValues: {
      name: "",
      address: "",
      description: "",
    },
  });

  // Configuración de react-dropzone
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    maxSize: 10 * 1024 * 1024, // 10 MB
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setSelectedImage(
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
  });
  useEffect(() => {
    if (initialData) {
      //Fill the form with the data from `initialData`
      reset({
        name: initialData.name || "",
        address: initialData.address || "",
        description: initialData.description || "",
      });
      setSelectedImage(
        initialData.image ? { preview: initialData.image } : null
      );
    } else {
      reset(); // Clear the form if there is no `initialData`
      setSelectedImage(null);
    }
  }, [initialData, reset]);
  const handleClose = () => {
    reset({
      name: "",
      address: "",
      description: "",
    });
    setSelectedImage(null);
    onClose();
  };

  if (!isOpen) return null;

  // Function that handles form submission
  const handleFormSubmit = (data) => {
    onSubmit({ ...data, image: selectedImage });
    reset({
      name: "",
      address: "",
      description: "",
    });
  };
  return (
    <>
      <div className="modal-backdrop fade show"></div>
      <div className="modal show d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-start">Nuevo Alojamiento</h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={handleClose}
              ></button>
            </div>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <div className="modal-body text-start">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Nombre
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.name ? "is-invalid" : ""
                    }`}
                    id="name"
                    {...register("name", {
                      required: "Name is required",
                      maxLength: {
                        value: 100,
                        message:
                          "El nombre no puede tener más de 100 caracteres.",
                      },
                    })}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">
                      {errors.name.message}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="address" className="form-label text-start">
                    Dirección
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.address ? "is-invalid" : ""
                    }`}
                    id="address"
                    {...register("address", {
                      required: "Address is required",
                      maxLength: {
                        value: 100,
                        message:
                          "La dirección no puede tener más de 100 caracteres.",
                      },
                    })}
                  />
                  {errors.address && (
                    <div className="invalid-feedback">
                      {errors.address.message}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="description"
                    className="form-label text-start"
                  >
                    Descripción
                  </label>
                  <textarea
                    className={`form-control ${
                      errors.description ? "is-invalid" : ""
                    }`}
                    id="description"
                    rows="3"
                    {...register("description", {
                      required: "Description is required",
                      maxLength: {
                        value: 150,
                        message:
                          "La descripción no puede tener más de 100 caracteres.",
                      },
                    })}
                  />
                  {errors.description && (
                    <div className="invalid-feedback">
                      {errors.description.message}
                    </div>
                  )}
                </div>

                {/* Drag and drop area */}
                <div
                  {...getRootProps()}
                  className="border border-dashed rounded p-4 text-center dropzone"
                >
                  <input {...getInputProps()} />
                  {selectedImage ? (
                    <img
                      src={selectedImage.preview}
                      alt="Preview"
                      className="img-fluid mt-3"
                      style={{ maxHeight: "200px" }}
                    />
                  ) : (
                    <p className="text-muted">
                      <strong>Subir una imagen o arrastra y suelta</strong>
                      <br />
                      PNG, JPG, GIF hasta 10MB
                    </p>
                  )}
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={handleClose}
                >
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
