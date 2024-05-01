import { useEffect } from 'react'
import { useAulaStore } from '../store/useAula'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { usePageStore } from '../store/usePage'

function FormAsignacion() {
    const {setLoadPage} = usePageStore()
    const {createAsignacion, loadAsignaturas, asignaturas, loadProfesores, profesores} = useAulaStore()
    const params = useParams()

    const {register, handleSubmit} = useForm({
        defaultValues: {
            aula:params.aulaId,
            asignatura:1,
            profesor:1
        }
    })

    useEffect(()=> {
        loadAsignaturas()
        loadProfesores()
    }, [])
    
    

    const onSubmit = handleSubmit(async(data)=> {
        data.aula = params.aulaId
        setLoadPage(false)
        await createAsignacion(data)
        setLoadPage(true)
    })

    return <div className="main__col main__col--der">
        <form  className="form-nuevo" onSubmit={onSubmit}>
            <select {...register("asignaturaId")} className="form-nuevo__select">
                {
                    asignaturas.map(asignatura=> {
                        return <option key={asignatura.id} value={asignatura.id}>{asignatura.nombre}</option>
                    })
                }
            </select>
            <select {...register("profesorId")} className="form-nuevo__select">
                {
                    profesores.map(profesor=> {                        
                        return <option key={profesor.id} value={profesor.id}>{`${profesor.apellidos}(${profesor.username})`}</option>
                    })
                }
            </select>
            <button className="form-nuevo__button">Asignar</button>
        </form>
    </div>
}

export default FormAsignacion