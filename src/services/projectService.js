import axios from "../setup/axios";

const fetchAllProject = (user) => {
    return axios.put(`/api/v1/teacher/projects/read`, {
        data: { id: user.maSo }
    })
}

const createNewProject = (projectData) => {
    return axios.put("/api/v1/teacher/projects/create", {
        ...projectData,
    })
}

const updateCurrentProject = (projectData) => {
    return axios.put("/api/v1/teacher/projects/update", { ...projectData })
}

const deleteProject = (user) => {
    return axios.delete("/api/v1/teacher/projects/delete", { data: { id: user.id } })
}

export {
    fetchAllProject, createNewProject, updateCurrentProject, deleteProject
}