import AsignaturaList from '../components/AsignaturaList'
import Navbar from '../components/Navbar'
import FormAsignatura from '../components/FormAsignatura'


function Asignatura() {

    return <div className="app">
        <Navbar />
        <div className="main main__col">
            <AsignaturaList />
            <FormAsignatura />
        </div>
    </div>
}

export default Asignatura