import { useForm } from "react-hook-form"
import { useAulaStore } from "../store/useAula"
import { usePageStore } from "../store/usePage"
import { useEffect } from "react"

function FormAsignatura() {
    const { setLoadPage, isActiveForm } = usePageStore()
    const { updateAsignatura, createAsignatura, asignaturaSelected } = useAulaStore()
    const { register, handleSubmit, setValue, reset } = useForm()


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

    if (!isActiveForm) return null

    return <div className="main__col main__col--der">
        <form className="form-nuevo" onSubmit={onSubmit}>
            <input {...register("nombre")} className="form-nuevo__input" type="text" placeholder="Nombre" />
            <button className="form-nuevo__button">{asignaturaSelected!==null?"Actualizar":"Guardar"}</button>
        </form>
    </div>
}

export default FormAsignatura