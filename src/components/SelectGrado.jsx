import { useEffect } from "react"
import { useAulaStore } from "../store/useAula"

function SelectGrado({register, selected}) {
    const { loadGrados, grados } = useAulaStore()

    useEffect(() => {
        loadGrados()    
    }, [])
    
    console.log(selected)


    return <select className="formNew__select" {...register("grado")} >
        {
            grados.map(g => {
                return <option key={g.id} value={g.id}>{g.nombre_largo}</option>
            })
        }
    </select>
}

export default SelectGrado