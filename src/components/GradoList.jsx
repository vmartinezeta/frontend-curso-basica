import { useEffect } from "react"
import { useAulaStore } from "../store/useAula"
import TaskBar from "./TaskBar"
import { usePageStore } from "../store/usePage"


function GradoList() {
    const { isLoadPage, setLoadPage, activarForm, toggleForm } = usePageStore()
    const { grados, gradoSelected } = useAulaStore()
    const { deleteGrado, loadGrados, setGradoSelected } = useAulaStore()

    useEffect(() => {
        if (!isLoadPage) {
            return
        }

        loadGrados()
    }, [isLoadPage])


    const onNuevo = () => {
        if (gradoSelected!==null) {
            setGradoSelected(null)
            activarForm(true)
        } else {
            toggleForm()
        }
    }

    const onSelected = (grado) => {
        setGradoSelected(grado)
        activarForm(true)
    }

    const activarRowSelected = (id) => {
        if (gradoSelected !== null && id === gradoSelected.id) {
            return "table__row table__row__body table__row__body--activo"
        }
        return "table__row table__row__body"
    }

    const onEliminar = async () => {
        setLoadPage(false)
        if (!confirm("¿Está seguro de eliminar?")) {
            return
        }

        await deleteGrado(gradoSelected.id)
        setGradoSelected(null)
        setLoadPage(true)
    }

    return <div className="main__col main__col--izq">
        <div className="table">
            <TaskBar onNuevo={onNuevo} onEliminar={onEliminar} estaEn2doPlano={gradoSelected !== null} />
            <div className="table__row table__row__header">
                <div className="table__col table__col--2x">Nombre largo</div>
                <div className="table__col table__col--1x">Nombre corto</div>
            </div>
            {
                grados.map(grado => {
                    return <div key={grado.id} className={activarRowSelected(grado.id)} onClick={() => onSelected(grado)}>
                        <div className="table__col table__col--2x">{grado.nombre_largo}</div>
                        <div className="table__col table__col--1x">{grado.nombre_corto}</div>
                    </div>
                })
            }
        </div>
    </div>
}

export default GradoList