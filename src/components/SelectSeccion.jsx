import { useEffect } from "react"
import { useAulaStore } from "../store/useAula"

function SelectSeccion({register}) {
    const { loadSecciones, secciones } = useAulaStore()

    useEffect(() => {
        loadSecciones()
    }, [])


    return <select className="formNew__select" {...register("seccion")} >
        {
            secciones.map(s => {
                return <option key={s.id} value={s.id}>{s.letra}</option>
            })
        }
    </select>
}

export default SelectSeccion