import axios from "../setup/axios"

const teacherPB = (user) => {
    return axios.put("/api/v1/teacher/getLichChamPB", { data: { maSo: user.maSo } })
}
const teacherGetIn4SV1andSV2 = (group, id) => {
    return axios.put("/api/v1/teacher/getIn4SV1andSV2", { data: { groupStudent: group, id: id } })
}

// const teacherGetDSHD = (user) => {
//     return axios.put("/api/v1/teacher/getDSHD", {data : {maSo : user.maSo } })
// }

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
const teacherGetDSHD = (user) => {
    return axios.put("/api/v1/teacher/getDSHD", { data: { maSo: user.maSo } })
}

const teacherDGPB = (danhgiaSV1, danhgiaSV2, idSV1, idSV2, pb1, pb2, maSoGV) => {
    return axios.put("/api/v1/teacher/DGPhanBien", {
        dataSV1: {
            ghichu: danhgiaSV1.ghichu,
            LOL1: danhgiaSV1.LOL1,
            LOL2: danhgiaSV1.LOL2,
            LOL3: danhgiaSV1.LOL3,
            LOL4: danhgiaSV1.LOL4,
            LOL5: danhgiaSV1.LOL5,
            LOL6: danhgiaSV1.LOL6,
            LOL7: danhgiaSV1.LOL7,
            LOL8: danhgiaSV1.LOL8,
            diem: danhgiaSV1.diemSV1
        },
        dataSV2: {
            LOL1: danhgiaSV2.LOL1,
            LOL2: danhgiaSV2.LOL2,
            LOL3: danhgiaSV2.LOL3,
            LOL4: danhgiaSV2.LOL4,
            LOL5: danhgiaSV2.LOL5,
            LOL6: danhgiaSV2.LOL6,
            LOL7: danhgiaSV2.LOL7,
            LOL8: danhgiaSV2.LOL8,
            diem: danhgiaSV2.diemSV2,
        },
        idSV1:{
            id1: idSV1
        },
        idSV2:{
            id2: idSV2
        }, 
        pb1: { pb1: pb1},
        pb2: { pb2: pb2}, 
        maSoGV: {maSoGV: maSoGV}
    })
}
export {

    teacherPB, teacherGetDSHD, teacherDGHD, teacherGetIn4SV1andSV2, teacherDGPB

}