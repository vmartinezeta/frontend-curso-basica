import { useEffect } from "react"
import { useAulaStore } from "../store/useAula"
import TaskBar from "./TaskBar"
import { Link } from "react-router-dom"
import { usePageStore } from "../store/usePage"
import { useSelectedStore } from "../store/useSelected"


function AulaList() {
    const { isLoadPage, setLoadPage, activarForm, toggleForm } = usePageStore()
    const { aulaSelected, setAulaSelected } = useSelectedStore()
    const { aulas, deleteAula, loadAulas } = useAulaStore()


    useEffect(() => {
        if (!isLoadPage) return
        loadAulas()
    }, [isLoadPage])



    const onSelected = (aula) => {
        setAulaSelected(aula)
        activarForm(true)
    }

    const activarRowSelected = (id) => {
        if (aulaSelected !== null && aulaSelected.id === id) {
            return "table__row table__row__body table__row__body--activo"
        }
        return "table__row table__row__body"
    }

    const onNuevo = (e) => {
        e.preventDefault()
        if (aulaSelected !== null) {
            activarForm(true)
            setAulaSelected(null)
        } else {
            toggleForm()
        }
    }

    const onEliminar = async () => {
        setLoadPage(false)
        if (!confirm("¿Está seguro de eliminar?")) {
            return
        }
        try {
            await deleteAula(aulaSelected.id)
            setAulaSelected(null)
            activarForm(false)
            setLoadPage(true)
        } catch (error) { }
    }

    return <div className="main__col main__col--izq">
        <div className="table">
            <TaskBar onNuevo={onNuevo} onEliminar={onEliminar} estaEn2doPlano={aulaSelected !== null} >
                <li className="taskbar__item"><Link className="taskbar__link" to="/alumno">Alumno</Link></li>
                <li className="taskbar__item"><Link className="taskbar__link" to="/asignacion">Asignación</Link></li>
            </TaskBar>
            <div className="table__row table__row__header">
                <div className="table__col table__col--2x">Grado</div>
                <div className="table__col table__col--1x">Seccion</div>
                <div className="table__col table__col--1x">Curso</div>
            </div>
            {
                aulas.map(aula => {
                    return <div key={aula.id} className={activarRowSelected(aula.id)} onClick={() => onSelected(aula)}>
                        <div className="table__col table__col--2x">{aula.grado.nombre_largo}</div>
                        <div className="table__col table__col--1x">{aula.seccion.letra}</div>
                        <div className="table__col table__col--1x">{aula.curso.anyo}</div>
                    </div>
                })
            }
        </div>
    </div>
}

export default AulaList