import evaluacionApi from "../libs/axios"

export const findAllAsignaturasAula = async(aula, username) => evaluacionApi.get(`/evaluacion/${aula}/${username}`)