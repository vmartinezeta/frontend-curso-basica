import { create } from "zustand"
import { useCursoStore } from "./useCursoStore";


export const usePageStore = create((set, get) => ({
    isActiveForm: false,
    isLoadPage: true,
    fromPage: 0,
    limit: 1000,
    actualPage: 1,
    totalPages: 1,
    paginar: async () => {
        const {calcularTotalCursos} = useCursoStore.getState()    
        const total = await calcularTotalCursos()
        const { limit } = get()
        const totalPages = Math.ceil(total / limit)
        set(() => ({ totalPages }))
    },
    nextPage: () => {
        const { actualPage, totalPages, limit } = get()
        if (actualPage === totalPages) {
            return
        }
        const fromPage = actualPage * limit
        const nextPage = actualPage + 1
        set(() => ({ actualPage: nextPage, fromPage }))
    },
    prevPage: () => {
        const { actualPage, limit } = get()
        if (actualPage === 1) {
            return
        }
        const prevPage = actualPage - 1
        const fromPage = (prevPage - 1) * limit
        set(() => ({ actualPage: prevPage, fromPage }))
    },
    activarForm: (active) => {
        set(() => ({ isActiveForm: active }))
    },
    toggleForm: () => {
        let { isActiveForm } = get()
        isActiveForm = !isActiveForm
        set(() => ({ isActiveForm }))
    },
    setLoadPage: (loadPage) => {
        set(() => ({ isLoadPage: loadPage }))
    },
}));