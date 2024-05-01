import { useEffect } from "react"
import { useAulaStore } from "../store/useAula"
import TaskBar from "./TaskBar"
import { usePageStore } from '../store/usePage'


function AsignaturaList() {
    const { isLoadPage, toggleForm, setLoadPage, activarForm } = usePageStore()
    const { asignaturas, asignaturaSelected } = useAulaStore()
    const { deleteAsignatura, setAsignaturaSelected, loadAsignaturas } = useAulaStore()

    
    useEffect(() => {
        if (!isLoadPage) {
            return
        }
        loadAsignaturas()
    }, [isLoadPage])


    const activarRowSelected = (id) => {
        if (asignaturaSelected !== null && id === asignaturaSelected.id) {
            return "table__row table__row__body table__row__body--activo"
        }
        return "table__row table__row__body"
    }

    const onNuevo = (e) => {
        e.preventDefault()
        if (asignaturaSelected!==null) {
            activarForm(true)
            setAsignaturaSelected(null)
        } else {
            toggleForm()
        }
    }

    const onEliminar = async () => {
        setLoadPage(false)
        if (!confirm("¿Está seguro de eliminar?")) {
            return
        }

        await deleteAsignatura(asignaturaSelected.id)
        setAsignaturaSelected(null)
        activarForm(false)
        setLoadPage(true)
    }

    const onSelected = (asignatura) => {
        setAsignaturaSelected(asignatura)
        activarForm(true)
    }


    return <div className="main__col main__col--izq">
        <div className="table">
            <TaskBar estaEn2doPlano={asignaturaSelected !== null} onNuevo={onNuevo} onEliminar={onEliminar} />
            <div className="table__row table__row__header">
                <div className="table__col table__col--2x">ID</div>
                <div className="table__col table__col--1x">Nombre</div>
            </div>
            {
                asignaturas.map(asignatura => {
                    return <div key={asignatura.id} className={activarRowSelected(asignatura.id)} onClick={() => onSelected(asignatura)}>
                        <div className="table__col table__col--2x">{asignatura.id}</div>
                        <div className="table__col table__col--1x">{asignatura.nombre}</div>
                    </div>
                })
            }
        </div>
    </div>
}

export default AsignaturaList