import React, { useEffect, useState, useContext } from "react";
import { Modal, Button } from "react-bootstrap"; // Import modal từ React Bootstrap
import swal from 'sweetalert';
import './TeacherChamPB.scss';
import { test, headFetchListTeacher, AssignPB1and2, } from '../../../services/HeadService';
import { teacherPB, teacherGetIn4SV1andSV2, teacherDGPB, teacherXemKetQuaPBSV2, teacherDefinePB1PB2 } from '../../../services/Teacher';
import _, { cloneDeep, values } from "lodash";
import { toast } from "react-toastify";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import autoTable from 'jspdf-autotable';
import { UserContext } from '../../../context/userContext';
const TeacherChamPB = (props) => {
    const { user } = useContext(UserContext);
    const userid = user.id
    const [students, setData] = useState([]);
    const [showModal, setShowModal] = useState(false); // Trạng thái hiển thị modal
    const [listtecher, setListTeacher] = useState()
    const [dataModal, setDataModal] = useState({})
    const [listSV1SV2, setListSv1Sv2] = useState([])
    const [xemPBSV2, setXemPBSV2] = useState([])
    const [daDanhGia, setDaDanhGia] = useState("false")
    const defaultPBSV1 = {
        danhgiaphanbien: '',

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
    const defaultPBSV2 = {
        danhgiaphanbien: '',
        diemSV2: '',
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
    const [PBSV1, setPBSV1] = useState(defaultPBSV1)
    const [PBSV2, setPBSV2] = useState(defaultPBSV2)
    useEffect(() => {
        studentss();
    }, []);

    useEffect(() => {
        setPBSV1({
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
            diemSV1: dataModal.diemSV1,
            danhgiaphanbien: dataModal.danhgiaphanbien,

        })

    }, [dataModal]);

    useEffect(() => {

        setPBSV2({
            ...xemPBSV2,
            LOL1: xemPBSV2.LOL1,
            LOL2: xemPBSV2.LOL2,
            LOL3: xemPBSV2.LOL3,
            LOL4: xemPBSV2.LOL4,
            LOL5: xemPBSV2.LOL5,
            LOL6: xemPBSV2.LOL6,
            LOL7: xemPBSV2.LOL7,
            LOL8: xemPBSV2.LOL8,
            ghichu: xemPBSV2.ghichu,
            diemSV2: xemPBSV2.diemSV2,
            danhgiaphanbien: xemPBSV2.danhgiaphanbien,

        })
    }, [xemPBSV2, dataModal]);

    const studentss = async () => {
        let data = await teacherPB(user);
        console.log(user)
        setData(data.DT);
        let list = await headFetchListTeacher()
        setListTeacher(list.DT)
    };

    // hàm này xác định xem user đang đang là vai trò PB1 hay Pb2 mỗi khi bậc modal ở mỗi đề tài
    const definePB1PB2 = async (item) => {
        let define = await teacherDefinePB1PB2(item.maSo, user.maSo)
        if (define.EC == 0) {
            // kết quả trả về là pb1 || pb2
            return define.EM
        } else {
            toast.error("Can't not define PB1 Pb2")
        }
    }


    const handleChamDiemPB = async (item) => {
        let define = await definePB1PB2(item)
        let aee = await teacherXemKetQuaPBSV2(item.groupStudent, item.id)
        if (aee.EC != 0) {
            toast.error(aee.EM)
        }
        console.log("Xem kết quả sinh viên 2", aee.DT)
        if (define == 'pb1' && aee.DT[0].Result.diemGVPB1 != null) {
            // người dùng đang là phản biện 1
            setDataModal({
                ...item,
                LOL1: item.Criteriapb?.LOL1,
                LOL2: item.Criteriapb?.LOL2,
                LOL3: item.Criteriapb?.LOL3,
                LOL4: item.Criteriapb?.LOL4,
                LOL5: item.Criteriapb?.LOL5,
                LOL6: item.Criteriapb?.LOL6,
                LOL7: item.Criteriapb?.LOL7,
                LOL8: item.Criteriapb?.LOL8,
                danhgiaphanbien: item.Result?.danhgiaphanbien1,

                ghichu: item.Criteriapb?.ghichu,
                diemSV1: item.Result?.diemGVPB1
            })
            let data = await teacherXemKetQuaPBSV2(item.groupStudent, item.id)
            if (data.EC == 0) {
                let res = data.DT
                setXemPBSV2({
                    ...res,
                    LOL1: res[1] && res[1].Criteriapb?.LOL1,
                    LOL2: res[1] && res[1].Criteriapb?.LOL2,
                    LOL3: res[1] && res[1].Criteriapb?.LOL3,
                    LOL4: res[1] && res[1].Criteriapb?.LOL4,
                    LOL5: res[1] && res[1].Criteriapb?.LOL5,
                    LOL6: res[1] && res[1].Criteriapb?.LOL6,
                    LOL7: res[1] && res[1].Criteriapb?.LOL7,
                    LOL8: res[1] && res[1].Criteriapb?.LOL8,
                    ghichu: res[1] && res[1].Criteriapb?.ghichu,
                    danhgiaphanbien: res[1] && res[1].Result?.danhgiaphanbien1,
                    diemSV2: res[1] && res[1].Result?.diemGVPB1
                })
                console.log("datamodaaal", res)
            } else {
                toast.error("Lỗi gì đó")
            }

        } else if (define == 'pb2' && aee.DT[0].Result.diemGVPB2 != null) {
            // người dùng đang là phản biện 2
            setDataModal({
                ...item,
                LOL1: item.Criteriapb?.LOL1PB2,
                LOL2: item.Criteriapb?.LOL2PB2,
                LOL3: item.Criteriapb?.LOL3PB2,
                LOL4: item.Criteriapb?.LOL4PB2,
                LOL5: item.Criteriapb?.LOL5PB2,
                LOL6: item.Criteriapb?.LOL6PB2,
                LOL7: item.Criteriapb?.LOL7PB2,
                LOL8: item.Criteriapb?.LOL8PB2,
                ghichu: item.Criteriapb?.ghichuPB2,
                diemSV1: item.Result?.diemGVPB2,
                danhgiaphanbien: item.Result?.danhgiaphanbien2,
            })
            let data = await teacherXemKetQuaPBSV2(item.groupStudent, item.id)
            if (data.EC == 0) {
                let res = data.DT
                setXemPBSV2({
                    ...res,
                    LOL1: res[1] && res[1].Criteriapb?.LOL1PB2,
                    LOL2: res[1] && res[1].Criteriapb?.LOL2PB2,
                    LOL3: res[1] && res[1].Criteriapb?.LOL3PB2,
                    LOL4: res[1] && res[1].Criteriapb?.LOL4PB2,
                    LOL5: res[1] && res[1].Criteriapb?.LOL5PB2,
                    LOL6: res[1] && res[1].Criteriapb?.LOL6PB2,
                    LOL7: res[1] && res[1].Criteriapb?.LOL7PB2,
                    LOL8: res[1] && res[1].Criteriapb?.LOL8PB2,
                    ghichu: res[1] && res[1].Criteriapb?.ghichuPB2,
                    danhgiaphanbien: res[1] && res[1].Result?.danhgiaphanbien2,
                    //  ghichu: res[1].Criteriapb?.ghichu,
                    diemSV2: res[1] && res[1].Result?.diemGVPB2
                })
                console.log("datamodaaal", res)
            } else {
                toast.error("Lỗi gì đó")
            }
        } else if (define == 'pb3' && aee.DT[0].Result.diemGVPB3 != null) {
            // người dùng đang là phản biện 2
            setDataModal({
                ...item,
                LOL1: item.Criteriapb?.LOL1PB3,
                LOL2: item.Criteriapb?.LOL2PB3,
                LOL3: item.Criteriapb?.LOL3PB3,
                LOL4: item.Criteriapb?.LOL4PB3,
                LOL5: item.Criteriapb?.LOL5PB3,
                LOL6: item.Criteriapb?.LOL6PB3,
                LOL7: item.Criteriapb?.LOL7PB3,
                LOL8: item.Criteriapb?.LOL8PB3,
                ghichu: item.Criteriapb?.ghichuPB3,
                diemSV1: item.Result?.diemGVPB3,
                danhgiaphanbien: item.Result?.danhgiaphanbien3,
            })
            let data = await teacherXemKetQuaPBSV2(item.groupStudent, item.id)
            if (data.EC == 0) {
                let res = data.DT
                setXemPBSV2({
                    ...res,
                    LOL1: res[1] && res[1].Criteriapb?.LOL1PB3,
                    LOL2: res[1] && res[1].Criteriapb?.LOL2PB3,
                    LOL3: res[1] && res[1].Criteriapb?.LOL3PB3,
                    LOL4: res[1] && res[1].Criteriapb?.LOL4PB3,
                    LOL5: res[1] && res[1].Criteriapb?.LOL5PB3,
                    LOL6: res[1] && res[1].Criteriapb?.LOL6PB3,
                    LOL7: res[1] && res[1].Criteriapb?.LOL7PB3,
                    LOL8: res[1] && res[1].Criteriapb?.LOL8PB3,
                    ghichu: res[1] && res[1].Criteriapb?.ghichuPB3,
                    danhgiaphanbien: res[1] && res[1].Result?.danhgiaphanbien3,
                    //  ghichu: res[1].Criteriapb?.ghichu,
                    diemSV2: res[1] && res[1].Result?.diemGVPB3
                })
                console.log("datamodaaal", res)
            } else {
                toast.error("Lỗi gì đó")
            }

        }
        else {
        }
        setShowModal(true); // Hiển thị modal
        console.log("datamodal", item)
        let res = await teacherGetIn4SV1andSV2(item.groupStudent, item.id)
        if (res.EC == 0) {
            setListSv1Sv2(res.DT)
            console.log("Sex", res.DT)
        }
    };

    const handleCloseModal = async () => {

        setShowModal(false); // Đóng 
        setPBSV1(defaultPBSV1)
        setPBSV2(defaultPBSV2)
        setListSv1Sv2([])
    };
    const hanldeConfirm = async () => {
        if (listSV1SV2.length == 2) {
            if (!PBSV1.danhgiaphanbien || PBSV1.danhgiaphanbien === 'null') {
                toast.error("Bạn chưa đánh giá  cho SV1");
                return
            }
            if (PBSV1.danhgiaphanbien === 'true') {
                if (!PBSV1.diemSV1) {
                    toast.error("Bạn chưa nhập điểm cho SV1");
                    return
                }
                if (PBSV1.diemSV1 < 1 || PBSV1.diemSV1 > 10) {
                    toast.error("Điểm của sinh viên là một số >0 <=10");
                    return
                }
                if (!PBSV1.LOL1) {
                    toast.error("Bạn chưa nhập LO1 cho SV1");
                    return
                }
                if (!PBSV1.LOL2) {
                    toast.error("Bạn chưa nhập LO2 cho SV1");
                    return
                }
                if (!PBSV1.LOL3) {
                    toast.error("Bạn chưa nhập LO3 cho SV1");
                    return
                }
                if (!PBSV1.LOL4) {
                    toast.error("Bạn chưa nhập LO4 cho SV1");
                    return
                }
                if (!PBSV1.LOL5) {
                    toast.error("Bạn chưa nhập LO5 cho SV1");
                    return
                }
                if (!PBSV1.LOL6) {
                    toast.error("Bạn chưa nhập LO6 cho SV1");
                    return
                }
                if (!PBSV1.LOL7) {
                    toast.error("Bạn chưa nhập LO7 cho SV1");
                    return
                }
                if (!PBSV1.LOL8) {
                    toast.error("Bạn chưa nhập LO8 cho SV1");
                    return
                }
            }

            if (!PBSV2.danhgiaphanbien || PBSV2.danhgiaphanbien === 'null') {
                toast.error("Bạn chưa đánh giá  cho SV2");
                return
            }
            if (PBSV2.danhgiaphanbien === 'true') {
                if (!PBSV2.diemSV2) {
                    toast.error("Bạn chưa nhập điểm cho SV2");
                    return
                }
                if (PBSV2.diemSV2 < 1 || PBSV2.diemSV2 > 10) {
                    toast.error("Điểm của sinh viên là một >0 <=10");
                    return
                }
                if (!PBSV2.LOL1) {
                    toast.error("Bạn chưa nhập LO1 cho SV2");
                    return
                }
                if (!PBSV2.LOL2) {
                    toast.error("Bạn chưa nhập LO2 cho SV2");
                    return
                }
                if (!PBSV2.LOL3) {
                    toast.error("Bạn chưa nhập LO3 cho SV2");
                    return
                }
                if (!PBSV2.LOL4) {
                    toast.error("Bạn chưa nhập LO4 cho SV2");
                    return
                }
                if (!PBSV2.LOL5) {
                    toast.error("Bạn chưa nhập LO5 cho SV2");
                    return
                }
                if (!PBSV2.LOL6) {
                    toast.error("Bạn chưa nhập LO6 cho SV2");
                    return
                }
                if (!PBSV2.LOL7) {
                    toast.error("Bạn chưa nhập LO7 cho SV2");
                    return
                }
                if (!PBSV2.LOL8) {
                    toast.error("Bạn chưa nhập LO8 cho SV2");
                    return
                }

            }

        }
        if (listSV1SV2.length == 1) {
            if (!PBSV1.danhgiaphanbien || PBSV1.danhgiaphanbien === 'null') {
                toast.error("Bạn chưa đánh giá  cho SV1");
                return
            }
            if (PBSV1.danhgiaphanbien === 'true') {
                if (!PBSV1.diemSV1) {
                    toast.error("Bạn chưa nhập điểm cho SV1");
                    return
                }
                if (PBSV1.diemSV1 < 1 || PBSV1.diemSV1 > 10) {
                    toast.error("Điểm của sinh viên là một số >0 <=10");
                    return
                }
                if (!PBSV1.LOL1) {
                    toast.error("Bạn chưa nhập LO1 cho SV1");
                    return
                }
                if (!PBSV1.LOL2) {
                    toast.error("Bạn chưa nhập LO2 cho SV1");
                    return
                }
                if (!PBSV1.LOL3) {
                    toast.error("Bạn chưa nhập LO3 cho SV1");
                    return
                }
                if (!PBSV1.LOL4) {
                    toast.error("Bạn chưa nhập LO4 cho SV1");
                    return
                }
                if (!PBSV1.LOL5) {
                    toast.error("Bạn chưa nhập LO5 cho SV1");
                    return
                }
                if (!PBSV1.LOL6) {
                    toast.error("Bạn chưa nhập LO6 cho SV1");
                    return
                }
                if (!PBSV1.LOL7) {
                    toast.error("Bạn chưa nhập LO7 cho SV1");
                    return
                }
                if (!PBSV1.LOL8) {
                    toast.error("Bạn chưa nhập LO8 cho SV1");
                    return
                }
            }

        }
        let data = await teacherDGPB(PBSV1, PBSV2, listSV1SV2[0].id, listSV1SV2[1] ? listSV1SV2[1].id : 'null', listSV1SV2[0].pb1, listSV1SV2[0].pb2, listSV1SV2[0].pb3, user.maSo)
        if (data.EC == 0) {
            toast.success("Chấm thành công ")
            studentss()
        } else {
            toast.error(data.EM)
        }
        setShowModal(false);
    };
    const handleOnchange = (value, name) => {
        let _PBSV1 = _.cloneDeep(PBSV1)
        let _PBSV2 = _.cloneDeep(PBSV2)
        _PBSV1[name] = value
        setPBSV1(_PBSV1)
        if (value != 'true' && value != 'false' && name == 'danhgiaphanbien') {
            setPBSV2({ ..._PBSV2, danhgiaphanbien: 'null' })
        }
        if (value == 'false' && name == 'danhgiaphanbien') {
            setPBSV1({ ..._PBSV1, diemSV1: 0, danhgiaphanbien: 'false' })
        }
        if (value == 'true' && name == 'danhgiaphanbien') {
            setPBSV1({ ..._PBSV1, diemSV1: '' })
        }
    };
    const handleOnchange2 = (value, name) => {
        let _PBSV2 = _.cloneDeep(PBSV2)

        _PBSV2[name] = value
        setPBSV2(_PBSV2)
        if (value == 'false' && name == 'danhgiaphanbien') {
            setPBSV2({ ..._PBSV2, diemSV2: 0, danhgiaphanbien: 'false' })
        }
        if (value == 'true' && name == 'danhgiaphanbien') {
            setPBSV2({ ..._PBSV2, diemSV2: '' })
        }
    }
    const renderedGroups = new Map(); // Theo dõi nhóm đã xử lý 

    const exportToPDF = async (item) => {
        const pdf = new jsPDF();

        let define = await definePB1PB2(item)
        let response = await teacherXemKetQuaPBSV2(item.groupStudent, item.id)

        let res = response.DT

        if (define == 'pb1' && response.DT[0].Result.diemGVPB1 != null) {
            let LOL1 = item.Criteriapb?.LOL1
            let LOL2 = item.Criteriapb?.LOL2
            let LOL3 = item.Criteriapb?.LOL3
            let LOL4 = item.Criteriapb?.LOL4
            let LOL5 = item.Criteriapb?.LOL5
            let LOL6 = item.Criteriapb?.LOL6
            let LOL7 = item.Criteriapb?.LOL7
            let LOL8 = item.Criteriapb?.LOL8
            let ghichu = item.Criteriapb?.ghichu
            let danhgiaphanbiensv1 = item.Result?.danhgiaphanbien1
            let diemSV1 = item.Result?.diemGVPB2
            let LOL1SV2 = res[1] && res[1].Criteriapb?.LOL1
            let LOL2SV2 = res[1] && res[1].Criteriapb?.LOL2
            let LOL3SV2 = res[1] && res[1].Criteriapb?.LOL3
            let LOL4SV2 = res[1] && res[1].Criteriapb?.LOL4
            let LOL5SV2 = res[1] && res[1].Criteriapb?.LOL5
            let LOL6SV2 = res[1] && res[1].Criteriapb?.LOL6
            let LOL7SV2 = res[1] && res[1].Criteriapb?.LOL7
            let LOL8SV2 = res[1] && res[1].Criteriapb?.LOL8
            let diemSV2 = res[1] && res[1].Result?.diemGVPB1
            let danhgiaphanbiensv2 = res[1] && res[1].Result?.danhgiaphanbien1

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
            pdf.text('Vai trò của người đánh giá: Giảng viên phản biện 1', 15, 65);
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

        } else if (define == 'pb2' && response.DT[0].Result.diemGVPB2 != null) {
            let LOL1 = item.Criteriapb?.LOL1PB2
            let LOL2 = item.Criteriapb?.LOL2PB2
            let LOL3 = item.Criteriapb?.LOL3PB2
            let LOL4 = item.Criteriapb?.LOL4PB2
            let LOL5 = item.Criteriapb?.LOL5PB2
            let LOL6 = item.Criteriapb?.LOL6PB2
            let LOL7 = item.Criteriapb?.LOL7PB2
            let LOL8 = item.Criteriapb?.LOL8PB2
            let ghichu = item.Criteriapb?.ghichuPB2
            let danhgiaphanbiensv1 = item.Result?.danhgiaphanbien2
            let diemSV1 = item.Result?.diemGVPB2
            let LOL1SV2 = res[1] && res[1].Criteriapb?.LOL1PB2
            let LOL2SV2 = res[1] && res[1].Criteriapb?.LOL2PB2
            let LOL3SV2 = res[1] && res[1].Criteriapb?.LOL3PB2
            let LOL4SV2 = res[1] && res[1].Criteriapb?.LOL4PB2
            let LOL5SV2 = res[1] && res[1].Criteriapb?.LOL5PB2
            let LOL6SV2 = res[1] && res[1].Criteriapb?.LOL6PB2
            let LOL7SV2 = res[1] && res[1].Criteriapb?.LOL7PB2
            let LOL8SV2 = res[1] && res[1].Criteriapb?.LOL8PB2
            let diemSV2 = res[1] && res[1].Result?.diemGVPB2
            let danhgiaphanbiensv2 = res[1] && res[1].Result?.danhgiaphanbien2

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
            pdf.text('Vai trò của người đánh giá: Giảng viên phản biện 2', 15, 65);
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

        } else if (define == 'pb3' && response.DT[0].Result.diemGVPB3 != null) {
            let LOL1 = item.Criteriapb?.LOL1PB3
            let LOL2 = item.Criteriapb?.LOL2PB3
            let LOL3 = item.Criteriapb?.LOL3PB3
            let LOL4 = item.Criteriapb?.LOL4PB3
            let LOL5 = item.Criteriapb?.LOL5PB3
            let LOL6 = item.Criteriapb?.LOL6PB3
            let LOL7 = item.Criteriapb?.LOL7PB3
            let LOL8 = item.Criteriapb?.LOL8PB3
            let ghichu = item.Criteriapb?.ghichuPB3
            let danhgiaphanbiensv1 = item.Result?.danhgiaphanbien3
            let diemSV1 = item.Result?.diemGVPB3
            let LOL1SV2 = res[1] && res[1].Criteriapb?.LOL1PB3
            let LOL2SV2 = res[1] && res[1].Criteriapb?.LOL2PB3
            let LOL3SV2 = res[1] && res[1].Criteriapb?.LOL3PB3
            let LOL4SV2 = res[1] && res[1].Criteriapb?.LOL4PB3
            let LOL5SV2 = res[1] && res[1].Criteriapb?.LOL5PB3
            let LOL6SV2 = res[1] && res[1].Criteriapb?.LOL6PB3
            let LOL7SV2 = res[1] && res[1].Criteriapb?.LOL7PB3
            let LOL8SV2 = res[1] && res[1].Criteriapb?.LOL8PB3
            let diemSV2 = res[1] && res[1].Result?.diemGVPB3
            let danhgiaphanbiensv2 = res[1] && res[1].Result?.danhgiaphanbien3

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
            pdf.text('Vai trò của người đánh giá: Giảng viên phản biện 3', 15, 65);
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
    const exportToPDFPhieuDiem = async (item) => {
        const pdf = new jsPDF();

        let define = await definePB1PB2(item)
        let response = await teacherXemKetQuaPBSV2(item.groupStudent, item.id)

        let res = response.DT

        if (define == 'pb1' && response.DT[0].Result.diemGVPB1 != null) {

            let ghichu = item.Criteriapb?.ghichu
            let danhgiaphanbiensv1 = item.Result?.danhgiaphanbien1
            let diemSV1 = item.Result?.diemGVPB1
            let diemSV2 = res[1] && res[1].Result?.diemGVPB1
            let danhgiaphanbiensv2 = res[1] && res[1].Result?.danhgiaphanbien1

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
            pdf.text('Vai trò của người đánh giá: Giảng viên phản biện 1', 20, 67);

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
                    [2, res[1]?.maSo || '', res[1]?.name || '', res[1] ? `${diemSV2} / 10` : '']
                );
            } else {
                data.push(
                    [1, item.maSo, item.name, `${diemSV1} /10`]
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

        } else if (define == 'pb2' && response.DT[0].Result.diemGVPB2 != null) {
            let ghichu = item.Criteriapb?.ghichuPB2
            let danhgiaphanbiensv1 = item.Result?.danhgiaphanbien1
            let diemSV1 = item.Result?.diemGVPB2
            let diemSV2 = res[1] && res[1].Result?.diemGVPB2
            let danhgiaphanbiensv2 = res[1] && res[1].Result?.danhgiaphanbien2

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
            pdf.text('Vai trò của người đánh giá: Giảng viên phản biện 2', 20, 67);

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
                    [2, res[1]?.maSo || '', res[1]?.name || '', res[1] ? `${diemSV2} /10` : '']
                );
            } else {
                data.push(
                    [1, item.maSo, item.name, `${diemSV1} /10`]
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
        } else if (define == 'pb3' && response.DT[0].Result.diemGVPB3 != null) {
            let ghichu = item.Criteriapb?.ghichuPB3
            let danhgiaphanbiensv1 = item.Result?.danhgiaphanbien3
            let diemSV1 = item.Result?.diemGVPB3
            let diemSV2 = res[1] && res[1].Result?.diemGVPB3
            let danhgiaphanbiensv2 = res[1] && res[1].Result?.danhgiaphanbien3

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
            pdf.text('Vai trò của người đánh giá: Giảng viên phản biện 3', 20, 67);

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
                    [2, res[1]?.maSo || '', res[1]?.name || '', res[1] ? `${diemSV2} /10` : '']
                );
            } else {
                data.push(
                    [1, item.maSo, item.name, `${diemSV1} /10`]
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
                <p className="mt-3 "><i>Số lượng sinh viên cần chấm phản biện:</i> <b className="text-danger"> {students ? students.length : ''}</b></p>
                <table className="table  table-bordered table-hover mt-3">
                    <thead>
                        <tr>
                            <th style={{ width: "6%" }} >MSSV</th>
                            <th style={{ width: "9%" }}>Tên</th>
                            <th style={{ width: "14%" }}>Tên Đề Tài</th>
                            <th style={{ width: "15%" }}>Mô Tả</th>
                            <th style={{ width: "10%" }}>GVHD</th>
                            <th style={{ width: "6%" }}>Nhóm</th>
                            <th style={{ width: "10%" }}>GV Phản Biện</th>
                            <th style={{ width: "12%" }}>Chấm</th>
                            <th style={{ width: "6%" }}>Bộ môn</th>

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
                                                .filter(itemm => itemm.id == item.pb1)
                                                .map((itemmm, index) => (
                                                    itemmm.maSo == user.maSo ?
                                                        <b><p key={`pb1-${index}`}>PB1: {itemmm.name}</p></b>
                                                        : <p key={`pb1-${index}`}>PB1: {itemmm.name}</p>

                                                ))
                                        )}
                                        {listtecher && (
                                            listtecher
                                                .filter(itemm => itemm.id == item.pb2)
                                                .map((itemmm, index) => (
                                                    itemmm.maSo == user.maSo ?
                                                        <b><p key={`pb1-${index}`}>PB2: {itemmm.name}</p></b>
                                                        : <p key={`pb1-${index}`}>PB2: {itemmm.name}</p>
                                                ))
                                        )}

                                        {listtecher && (
                                            listtecher
                                                .filter(itemm => itemm.id == item.pb3)
                                                .map((itemmm, index) => (
                                                    itemmm.maSo == user.maSo ?
                                                        <b><p key={`pb1-${index}`}>PB3: {itemmm.name}</p></b>
                                                        : <p key={`pb1-${index}`}>PB3: {itemmm.name}</p>
                                                ))
                                        )}
                                    </td>
                                    <td>
                                        {showButton && (
                                            <>
                                                <button onClick={() => handleChamDiemPB(item)} className="btn btn-success">
                                                    <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                                                </button>
                                                <br /><br />
                                                {item.Result && (item.pb1 == userid) && (item.Result.diemGVPB1 != null) &&
                                                    <>
                                                        <p className="text-primary mb-0" onClick={() => exportToPDF(item)}>(Phiếu đánh giá)</p>
                                                        <p className="text-primary" onClick={() => exportToPDFPhieuDiem(item)}>(Phiếu điểm)</p>

                                                    </>
                                                }
                                                {item.Result && (item.pb2 == userid) && (item.Result.diemGVPB2 != null) &&
                                                    <>
                                                        <p className="text-primary mb-0" onClick={() => exportToPDF(item)}>(Phiếu đánh giá)</p>
                                                        <p className="text-primary" onClick={() => exportToPDFPhieuDiem(item)}>(Phiếu điểm)</p>

                                                    </>
                                                }
                                                {item.Result && (item.pb3 == userid) && (item.Result.diemGVPB3 != null) &&
                                                    <>
                                                        <p className="text-primary mb-0" onClick={() => exportToPDF(item)}>(Phiếu đánh giá)</p>
                                                        <p className="text-primary" onClick={() => exportToPDFPhieuDiem(item)}>(Phiếu điểm)</p>

                                                    </>
                                                }

                                                {item.groupStudent &&
                                                    ((item.Result?.diemGVPB1 !== null) ? (
                                                        <i className="text-primary">PB1 Đã đánh giá</i>
                                                    ) : (
                                                        <i className="text-danger">PB1 Chưa đánh giá</i>
                                                    ))}
                                                <br></br>
                                                {item.groupStudent &&
                                                    ((item.Result?.diemGVPB2 !== null) ? (
                                                        <i className="text-primary">PB2 Đã đánh giá</i>
                                                    ) : (
                                                        <i className="text-danger">PB2 Chưa đánh giá</i>
                                                    ))}
                                                <br></br>
                                                {item.pb3 != null &&
                                                    <>
                                                        {item.groupStudent &&
                                                            ((item.Result?.diemGVPB3 !== null) ? (
                                                                <i className="text-primary">PB3 Đã đánh giá</i>
                                                            ) : (
                                                                <i className="text-danger">PB3 Chưa đánh giá</i>
                                                            ))}
                                                    </>

                                                }
                                            </>
                                        )}
                                    </td>

                                    <td>IS</td>
                                </tr>
                            );
                        }) : <tr>

                            <td colSpan={9}><i>Chưa được phân chấm phản biện</i></td>
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
                                <div className="row">
                                    <div className="col-sm-4  px-0">
                                        <b> SV1: </b>&nbsp;&nbsp;<i className="">{listSV1SV2[0].name} </i> &nbsp;<i className="">{listSV1SV2[0].maSo} </i>
                                    </div>
                                    <div className="col-sm-2 px-0">
                                        <select value={PBSV1.danhgiaphanbien} onChange={(event) => handleOnchange(event.target.value, 'danhgiaphanbien')} className={PBSV1.danhgiaphanbien == 'true' ? 'form-select text-primary' : 'form-select text-danger'}>
                                            <option value={'null'}>---</option>
                                            <option className="text-primary" value={'true'}>Đạt</option>
                                            <option className="text-danger" value={'false'}>Không đạt</option>
                                        </select>
                                    </div>
                                    {
                                        (PBSV1.danhgiaphanbien == 'true' || PBSV1.danhgiaphanbien == 'false') &&
                                        <>
                                            <div className="col-sm-4 px-0">
                                                <b> SV2:</b> &nbsp;&nbsp;<i className="">{listSV1SV2[1].name} </i>&nbsp;<i className="">{listSV1SV2[1].maSo} </i>
                                            </div>
                                            <div className="col-sm-2 px-0">
                                                <select value={PBSV2.danhgiaphanbien} onChange={(event) => handleOnchange2(event.target.value, 'danhgiaphanbien')} className={PBSV2.danhgiaphanbien == 'true' ? 'form-select text-primary' : 'form-select text-danger'}>
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
                                            PBSV1.danhgiaphanbien == 'false' && (PBSV2.danhgiaphanbien == 'null' || !PBSV2.danhgiaphanbien) &&
                                            <>
                                                <div className="col-sm-4 px-0"><i className="text-danger diemhuongdan"> Điểm SV1</i></div>
                                                <input value={PBSV1.diemSV1} className="col-sm-2 " type="number" />

                                            </>
                                        }
                                        {
                                            PBSV1.danhgiaphanbien == 'false' && PBSV2.danhgiaphanbien == 'false' &&
                                            <>
                                                <div className="col-sm-4 px-0"><i className="text-danger diemhuongdan"> Điểm SV1</i></div>
                                                <input value={PBSV1.diemSV1} className="col-sm-2 " type="number" />
                                                <div className="col-sm-4 px-0"><i className="text-danger diemhuongdan"> Điểm SV2</i></div>
                                                <input value={PBSV2.diemSV2} className="col-sm-2 " type="number" />
                                                <div className="row mt-3 ms-1">
                                                    <div className="col-sm-2 px-0 "><i className="text-primary">Nhận xét SV1</i></div>
                                                    <textarea value={PBSV1.ghichu} onChange={(event) => handleOnchange(event.target.value, 'ghichu')} className="col-sm-4 px-0"></textarea>

                                                    <div className="col-sm-2 px-0"><i className="text-primary">Nhận xét SV2</i></div>
                                                    <textarea value={PBSV2.ghichu} onChange={(event) => handleOnchange2(event.target.value, 'ghichu')} className="col-sm-4 px-0"></textarea>

                                                </div>
                                            </>
                                        }
                                        {
                                            PBSV1.danhgiaphanbien == 'false' && PBSV2.danhgiaphanbien == 'true' &&
                                            <>
                                                <div className="col-sm-4 px-0"><i className="text-danger diemhuongdan"> Điểm SV1</i></div>
                                                <input value={PBSV1.diemSV1} className="col-sm-2 " type="number" />
                                                <div className="col-sm-4 px-0"><i className="text-danger diemhuongdan"> Điểm SV2</i></div>
                                                <input value={PBSV2.diemSV2} onChange={(event) => handleOnchange2(event.target.value, 'diemSV2')} className="col-sm-2 " type="number" />

                                            </>
                                        }
                                        {
                                            PBSV1.danhgiaphanbien == 'true' && (PBSV2.danhgiaphanbien == 'null' || !PBSV2.danhgiaphanbien) &&
                                            <>
                                                <div className="col-sm-4 px-0"><i className="text-danger diemhuongdan"> Điểm SV1</i></div>
                                                <input value={PBSV1.diemSV1} onChange={(event) => handleOnchange(event.target.value, 'diemSV1')} className="col-sm-2 " type="number" />

                                            </>
                                        }
                                        {
                                            PBSV1.danhgiaphanbien == 'true' && PBSV2.danhgiaphanbien == 'true' &&
                                            <>
                                                <div className="col-sm-4 px-0"><i className="text-danger diemhuongdan"> Điểm SV1</i></div>
                                                <input value={PBSV1.diemSV1} onChange={(event) => handleOnchange(event.target.value, 'diemSV1')} className="col-sm-2 " type="number" />
                                                <div className="col-sm-4 px-0"><i className="text-danger diemhuongdan"> Điểm SV2</i></div>
                                                <input value={PBSV2.diemSV2} onChange={(event) => handleOnchange2(event.target.value, 'diemSV2')} className="col-sm-2 " type="number" />

                                            </>
                                        }
                                        {
                                            PBSV1.danhgiaphanbien == 'true' && PBSV2.danhgiaphanbien == 'false' &&
                                            <>
                                                <div className="col-sm-4 px-0"><i className="text-danger diemhuongdan"> Điểm SV1</i></div>
                                                <input value={PBSV1.diemSV1} onChange={(event) => handleOnchange(event.target.value, 'diemSV1')} className="col-sm-2 " type="number" />
                                                <div className="col-sm-4 px-0"><i className="text-danger diemhuongdan"> Điểm SV2</i></div>
                                                <input value={PBSV2.diemSV2} className="col-sm-2 " type="number" />

                                            </>
                                        }
                                        {
                                            PBSV1.danhgiaphanbien == '' &&
                                            <>
                                            </>
                                        }
                                        {
                                            (PBSV1.danhgiaphanbien == 'null' || !PBSV1.danhgiaphanbien) && PBSV2.danhgiaphanbien == 'false' &&
                                            <>
                                                <div className="col-sm-4 px-0"></div>
                                                <div className="col-sm-4 px-0"><i className="text-danger diemhuongdan"> Điểm SV2</i></div>
                                                <input value={PBSV2.diemSV2} onChange={(event) => handleOnchange2(event.target.value, 'diemSV2')} className="col-sm-2 " type="number" />

                                            </>
                                        }

                                    </>
                                    : <>

                                        <div className="col-sm-4 px-0 ">
                                            <b>  {listSV1SV2.length && listSV1SV2[0].name}</b> &nbsp;&nbsp; {listSV1SV2.length && listSV1SV2[0].maSo}
                                        </div>
                                        <div className="col-sm-3">
                                            <select value={PBSV1.danhgiaphanbien} onChange={(event) => handleOnchange(event.target.value, 'danhgiaphanbien')} className={PBSV1.danhgiaphanbien == 'true' ? 'form-select text-primary' : 'form-select text-danger'}>
                                                <option value={'null'}>---</option>
                                                <option className="text-primary" value={'true'}>Đạt</option>
                                                <option className="text-danger" value={'false'}>Không đạt</option>
                                            </select>
                                        </div>
                                        {
                                            PBSV1.danhgiaphanbien == 'true' &&
                                            <>
                                                <div className="col-sm-3  "><i className="text-danger"> Điểm </i></div>
                                                <input value={PBSV1.diemSV1} onChange={(event) => handleOnchange(event.target.value, 'diemSV1')} className="col-sm-2 " type="number" />

                                            </>

                                        }
                                        {
                                            PBSV1.danhgiaphanbien == 'false' &&
                                            <>
                                                <div className="col-sm-3  "><i className="text-danger"> Điểm </i></div>
                                                <input value={PBSV1.diemSV1} className="col-sm-2 " type="number" />
                                                <br></br>
                                                <div className="row mt-2">
                                                    <div className="col-sm-2"><i className="text-primary">Nhận xét</i></div>
                                                    <textarea value={PBSV1.ghichu} onChange={(event) => handleOnchange(event.target.value, 'ghichu')} className="col-sm-10"></textarea>
                                                </div>
                                            </>

                                        }
                                    </>
                            }

                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                {
                                    ((PBSV1.danhgiaphanbien && PBSV1.danhgiaphanbien == 'true') || (PBSV2.danhgiaphanbien && PBSV2.danhgiaphanbien == 'true')) &&
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th style={{ width: "10%" }}>STT</th>
                                                <th style={{ width: "70%" }}>
                                                    Tiêu chí
                                                </th>
                                                {
                                                    PBSV1.danhgiaphanbien == 'true' &&
                                                    <th style={{ width: "20%" }}>
                                                        SV1
                                                    </th>
                                                }
                                                {
                                                    listSV1SV2.length == 2 && PBSV2.danhgiaphanbien == 'true' &&
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
                                                    {
                                                        PBSV1.danhgiaphanbien == 'true' ?
                                                            <td>
                                                                <select value={PBSV1[`LOL${index + 1}`]} onChange={(event) => handleOnchange(event.target.value, `LOL${index + 1}`)} className="form-select">
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
                                                        listSV1SV2.length == 2 && PBSV2.danhgiaphanbien == 'true' &&
                                                        <td>
                                                            <select value={PBSV2[`LOL${index + 1}`]} onChange={(event) => handleOnchange2(event.target.value, `LOL${index + 1}`)} className="form-select">
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
                            listSV1SV2.length == 2 ?
                                ((PBSV1.danhgiaphanbien == 'true' && PBSV2.danhgiaphanbien == 'true') || (PBSV1.danhgiaphanbien == 'true' && PBSV2.danhgiaphanbien == 'false') || (PBSV1.danhgiaphanbien == 'false' && PBSV2.danhgiaphanbien == 'true')) &&
                                <div className="row">
                                    <div className="col-sm-2"><i className="text-primary">Nhận xét SV1</i></div>
                                    <textarea value={PBSV1.ghichu} onChange={(event) => handleOnchange(event.target.value, 'ghichu')} className="col-sm-4"></textarea>
                                    <div className="col-sm-2"><i className="text-primary">Nhận xét SV2</i></div>
                                    <textarea value={PBSV2.ghichu} onChange={(event) => handleOnchange2(event.target.value, 'ghichu')} className="col-sm-4"></textarea>

                                </div>
                                : 
                                PBSV1.danhgiaphanbien == 'true' &&
                                <div className="row">
                                    <div className="col-sm-2"><i className="text-primary">Nhận xét SV1</i></div>
                                    <textarea value={PBSV1.ghichu} onChange={(event) => handleOnchange(event.target.value, 'ghichu')} className="col-sm-9"></textarea>
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
        </>
    );
};

export default TeacherChamPB;
