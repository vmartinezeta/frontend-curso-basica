import evaluacionApi from "../libs/axios"

export const findAllAsignacionesRequest = async (username) => evaluacionApi.get(`/asignaturaAula/${username}`)


export const findEvaluacionByAulaRequest = async (aulaId, asignacionId, periodoId) => evaluacionApi.get(`/evaluacion/${aulaId}/${asignacionId}/${periodoId}`)
export const createEvaluacionRequest = async (tabla) => evaluacionApi.post(`/evaluacion`, tabla)


export const findAllPeriodoRequest = async () => evaluacionApi.get("/periodo")
export const findAllTipoPeriodoRequest = async () => evaluacionApi.get("/tipoPeriodo")


export const createPeriodoRequest = async (periodo) => evaluacionApi.post("/periodo", periodo)
export const togglePeriodoRequest = async (periodoId) => evaluacionApi.put("/periodo/" + periodoId)
export const findPeriodoActivoRequest = async () => evaluacionApi.get("/periodoActivo")