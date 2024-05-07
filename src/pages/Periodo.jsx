import FormPeriodo from "../components/FormPeriodo"
import Navbar from "../components/Navbar"
import PeriodoList from "../components/PeriodoList"
import { useSelectedStore } from "../store/useSelected"


function Periodo() {
    const { cursoSelected } = useSelectedStore()

    return <div className="app">
        <Navbar />
        {
            cursoSelected !== null && <div className="main main__col">
                <PeriodoList />
                <FormPeriodo />
            </div>
        }
    </div>
}

export default Periodo