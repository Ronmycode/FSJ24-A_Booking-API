import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/Login'
import Rutas from './routes/Rutas'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Rutas />
    </>
  )
}

export default App
