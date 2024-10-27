import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../components/Login'
import Accomodations from '../components/Accomodations'

export default function Rutas() {
    return (
        <BrowserRouter>
        
            <Routes>
                <Route path='/' element={<Login />}/>
                <Route path='/alojamientos' element={<Accomodations />}/>
            </Routes>
        </BrowserRouter>
    )
}
