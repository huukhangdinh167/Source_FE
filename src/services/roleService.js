import axios from "../setup/axios" 

const createNewRole = (role) => {
    return axios.post("/api/v1/role/create", [...role])
} 

const fetchAllRole = () => {
    return axios.get("/api/v1/role/read")
}

const deletRole = (role) => {
    return axios.delete("/api/v1/role/delete", { data: { id: role.id } })
} 

const fetchRoleByRole = (groupId) => {
    return axios.get(`/api/v1/role/by-group/${groupId}`)
}
const assignRoleToGroup = (data) => {
    return axios.post("/api/v1/role/assign-to-group", {data})
}
export {
    createNewRole, fetchAllRole, deletRole,fetchRoleByRole,assignRoleToGroup
}