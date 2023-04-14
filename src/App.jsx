import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Calculater from './assets/components/calc/calc.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Calculater />
    </div>
  )
}

export default App
