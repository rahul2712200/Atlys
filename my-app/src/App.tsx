import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Feedlist from './Components/Feedlist'
import './index.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Feedlist></Feedlist>
    </>
  )
}

export default App
