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
export {
    createNewRole, fetchAllRole, deletRole
}