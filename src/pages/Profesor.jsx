import FormProfesor from "../components/FormProfesor"
import Navbar from "../components/Navbar"
import ProfesorList from "../components/ProfesorList"

function Profesor() {
    return <div className="app">
        <Navbar />
        <div className="main main__col">
            <ProfesorList />
            <FormProfesor />
        </div>
    </div>
}

export default Profesor