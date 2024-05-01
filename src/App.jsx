import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Aula from "./pages/AulaPage"
import Curso from "./pages/Curso"
import Alumno from "./pages/Alumno"
import Profesor from "./pages/Profesor"
import ProtectedRoute from "./components/ProtectedRoute"
import NotFound from "./components/NotFound"
import Admin from "./pages/Admin"
import Asignatura from "./pages/Asignatura"
import Grado from "./pages/Grado"
import Asignacion from "./pages/Asignacion"
import ProtectedRouteProfesor from "./components/ProtectedRouteProfesor"
import Evaluacion from "./pages/EvaluacionPage"


function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<Admin />} />
        <Route path="/asignatura" element={<Asignatura />} />
        <Route path="/grado" element={<Grado />} />
        <Route path="/aula" element={<Aula />} />
        <Route path="/curso" element={<Curso />} />
        <Route path="/alumno" element={<Alumno />} />
        <Route path="/profesor" element={<Profesor />} />
        <Route path="/asignacion" element={<Asignacion />} />
      </Route>
      <Route element={<ProtectedRouteProfesor />}>
        <Route path="/evaluacion" element={<Evaluacion />} />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  </BrowserRouter>
}

export default App