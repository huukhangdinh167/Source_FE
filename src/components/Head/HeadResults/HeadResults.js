import { test, headFetchListTeacher, AssignPB1and2, } from '../../../services/HeadService';
import { useEffect, useState, forwardRef, useRef, useImperativeHandle } from "react";
import { fetchAllProjectRegister, getResults } from '../../../services/studentService'
import { GetAllResults, headGetResultEveryStudent } from '../../../services/HeadService'
import { Modal, Button } from "react-bootstrap";
import React from 'react';
import { UserContext } from '../../../context/userContext';
import './HeadResults.scss'
import { add } from "lodash";
import { toast } from "react-toastify";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import autoTable from 'jspdf-autotable';
import '../../../font/times-normal';
import '../../../font/timesbd-normal';
import '../../../font/timesbi-normal';
import '../../../font/timesi-normal';
const HeadResults = () => {
    const { user } = React.useContext(UserContext);
    const defautlisProjectRegister = {
        Project: true,
        id: '',
        name: '',
        description: '',
        require: '',
        knowledgeSkills: '',
        instuctor: '',
    }
    const [showModal, setShowModal] = useState(false);
    const [showModalTBPB, setShowModalTBPB] = useState(false);
    const [showModalTBHoiDong, setShowModalTBHoiDong] = useState(false);
    const [lisProjectRegister, setListProjectRegister] = useState(defautlisProjectRegister)
    const [results, setResults] = useState([])
    const [resultseveryStudent, setResultseveryStudent] = useState({})
    const [listTeacher, setListTeacher] = useState([])
    useEffect(() => {
        addd(user)
        Allresults()
        getlistTeacher()
        //  console.log(lisProjectRegister)
    }, [])
    const getlistTeacher = async () => {
        let data = await headFetchListTeacher()
        if (data.EC == 0) {
            setListTeacher(data.DT)
        } else {
            toast.error("Can't get list teacher")
        }
    }
    const addd = async (user) => {
        let data = await fetchAllProjectRegister(user)
        if (data && +data.EC === 0) {
            let dataDT = data.DT
            setListProjectRegister({ ...dataDT, Project: false })
        }
    }
    const Allresults = async () => {
        let data = await GetAllResults(user)
        if (data.EC == 0) {
            setResults(data.DT)
        } else {
            toast.error(data.EM)
        }

    }
    const handleCloseModal = async () => {
        setShowModal(false); // Đóng modal
    };
    const handleXemChiTiet = async (itemm) => {
        let data = await headGetResultEveryStudent(itemm)
        if (data.EC == 0) {
            setResultseveryStudent(data.DT)
        }
        setShowModal(true); // Đóng modal
    }
    const handleXemChiTietTBPB = async (itemm) => {
        let data = await headGetResultEveryStudent(itemm)
        if (data.EC == 0) {
            setResultseveryStudent(data.DT)
        }
        setShowModalTBPB(true); // Đóng modal
    }

    const handleXemChiTietTBHoiDong = async (itemm) => {
        let data = await headGetResultEveryStudent(itemm)
        if (data.EC == 0) {
            setResultseveryStudent(data.DT)
        }
        setShowModalTBHoiDong(true); // Đóng modal
    }
    const handleCloseModalTBPB = async () => {
        setShowModalTBPB(false); // Đóng modal
    };
    const handleCloseModalTBHoiDong = async () => {
        setShowModalTBHoiDong(false); // Đóng modal
    };
    //import jsPDF from 'jspdf';

    //import jsPDF from 'jspdf';

    const exportToPDF = (instuctor, projectName) => {
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

        pdf.text(`Họ tên người đánh giá: ${instuctor}`, 15, 60);
        pdf.text('Vai trò của người đánh giá: Giảng viên hướng dẫn', 15, 65);
        pdf.text(`Tên đề tài: ${projectName}`, 15, 75);

        pdf.text('Họ tên sinh viên 1: ', 15, 80);
        pdf.text('Mã số sinh viên: ', 120, 80);

        pdf.text('Họ tên sinh viên 2: ', 15, 85);
        pdf.text('Mã số sinh viên: ', 120, 85);

        const headers = [['STT', 'LOL', 'Sinh viên 1', 'Sinh viên 2',]];
        const data = [
            [1, 'Xác định được yêu cầu của khóa luận cần thực hiệnv', '8.5', 7.0],
            [2, 'Phân tích yêu cầu nghiệp vụ hiện trạng và mô hình hóa được yêu cầu của đề tài', 9.0, 8.5],
            [3, 'Thiết kế một hệ thống thông tin đưa ra giải pháp đáp ứng được yêu cầu của đề tài', 7.5, 6.0],
            [4, 'Hiện thực hóa hệ thống thông tin theo thiết kế đã đưa ra/Hiện thực giải pháp đã đưa ra', 8.5, 7.0],
            [5, 'Viết được báo cáo khóa luận tốt nghiệp', 9.0, 8.5],
            [6, 'Trình bày được các kiến thức nền tảng liên quan đến đề tài khóa luận', 7.5, 6.0],
            [7, 'Đánh giá việc thực hiện khóa luận đáp ứng yêu cầu đề tài khóa luận', 9.0, 8.5],
            [8, 'Bảo vệ khóa kết quả khóa luận trước giản viên hướng dẫn', 7.5, 6.0,],

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

        pdf.text('TP.HCM, ngày    tháng    năm', 120, 215);
        pdf.text('Người đánh giá', 130, 220);
        pdf.text('(Ký và ghi rõ họ tên)', 125, 225);
        pdf.text(`${instuctor}`, 125, 250);

        pdf.save('example.pdf');
    };

    return (
        <>
            <div className="container">

                <div className="results mt-5">
                    <table className="table table-bordered text-center table-hover mt-3">
                        <thead>
                            {

                                <tr>
                                    <th scope="col" style={{ width: "10%" }}>ID</th>
                                    <th scope="col" style={{ width: "10%" }}>Name</th>
                                    <th scope="col" style={{ width: "10%" }}>GVHD</th>
                                    <th scope="col" style={{ width: "10%" }}>GVPB1</th>
                                    <th scope="col" style={{ width: "10%" }}>GVPB2</th>
                                    <th scope="col" style={{ width: "10%" }}>Trung Bình PB</th>
                                    <th scope="col" style={{ width: "10%" }}>CTHD</th>
                                    <th scope="col" style={{ width: "10%" }}>TK</th>
                                    <th scope="col" style={{ width: "10%" }}>UY</th>
                                    <th scope="col" style={{ width: "10%" }}>Poster1</th>
                                    <th scope="col" style={{ width: "10%" }}>Poster2</th>
                                    <th scope="col" style={{ width: "10%" }}>Trung Bình hội đồng</th>
                                </tr>
                            }

                        </thead>
                        <tbody>
                            {results && results.map((itemm, index) => (
                                <tr key={`row-${index}`}>
                                    <td>{itemm.id}</td>
                                    <td>{itemm.name}</td>

                                    <td>{(itemm.Result && itemm.Result.danhgiacuoiky == 'false') || (itemm.Result && itemm.Result.danhgiagiuaky) == 'false' ? <i className="text-danger">Không đạt</i> : <><b>{itemm.Result && itemm.Result.diemGVHD} </b><br></br> {itemm.Result && itemm.Result.diemGVHD && <i onClick={() => handleXemChiTiet(itemm)} className="text-primary xemchitiet">Xem chi tiết</i>}</>}  </td>
                                    <td>

                                        {itemm.Result && itemm.Result.diemGVPB1} <br></br>
                                        {listTeacher &&
                                            listTeacher.filter(item => item.id == itemm.pb1)
                                                .map((itemmap, index) => (
                                                    <i> {itemmap.name} </i>
                                                ))}
                                    </td>
                                    <td>

                                        {itemm.Result && itemm.Result.diemGVPB2}  <br></br>
                                        {listTeacher &&
                                            listTeacher.filter(item => item.id == itemm.pb2)
                                                .map((itemmap, index) => (
                                                    <i> {itemmap.name} </i>
                                                ))} </td>
                                    <td><b>{itemm.Result && itemm.Result.trungbinhphanbien}</b> <br></br> {itemm.Result && itemm.Result.trungbinhphanbien && <i onClick={() => handleXemChiTietTBPB(itemm)} className="text-primary xemchitiet">Xem chi tiết</i>}</td>
                                    <td>{itemm.Result && itemm.Result.diemCTHD}
                                        <br></br>
                                        {listTeacher &&
                                            listTeacher.filter(item => item.id == itemm.CTHD)
                                                .map((itemmap, index) => (
                                                    <i> {itemmap.name} </i>
                                                ))}
                                    </td>
                                    <td>{itemm.Result && itemm.Result.diemTK}
                                        <br></br>
                                        {listTeacher &&
                                            listTeacher.filter(item => item.id == itemm.TK)
                                                .map((itemmap, index) => (
                                                    <i> {itemmap.name} </i>
                                                ))}
                                    </td>
                                    <td >{itemm.Result && itemm.Result.diemUV}
                                        <br></br>
                                        {listTeacher &&
                                            listTeacher.filter(item => item.id == itemm.UV)
                                                .map((itemmap, index) => (
                                                    <i> {itemmap.name} </i>
                                                ))}
                                    </td>
                                    <td>{itemm.Result && itemm.Result.diemPoster1}
                                        <br></br>
                                        {listTeacher &&
                                            listTeacher.filter(item => item.id == itemm.Poster1)
                                                .map((itemmap, index) => (
                                                    <i> {itemmap.name} </i>
                                                ))}
                                    </td>
                                    <td>{itemm.Result && itemm.Result.diemPoster2}
                                        <br></br>
                                        {listTeacher &&
                                            listTeacher.filter(item => item.id == itemm.Poster2)
                                                .map((itemmap, index) => (
                                                    <i> {itemmap.name} </i>
                                                ))}
                                    </td>
                                    <td><b>{itemm.Result && itemm.Result.trungbinhhoidong}</b> <br></br> {itemm.Result && itemm.Result.trungbinhhoidong && <i onClick={() => handleXemChiTietTBHoiDong(itemm)} className="text-primary xemchitiet">Xem chi tiết</i>}</td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>
            <Modal
                className="text-center"
                size="lg"
                show={showModal}
                onHide={handleCloseModal}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title className="modal-title-center">
                        Kết quả đánh giá

                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='col-sm-4 text-primary' onClick={() =>exportToPDF(resultseveryStudent.Project.instuctor,resultseveryStudent.Project.name,)}>
                        in phiếu đánh giá
                    </div>

                    <div className="row mt-0">
                        <div className="col-sm-6"></div>
                        <div className="col-sm-3  "><i className="text-danger"> Điểm hướng dẫn</i></div>
                        <input value={resultseveryStudent && resultseveryStudent.Result && resultseveryStudent.Result.diemGVHD} className="col-sm-2 " type="number" />

                    </div>
                    <div className="row">
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
                                    {
                                        resultseveryStudent &&
                                        <>
                                            <tr>
                                                <td>1</td>
                                                <td> Xác định được yêu cầu của khóa luận cần thực hiện</td>
                                                <td>
                                                    <select className="form-select">
                                                        <option >{resultseveryStudent && resultseveryStudent.Criterion && resultseveryStudent.Criterion.LOL1}</option>

                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td>Phân tích yêu cầu nghiệp vụ hiện trạng và mô hình hóa được yêu cầu của đề tài</td>
                                                <td>
                                                    <select className="form-select">
                                                        <option >{resultseveryStudent && resultseveryStudent.Criterion && resultseveryStudent.Criterion.LOL2}</option>

                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>3</td>
                                                <td>Thiết kế một hệ thống thông tin đưa ra giải pháp đáp ứng được yêu cầu của đề tài</td>
                                                <td>
                                                    <select className="form-select">
                                                        <option>{resultseveryStudent && resultseveryStudent.Criterion && resultseveryStudent.Criterion.LOL3}</option>

                                                    </select>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>4</td>
                                                <td>Hiện thực hóa hệ thống thông tin theo thiết kế đã đưa ra/Hiện thực giải pháp đã đưa ra</td>
                                                <td>
                                                    <select className="form-select">
                                                        <option >{resultseveryStudent && resultseveryStudent.Criterion && resultseveryStudent.Criterion.LOL4}</option>

                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>5</td>
                                                <td>Viết được báo cáo khóa luận tốt nghiệp</td>
                                                <td>
                                                    <select className="form-select">
                                                        <option >{resultseveryStudent && resultseveryStudent.Criterion && resultseveryStudent.Criterion.LOL5}</option>

                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>6</td>
                                                <td>Trình bày được các kiến thức nền tảng liên quan đến đề tài khóa luận</td>
                                                <td>
                                                    <select className="form-select">
                                                        <option >{resultseveryStudent && resultseveryStudent.Criterion && resultseveryStudent.Criterion.LOL6}</option>

                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>7</td>
                                                <td>Đánh giá việc thực hiện khóa luận đáp ứng yêu cầu đề tài khóa luận</td>
                                                <td>
                                                    <select className="form-select">
                                                        <option >{resultseveryStudent && resultseveryStudent.Criterion && resultseveryStudent.Criterion.LOL7}</option>

                                                    </select>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>8</td>
                                                <td>Bảo vệ khóa kết quả khóa luận trước giản viên hướng dẫn</td>
                                                <td>
                                                    <select className="form-select">
                                                        <option >{resultseveryStudent && resultseveryStudent.Criterion && resultseveryStudent.Criterion.LOL8}</option>

                                                    </select>
                                                </td>
                                            </tr>
                                        </>
                                    }

                                </tbody>
                            </table>

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-2"><i className="text-primary">Nhận xét</i></div>
                        <textarea readOnly className="col-sm-9">{resultseveryStudent && resultseveryStudent.Criterion && resultseveryStudent.Criterion.ghichu}</textarea>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Đóng
                    </Button>



                </Modal.Footer>
            </Modal>


            <Modal
                className="text-center"
                size="lg"
                show={showModalTBPB}
                onHide={handleCloseModalTBPB}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title className="modal-title-center">
                        Kết quả đánh giá phản biện
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row mt-0">
                        <div className="col-sm-1"></div>
                        <div className="col-sm-3  "><i className="text-danger"> Điểm GVPB1 </i></div>
                        <input value={resultseveryStudent && resultseveryStudent.Result && resultseveryStudent.Result.diemGVPB1} className="col-sm-2 " type="number" />
                        <div className="col-sm-3  "><i className="text-danger"> Điểm GVPB1 </i></div>
                        <input value={resultseveryStudent && resultseveryStudent.Result && resultseveryStudent.Result.diemGVPB2} className="col-sm-2 " type="number" />

                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th style={{ width: "8%" }}>STT</th>
                                        <th style={{ width: "52%" }}>
                                            Tiêu chí
                                        </th>
                                        <th style={{ width: "20%" }}>
                                            PB1
                                        </th>
                                        <th style={{ width: "20%" }}>
                                            PB2
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        resultseveryStudent &&
                                        <>
                                            <tr>
                                                <td>1</td>
                                                <td> Xác định được yêu cầu của khóa luận cần thực hiện</td>
                                                <td>
                                                    <select className="form-select">
                                                        <option >{resultseveryStudent.Criteriapb && resultseveryStudent.Criteriapb.LOL1}</option>

                                                    </select>
                                                </td>
                                                <td>
                                                    <select className="form-select">
                                                        <option>{resultseveryStudent.Criteriapb && resultseveryStudent.Criteriapb.LOL1PB2}</option>

                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td>Phân tích yêu cầu nghiệp vụ hiện trạng và mô hình hóa được yêu cầu của đề tài</td>
                                                <td>
                                                    <select className="form-select">
                                                        <option >{resultseveryStudent.Criteriapb && resultseveryStudent.Criteriapb.LOL2}</option>

                                                    </select>
                                                </td>
                                                <td>
                                                    <select className="form-select">
                                                        <option>{resultseveryStudent.Criteriapb && resultseveryStudent.Criteriapb.LOL2PB2}</option>

                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>3</td>
                                                <td>Thiết kế một hệ thống thông tin đưa ra giải pháp đáp ứng được yêu cầu của đề tài</td>
                                                <td>
                                                    <select className="form-select">
                                                        <option>{resultseveryStudent.Criteriapb && resultseveryStudent.Criteriapb.LOL3}</option>

                                                    </select>
                                                </td>
                                                <td>
                                                    <select className="form-select">
                                                        <option>{resultseveryStudent.Criteriapb && resultseveryStudent.Criteriapb.LOL3PB2}</option>

                                                    </select>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>4</td>
                                                <td>Hiện thực hóa hệ thống thông tin theo thiết kế đã đưa ra/Hiện thực giải pháp đã đưa ra</td>
                                                <td>
                                                    <select className="form-select">
                                                        <option >{resultseveryStudent.Criteriapb && resultseveryStudent.Criteriapb.LOL4}</option>

                                                    </select>
                                                </td>
                                                <td>
                                                    <select className="form-select">
                                                        <option>{resultseveryStudent.Criteriapb && resultseveryStudent.Criteriapb.LOL4PB2}</option>

                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>5</td>
                                                <td>Viết được báo cáo khóa luận tốt nghiệp</td>
                                                <td>
                                                    <select className="form-select">
                                                        <option >{resultseveryStudent.Criteriapb && resultseveryStudent.Criteriapb.LOL5}</option>

                                                    </select>
                                                </td>
                                                <td>
                                                    <select className="form-select">
                                                        <option>{resultseveryStudent.Criteriapb && resultseveryStudent.Criteriapb.LOL5PB2}</option>

                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>6</td>
                                                <td>Trình bày được các kiến thức nền tảng liên quan đến đề tài khóa luận</td>
                                                <td>
                                                    <select className="form-select">
                                                        <option >{resultseveryStudent.Criteriapb && resultseveryStudent.Criteriapb.LOL6}</option>

                                                    </select>
                                                </td>
                                                <td>
                                                    <select className="form-select">
                                                        <option>{resultseveryStudent.Criteriapb && resultseveryStudent.Criteriapb.LOL6PB2}</option>

                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>7</td>
                                                <td>Đánh giá việc thực hiện khóa luận đáp ứng yêu cầu đề tài khóa luận</td>
                                                <td>
                                                    <select className="form-select">
                                                        <option >{resultseveryStudent.Criteriapb && resultseveryStudent.Criteriapb.LOL7}</option>

                                                    </select>
                                                </td>
                                                <td>
                                                    <select className="form-select">
                                                        <option>{resultseveryStudent.Criteriapb && resultseveryStudent.Criteriapb.LOL7PB2}</option>

                                                    </select>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>8</td>
                                                <td>Bảo vệ khóa kết quả khóa luận trước giản viên phản biện</td>
                                                <td>
                                                    <select className="form-select">
                                                        <option >{resultseveryStudent.Criteriapb && resultseveryStudent.Criteriapb.LOL8}</option>

                                                    </select>
                                                </td>
                                                <td>
                                                    <select className="form-select">
                                                        <option>{resultseveryStudent.Criteriapb && resultseveryStudent.Criteriapb.LOL8PB2}</option>

                                                    </select>
                                                </td>
                                            </tr>
                                        </>
                                    }

                                </tbody>
                            </table>

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-2"><i className="text-primary">Nhận xét PB1</i></div>
                        <textarea readOnly className="col-sm-4">{resultseveryStudent && resultseveryStudent.Criteriapb && resultseveryStudent.Criteriapb.ghichu}</textarea>

                        <div className="col-sm-2"><i className="text-primary">Nhận xét PB2</i></div>
                        <textarea readOnly className="col-sm-4">{resultseveryStudent && resultseveryStudent.Criteriapb && resultseveryStudent.Criteriapb.ghichuPB2}</textarea>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModalTBPB}>
                        Đóng
                    </Button>



                </Modal.Footer>
            </Modal>

            <Modal
                className="text-center"
                size="lg"
                show={showModalTBHoiDong}
                onHide={handleCloseModalTBHoiDong}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title className="modal-title-center">
                        Kết quả đánh giá Hội Đồng
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        resultseveryStudent && resultseveryStudent.Result && resultseveryStudent.Result.diemPoster2 &&
                        <div className="row mt-0">
                            <div className="col-sm-1"></div>
                            <div className="col-sm-3  "><i className="text-danger"> Điểm Poster1 </i></div>
                            <input value={resultseveryStudent && resultseveryStudent.Result && resultseveryStudent.Result.diemPoster1} className="col-sm-2 " type="number" />
                            <div className="col-sm-3  "><i className="text-danger"> Điểm Poster2 </i></div>
                            <input value={resultseveryStudent && resultseveryStudent.Result && resultseveryStudent.Result.diemPoster2} className="col-sm-2 " type="number" />
                        </div>
                    }

                    <div className="row">
                        <div className="col-sm-12">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th style={{ width: "8%" }}>STT</th>
                                        <th style={{ width: "52%" }}>
                                            Tiêu chí
                                        </th>
                                        <th style={{ width: "20%" }}>
                                            PB1
                                        </th>
                                        <th style={{ width: "20%" }}>
                                            PB2
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        resultseveryStudent &&
                                        <>
                                            <tr>
                                                <td>1</td>
                                                <td> Xác định được yêu cầu của khóa luận cần thực hiện</td>
                                                <td>
                                                    <select className="form-select">
                                                        <option >{resultseveryStudent.Criteriahoidong && resultseveryStudent.Criteriahoidong.LOL1Poster1}</option>

                                                    </select>
                                                </td>
                                                <td>
                                                    <select className="form-select">
                                                        <option>{resultseveryStudent.Criteriahoidong && resultseveryStudent.Criteriahoidong.LOL1Poster2}</option>

                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td>Phân tích yêu cầu nghiệp vụ hiện trạng và mô hình hóa được yêu cầu của đề tài</td>
                                                <td>
                                                    <select className="form-select">
                                                        <option >{resultseveryStudent.Criteriahoidong && resultseveryStudent.Criteriahoidong.LOL2Poster1}</option>

                                                    </select>
                                                </td>
                                                <td>
                                                    <select className="form-select">
                                                        <option>{resultseveryStudent.Criteriahoidong && resultseveryStudent.Criteriahoidong.LOL2Poster2}</option>

                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>3</td>
                                                <td>Thiết kế một hệ thống thông tin đưa ra giải pháp đáp ứng được yêu cầu của đề tài</td>
                                                <td>
                                                    <select className="form-select">
                                                        <option>{resultseveryStudent.Criteriahoidong && resultseveryStudent.Criteriahoidong.LOL3Poster1}</option>

                                                    </select>
                                                </td>
                                                <td>
                                                    <select className="form-select">
                                                        <option>{resultseveryStudent.Criteriahoidong && resultseveryStudent.Criteriahoidong.LOL3Poster2}</option>

                                                    </select>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>4</td>
                                                <td>Hiện thực hóa hệ thống thông tin theo thiết kế đã đưa ra/Hiện thực giải pháp đã đưa ra</td>
                                                <td>
                                                    <select className="form-select">
                                                        <option >{resultseveryStudent.Criteriahoidong && resultseveryStudent.Criteriahoidong.LOL4Poster1}</option>

                                                    </select>
                                                </td>
                                                <td>
                                                    <select className="form-select">
                                                        <option>{resultseveryStudent.Criteriahoidong && resultseveryStudent.Criteriahoidong.LOL4Poster2}</option>

                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>5</td>
                                                <td>Viết được báo cáo khóa luận tốt nghiệp</td>
                                                <td>
                                                    <select className="form-select">
                                                        <option >{resultseveryStudent.Criteriahoidong && resultseveryStudent.Criteriahoidong.LOL5Poster1}</option>

                                                    </select>
                                                </td>
                                                <td>
                                                    <select className="form-select">
                                                        <option>{resultseveryStudent.Criteriahoidong && resultseveryStudent.Criteriahoidong.LOL5Poster2}</option>

                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>6</td>
                                                <td>Trình bày được các kiến thức nền tảng liên quan đến đề tài khóa luận</td>
                                                <td>
                                                    <select className="form-select">
                                                        <option >{resultseveryStudent.Criteriahoidong && resultseveryStudent.Criteriahoidong.LOL6Poster1}</option>

                                                    </select>
                                                </td>
                                                <td>
                                                    <select className="form-select">
                                                        <option>{resultseveryStudent.Criteriahoidong && resultseveryStudent.Criteriahoidong.LOL6Poster2}</option>

                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>7</td>
                                                <td>Đánh giá việc thực hiện khóa luận đáp ứng yêu cầu đề tài khóa luận</td>
                                                <td>
                                                    <select className="form-select">
                                                        <option >{resultseveryStudent.Criteriahoidong && resultseveryStudent.Criteriahoidong.LOL7Poster1}</option>

                                                    </select>
                                                </td>
                                                <td>
                                                    <select className="form-select">
                                                        <option>{resultseveryStudent.Criteriahoidong && resultseveryStudent.Criteriahoidong.LOL7Poster2}</option>

                                                    </select>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>8</td>
                                                <td>Bảo vệ khóa kết quả khóa luận trước Hội Đồng</td>
                                                <td>
                                                    <select className="form-select">
                                                        <option >{resultseveryStudent.Criteriahoidong && resultseveryStudent.Criteriahoidong.LOL8Poster1}</option>

                                                    </select>
                                                </td>
                                                <td>
                                                    <select className="form-select">
                                                        <option>{resultseveryStudent.Criteriahoidong && resultseveryStudent.Criteriahoidong.LOL8Poster2}</option>

                                                    </select>
                                                </td>
                                            </tr>
                                        </>
                                    }

                                </tbody>
                            </table>

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-2"><i className="text-primary">Nhận xét PB1</i></div>
                        <textarea readOnly className="col-sm-4">{resultseveryStudent && resultseveryStudent.Criteriahoidong && resultseveryStudent.Criteriahoidong.ghichuPoster1}</textarea>

                        <div className="col-sm-2"><i className="text-primary">Nhận xét PB2</i></div>
                        <textarea readOnly className="col-sm-4">{resultseveryStudent && resultseveryStudent.Criteriahoidong && resultseveryStudent.Criteriahoidong.ghichuPoster2}</textarea>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModalTBHoiDong}>
                        Đóng
                    </Button>



                </Modal.Footer>
            </Modal>
        </>
    )
}
export default HeadResults 