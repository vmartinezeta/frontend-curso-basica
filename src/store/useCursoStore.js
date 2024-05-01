import { create } from "zustand";
import { createCursoRequest, deleteCursoRequest, findAllCursoRequest, toggleCursoRequest, totalPagesRequest, updateCursoRequest } from "../api/aula";



export const useCursoStore = create((set, get) => {
    return ({
        cursos: [],
        updateCurso: async (id, curso) => {
            try {
                await updateCursoRequest(id, curso);
            } catch (error) { }
        },
        deleteCurso: async (id) => {
            try {
                await deleteCursoRequest(id);
            } catch (error) { }
        },
        toggleCurso: async (id) => {
            try {
                await toggleCursoRequest(id);
            } catch (error) { }
        },
        createCurso: async (curso) => {
            try {
                await createCursoRequest(curso);
            } catch (error) { }
        },
        loadCursos: async (from, to) => {
            try {
                const res = await findAllCursoRequest(from, to);
                set((state) => ({ cursos: res.data }));
            } catch (error) { }
        },
        calcularTotalCursos: async () => {
            try {                
                const res = await totalPagesRequest();
                return res.data
            } catch (error) {
                return 1
            }
        }
    })
})