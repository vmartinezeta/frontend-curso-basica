import { create } from "zustand";
import { persist } from "zustand/middleware";


export const useSelectedStore = create(persist((set)=>({
    cursoSelected: null,
    aulaSelected: null,
    asignacionIdSelected:null,
    setAsignacionIdSelected: (asignacionIdSelected)=> {
        set(()=>({asignacionIdSelected}))
    },
    setCursoSelected: (cursoSelected)=>{
        set(()=>({
            cursoSelected
        }))
    },
    setAulaSelected: (aulaSelected) => {
        set(()=>({
            aulaSelected
        }))
    }
}), {
    name:"selected"
}))