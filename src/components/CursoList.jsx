import { useEffect } from "react"
import { usePageStore } from "../store/usePage"
import TaskBar from "./TaskBar"
import { useCursoStore } from "../store/useCursoStore"
import { useSelectedStore } from "../store/useSelected"
import { Link } from "react-router-dom"

function CursoList() {
    const { prevPage, nextPage, fromPage, limit, actualPage, isLoadPage, setLoadPage, activarForm, toggleForm } = usePageStore()
    const { cursoSelected, setCursoSelected, setAulaSelected } = useSelectedStore()
    const { cursos, deleteCurso, toggleCurso, loadCursos} = useCursoStore()


    useEffect(() => {
        if (!isLoadPage) {
            return
        }
        loadCursos(fromPage, limit)
    }, [isLoadPage])


    useEffect(() => {
        loadCursos(fromPage, limit)
    }, [actualPage])


    const activarRowSelected = (id) => {
        if (cursoSelected !== null && id === cursoSelected.id) {
            return "table__row table__row__body table__row__body--activo"
        }
        return "table__row table__row__body"
    }

    const onNuevo = async (e) => {
        e.preventDefault()
        if (cursoSelected !== null) {
            setLoadPage(false)
            await toggleCurso()
            setLoadPage(true)
            setCursoSelected(null)
            activarForm(true)
        } else {
            toggleForm()
        }
    }

    const onEliminar = async () => {
        setLoadPage(false)
        if (!confirm("¿Está seguro de eliminar?")) {
            return
        }
        await deleteCurso(cursoSelected.id)
        setCursoSelected(null)
        activarForm(false)
        setLoadPage(true)
    }

    const onSelected = async (curso) => {
        if (curso.activo) return
        setLoadPage(false)        
        await toggleCurso(curso.id)
        setCursoSelected(curso)
        activarForm(true)
        setLoadPage(true)
    }


    return <div className="main__col main__col--izq">
        <div className="table">
            <TaskBar estaEn2doPlano={cursoSelected !== null} onNuevo={onNuevo} onEliminar={onEliminar} >
            <li className="taskbar__item"><Link className="taskbar__link" to="/aula">Aula</Link></li>
            </TaskBar>
            <div className="table__row table__row__header">
                <div className="table__col table__col--2x">Año</div>
                <div className="table__col table__col--1x">Activo</div>
            </div>
            {
                cursos.map(curso => {
                    return <div key={curso.id} className={activarRowSelected(curso.id)} onClick={() => onSelected(curso)}>
                        <div className="table__col table__col--2x">{curso.anyo}</div>
                        <div className="table__col table__col--1x"><span className={`circulo ${curso.activo ? "circulo--activo" : undefined}`}>{curso.activo ? "On" : "Off"}</span></div>
                    </div>
                })
            }
        </div>
        <ul className="paginado">
            <li className="paginado__item"><a className="paginado__link" href="#" onClick={prevPage}>Prev</a></li>
            <li className="paginado__item"><a className="paginado__link paginado__link--actual" href="#">{actualPage}</a></li>
            <li className="paginado__item"><a className="paginado__link" href="#" onClick={nextPage}>Next</a></li>
        </ul>
    </div>
}

export default CursoList