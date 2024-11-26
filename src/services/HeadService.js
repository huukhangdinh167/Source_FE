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
    return axios.put("/api/v1/head/project-approve", { data: {id: item.id, name: item.name}  })
}  
// từ chối duyệt đề tài 
const headRefuseFroject =(item, reasonrefuse)=>{ 
    return axios.put("/api/v1/head/project-refuse", { data: {id: item.id, name: item.name, reasonrefuse: reasonrefuse}  })
}  

const headFetchListTeacher =()=>{ 
    return axios.get("/api/v1/head/project-get-list-teacher")
} 
const test =()=>{
    return axios.get("/api/v1/head/project-test")
} 

const GetDSHoiDong =()=>{
    return axios.get("/api/v1/head/get-danh-sach-hoi-dong")
} 
const AssignPB1and2 =(data)=>{
    return axios.put("/api/v1/head/assignPB1and2",
     { data: {pb1: data.PB.pb1, pb2: data.PB.pb2, groupStudent: data.selectedStudent.groupStudent,
         id: data.selectedStudent.id, idProject: data.selectedStudent.Project.id, instuctor: data.selectedStudent.Project.instuctor}  })
}

export {
    headGetProjectandUser,headDeleteProjct,headHuyDangKi,headGetProjectApprove,
    headApproveFroject,headFetchListTeacher,test,AssignPB1and2,headRefuseFroject,GetDSHoiDong
}