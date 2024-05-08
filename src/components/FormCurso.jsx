import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { usePageStore } from "../store/usePage"
import { useCursoStore } from "../store/useCursoStore"
import { useSelectedStore } from "../store/useSelected"


function FormCurso() {
    const { isActiveForm, setLoadPage } = usePageStore()
    const { cursoSelected } = useSelectedStore()
    const { createCurso, updateCurso } = useCursoStore()
    const { register, handleSubmit, setValue, reset, formState:{errors} } = useForm()

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


    const checkError = name => {
        if (errors[name]) {
            return "form-nuevo__input form-nuevo__input--error"
        } 
        return "form-nuevo__input"
    }

    if (!isActiveForm) return

    return <div className="main__col main__col--der">
        <form className="form-nuevo" onSubmit={onSubmit}>
            <h1 className="form-nuevo__title"><span className="form-nuevo__subtitle">{cursoSelected!==null ? "Editar":"Nuevo"}</span> Curso </h1>
            <input {...register("anyo", {
                required:true
            })} className={checkError("anyo")} type="text" placeholder="Año" autoComplete="off" />
            <button className="form-nuevo__button">Guardar</button>
        </form>
    </div>
}

export default FormCurso