import { create } from "zustand";
import { findAllAsignaturasAula } from "../api/evaluacion";
import { useAuthStore } from "./auth";


export const useEvaluacionStore = create((set, get) => ({
    asignaturasAula: [],
    asignaturas: [],
    aulas: [],
    updateAulaSelected: (aulaId) => {
        const {asignaturasAula} = get()
        const asignaturas = asignaturasAula.filter((row)=>{
            return row.aula.id === aulaId
        }).map(row=>row.asignatura)
        set(()=>({asignaturas}))
    },
    loadAsignaturasAula: async () => {
        try {
            const { user } = useAuthStore.getState()
            const res = await findAllAsignaturasAula(user.username)
            const aulas = []            
            res.data.forEach(row => {
                const {aula} = row 
                const reg = aulas.find(a => a.id === aula.id)
                if (!reg) {
                    aulas.push(aula)
                }
            });
            const aulaSelected = aulas[0]
            const asignaturas = res.data.filter((row)=>{
                return row.aula.id === aulaSelected.id
            }).map(row=>row.asignatura)

            set(() => ({ asignaturasAula: res.data, aulas, asignaturas }))
        } catch (error) { }
    }
}))