import React from 'react'
import { useForm } from 'react-hook-form'
import { login } from '../services/loginServices';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    //entrada de datos del formulario
    const { register, handleSubmit } = useForm()

    const navigate = useNavigate()

    //metodo para validar el usuario
    const loginForm = async (data) => {
        console.log(data); //{email, password}
        const response = await login(data);
        //validando la respuesta del login
        if(response?.token){
            //si esta autorizada, guardamos el token en el sessionstorage
            sessionStorage.setItem('token_bookings', response.token)
        }
        //redireccione a los alojamientos
        navigate('/alojamientos')
        console.log(response);
        
    }

    return (
        <div>
            <h1>Iniciar Sesion</h1>
            <form action="" onSubmit={handleSubmit(loginForm)}>
                <div>
                    <label htmlFor="">Correo</label>
                    <input type="email" {...register('email')} />
                </div>
                <div>
                    <label htmlFor="">Contraseña</label>
                    <input type="password" {...register('password')}/>
                </div>
                <div>
                    <button type='submit'>Iniciar sesion</button>
                </div>
            </form>
        </div>
    )
}
