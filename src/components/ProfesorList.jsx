import TaskBar from "./TaskBar"
import { useAulaStore } from "../store/useAula"
import { useEffect } from "react"
import { usePageStore } from "../store/usePage"


function ProfesorList() {
    const { setLoadPage, isLoadPage, toggleForm, activarForm } = usePageStore()
    const { deleteProfesor, setProfesorSelected, loadProfesores, profesores, profesorSelected } = useAulaStore()

    useEffect(() => {
        if (!isLoadPage) {
            return
        }

        loadProfesores()
    }, [isLoadPage])

    const onNuevo = () => {
        if (profesorSelected !== null) {
            activarForm(true)
            setProfesorSelected(null)
        } else {
            toggleForm()
        }
    }

    const onEliminar = async () => {
        setLoadPage(false)
        if (!confirm("¿Está seguro de eliminar?")) {
            return
        }
        await deleteProfesor(profesorSelected.id)
        setProfesorSelected(null)
        activarForm(false)
        setLoadPage(true)
    }

    const activarRowSelected = (id) => {
        if (profesorSelected !== null && id === profesorSelected.id) {
            return "table__row table__row__body table__row__body--activo"
        }
        return "table__row table__row__body"
    }


    const onSelected = (profesor) => {
        setProfesorSelected(profesor)
        activarForm(true)
    }


    return <div className="main__col main__col--izq">
        <div className="table">
            <TaskBar onNuevo={onNuevo} onEliminar={onEliminar} estaEn2doPlano={profesorSelected !== null} />
            <div className="table__row table__row__header">
                <div className="table__col table__col--2x">Nombres</div>
                <div className="table__col table__col--1x">Apellidos</div>
                <div className="table__col table__col--1x">Dui</div>
                <div className="table__col table__col--1x">Username</div>
            </div>
            {
                profesores.map(profesor => {
                    return <div key={profesor.id} className={activarRowSelected(profesor.id)} onClick={() => onSelected(profesor)}>
                        <div className="table__col table__col--2x">{profesor.nombres}</div>
                        <div className="table__col table__col--1x">{profesor.apellidos}</div>
                        <div className="table__col table__col--1x">{profesor.dui}</div>
                        <div className="table__col table__col--1x">{profesor.username}</div>
                    </div>
                })
            }
        </div>
    </div>
}

export default ProfesorList