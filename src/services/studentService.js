import axios from "../setup/axios" 


const fetchAllProject = (user) => {
    return axios.put("/api/v1/student/project/read", { data: { id: user.maSo } })
} 

const fetchAllProjectRegister = (user) => {
    return axios.put("/api/v1/student/project/dadangki",{ data: { id: user.maSo } })
}

const dangKiProject =(item, user)=>{ 
   
    return axios.put("/api/v1/student/dangki", { data: { projectId: item.id, id: user.maSo }  })
}

const huyDangKiProject =(user, lisProjectRegister)=>{ 
   
    return axios.put("/api/v1/student/huydangki", { data: {id: user.maSo,  projectId: lisProjectRegister.id }  })
}

export {
    fetchAllProject,dangKiProject,fetchAllProjectRegister,huyDangKiProject
}