import { useEffect } from "react"
import { useEvaluacionStore } from "../store/useEvaluacion"
import { usePageStore } from "../store/usePage"
import { Evaluacion } from "../store/Evaluacion"
import { useSelectedStore } from "../store/useSelected"


function EvaluacionList() {
    const {asignacionIdSelected} = useSelectedStore()
    const { createEvaluacion, updateEvaluacion, setRowSelected, rowSelected, evaluacion, loadEvaluacion, updateAulaSelected, loadAsignaturasAula, aulas, asignaturas } = useEvaluacionStore()
    const { isLoadPage } = usePageStore()

    useEffect(() => {
        if (!isLoadPage) return

        loadAsignaturasAula()
    }, [isLoadPage])


    const onAulaSelected = (e) => {
        updateAulaSelected(+e.target.value)
        loadEvaluacion(+e.target.value)
    }


    const onSubmit = (e) => {
        e.preventDefault()
        const tabla = evaluacion.map(eva => new Evaluacion({
            p1: eva.p1,
            p2: eva.p2,
            p3: eva.p3,
            ps: eva.ps,
            alumnoAulaId:eva.alumnoAula.id,
            asignacionId:asignacionIdSelected
        }))
        createEvaluacion(tabla)
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

        updateEvaluacion({
            ...rowSelected,
            [e.target.name]: e.target.value
        })
    }


    return <div className="main">
        <form className="control-top">
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
            <form className="formEvaluacion table" onSubmit={onSubmit}>
                <div className="table__row table__row__header">
                    <div className="table__col table__col--2x">Nie</div>
                    <div className="table__col table__col--2x">Nombres</div>
                    <div className="table__col table__col--2x">Apellidos</div>
                    <div className="table__col table__col--1x">P1</div>
                    <div className="table__col table__col--1x">P2</div>
                    <div className="table__col table__col--1x">p3</div>
                    <div className="table__col table__col--1x">Ps</div>
                </div>
                {
                    evaluacion.map((eva) => {
                        return <div key={eva.alumnoAula.id} className="table__row table__row__body">
                            <div className="table__col table__col--2x">{eva.alumnoAula.alumno.nie}</div>
                            <div className="table__col table__col--2x">{eva.alumnoAula.alumno.nombres}</div>
                            <div className="table__col table__col--2x">{eva.alumnoAula.alumno.apellidos}</div>
                            <div className="table__col table__col--1x"><input name="p1" className="formEvaluacion__input" type="text" onChange={onChange} value={eva.p1 === null ? "" : eva.p1} onFocus={() => onSelected(eva)} autoComplete="off" /></div>
                            <div className="table__col table__col--1x"><input name="p2" className="formEvaluacion__input" type="text" onChange={onChange} value={eva.p2 === null ? "" : eva.p2} onFocus={() => onSelected(eva)} autoComplete="off" /></div>
                            <div className="table__col table__col--1x"><input name="p3" className="formEvaluacion__input" type="text" onChange={onChange} value={eva.p3 === null ? "" : eva.p3} onFocus={() => onSelected(eva)} autoComplete="off" /></div>
                            <div className="table__col table__col--1x"><input name="ps" className="formEvaluacion__input" type="text" onChange={onChange} value={eva.ps === null ? "" : eva.ps} onFocus={() => onSelected(eva)} autoComplete="off" /></div>
                        </div>
                    })
                }

                <div className="control-bottom">
                    <button className="control-bottom--guardar">Guardar todo</button>
                </div>
            </form>
        </div>
    </div>
}

export default EvaluacionList