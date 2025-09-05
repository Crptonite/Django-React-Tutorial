// Routing folder

import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

function Logout(){
  localStorage.clear()
  return <Navigate to="/login"/>
}
// Reason: When someone is registering I want to clear local storage so that I dont end up submitting access tokens to the registered accounts where i can potentially get an error. I dont have old access tokens lingering around.
function RegisterAndLogout(){
  localStorage.clear()
  return <Register/>
}
function App() {
  // const [count, setCount] = useState(0)
  return (
    <BrowserRouter>
      <Routes>
        {/* Protects Home Page if authentication for accound fails */}
        <Route path='/' element={
          <ProtectedRoute>
          <Home/>
        </ProtectedRoute>}/>

        <Route path="/login" element={<Login/>}/>
        <Route path="/logout" element={<Logout/>}/>
        <Route path="/register" element={<RegisterAndLogout/>}/>
        {/* 404 page */}
        <Route path="*" element={<NotFound/>}></Route>
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
