import { useEffect } from "react"
import { useEvaluacionStore } from "../store/useEvaluacion"
import TaskBar from "./TaskBar"
import { usePageStore } from "../store/usePage"
import { useSelectedStore } from "../store/useSelected"


function PeriodoList() {
    const {setPeriodoSelected, periodoSelected} = useSelectedStore()
    const {setLoadPage, isLoadPage,toggleForm} = usePageStore()
    const {togglePeriodo, loadPeriodos, periodos } = useEvaluacionStore()

    useEffect(() => {
        if (!isLoadPage) return
        loadPeriodos()
    }, [isLoadPage])


    const activarRowSelected = (id) => {
        if (periodoSelected !== null && id === periodoSelected.id) {
            return "table__row table__row__body table__row__body--activo"
        }
        return "table__row table__row__body"
    }


    const onSelected = async(selected) => {
        selected.activo = true
        setPeriodoSelected(selected)
        setLoadPage(false)
        await togglePeriodo(selected.id)
        setLoadPage(true)
    }

    const onNuevo = async() => {
        toggleForm()
        setLoadPage(false)
        await togglePeriodo()
        setLoadPage(true)
        setPeriodoSelected(null)
    }


    return <div className="main__col main__col--izq">
        <div className="table">
            <TaskBar onNuevo={onNuevo} />
            <div className="table__row table__row__header">
                <div className="table__col table__col--1x">Periodo</div>
                <div className="table__col table__col--2x">Activo</div>

            </div>
            {
                periodos.map(periodo => {
                    return <div key={periodo.id} className={activarRowSelected(periodo.id)} onClick={() => onSelected(periodo)}>
                        <div className="table__col table__col--1x">{periodo.tipoPeriodo.nombre}</div>
                        <div className="table__col table__col--2x"><span className={`circulo ${periodo.activo ? "circulo--activo" : undefined}`}>{periodo.activo ? "On" : "Off"}</span></div>
                    </div>
                })
            }
        </div>
    </div>
}

export default PeriodoList