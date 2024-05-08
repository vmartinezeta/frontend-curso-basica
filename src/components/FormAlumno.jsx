import { useForm } from "react-hook-form"
import { useAulaStore } from "../store/useAula"
import { usePageStore } from "../store/usePage"
import { useParams } from "react-router-dom"
import { useEffect } from "react"


function FormAlumno() {
    const { setLoadPage, isActiveForm, activarForm } = usePageStore()
    const { alumnoSelected, createAlumno, updateAlumno } = useAulaStore()
    const { register, handleSubmit, setValue, reset, formState:{errors} } = useForm()


    useEffect(() => {
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


    const checkError = name => {
        if (errors[name]) {
            return "form-nuevo__input form-nuevo__input--error"
        }
        return "form-nuevo__input"
    }

    if (!isActiveForm) return null

    return <div className="main__col main__col--der">
        <form className="form-nuevo" onSubmit={onSubmit}>
            <h1 className="form-nuevo__title"><span className="form-nuevo__subtitle">{alumnoSelected !== null ? "Editar" : "Nuevo"}</span>Alumno</h1>
            <input {...register("nombres", {
                required:true
            })} className={checkError("nombres")} type="text" placeholder="Nombres" autoComplete="off" />
            <input {...register("apellidos",{
                required:true
            })} className={checkError("apellidos")} type="text" placeholder="Apellidos" autoComplete="off" />
            <input {...register("nie", {
                required:true
            })} className={checkError("nie")} type="text" placeholder="Nie" autoComplete="off" />
            <button className="form-nuevo__button">Guardar</button>
        </form>
    </div>
}

export default FormAlumno