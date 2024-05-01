import { useEffect } from "react"
import { usePageStore } from "../store/usePage"
import { useAulaStore } from "../store/useAula"
import { useForm } from "react-hook-form"

function FormGrado() {

    const { isActiveForm, setLoadPage } = usePageStore()
    const { updateGrado, createGrado, gradoSelected } = useAulaStore()
    const { register, handleSubmit, setValue, reset } = useForm()

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

    if (!isActiveForm) return null

    return <div className="main__col main__col--der">
        <form className="form-nuevo" onSubmit={onSubmit}>
            <input {...register("nombre_largo")} className="form-nuevo__input" type="text" placeholder="Nombre largo" />
            <input {...register("nombre_corto")} className="form-nuevo__input" type="text" placeholder="Nombre corto" />
            <button className="form-nuevo__button">{gradoSelected !== null ? "Actualizar" : "Guardar"}</button>
        </form>
    </div>
}

export default FormGrado