import axios from "../setup/axios"

const teacherPB = (user) => {
    return axios.put("/api/v1/teacher/getLichChamPB", { data: { maSo: user.maSo } })
}

const teacherHoiDong = (user) => {
    return axios.put("/api/v1/teacher/getLichHoiDong", { data: { maSo: user.maSo } })
}

const teacherPoseter = (user) => {
    return axios.put("/api/v1/teacher/getLichPoster", { data: { maSo: user.maSo } })
}
const teacherGetIn4SV1andSV2 = (group, id) => {
    return axios.put("/api/v1/teacher/getIn4SV1andSV2", { data: { groupStudent: group, id: id } })
}

const teacherGetIn4SV1andSV2HoiDong = (group, id) => {
    return axios.put("/api/v1/teacher/getIn4SV1andSV2HoiDong", { data: { groupStudent: group, id: id } })
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

const teacherGetDSHD = (user) => {
    return axios.put("/api/v1/teacher/getDSHD", { data: { maSo: user.maSo } })
}

const teacherDGPB = (danhgiaSV1, danhgiaSV2, idSV1, idSV2, pb1, pb2,pb3, maSoGV) => {
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
            danhgiaphanbien: danhgiaSV1.danhgiaphanbien,
            diem: danhgiaSV1.diemSV1
        },
        dataSV2: {
            ghichu: danhgiaSV2.ghichu,
            LOL1: danhgiaSV2.LOL1,
            LOL2: danhgiaSV2.LOL2,
            LOL3: danhgiaSV2.LOL3,
            LOL4: danhgiaSV2.LOL4,
            LOL5: danhgiaSV2.LOL5,
            LOL6: danhgiaSV2.LOL6,
            LOL7: danhgiaSV2.LOL7,
            LOL8: danhgiaSV2.LOL8,
            danhgiaphanbien: danhgiaSV2.danhgiaphanbien,
            diem: danhgiaSV2.diemSV2,
        },
        idSV1: {
            id1: idSV1
        },
        idSV2: {
            id2: idSV2
        },
        pb1: { pb1: pb1 },
        pb2: { pb2: pb2 },
        pb3: { pb3: pb3 },
        maSoGV: { maSoGV: maSoGV }
    })
}

const teacherXemKetQuaPBSV2 = (user, id) => {
    return axios.put("/api/v1/teacher/xemDGPhanBienSV2", { data: { maSo: user, id: id } })
}

const teacherXemKetQuaHoiDongSV2 = (user, id) => {
    return axios.put("/api/v1/teacher/xemDGHoiDongSV2", { data: { maSo: user, id: id } })
}
// xác định user là pb1 hay pb1 của đề tài đó
const teacherDefinePB1PB2 = (maSoSV, maSoGV) => {
    return axios.put("/api/v1/teacher/definePB1PB2", { data: { maSoSV: maSoSV, maSoGV: maSoGV } })
}

const teacherDefineHoiDong = (maSoSV, maSoGV) => {
    return axios.put("/api/v1/teacher/defineHoiDong", { data: { maSoSV: maSoSV, maSoGV: maSoGV } })
}

const teacherDefinePoster = (maSoSV, maSoGV) => {
    return axios.put("/api/v1/teacher/definePoster", { data: { maSoSV: maSoSV, maSoGV: maSoGV } })
}

const teacherDGHoiDong = (danhgiaSV1, danhgiaSV2, idSV1, idSV2, CTHD, TK, UV, maSoGV) => {
    return axios.put("/api/v1/teacher/DGPHoiDong", {
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
            danhgiahoidong: danhgiaSV1.danhgiahoidong,
            diem: danhgiaSV1.diemSV1
        },
        dataSV2: {
            ghichu: danhgiaSV2.ghichu,
            LOL1: danhgiaSV2.LOL1,
            LOL2: danhgiaSV2.LOL2,
            LOL3: danhgiaSV2.LOL3,
            LOL4: danhgiaSV2.LOL4,
            LOL5: danhgiaSV2.LOL5,
            LOL6: danhgiaSV2.LOL6,
            LOL7: danhgiaSV2.LOL7,
            LOL8: danhgiaSV2.LOL8,
            danhgiahoidong: danhgiaSV2.danhgiahoidong,
            diem: danhgiaSV2.diemSV2,
        },
        idSV1: {
            id1: idSV1
        },
        idSV2: {
            id2: idSV2
        },
        CTHD: { CTHD: CTHD },
        TK: { TK: TK },
        UV: { UV: UV },
        maSoGV: { maSoGV: maSoGV }
    })
}

const teacherDGPoster = (danhgiaSV1, danhgiaSV2, idSV1, idSV2, Poster1, Poster2, maSoGV) => {
    return axios.put("/api/v1/teacher/DGPPoster", {
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
            danhgiaposter: danhgiaSV1.danhgiaposter,
            diem: danhgiaSV1.diemSV1
        },
        dataSV2: {
            ghichu: danhgiaSV2.ghichu,
            LOL1: danhgiaSV2.LOL1,
            LOL2: danhgiaSV2.LOL2,
            LOL3: danhgiaSV2.LOL3,
            LOL4: danhgiaSV2.LOL4,
            LOL5: danhgiaSV2.LOL5,
            LOL6: danhgiaSV2.LOL6,
            LOL7: danhgiaSV2.LOL7,
            LOL8: danhgiaSV2.LOL8,
            danhgiaposter: danhgiaSV2.danhgiaposter,
            diem: danhgiaSV2.diemSV2,
        },
        idSV1: {
            id1: idSV1
        },
        idSV2: {
            id2: idSV2
        },
        Poster1: { Poster1: Poster1 },
        Poster2: { Poster2: Poster2 },
        maSoGV: { maSoGV: maSoGV }
    })
}

export {
    teacherPB, teacherGetDSHD, teacherDGHD, teacherGetIn4SV1andSV2,teacherGetIn4SV1andSV2HoiDong, teacherDGPB,
    teacherXemKetQuaPBSV2,teacherXemKetQuaHoiDongSV2, teacherDefinePB1PB2, teacherHoiDong, teacherDefineHoiDong, teacherDGHoiDong,
    teacherPoseter, teacherDefinePoster, teacherDGPoster
}