import { useEffect } from "react"
import { usePageStore } from "../store/usePage"
import { useForm } from "react-hook-form"
import { useEvaluacionStore } from "../store/useEvaluacion"
import { useSelectedStore } from "../store/useSelected"



function FormPeriodo() {
    const { cursoSelected } = useSelectedStore()
    const { setLoadPage, isActiveForm } = usePageStore()
    const { register, handleSubmit } = useForm()
    const { loadTipos, tipos, createPeriodo } = useEvaluacionStore()


    useEffect(() => {
        loadTipos()
    }, [])

    if (!isActiveForm) return null


    const onSubmit = handleSubmit(async (data) => {
        setLoadPage(false)
        await createPeriodo(data)
        setLoadPage(true)
    })


    return <div className="main__col main__col--der">
        <form className="form-nuevo" onSubmit={onSubmit}>
            <h1 className="form-nuevo__title"><span className="form-nuevo__subtitle">{cursoSelected.anyo}</span>Año lectivo</h1>
            <select className="form-nuevo__select" {...register("tipoId")}>
                {
                    tipos.map((tipo) => {
                        return <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
                    })
                }
            </select>
            <button className="form-nuevo__button">Guardar</button>
        </form>
    </div>
}

export default FormPeriodo