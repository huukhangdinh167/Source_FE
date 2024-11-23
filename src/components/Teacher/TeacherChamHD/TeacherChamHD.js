import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap"; // Import modal từ React Bootstrap
import swal from "sweetalert";
import "./TeacherChamHD.scss";


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
        _danhgia[name] = value
        setDanhGia(_danhgia)


    }
    const danhgiaHD = async () => {
        if (!danhgia.danhgiagiuaky) {
            toast.error("Vui lòng đánh giá giữa kì")
            return
        } if (danhgia.danhgiacuoiky == 'true') {
            if (!danhgia.diemGVHD) {
                toast.error("Vui lòng nhập điểm hướng dẫn")
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
                            <th style={{ width: "10%" }}>Giữa kì</th>
                            <th style={{ width: "10%" }}>Cuối kì</th>
                            <th style={{ width: "8%" }}>Đánh giá</th>
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
                                        <td>{item.Project.name}</td>

                                        <td>{item.Project.instuctor}</td>
                                        <td>
                                            {isGroupNull ? (
                                                <i>Làm một mình</i>
                                            ) : (
                                                item.groupStudent
                                            )}
                                        </td>
                                       <td>{item.Result.danhgiagiuaky == 'false' ? <i className="text-danger">Không đạt</i> : (item.Result.danhgiagiuaky == 'true' ? <b><i className="text-primary">Đạt (Ok)</i></b> : '')} </td>
                                        <td>{item.Result.danhgiacuoiky == 'false' ? <i className="text-danger">Không đạt</i> : (item.Result.danhgiacuoiky == 'true' ? <b><i className="text-primary">Đạt (Ok)</i></b> : '')}
                                            <p> {item.Result.diemGVHD ? item.Result.diemGVHD : ''}</p>
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
                                        </td>
                                        <td>IS</td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={11}>
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
                            danhgia.danhgiagiuaky == 'true' ?
                                <div className="col-sm-4" onChange={(event) => handleOnchange(event.target.value, 'danhgiacuoiky')}>
                                    <select value={danhgia.danhgiacuoiky} className="form-select">
                                        <option value={''}>---</option>
                                        <option className="text-primary" value={'true'}>Đạt(ok)</option>
                                        <option className="text-danger" value={'false'}>Không đạt</option>
                                    </select>
                                </div> : (danhgia.danhgiagiuaky == 'false' ? <i className="text-danger">Giữa kì không đạt</i> : <i>Vui lòng đánh giá giữa kì</i>)
                        }
                    </div>

                    {/* Phần đánh giá cuối kỳ */}
                    {danhgia.danhgiacuoiky && danhgia.danhgiagiuaky == 'true' && danhgia.danhgiacuoiky == 'true' && (

                        <>
                            <div className="row mt-4">
                                <div className="col-sm-6"></div>
                                <div className="col-sm-3  "><i className="text-danger"> Điểm hướng dẫn</i></div>
                                <input value={danhgia.diemGVHD} onChange={(event) => handleOnchange(event.target.value, 'diemGVHD')} className="col-sm-2 " type="number" />

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
                                <textarea value={danhgia.ghichu} onChange={(event) => handleOnchange(event.target.value, 'ghichu')} className="col-sm-9"></textarea></div>
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
