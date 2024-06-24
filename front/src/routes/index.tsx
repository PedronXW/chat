import { Route, Routes } from 'react-router-dom'
import RouteGuard from '../guard/RouteGuard'
import { Home } from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'

export const Router = () => {
  return (
    <Routes>
      <Route path="*" element={<div>Não tem</div>} />
      <Route path="/" element={<RouteGuard page={<Home />} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}
