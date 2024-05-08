import { usePageStore } from "../store/usePage"
import { useForm } from "react-hook-form"
import { useAulaStore } from "../store/useAula"
import { useEffect } from "react"

function FormProfesor() {
    const { register, handleSubmit, reset, setValue, formState:{errors} } = useForm()
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


    const checkError = name => {
        if (errors[name]) {
            return "form-nuevo__input form-nuevo__input--error"
        }
        return "form-nuevo__input"
    }

    if (!isActiveForm) return null

    return <div className="main__col main__col--der">
        <form className="form-nuevo" onSubmit={onSubmit}>
        <h1 className="form-nuevo__title"><span className="form-nuevo__subtitle">{profesorSelected !== null ? "Editar" : "Nuevo"}</span>Profesor</h1>
            <input {...register("nombres", {
                required:true
            })} className={checkError("nombres")} type="text" placeholder="Nombres" autoComplete="off" autoFocus={true} />
            <input {...register("apellidos",{
                required:true
            })} className={checkError("apellidos")} type="text" placeholder="Apellidos" autoComplete="off"  />
            <input {...register("dui", {
                required:true
            })} className={checkError("dui")} type="text" placeholder="Dui" autoComplete="off"  />
            <input {...register("username", {
                required:true
            })} className={checkError("username")} type="text" placeholder="Username"  autoComplete="off" />
            <input {...register("password", {
                required:true
            })} className={checkError("password")} type="password" placeholder="Password" autoComplete="off"  />
            <button className="form-nuevo__button">Guardar</button>
        </form>
    </div>
}

export default FormProfesor