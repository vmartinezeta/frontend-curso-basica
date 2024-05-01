import Navbar from "../components/Navbar"
import AlumnoList from "../components/AlumnoList"
import FormAlumno from "../components/FormAlumno"
import { useSelectedStore } from "../store/useSelected"


function Alumno() {

    const {aulaSelected} = useSelectedStore()

    return <div className="app">
        <Navbar />
        {
            aulaSelected!== null && <div className="main main__col">
            <AlumnoList />
            <FormAlumno />
        </div>
        }
    </div>
}

export default Alumno