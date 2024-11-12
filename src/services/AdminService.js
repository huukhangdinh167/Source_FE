// import axios from "axios"
import axios from "../setup/axios"


///////-----------------Role và Assign Role  của Admin kế thừa từ roleService.js --------------
// const assignRoleToGroup = (data) => {
//     return axios.post("/api/v1/role/assign-to-group", {data})
// }
// const deletRole = (role) => {
//     return axios.delete("/api/v1/role/delete", { data: { id: role.id } })
// } 
// const createNewRole = (role) => {
//     return axios.post("/api/v1/role/create", [...role])
// } 
const admincreateNewTeacher = (role) => {
    return axios.post("/api/v1/admin/create-teacher", {...role})
} 
const admindeletuser = (user) => {
    return axios.delete("/api/v1/admin/delete-user",  { data: { maSo: user.maSo } })
}
const adminCreateNewUser = (role) => {
    return axios.post("/api/v1/admin/create-user", [...role])
} 
const AdminFetchAllUsser = (page, limit) => {
    return axios.get(`/api/v1/admin/read-user?page=${page}&limit=${limit}`)
}
const adminupdateNewUser = (userData) => {
    return axios.put("/api/v1/admin/update-user", {...userData})
}
export {
    AdminFetchAllUsser,adminCreateNewUser,adminupdateNewUser,admincreateNewTeacher,admindeletuser
}