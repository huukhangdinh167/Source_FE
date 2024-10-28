import axios from "axios"

const registerNewUser = (email, username, password, phone) => {
    return axios.post("http://localhost:8888/api/v1/register", {
        email, username, password, phone
    })
}

const loginNewUser = (valueLogin, password) => {
    return axios.post("http://localhost:8888/api/v1/login", {
        valueLogin, password
    })
}

const fetchAllUsser = (page, limit) => {
    return axios.get(`http://localhost:8888/api/v1/user/read?page=${page}&limit=${limit}`)
}

const deletuser = (user) => {
    return axios.delete("http://localhost:8888/api/v1/user/delete", { data: { id: user.id } })
}

const fetchGroup = (data) => {
    return axios.get("http://localhost:8888/api/v1/group/read")
}


const createNewUser = (userData) => {
    return axios.post("http://localhost:8888/api/v1/user/create", {...userData})
} 

const updateNewUser = (userData) => {
    return axios.put("http://localhost:8888/api/v1/user/update", {...userData})
}




export {
    registerNewUser, loginNewUser, fetchAllUsser, deletuser, fetchGroup,createNewUser, updateNewUser
}