import { useEffect } from "react"
import { useEvaluacionStore } from "../store/useEvaluacion"
import { usePageStore } from "../store/usePage"

function EvaluacionList() {
    const {updateAulaSelected, loadAsignaturasAula, aulas, asignaturas } = useEvaluacionStore()
    const {isLoadPage} = usePageStore()


    useEffect(()=> {
        if (!isLoadPage) return

        loadAsignaturasAula()
    }, [isLoadPage])

    const onAulaSelected = (e) => {
        updateAulaSelected(+e.target.value)
    }

    return <div className="main">
        <form  className="control-top">
            <label className="control-top__label" htmlFor="">Aula:</label>
            <select className="control-top__select" onChange={onAulaSelected}>
            {aulas.map(aula => {
                return <option key={aula.id} value={aula.id}>{aula.grado.nombre_largo} "{aula.seccion.letra}"</option>
            })}
            </select>
            <select className="control-top__select">
                {
                    asignaturas.map(asignatura => {                    
                        return <option key={asignatura.id} value={asignatura.id}>{asignatura.nombre}</option>
                    })
                }
            </select>
        </form>
        <div className="main__col">
            <div className="table">
                <div className="table__row table__row__header">
                    <div className="table__col table__col--2x">Nie</div>
                    <div className="table__col table__col--2x">Nombres</div>
                    <div className="table__col table__col--2x">Apellidos</div>
                    <div className="table__col table__col--1x">P1</div>
                    <div className="table__col table__col--1x">P2</div>
                    <div className="table__col table__col--1x">p3</div>
                    <div className="table__col table__col--1x">Prom</div>
                </div>
                <div className="table__row table__row__body">
                <div className="table__col table__col--2x">12345678</div>
                    <div className="table__col table__col--2x">victor</div>
                    <div className="table__col table__col--2x">Martinez</div>
                    <div className="table__col table__col--1x">10</div>
                    <div className="table__col table__col--1x">10</div>
                    <div className="table__col table__col--1x">10</div>
                    <div className="table__col table__col--1x">10</div>
                </div>
                <div className="control-bottom">
                    <button className="control-bottom--guardar">Guardar todo</button>
                </div>
            </div>
        </div>
    </div>
}

export default EvaluacionList