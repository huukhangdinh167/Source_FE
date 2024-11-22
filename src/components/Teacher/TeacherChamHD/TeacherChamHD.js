import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap"; // Import modal từ React Bootstrap
import swal from "sweetalert";
import "./TeacherChamHD.scss";

import { teacherGetDSHD } from "../../../services/Teacher";
import _, { cloneDeep } from "lodash";
import { toast } from "react-toastify";
import { UserContext } from "../../../context/userContext";

const TeacherChamHD = (props) => {
    const { user } = React.useContext(UserContext);
    const [DSHD, setDSHD] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [ModalUser, setModalUser] = useState(false);
    const [showFinalEvaluation, setShowFinalEvaluation] = useState(false); // Hiển thị đánh giá cuối kỳ

    const defaultdanhgia = {
        danhgiagiuaky: '',
        diemGVHD: ''
    }
    const [danhgia, setDanhGia] = useState(defaultdanhgia)
    //  const [danhgiaCk, setDanhGiaCk] = useState()
    useEffect(() => {
        studentss();
    }, []);

    useEffect(() => {
        studentss();
    }, [DSHD]);

    const studentss = async () => {
        let data = await teacherGetDSHD(user);
        setDSHD(data.DT);
    };

    const handleCloseModal = async () => {
        setShowModal(false); // Đóng modal
        setShowFinalEvaluation(false); // Reset hiển thị đánh giá cuối kỳ
        setDanhGia(defaultdanhgia)
    };

    const handleChamHD = (item) => {
        setShowModal(true);
        setModalUser(item);
    };
    const handleOnchangeGK = (value, name) => {
        let _danhgia = _.cloneDeep(danhgia)
        _danhgia[name] = value
        setDanhGia(_danhgia)
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
                                        <td></td>
                                        <td></td>
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
                            <select value={danhgia.danhgiagiuaky} onChange={(event) => handleOnchangeGK(event.target.value, 'danhgiagiuaky')} className="form-select">
                                <option value={''}>---</option>
                                <option value={'true'}>True</option>
                                <option value={'false'}>False</option>
                            </select>
                        </div>
                        <div className="col-sm-2"></div>
                    </div>
                    <div>
                        <hr />
                    </div>

                    {/* Nút toggle "Đánh giá cuối kỳ" */}
                    <div className="row mt-3">
                        <div className="col-sm-6">
                            <button
                                className="btn btn-link text-decoration-none"
                                onClick={() =>
                                    setShowFinalEvaluation(!showFinalEvaluation)
                                }
                            >
                                <b>Đánh giá cuối kỳ</b>{" "}
                                {showFinalEvaluation ? "▲" : "▼"}
                            </button>
                        </div>
                    </div>

                    {/* Phần đánh giá cuối kỳ */}
                    {showFinalEvaluation && (
                        danhgia.danhgiagiuaky == 'true' ?
                            <>
                            <div className="row">
                                <div className="col-sm-6"></div> 
                                <div className="col-sm-3 "><i> Điểm hướng dẫn</i></div>
                                <input className="col-sm-2 " type="text"/>
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
                                                        <select className="form-select">
                                                            <option>----</option>
                                                            <option>1</option>
                                                            <option>2</option>
                                                            <option>3</option>
                                                            <option>4</option>
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
                                   <textarea className="col-sm-9"></textarea></div>
                                
                            </> 
                            
                            : (danhgia.danhgiagiuaky == 'false' ? <i className="text-danger">Giữa kì không đạt</i> : <i>Bạn chưa đánh giá giữa kì</i>)
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Đóng
                    </Button>
                    <Button variant="primary">Xác nhận</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default TeacherChamHD;
