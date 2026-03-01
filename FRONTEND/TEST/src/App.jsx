import Comment from "./Pages/comments"
import Register from "./Pages/Register"
import ThankYou from "./Pages/Thankyou"
import HomePage from "./Pages/Welcome"
import { Routes, Route } from 'react-router-dom'
function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/register' element={<Register />}/>
        <Route path ='/comment' element={<Comment />}/>
        <Route path ='/thankyou' element={<ThankYou />}/>
      </Routes>
    </>
  )
}

export default App
