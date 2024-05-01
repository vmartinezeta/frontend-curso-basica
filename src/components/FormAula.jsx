import { useForm } from "react-hook-form"
import { useAulaStore } from "../store/useAula"
import { usePageStore } from "../store/usePage"
import { useEffect } from "react"
import { useSelectedStore } from "../store/useSelected"


function FormAula() {

    const { isActiveForm, setLoadPage, activarForm } = usePageStore()
    const { grados, secciones } = useAulaStore()
    const {aulaSelected} = useSelectedStore()
    const { updateAula, createAula, loadGrados, loadSecciones } = useAulaStore()
    const { setValue, register, handleSubmit } = useForm({
        defaultValues: {
            gradoId: 1,
            seccionId: 1
        }
    })

    useEffect(() => {
        activarForm(false)
        loadGrados()
        loadSecciones()
    }, [])


    useEffect(() => {
        
        if (aulaSelected !== null) {
            setValue("gradoId", aulaSelected.grado.id)
            setValue("seccionId", aulaSelected.seccion.id)
        } else {
            setValue("gradoId", 1)
            setValue("seccionId", 1)
        }
    }, [aulaSelected])


    const onSubmit = handleSubmit(async (data) => {
        setLoadPage(false)
        if (aulaSelected !== null) {
            await updateAula(aulaSelected.id, data)
        } else {
            await createAula(data)
        }
        setLoadPage(true)
    })

    if (!isActiveForm) return null

    return <div className="main__col main__col--der">
        <form className="formNew" onSubmit={onSubmit}>
            <h1 className="formNew__titulo">{aulaSelected !== null ? "Editando aula" : "Nueva aula"}</h1>
            <select className="formNew__select" {...register("gradoId")} defaultChecked={aulaSelected !== null && aulaSelected.gID}>
                {
                    grados.map(g => {
                        return <option key={g.id} value={g.id} >{g.nombre_largo}</option>
                    })
                }
            </select>
            <select className="formNew__select" {...register("seccionId")} defaultChecked={aulaSelected !== null && aulaSelected.sID} >
                {
                    secciones.map(s => {
                        return <option key={s.id} value={s.id}>{s.letra}</option>
                    })
                }
            </select>
            <button className="formNew__button">{aulaSelected !== null ? "Actualizar" : "Guardar"}</button>
        </form>
    </div>
}

export default FormAula