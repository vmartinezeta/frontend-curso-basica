import { useForm } from "react-hook-form"
import { useAulaStore } from "../store/useAula"
import { usePageStore } from "../store/usePage"


function FormAdmin() {
    const {isActiveForm, setLoadPage} = usePageStore()
    const { reset, register, handleSubmit } = useForm()
    const { createAdmin } = useAulaStore()

    const onSubmit = handleSubmit(async (data) => {
        setLoadPage(false)
        await createAdmin(data)
        reset()
        setLoadPage(true)
    })


    if (!isActiveForm) return null

    return <div className="main__col main__col--der">
        <form className="form-nuevo" onSubmit={onSubmit}>
            <input {...register("username")} className="form-nuevo__input" type="text" placeholder="username" />
            <input {...register("password")} className="form-nuevo__input" type="password" placeholder="Password" />
            <button className="form-nuevo__button">Guardar</button>
        </form>
    </div>
}

export default FormAdmin