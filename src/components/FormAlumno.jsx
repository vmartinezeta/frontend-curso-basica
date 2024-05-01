import { useForm } from "react-hook-form"
import { useAulaStore } from "../store/useAula"
import { usePageStore } from "../store/usePage"
import { useParams } from "react-router-dom"
import { useEffect } from "react"


function FormAlumno() {
    const {setLoadPage, isActiveForm, activarForm} = usePageStore()
    const { alumnoSelected,  createAlumno, updateAlumno } = useAulaStore()
    const { register, handleSubmit, setValue, reset } = useForm()


    useEffect(()=> {
        activarForm(false)
    }, [])

    useEffect(() => {
        if (alumnoSelected !== null) {
            setValue("nombres", alumnoSelected.alumno.nombres)
            setValue("apellidos", alumnoSelected.alumno.apellidos)
            setValue("nie", alumnoSelected.alumno.nie)
        } else {
            setValue("nombres", "")
            setValue("apellidos", "")
            setValue("nie", "")
        }
    }, [alumnoSelected])


    const onSubmit = handleSubmit(async (data) => {
        setLoadPage(false)
        if (alumnoSelected !== null) {
            await updateAlumno(alumnoSelected.id, data)
        } else {
            await createAlumno(data)
            reset()
        }
        setLoadPage(true)
    })

    if (!isActiveForm) return null

    return <div className="main__col main__col--der">
        <form className="form-nuevo" onSubmit={onSubmit}>
            <input {...register("nombres")} className="form-nuevo__input" type="text" placeholder="Nombres" />
            <input {...register("apellidos")} className="form-nuevo__input" type="text" placeholder="Apellidos" />
            <input {...register("nie")} className="form-nuevo__input" type="text" placeholder="Nie" />
            <button className="form-nuevo__button">{alumnoSelected!==null?"Actualizar":"Guardar"}</button>
        </form>
    </div>
}

export default FormAlumno