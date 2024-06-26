import { create } from "zustand";
import { persist } from "zustand/middleware";


export const useSelectedStore = create(persist((set) => ({
    cursoSelected: null,
    aulaSelected: null,
    periodoSelected: null,
    setPeriodoSelected: (periodoSelected) => {
        set(() => ({ periodoSelected }))
    },
    setCursoSelected: (cursoSelected) => {
        set(() => ({
            cursoSelected
        }))
    },
    setAulaSelected: (aulaSelected) => {
        set(() => ({
            aulaSelected
        }))
    },
    resetPeriodo: ()=> ({periodoSelected:null}),
    resetAll: ()=> ({cursoSelected:null, aulaSelected:null, periodoSelected:null})
}), {
    name: "selected"
}))