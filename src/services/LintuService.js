import axios from 'axios'
const baseUrl = '/api/lintudb/'
const havaintoUrl = '/api/lintudb/havainto'
const lintuUrl = '/api/lintudb/lintu'
const userUrl = '/api/lintudb/user'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const getHavainto = () => {
    const request = axios.get(havaintoUrl)
    return request.then(response => response.data)
}

const getLintu = () => {
    const request = axios.get(lintuUrl)
    return request.then(response => response.data)
}

const getUser = () => {
    const request = axios.get(userUrl)
    return request.then(response => response.data)
}

const createHavainto = newObject => {
    const request = axios.post(havaintoUrl, newObject)
    return request.then(response => response.data)
}

const updateHavainto = (id, newObject) => {
    const request = axios.put(`${havaintoUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

const removeHavainto = (id) => {
    const request = axios.delete(`${havaintoUrl}/${id}`)
    return request.then(response => response.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, getHavainto, getLintu, getUser, createHavainto, updateHavainto, removeHavainto }