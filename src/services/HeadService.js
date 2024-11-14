import axios from "../setup/axios"  

const headGetProjectandUser = () => {
    return axios.get("/api/v1/head/getProjectandUser")
}
const headDeleteProjct = (item) => {
    return axios.delete("/api/v1/head/delete-project",  { data: { id: item.id } })
}
// head Xóa đăng kí đề tài của Student
const headHuyDangKi =(student)=>{ 
   
    return axios.put("/api/v1/head/huydangki-detai-sinhvien", { data: {maSo: student.maSo, groupStudent: student.groupStudent }  })
} 
//xem danh sách đề tài cần duyệt 
const headGetProjectApprove = () => {
    return axios.get("/api/v1/head/getProjectApprove")
} 

// duyệt đề tài 
const headApproveFroject =(item)=>{ 
   
    return axios.put("/api/v1/head/project-approve", { data: {id: item.id}  })
} 

export {
    headGetProjectandUser,headDeleteProjct,headHuyDangKi,headGetProjectApprove,headApproveFroject
}