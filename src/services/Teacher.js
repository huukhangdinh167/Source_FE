import axios from "../setup/axios"

const teacherPB = (user) => {
    return axios.put("/api/v1/teacher/getLichChamPB", { data: { maSo: user.maSo } })
}

const teacherGetDSHD = (user) => {
    return axios.put("/api/v1/teacher/getDSHD", { data: { maSo: user.maSo } })
}

const teacherDGHD = (danhgia, data4table) => {
    return axios.put("/api/v1/teacher/DGHD", {
        data: {
            danhgiagiuaky: danhgia.danhgiagiuaky,
            danhgiacuoiky: danhgia.danhgiacuoiky,
            ghichu: danhgia.ghichu,
            LOL1: danhgia.LOL1,
            LOL2: danhgia.LOL2,
            LOL3: danhgia.LOL3,
            LOL4: danhgia.LOL4,
            LOL5: danhgia.LOL5,
            LOL6: danhgia.LOL6,
            LOL7: danhgia.LOL7,
            LOL8: danhgia.LOL8,
            id: data4table.id,
            diemGVHD: danhgia.diemGVHD
        }
    })
}

export {
    teacherPB, teacherGetDSHD, teacherDGHD
}