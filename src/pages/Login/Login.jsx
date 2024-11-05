import React from "react";
import { useForm } from "react-hook-form";
import { login } from "../../services/loginServices";
import { useNavigate } from "react-router-dom";
import toastr from "toastr";

import "./Login.css";
import {
  BoxArrowInRight,
  InfoCircleFill,
  QuestionCircleFill,
  ShieldShaded,
  KeyFill,
  EnvelopeFill,
} from "react-bootstrap-icons";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const loginForm = async (data) => {
    try {
      const response = await login(data);

      if (response && response.token) {
        sessionStorage.setItem("token_bookings", response.token);
        toastr.success("¡Bienvenido! Inicio de sesión exitoso.");
        navigate("/accommodations");
      } else if (response?.message) {
        toastr["warning"](response.message); // Mensaje específico de error de respuesta
      } else {
        toastr["error"]("Credenciales incorrectas" & response.message);
      }
    } catch (error) {
      toastr["error"](
        error.response?.data?.message ||
          "Error en el servidor. Por favor intente nuevamente."
      );
    }
  };

  return (
    <div className="Login-wrapper container">
      <div className="Login-module">
        <p className="Login-greeting">{<BoxArrowInRight />} Iniciar Sesión</p>
        <p className="Login-direction">
          {<InfoCircleFill />} Ingresa tus credenciales para acceder al sistema
        </p>
        <form onSubmit={handleSubmit(loginForm)}>
          <div className="Login-email space">
            <label className="">Correo Electronico</label>
            <input
              className="w-100 login-input"
              placeholder="correo@ejemplo.com"
              type="email"
              {...register("email", {
                required: "El correo es obligatorio",
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Formato de correo inválido",
                },
              })}
            />
            {errors.email && <span>{errors.email.message}</span>}
          </div>
          <div className="Login-password space">
            <div className="row">
              <label className="col">Contraseña</label>
              <p className="col-auto forgot-pass">
                {<KeyFill />} Olvidates tu contraseña
              </p>
            </div>
            <input
              className="login-input w-100"
              placeholder="*****"
              type="password"
              {...register("password", {
                required: "La contraseña es obligatoria",
                minLength: {
                  value: 6,
                  message: "La contraseña debe tener al menos 6 caracteres",
                },
              })}
            />
            {errors.password && <span>{errors.password.message}</span>}
          </div>
          <div className="space input-checkbox">
            <input className="Login-checkbox" type="checkbox" id="myCheckbox" />
            <label htmlFor="myCheckbox">Mantener session iniciada</label>
          </div>
          <div>
            <button className="w-100 mb-4" type="submit">
              <BoxArrowInRight /> Iniciar sesión
            </button>
            <p>
              <QuestionCircleFill />
              ¿Necesitas ayuda?
              <a href="#"> Contacta soporte</a>
            </p>
          </div>
        </form>
      </div>
      <p>
        <ShieldShaded />
        Este es un sistema seguro. Tus datos estan protegidos
      </p>
    </div>
  );
}
