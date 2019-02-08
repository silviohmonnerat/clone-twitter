import Axios from 'axios'

const api = Axios.create({
    //baseURL: "http://localhost:3000"
    //baseURL: "http://10.0.2.2:3000"
    //baseURL: "http://10.0.3.2:3000"
    //baseURL: "http://192.168.56.1:3000"
    baseURL: "http://192.168.0.6:3000"
})

export default api