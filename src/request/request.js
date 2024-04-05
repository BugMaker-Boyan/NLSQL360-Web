import axios from 'axios'

const service = axios.create({
    baseURL: "http://localhost:8080/"
})

service.interceptors.request.use(config => config)

service.interceptors.response.use(response => response, error => Promise.reject(error))

export default service
