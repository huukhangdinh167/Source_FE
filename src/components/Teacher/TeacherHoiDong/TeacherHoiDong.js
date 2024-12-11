import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap"; // Import modal từ React Bootstrap
import swal from 'sweetalert';
import './TeacherChamHoiDong.scss';
import { headFetchListTeacher, AssignPB1and2, } from '../../../services/HeadService';
import {
    teacherGetIn4SV1andSV2, teacherHoiDong,
    teacherDGPB, teacherXemKetQuaPBSV2, teacherDefinePB1PB2,
    teacherDefineHoiDong, teacherDGHoiDong,
    teacherPoseter, teacherDefinePoster, teacherDGPoster
} from '../../../services/Teacher';
import _, { cloneDeep, values } from "lodash";
import { toast } from "react-toastify";
import { UserContext } from '../../../context/userContext';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import autoTable from 'jspdf-autotable';
const TeacherChamHoiDong = (props) => {
    const { user } = React.useContext(UserContext);

    const [students, setData] = useState([]);
    const [studentsPoster, setDataPoster] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [showModalPoster, setShowModalPoster] = useState(false);// Trạng thái hiển thị 

    const [listtecher, setListTeacher] = useState()

    const [dataModal, setDataModal] = useState({})
    const [dataModalPoster, setDataModalPoster] = useState({})

    const [listSV1SV2, setListSv1Sv2] = useState([])

    const [xemPBSV2, setXemPBSV2] = useState([])
    const [xemPosterSV2, setXemPosterSV2] = useState([])
    const [daDanhGia, setDaDanhGia] = useState("false")
    const defaultHoiDongSV1 = {
        danhgiahoidong: '',
        diemSV1: '',
        LOL1: '',
        LOL2: '',
        LOL3: '',
        LOL4: '',
        LOL5: '',
        LOL6: '',
        LOL7: '',
        LOL8: '',
        ghichu: '',
    }
    const defaultHoiDongSV2 = {
        danhgiahoidong: '',
        diemSV2: '',
        LOL1: '',
        LOL2: '',
        LOL3: '',
        LOL4: '',
        LOL5: '',
        LOL6: '',
        LOL7: '',
        LOL8: '',
    }

    const defaultPosterSV1 = {
        danhgiaposter: '',
        diemSV1: '',
        LOL1: '',
        LOL2: '',
        LOL3: '',
        LOL4: '',
        LOL5: '',
        LOL6: '',
        LOL7: '',
        LOL8: '',
        ghichu: '',
    }
    const defaultPosterSV2 = {
        danhgiaposter: '',
        diemSV2: '',
        LOL1: '',
        LOL2: '',
        LOL3: '',
        LOL4: '',
        LOL5: '',
        LOL6: '',
        LOL7: '',
        LOL8: '',
    }
    const [HoiDongSV1, setHoiDongSV1] = useState(defaultHoiDongSV1)
    const [HoiDongSV2, setHoiDongSV2] = useState(defaultHoiDongSV2)
    const [PosterSV1, setPosterSV1] = useState(defaultPosterSV1)
    const [PosterSV2, setPosterSV2] = useState(defaultPosterSV2)
    useEffect(() => {
        studentss();

    }, []);

    useEffect(() => {
        setHoiDongSV1({
            ...dataModal,
            LOL1: dataModal.LOL1,
            LOL2: dataModal.LOL2,
            LOL3: dataModal.LOL3,
            LOL4: dataModal.LOL4,
            LOL5: dataModal.LOL5,
            LOL6: dataModal.LOL6,
            LOL7: dataModal.LOL7,
            LOL8: dataModal.LOL8,
            danhgiahoidong: dataModal.danhgiahoidong,
            ghichu: dataModal.ghichu,
            diemSV1: dataModal.diemSV1
        })

    }, [dataModal]);

    useEffect(() => {
        setPosterSV1({
            ...dataModalPoster,
            LOL1: dataModalPoster.LOL1,
            LOL2: dataModalPoster.LOL2,
            LOL3: dataModalPoster.LOL3,
            LOL4: dataModalPoster.LOL4,
            LOL5: dataModalPoster.LOL5,
            LOL6: dataModalPoster.LOL6,
            LOL7: dataModalPoster.LOL7,
            LOL8: dataModalPoster.LOL8,
            danhgiaposter: dataModalPoster.danhgiaposter,
            ghichu: dataModalPoster.ghichu,
            diemSV1: dataModalPoster.diemSV1
        })

    }, [dataModalPoster]);

    useEffect(() => {
        setHoiDongSV2({
            ...xemPBSV2,
            LOL1: xemPBSV2.LOL1,
            LOL2: xemPBSV2.LOL2,
            LOL3: xemPBSV2.LOL3,
            LOL4: xemPBSV2.LOL4,
            LOL5: xemPBSV2.LOL5,
            LOL6: xemPBSV2.LOL6,
            LOL7: xemPBSV2.LOL7,
            LOL8: xemPBSV2.LOL8,
            danhgiahoidong: xemPBSV2.danhgiahoidong,
            diemSV2: xemPBSV2.diemSV2
        })
    }, [xemPBSV2, dataModal]);

    useEffect(() => {
        setPosterSV2({
            ...xemPosterSV2,
            LOL1: xemPosterSV2.LOL1,
            LOL2: xemPosterSV2.LOL2,
            LOL3: xemPosterSV2.LOL3,
            LOL4: xemPosterSV2.LOL4,
            LOL5: xemPosterSV2.LOL5,
            LOL6: xemPosterSV2.LOL6,
            LOL7: xemPosterSV2.LOL7,
            LOL8: xemPosterSV2.LOL8,
            danhgiaposter: xemPosterSV2.danhgiaposter,
            diemSV2: xemPosterSV2.diemSV2
        })
    }, [xemPosterSV2, dataModalPoster]);

    const studentss = async () => {
        let data = await teacherHoiDong(user);
        setData(data.DT);
        let dataPoster = await teacherPoseter(user)
        setDataPoster(dataPoster.DT)
        let list = await headFetchListTeacher()
        setListTeacher(list.DT)
    };

    // hàm này xác định xem user đang đang là vai trò PB1 hay Pb2 mỗi khi bậc modal ở mỗi đề tài
    const defineHoiDong = async (item) => {
        let define = await teacherDefineHoiDong(item.maSo, user.maSo)
        if (define.EC == 0) {
            // kết quả trả về là pb1 || pb2
            return define.EM
        } else {
            toast.error("Can't not define HoiDong")
        }
    }

    const definePoster = async (item) => {
        let define = await teacherDefinePoster(item.maSo, user.maSo)
        if (define.EC == 0) {
            // kết quả trả về là pb1 || pb2
            return define.EM
        } else {
            toast.error("Can't not define HoiDong")
        }
    }
    const handleChamDiemHoiDong = async (item) => {
        let define = await defineHoiDong(item)
        let aee = await teacherXemKetQuaPBSV2(item.groupStudent, item.id)
        if (aee.EC != 0) {
            toast.error(aee.EM)
        }
        if (define == 'CTHD' && aee.DT[0].Result.diemCTHD != null) {
            // người dùng đang là phản biện 1
            console.log("nè", aee.DT)
            setDataModal({
                ...item,
                LOL1: item.Criteriahoidong?.LOL1,
                LOL2: item.Criteriahoidong?.LOL2,
                LOL3: item.Criteriahoidong?.LOL3,
                LOL4: item.Criteriahoidong?.LOL4,
                LOL5: item.Criteriahoidong?.LOL5,
                LOL6: item.Criteriahoidong?.LOL6,
                LOL7: item.Criteriahoidong?.LOL7,
                LOL8: item.Criteriahoidong?.LOL8,
                danhgiahoidong: item.Result?.danhgiaCTHD,
                ghichu: item.Criteriahoidong?.ghichu,
                diemSV1: item.Result?.diemCTHD
            })
            let data = await teacherXemKetQuaPBSV2(item.groupStudent, item.id)
            if (data.EC == 0) {
                let res = data.DT
                setXemPBSV2({
                    ...res,
                    LOL1: res[1] && res[1].Criteriahoidong?.LOL1,
                    LOL2: res[1] && res[1].Criteriahoidong?.LOL2,
                    LOL3: res[1] && res[1].Criteriahoidong?.LOL3,
                    LOL4: res[1] && res[1].Criteriahoidong?.LOL4,
                    LOL5: res[1] && res[1].Criteriahoidong?.LOL5,
                    LOL6: res[1] && res[1].Criteriahoidong?.LOL6,
                    LOL7: res[1] && res[1].Criteriahoidong?.LOL7,
                    LOL8: res[1] && res[1].Criteriahoidong?.LOL8,
                    danhgiahoidong: res[1] && res[1].Result?.danhgiaCTHD,
                    diemSV2: res[1] && res[1].Result?.diemCTHD
                })
                console.log("datamodaaal", res)
            } else {
                toast.error("Lỗi gì đó")
            }

        } else if (define == 'TK' && aee.DT[0].Result.diemTK != null) {
            // người dùng đang là phản biện 2
            console.log("nè", aee.DT)
            setDataModal({
                ...item,
                LOL1: item.Criteriahoidong?.LOL1TK,
                LOL2: item.Criteriahoidong?.LOL2TK,
                LOL3: item.Criteriahoidong?.LOL3TK,
                LOL4: item.Criteriahoidong?.LOL4TK,
                LOL5: item.Criteriahoidong?.LOL5TK,
                LOL6: item.Criteriahoidong?.LOL6TK,
                LOL7: item.Criteriahoidong?.LOL7TK,
                LOL8: item.Criteriahoidong?.LOL8TK,
                danhgiahoidong: item.Result?.danhgiaTK,
                ghichu: item.Criteriahoidong?.ghichuTK,
                diemSV1: item.Result?.diemTK
            })
            let data = await teacherXemKetQuaPBSV2(item.groupStudent, item.id)
            if (data.EC == 0) {
                let res = data.DT
                setXemPBSV2({
                    ...res,
                    LOL1: res[1] && res[1].Criteriahoidong?.LOL1TK,
                    LOL2: res[1] && res[1].Criteriahoidong?.LOL2TK,
                    LOL3: res[1] && res[1].Criteriahoidong?.LOL3TK,
                    LOL4: res[1] && res[1].Criteriahoidong?.LOL4TK,
                    LOL5: res[1] && res[1].Criteriahoidong?.LOL5TK,
                    LOL6: res[1] && res[1].Criteriahoidong?.LOL6TK,
                    LOL7: res[1] && res[1].Criteriahoidong?.LOL7TK,
                    LOL8: res[1] && res[1].Criteriahoidong?.LOL8TK,
                    danhgiahoidong: res[1] && res[1].Result?.danhgiaTK,
                    //  ghichu: res[1].Criteriahoidong?.ghichu,
                    diemSV2: res[1] && res[1].Result?.diemTK
                })
                console.log("datamodaaal", res)
            } else {
                toast.error("Lỗi gì đó")
            }

        } else if (define == 'UV' && aee.DT[0].Result.diemUV != null) {
            // người dùng đang là phản biện 2
            setDataModal({
                ...item,
                LOL1: item.Criteriahoidong?.LOL1UV,
                LOL2: item.Criteriahoidong?.LOL2UV,
                LOL3: item.Criteriahoidong?.LOL3UV,
                LOL4: item.Criteriahoidong?.LOL4UV,
                LOL5: item.Criteriahoidong?.LOL5UV,
                LOL6: item.Criteriahoidong?.LOL6UV,
                LOL7: item.Criteriahoidong?.LOL7UV,
                LOL8: item.Criteriahoidong?.LOL8UV,
                danhgiahoidong: item.Result?.danhgiaUV,
                ghichu: item.Criteriahoidong?.ghichuUV,
                diemSV1: item.Result?.diemUV
            })
            let data = await teacherXemKetQuaPBSV2(item.groupStudent, item.id)
            if (data.EC == 0) {
                let res = data.DT
                setXemPBSV2({
                    ...res,
                    LOL1: res[1] && res[1].Criteriahoidong?.LOL1UV,
                    LOL2: res[1] && res[1].Criteriahoidong?.LOL2UV,
                    LOL3: res[1] && res[1].Criteriahoidong?.LOL3UV,
                    LOL4: res[1] && res[1].Criteriahoidong?.LOL4UV,
                    LOL5: res[1] && res[1].Criteriahoidong?.LOL5UV,
                    LOL6: res[1] && res[1].Criteriahoidong?.LOL6UV,
                    LOL7: res[1] && res[1].Criteriahoidong?.LOL7UV,
                    LOL8: res[1] && res[1].Criteriahoidong?.LOL8UV,
                    danhgiahoidong: res[1] && res[1].Result?.danhgiaUV,
                    //  ghichu: res[1].Criteriahoidong?.ghichu,
                    diemSV2: res[1] && res[1].Result?.diemUV

                })
                console.log("datamodaaal", res)
            } else {
                toast.error("Lỗi gì đó")
            }
        }
        else {
        }
        setShowModal(true); // Hiển thị modal
        // setDataModal({
        //     ...item,
        //     LOL1: item.Criteriahoidong?.LOL1,
        //     LOL2: item.Criteriahoidong?.LOL2,
        //     LOL3: item.Criteriapb?.LOL3,
        //     LOL4: item.Criteriapb?.LOL4,
        //     LOL5: item.Criteriapb?.LOL5,
        //     LOL6: item.Criteriapb?.LOL6,
        //     LOL7: item.Criteriapb?.LOL7,
        //     LOL8: item.Criteriapb?.LOL8,
        //     ghichu: item.Criteriapb?.ghichu,
        //     diemSV1: item.Result?.diemGVPB1 || item.Result?.diemGVPB2
        // })
        // let data = await teacherXemKetQuaPBSV2(item.groupStudent)
        // if (data.EC == 0) {
        //     let res = data.DT
        //     setXemPBSV2({
        //         ...res,
        //         LOL1: res[1].Criteriapb?.LOL1,
        //         LOL2: res[1].Criteriapb?.LOL2,
        //         LOL3: res[1].Criteriapb?.LOL3,
        //         LOL4: res[1].Criteriapb?.LOL4,
        //         LOL5: res[1].Criteriapb?.LOL5,
        //         LOL6: res[1].Criteriapb?.LOL6,
        //         LOL7: res[1].Criteriapb?.LOL7,
        //         LOL8: res[1].Criteriapb?.LOL8,
        //         //  ghichu: res[1].Criteriapb?.ghichu,
        //         diemSV2: res[1].Result?.diemGVPB1 || res[1].Result?.diemGVPB2
        //     })
        //     console.log("datamodaaal", res)
        // } else {
        //     toast.error("Lỗi gì đó")
        // }
        console.log("datamodal", item)
        let res = await teacherGetIn4SV1andSV2(item.groupStudent, item.id)
        if (res.EC == 0) {
            setListSv1Sv2(res.DT)
            console.log("Sex", res.DT)
        }
    };

    const handleChamDiemPoster = async (item) => {
        let define = await definePoster(item)
        let aee = await teacherXemKetQuaPBSV2(item.groupStudent, item.id)
        if (aee.EC != 0) {
            toast.error(aee.EM)
        }
        if (define == 'Poster1' && aee.DT[0].Result.diemPoster1 != null) {
            // người dùng đang là phản biện 1
            // toast.error("yyy")
            setDataModalPoster({
                ...item,
                LOL1: item.Criteriahoidong?.LOL1Poster1,
                LOL2: item.Criteriahoidong?.LOL2Poster1,
                LOL3: item.Criteriahoidong?.LOL3Poster1,
                LOL4: item.Criteriahoidong?.LOL4Poster1,
                LOL5: item.Criteriahoidong?.LOL5Poster1,
                LOL6: item.Criteriahoidong?.LOL6Poster1,
                LOL7: item.Criteriahoidong?.LOL7Poster1,
                LOL8: item.Criteriahoidong?.LOL8Poster1,
                danhgiaposter: item.Result?.danhgiaPoster1,
                ghichu: item.Criteriahoidong?.ghichuPoster1,
                diemSV1: item.Result?.diemPoster1
            })
            let data = await teacherXemKetQuaPBSV2(item.groupStudent, item.id)
            if (data.EC == 0) {
                let res = data.DT
                setXemPosterSV2({
                    ...res,
                    LOL1: res[1] && res[1].Criteriahoidong?.LOL1Poster1,
                    LOL2: res[1] && res[1].Criteriahoidong?.LOL2Poster1,
                    LOL3: res[1] && res[1].Criteriahoidong?.LOL3Poster1,
                    LOL4: res[1] && res[1].Criteriahoidong?.LOL4Poster1,
                    LOL5: res[1] && res[1].Criteriahoidong?.LOL5Poster1,
                    LOL6: res[1] && res[1].Criteriahoidong?.LOL6Poster1,
                    LOL7: res[1] && res[1].Criteriahoidong?.LOL7Poster1,
                    LOL8: res[1] && res[1].Criteriahoidong?.LOL8Poster1,
                    danhgiaposter: res[1] && res[1].Result?.danhgiaPoster1,
                    ghichu: res[1] && res[1].Criteriahoidong?.ghichuPoster1,
                    diemSV2: res[1] && res[1].Result?.diemPoster1
                })
                console.log("setDataModalPoster", res)
            } else {
                toast.error("Lỗi gì đó")
            }

        } else if (define == 'Poster2' && aee.DT[0].Result.diemPoster2 != null) {
            // người dùng đang là phản biện 2

            setDataModalPoster({
                ...item,
                LOL1: item.Criteriahoidong?.LOL1Poster2,
                LOL2: item.Criteriahoidong?.LOL2Poster2,
                LOL3: item.Criteriahoidong?.LOL3Poster2,
                LOL4: item.Criteriahoidong?.LOL4Poster2,
                LOL5: item.Criteriahoidong?.LOL5Poster2,
                LOL6: item.Criteriahoidong?.LOL6Poster2,
                LOL7: item.Criteriahoidong?.LOL7Poster2,
                LOL8: item.Criteriahoidong?.LOL8Poster2,
                danhgiaposter: item.Result?.danhgiaPoster2,
                ghichu: item.Criteriahoidong?.ghichuPoster2,
                diemSV1: item.Result?.diemPoster2
            })
            let data = await teacherXemKetQuaPBSV2(item.groupStudent, item.id)
            if (data.EC == 0) {
                let res = data.DT
                setXemPosterSV2({
                    ...res,
                    LOL1: res[1] && res[1].Criteriahoidong?.LOL1Poster2,
                    LOL2: res[1] && res[1].Criteriahoidong?.LOL2Poster2,
                    LOL3: res[1] && res[1].Criteriahoidong?.LOL3Poster2,
                    LOL4: res[1] && res[1].Criteriahoidong?.LOL4Poster2,
                    LOL5: res[1] && res[1].Criteriahoidong?.LOL5Poster2,
                    LOL6: res[1] && res[1].Criteriahoidong?.LOL6Poster2,
                    LOL7: res[1] && res[1].Criteriahoidong?.LOL7Poster2,
                    LOL8: res[1] && res[1].Criteriahoidong?.LOL8Poster2,
                    danhgiaposter: res[1] && res[1].Result?.danhgiaPoster2,
                    ghichu: res[1] && res[1].Criteriahoidong?.ghichuPoster2,
                    diemSV2: res[1] && res[1].Result?.diemPoster2
                })
                console.log("datamodaaal", res)
            } else {
                toast.error("Lỗi gì đó")
            }

        }
        else {
            //   toast.error(define)
            console.log("nè", aee.DT)
        }
        setShowModalPoster(true); // Hiển thị modal

        console.log("datamodal", item)
        let res = await teacherGetIn4SV1andSV2(item.groupStudent, item.id)
        if (res.EC == 0) {
            setListSv1Sv2(res.DT)
            console.log("Sex", res.DT)
        }
    };

    const handleCloseModal = async () => {
        setShowModal(false); // Đóng 
        setHoiDongSV1(defaultHoiDongSV1)
        setHoiDongSV2(defaultHoiDongSV2)
        setListSv1Sv2([])
    };

    const handleCloseModalPoster = async () => {
        setShowModalPoster(false); // Đóng 
        setPosterSV1(defaultPosterSV1)
        setPosterSV2(defaultPosterSV2)
        setListSv1Sv2([])
    };

    const hanldeConfirm = async () => {
        if (listSV1SV2.length == 2) {
            if (!HoiDongSV1.danhgiahoidong || HoiDongSV1.danhgiahoidong === 'null') {
                toast.error("Bạn chưa đánh giá  cho SV1");
                return
            }
            if (HoiDongSV1.danhgiahoidong === 'true') {
                if (!HoiDongSV1.diemSV1) {
                    toast.error("Bạn chưa nhập điểm cho SV1");
                    return
                }
                if (HoiDongSV1.diemSV1 < 1 || HoiDongSV1.diemSV1 > 10) {
                    toast.error("Điểm của sinh viên là một số từ 1 -> 10");
                    return
                }
                if (!HoiDongSV1.LOL1) {
                    toast.error("Bạn chưa nhập LO1 cho SV1");
                    return
                }
                if (!HoiDongSV1.LOL2) {
                    toast.error("Bạn chưa nhập LO2 cho SV1");
                    return
                }
                if (!HoiDongSV1.LOL3) {
                    toast.error("Bạn chưa nhập LO3 cho SV1");
                    return
                }
                if (!HoiDongSV1.LOL4) {
                    toast.error("Bạn chưa nhập LO4 cho SV1");
                    return
                }
                if (!HoiDongSV1.LOL5) {
                    toast.error("Bạn chưa nhập LO5 cho SV1");
                    return
                }
                if (!HoiDongSV1.LOL6) {
                    toast.error("Bạn chưa nhập LO6 cho SV1");
                    return
                }
                if (!HoiDongSV1.LOL7) {
                    toast.error("Bạn chưa nhập LO7 cho SV1");
                    return
                }
                if (!HoiDongSV1.LOL8) {
                    toast.error("Bạn chưa nhập LO8 cho SV1");
                    return
                }
            }
            if (!HoiDongSV2.danhgiahoidong || HoiDongSV2.danhgiahoidong === 'null') {
                toast.error("Bạn chưa đánh giá  cho SV2");
                return
            }
            if (HoiDongSV2.danhgiahoidong === 'true') {
                if (!HoiDongSV2.diemSV2) {
                    toast.error("Bạn chưa nhập điểm cho SV2");
                    return
                }
                if (HoiDongSV2.diemSV2 < 1 || HoiDongSV2.diemSV2 > 10) {
                    toast.error("Điểm của sinh viên là một số từ 1 -> 10");
                    return
                }
                if (!HoiDongSV2.LOL1) {
                    toast.error("Bạn chưa nhập LO1 cho SV2");
                    return
                }
                if (!HoiDongSV2.LOL2) {
                    toast.error("Bạn chưa nhập LO2 cho SV2");
                    return
                }
                if (!HoiDongSV2.LOL3) {
                    toast.error("Bạn chưa nhập LO3 cho SV2");
                    return
                }
                if (!HoiDongSV2.LOL4) {
                    toast.error("Bạn chưa nhập LO4 cho SV2");
                    return
                }
                if (!HoiDongSV2.LOL5) {
                    toast.error("Bạn chưa nhập LO5 cho SV2");
                    return
                }
                if (!HoiDongSV2.LOL6) {
                    toast.error("Bạn chưa nhập LO6 cho SV2");
                    return
                }
                if (!HoiDongSV2.LOL7) {
                    toast.error("Bạn chưa nhập LO7 cho SV2");
                    return
                }
                if (!HoiDongSV2.LOL8) {
                    toast.error("Bạn chưa nhập LO8 cho SV2");
                    return
                }
            }
        }
        if (listSV1SV2.length == 1) {
            if (!HoiDongSV1.danhgiahoidong || HoiDongSV1.danhgiahoidong === 'null') {
                toast.error("Bạn chưa đánh giá  cho SV1");
                return
            }
            if (HoiDongSV1.danhgiahoidong === 'true') {
                if (!HoiDongSV1.diemSV1) {
                    toast.error("Bạn chưa nhập điểm cho SV1");
                    return
                }
                if (HoiDongSV1.diemSV1 < 0 || HoiDongSV1.diemSV1 > 10) {
                    toast.error("Điểm của sinh viên là một số từ 0 -> 10");
                    return
                }
                if (!HoiDongSV1.LOL1) {
                    toast.error("Bạn chưa nhập LO1 cho SV1");
                    return
                }
                if (!HoiDongSV1.LOL2) {
                    toast.error("Bạn chưa nhập LO2 cho SV1");
                    return
                }
                if (!HoiDongSV1.LOL3) {
                    toast.error("Bạn chưa nhập LO3 cho SV1");
                    return
                }
                if (!HoiDongSV1.LOL4) {
                    toast.error("Bạn chưa nhập LO4 cho SV1");
                    return
                }
                if (!HoiDongSV1.LOL5) {
                    toast.error("Bạn chưa nhập LO5 cho SV1");
                    return
                }
                if (!HoiDongSV1.LOL6) {
                    toast.error("Bạn chưa nhập LO6 cho SV1");
                    return
                }
                if (!HoiDongSV1.LOL7) {
                    toast.error("Bạn chưa nhập LO7 cho SV1");
                    return
                }
                if (!HoiDongSV1.LOL8) {
                    toast.error("Bạn chưa nhập LO8 cho SV1");
                    return
                }
            }
        }
        let data = await teacherDGHoiDong(HoiDongSV1, HoiDongSV2, listSV1SV2[0].id, listSV1SV2[1] ? listSV1SV2[1].id : 'null', listSV1SV2[0].CTHD, listSV1SV2[0].TK, listSV1SV2[0].UV, user.maSo)
        if (data.EC == 0) {
            toast.success("Chấm thành công ")
            studentss()
        } else {
            toast.error(data.EM)
        }
        setShowModal(false);
    };

    const hanldeConfirmPoster = async () => {
        if (listSV1SV2.length == 2) {
            if (!PosterSV1.danhgiaposter || PosterSV1.danhgiaposter === 'null') {
                toast.error("Bạn chưa đánh giá  cho SV1");
                return
            }
            if (PosterSV1.danhgiaposter === 'true') {
                if (!PosterSV1.diemSV1) {
                    toast.error("Bạn chưa nhập điểm cho SV1");
                    return
                }
                if (PosterSV1.diemSV1 < 1 || PosterSV1.diemSV1 > 10) {
                    toast.error("Điểm của sinh viên là một số từ 1 -> 10");
                    return
                }
                if (!PosterSV1.LOL1) {
                    toast.error("Bạn chưa nhập LO1 cho SV1");
                    return
                }
                if (!PosterSV1.LOL2) {
                    toast.error("Bạn chưa nhập LO2 cho SV1");
                    return
                }
                if (!PosterSV1.LOL3) {
                    toast.error("Bạn chưa nhập LO3 cho SV1");
                    return
                }
                if (!PosterSV1.LOL4) {
                    toast.error("Bạn chưa nhập LO4 cho SV1");
                    return
                }
                if (!PosterSV1.LOL5) {
                    toast.error("Bạn chưa nhập LO5 cho SV1");
                    return
                }
                if (!PosterSV1.LOL6) {
                    toast.error("Bạn chưa nhập LO6 cho SV1");
                    return
                }
                if (!PosterSV1.LOL7) {
                    toast.error("Bạn chưa nhập LO7 cho SV1");
                    return
                }
                if (!PosterSV1.LOL8) {
                    toast.error("Bạn chưa nhập LO8 cho SV1");
                    return
                }
            }
            if (!PosterSV2.danhgiaposter || PosterSV2.danhgiaposter === 'null') {
                toast.error("Bạn chưa đánh giá  cho SV2");
                return
            }
            if (PosterSV2.danhgiaposter === 'true') {
                if (!PosterSV2.diemSV2) {
                    toast.error("Bạn chưa nhập điểm cho SV2");
                    return
                }
                if (PosterSV2.diemSV2 < 1 || PosterSV2.diemSV2 > 10) {
                    toast.error("Điểm của sinh viên là một số từ 1 -> 10");
                    return
                }
                if (!PosterSV2.LOL1) {
                    toast.error("Bạn chưa nhập LO1 cho SV2");
                    return
                }
                if (!PosterSV2.LOL2) {
                    toast.error("Bạn chưa nhập LO2 cho SV2");
                    return
                }
                if (!PosterSV2.LOL3) {
                    toast.error("Bạn chưa nhập LO3 cho SV2");
                    return
                }
                if (!PosterSV2.LOL4) {
                    toast.error("Bạn chưa nhập LO4 cho SV2");
                    return
                }
                if (!PosterSV2.LOL5) {
                    toast.error("Bạn chưa nhập LO5 cho SV2");
                    return
                }
                if (!PosterSV2.LOL6) {
                    toast.error("Bạn chưa nhập LO6 cho SV2");
                    return
                }
                if (!PosterSV2.LOL7) {
                    toast.error("Bạn chưa nhập LO7 cho SV2");
                    return
                }
                if (!PosterSV2.LOL8) {
                    toast.error("Bạn chưa nhập LO8 cho SV2");
                    return
                }
            }
        }
        if (listSV1SV2.length == 1) {
            if (!PosterSV1.danhgiaposter || PosterSV1.danhgiaposter === 'null') {
                toast.error("Bạn chưa đánh giá  cho SV1");
                return
            }
            if (PosterSV1.danhgiaphanbien === 'true') {
                if (!PosterSV1.diemSV1) {
                    toast.error("Bạn chưa nhập điểm cho SV1");
                    return
                }
                if (PosterSV1.diemSV1 < 0 || PosterSV1.diemSV1 > 10) {
                    toast.error("Điểm của sinh viên là một số từ 0 -> 10");
                    return
                }
                if (!PosterSV1.LOL1) {
                    toast.error("Bạn chưa nhập LO1 cho SV1");
                    return
                }
                if (!PosterSV1.LOL2) {
                    toast.error("Bạn chưa nhập LO2 cho SV1");
                    return
                }
                if (!PosterSV1.LOL3) {
                    toast.error("Bạn chưa nhập LO3 cho SV1");
                    return
                }
                if (!PosterSV1.LOL4) {
                    toast.error("Bạn chưa nhập LO4 cho SV1");
                    return
                }
                if (!PosterSV1.LOL5) {
                    toast.error("Bạn chưa nhập LO5 cho SV1");
                    return
                }
                if (!PosterSV1.LOL6) {
                    toast.error("Bạn chưa nhập LO6 cho SV1");
                    return
                }
                if (!PosterSV1.LOL7) {
                    toast.error("Bạn chưa nhập LO7 cho SV1");
                    return
                }
                if (!PosterSV1.LOL8) {
                    toast.error("Bạn chưa nhập LO8 cho SV1");
                    return
                }
            }
        }
        let data = await teacherDGPoster(PosterSV1, PosterSV2, listSV1SV2[0].id, listSV1SV2[1] ? listSV1SV2[1].id : 'null', listSV1SV2[0].Poster1, listSV1SV2[0].Poster2, user.maSo)
        if (data.EC == 0) {
            toast.success("Chấm thành công ")
            studentss()
        } else {
            toast.error(data.EM)
        }
        setShowModalPoster(false);
    };
    const handleOnchange = (value, name) => {
        let _PBSV1 = _.cloneDeep(HoiDongSV1)
        let _PBSV2 = _.cloneDeep(HoiDongSV2)
        _PBSV1[name] = value
        setHoiDongSV1(_PBSV1)
        if (value != 'true' && value != 'false' && name == 'danhgiahoidong') {
            setHoiDongSV2({ ..._PBSV2, danhgiahoidong: 'null' })
        }
        if (value == 'false' && name == 'danhgiahoidong') {
            setHoiDongSV1({ ..._PBSV1, diemSV1: 0, danhgiahoidong: 'false' })
        }
        if (value == 'true' && name == 'danhgiahoidong') {
            setHoiDongSV1({ ..._PBSV1, diemSV1: '' })
        }
    };
    const handleOnchange2 = (value, name) => {
        let _PBSV2 = _.cloneDeep(HoiDongSV2)
        _PBSV2[name] = value
        setHoiDongSV2(_PBSV2)

        if (value == 'false' && name == 'danhgiahoidong') {
            setHoiDongSV2({ ..._PBSV2, diemSV2: 0, danhgiahoidong: 'false' })
        }
        if (value == 'true' && name == 'danhgiahoidong') {
            setHoiDongSV2({ ..._PBSV2, diemSV2: '' })
        }
    }

    const handleOnchangePoster = (value, name) => {
        let _PosterSV1 = _.cloneDeep(PosterSV1)
        let _PosterSV2 = _.cloneDeep(PosterSV2)
        _PosterSV1[name] = value
        setPosterSV1(_PosterSV1)
        if (value != 'true' && value != 'false' && name == 'danhgiaposter') {
            setPosterSV2({ ..._PosterSV2, danhgiaposter: 'null' })
        }
        if (value == 'false' && name == 'danhgiaposter') {
            setPosterSV1({ ..._PosterSV1, diemSV1: 0, danhgiaposter: 'false' })
        }
        if (value == 'true' && name == 'danhgiaposter') {
            setPosterSV1({ ..._PosterSV1, diemSV1: '' })
        }
    };
    const handleOnchange2Poster = (value, name) => {
        let _PosterSV2 = _.cloneDeep(PosterSV2)
        _PosterSV2[name] = value
        setPosterSV2(_PosterSV2)

        if (value == 'false' && name == 'danhgiaposter') {
            setPosterSV2({ ..._PosterSV2, diemSV2: 0, danhgiaposter: 'false' })
        }
        if (value == 'true' && name == 'danhgiaposter') {
            setPosterSV2({ ..._PosterSV2, diemSV2: '' })
        }
    }
    const renderedGroups = new Map(); // Theo dõi nhóm đã xử lý

    const exportToPDFHoiDong = async (item) => {
        const pdf = new jsPDF();

        let define = await defineHoiDong(item)
        let response = await teacherXemKetQuaPBSV2(item.groupStudent, item.id)

        let res = response.DT

        if (define == 'CTHD' && response.DT[0].Result.diemCTHD != null) {
            let LOL1 = item.Criteriahoidong?.LOL1
            let LOL2 = item.Criteriahoidong?.LOL2
            let LOL3 = item.Criteriahoidong?.LOL3
            let LOL4 = item.Criteriahoidong?.LOL4
            let LOL5 = item.Criteriahoidong?.LOL5
            let LOL6 = item.Criteriahoidong?.LOL6
            let LOL7 = item.Criteriahoidong?.LOL7
            let LOL8 = item.Criteriahoidong?.LOL8
            let ghichu = item.Criteriahoidong?.ghichu
            let danhgiaphanbiensv1 = item.Result?.danhgiaCTHD
            let diemSV1 = item.Result?.diemCTHD
            let LOL1SV2 = res[1] && res[1].Criteriahoidong?.LOL1
            let LOL2SV2 = res[1] && res[1].Criteriahoidong?.LOL2
            let LOL3SV2 = res[1] && res[1].Criteriahoidong?.LOL3
            let LOL4SV2 = res[1] && res[1].Criteriahoidong?.LOL4
            let LOL5SV2 = res[1] && res[1].Criteriahoidong?.LOL5
            let LOL6SV2 = res[1] && res[1].Criteriahoidong?.LOL6
            let LOL7SV2 = res[1] && res[1].Criteriahoidong?.LOL7
            let LOL8SV2 = res[1] && res[1].Criteriahoidong?.LOL8
            let diemSV2 = res[1] && res[1].Result?.diemCTHD
            let danhgiaphanbiensv2 = res[1] && res[1].Result?.danhgiaCTHD

            // Sử dụng font mặc định FreeSerif hỗ trợ Unicode
            pdf.setFont('FreeSerif', 'normal');
            pdf.setFontSize(13);
            // Thêm nội dung tiếng Việt
            pdf.text('TRƯỜNG ĐẠI HỌC CÔNG NGHIỆP TP.HCM', 10, 25);
            pdf.text('CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM', 115, 25);

            pdf.text('KHOA CÔNG NGHỆ THÔNG TIN', 20, 30);
            pdf.text('Độc lập - Tự do - Hạnh phúc', 135, 30);

            pdf.text('BỘ MÔN HỆ THỐNG THÔNG TIN', 20, 35);

            pdf.text('------------------------------------', 25, 40);
            pdf.text('-----------------------------------', 135, 35);

            pdf.text('PHIẾU ĐÁNH GIÁ KHÓA LUẬN TỐT NGHIỆP', 55, 50);

            pdf.text(`Họ tên người đánh giá: ${user.name}`, 15, 60);
            pdf.text('Vai trò của người đánh giá: Chủ tịch hội đồng', 15, 65);
            const projectName = `Tên đề tài: ${item.Project.name}`;
            const x = 15;
            let y = 70;

            // Kiểm tra xem tên đề tài có dài quá không và chia thành nhiều dòng
            const maxWidth = 180; // Giới hạn chiều rộng của text
            let lines = pdf.splitTextToSize(projectName, maxWidth);
            pdf.text(lines, x, y);
            pdf.text(`Họ tên sinh viên 1: ${item.name}`, 15, y + 10);
            pdf.text(`Mã số sinh viên: ${item.maSo}`, 120, y + 10);


            if (res.length > 1) {
                pdf.text(`Họ tên sinh viên 2: ${res[1]?.name ?? ''}`, 15, 85);
                pdf.text(`Mã số sinh viên: ${res[1]?.maSo ?? ''}`, 120, 85);
            }

            const headers = [['STT', 'LO', 'Sinh viên 1', res[1] && 'Sinh viên 2']];
            const data = [
                [1, 'Xác định được yêu cầu của khóa luận cần thực hiệnv', danhgiaphanbiensv1 == 'true' ? LOL1 : '', danhgiaphanbiensv2 == 'true' && res[1] ? LOL1SV2 : ''],
                [2, 'Phân tích yêu cầu nghiệp vụ hiện trạng và mô hình hóa được yêu cầu của đề tài', danhgiaphanbiensv1 == 'true' ? LOL2 : '', danhgiaphanbiensv2 == 'true' && res[1] ? LOL2SV2 : ''],
                [3, 'Thiết kế một hệ thống thông tin đưa ra giải pháp đáp ứng được yêu cầu của đề tài', danhgiaphanbiensv1 == 'true' ? LOL3 : '', danhgiaphanbiensv2 == 'true' && res[1] ? LOL3SV2 : ''],
                [4, 'Hiện thực hóa hệ thống thông tin theo thiết kế đã đưa ra/Hiện thực giải pháp đã đưa ra', danhgiaphanbiensv1 == 'true' ? LOL4 : '', danhgiaphanbiensv2 == 'true' && res[1] ? LOL4SV2 : ''],
                [5, 'Viết được báo cáo khóa luận tốt nghiệp', danhgiaphanbiensv1 == 'true' ? LOL5 : '', danhgiaphanbiensv2 == 'true' && res[1] ? LOL5SV2 : ''],
                [6, 'Trình bày được các kiến thức nền tảng liên quan đến đề tài khóa luận', danhgiaphanbiensv1 == 'true' ? LOL6 : '', danhgiaphanbiensv2 == 'true' && res[1] ? LOL6SV2 : ''],
                [7, 'Đánh giá việc thực hiện khóa luận đáp ứng yêu cầu đề tài khóa luận', danhgiaphanbiensv1 == 'true' ? LOL7 : '', danhgiaphanbiensv2 == 'true' && res[1] ? LOL7SV2 : ''],
                [8, 'Bảo vệ khóa kết quả khóa luận trước giản viên phản biện', danhgiaphanbiensv1 == 'true' ? LOL8 : '', danhgiaphanbiensv2 == 'true' && res[1] ? LOL8SV2 : ''],
                ['', 'Kết quả', danhgiaphanbiensv1 == 'true' ? 'Đạt' : 'Không đạt', res[1] && (danhgiaphanbiensv2 == 'true' ? 'Đạt' : 'Không đạt')],
            ];
            // Tạo bảng với autoTable
            autoTable(pdf, {
                head: headers,
                body: data,
                startY: 90, // Vị trí Y bắt đầu của bảng
                theme: 'grid', // Giao diện của bảng (striped, grid, plain)
                styles: { font: 'FreeSerif', fontSize: 13, halign: 'center' }, // Font và kích thước chữ trong bảng
                headStyles: { fillColor: [80, 81, 81] }, // Màu nền tiêu đề
                columnStyles: {
                    0: { cellWidth: 12 }, // Cột 1 (STT) rộng 20
                    1: { cellWidth: 115 }, // Cột 2 (Họ và Tên) rộng 50
                    2: { cellWidth: 25 }, // Cột 3 (Điểm Toán) rộng 25
                    3: { cellWidth: 25 }, // Cột 4 (Điểm Lý) rộng 25
                },
            });
            pdf.text('Nhận xét', 20, 215);
            pdf.text(`${ghichu ?? ''}`, 25, 220);
            pdf.text('TP.HCM, ngày    tháng    năm', 120, 245);
            pdf.text('Người đánh giá', 130, 250);
            pdf.text('(Ký và ghi rõ họ tên)', 125, 255);
            pdf.text(`${user.name}`, 130, 280);

            pdf.save(item.groupStudent);

        } else if (define == 'TK' && response.DT[0].Result.diemTK != null) {
            let LOL1 = item.Criteriahoidong?.LOL1TK
            let LOL2 = item.Criteriahoidong?.LOL2TK
            let LOL3 = item.Criteriahoidong?.LOL3TK
            let LOL4 = item.Criteriahoidong?.LOL4TK
            let LOL5 = item.Criteriahoidong?.LOL5TK
            let LOL6 = item.Criteriahoidong?.LOL6TK
            let LOL7 = item.Criteriahoidong?.LOL7TK
            let LOL8 = item.Criteriahoidong?.LOL8TK
            let ghichu = item.Criteriahoidong?.ghichuTK
            let danhgiaphanbiensv1 = item.Result?.danhgiaTK
            let diemSV1 = item.Result?.diemTK
            let LOL1SV2 = res[1] && res[1].Criteriahoidong?.LOL1TK
            let LOL2SV2 = res[1] && res[1].Criteriahoidong?.LOL2TK
            let LOL3SV2 = res[1] && res[1].Criteriahoidong?.LOL3TK
            let LOL4SV2 = res[1] && res[1].Criteriahoidong?.LOL4TK
            let LOL5SV2 = res[1] && res[1].Criteriahoidong?.LOL5TK
            let LOL6SV2 = res[1] && res[1].Criteriahoidong?.LOL6TK
            let LOL7SV2 = res[1] && res[1].Criteriahoidong?.LOL7TK
            let LOL8SV2 = res[1] && res[1].Criteriahoidong?.LOL8TK
            let diemSV2 = res[1] && res[1].Result?.diemTK
            let danhgiaphanbiensv2 = res[1] && res[1].Result?.danhgiaTK

            // Sử dụng font mặc định FreeSerif hỗ trợ Unicode
            pdf.setFont('FreeSerif', 'normal');
            pdf.setFontSize(13);
            // Thêm nội dung tiếng Việt
            pdf.text('TRƯỜNG ĐẠI HỌC CÔNG NGHIỆP TP.HCM', 10, 25);
            pdf.text('CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM', 115, 25);

            pdf.text('KHOA CÔNG NGHỆ THÔNG TIN', 20, 30);
            pdf.text('Độc lập - Tự do - Hạnh phúc', 135, 30);

            pdf.text('BỘ MÔN HỆ THỐNG THÔNG TIN', 20, 35);

            pdf.text('------------------------------------', 25, 40);
            pdf.text('-----------------------------------', 135, 35);

            pdf.text('PHIẾU ĐÁNH GIÁ KHÓA LUẬN TỐT NGHIỆP', 55, 50);

            pdf.text(`Họ tên người đánh giá: ${user.name}`, 15, 60);
            pdf.text('Vai trò của người đánh giá: Thư kí', 15, 65);
            const projectName = `Tên đề tài: ${item.Project.name}`;
            const x = 15;
            let y = 70;

            // Kiểm tra xem tên đề tài có dài quá không và chia thành nhiều dòng
            const maxWidth = 180; // Giới hạn chiều rộng của text
            let lines = pdf.splitTextToSize(projectName, maxWidth);
            pdf.text(lines, x, y);
            pdf.text(`Họ tên sinh viên 1: ${item.name}`, 15, y + 10);
            pdf.text(`Mã số sinh viên: ${item.maSo}`, 120, y + 10);


            if (res.length > 1) {
                pdf.text(`Họ tên sinh viên 2: ${res[1]?.name ?? ''}`, 15, 85);
                pdf.text(`Mã số sinh viên: ${res[1]?.maSo ?? ''}`, 120, 85);
            }

            const headers = [['STT', 'LO', 'Sinh viên 1', res[1] && 'Sinh viên 2']];
            const data = [
                [1, 'Xác định được yêu cầu của khóa luận cần thực hiệnv', danhgiaphanbiensv1 == 'true' ? LOL1 : '', danhgiaphanbiensv2 == 'true' && res[1] ? LOL1SV2 : ''],
                [2, 'Phân tích yêu cầu nghiệp vụ hiện trạng và mô hình hóa được yêu cầu của đề tài', danhgiaphanbiensv1 == 'true' ? LOL2 : '', danhgiaphanbiensv2 == 'true' && res[1] ? LOL2SV2 : ''],
                [3, 'Thiết kế một hệ thống thông tin đưa ra giải pháp đáp ứng được yêu cầu của đề tài', danhgiaphanbiensv1 == 'true' ? LOL3 : '', danhgiaphanbiensv2 == 'true' && res[1] ? LOL3SV2 : ''],
                [4, 'Hiện thực hóa hệ thống thông tin theo thiết kế đã đưa ra/Hiện thực giải pháp đã đưa ra', danhgiaphanbiensv1 == 'true' ? LOL4 : '', danhgiaphanbiensv2 == 'true' && res[1] ? LOL4SV2 : ''],
                [5, 'Viết được báo cáo khóa luận tốt nghiệp', danhgiaphanbiensv1 == 'true' ? LOL5 : '', danhgiaphanbiensv2 == 'true' && res[1] ? LOL5SV2 : ''],
                [6, 'Trình bày được các kiến thức nền tảng liên quan đến đề tài khóa luận', danhgiaphanbiensv1 == 'true' ? LOL6 : '', danhgiaphanbiensv2 == 'true' && res[1] ? LOL6SV2 : ''],
                [7, 'Đánh giá việc thực hiện khóa luận đáp ứng yêu cầu đề tài khóa luận', danhgiaphanbiensv1 == 'true' ? LOL7 : '', danhgiaphanbiensv2 == 'true' && res[1] ? LOL7SV2 : ''],
                [8, 'Bảo vệ khóa kết quả khóa luận trước giản viên phản biện', danhgiaphanbiensv1 == 'true' ? LOL8 : '', danhgiaphanbiensv2 == 'true' && res[1] ? LOL8SV2 : ''],
                ['', 'Kết quả', danhgiaphanbiensv1 == 'true' ? 'Đạt' : 'Không đạt', res[1] && (danhgiaphanbiensv2 == 'true' ? 'Đạt' : 'Không đạt')],
            ];
            // Tạo bảng với autoTable
            autoTable(pdf, {
                head: headers,
                body: data,
                startY: 90, // Vị trí Y bắt đầu của bảng
                theme: 'grid', // Giao diện của bảng (striped, grid, plain)
                styles: { font: 'FreeSerif', fontSize: 13, halign: 'center' }, // Font và kích thước chữ trong bảng
                headStyles: { fillColor: [80, 81, 81] }, // Màu nền tiêu đề
                columnStyles: {
                    0: { cellWidth: 12 }, // Cột 1 (STT) rộng 20
                    1: { cellWidth: 115 }, // Cột 2 (Họ và Tên) rộng 50
                    2: { cellWidth: 25 }, // Cột 3 (Điểm Toán) rộng 25
                    3: { cellWidth: 25 }, // Cột 4 (Điểm Lý) rộng 25
                },
            });
            pdf.text('Nhận xét', 20, 215);
            pdf.text(`${ghichu ?? ''}`, 25, 220);
            pdf.text('TP.HCM, ngày    tháng    năm', 120, 245);
            pdf.text('Người đánh giá', 130, 250);
            pdf.text('(Ký và ghi rõ họ tên)', 125, 255);
            pdf.text(`${user.name}`, 130, 280);

            pdf.save(item.groupStudent);

        } else if (define == 'UV' && response.DT[0].Result.diemUV != null) {
            let LOL1 = item.Criteriahoidong?.LOL1UV
            let LOL2 = item.Criteriahoidong?.LOL2UV
            let LOL3 = item.Criteriahoidong?.LOL3UV
            let LOL4 = item.Criteriahoidong?.LOL4UV
            let LOL5 = item.Criteriahoidong?.LOL5UV
            let LOL6 = item.Criteriahoidong?.LOL6UV
            let LOL7 = item.Criteriahoidong?.LOL7UV
            let LOL8 = item.Criteriahoidong?.LOL8UV
            let ghichu = item.Criteriahoidong?.ghichuUV
            let danhgiaphanbiensv1 = item.Result?.danhgiaUV
            let diemSV1 = item.Result?.diemUV
            let LOL1SV2 = res[1] && res[1].Criteriahoidong?.LOL1UV
            let LOL2SV2 = res[1] && res[1].Criteriahoidong?.LOL2UV
            let LOL3SV2 = res[1] && res[1].Criteriahoidong?.LOL3UV
            let LOL4SV2 = res[1] && res[1].Criteriahoidong?.LOL4UV
            let LOL5SV2 = res[1] && res[1].Criteriahoidong?.LOL5UV
            let LOL6SV2 = res[1] && res[1].Criteriahoidong?.LOL6UV
            let LOL7SV2 = res[1] && res[1].Criteriahoidong?.LOL7UV
            let LOL8SV2 = res[1] && res[1].Criteriahoidong?.LOL8UV
            let diemSV2 = res[1] && res[1].Result?.diemUV
            let danhgiaphanbiensv2 = res[1] && res[1].Result?.danhgiaUV

            // Sử dụng font mặc định FreeSerif hỗ trợ Unicode
            pdf.setFont('FreeSerif', 'normal');
            pdf.setFontSize(13);
            // Thêm nội dung tiếng Việt
            pdf.text('TRƯỜNG ĐẠI HỌC CÔNG NGHIỆP TP.HCM', 10, 25);
            pdf.text('CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM', 115, 25);

            pdf.text('KHOA CÔNG NGHỆ THÔNG TIN', 20, 30);
            pdf.text('Độc lập - Tự do - Hạnh phúc', 135, 30);

            pdf.text('BỘ MÔN HỆ THỐNG THÔNG TIN', 20, 35);

            pdf.text('------------------------------------', 25, 40);
            pdf.text('-----------------------------------', 135, 35);

            pdf.text('PHIẾU ĐÁNH GIÁ KHÓA LUẬN TỐT NGHIỆP', 55, 50);

            pdf.text(`Họ tên người đánh giá: ${user.name}`, 15, 60);
            pdf.text('Vai trò của người đánh giá: Ủy viên', 15, 65);
            const projectName = `Tên đề tài: ${item.Project.name}`;
            const x = 15;
            let y = 70;

            // Kiểm tra xem tên đề tài có dài quá không và chia thành nhiều dòng
            const maxWidth = 180; // Giới hạn chiều rộng của text
            let lines = pdf.splitTextToSize(projectName, maxWidth);
            pdf.text(lines, x, y);
            pdf.text(`Họ tên sinh viên 1: ${item.name}`, 15, y + 10);
            pdf.text(`Mã số sinh viên: ${item.maSo}`, 120, y + 10);


            if (res.length > 1) {
                pdf.text(`Họ tên sinh viên 2: ${res[1]?.name ?? ''}`, 15, 85);
                pdf.text(`Mã số sinh viên: ${res[1]?.maSo ?? ''}`, 120, 85);
            }

            const headers = [['STT', 'LO', 'Sinh viên 1', res[1] && 'Sinh viên 2']];
            const data = [
                [1, 'Xác định được yêu cầu của khóa luận cần thực hiệnv', danhgiaphanbiensv1 == 'true' ? LOL1 : '', danhgiaphanbiensv2 == 'true' && res[1] ? LOL1SV2 : ''],
                [2, 'Phân tích yêu cầu nghiệp vụ hiện trạng và mô hình hóa được yêu cầu của đề tài', danhgiaphanbiensv1 == 'true' ? LOL2 : '', danhgiaphanbiensv2 == 'true' && res[1] ? LOL2SV2 : ''],
                [3, 'Thiết kế một hệ thống thông tin đưa ra giải pháp đáp ứng được yêu cầu của đề tài', danhgiaphanbiensv1 == 'true' ? LOL3 : '', danhgiaphanbiensv2 == 'true' && res[1] ? LOL3SV2 : ''],
                [4, 'Hiện thực hóa hệ thống thông tin theo thiết kế đã đưa ra/Hiện thực giải pháp đã đưa ra', danhgiaphanbiensv1 == 'true' ? LOL4 : '', danhgiaphanbiensv2 == 'true' && res[1] ? LOL4SV2 : ''],
                [5, 'Viết được báo cáo khóa luận tốt nghiệp', danhgiaphanbiensv1 == 'true' ? LOL5 : '', danhgiaphanbiensv2 == 'true' && res[1] ? LOL5SV2 : ''],
                [6, 'Trình bày được các kiến thức nền tảng liên quan đến đề tài khóa luận', danhgiaphanbiensv1 == 'true' ? LOL6 : '', danhgiaphanbiensv2 == 'true' && res[1] ? LOL6SV2 : ''],
                [7, 'Đánh giá việc thực hiện khóa luận đáp ứng yêu cầu đề tài khóa luận', danhgiaphanbiensv1 == 'true' ? LOL7 : '', danhgiaphanbiensv2 == 'true' && res[1] ? LOL7SV2 : ''],
                [8, 'Bảo vệ khóa kết quả khóa luận trước giản viên phản biện', danhgiaphanbiensv1 == 'true' ? LOL8 : '', danhgiaphanbiensv2 == 'true' && res[1] ? LOL8SV2 : ''],
                ['', 'Kết quả', danhgiaphanbiensv1 == 'true' ? 'Đạt' : 'Không đạt', res[1] && (danhgiaphanbiensv2 == 'true' ? 'Đạt' : 'Không đạt')],
            ];
            // Tạo bảng với autoTable
            autoTable(pdf, {
                head: headers,
                body: data,
                startY: 90, // Vị trí Y bắt đầu của bảng
                theme: 'grid', // Giao diện của bảng (striped, grid, plain)
                styles: { font: 'FreeSerif', fontSize: 13, halign: 'center' }, // Font và kích thước chữ trong bảng
                headStyles: { fillColor: [80, 81, 81] }, // Màu nền tiêu đề
                columnStyles: {
                    0: { cellWidth: 12 }, // Cột 1 (STT) rộng 20
                    1: { cellWidth: 115 }, // Cột 2 (Họ và Tên) rộng 50
                    2: { cellWidth: 25 }, // Cột 3 (Điểm Toán) rộng 25
                    3: { cellWidth: 25 }, // Cột 4 (Điểm Lý) rộng 25
                },
            });
            pdf.text('Nhận xét', 20, 215);
            pdf.text(`${ghichu ?? ''}`, 25, 220);
            pdf.text('TP.HCM, ngày    tháng    năm', 120, 245);
            pdf.text('Người đánh giá', 130, 250);
            pdf.text('(Ký và ghi rõ họ tên)', 125, 255);
            pdf.text(`${user.name}`, 130, 280);

            pdf.save(item.groupStudent);
        } else {

        }

    };
    const exportToPDFPhieuDiemHoiDong = async (item) => {
        const pdf = new jsPDF();

        let define = await defineHoiDong(item)
        let response = await teacherXemKetQuaPBSV2(item.groupStudent, item.id)

        let res = response.DT

        if (define == 'CTHD' && response.DT[0].Result.diemCTHD != null) {

            let ghichu = item.Criteriahoidong?.ghichu
            let danhgiaphanbiensv1 = item.Result?.danhgiaCTHD
            let diemSV1 = item.Result?.diemCTHD
            let diemSV2 = res[1] && res[1].Result?.diemCTHD
            let danhgiaphanbiensv2 = res[1] && res[1].Result?.danhgiaCTHD

            // Sử dụng font mặc định FreeSerif hỗ trợ Unicode
            pdf.setFont('FreeSerif', 'normal');
            pdf.setFontSize(13);
            // Thêm nội dung tiếng Việt
            pdf.text('TRƯỜNG ĐẠI HỌC CÔNG NGHIỆP TP.HCM', 10, 25);
            pdf.text('CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM', 115, 25);

            pdf.text('KHOA CÔNG NGHỆ THÔNG TIN', 20, 30);
            pdf.text('Độc lập - Tự do - Hạnh phúc', 135, 30);

            pdf.text('BỘ MÔN HỆ THỐNG THÔNG TIN', 20, 35);

            pdf.text('------------------------------------', 25, 40);
            pdf.text('-----------------------------------', 135, 35);

            pdf.text('PHIẾU ĐÁNH GIÁ KHÓA LUẬN TỐT NGHIỆP', 55, 50);

            pdf.text(`Họ tên người đánh giá: ${user.name}`, 20, 60);
            pdf.text('Vai trò của người đánh giá: Chủ tịch hội đồng', 20, 67);

            const projectName = `Tên đề tài: ${item.Project.name}`;
            const x = 20;
            let y = 74;

            // Kiểm tra xem tên đề tài có dài quá không và chia thành nhiều dòng
            const maxWidth = 180; // Giới hạn chiều rộng của text
            let lines = pdf.splitTextToSize(projectName, maxWidth);
            pdf.text(lines, x, y);
            pdf.text(`Họ tên sinh viên1: ${item.name}`, 20, y + 12);
            pdf.text(`Mã số sinh viên: ${item.maSo}`, 125, y + 12);

            if (res.length > 1) {
                pdf.text(`Họ tên sinh viên 2: ${res[1]?.name ?? ''}`, 20, 92);
                pdf.text(`Mã số sinh viên: ${res[1]?.maSo ?? ''}`, 125, 92);
            }

            const headers = [['STT', 'MSSV', 'Ho va Ten', 'Diem']];

            const data = [];

            if (res.length > 1) {
                data.push(
                    [1, item.maSo, item.name, diemSV1],
                    [2, res[1]?.maSo || '', res[1]?.name || '', res[1] ? diemSV2 : '']
                );
            } else {
                data.push(
                    [1, item.maSo, item.name, diemSV1]
                );
            }
            // Tạo bảng với autoTable
            autoTable(pdf, {
                head: headers,
                body: data,
                startY: 95, // Vị trí Y bắt đầu của bảng
                theme: 'grid', // Giao diện của bảng (striped, grid, plain)
                styles: { font: 'FreeSerif', fontSize: 13, halign: 'center' }, // Font và kích thước chữ trong bảng
                headStyles: { fillColor: [80, 81, 81] }, // Màu nền tiêu đề
                columnStyles: {
                    0: { cellWidth: 20 }, // Cột 1 (STT) rộng 17
                    1: { cellWidth: 65 }, // Cột 2 (MSSV) rộng 35
                    2: { cellWidth: 70 }, // Cột 3 (Họ và Tên) rộng 45
                    3: { cellWidth: 30 }, // Cột 4 (Điểm) rộng 32
                    //  3: { cellWidth: 25 }, // Cột 4 (Điểm Lý) rộng 25

                },
            });
            // pdf.text('Kết quả:', 80, 195);
            // pdf.text(`${item.Result.danhgiacuoiky == 'true' ? 'ĐẠT' : 'KHÔNG ĐẠT'}`, 100, 195);

            pdf.text('Nhận xét:', 20, 130);
            pdf.text(`${ghichu ?? ''}`, 23, 135);
            pdf.text('TP.HCM, ngày    tháng    năm', 120, 180);
            pdf.text('Người đánh giá', 130, 185);
            pdf.text('(Ký và ghi rõ họ tên)', 125, 190);


            pdf.save(item.name);

        } else if (define == 'TK' && response.DT[0].Result.diemTK != null) {
            let ghichu = item.Criteriahoidong?.ghichuTK
            let danhgiaphanbiensv1 = item.Result?.danhgiaTK
            let diemSV1 = item.Result?.diemTK
            let diemSV2 = res[1] && res[1].Result?.diemTK
            let danhgiaphanbiensv2 = res[1] && res[1].Result?.danhgiaTK

            // Sử dụng font mặc định FreeSerif hỗ trợ Unicode
            pdf.setFont('FreeSerif', 'normal');
            pdf.setFontSize(13);
            // Thêm nội dung tiếng Việt
            pdf.text('TRƯỜNG ĐẠI HỌC CÔNG NGHIỆP TP.HCM', 10, 25);
            pdf.text('CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM', 115, 25);

            pdf.text('KHOA CÔNG NGHỆ THÔNG TIN', 20, 30);
            pdf.text('Độc lập - Tự do - Hạnh phúc', 135, 30);

            pdf.text('BỘ MÔN HỆ THỐNG THÔNG TIN', 20, 35);

            pdf.text('------------------------------------', 25, 40);
            pdf.text('-----------------------------------', 135, 35);

            pdf.text('PHIẾU ĐÁNH GIÁ KHÓA LUẬN TỐT NGHIỆP', 55, 50);

            pdf.text(`Họ tên người đánh giá: ${user.name}`, 20, 60);
            pdf.text('Vai trò của người đánh giá: Thư kí', 20, 67);

            const projectName = `Tên đề tài: ${item.Project.name}`;
            const x = 20;
            let y = 74;

            // Kiểm tra xem tên đề tài có dài quá không và chia thành nhiều dòng
            const maxWidth = 180; // Giới hạn chiều rộng của text
            let lines = pdf.splitTextToSize(projectName, maxWidth);
            pdf.text(lines, x, y);
            pdf.text(`Họ tên sinh viên1: ${item.name}`, 20, y + 12);
            pdf.text(`Mã số sinh viên: ${item.maSo}`, 125, y + 12);

            if (res.length > 1) {
                pdf.text(`Họ tên sinh viên 2: ${res[1]?.name ?? ''}`, 20, 92);
                pdf.text(`Mã số sinh viên: ${res[1]?.maSo ?? ''}`, 125, 92);
            }

            const headers = [['STT', 'MSSV', 'Ho va Ten', 'Diem']];

            const data = [];

            if (res.length > 1) {
                data.push(
                    [1, item.maSo, item.name, diemSV1],
                    [2, res[1]?.maSo || '', res[1]?.name || '', res[1] ? diemSV2 : '']
                );
            } else {
                data.push(
                    [1, item.maSo, item.name, diemSV1]
                );
            }
            // Tạo bảng với autoTable
            autoTable(pdf, {
                head: headers,
                body: data,
                startY: 95, // Vị trí Y bắt đầu của bảng
                theme: 'grid', // Giao diện của bảng (striped, grid, plain)
                styles: { font: 'FreeSerif', fontSize: 13, halign: 'center' }, // Font và kích thước chữ trong bảng
                headStyles: { fillColor: [80, 81, 81] }, // Màu nền tiêu đề
                columnStyles: {
                    0: { cellWidth: 20 }, // Cột 1 (STT) rộng 17
                    1: { cellWidth: 65 }, // Cột 2 (MSSV) rộng 35
                    2: { cellWidth: 70 }, // Cột 3 (Họ và Tên) rộng 45
                    3: { cellWidth: 30 }, // Cột 4 (Điểm) rộng 32
                    //  3: { cellWidth: 25 }, // Cột 4 (Điểm Lý) rộng 25

                },
            });
            // pdf.text('Kết quả:', 80, 195);
            // pdf.text(`${item.Result.danhgiacuoiky == 'true' ? 'ĐẠT' : 'KHÔNG ĐẠT'}`, 100, 195);

            pdf.text('Nhận xét:', 20, 130);
            pdf.text(`${ghichu ?? ''}`, 23, 135);
            pdf.text('TP.HCM, ngày    tháng    năm', 120, 180);
            pdf.text('Người đánh giá', 130, 185);
            pdf.text('(Ký và ghi rõ họ tên)', 125, 190);
            pdf.save(item.groupStudent);
        } else if (define == 'UV' && response.DT[0].Result.diemUV != null) {

            let ghichu = item.Criteriahoidong?.ghichuUV
            let danhgiaphanbiensv1 = item.Result?.danhgiaUV
            let diemSV1 = item.Result?.diemUV
            let diemSV2 = res[1] && res[1].Result?.diemUV
            let danhgiaphanbiensv2 = res[1] && res[1].Result?.danhgiaUV

            // Sử dụng font mặc định FreeSerif hỗ trợ Unicode
            pdf.setFont('FreeSerif', 'normal');
            pdf.setFontSize(13);
            // Thêm nội dung tiếng Việt
            pdf.text('TRƯỜNG ĐẠI HỌC CÔNG NGHIỆP TP.HCM', 10, 25);
            pdf.text('CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM', 115, 25);

            pdf.text('KHOA CÔNG NGHỆ THÔNG TIN', 20, 30);
            pdf.text('Độc lập - Tự do - Hạnh phúc', 135, 30);

            pdf.text('BỘ MÔN HỆ THỐNG THÔNG TIN', 20, 35);

            pdf.text('------------------------------------', 25, 40);
            pdf.text('-----------------------------------', 135, 35);

            pdf.text('PHIẾU ĐÁNH GIÁ KHÓA LUẬN TỐT NGHIỆP', 55, 50);

            pdf.text(`Họ tên người đánh giá: ${user.name}`, 20, 60);
            pdf.text('Vai trò của người đánh giá: Ủy viên', 20, 67);

            const projectName = `Tên đề tài: ${item.Project.name}`;
            const x = 20;
            let y = 74;

            // Kiểm tra xem tên đề tài có dài quá không và chia thành nhiều dòng
            const maxWidth = 180; // Giới hạn chiều rộng của text
            let lines = pdf.splitTextToSize(projectName, maxWidth);
            pdf.text(lines, x, y);
            pdf.text(`Họ tên sinh viên1: ${item.name}`, 20, y + 12);
            pdf.text(`Mã số sinh viên: ${item.maSo}`, 125, y + 12);

            if (res.length > 1) {
                pdf.text(`Họ tên sinh viên 2: ${res[1]?.name ?? ''}`, 20, 92);
                pdf.text(`Mã số sinh viên: ${res[1]?.maSo ?? ''}`, 125, 92);
            }

            const headers = [['STT', 'MSSV', 'Ho va Ten', 'Diem']];

            const data = [];

            if (res.length > 1) {
                data.push(
                    [1, item.maSo, item.name, diemSV1],
                    [2, res[1]?.maSo || '', res[1]?.name || '', res[1] ? diemSV2 : '']
                );
            } else {
                data.push(
                    [1, item.maSo, item.name, diemSV1]
                );
            }
            // Tạo bảng với autoTable
            autoTable(pdf, {
                head: headers,
                body: data,
                startY: 95, // Vị trí Y bắt đầu của bảng
                theme: 'grid', // Giao diện của bảng (striped, grid, plain)
                styles: { font: 'FreeSerif', fontSize: 13, halign: 'center' }, // Font và kích thước chữ trong bảng
                headStyles: { fillColor: [80, 81, 81] }, // Màu nền tiêu đề
                columnStyles: {
                    0: { cellWidth: 20 }, // Cột 1 (STT) rộng 17
                    1: { cellWidth: 65 }, // Cột 2 (MSSV) rộng 35
                    2: { cellWidth: 70 }, // Cột 3 (Họ và Tên) rộng 45
                    3: { cellWidth: 30 }, // Cột 4 (Điểm) rộng 32
                    //  3: { cellWidth: 25 }, // Cột 4 (Điểm Lý) rộng 25

                },
            });
            // pdf.text('Kết quả:', 80, 195);
            // pdf.text(`${item.Result.danhgiacuoiky == 'true' ? 'ĐẠT' : 'KHÔNG ĐẠT'}`, 100, 195);

            pdf.text('Nhận xét:', 20, 130);
            pdf.text(`${ghichu ?? ''}`, 23, 135);
            pdf.text('TP.HCM, ngày    tháng    năm', 120, 180);
            pdf.text('Người đánh giá', 130, 185);
            pdf.text('(Ký và ghi rõ họ tên)', 125, 190);
            pdf.save(item.groupStudent);
        } else {

        }

    };

    const exportToPDFPoster = async (item) => {
        const pdf = new jsPDF();

        let define = await definePoster(item)
        let response = await teacherXemKetQuaPBSV2(item.groupStudent, item.id)

        let res = response.DT

        if (define == 'Poster1' && response.DT[0].Result.diemPoster1 != null) {
            let LOL1 = item.Criteriahoidong?.LOL1Poster1
            let LOL2 = item.Criteriahoidong?.LOL2Poster1
            let LOL3 = item.Criteriahoidong?.LOL3Poster1
            let LOL4 = item.Criteriahoidong?.LOL4Poster1
            let LOL5 = item.Criteriahoidong?.LOL5Poster1
            let LOL6 = item.Criteriahoidong?.LOL6Poster1
            let LOL7 = item.Criteriahoidong?.LOL7Poster1
            let LOL8 = item.Criteriahoidong?.LOL8Poster1
            let ghichu = item.Criteriahoidong?.ghichuPoster1
            let danhgiapostersv1 = item.Result?.danhgiaPoster1
            let diemSV1 = item.Result?.diemPoster1
            let LOL1SV2 = res[1] && res[1].Criteriahoidong?.LOL1Poster1
            let LOL2SV2 = res[1] && res[1].Criteriahoidong?.LOL2Poster1
            let LOL3SV2 = res[1] && res[1].Criteriahoidong?.LOL3Poster1
            let LOL4SV2 = res[1] && res[1].Criteriahoidong?.LOL4Poster1
            let LOL5SV2 = res[1] && res[1].Criteriahoidong?.LOL5Poster1
            let LOL6SV2 = res[1] && res[1].Criteriahoidong?.LOL6Poster1
            let LOL7SV2 = res[1] && res[1].Criteriahoidong?.LOL7Poster1
            let LOL8SV2 = res[1] && res[1].Criteriahoidong?.LOL8Poster1
            let diemSV2 = res[1] && res[1].Result?.diemPoster1
            let danhgiapostersv2 = res[1] && res[1].Result?.danhgiaPoster1

            // Sử dụng font mặc định FreeSerif hỗ trợ Unicode
            pdf.setFont('FreeSerif', 'normal');
            pdf.setFontSize(13);
            // Thêm nội dung tiếng Việt
            pdf.text('TRƯỜNG ĐẠI HỌC CÔNG NGHIỆP TP.HCM', 10, 25);
            pdf.text('CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM', 115, 25);

            pdf.text('KHOA CÔNG NGHỆ THÔNG TIN', 20, 30);
            pdf.text('Độc lập - Tự do - Hạnh phúc', 135, 30);

            pdf.text('BỘ MÔN HỆ THỐNG THÔNG TIN', 20, 35);

            pdf.text('------------------------------------', 25, 40);
            pdf.text('-----------------------------------', 135, 35);

            pdf.text('PHIẾU ĐÁNH GIÁ KHÓA LUẬN TỐT NGHIỆP', 55, 50);

            pdf.text(`Họ tên người đánh giá: ${user.name}`, 15, 60);
            pdf.text('Vai trò của người đánh giá: Poster 1', 15, 65);
            const projectName = `Tên đề tài: ${item.Project.name}`;
            const x = 15;
            let y = 70;

            // Kiểm tra xem tên đề tài có dài quá không và chia thành nhiều dòng
            const maxWidth = 180; // Giới hạn chiều rộng của text
            let lines = pdf.splitTextToSize(projectName, maxWidth);
            pdf.text(lines, x, y);
            pdf.text(`Họ tên sinh viên 1: ${item.name}`, 15, y + 10);
            pdf.text(`Mã số sinh viên: ${item.maSo}`, 120, y + 10);


            if (res.length > 1) {
                pdf.text(`Họ tên sinh viên 2: ${res[1]?.name ?? ''}`, 15, 85);
                pdf.text(`Mã số sinh viên: ${res[1]?.maSo ?? ''}`, 120, 85);
            }

            const headers = [['STT', 'LO', 'Sinh viên 1', res[1] && 'Sinh viên 2']];
            const data = [
                [1, 'Xác định được yêu cầu của khóa luận cần thực hiệnv', danhgiapostersv1 == 'true' ? LOL1 : '', danhgiapostersv2 == 'true' && res[1] ? LOL1SV2 : ''],
                [2, 'Phân tích yêu cầu nghiệp vụ hiện trạng và mô hình hóa được yêu cầu của đề tài', danhgiapostersv1 == 'true' ? LOL2 : '', danhgiapostersv2 == 'true' && res[1] ? LOL2SV2 : ''],
                [3, 'Thiết kế một hệ thống thông tin đưa ra giải pháp đáp ứng được yêu cầu của đề tài', danhgiapostersv1 == 'true' ? LOL3 : '', danhgiapostersv2 == 'true' && res[1] ? LOL3SV2 : ''],
                [4, 'Hiện thực hóa hệ thống thông tin theo thiết kế đã đưa ra/Hiện thực giải pháp đã đưa ra', danhgiapostersv1 == 'true' ? LOL4 : '', danhgiapostersv2 == 'true' && res[1] ? LOL4SV2 : ''],
                [5, 'Viết được báo cáo khóa luận tốt nghiệp', danhgiapostersv1 == 'true' ? LOL5 : '', danhgiapostersv2 == 'true' && res[1] ? LOL5SV2 : ''],
                [6, 'Trình bày được các kiến thức nền tảng liên quan đến đề tài khóa luận', danhgiapostersv1 == 'true' ? LOL6 : '', danhgiapostersv2 == 'true' && res[1] ? LOL6SV2 : ''],
                [7, 'Đánh giá việc thực hiện khóa luận đáp ứng yêu cầu đề tài khóa luận', danhgiapostersv1 == 'true' ? LOL7 : '', danhgiapostersv2 == 'true' && res[1] ? LOL7SV2 : ''],
                [8, 'Bảo vệ khóa kết quả khóa luận trước giản viên phản biện', danhgiapostersv1 == 'true' ? LOL8 : '', danhgiapostersv2 == 'true' && res[1] ? LOL8SV2 : ''],
                ['', 'Kết quả', danhgiapostersv1 == 'true' ? 'Đạt' : 'Không đạt', res[1] && (danhgiapostersv2 == 'true' ? 'Đạt' : 'Không đạt')],
            ];
            // Tạo bảng với autoTable
            autoTable(pdf, {
                head: headers,
                body: data,
                startY: 90, // Vị trí Y bắt đầu của bảng
                theme: 'grid', // Giao diện của bảng (striped, grid, plain)
                styles: { font: 'FreeSerif', fontSize: 13, halign: 'center' }, // Font và kích thước chữ trong bảng
                headStyles: { fillColor: [80, 81, 81] }, // Màu nền tiêu đề
                columnStyles: {
                    0: { cellWidth: 12 }, // Cột 1 (STT) rộng 20
                    1: { cellWidth: 115 }, // Cột 2 (Họ và Tên) rộng 50
                    2: { cellWidth: 25 }, // Cột 3 (Điểm Toán) rộng 25
                    3: { cellWidth: 25 }, // Cột 4 (Điểm Lý) rộng 25
                },
            });
            pdf.text('Nhận xét', 20, 215);
            pdf.text(`${ghichu ?? ''}`, 25, 220);
            pdf.text('TP.HCM, ngày    tháng    năm', 120, 245);
            pdf.text('Người đánh giá', 130, 250);
            pdf.text('(Ký và ghi rõ họ tên)', 125, 255);
            pdf.text(`${user.name}`, 130, 280);

            pdf.save(item.groupStudent);

        } else if (define == 'Poster2' && response.DT[0].Result.diemPoster2 != null) {
            let LOL1 = item.Criteriahoidong?.LOL1Poster2
            let LOL2 = item.Criteriahoidong?.LOL2Poster2
            let LOL3 = item.Criteriahoidong?.LOL3Poster2
            let LOL4 = item.Criteriahoidong?.LOL4Poster2
            let LOL5 = item.Criteriahoidong?.LOL5Poster2
            let LOL6 = item.Criteriahoidong?.LOL6Poster2
            let LOL7 = item.Criteriahoidong?.LOL7Poster2
            let LOL8 = item.Criteriahoidong?.LOL8Poster2
            let ghichu = item.Criteriahoidong?.ghichuPoster2
            let danhgiapostersv1 = item.Result?.danhgiaPoster2
            let diemSV1 = item.Result?.diemPoster2
            let LOL1SV2 = res[1] && res[1].Criteriahoidong?.LOL1Poster2
            let LOL2SV2 = res[1] && res[1].Criteriahoidong?.LOL2Poster2
            let LOL3SV2 = res[1] && res[1].Criteriahoidong?.LOL3Poster2
            let LOL4SV2 = res[1] && res[1].Criteriahoidong?.LOL4Poster2
            let LOL5SV2 = res[1] && res[1].Criteriahoidong?.LOL5Poster2
            let LOL6SV2 = res[1] && res[1].Criteriahoidong?.LOL6Poster2
            let LOL7SV2 = res[1] && res[1].Criteriahoidong?.LOL7Poster2
            let LOL8SV2 = res[1] && res[1].Criteriahoidong?.LOL8Poster2
            let diemSV2 = res[1] && res[1].Result?.diemPoster2
            let danhgiapostersv2 = res[1] && res[1].Result?.danhgiaPoster2

            // Sử dụng font mặc định FreeSerif hỗ trợ Unicode
            pdf.setFont('FreeSerif', 'normal');
            pdf.setFontSize(13);
            // Thêm nội dung tiếng Việt
            pdf.text('TRƯỜNG ĐẠI HỌC CÔNG NGHIỆP TP.HCM', 10, 25);
            pdf.text('CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM', 115, 25);

            pdf.text('KHOA CÔNG NGHỆ THÔNG TIN', 20, 30);
            pdf.text('Độc lập - Tự do - Hạnh phúc', 135, 30);

            pdf.text('BỘ MÔN HỆ THỐNG THÔNG TIN', 20, 35);

            pdf.text('------------------------------------', 25, 40);
            pdf.text('-----------------------------------', 135, 35);

            pdf.text('PHIẾU ĐÁNH GIÁ KHÓA LUẬN TỐT NGHIỆP', 55, 50);

            pdf.text(`Họ tên người đánh giá: ${user.name}`, 15, 60);
            pdf.text('Vai trò của người đánh giá: Poster 2', 15, 65);
            const projectName = `Tên đề tài: ${item.Project.name}`;
            const x = 15;
            let y = 70;

            // Kiểm tra xem tên đề tài có dài quá không và chia thành nhiều dòng
            const maxWidth = 180; // Giới hạn chiều rộng của text
            let lines = pdf.splitTextToSize(projectName, maxWidth);
            pdf.text(lines, x, y);
            pdf.text(`Họ tên sinh viên 1: ${item.name}`, 15, y + 10);
            pdf.text(`Mã số sinh viên: ${item.maSo}`, 120, y + 10);


            if (res.length > 1) {
                pdf.text(`Họ tên sinh viên 2: ${res[1]?.name ?? ''}`, 15, 85);
                pdf.text(`Mã số sinh viên: ${res[1]?.maSo ?? ''}`, 120, 85);
            }

            const headers = [['STT', 'LO', 'Sinh viên 1', res[1] && 'Sinh viên 2']];
            const data = [
                [1, 'Xác định được yêu cầu của khóa luận cần thực hiệnv', danhgiapostersv1 == 'true' ? LOL1 : '', danhgiapostersv2 == 'true' && res[1] ? LOL1SV2 : ''],
                [2, 'Phân tích yêu cầu nghiệp vụ hiện trạng và mô hình hóa được yêu cầu của đề tài', danhgiapostersv1 == 'true' ? LOL2 : '', danhgiapostersv2 == 'true' && res[1] ? LOL2SV2 : ''],
                [3, 'Thiết kế một hệ thống thông tin đưa ra giải pháp đáp ứng được yêu cầu của đề tài', danhgiapostersv1 == 'true' ? LOL3 : '', danhgiapostersv2 == 'true' && res[1] ? LOL3SV2 : ''],
                [4, 'Hiện thực hóa hệ thống thông tin theo thiết kế đã đưa ra/Hiện thực giải pháp đã đưa ra', danhgiapostersv1 == 'true' ? LOL4 : '', danhgiapostersv2 == 'true' && res[1] ? LOL4SV2 : ''],
                [5, 'Viết được báo cáo khóa luận tốt nghiệp', danhgiapostersv1 == 'true' ? LOL5 : '', danhgiapostersv2 == 'true' && res[1] ? LOL5SV2 : ''],
                [6, 'Trình bày được các kiến thức nền tảng liên quan đến đề tài khóa luận', danhgiapostersv1 == 'true' ? LOL6 : '', danhgiapostersv2 == 'true' && res[1] ? LOL6SV2 : ''],
                [7, 'Đánh giá việc thực hiện khóa luận đáp ứng yêu cầu đề tài khóa luận', danhgiapostersv1 == 'true' ? LOL7 : '', danhgiapostersv2 == 'true' && res[1] ? LOL7SV2 : ''],
                [8, 'Bảo vệ khóa kết quả khóa luận trước giản viên phản biện', danhgiapostersv1 == 'true' ? LOL8 : '', danhgiapostersv2 == 'true' && res[1] ? LOL8SV2 : ''],
                ['', 'Kết quả', danhgiapostersv1 == 'true' ? 'Đạt' : 'Không đạt', res[1] && (danhgiapostersv2 == 'true' ? 'Đạt' : 'Không đạt')],
            ];
            // Tạo bảng với autoTable
            autoTable(pdf, {
                head: headers,
                body: data,
                startY: 90, // Vị trí Y bắt đầu của bảng
                theme: 'grid', // Giao diện của bảng (striped, grid, plain)
                styles: { font: 'FreeSerif', fontSize: 13, halign: 'center' }, // Font và kích thước chữ trong bảng
                headStyles: { fillColor: [80, 81, 81] }, // Màu nền tiêu đề
                columnStyles: {
                    0: { cellWidth: 12 }, // Cột 1 (STT) rộng 20
                    1: { cellWidth: 115 }, // Cột 2 (Họ và Tên) rộng 50
                    2: { cellWidth: 25 }, // Cột 3 (Điểm Toán) rộng 25
                    3: { cellWidth: 25 }, // Cột 4 (Điểm Lý) rộng 25
                },
            });
            pdf.text('Nhận xét', 20, 215);
            pdf.text(`${ghichu ?? ''}`, 25, 220);
            pdf.text('TP.HCM, ngày    tháng    năm', 120, 245);
            pdf.text('Người đánh giá', 130, 250);
            pdf.text('(Ký và ghi rõ họ tên)', 125, 255);
            pdf.text(`${user.name}`, 130, 280);

            pdf.save(item.groupStudent);

        } else {

        }

    };
    const exportToPDFPhieuDiemPoster = async (item) => {
        const pdf = new jsPDF();

        let define = await definePoster(item)
        let response = await teacherXemKetQuaPBSV2(item.groupStudent, item.id)

        let res = response.DT

        if (define == 'Poster1' && response.DT[0].Result.diemPoster1 != null) {

            let ghichu = item.Criteriahoidong?.ghichuPoster1
            let danhgiaphanbiensv1 = item.Result?.danhgiaPoster1
            let diemSV1 = item.Result?.diemPoster1
            let diemSV2 = res[1] && res[1].Result?.diemPoster1
            let danhgiaphanbiensv2 = res[1] && res[1].Result?.danhgiaPoster1

            // Sử dụng font mặc định FreeSerif hỗ trợ Unicode
            pdf.setFont('FreeSerif', 'normal');
            pdf.setFontSize(13);
            // Thêm nội dung tiếng Việt
            pdf.text('TRƯỜNG ĐẠI HỌC CÔNG NGHIỆP TP.HCM', 10, 25);
            pdf.text('CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM', 115, 25);

            pdf.text('KHOA CÔNG NGHỆ THÔNG TIN', 20, 30);
            pdf.text('Độc lập - Tự do - Hạnh phúc', 135, 30);

            pdf.text('BỘ MÔN HỆ THỐNG THÔNG TIN', 20, 35);

            pdf.text('------------------------------------', 25, 40);
            pdf.text('-----------------------------------', 135, 35);

            pdf.text('PHIẾU ĐÁNH GIÁ KHÓA LUẬN TỐT NGHIỆP', 55, 50);

            pdf.text(`Họ tên người đánh giá: ${user.name}`, 20, 60);
            pdf.text('Vai trò của người đánh giá: Poster 1', 20, 67);

            const projectName = `Tên đề tài: ${item.Project.name}`;
            const x = 20;
            let y = 74;

            // Kiểm tra xem tên đề tài có dài quá không và chia thành nhiều dòng
            const maxWidth = 180; // Giới hạn chiều rộng của text
            let lines = pdf.splitTextToSize(projectName, maxWidth);
            pdf.text(lines, x, y);
            pdf.text(`Họ tên sinh viên1: ${item.name}`, 20, y + 12);
            pdf.text(`Mã số sinh viên: ${item.maSo}`, 125, y + 12);

            if (res.length > 1) {
                pdf.text(`Họ tên sinh viên 2: ${res[1]?.name ?? ''}`, 20, 92);
                pdf.text(`Mã số sinh viên: ${res[1]?.maSo ?? ''}`, 125, 92);
            }

            const headers = [['STT', 'MSSV', 'Ho va Ten', 'Diem']];

            const data = [];

            if (res.length > 1) {
                data.push(
                    [1, item.maSo, item.name, diemSV1],
                    [2, res[1]?.maSo || '', res[1]?.name || '', res[1] ? diemSV2 : '']
                );
            } else {
                data.push(
                    [1, item.maSo, item.name, diemSV1]
                );
            }
            // Tạo bảng với autoTable
            autoTable(pdf, {
                head: headers,
                body: data,
                startY: 95, // Vị trí Y bắt đầu của bảng
                theme: 'grid', // Giao diện của bảng (striped, grid, plain)
                styles: { font: 'FreeSerif', fontSize: 13, halign: 'center' }, // Font và kích thước chữ trong bảng
                headStyles: { fillColor: [80, 81, 81] }, // Màu nền tiêu đề
                columnStyles: {
                    0: { cellWidth: 20 }, // Cột 1 (STT) rộng 17
                    1: { cellWidth: 65 }, // Cột 2 (MSSV) rộng 35
                    2: { cellWidth: 70 }, // Cột 3 (Họ và Tên) rộng 45
                    3: { cellWidth: 30 }, // Cột 4 (Điểm) rộng 32
                    //  3: { cellWidth: 25 }, // Cột 4 (Điểm Lý) rộng 25

                },
            });
            // pdf.text('Kết quả:', 80, 195);
            // pdf.text(`${item.Result.danhgiacuoiky == 'true' ? 'ĐẠT' : 'KHÔNG ĐẠT'}`, 100, 195);

            pdf.text('Nhận xét:', 20, 130);
            pdf.text(`${ghichu ?? ''}`, 23, 135);
            pdf.text('TP.HCM, ngày    tháng    năm', 120, 180);
            pdf.text('Người đánh giá', 130, 185);
            pdf.text('(Ký và ghi rõ họ tên)', 125, 190);


            pdf.save(item.name);

        } else if (define == 'Poster2' && response.DT[0].Result.diemPoster2 != null) {
            let ghichu = item.Criteriahoidong?.ghichuPoster2
            let danhgiaphanbiensv1 = item.Result?.danhgiaPoster2
            let diemSV1 = item.Result?.diemPoster2
            let diemSV2 = res[1] && res[1].Result?.diemPoster2
            let danhgiaphanbiensv2 = res[1] && res[1].Result?.danhgiaPoster2

            // Sử dụng font mặc định FreeSerif hỗ trợ Unicode
            pdf.setFont('FreeSerif', 'normal');
            pdf.setFontSize(13);
            // Thêm nội dung tiếng Việt
            pdf.text('TRƯỜNG ĐẠI HỌC CÔNG NGHIỆP TP.HCM', 10, 25);
            pdf.text('CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM', 115, 25);

            pdf.text('KHOA CÔNG NGHỆ THÔNG TIN', 20, 30);
            pdf.text('Độc lập - Tự do - Hạnh phúc', 135, 30);

            pdf.text('BỘ MÔN HỆ THỐNG THÔNG TIN', 20, 35);

            pdf.text('------------------------------------', 25, 40);
            pdf.text('-----------------------------------', 135, 35);

            pdf.text('PHIẾU ĐÁNH GIÁ KHÓA LUẬN TỐT NGHIỆP', 55, 50);

            pdf.text(`Họ tên người đánh giá: ${user.name}`, 20, 60);
            pdf.text('Vai trò của người đánh giá: Poster 2', 20, 67);

            const projectName = `Tên đề tài: ${item.Project.name}`;
            const x = 20;
            let y = 74;

            // Kiểm tra xem tên đề tài có dài quá không và chia thành nhiều dòng
            const maxWidth = 180; // Giới hạn chiều rộng của text
            let lines = pdf.splitTextToSize(projectName, maxWidth);
            pdf.text(lines, x, y);
            pdf.text(`Họ tên sinh viên1: ${item.name}`, 20, y + 12);
            pdf.text(`Mã số sinh viên: ${item.maSo}`, 125, y + 12);

            if (res.length > 1) {
                pdf.text(`Họ tên sinh viên 2: ${res[1]?.name ?? ''}`, 20, 92);
                pdf.text(`Mã số sinh viên: ${res[1]?.maSo ?? ''}`, 125, 92);
            }

            const headers = [['STT', 'MSSV', 'Ho va Ten', 'Diem']];

            const data = [];

            if (res.length > 1) {
                data.push(
                    [1, item.maSo, item.name, diemSV1],
                    [2, res[1]?.maSo || '', res[1]?.name || '', res[1] ? diemSV2 : '']
                );
            } else {
                data.push(
                    [1, item.maSo, item.name, diemSV1]
                );
            }
            // Tạo bảng với autoTable
            autoTable(pdf, {
                head: headers,
                body: data,
                startY: 95, // Vị trí Y bắt đầu của bảng
                theme: 'grid', // Giao diện của bảng (striped, grid, plain)
                styles: { font: 'FreeSerif', fontSize: 13, halign: 'center' }, // Font và kích thước chữ trong bảng
                headStyles: { fillColor: [80, 81, 81] }, // Màu nền tiêu đề
                columnStyles: {
                    0: { cellWidth: 20 }, // Cột 1 (STT) rộng 17
                    1: { cellWidth: 65 }, // Cột 2 (MSSV) rộng 35
                    2: { cellWidth: 70 }, // Cột 3 (Họ và Tên) rộng 45
                    3: { cellWidth: 30 }, // Cột 4 (Điểm) rộng 32
                    //  3: { cellWidth: 25 }, // Cột 4 (Điểm Lý) rộng 25

                },
            });
            // pdf.text('Kết quả:', 80, 195);
            // pdf.text(`${item.Result.danhgiacuoiky == 'true' ? 'ĐẠT' : 'KHÔNG ĐẠT'}`, 100, 195);

            pdf.text('Nhận xét:', 20, 130);
            pdf.text(`${ghichu ?? ''}`, 23, 135);
            pdf.text('TP.HCM, ngày    tháng    năm', 120, 180);
            pdf.text('Người đánh giá', 130, 185);
            pdf.text('(Ký và ghi rõ họ tên)', 125, 190);
            pdf.save(item.groupStudent);
        } else {

        }

    };
    return (
        <>
            <div className='container'>
                <p className="mt-3 "><i>Số lượng sinh viên cần chấm <b>Hội Đồng</b> :</i> <b className="text-danger"> {students ? students.length : ''}</b></p>
                <table className="table text-center table-bordered table-hover mt-3">
                    <thead>
                        <tr>
                            <th style={{ width: "6%" }} >MSSV</th>
                            <th style={{ width: "9%" }}>Tên</th>
                            <th style={{ width: "14%" }}>Tên Đề Tài</th>
                            <th style={{ width: "20%" }}>Mô Tả</th>

                            <th style={{ width: "9%" }}>GVHD</th>
                            <th style={{ width: "6%" }}>Nhóm</th>
                            <th style={{ width: "12%" }}>Hội Đồng</th>
                            <th style={{ width: "12%" }}></th>

                        </tr>
                    </thead>
                    <tbody>
                        {students.length > 0 ? students.map((item, index) => {
                            const isGroupNull = item.groupStudent === null || item.groupStudent === 'null';
                            const showButton =
                                isGroupNull ||
                                (!renderedGroups.has(item.groupStudent) && item.groupStudent !== 'null');

                            if (item.groupStudent && item.groupStudent !== 'null') {
                                renderedGroups.set(item.groupStudent, true);
                            }

                            return (
                                <tr key={`student-${index}`}>
                                    <td>{item.maSo}</td>
                                    <td>{item.name}</td>
                                    <td>{item.Project.name}</td>
                                    <td>{item.Project.description}</td>

                                    <td>{item.Project.instuctor}</td>
                                    <td>{isGroupNull ? <i>Làm một mình</i> : item.groupStudent}</td>
                                    <td>
                                        {/* Hiển thị giáo viên PB1 */}
                                        {listtecher && (
                                            listtecher
                                                .filter(itemm => itemm.id == item.CTHD)
                                                .map((itemmm, index) => (
                                                    itemmm.maSo == user.maSo ?
                                                        <b><p key={`CTHD-${index}`}>CTHD: {itemmm.name}</p> </b>
                                                        : <p key={`CTHD-${index}`}>TK: {itemmm.name}</p>
                                                ))
                                        )}
                                        {listtecher && (
                                            listtecher
                                                .filter(itemm => itemm.id == item.TK)
                                                .map((itemmm, index) => (
                                                    itemmm.maSo == user.maSo ?
                                                        <b>  <p key={`TK-${index}`}>TK: {itemmm.name}</p> </b>
                                                        : <p key={`TK-${index}`}>TK: {itemmm.name}</p>
                                                ))
                                        )}
                                        {listtecher && (
                                            listtecher
                                                .filter(itemm => itemm.id == item.UV)
                                                .map((itemmm, index) => (
                                                    itemmm.maSo == user.maSo ?
                                                        <b><p key={`UV-${index}`}>UV: {itemmm.name}</p></b>
                                                        : <p key={`UV-${index}`}>UV: {itemmm.name}</p>
                                                ))
                                        )}
                                    </td>
                                    <td>
                                        {showButton && (
                                            <>
                                                <button onClick={() => handleChamDiemHoiDong(item)} className="btn btn-success">
                                                    <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                                                </button>
                                                <br /><br />
                                                {item.groupStudent &&
                                                    ((item.Result?.diemCTHD !== null) ? (
                                                        <i className="text-primary">CTHD: Đã đánh giá</i>
                                                    ) : (
                                                        <i className="text-danger">CTHD: Chưa đánh giá</i>
                                                    ))}
                                                <br></br>
                                                {item.groupStudent &&
                                                    ((item.Result?.diemTK !== null) ? (
                                                        <i className="text-primary">TK: Đã đánh giá</i>
                                                    ) : (
                                                        <i className="text-danger">TK: Chưa đánh giá</i>
                                                    ))}  <br></br>
                                                {item.groupStudent &&
                                                    ((item.Result?.diemUV !== null) ? (
                                                        <i className="text-primary">UV: Đã đánh giá</i>
                                                    ) : (
                                                        <i className="text-danger">UV: Chưa đánh giá</i>
                                                    ))}
                                                {/* {item.Result && item.Result.trungbinhhoidong &&
                                                    <>
                                                        <p className="text-primary mb-0" onClick={() => exportToPDFHoiDong(item)}>(Phiếu đánh giá)</p>
                                                        <p className="text-primary" onClick={() => exportToPDFPhieuDiemHoiDong(item)}>(Phiếu điểm)</p>

                                                    </>
                                                } */}
                                                {item.Result && (item.CTHD == user.id) && (item.Result.diemCTHD != null) &&
                                                    <>
                                                        <p className="text-primary mb-0" onClick={() => exportToPDFHoiDong(item)}>(Phiếu đánh giá)</p>
                                                        <p className="text-primary" onClick={() => exportToPDFPhieuDiemHoiDong(item)}>(Phiếu điểm)</p>

                                                    </>
                                                }
                                                {item.Result && (item.TK == user.id) && (item.Result.diemTK != null) &&
                                                    <>
                                                        <p className="text-primary mb-0" onClick={() => exportToPDFHoiDong(item)}>(Phiếu đánh giá)</p>
                                                        <p className="text-primary" onClick={() => exportToPDFPhieuDiemHoiDong(item)}>(Phiếu điểm)</p>

                                                    </>
                                                }
                                                {item.Result && (item.UV == user.id) && (item.Result.diemUV != null) &&
                                                    <>
                                                        <p className="text-primary mb-0" onClick={() => exportToPDFHoiDong(item)}>(Phiếu đánh giá)</p>
                                                        <p className="text-primary" onClick={() => exportToPDFPhieuDiemHoiDong(item)}>(Phiếu điểm)</p>

                                                    </>
                                                }
                                            </>
                                        )}

                                    </td>


                                </tr>
                            );
                        }) : <tr>

                            <td colSpan={8}><i>Chưa được phân chấm hội đồng</i></td>
                        </tr>}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            <Modal
                className="text-center"
                size="lg"
                show={showModal}
                onHide={handleCloseModal}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title className="modal-title-center">
                        Đánh giá Hội Đồng (Báo cáo)
                        <span className="text-danger">

                        </span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <>
                        {
                            listSV1SV2 && listSV1SV2.length == 2 &&
                            <>
                                <div className="row">
                                    <div className="col-sm-4  px-0">
                                        <b> SV1: </b>&nbsp;&nbsp;<i className="">{listSV1SV2[0].name} </i> &nbsp;<i className="">{listSV1SV2[0].maSo} </i>
                                    </div>
                                    <div className="col-sm-2 px-0">
                                        <select value={HoiDongSV1.danhgiahoidong} onChange={(event) => handleOnchange(event.target.value, 'danhgiahoidong')} className={HoiDongSV1.danhgiahoidong == 'true' ? 'form-select text-primary' : 'form-select text-danger'}>
                                            <option value={'null'}>---</option>
                                            <option className="text-primary" value={'true'}>Đạt</option>
                                            <option className="text-danger" value={'false'}>Không đạt</option>
                                        </select>
                                    </div>
                                    {
                                        (HoiDongSV1.danhgiahoidong == 'true' || HoiDongSV1.danhgiahoidong == 'false') &&
                                        <>
                                            <div className="col-sm-4 px-0">
                                                <b> SV2:</b> &nbsp;&nbsp;<i className="">{listSV1SV2[1].name} </i>&nbsp;<i className="">{listSV1SV2[1].maSo} </i>
                                            </div>
                                            <div className="col-sm-2 px-0">
                                                <select value={HoiDongSV2.danhgiahoidong} onChange={(event) => handleOnchange2(event.target.value, 'danhgiahoidong')} className={HoiDongSV2.danhgiahoidong == 'true' ? 'form-select text-primary' : 'form-select text-danger'}>
                                                    <option value={'null'}>---</option>
                                                    <option className="text-primary" value={'true'}>Đạt</option>
                                                    <option className="text-danger" value={'false'}>Không đạt</option>
                                                </select>
                                            </div>
                                        </>
                                    }
                                </div>
                            </>
                        }
                        <div className="row mt-2">
                            {
                                listSV1SV2.length == 2 ?
                                    <>
                                        {
                                            HoiDongSV1.danhgiahoidong == 'false' && (HoiDongSV2.danhgiahoidong == 'null' || !HoiDongSV2.danhgiahoidong) &&
                                            <>
                                                <div className="col-sm-4 px-0"><i className="text-danger diemhuongdan"> Điểm  SV1</i></div>
                                                <input value={HoiDongSV1.diemSV1} className="col-sm-2 " type="number" />

                                            </>
                                        }
                                        {
                                            HoiDongSV1.danhgiahoidong == 'false' && HoiDongSV2.danhgiahoidong == 'false' &&
                                            <>
                                                <div className="col-sm-4 px-0"><i className="text-danger diemhuongdan"> Điểm  SV1</i></div>
                                                <input value={HoiDongSV1.diemSV1} className="col-sm-2 " type="number" />
                                                <div className="col-sm-4 px-0"><i className="text-danger diemhuongdan"> Điểm  SV2</i></div>
                                                <input value={HoiDongSV2.diemSV2} className="col-sm-2 " type="number" />

                                            </>
                                        }
                                        {
                                            HoiDongSV1.danhgiahoidong == 'false' && HoiDongSV2.danhgiahoidong == 'true' &&
                                            <>
                                                <div className="col-sm-4 px-0"><i className="text-danger diemhuongdan"> Điểm  SV1</i></div>
                                                <input value={HoiDongSV1.diemSV1} className="col-sm-2 " type="number" />
                                                <div className="col-sm-4 px-0"><i className="text-danger diemhuongdan"> Điểm  SV2</i></div>
                                                <input value={HoiDongSV2.diemSV2} onChange={(event) => handleOnchange2(event.target.value, 'diemSV2')} className="col-sm-2 " type="number" />

                                            </>
                                        }
                                        {
                                            HoiDongSV1.danhgiahoidong == 'true' && (HoiDongSV2.danhgiahoidong == 'null' || !HoiDongSV2.danhgiahoidong) &&
                                            <>
                                                <div className="col-sm-4 px-0"><i className="text-danger diemhuongdan"> Điểm  SV1</i></div>
                                                <input value={HoiDongSV1.diemSV1} onChange={(event) => handleOnchange(event.target.value, 'diemSV1')} className="col-sm-2 " type="number" />

                                            </>
                                        }
                                        {
                                            HoiDongSV1.danhgiahoidong == 'true' && HoiDongSV2.danhgiahoidong == 'true' &&
                                            <>
                                                <div className="col-sm-4 px-0"><i className="text-danger diemhuongdan"> Điểm  SV1</i></div>
                                                <input value={HoiDongSV1.diemSV1} onChange={(event) => handleOnchange(event.target.value, 'diemSV1')} className="col-sm-2 " type="number" />
                                                <div className="col-sm-4 px-0"><i className="text-danger diemhuongdan"> Điểm  SV2</i></div>
                                                <input value={HoiDongSV2.diemSV2} onChange={(event) => handleOnchange2(event.target.value, 'diemSV2')} className="col-sm-2 " type="number" />

                                            </>
                                        }
                                        {
                                            HoiDongSV1.danhgiahoidong == 'true' && HoiDongSV2.danhgiahoidong == 'false' &&
                                            <>
                                                <div className="col-sm-4 px-0"><i className="text-danger diemhuongdan"> Điểm  SV1</i></div>
                                                <input value={HoiDongSV1.diemSV1} onChange={(event) => handleOnchange(event.target.value, 'diemSV1')} className="col-sm-2 " type="number" />
                                                <div className="col-sm-4 px-0"><i className="text-danger diemhuongdan"> Điểm  SV2</i></div>
                                                <input value={HoiDongSV2.diemSV2} className="col-sm-2 " type="number" />

                                            </>
                                        }
                                        {
                                            HoiDongSV1.danhgiahoidong == '' &&
                                            <>
                                            </>
                                        }
                                        {
                                            (HoiDongSV1.danhgiahoidong == 'null' || !HoiDongSV1.danhgiahoidong) && HoiDongSV2.danhgiahoidong == 'false' &&
                                            <>
                                                <div className="col-sm-4 px-0"></div>
                                                <div className="col-sm-4 px-0"><i className="text-danger diemhuongdan"> Điểm hướng dẫn SV2</i></div>
                                                <input value={HoiDongSV2.diemSV2} onChange={(event) => handleOnchange2(event.target.value, 'diemSV2')} className="col-sm-2 " type="number" />

                                            </>
                                        }

                                    </>
                                    : <>

                                        <div className="col-sm-4 px-0 ">
                                            <b>   {listSV1SV2.length && listSV1SV2[0].name}</b> &nbsp;&nbsp; {listSV1SV2.length && listSV1SV2[0].maSo}
                                        </div>
                                        <div className="col-sm-3">
                                            <select value={HoiDongSV1.danhgiahoidong} onChange={(event) => handleOnchange(event.target.value, 'danhgiahoidong')} className={HoiDongSV1.danhgiahoidong == 'true' ? 'form-select text-primary' : 'form-select text-danger'}>
                                                <option value={'null'}>---</option>
                                                <option className="text-primary" value={'true'}>Đạt</option>
                                                <option className="text-danger" value={'false'}>Không đạt</option>
                                            </select>
                                        </div>
                                        {
                                            HoiDongSV1.danhgiahoidong == 'true' &&
                                            <>
                                                <div className="col-sm-3  "><i className="text-danger"> Điểm  </i></div>
                                                <input value={HoiDongSV1.diemSV1} onChange={(event) => handleOnchange(event.target.value, 'diemSV1')} className="col-sm-2 " type="number" />
                                            </>
                                        }
                                        {
                                            HoiDongSV1.danhgiahoidong == 'false' &&
                                            <>
                                                <div className="col-sm-3  "><i className="text-danger"> Điểm  </i></div>
                                                <input value={HoiDongSV1.diemSV1} className="col-sm-2 " type="number" />

                                            </>

                                        }
                                    </>
                            }

                        </div>

                        <div className="row mt-3">
                            <div className="col-sm-12">
                                {
                                    ((HoiDongSV1.danhgiahoidong && HoiDongSV1.danhgiahoidong == 'true') || (HoiDongSV2.danhgiahoidong && HoiDongSV2.danhgiahoidong == 'true')) &&
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th style={{ width: "10%" }}>STT</th>
                                                <th style={{ width: "70%" }}>
                                                    Tiêu chí
                                                </th>
                                                {
                                                    HoiDongSV1.danhgiahoidong == 'true' &&
                                                    <th
                                                        style={{ width: "20%" }}>
                                                        SV1
                                                    </th>
                                                }
                                                {
                                                    listSV1SV2.length == 2 && HoiDongSV2.danhgiahoidong == 'true' &&
                                                    <th style={{ width: "20%" }}>
                                                        SV2
                                                    </th>
                                                }
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {[
                                                "Xác định được yêu cầu của khóa luận cần thực hiện",
                                                "Phân tích yêu cầu nghiệp vụ hiện trạng và mô hình hóa được yêu cầu của đề tài",
                                                "Thiết kế một hệ thống thông tin đưa ra giải pháp đáp ứng được yêu cầu của đề tài",
                                                "Hiện thực hóa hệ thống thông tin theo thiết kế đã đưa ra/Hiện thực giải pháp đã đưa ra",
                                                "Viết được báo cáo khóa luận tốt nghiệp",
                                                "Trình bày được các kiến thức nền tảng liên quan đến đề tài khóa luận",
                                                "Đánh giá việc thực hiện khóa luận đáp ứng yêu cầu đề tài khóa luận",
                                                "Bảo vệ khóa kết quả khóa luận trước hội đồng(Báo cáo)",
                                            ].map((criteria, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{criteria}</td>
                                                    {HoiDongSV1.danhgiahoidong == 'true' ?
                                                        <td>
                                                            <select value={HoiDongSV1[`LOL${index + 1}`]} onChange={(event) => handleOnchange(event.target.value, `LOL${index + 1}`)} className="form-select">
                                                                <option value={''}>----</option>
                                                                <option value={'1'}>1</option>
                                                                <option value={'2'}>2</option>
                                                                <option value={'3'}>3</option>
                                                                <option value={'4'}>4</option>
                                                            </select>
                                                        </td>
                                                        : ''
                                                    }
                                                    {
                                                        listSV1SV2.length == 2 && HoiDongSV2.danhgiahoidong == 'true' &&
                                                        <td>
                                                            <select value={HoiDongSV2[`LOL${index + 1}`]} onChange={(event) => handleOnchange2(event.target.value, `LOL${index + 1}`)} className="form-select">
                                                                <option value={''}>----</option>
                                                                <option value={'1'}>1</option>
                                                                <option value={'2'}>2</option>
                                                                <option value={'3'}>3</option>
                                                                <option value={'4'}>4</option>
                                                            </select>
                                                        </td>
                                                    }
                                                </tr>
                                            ))}


                                        </tbody>
                                    </table>
                                }
                            </div>
                        </div>
                        {
                            HoiDongSV1.danhgiahoidong == 'true' &&
                            <div className="row">
                                <div className="col-sm-2"><i className="text-primary">Nhận xét</i></div>
                                <textarea value={HoiDongSV1.ghichu} onChange={(event) => handleOnchange(event.target.value, 'ghichu')} className="col-sm-9"></textarea>
                            </div>
                        }

                    </>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Đóng
                    </Button>

                    <Button onClick={hanldeConfirm} variant="primary">Xác nhận</Button>

                </Modal.Footer>
            </Modal>


            <div className='container'>
                <p className="mt-3 "><i>Số lượng sinh viên cần chấm <b>Poster</b> :</i> <b className="text-danger"> {studentsPoster ? studentsPoster.length : ''}</b></p>
                <table className="table text-center table-bordered table-hover mt-3">
                    <thead>
                        <tr>
                            <th style={{ width: "6%" }} >MSSV</th>
                            <th style={{ width: "9%" }}>Tên</th>
                            <th style={{ width: "14%" }}>Tên Đề Tài</th>
                            <th style={{ width: "20%" }}>Mô Tả</th>

                            <th style={{ width: "9%" }}>GVHD</th>
                            <th style={{ width: "6%" }}>Nhóm</th>
                            <th style={{ width: "12%" }}>Poster</th>
                            <th style={{ width: "12%" }}></th>

                        </tr>
                    </thead>
                    <tbody>
                        {studentsPoster.length > 0 ? studentsPoster.map((item, index) => {
                            const isGroupNull = item.groupStudent === null || item.groupStudent === 'null';
                            const showButton =
                                isGroupNull ||
                                (!renderedGroups.has(item.groupStudent) && item.groupStudent !== 'null');

                            if (item.groupStudent && item.groupStudent !== 'null') {
                                renderedGroups.set(item.groupStudent, true);
                            }

                            return (
                                <tr key={`student-${index}`}>
                                    <td>{item.maSo}</td>
                                    <td>{item.name}</td>
                                    <td>{item.Project.name}</td>
                                    <td>{item.Project.description}</td>

                                    <td>{item.Project.instuctor}</td>
                                    <td>{isGroupNull ? <i>Làm một mình</i> : item.groupStudent}</td>
                                    <td>
                                        {/* Hiển thị giáo viên PB1 */}
                                        {listtecher && (
                                            listtecher
                                                .filter(itemm => itemm.id == item.Poster1)
                                                .map((itemmm, index) => (
                                                    itemmm.maSo == user.maSo ?
                                                        <b><p key={`Poster1-${index}`}>PT1: {itemmm.name}</p> </b>
                                                        : <p key={`Poster1-${index}`}>PT1: {itemmm.name}</p>
                                                ))
                                        )}
                                        {listtecher && (
                                            listtecher
                                                .filter(itemm => itemm.id == item.Poster2)
                                                .map((itemmm, index) => (
                                                    itemmm.maSo == user.maSo ?
                                                        <b>  <p key={`Poster2-${index}`}>PT2: {itemmm.name}</p> </b>
                                                        : <p key={`Poster2-${index}`}>PT2: {itemmm.name}</p>
                                                ))
                                        )}

                                    </td>
                                    <td>
                                        {showButton && (
                                            <>
                                                <button onClick={() => handleChamDiemPoster(item)} className="btn btn-success">
                                                    <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                                                </button>
                                                <br /><br />
                                                {item.groupStudent &&
                                                    ((item.Result?.diemPoster1 !== null) ? (
                                                        <i className="text-primary">PT1: Đã đánh giá</i>
                                                    ) : (
                                                        <i className="text-danger">PT1: Chưa đánh giá</i>
                                                    ))}
                                                <br></br>
                                                {item.groupStudent &&
                                                    ((item.Result?.diemPoster2 !== null) ? (
                                                        <i className="text-primary">PT2: Đã đánh giá</i>
                                                    ) : (
                                                        <i className="text-danger">PT2: Chưa đánh giá</i>
                                                    ))}  <br></br>
                                                {/* {item.Result && item.Result.trungbinhhoidong &&
                                                    <>
                                                        <p className="text-primary mb-0" onClick={() => exportToPDFPoster(item)}>(Phiếu đánh giá)</p>
                                                        <p className="text-primary" onClick={() => exportToPDFPhieuDiemPoster(item)}>(Phiếu điểm)</p>

                                                    </>
                                                } */}
                                                {item.Result && (item.Poster1 == user.id) && (item.Result.diemPoster1 != null) &&
                                                    <>
                                                        <p className="text-primary mb-0" onClick={() => exportToPDFPoster(item)}>(Phiếu đánh giá)</p>
                                                        <p className="text-primary" onClick={() => exportToPDFPhieuDiemPoster(item)}>(Phiếu điểm)</p>

                                                    </>
                                                }
                                                {item.Result && (item.Poster2 == user.id) && (item.Result.diemPoster2 != null) &&
                                                    <>
                                                        <p className="text-primary mb-0" onClick={() => exportToPDFPoster(item)}>(Phiếu đánh giá)</p>
                                                        <p className="text-primary" onClick={() => exportToPDFPhieuDiemPoster(item)}>(Phiếu điểm)</p>

                                                    </>
                                                }
                                            </>
                                        )}
                                    </td>
                                </tr>
                            );
                        }) : <tr>

                            <td colSpan={8}><i>Chưa được phân chấm Poster</i></td>
                        </tr>}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            <Modal
                className="text-center"
                size="lg"
                show={showModalPoster}
                onHide={handleCloseModalPoster}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title className="modal-title-center">
                        Đánh giá Poster
                        <span className="text-danger">

                        </span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <>
                        {
                            listSV1SV2 && listSV1SV2.length == 2 &&
                            <>
                                <div className="row">
                                    <div className="col-sm-4  px-0">
                                        <b> SV1: </b>&nbsp;&nbsp;<i className="">{listSV1SV2[0].name} </i> &nbsp;<i className="">{listSV1SV2[0].maSo} </i>
                                    </div>
                                    <div className="col-sm-2 px-0">
                                        <select value={PosterSV1.danhgiaposter} onChange={(event) => handleOnchangePoster(event.target.value, 'danhgiaposter')} className={PosterSV1.danhgiaposter == 'true' ? 'form-select text-primary' : 'form-select text-danger'}>
                                            <option value={'null'}>---</option>
                                            <option className="text-primary" value={'true'}>Đạt</option>
                                            <option className="text-danger" value={'false'}>Không đạt</option>
                                        </select>
                                    </div>
                                    {
                                        (PosterSV1.danhgiaposter == 'true' || PosterSV1.danhgiaposter == 'false') &&
                                        <>
                                            <div className="col-sm-4 px-0">
                                                <b> SV2:</b> &nbsp;&nbsp;<i className="">{listSV1SV2[1].name} </i>&nbsp;<i className="">{listSV1SV2[1].maSo} </i>
                                            </div>
                                            <div className="col-sm-2 px-0">
                                                <select value={PosterSV2.danhgiaposter} onChange={(event) => handleOnchange2Poster(event.target.value, 'danhgiaposter')} className={PosterSV2.danhgiaposter == 'true' ? 'form-select text-primary' : 'form-select text-danger'}>
                                                    <option value={'null'}>---</option>
                                                    <option className="text-primary" value={'true'}>Đạt</option>
                                                    <option className="text-danger" value={'false'}>Không đạt</option>
                                                </select>
                                            </div>
                                        </>
                                    }
                                </div>
                            </>
                        }
                        <div className="row mt-2">
                            {
                                listSV1SV2.length == 2 ?
                                    <>
                                        {
                                            PosterSV1.danhgiaposter == 'false' && (PosterSV2.danhgiaposter == 'null' || !PosterSV2.danhgiaposter) &&
                                            <>
                                                <div className="col-sm-4 px-0"><i className="text-danger diemhuongdan"> Điểm  SV1</i></div>
                                                <input value={PosterSV1.diemSV1} className="col-sm-2 " type="number" />

                                            </>
                                        }
                                        {
                                            PosterSV1.danhgiaposter == 'false' && PosterSV2.danhgiaposter == 'false' &&
                                            <>
                                                <div className="col-sm-4 px-0"><i className="text-danger diemhuongdan"> Điểm  SV1</i></div>
                                                <input value={PosterSV1.diemSV1} className="col-sm-2 " type="number" />
                                                <div className="col-sm-4 px-0"><i className="text-danger diemhuongdan"> Điểm  SV2</i></div>
                                                <input value={PosterSV2.diemSV2} className="col-sm-2 " type="number" />

                                            </>
                                        }
                                        {
                                            PosterSV1.danhgiaposter == 'false' && PosterSV2.danhgiaposter == 'true' &&
                                            <>
                                                <div className="col-sm-4 px-0"><i className="text-danger diemhuongdan"> Điểm  SV1</i></div>
                                                <input value={PosterSV1.diemSV1} className="col-sm-2 " type="number" />
                                                <div className="col-sm-4 px-0"><i className="text-danger diemhuongdan"> Điểm  SV2</i></div>
                                                <input value={PosterSV2.diemSV2} onChange={(event) => handleOnchange2Poster(event.target.value, 'diemSV2')} className="col-sm-2 " type="number" />

                                            </>
                                        }
                                        {
                                            PosterSV1.danhgiaposter == 'true' && (PosterSV2.danhgiaposter == 'null' || !PosterSV2.danhgiaposter) &&
                                            <>
                                                <div className="col-sm-4 px-0"><i className="text-danger diemhuongdan"> Điểm  SV1</i></div>
                                                <input value={PosterSV1.diemSV1} onChange={(event) => handleOnchangePoster(event.target.value, 'diemSV1')} className="col-sm-2 " type="number" />

                                            </>
                                        }
                                        {
                                            PosterSV1.danhgiaposter == 'true' && PosterSV2.danhgiaposter == 'true' &&
                                            <>
                                                <div className="col-sm-4 px-0"><i className="text-danger diemhuongdan"> Điểm  SV1</i></div>
                                                <input value={PosterSV1.diemSV1} onChange={(event) => handleOnchangePoster(event.target.value, 'diemSV1')} className="col-sm-2 " type="number" />
                                                <div className="col-sm-4 px-0"><i className="text-danger diemhuongdan"> Điểm  SV2</i></div>
                                                <input value={PosterSV2.diemSV2} onChange={(event) => handleOnchange2Poster(event.target.value, 'diemSV2')} className="col-sm-2 " type="number" />

                                            </>
                                        }
                                        {
                                            PosterSV1.danhgiaposter == 'true' && PosterSV2.danhgiaposter == 'false' &&
                                            <>
                                                <div className="col-sm-4 px-0"><i className="text-danger diemhuongdan"> Điểm  SV1</i></div>
                                                <input value={PosterSV1.diemSV1} onChange={(event) => handleOnchangePoster(event.target.value, 'diemSV1')} className="col-sm-2 " type="number" />
                                                <div className="col-sm-4 px-0"><i className="text-danger diemhuongdan"> Điểm  SV2</i></div>
                                                <input value={PosterSV2.diemSV2} className="col-sm-2 " type="number" />

                                            </>
                                        }
                                        {
                                            PosterSV1.danhgiaposter == '' &&
                                            <>
                                            </>
                                        }
                                        {
                                            (PosterSV1.danhgiaposter == 'null' || !PosterSV1.danhgiaposter) && PosterSV2.danhgiaposter == 'false' &&
                                            <>
                                                <div className="col-sm-4 px-0"></div>
                                                <div className="col-sm-4 px-0"><i className="text-danger diemhuongdan"> Điểm hướng dẫn SV2</i></div>
                                                <input value={PosterSV2.diemSV2} onChange={(event) => handleOnchange2Poster(event.target.value, 'diemSV2')} className="col-sm-2 " type="number" />

                                            </>
                                        }

                                    </>
                                    : <>

                                        <div className="col-sm-4 px-0 ">
                                            <b>   {listSV1SV2.length && listSV1SV2[0].name}</b> &nbsp;&nbsp; {listSV1SV2.length && listSV1SV2[0].maSo}
                                        </div>
                                        <div className="col-sm-3">
                                            <select value={PosterSV1.danhgiaposter} onChange={(event) => handleOnchangePoster(event.target.value, 'danhgiaposter')} className={PosterSV1.danhgiaposter == 'true' ? 'form-select text-primary' : 'form-select text-danger'}>
                                                <option value={'null'}>---</option>
                                                <option className="text-primary" value={'true'}>Đạt</option>
                                                <option className="text-danger" value={'false'}>Không đạt</option>
                                            </select>
                                        </div>
                                        {
                                            PosterSV1.danhgiaposter == 'true' &&
                                            <>
                                                <div className="col-sm-3  "><i className="text-danger"> Điểm Poster </i></div>
                                                <input value={PosterSV1.diemSV1} onChange={(event) => handleOnchangePoster(event.target.value, 'diemSV1')} className="col-sm-2 " type="number" />
                                            </>
                                        }
                                        {
                                            PosterSV1.danhgiaposter == 'false' &&
                                            <>
                                                <div className="col-sm-3  "><i className="text-danger"> Điểm Poster </i></div>
                                                <input value={PosterSV1.diemSV1} className="col-sm-2 " type="number" />

                                            </>

                                        }
                                    </>
                            }

                        </div>

                        <div className="row mt-3">
                            <div className="col-sm-12">
                                {
                                    ((PosterSV1.danhgiaposter && PosterSV1.danhgiaposter == 'true') || (PosterSV2.danhgiaposter && PosterSV2.danhgiaposter == 'true')) &&
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th style={{ width: "10%" }}>STT</th>
                                                <th style={{ width: "70%" }}>
                                                    Tiêu chí
                                                </th>
                                                {
                                                    PosterSV1.danhgiaposter == 'true' &&
                                                    <th
                                                        style={{ width: "20%" }}>
                                                        SV1
                                                    </th>
                                                }
                                                {
                                                    listSV1SV2.length == 2 && PosterSV2.danhgiaposter == 'true' &&
                                                    <th style={{ width: "20%" }}>
                                                        SV2
                                                    </th>
                                                }
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {[
                                                "Xác định được yêu cầu của khóa luận cần thực hiện",
                                                "Phân tích yêu cầu nghiệp vụ hiện trạng và mô hình hóa được yêu cầu của đề tài",
                                                "Thiết kế một hệ thống thông tin đưa ra giải pháp đáp ứng được yêu cầu của đề tài",
                                                "Hiện thực hóa hệ thống thông tin theo thiết kế đã đưa ra/Hiện thực giải pháp đã đưa ra",
                                                "Viết được báo cáo khóa luận tốt nghiệp",
                                                "Trình bày được các kiến thức nền tảng liên quan đến đề tài khóa luận",
                                                "Đánh giá việc thực hiện khóa luận đáp ứng yêu cầu đề tài khóa luận",
                                                "Bảo vệ khóa kết quả khóa luận trước hội đồng(Poster)",
                                            ].map((criteria, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{criteria}</td>
                                                    {PosterSV1.danhgiaposter == 'true' ?
                                                        <td>
                                                            <select value={PosterSV1[`LOL${index + 1}`]} onChange={(event) => handleOnchangePoster(event.target.value, `LOL${index + 1}`)} className="form-select">
                                                                <option value={''}>----</option>
                                                                <option value={'1'}>1</option>
                                                                <option value={'2'}>2</option>
                                                                <option value={'3'}>3</option>
                                                                <option value={'4'}>4</option>
                                                            </select>
                                                        </td>
                                                        : ''
                                                    }
                                                    {
                                                        listSV1SV2.length == 2 && PosterSV2.danhgiaposter == 'true' &&
                                                        <td>
                                                            <select value={PosterSV2[`LOL${index + 1}`]} onChange={(event) => handleOnchange2Poster(event.target.value, `LOL${index + 1}`)} className="form-select">
                                                                <option value={''}>----</option>
                                                                <option value={'1'}>1</option>
                                                                <option value={'2'}>2</option>
                                                                <option value={'3'}>3</option>
                                                                <option value={'4'}>4</option>
                                                            </select>
                                                        </td>
                                                    }
                                                </tr>
                                            ))}


                                        </tbody>
                                    </table>
                                }


                            </div>
                        </div>
                        {
                            PosterSV1.danhgiaposter == 'true' &&
                            <div className="row">
                                <div className="col-sm-2"><i className="text-primary">Nhận xét</i></div>
                                <textarea value={PosterSV1.ghichu} onChange={(event) => handleOnchangePoster(event.target.value, 'ghichu')} className="col-sm-9"></textarea>
                            </div>
                        }

                    </>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModalPoster}>
                        Đóng
                    </Button>

                    <Button onClick={hanldeConfirmPoster} variant="primary">Xác nhận</Button>

                </Modal.Footer>
            </Modal>
        </>
    );
};

export default TeacherChamHoiDong;
