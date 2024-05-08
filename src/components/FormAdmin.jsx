import { useForm } from "react-hook-form"
import { useAulaStore } from "../store/useAula"
import { usePageStore } from "../store/usePage"


function FormAdmin() {
    const { isActiveForm, setLoadPage } = usePageStore()
    const { reset, register, handleSubmit, formState:{errors} } = useForm()
    const { createAdmin } = useAulaStore()

    const onSubmit = handleSubmit(async (data) => {
        setLoadPage(false)
        await createAdmin(data)
        reset()
        setLoadPage(true)
    })


    if (!isActiveForm) return null


    const checkError = name => {
        if (errors[name]) {
            return "form-nuevo__input form-nuevo__input--error"
        } else {
            return "form-nuevo__input"
        }
    }


    return <div className="main__col main__col--der">
        <form className="form-nuevo" onSubmit={onSubmit}>
            <h1 className="form-nuevo__title"><span className="form-nuevo__subtitle">Nuevo</span>Admin</h1>
            <input {...register("username",{
                required:true                
            })} className={checkError("username")} type="text" placeholder="Username" autoComplete="off" autoFocus={true} />
            <input {...register("password", {
                required:true
            })} className={checkError("password")} type="password" placeholder="Password" autoComplete="off" />
            <button className="form-nuevo__button">Guardar</button>
        </form>
    </div>
}

export default FormAdmin