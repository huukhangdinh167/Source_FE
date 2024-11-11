// import axios from "axios"
import axios from "../setup/axios"





const adminCreateNewUser = (role) => {
    return axios.post("/api/v1/admin/create-user", [...role])
} 
const AdminFetchAllUsser = (page, limit) => {
    return axios.get(`/api/v1/admin/read-user?page=${page}&limit=${limit}`)
}


export {
    AdminFetchAllUsser,adminCreateNewUser
}