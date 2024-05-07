import { useEffect } from "react"
import { useAulaStore } from "../store/useAula"
import TaskBar from "./TaskBar"
import { useParams } from "react-router-dom"
import { usePageStore } from "../store/usePage"


function AlumnoList() {
    const { setLoadPage, isLoadPage, activarForm, toggleForm } = usePageStore()
    const { alumnos, alumnoSelected } = useAulaStore()
    const { loadAlumnos, setAlumnoSelected, deleteAlumno } = useAulaStore()


    useEffect(() => {
        if (!isLoadPage) {
            return
        }

        loadAlumnos()
    }, [isLoadPage])


    const activarRowSelected = (id) => {
        if (alumnoSelected !== null && +id === +alumnoSelected.id) {
            return "table__row table__row__body table__row__body--activo"
        }
        return "table__row table__row__body"
    }

    const onSelected = async (alumnoAula) => {
        setAlumnoSelected(alumnoAula)
        activarForm(true)
    }

    const onEliminar = async () => {
        setLoadPage(false)
        if (!confirm("¿Está seguro de eliminar?")) {
            return
        }
        
        try {
            await deleteAlumno(alumnoSelected.id)
            setAlumnoSelected(null)
            activarForm(false)
            setLoadPage(true)
        } catch (error) { }
    }

    const onNuevo = (e) => {
        e.preventDefault()
        if (alumnoSelected !== null) {
            activarForm(true)
            setAlumnoSelected(null)
        } else {
            toggleForm()
        }
    }


    return <div className="main__col main__col--izq">
        <div className="table">
            <TaskBar onNuevo={onNuevo} onEliminar={onEliminar} estaEn2doPlano={alumnoSelected !== null} />
            <div className="table__row table__row__header">
                <div className="table__col table__col--2x">Nombres</div>
                <div className="table__col table__col--2x">Apellidos</div>
                <div className="table__col table__col--1x">Nie</div>
            </div>
            {
                alumnos.map(alumnoAula => {
                    return <div key={alumnoAula.id} className={activarRowSelected(alumnoAula.id)} onClick={() => onSelected(alumnoAula)}>
                        <div className="table__col table__col--2x">{alumnoAula.alumno.nombres}</div>
                        <div className="table__col table__col--2x">{alumnoAula.alumno.apellidos}</div>
                        <div className="table__col table__col--1x">{alumnoAula.alumno.nie}</div>
                    </div>
                })
            }
        </div>
    </div>
}

export default AlumnoList