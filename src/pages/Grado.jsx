import GradoList from '../components/GradoList'
import Navbar from '../components/Navbar'
import FormGrado from '../components/FormGrado'

function Grado() {

    return <div className="app">
        <Navbar />
        <div className="main main__col">
            <GradoList />
            <FormGrado />
        </div>
    </div>
}

export default Grado