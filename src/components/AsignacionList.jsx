import  { useEffect } from 'react'
import { usePageStore } from '../store/usePage'
import { useAulaStore } from '../store/useAula'
import { useParams } from 'react-router-dom'
import { useSelectedStore } from '../store/useSelected'



function AsignacionList() {    
    const {isLoadPage} = usePageStore()
    const {aulaSelected} = useSelectedStore()
    const {asignacionSelected, loadAsignaciones, asignaciones} = useAulaStore()
    const params = useParams()

    useEffect(() => {
        if (!isLoadPage) {
            return
        }        
        loadAsignaciones(aulaSelected.id)
    }, [isLoadPage])

    const onSelected = () => {

    }

    const activarRowSelected = (id) => {
        if (asignacionSelected !== null && id === asignacionSelected.id) {
            return "table__row table__row__body table__row__body--activo"
        }
        return "table__row table__row__body"
    }

    


    return <div className="main__col main__col--izq">
        <div className="table">
            {/* <TaskBar estaEn2doPlano={asignacionSelected !== null} onNuevo={onNuevo} onEliminar={onEliminar} /> */}
            <div className="table__row table__row__header">
                <div className="table__col table__col--2x">Asignatura</div>
                <div className="table__col table__col--1x">Profesor</div>                
            </div>
            {
                asignaciones.map(asignacion => {
                    return <div key={asignacion.id} className={activarRowSelected(asignacion.id)} onClick={() => onSelected(asignacion)}>
                        <div className="table__col table__col--2x">{`${asignacion.asignatura.nombre}`}</div>
                        <div className="table__col table__col--1x">{`${asignacion.profesor.apellidos}(${asignacion.profesor.username})`}</div>
                    </div>
                })
            }
        </div>
    </div>
}

export default AsignacionList