import axios from "axios";

const baseUrl = 'http://localhost:3001/api/persons'

const create = (newPerson) => {
    const request = axios.post(baseUrl, newPerson)
    return request.then((response) => response.data)
}

const fetchData = () => {
    const request = axios.get(baseUrl)
    return request.then((response) => response.data)
}

const deletePerson = (id) => {
    const url = `${baseUrl}/${id}`
    const request = axios.delete(url)
    return request.then((response) => response.data)
}

const update = (id, person) => {

    const url = `${baseUrl}/${id}`
    const request = axios.put(url, person)
    return request.then((response) => response.data)
}
const axiosUtil = {
    create,
    fetchData,
    deletePerson,
    update
}

export default axiosUtil
