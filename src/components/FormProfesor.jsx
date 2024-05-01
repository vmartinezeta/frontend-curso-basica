import { usePageStore } from "../store/usePage"
import { useForm } from "react-hook-form"
import { useAulaStore } from "../store/useAula"
import { useEffect } from "react"

function FormProfesor() {
    const { register, handleSubmit, reset, setValue } = useForm()
    const {setLoadPage, isActiveForm } = usePageStore()
    const {updateProfesor, createProfesor, profesorSelected} = useAulaStore()


    useEffect(()=> {
        if (profesorSelected!== null) {
            setValue("nombres", profesorSelected.nombres)
            setValue("apellidos", profesorSelected.apellidos)
            setValue("dui", profesorSelected.dui)
            setValue("username", profesorSelected.username)
            setValue("password", "")
        } else {
            setValue("nombres", "")
            setValue("apellidos", "")
            setValue("dui", "")
            setValue("username", "")
            setValue("password", "")
        }
    }, [profesorSelected])

    const onSubmit = handleSubmit(async(data)=> {
        setLoadPage(false)
        if (profesorSelected!==null) {
            await updateProfesor(profesorSelected.id, data)
        } else {
            await createProfesor(data)
            reset()
        }
        setLoadPage(true)
    })

    if (!isActiveForm) return null

    return <div className="main__col main__col--der">
        <form className="form-nuevo" onSubmit={onSubmit}>
            <input {...register("nombres")} className="form-nuevo__input" type="text" placeholder="Nombres" />
            <input {...register("apellidos")} className="form-nuevo__input" type="text" placeholder="Apellidos" />
            <input {...register("dui")} className="form-nuevo__input" type="text" placeholder="Dui" />
            <input {...register("username")} className="form-nuevo__input" type="text" placeholder="Username" />
            <input {...register("password")} className="form-nuevo__input" type="password" placeholder="Password" />
            <button className="form-nuevo__button">{profesorSelected!==null?"Actualizar":"Guardar"}</button>
        </form>
    </div>
}

export default FormProfesor