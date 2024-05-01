import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import CursoList from '../components/CursoList'
import FormCurso from '../components/FormCurso'
import { usePageStore } from '../store/usePage'
import { useCursoStore } from '../store/useCursoStore'

function Curso() {
    const {isLoadPage, activarForm, paginar } = usePageStore()

    useEffect(() => {
        activarForm(false)
    }, [])
    
    useEffect(()=> { 
        paginar()
    }, [isLoadPage])

    
    return <div className="app">
        <Navbar />
        <div className="main main__col">
            <CursoList />
            <FormCurso />
        </div>
    </div>
}

export default Curso