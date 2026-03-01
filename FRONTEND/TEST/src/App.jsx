import Register from "./Pages/Register"
import HomePage from "./Pages/Welcome"
import { Routes, Route } from 'react-router-dom'
function App() {
  

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/register' element={<Register />}/>
      </Routes>
    </>
  )
}

export default App
