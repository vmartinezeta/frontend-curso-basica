import Navbar from '../components/Navbar'
import AulaList from '../components/AulaList'
import FormAula from '../components/FormAula'
import { useEffect } from 'react'
import { useAulaStore } from '../store/useAula'
import { useSelectedStore } from '../store/useSelected'


function Aula() {
    const { aulas } = useAulaStore()
    const { setAulaSelected, cursoSelected } = useSelectedStore()

    useEffect(() => {
        if (aulas.length === 0) {
            setAulaSelected(null)
        }
    }, [aulas])


    return <div className="app">
        <Navbar />
        {
            cursoSelected!==null && <div className="main main__col">
            <AulaList />
            <FormAula />
        </div>
        }
    </div>
}

export default Aula