import aulaApi from "../libs/axios"


export const createAulaRequest = async (aula) => aulaApi.post("/aula", aula)
export const findAllAulaRequest = async (id) => aulaApi.get("/aula/"+id)
export const updateAulaRequest = async (id, aula) => aulaApi.put("/aula/" + id, aula)
export const deleteAulaRequest = async (id) => aulaApi.delete("/aula/" + id)



export const findAllGradoRequest = async () => aulaApi.get("/grado")
export const createGradoRequest = async (grado) => aulaApi.post("/grado", grado)
export const deleteGradoRequest = async (id) => aulaApi.delete("/grado/" + id)
export const updateGradoRequest = async (id, grado) => aulaApi.put("/grado/" + id, grado)



export const findAllSeccionRequest = async () => aulaApi.get("/seccion")



export const totalPagesRequest = async () => aulaApi.get("/curso")



export const findAllAsignacionRequest = async (aulaId) => aulaApi.get("/asignacion/"+aulaId)
export const createAsignacionRequest = async (asignacion) => aulaApi.post("/asignacion", asignacion)


export const createAdminRequest = async (admin) => aulaApi.post("/admin", admin)
export const findAllAdminRequest = async () => aulaApi.get("/admin")
export const deleteAdminRequest = async (id) => aulaApi.delete("/admin/"+id)




export const findAllProfesorRequest = async () => aulaApi.get("/profesor")
export const createProfesorRequest = async (profesor) => aulaApi.post("/profesor",profesor)
export const deleteProfesorRequest = async (profesorId) => aulaApi.delete("/profesor/"+profesorId)
export const updateProfesorRequest = async (profesorId, profesor) => aulaApi.put("/profesor/"+profesorId, profesor)



export const findAllAsignaturaRequest = async () => aulaApi.get("/asignatura")
export const createAsignaturaRequest = async (asignatura) => aulaApi.post("/asignatura", asignatura)
export const deleteAsignaturaRequest = async (id) => aulaApi.delete("/asignatura/"+id)
export const updateAsignaturaRequest = async (id, asignatura) => aulaApi.put("/asignatura/"+id, asignatura)




export const findAllCursoRequest = async (from, to) => aulaApi.get(`/curso/${from}/${to}`)
export const createCursoRequest = async (curso) => aulaApi.post("/curso", curso)
export const toggleCursoRequest = async (id) => aulaApi.put("/curso/" + id)
export const updateCursoRequest = async (id, curso) => aulaApi.patch("/curso/" + id, curso)
export const deleteCursoRequest = async (id) => aulaApi.delete("/curso/" + id)




export const findAllAlumnoRequest = async (aulaId) => aulaApi.get("/alumnoAula/" + aulaId)
export const createAlumnoRequest = async (alumnoAula) => aulaApi.post("/alumnoAula", alumnoAula)
export const deleteAlumnoRequest = async (id) => aulaApi.delete("/alumno/" + id)
export const updateAlumnoRequest = async (id, alumno) => aulaApi.put("/alumnoAula/" + id, alumno)