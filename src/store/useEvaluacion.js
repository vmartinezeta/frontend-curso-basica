import { create } from "zustand"
import { createEvaluacion, findAllAsignaturasAula, findEvaluacionByAula } from "../api/evaluacion"
import { useAuthStore } from "./auth"
import { useSelectedStore } from "./useSelected"



export const useEvaluacionStore = create((set, get) => ({
    asignaturasAula: [],
    asignaturas: [],
    aulas: [],
    evaluacion: [],
    rowSelected: null,
    setRowSelected: (rowSelected) => {
        set(() => ({ rowSelected }))
    },
    updateEvaluacion: (rowSelected) => {
        const { evaluacion } = get()
        const index = evaluacion.findIndex(eva => eva.alumnoAula.id === rowSelected.alumnoAula.id)
        evaluacion[index] = rowSelected
        set(() => ({ evaluacion }))
    },
    createEvaluacion: (tabla) => {
        try {
            createEvaluacion(tabla)
        } catch (error) { }
    },
    loadEvaluacion: async (aulaId) => {
        try {
            const res = await findEvaluacionByAula(aulaId)
            set(() => ({ evaluacion: res.data }))
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },
    updateAulaSelected: (aulaId) => {
        const { asignaturasAula } = get()
        const asignaturas = asignaturasAula.filter((row) => {
            return row.aula.id === aulaId
        }).map(row => row.asignatura)
        set(() => ({ asignaturas }))
    },
    loadAsignaturasAula: async () => {
        try {
            const { user } = useAuthStore.getState()
            const res = await findAllAsignaturasAula(user.username)
            const asignaciones = res.data
            const aulas = []
            asignaciones.forEach(row => {
                const { aula } = row
                const reg = aulas.find(a => a.id === aula.id)
                if (!reg) {
                    aulas.push(aula)
                }
            });
            const aulaSelected = aulas[0]
            const asignaturas = asignaciones.filter((row) => {
                return row.aula.id === aulaSelected.id
            }).map(row => row.asignatura)


            const asignacionSelected = asignaciones.find(asignacion=>asignacion.id)
            const asignacionIdSelected = asignacionSelected.id
            const { loadEvaluacion } = get()
            loadEvaluacion(aulaSelected.id)

            const {setAsignacionIdSelected} = useSelectedStore.getState()
            setAsignacionIdSelected(asignacionIdSelected)
            set(() => ({ asignaturasAula: res.data, aulas, asignaturas}))
        } catch (error) { }
    }
}))