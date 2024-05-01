import evaluacionApi from "../libs/axios"

export const findAllAsignaturasAula = async(username, aulaId) => evaluacionApi.get(`/asignaturaAula/${username}/`)