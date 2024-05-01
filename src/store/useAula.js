import { create } from "zustand";
import { createAdminRequest, createAlumnoRequest, createAsignacionRequest, createAsignaturaRequest, createAulaRequest, createCursoRequest, createGradoRequest, createProfesorRequest, deleteAdminRequest, deleteAlumnoRequest, deleteAsignaturaRequest, deleteAulaRequest, deleteCursoRequest, deleteGradoRequest, deleteProfesorRequest, findAllAdminRequest, findAllAlumnoRequest, findAllAsignacionRequest, findAllAsignaturaRequest, findAllAulaRequest, findAllCursoRequest, findAllGradoRequest, findAllProfesorRequest, findAllSeccionRequest, toggleCursoRequest, totalPagesRequest, updateAlumnoRequest, updateAsignaturaRequest, updateAulaRequest, updateCursoRequest, updateGradoRequest, updateProfesorRequest } from "../api/aula";
import { useSelectedStore } from "./useSelected";


export const useAulaStore = create((set, get) => ({
    grados: [],
    secciones: [],
    asignaturas: [],
    aulas: [],
    alumnos: [],
    profesores: [],
    asignaciones: [],
    admins: [],
    adminSelected: null,
    alumnoSelected: null,
    gradoSelected: null,
    asignaturaSelected: null,
    profesorSelected: null,
    asignacionSelected: null,
    createAula: async (aula) => {
        try {
            const { cursoSelected } = useSelectedStore.getState()
            aula.cursoId = cursoSelected.id
            await createAulaRequest(aula)
        } catch (error) { }
    },
    updateAula: async (id, aula) => {
        try {
            updateAulaRequest(id, aula)
        } catch (error) { }
    },
    deleteAula: async (id) => {
        try {
            deleteAulaRequest(id)
        } catch (error) { }
    },
    loadAulas: async () => {
        try {
            const { cursoSelected } = useSelectedStore.getState()
            const res = await findAllAulaRequest(cursoSelected.id)
            set((state) => ({ aulas: res.data }))
        } catch (error) { }
    },
    createGrado: async (grado) => {
        try {
            await createGradoRequest(grado)
        } catch (error) { }
    },
    setGradoSelected: (gradoSelected) => {
        set(() => ({ gradoSelected }))
    },
    deleteGrado: async (id) => {
        try {
            await deleteGradoRequest(id)
        } catch (error) { }
    },
    updateGrado: async(id, grado) => {
        try {
            await updateGradoRequest(id, grado)
        } catch (error) { }
    },
    loadGrados: async () => {
        try {
            const res = await findAllGradoRequest()
            set(() => ({ grados: res.data }))
        } catch (error) { }
    },
    loadAsignaturas: async () => {
        try {
            const res = await findAllAsignaturaRequest()
            set(() => ({ asignaturas: res.data }))
        } catch (error) { }
    },
    setAsignaturaSelected: (asignaturaSelected) => {
        set(() => ({ asignaturaSelected }))
    },
    createAsignatura: async (asignatura) => {
        try {
            await createAsignaturaRequest(asignatura)
        } catch (error) { }
    },
    deleteAsignatura: async (id) => {
        try {
            await deleteAsignaturaRequest(id)
        } catch (error) { }
    },
    updateAsignatura: async (id, asignatura) => {
        try {
            await updateAsignaturaRequest(id, asignatura)
        } catch (error) { }
    },
    loadSecciones: async () => {
        try {
            const res = await findAllSeccionRequest()
            set(() => ({ secciones: res.data }))
        } catch (error) { }
    },
    loadAlumnos: async () => {
        try {
            const {aulaSelected} = useSelectedStore.getState()
            const res = await findAllAlumnoRequest(aulaSelected.id)
            
            set(() => ({ alumnos: res.data }))
        } catch (error) { }
    },
    createAlumno: async (alumnoAula) => {
        try {
            const {aulaSelected} = useSelectedStore.getState()
            alumnoAula.aulaId = aulaSelected.id
            await createAlumnoRequest(alumnoAula)
        } catch (error) { }
    },
    setAlumnoSelected: (alumnoSelected) => {
        set(() => ({ alumnoSelected }))
    },
    deleteAlumno: async (id) => {
        try {
            deleteAlumnoRequest(id)
        } catch (error) { }
    },
    updateAlumno: async (id, alumno) => {
        try {
            await updateAlumnoRequest(id, alumno)
        } catch (error) { }
    },
    loadProfesores: async () => {
        try {
            const res = await findAllProfesorRequest()
            set(() => ({ profesores: res.data }))
        } catch (error) { }
    },
    setProfesorSelected: (profesorSelected) => {
        set(() => ({ profesorSelected }))
    },
    createProfesor: async (profesor) => {
        try {
            await createProfesorRequest(profesor)
        } catch (error) { }
    },
    updateProfesor: async (id, profesor) => {
        try {
            await updateProfesorRequest(id, profesor)            
        } catch (error) {}
    },
    deleteProfesor: async (profesorId) => {
        try {
            deleteProfesorRequest(profesorId)
        } catch (error) { }
    },
    loadAsignaciones: async (aulaId) => {
        try {
            const res = await findAllAsignacionRequest(aulaId)
            set(() => ({ asignaciones: res.data }))
        } catch (error) { }
    },
    createAsignacion: async (asignacion) => {
        try {
            const {aulaSelected}=useSelectedStore.getState()
            asignacion.aulaId = aulaSelected.id
            await createAsignacionRequest(asignacion)
        } catch (error) { }
    },
    createAdmin: async (admin) => {
        try {
            await createAdminRequest(admin)
        } catch (error) { }
    },
    loadAdmins: async () => {
        try {
            const res = await findAllAdminRequest()
            set(() => ({ admins: res.data }))
        } catch (error) { }
    },
    setAdminSelected: (adminSelected) => {
        set(() => ({ adminSelected }))
    },
    deleteAdmin: async (id) => {
        try {
            await deleteAdminRequest(id)
        } catch (error) { }
    }
}))