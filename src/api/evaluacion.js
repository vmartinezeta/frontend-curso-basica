import evaluacionApi from "../libs/axios"

export const findAllAsignaturasAula = async(username, aulaId) => evaluacionApi.get(`/asignaturaAula/${username}/`)

export const findEvaluacionByAula = async(aulaId) => evaluacionApi.get(`/evaluacion/${aulaId}`)

export const createEvaluacion = async(tabla) => evaluacionApi.post(`/evaluacion`, tabla)
