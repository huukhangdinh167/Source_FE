// import axios from "axios"
import axios from "../setup/axios"


const registerNewUser = (email, username, password, phone) => {
    return axios.post("/api/v1/register", {
        email, username, password, phone
    })
}

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
    registerNewUser, loginNewUser, fetchAllUsser, deletuser, fetchGroup,createNewUser, updateNewUser, getUserAccount, logoutUser
}