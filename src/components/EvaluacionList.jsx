import { useEffect } from "react"
import { useEvaluacionStore } from "../store/useEvaluacion"
import { Evaluacion } from "../store/Evaluacion"
import { useSelectedStore } from "../store/useSelected"

const TERCER_PERIODO = 4

function EvaluacionList() {
    const { periodoSelected } = useSelectedStore()
    const { asignacionId, updateAsignacionByAsignatura, loadPeriodoActivo, createEvaluaciones, updateEvaluacion, setRowSelected, rowSelected, evaluaciones, updateAsignacionByAula, loadAsignaciones, aulas, asignaturas } = useEvaluacionStore()


    useEffect(() => {
        loadPeriodoActivo()
        loadAsignaciones()
    }, [])



    const onAulaSelected = (e) => {
        updateAsignacionByAula(+e.target.value)        
    }


    const onAsignaturaSelected = e => {
        updateAsignacionByAsignatura(+e.target.value)
    }


    const onSubmit = (e) => {
        e.preventDefault()
        const evaluacionesFinal = evaluaciones.map(evaluacion => new Evaluacion({
            id: evaluacion.id ?? null,
            p1: evaluacion.p1,
            p2: evaluacion.p2,
            p3: evaluacion.p3,
            ps: evaluacion.ps,
            alumnoAulaId: evaluacion.alumnoAula.id,
            asignacionId,
            periodoId: periodoSelected.id
        }))
        createEvaluaciones(evaluacionesFinal)
    }


    const onSelected = (selected) => {
        setRowSelected(selected)
    }


    const isStringValido = (value) => {
        const permitidos = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => n.toString())
        const caracterReciente = value.substr(-1)
        return permitidos.includes(caracterReciente) || caracterReciente === ""
    }


    const isIntValido = (value) => {
        return value >= 0 && value <= 10
    }


    const onChange = (e) => {
        if (!isStringValido(e.target.value)) {
            return
        }

        if (!isIntValido(e.target.value)) {
            return
        }

        // /^([0-9]+\.?[0-9]{0,2})$/; 

        updateEvaluacion({
            ...rowSelected,
            [e.target.name]: e.target.value
        })
    }


    const calcProm = (rowSelected) => {
        const p1 = rowSelected.p1 ?? 0
        const p2 = rowSelected.p2 ?? 0
        const p3 = rowSelected.p3 ?? 0
        const promFinal = p1 * .35 + p2 * .35 + p3 * .30

        if (periodoSelected.tipoPeriodo.id === 4 && rowSelected.ps !== null) {
            const ps = rowSelected.ps ?? 0
            const semisuma = (parseFloat(p3) + parseFloat(ps)) / 2
            return semisuma.toFixed(1)
        }

        const renderProm = rowSelected.p1 !== null && rowSelected.p2 !== null && rowSelected.p3 !== null
        return renderProm ? promFinal.toFixed(1) : "--"
    }


    if (periodoSelected === null) return <div className="main">
        <h1 className="main__title">Atención:Pagina en mantenimiento</h1>
    </div>


    return <div className="main">
        <form className="control-top">
            <label className="control-top__label" htmlFor="">Aula:</label>
            <select className="control-top__select" onChange={onAulaSelected}>
                {aulas.map(aula => {
                    return <option key={aula.id} value={aula.id}>{aula.grado.nombre_largo} "{aula.seccion.letra}"</option>
                })}
            </select>
            <select className="control-top__select" onChange={onAsignaturaSelected}>
                {
                    asignaturas.map(asignatura => {
                        return <option key={asignatura.id} value={asignatura.id}>{asignatura.nombre}</option>
                    })
                }
            </select>
            <div className="control__periodo">
                <h1 className="control__titulo">{periodoSelected.tipoPeriodo.nombre}</h1>
            </div>
        </form>
        <div className="main__col">
            <form className="formEvaluacion table" onSubmit={onSubmit}>
                <div className="table__row table__row__header">
                    <div className="table__col table__col--2x">Nie</div>
                    <div className="table__col table__col--2x">Nombres</div>
                    <div className="table__col table__col--2x">Apellidos</div>
                    <div className="table__col table__col--1x">P1</div>
                    <div className="table__col table__col--1x">P2</div>
                    <div className="table__col table__col--1x">P3</div>
                    {periodoSelected.tipoPeriodo.id===TERCER_PERIODO && <div className="table__col table__col--1x">Ps</div>}
                    <div className="table__col table__col--1x">Prom</div>
                </div>
                {
                    evaluaciones.map(evaluacion => {
                        return <div key={evaluacion.alumnoAula.id} className="table__row table__row__body">
                            <div className="table__col table__col--2x">{evaluacion.alumnoAula.alumno.nie}</div>
                            <div className="table__col table__col--2x">{evaluacion.alumnoAula.alumno.nombres}</div>
                            <div className="table__col table__col--2x">{evaluacion.alumnoAula.alumno.apellidos}</div>
                            <div className="table__col table__col--1x"><input name="p1" className="formEvaluacion__input" type="text" onChange={onChange} value={evaluacion.p1 === null ? "" : evaluacion.p1} onFocus={() => onSelected(evaluacion)} autoComplete="off" /></div>
                            <div className="table__col table__col--1x"><input name="p2" className="formEvaluacion__input" type="text" onChange={onChange} value={evaluacion.p2 === null ? "" : evaluacion.p2} onFocus={() => onSelected(evaluacion)} autoComplete="off" /></div>
                            <div className="table__col table__col--1x"><input name="p3" className="formEvaluacion__input" type="text" onChange={onChange} value={evaluacion.p3 === null ? "" : evaluacion.p3} onFocus={() => onSelected(evaluacion)} autoComplete="off" /></div>
                            {periodoSelected.tipoPeriodo.id===TERCER_PERIODO && <div className="table__col table__col--1x"><input name="ps" className="formEvaluacion__input" type="text" onChange={onChange} value={evaluacion.ps === null ? "" : evaluacion.ps} onFocus={() => onSelected(evaluacion)} autoComplete="off" /></div>}
                            <div className="table__col table__col--1x">{calcProm(evaluacion)}</div>
                        </div>
                    })
                }

                <div className="control-bottom">
                    <button className="control-bottom__guardar">Guardar todo</button>
                </div>
            </form>
        </div>
    </div>
}

export default EvaluacionList