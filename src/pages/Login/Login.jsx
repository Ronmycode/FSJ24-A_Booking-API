import React from 'react';
import { useForm } from 'react-hook-form';
import { login } from '../../services/loginServices';
import { useNavigate } from 'react-router-dom';
import toastr from 'toastr';
export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const loginForm = async (data) => {
        try {
            const response = await login(data);

            if (response && response.token) {
                sessionStorage.setItem('token_bookings', response.token);
                toastr.success('¡Bienvenido! Inicio de sesión exitoso.');
                navigate('/accommodations');
            } else if (response?.message) {
                toastr['warning'](response.message); // Mensaje específico de error de respuesta
            } else {
                toastr['error']('Credenciales incorrectas'&response.message);
            }
        } catch (error) {
            toastr['error'](
                error.response?.data?.message || 
                'Error en el servidor. Por favor intente nuevamente.'
            );
        }
    };


    return (
        <div>
            <h1>Iniciar Sesión</h1>
            <form onSubmit={handleSubmit(loginForm)}>
                <div>
                    <label>Correo</label>
                    <input
                        type="email"
                        {...register('email', {
                            required: 'El correo es obligatorio',
                            pattern: {
                                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                message: 'Formato de correo inválido'
                            }
                        })}
                    />
                    {errors.email && <span>{errors.email.message}</span>}
                </div>
                <div>
                    <label>Contraseña</label>
                    <input
                        type="password"
                        {...register('password', {
                            required: 'La contraseña es obligatoria',
                            minLength: {
                                value: 6,
                                message: 'La contraseña debe tener al menos 6 caracteres'
                            }
                        })}
                    />
                    {errors.password && <span>{errors.password.message}</span>}
                </div>
                <div>
                    <button type="submit">Iniciar sesión</button>
                </div>
            </form>
        </div>
    );
}
