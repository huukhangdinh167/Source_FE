import axios from "../setup/axios"

const headGetProjectandUser = () => {
    return axios.get("/api/v1/head/getProjectandUser")
}
const headDeleteProjct = (item) => {
    return axios.delete("/api/v1/head/delete-project", { data: { id: item.id } })
}
// head Xóa đăng kí đề tài của Student
const headHuyDangKi = (student) => {

    return axios.put("/api/v1/head/huydangki-detai-sinhvien", { data: { maSo: student.maSo, groupStudent: student.groupStudent } })
}
//xem danh sách đề tài cần duyệt 
const headGetProjectApprove = () => {
    return axios.get("/api/v1/head/getProjectApprove")
}

// duyệt đề tài 
const headApproveFroject = (item) => {
    return axios.put("/api/v1/head/project-approve", { data: { id: item.id, name: item.name } })
}
// từ chối duyệt đề tài 
const headRefuseFroject = (item, reasonrefuse) => {
    return axios.put("/api/v1/head/project-refuse", { data: { id: item.id, name: item.name, reasonrefuse: reasonrefuse } })
}

const headFetchListTeacher = () => {
    return axios.get("/api/v1/head/project-get-list-teacher")
}
const test = () => {
    return axios.get("/api/v1/head/project-test")
}

const GetDSHoiDong = () => {
    return axios.get("/api/v1/head/get-danh-sach-hoi-dong")
} 

const GetAllListTeacherHoiDong = () => {
    return axios.get("/api/v1/head/getlistTeacherHoiDong")
}
const AssignPB1and2 = (data) => {
    return axios.put("/api/v1/head/assignPB1and2",
        {
            data: {
                pb1: data.PB.pb1, pb2: data.PB.pb2, groupStudent: data.selectedStudent.groupStudent,
                id: data.selectedStudent.id, idProject: data.selectedStudent.Project.id, instuctor: data.selectedStudent.Project.instuctor
            }
        })
}

const AssignHoiDong = (data) => {
    return axios.put("/api/v1/head/assignHoiDong",
        {
            data: {
                CTHD: data.HoiDong.CTHD, TK: data.HoiDong.TK, UV: data.HoiDong.UV, 
                Poster1: data.HoiDong.Poster1, Poster2: data.HoiDong.Poster2,
                groupStudent: data.selectedStudent.groupStudent,
                id: data.selectedStudent.id
            }
        })
}

const AssignPoster = (data) => {
    return axios.put("/api/v1/head/assignPoster",
        {
            data: {
               
                Poster1: data.Poster.Poster1, Poster2: data.Poster.Poster2,
                groupStudent: data.selectedStudent.groupStudent,
                id: data.selectedStudent.id
            }
        })
} 

export {
    headGetProjectandUser, headDeleteProjct, headHuyDangKi, headGetProjectApprove,
    headApproveFroject, headFetchListTeacher, test, AssignPB1and2, headRefuseFroject, GetDSHoiDong,
    AssignHoiDong,AssignPoster,GetAllListTeacherHoiDong
}