import { create } from "zustand"
import { createEvaluacionRequest, createPeriodoRequest, findAllAsignacionesRequest, findAllPeriodoRequest, findAllTipoPeriodoRequest, findEvaluacionByAulaRequest, findPeriodoActivoRequest, togglePeriodoRequest } from "../api/evaluacion"
import { useAuthStore } from "./auth"
import { useSelectedStore } from "./useSelected"



export const useEvaluacionStore = create((set, get) => ({
    asignaciones: [],
    asignaturas: [],
    aulas: [],
    evaluaciones: [],
    periodos: [],
    tipos: [],
    rowSelected: null,
    aulaId: 0,
    asignacionId: 0,
    togglePeriodo: async (periodoId) => {
        try {
            await togglePeriodoRequest(periodoId)
        } catch (error) { }
    },
    createPeriodo: async (periodo) => {
        try {
            const { cursoSelected } = useSelectedStore.getState()
            periodo.cursoId = cursoSelected.id
            await createPeriodoRequest(periodo)
        } catch (error) { }
    },
    loadTipos: async () => {
        try {
            const res = await findAllTipoPeriodoRequest()
            set(() => ({ tipos: res.data }))
        } catch (error) { }
    },
    loadPeriodoActivo: async () => {
        try {
            const res = await findPeriodoActivoRequest()
            const { setPeriodoSelected } = useSelectedStore.getState()
            setPeriodoSelected(res.data)
        } catch (error) { }
    },
    loadPeriodos: async () => {
        try {
            const res = await findAllPeriodoRequest()
            set(() => ({ periodos: res.data }))
        } catch (error) { }
    },
    setRowSelected: (rowSelected) => {
        set(() => ({ rowSelected }))
    },
    updateEvaluacion: (evaluacion) => {
        const { evaluaciones } = get()
        const index = evaluaciones.findIndex(actual => actual.alumnoAula.id === evaluacion.alumnoAula.id)
        evaluaciones[index] = evaluacion
        set(() => ({ evaluaciones }))
    },
    createEvaluaciones: (evaluaciones) => {
        try {
            createEvaluacionRequest(evaluaciones)
        } catch (error) { }
    },
    loadEvaluacion: async (aulaId, asignacionId, periodoId) => {
        try {
            const res = await findEvaluacionByAulaRequest(aulaId, asignacionId, periodoId)
            set(() => ({ evaluaciones: res.data }))
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },
    updateAsignacionByAula: (aulaId) => {
        const { asignaciones, loadEvaluacion } = get()
        const asignacionSelected = asignaciones.find(asignacion => {
            return asignacion.aula.id === aulaId
        })


        const asignacionId = asignacionSelected.id

        const asignaturas = asignaciones.filter(asignacion => {
            return asignacion.aula.id === aulaId
        }).map(asignacion => asignacion.asignatura)

        const { periodoSelected } = useSelectedStore.getState()
        loadEvaluacion(aulaId, asignacionId, periodoSelected.id)

        set(() => ({ asignaturas, aulaId, asignacionId }))
    },
    updateAsignacionByAsignatura: (asignaturaId) => {
        const { aulaId, asignaciones, loadEvaluacion } = get()
        const asignacion = asignaciones.find(asignacion => asignacion.aula.id === aulaId && asignacion.asignatura.id === asignaturaId)
        set(() => ({ asignacionId: asignacion.id }))
        const { periodoSelected } = useSelectedStore.getState()
        loadEvaluacion(aulaId, asignacion.id, periodoSelected.id)
    },
    loadAsignaciones: async () => {
        try {
            const { user } = useAuthStore.getState()
            const res = await findAllAsignacionesRequest(user.username)
            const asignaciones = res.data
            const aulas = []
            asignaciones.forEach(asignacion => {
                const { aula } = asignacion
                const actual = aulas.find(a => a.id === aula.id)
                if (!actual) {
                    aulas.push(aula)
                }
            });
            const [asignacionSelected] = asignaciones
            const aulaId = asignacionSelected.aula.id

            const asignaturas = asignaciones.filter(asignacion => {
                return asignacion.aula.id === aulaId
            }).map(asignacion => asignacion.asignatura)


            const asignacionId = asignacionSelected.id

            const { loadEvaluacion } = get()
            const { periodoSelected } = useSelectedStore.getState()
            loadEvaluacion(aulaId, asignacionId, periodoSelected.id)
            set(() => ({ asignaciones, aulas, asignaturas, aulaId, asignacionId }))
        } catch (error) { }
    }
}))