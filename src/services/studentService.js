import axios from "../setup/axios" 


const fetchAllProject = () => {
    return axios.get("/api/v1/student/project/read")
}

export {
    fetchAllProject,
}