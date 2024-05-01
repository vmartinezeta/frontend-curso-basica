import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { usePageStore } from "../store/usePage"
import { useCursoStore } from "../store/useCursoStore"
import { useSelectedStore } from "../store/useSelected"


function FormCurso() {
    const { isActiveForm, setLoadPage } = usePageStore()
    const { cursoSelected } = useSelectedStore()
    const { createCurso, updateCurso } = useCursoStore()
    const { register, handleSubmit, setValue, reset } = useForm()

    useEffect(() => {
        if (cursoSelected !== null) {
            setValue("anyo", cursoSelected.anyo)
        } else {
            setValue("anyo", "")
        }
    }, [cursoSelected])


    const onSubmit = handleSubmit(async (data) => {
        setLoadPage(false)
        if (cursoSelected !== null) {
            await updateCurso(cursoSelected.id, data)     
        } else {
            await createCurso(data)
            reset()
        }
        setLoadPage(true)
    })

    if (!isActiveForm) return

    return <div className="main__col main__col--der">
        <form className="form-nuevo" onSubmit={onSubmit}>
            <input {...register("anyo")} className="form-nuevo__input" type="text" placeholder="Año" />
            <button className="form-nuevo__button">{cursoSelected !== null ? "Actualizar" : "Guardar"}</button>
        </form>
    </div>
}

export default FormCurso