import axios from "../setup/axios" 


const fetchAllProject = (user) => {
    return axios.put("/api/v1/student/project/read", { data: { id: user.maSo } })
} 

//đăng kí nhóm 
const chooseGroup = (ortherST, mystudent, groupST) => {
    return axios.put("/api/v1/student/project/choosegroup",{ data: { ortherST: ortherST,mystudent : mystudent, groupST: groupST  }})
} 
// hủy đăng kí nhóm 
const cancelchooseGroup = (groupStudent) => {
    return axios.put("/api/v1/student/project/cancelchoosegroup",{ data: { groupStudent: groupStudent }})
} 

const fetchAllProjectRegister = (user) => {
    return axios.put("/api/v1/student/project/dadangki",{ data: { id: user.maSo } })
}
// lấy danh sách các sinh viên đã đăng kí 
const fetchAllUserRegiterProject = (user) => {
    return axios.put("/api/v1/student/project/useregistproject",{ data: { id: user.id } })
} 

const dangKiProject =(item, user)=>{ 
   
    return axios.put("/api/v1/student/dangki", { data: { projectId: item.id, id: user.maSo }  })
}

const huyDangKiProject =(user, lisProjectRegister)=>{ 
   
    return axios.put("/api/v1/student/huydangki", { data: {id: user.maSo,  projectId: lisProjectRegister.id }  })
}

export {
    fetchAllProject,dangKiProject,fetchAllProjectRegister,huyDangKiProject,fetchAllUserRegiterProject,chooseGroup,cancelchooseGroup
}