import { useEffect } from "react"
import { usePageStore } from "../store/usePage"
import { useAulaStore } from "../store/useAula"
import { useForm } from "react-hook-form"

function FormGrado() {

    const { isActiveForm, setLoadPage } = usePageStore()
    const { updateGrado, createGrado, gradoSelected } = useAulaStore()
    const { register, handleSubmit, setValue, reset, formState:{errors} } = useForm()

    useEffect(() => {
        if (gradoSelected !== null) {
            setValue("nombre_largo", gradoSelected.nombre_largo)
            setValue("nombre_corto", gradoSelected.nombre_corto)
        } else {
            setValue("nombre_largo", "")
            setValue("nombre_corto", "")
        }
    }, [gradoSelected])

    const onSubmit = handleSubmit(async (data) => {
        setLoadPage(false)
        if (gradoSelected !== null) {
            await updateGrado(gradoSelected.id, data)
        } else {
            await createGrado(data)
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
        <h1 className="form-nuevo__title"><span className="form-nuevo__subtitle">{gradoSelected !== null ? "Editar" : "Nuevo"}</span>Grado</h1>
            <input {...register("nombre_largo", {
                required:true
            })} className={checkError("nombre_largo")} type="text" placeholder="Nombre largo" autoComplete="off" autoFocus={true} />
            <input {...register("nombre_corto",{
                required:true
            })} className={checkError("nombre_corto")} type="text" placeholder="Nombre corto" autoComplete="off" />
            <button className="form-nuevo__button">Guardar</button>
        </form>
    </div>
}

export default FormGrado