// import axios from "axios"
import axios from "../setup/axios"




const loginNewUser = (valueLogin, password) => {
    return axios.post("/api/v1/login", {
        valueLogin, password
    })
}

const fetchAllUsser = (page, limit) => {
    return axios.get(`/api/v1/user/read?page=${page}&limit=${limit}`)
}

const deletuser = (user) => {
    return axios.delete("/api/v1/user/delete", { data: { id: user.id } })
}

const fetchGroup = (data) => {
    return axios.get("/api/v1/group/read")
}


const createNewUser = (userData) => {
    return axios.post("/api/v1/user/create", {...userData})
} 

const updateNewUser = (userData) => {
    return axios.put("/api/v1/user/update", {...userData})
}


const getUserAccount =()=>{
    return axios.get("/api/v1/account")
}
const logoutUser =()=>{
    return axios.post("/api/v1/logout")
}
export {
    loginNewUser, fetchAllUsser, deletuser, fetchGroup,createNewUser, updateNewUser, getUserAccount, logoutUser
}