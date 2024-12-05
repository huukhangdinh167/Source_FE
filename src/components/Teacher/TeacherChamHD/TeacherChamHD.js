import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap"; // Import modal từ React Bootstrap
import swal from "sweetalert";
import "./TeacherChamHD.scss";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import autoTable from 'jspdf-autotable';
import { teacherGetDSHD, teacherDGHD } from "../../../services/Teacher";

import _, { cloneDeep } from "lodash";
import { toast } from "react-toastify";
import { UserContext } from "../../../context/userContext";

const TeacherChamHD = (props) => {
    const { user } = React.useContext(UserContext);
    const [DSHD, setDSHD] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [ModalUser, setModalUser] = useState(false);

    // const [showFinalEvaluation, setShowFinalEvaluation] = useState(false); // Hiển thị đánh giá cuối kỳ
    const [data4table, setData4table] = useState('')
    const [dataModal, setDataModal] = useState({})
    const defaultdanhgia = {
        danhgiagiuaky: '',
        danhgiacuoiky: '',
        diemGVHD: '',
        LOL1: '',
        LOL2: '',
        LOL3: '',
        LOL4: '',
        LOL5: '',
        LOL6: '',
        LOL7: '',
        LOL8: '',
        ghichu: ''

    }
    const [danhgia, setDanhGia] = useState(defaultdanhgia)
    //  const [danhgiaCk, setDanhGiaCk] = useState()
    useEffect(() => {
        studentss();
    }, []);

    // useEffect(() => {
    //     studentss();
    // }, [DSHD]);

    useEffect(() => {
        setDanhGia({
            ...dataModal,
            danhgiagiuaky: dataModal.Result?.danhgiagiuaky,
            danhgiacuoiky: dataModal.Result?.danhgiacuoiky,
            LOL1: dataModal.Criterion?.LOL1,
            LOL2: dataModal.Criterion?.LOL2,
            LOL3: dataModal.Criterion?.LOL3,
            LOL4: dataModal.Criterion?.LOL4,
            LOL5: dataModal.Criterion?.LOL5,
            LOL6: dataModal.Criterion?.LOL6,
            LOL7: dataModal.Criterion?.LOL7,
            LOL8: dataModal.Criterion?.LOL8,
            ghichu: dataModal.Criterion?.ghichu,
            diemGVHD: dataModal.Result?.diemGVHD,

        });
    }, [dataModal]);

    const studentss = async () => {
        let data = await teacherGetDSHD(user);
        setDSHD(data.DT);
    };

    const handleCloseModal = async () => {
        setShowModal(false); // Đóng modal
        // setShowFinalEvaluation(false); // Reset hiển thị đánh giá cuối kỳ
        setTimeout(() => {
            setDanhGia(defaultdanhgia); // Sau 0.5 giây sẽ reset lại danh gia
        }, 150);
    };

    const handleChamHD = async (item) => {
        setShowModal(true);
        setModalUser(item);
        setData4table(item)
        setDataModal({
            ...item, danhgiagiuaky: dataModal.Result?.danhgiagiuaky,
            danhgiacuoiky: dataModal.Result?.danhgiacuoiky,
            LOL1: dataModal.Criterion?.LOL1,
            LOL2: dataModal.Criterion?.LOL2,
            LOL3: dataModal.Criterion?.LOL3,
            LOL4: dataModal.Criterion?.LOL4,
            LOL5: dataModal.Criterion?.LOL5,
            LOL6: dataModal.Criterion?.LOL6,
            LOL7: dataModal.Criterion?.LOL7,
            LOL8: dataModal.Criterion?.LOL8,
            ghichu: dataModal.Criterion?.ghichu,
            diemGVHD: dataModal.Result?.diemGVHD,
        })
        // setDataModal(item)
    };
    const handleOnchange = (value, name) => {

        let _danhgia = _.cloneDeep(danhgia)
        if (name == 'danhgiacuoiky' && value == 'false') {
            setDanhGia({ ..._danhgia, diemGVHD: 0, danhgiacuoiky: 'false' })
        }
        else if (name == 'danhgiacuoiky' && value == 'true') {
            setDanhGia({ ..._danhgia, diemGVHD: '', danhgiacuoiky: 'true' })
        }
        else {
            _danhgia[name] = value
            setDanhGia(_danhgia)
        }
    }
    const danhgiaHD = async () => {
        if (!danhgia.danhgiagiuaky) {
            toast.error("Vui lòng đánh giá giữa kì")
            return
        }
        if (danhgia.danhgiagiuaky == 'true' || danhgia.danhgiagiuaky == 'false') {
            if (danhgia.danhgiacuoiky == 'true') {
                if (!danhgia.diemGVHD) {
                    toast.error("Vui lòng nhập điểm hướng dẫn")
                    return
                }
                if (danhgia.diemGVHD < 0 || danhgia.diemGVHD > 10) {
                    toast.error("Điểm là một số từ 1-10")
                    return
                }
                if (!danhgia.LOL1) {
                    toast.error("Vui lòng đánh giá LOL1")
                    return
                }
                if (!danhgia.LOL2) {
                    toast.error("Vui lòng đánh giá LOL2")
                    return
                }
                if (!danhgia.LOL3) {
                    toast.error("Vui lòng đánh giá LOL3")
                    return
                }
                if (!danhgia.LOL4) {
                    toast.error("Vui lòng đánh giá LOL3")
                    return
                }
                if (!danhgia.LOL5) {
                    toast.error("Vui lòng đánh giá LOL5")
                    return
                }
                if (!danhgia.LOL6) {
                    toast.error("Vui lòng đánh giá LOL6")
                    return
                }
                if (!danhgia.LOL7) {
                    toast.error("Vui lòng đánh giá LOL7")
                    return
                }
                if (!danhgia.LOL8) {
                    toast.error("Vui lòng đánh giá LOL8")
                    return
                }
            } else if (danhgia.danhgiacuoiky == 'false') {
                if (!danhgia.LOL1) {
                    toast.error("Vui lòng đánh giá LOL1")
                    return
                }
                if (!danhgia.LOL2) {
                    toast.error("Vui lòng đánh giá LOL2")
                    return
                }
                if (!danhgia.LOL3) {
                    toast.error("Vui lòng đánh giá LOL3")
                    return
                }
                if (!danhgia.LOL4) {
                    toast.error("Vui lòng đánh giá LOL3")
                    return
                }
                if (!danhgia.LOL5) {
                    toast.error("Vui lòng đánh giá LOL5")
                    return
                }
                if (!danhgia.LOL6) {
                    toast.error("Vui lòng đánh giá LOL6")
                    return
                }
                if (!danhgia.LOL7) {
                    toast.error("Vui lòng đánh giá LOL7")
                    return
                }
                if (!danhgia.LOL8) {
                    toast.error("Vui lòng đánh giá LOL8")
                    return
                }
            }
        }

        let reponse = await teacherDGHD(danhgia, data4table)
        if (reponse.EC == 0) {
            toast.success("Đánh giá thành công")
            setShowModal(false);
            await studentss()
        } else {
            toast.error(reponse.EM)
        }
        //  console.log(danhgia)
    }
    const exportToPDF = (item) => {
        const pdf = new jsPDF();

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

        pdf.text(`Họ tên người đánh giá: ${item.Project.instuctor}`, 20, 60);
        pdf.text('Vai trò của người đánh giá: Giảng viên hướng dẫn', 20, 67);

        const projectName = `Tên đề tài: ${item.Project.name}`;
        const x = 20;
        let y = 74;

        // Kiểm tra xem tên đề tài có dài quá không và chia thành nhiều dòng
        const maxWidth = 180; // Giới hạn chiều rộng của text
        let lines = pdf.splitTextToSize(projectName, maxWidth);
        pdf.text(lines, x, y);
        pdf.text(`Họ tên sinh viên: ${item.name}`, 20, y + 12);
        pdf.text(`Mã số sinh viên: ${item.maSo}`, 125, y + 12);

        // pdf.text('Họ tên sinh viên 2: ', 15, 85);
        // pdf.text('Mã số sinh viên: ', 120, 85);

        const headers = [['STT', 'LOL', '']];
        const data = [
            [1, 'Xác định được yêu cầu của khóa luận cần thực hiệnv', item.Criterion?.LOL1],
            [2, 'Phân tích yêu cầu nghiệp vụ hiện trạng và mô hình hóa được yêu cầu của đề tài', item.Criterion?.LOL2],
            [3, 'Thiết kế một hệ thống thông tin đưa ra giải pháp đáp ứng được yêu cầu của đề tài', item.Criterion?.LOL3],
            [4, 'Hiện thực hóa hệ thống thông tin theo thiết kế đã đưa ra/Hiện thực giải pháp đã đưa ra', item.Criterion?.LOL4],
            [5, 'Viết được báo cáo khóa luận tốt nghiệp', item.Criterion?.LOL5],
            [6, 'Trình bày được các kiến thức nền tảng liên quan đến đề tài khóa luận', item.Criterion?.LOL6],
            [7, 'Đánh giá việc thực hiện khóa luận đáp ứng yêu cầu đề tài khóa luận', item.Criterion?.LOL7],
            [8, 'Bảo vệ khóa kết quả khóa luận trước giản viên hướng dẫn', item.Criterion?.LOL8],
            ['', 'Kết quả', item.Result.danhgiacuoiky == 'true' ? 'ĐẠT' : 'Không đạt'],


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
                0: { cellWidth: 17 }, // Cột 1 (STT) rộng 20
                1: { cellWidth: 135 }, // Cột 2 (Họ và Tên) rộng 50
                2: { cellWidth: 32 }, // Cột 3 (Điểm Toán) rộng 25
                //  3: { cellWidth: 25 }, // Cột 4 (Điểm Lý) rộng 25

            },
        });
        // pdf.text('Kết quả:', 80, 195);
        // pdf.text(`${item.Result.danhgiacuoiky == 'true' ? 'ĐẠT' : 'KHÔNG ĐẠT'}`, 100, 195);


        pdf.text('Nhận xét:', 20, 203);
        pdf.text(`${item.Criterion.ghichu ?? ''}`, 23, 210);
        pdf.text('TP.HCM, ngày    tháng    năm', 120, 240);
        pdf.text('Người đánh giá', 130, 245);
        pdf.text('(Ký và ghi rõ họ tên)', 125, 250);
        pdf.text(`${item.Project.instuctor}`, 130, 275);

        pdf.save(item.name);
    };

    const exportToPDFPhieuDiem = (item) => {
        const pdf = new jsPDF();

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

        pdf.text(`Họ tên người đánh giá: ${item.Project.instuctor}`, 20, 60);
        pdf.text('Vai trò của người đánh giá: Giảng viên hướng dẫn', 20, 67);

        const projectName = `Tên đề tài: ${item.Project.name}`;
        const x = 20;
        let y = 74;

        // Kiểm tra xem tên đề tài có dài quá không và chia thành nhiều dòng
        const maxWidth = 180; // Giới hạn chiều rộng của text
        let lines = pdf.splitTextToSize(projectName, maxWidth);
        pdf.text(lines, x, y);
        pdf.text(`Họ tên sinh viên: ${item.name}`, 20, y + 12);
        pdf.text(`Mã số sinh viên: ${item.maSo}`, 125, y + 12);



        const headers = [['STT', 'MSSV', 'Ho va Ten', 'Diem']];
        const data = [
            [1, item.maSo, item.name, item.Result?.diemGVHD],
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
                0: { cellWidth: 20 }, // Cột 1 (STT) rộng 17
                1: { cellWidth: 65 }, // Cột 2 (MSSV) rộng 35
                2: { cellWidth: 70 }, // Cột 3 (Họ và Tên) rộng 45
                3: { cellWidth: 30 }, // Cột 4 (Điểm) rộng 32
                //  3: { cellWidth: 25 }, // Cột 4 (Điểm Lý) rộng 25

            },
        });
        // pdf.text('Kết quả:', 80, 195);
        // pdf.text(`${item.Result.danhgiacuoiky == 'true' ? 'ĐẠT' : 'KHÔNG ĐẠT'}`, 100, 195);

        pdf.text('Nhận xét:', 20, 120);
        pdf.text(`${item.Criterion.ghichu ?? ''}`, 23, 125);
        pdf.text('TP.HCM, ngày    tháng    năm', 120, 180);
        pdf.text('Người đánh giá', 130, 185);
        pdf.text('(Ký và ghi rõ họ tên)', 125, 190);
        pdf.text(`${item.Project.instuctor}`, 130, 215);

        pdf.save(item.name);
    };
    return (
        <>
            <div className="container">
                <p className="mt-3">
                    <i>Số lượng sinh viên cần đánh giá :</i>{" "}
                    <b className="text-danger"> {DSHD ? DSHD.length : ""}</b>
                </p>
                <table className="table text-center table-bordered table-hover mt-3">
                    <thead>
                        <tr>
                            <th style={{ width: "5%" }}>MSSV</th>
                            <th style={{ width: "10%" }}>Tên</th>
                            <th style={{ width: "15%" }}>Tên Đề Tài</th>
                            <th style={{ width: "10%" }}>GVHD</th>
                            <th style={{ width: "6%" }}>Nhóm</th>
                            <th style={{ width: "9%" }}>Giữa kì</th>
                            <th style={{ width: "9%" }}>Cuối kì</th>
                            <th style={{ width: "10%" }}>Đánh giá</th>
                            <th style={{ width: "5%" }}>Bộ môn</th>
                        </tr>
                    </thead>
                    <tbody>
                        {DSHD.length > 0 ? (
                            DSHD.map((item, index) => {
                                const isGroupNull =
                                    item.groupStudent === null ||
                                    item.groupStudent === "null";

                                return (
                                    <tr key={`student-${index}`}>
                                        <td>{item.maSo}</td>
                                        <td>{item.name}</td>
                                        <td>{item.Project && item.Project.name}</td>

                                        <td>{item.Project && item.Project.instuctor}</td>
                                        <td>
                                            {isGroupNull ? (
                                                <i>Làm một mình</i>
                                            ) : (
                                                item.groupStudent
                                            )}
                                        </td>

                                        <td>{item && item.Result && item.Result.danhgiagiuaky && item.Result.danhgiagiuaky == 'false' ? <i className="text-danger">Không đạt</i> : (item && item.Result && item.Result.danhgiagiuaky && item.Result.danhgiagiuaky == 'true' ? <b><i className="text-primary">Đạt (Ok)</i></b> : '')} </td>
                                        <td>{item && item.Result && item.Result.danhgiacuoiky && (item.Result.danhgiacuoiky == 'false' || item.Result.danhgiagiuaky == 'false') ? <i className="text-danger">Không đạt</i> : (item && item.Result && item.Result.danhgiacuoiky && item.Result.danhgiacuoiky == 'true' ? <b><i className="text-primary">Đạt (Ok)</i></b> : '')}
                                            <p> {item.Result && item.Result.diemGVHD && item.Result.danhgiacuoiky == 'true' && item.Result.danhgiagiuaky == 'true' ? item.Result.diemGVHD : ''}</p>
                                        </td>
                                        <td>
                                            <button
                                                onClick={() =>
                                                    handleChamHD(item)
                                                }
                                                className="btn btn-success"
                                            >
                                                <i
                                                    className="fa fa-pencil-square-o"
                                                    aria-hidden="true"
                                                ></i>
                                            </button>
                                            {
                                                item && item.Result && item.Result.danhgiacuoiky != null ?
                                                    <>
                                                        <p className="text-primary mb-0" onClick={() => exportToPDF(item)}>(phiếu đánh giá)</p>
                                                        <p className="text-primary" onClick={() => exportToPDFPhieuDiem(item)}>(phiếu điểm)</p>
                                                    </> : ''


                                            }
                                        </td>
                                        <td>IS</td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={9}>
                                    <i>Danh sách trống</i>
                                </td>
                            </tr>
                        )}
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
                            {ModalUser && ModalUser.name}
                        </span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-sm-1"></div>
                        <div className="col-sm-4">
                            <b>Đánh giá giữa kỳ</b>
                        </div>
                        <div className="DGGK col-sm-4">
                            <select value={danhgia.danhgiagiuaky} onChange={(event) => handleOnchange(event.target.value, 'danhgiagiuaky')} className="form-select">
                                <option value={''}>---</option>
                                <option className="text-primary" value={'true'}>Đạt</option>
                                <option className="text-danger" value={'false'}>Không đạt</option>

                            </select>
                        </div>
                        <div className="col-sm-2"></div>
                    </div>
                    <div>
                        <hr />
                    </div>

                    {/* Nút toggle "Đánh giá cuối kỳ" */}
                    <div className="row mt-3">

                        <div className="col-sm-1"></div>
                        <div className="col-sm-4">
                            <button
                                className="btn btn-link text-decoration-none"

                            >
                                <b>Đánh giá cuối kỳ</b>{" "}

                            </button>
                        </div>
                        {
                            (danhgia.danhgiagiuaky == 'true' || danhgia.danhgiagiuaky == 'false') &&
                            <div className="col-sm-4" onChange={(event) => handleOnchange(event.target.value, 'danhgiacuoiky')}>
                                <select value={danhgia.danhgiacuoiky} className="form-select">
                                    <option value={''}>---</option>
                                    <option className="text-primary" value={'true'}>Đạt(ok)</option>
                                    <option className="text-danger" value={'false'}>Không đạt</option>
                                </select>
                            </div>
                        }
                    </div>

                    {/* Phần đánh giá cuối kỳ */}
                    {danhgia.danhgiacuoiky && (danhgia.danhgiagiuaky == 'true' || danhgia.danhgiagiuaky == 'false') && (danhgia.danhgiacuoiky == 'true' || danhgia.danhgiacuoiky == 'false') && (

                        <>
                            <div className="row mt-4">
                                <div className="col-sm-6"></div>
                                <div className="col-sm-3  "><i className="text-danger"> Điểm hướng dẫn</i></div>
                                {
                                    danhgia.danhgiacuoiky == 'false' ? <input value={danhgia.diemGVHD} className="col-sm-2 " type="number" />
                                        : <input value={danhgia.diemGVHD} onChange={(event) => handleOnchange(event.target.value, 'diemGVHD')} className="col-sm-2 " type="number" />
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
                                                    Đánh giá
                                                </th>
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
                                                "Bảo vệ khóa kết quả khóa luận trước giản viên hướng dẫn",
                                            ].map((criteria, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{criteria}</td>
                                                    <td>
                                                        <select value={danhgia[`LOL${index + 1}`]} onChange={(event) => handleOnchange(event.target.value, `LOL${index + 1}`)} className="form-select">
                                                            <option>----</option>
                                                            <option value={'1'}>1</option>
                                                            <option value={'2'}>2</option>
                                                            <option value={'3'}>3</option>
                                                            <option value={'4'}>4</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-2"><i className="text-primary">Nhận xét</i></div>
                                <textarea value={danhgia.ghichu} onChange={(event) => handleOnchange(event.target.value, 'ghichu')} className="col-sm-9"></textarea>
                            </div>
                        </>


                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Đóng
                    </Button>


                    <Button onClick={danhgiaHD} variant="primary">Xác nhận</Button>

                </Modal.Footer>
            </Modal>
        </>
    );
};

export default TeacherChamHD;
