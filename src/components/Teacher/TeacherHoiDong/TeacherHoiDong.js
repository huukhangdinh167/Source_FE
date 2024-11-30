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
                    diemSV2:res[1] && res[1].Result?.diemCTHD
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
                    //  ghichu: res[1].Criteriahoidong?.ghichu,
                    diemSV2: res[1].Result?.diemTK
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
                    //  ghichu: res[1].Criteriahoidong?.ghichu,
                    diemSV2: res[1] && res[1].Result?.diemUV

                })
                console.log("datamodaaal", res)
            } else {
                toast.error("Lỗi gì đó")
            }

        }
        else {
            toast.error("Trống")

        }
        setShowModal(true); // Hiển thị modal
        // setDataModal({
        //     ...item,
        //     LOL1: item.Criteriapb?.LOL1,
        //     LOL2: item.Criteriapb?.LOL2,
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
                    ghichu: res[1] && res[1].Criteriahoidong?.ghichuPoster1,
                    diemSV1: res[1] && res[1].Result?.diemPoster1
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
            if (!HoiDongSV1.diemSV1) {
                toast.error("Bạn chưa nhập điểm cho SV1");
                return
            }
            if (HoiDongSV1.diemSV1 < 0 || HoiDongSV1.diemSV1 > 10) {
                toast.error("Điểm của sinh viên là một số từ 0 -> 10");
                return
            }
            if (HoiDongSV1.LOL1 == '') {
                toast.error("Bạn chưa nhập LOL1 cho SV1");
                return
            }
            if (!HoiDongSV1.LOL2) {
                toast.error("Bạn chưa nhập LOL2 cho SV1");
                return
            }
            if (!HoiDongSV1.LOL3) {
                toast.error("Bạn chưa nhập LOL3 cho SV1");
                return
            }
            if (!HoiDongSV1.LOL4) {
                toast.error("Bạn chưa nhập LOL4 cho SV1");
                return
            }
            if (!HoiDongSV1.LOL5) {
                toast.error("Bạn chưa nhập LOL5 cho SV1");
                return
            }
            if (!HoiDongSV1.LOL6) {
                toast.error("Bạn chưa nhập LOL6 cho SV1");
                return
            }
            if (!HoiDongSV1.LOL7) {
                toast.error("Bạn chưa nhập LOL7 cho SV1");
                return
            }
            if (!HoiDongSV1.LOL8) {
                toast.error("Bạn chưa nhập LOL8 cho SV1");
                return
            }
            if (!HoiDongSV2.diemSV2) {
                toast.error("Bạn chưa nhập điểm cho SV2");
                return
            }
            if (HoiDongSV2.diemSV2 < 0 || HoiDongSV2.diemSV2 > 10) {
                toast.error("Điểm của sinh viên là một số từ 0 -> 10");
                return
            }
            if (!HoiDongSV2.LOL1) {
                toast.error("Bạn chưa nhập LOL1 cho SV2");
                return
            }
            if (!HoiDongSV2.LOL2) {
                toast.error("Bạn chưa nhập LOL2 cho SV2");
                return
            }
            if (!HoiDongSV2.LOL3) {
                toast.error("Bạn chưa nhập LOL3 cho SV2");
                return
            }
            if (!HoiDongSV2.LOL4) {
                toast.error("Bạn chưa nhập LOL4 cho SV2");
                return
            }
            if (!HoiDongSV2.LOL5) {
                toast.error("Bạn chưa nhập LOL5 cho SV2");
                return
            }
            if (!HoiDongSV2.LOL6) {
                toast.error("Bạn chưa nhập LOL6 cho SV2");
                return
            }
            if (!HoiDongSV2.LOL7) {
                toast.error("Bạn chưa nhập LOL7 cho SV2");
                return
            }
            if (!HoiDongSV2.LOL8) {
                toast.error("Bạn chưa nhập LOL8 cho SV2");
                return
            }
        }
        if (listSV1SV2.length == 1) {
            if (!HoiDongSV1.diemSV1) {
                toast.error("Bạn chưa nhập điểm cho SV1");
                return
            }
            if (HoiDongSV1.diemSV1 < 0 || HoiDongSV1.diemSV1 > 10) {
                toast.error("Điểm của sinh viên là một số từ 0 -> 10");
                return
            }
            if (!HoiDongSV1.LOL1) {
                toast.error("Bạn chưa nhập LOL1 cho SV1");
                return
            }
            if (!HoiDongSV1.LOL2) {
                toast.error("Bạn chưa nhập LOL2 cho SV1");
                return
            }
            if (!HoiDongSV1.LOL3) {
                toast.error("Bạn chưa nhập LOL3 cho SV1");
                return
            }
            if (!HoiDongSV1.LOL4) {
                toast.error("Bạn chưa nhập LOL4 cho SV1");
                return
            }
            if (!HoiDongSV1.LOL5) {
                toast.error("Bạn chưa nhập LOL5 cho SV1");
                return
            }
            if (!HoiDongSV1.LOL6) {
                toast.error("Bạn chưa nhập LOL6 cho SV1");
                return
            }
            if (!HoiDongSV1.LOL7) {
                toast.error("Bạn chưa nhập LOL7 cho SV1");
                return
            }
            if (!HoiDongSV1.LOL8) {
                toast.error("Bạn chưa nhập LOL8 cho SV1");
                return
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
            if (!PosterSV1.diemSV1) {
                toast.error("Bạn chưa nhập điểm cho SV1");
                return
            }
            if (PosterSV1.diemSV1 < 0 || PosterSV1.diemSV1 > 10) {
                toast.error("Điểm của sinh viên là một số từ 0 -> 10");
                return
            }
            if (PosterSV1.LOL1 == '') {
                toast.error("Bạn chưa nhập LOL1 cho SV1");
                return
            }
            if (!PosterSV1.LOL2) {
                toast.error("Bạn chưa nhập LOL2 cho SV1");
                return
            }
            if (!PosterSV1.LOL3) {
                toast.error("Bạn chưa nhập LOL3 cho SV1");
                return
            }
            if (!PosterSV1.LOL4) {
                toast.error("Bạn chưa nhập LOL4 cho SV1");
                return
            }
            if (!PosterSV1.LOL5) {
                toast.error("Bạn chưa nhập LOL5 cho SV1");
                return
            }
            if (!PosterSV1.LOL6) {
                toast.error("Bạn chưa nhập LOL6 cho SV1");
                return
            }
            if (!PosterSV1.LOL7) {
                toast.error("Bạn chưa nhập LOL7 cho SV1");
                return
            }
            if (!PosterSV1.LOL8) {
                toast.error("Bạn chưa nhập LOL8 cho SV1");
                return
            }
            if (!PosterSV2.diemSV2) {
                toast.error("Bạn chưa nhập điểm cho SV2");
                return
            }
            if (PosterSV2.diemSV2 < 0 || PosterSV2.diemSV2 > 10) {
                toast.error("Điểm của sinh viên là một số từ 0 -> 10");
                return
            }
            if (!PosterSV2.LOL1) {
                toast.error("Bạn chưa nhập LOL1 cho SV2");
                return
            }
            if (!PosterSV2.LOL2) {
                toast.error("Bạn chưa nhập LOL2 cho SV2");
                return
            }
            if (!PosterSV2.LOL3) {
                toast.error("Bạn chưa nhập LOL3 cho SV2");
                return
            }
            if (!PosterSV2.LOL4) {
                toast.error("Bạn chưa nhập LOL4 cho SV2");
                return
            }
            if (!PosterSV2.LOL5) {
                toast.error("Bạn chưa nhập LOL5 cho SV2");
                return
            }
            if (!PosterSV2.LOL6) {
                toast.error("Bạn chưa nhập LOL6 cho SV2");
                return
            }
            if (!PosterSV2.LOL7) {
                toast.error("Bạn chưa nhập LOL7 cho SV2");
                return
            }
            if (!PosterSV2.LOL8) {
                toast.error("Bạn chưa nhập LOL8 cho SV2");
                return
            }
        }
        if (listSV1SV2.length == 1) {
            if (!PosterSV1.diemSV1) {
                toast.error("Bạn chưa nhập điểm cho SV1");
                return
            }
            if (PosterSV1.diemSV1 < 0 || PosterSV1.diemSV1 > 10) {
                toast.error("Điểm của sinh viên là một số từ 0 -> 10");
                return
            }
            if (!PosterSV1.LOL1) {
                toast.error("Bạn chưa nhập LOL1 cho SV1");
                return
            }
            if (!PosterSV1.LOL2) {
                toast.error("Bạn chưa nhập LOL2 cho SV1");
                return
            }
            if (!PosterSV1.LOL3) {
                toast.error("Bạn chưa nhập LOL3 cho SV1");
                return
            }
            if (!PosterSV1.LOL4) {
                toast.error("Bạn chưa nhập LOL4 cho SV1");
                return
            }
            if (!PosterSV1.LOL5) {
                toast.error("Bạn chưa nhập LOL5 cho SV1");
                return
            }
            if (!PosterSV1.LOL6) {
                toast.error("Bạn chưa nhập LOL6 cho SV1");
                return
            }
            if (!PosterSV1.LOL7) {
                toast.error("Bạn chưa nhập LOL7 cho SV1");
                return
            }
            if (!PosterSV1.LOL8) {
                toast.error("Bạn chưa nhập LOL8 cho SV1");
                return
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
        _PBSV1[name] = value
        setHoiDongSV1(_PBSV1)
    };
    const handleOnchange2 = (value, name) => {
        let _PBSV2 = _.cloneDeep(HoiDongSV2)
        _PBSV2[name] = value
        setHoiDongSV2(_PBSV2)
    }

    const handleOnchangePoster = (value, name) => {
        let _PosterSV1 = _.cloneDeep(PosterSV1)
        _PosterSV1[name] = value
        setPosterSV1(_PosterSV1)
    };
    const handleOnchange2Poster = (value, name) => {
        let _PosterSV2 = _.cloneDeep(PosterSV2)
        _PosterSV2[name] = value
        setPosterSV2(_PosterSV2)
    }
    const renderedGroups = new Map(); // Theo dõi nhóm đã xử lý
    return (
        <>
            <div className='container'>
                <p className="mt-3 "><i>Số lượng sinh viên cần chấm <b>Hội Đồng</b> :</i> <b className="text-danger"> {students ? students.length : ''}</b></p>
                <table className="table text-center table-bordered table-hover mt-3">
                    <thead>
                        <tr>
                            <th style={{ width: "5%" }} >MSSV</th>
                            <th style={{ width: "9%" }}>Tên</th>
                            <th style={{ width: "14%" }}>Tên Đề Tài</th>
                            <th style={{ width: "20%" }}>Mô Tả</th>

                            <th style={{ width: "9%" }}>GVHD</th>
                            <th style={{ width: "6%" }}>Nhóm</th>
                            <th style={{ width: "10%" }}>Hội Đồng</th>
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
                        Đánh giá cho sinh viên{" "}
                        <span className="text-danger">

                        </span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <>
                        {
                            listSV1SV2 && listSV1SV2.length == 2 &&
                            <>
                                <div className="row mt-1">
                                    <div className="col-sm-1"></div>
                                    <div className="col-sm-5  "><b> SV1: </b>&nbsp;&nbsp;<i className="">{listSV1SV2[0].name} </i> &nbsp;<i className="">{listSV1SV2[0].maSo} </i></div>
                                    <div className="col-sm-5  "><b> SV2:</b> &nbsp;&nbsp;<i className="">{listSV1SV2[1].name} </i>&nbsp;<i className="">{listSV1SV2[1].maSo} </i></div>
                                </div>
                            </>
                        }
                        <div className="row mt-4">
                            <div className="col-sm-1"></div>
                            {
                                listSV1SV2.length == 2 ?
                                    <>
                                        <div className="col-sm-3  "><i className="text-danger"> Điểm hướng dẫn cho SV1</i></div>
                                        <input value={HoiDongSV1.diemSV1} onChange={(event) => handleOnchange(event.target.value, 'diemSV1')} className="col-sm-2 " type="number" />
                                        <div className="col-sm-3  "><i className="text-danger"> Điểm hướng dẫn cho SV2</i></div>
                                        <input value={HoiDongSV2.diemSV2} onChange={(event) => handleOnchange2(event.target.value, 'diemSV2')} className="col-sm-2 " type="number" />
                                    </>
                                    : <>

                                        <div className="col-sm-5  ">
                                            <b> Sinh viên:&nbsp;  {listSV1SV2.length && listSV1SV2[0].name} &nbsp;&nbsp; {listSV1SV2.length && listSV1SV2[0].maSo}</b>

                                        </div>
                                        <div className="col-sm-3  "><i className="text-danger"> Điểm hướng dẫn </i></div>
                                        <input value={HoiDongSV1.diemSV1} onChange={(event) => handleOnchange(event.target.value, 'diemSV1')} className="col-sm-2 " type="number" />
                                        <div className="col-sm-1"></div>
                                    </>
                            }

                        </div>
                        <div className="row mt-3">
                            <div className="col-sm-12">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th style={{ width: "8%" }}>STT</th>
                                            <th style={{ width: "72%" }}>
                                                Tiêu chí
                                            </th>
                                            <th style={{ width: "20%" }}>
                                                SV1
                                            </th>
                                            {
                                                listSV1SV2.length == 2 &&
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
                                            "Bảo vệ khóa kết quả khóa luận trước giản viên phản biện",
                                        ].map((criteria, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{criteria}</td>
                                                <td>
                                                    <select value={HoiDongSV1[`LOL${index + 1}`]} onChange={(event) => handleOnchange(event.target.value, `LOL${index + 1}`)} className="form-select">
                                                        <option value={''}>----</option>
                                                        <option value={'1'}>1</option>
                                                        <option value={'2'}>2</option>
                                                        <option value={'3'}>3</option>
                                                        <option value={'4'}>4</option>
                                                    </select>
                                                </td>
                                                {
                                                    listSV1SV2.length == 2 && <td>
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

                            </div>


                        </div>
                        <div className="row">
                            <div className="col-sm-2"><i className="text-primary">Nhận xét</i></div>
                            <textarea value={HoiDongSV1.ghichu} onChange={(event) => handleOnchange(event.target.value, 'ghichu')} className="col-sm-9"></textarea></div>
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
                            <th style={{ width: "5%" }} >MSSV</th>
                            <th style={{ width: "9%" }}>Tên</th>
                            <th style={{ width: "14%" }}>Tên Đề Tài</th>
                            <th style={{ width: "20%" }}>Mô Tả</th>

                            <th style={{ width: "9%" }}>GVHD</th>
                            <th style={{ width: "6%" }}>Nhóm</th>
                            <th style={{ width: "10%" }}>Poster</th>
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
                        Đánh giá cho sinh viên{" "}
                        <span className="text-danger">

                        </span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <>
                        {
                            listSV1SV2 && listSV1SV2.length == 2 &&
                            <>
                                <div className="row mt-1">
                                    <div className="col-sm-1"></div>
                                    <div className="col-sm-5  "><b> SV1: </b>&nbsp;&nbsp;<i className="">{listSV1SV2[0].name} </i> &nbsp;<i className="">{listSV1SV2[0].maSo} </i></div>
                                    <div className="col-sm-5  "><b> SV2:</b> &nbsp;&nbsp;<i className="">{listSV1SV2[1].name} </i>&nbsp;<i className="">{listSV1SV2[1].maSo} </i></div>
                                </div>
                            </>
                        }
                        <div className="row mt-4">
                            <div className="col-sm-1"></div>
                            {
                                listSV1SV2.length == 2 ?
                                    <>
                                        <div className="col-sm-3  "><i className="text-danger"> Điểm hướng dẫn cho SV1</i></div>
                                        <input value={PosterSV1.diemSV1} onChange={(event) => handleOnchangePoster(event.target.value, 'diemSV1')} className="col-sm-2 " type="number" />
                                        <div className="col-sm-3  "><i className="text-danger"> Điểm hướng dẫn cho SV2</i></div>
                                        <input value={PosterSV2.diemSV2} onChange={(event) => handleOnchange2Poster(event.target.value, 'diemSV2')} className="col-sm-2 " type="number" />
                                    </>
                                    : <>

                                        <div className="col-sm-5  ">
                                            <b> Sinh viên:&nbsp;  {listSV1SV2.length && listSV1SV2[0].name} &nbsp;&nbsp; {listSV1SV2.length && listSV1SV2[0].maSo}</b>

                                        </div>
                                        <div className="col-sm-3  "><i className="text-danger"> Điểm hướng dẫn </i></div>
                                        <input value={PosterSV1.diemSV1} onChange={(event) => handleOnchangePoster(event.target.value, 'diemSV1')} className="col-sm-2 " type="number" />
                                        <div className="col-sm-1"></div>
                                    </>
                            }

                        </div>
                        <div className="row mt-3">
                            <div className="col-sm-12">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th style={{ width: "8%" }}>STT</th>
                                            <th style={{ width: "72%" }}>
                                                Tiêu chí
                                            </th>
                                            <th style={{ width: "20%" }}>
                                                SV1
                                            </th>
                                            {
                                                listSV1SV2.length == 2 &&
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
                                            "Bảo vệ khóa kết quả khóa luận trước giản viên phản biện",
                                        ].map((criteria, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{criteria}</td>
                                                <td>
                                                    <select value={PosterSV1[`LOL${index + 1}`]} onChange={(event) => handleOnchangePoster(event.target.value, `LOL${index + 1}`)} className="form-select">
                                                        <option value={''}>----</option>
                                                        <option value={'1'}>1</option>
                                                        <option value={'2'}>2</option>
                                                        <option value={'3'}>3</option>
                                                        <option value={'4'}>4</option>
                                                    </select>
                                                </td>
                                                {
                                                    listSV1SV2.length == 2 && <td>
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

                            </div>


                        </div>
                        <div className="row">
                            <div className="col-sm-2"><i className="text-primary">Nhận xét</i></div>
                            <textarea value={PosterSV1.ghichu} onChange={(event) => handleOnchangePoster(event.target.value, 'ghichu')} className="col-sm-9"></textarea></div>
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
