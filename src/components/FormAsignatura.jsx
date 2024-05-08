import { useForm } from "react-hook-form"
import { useAulaStore } from "../store/useAula"
import { usePageStore } from "../store/usePage"
import { useEffect } from "react"

function FormAsignatura() {
    const { setLoadPage, isActiveForm } = usePageStore()
    const { updateAsignatura, createAsignatura, asignaturaSelected } = useAulaStore()
    const { register, handleSubmit, setValue, reset, formState:{errors} } = useForm()


    useEffect(() => {
        if (asignaturaSelected !== null) {
            setValue("nombre", asignaturaSelected.nombre)
        } else {
            setValue("nombre", "")
        }
    }, [asignaturaSelected])


    const onSubmit = handleSubmit(async (data) => {
        setLoadPage(false)
        if (asignaturaSelected !== null) {
            await updateAsignatura(asignaturaSelected.id, data)
        } else {
            await createAsignatura(data)
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
        <h1 className="form-nuevo__title"><span className="form-nuevo__subtitle">{asignaturaSelected !== null ? "Editar" : "Nuevo"}</span>Asignatura</h1>
            <input {...register("nombre",{
                required:true
            })} className={checkError("nombre")} type="text" placeholder="Nombre" autoComplete="off" autoFocus={true} />
            <button className="form-nuevo__button">Guardar</button>
        </form>
    </div>
}

export default FormAsignatura