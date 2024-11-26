import { test, headFetchListTeacher, AssignPB1and2, } from '../../services/HeadService';
import { useEffect, useState, forwardRef, useRef, useImperativeHandle } from "react";
import { fetchAllProjectRegister, getResults } from '../../services/studentService'
import { Modal, Button } from "react-bootstrap";
import React from 'react';
import { UserContext } from '../../context/userContext';
import './Results.scss'
import { add } from "lodash";
import { toast } from "react-toastify";

const Results = () => {
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
    const [lisProjectRegister, setListProjectRegister] = useState(defautlisProjectRegister)
    const [results, setResults] = useState()
    const [listTeacher, setListTeacher] = useState([])
    useEffect(() => {
        addd(user)
        Allresults()
        getlistTeacher()
        //  console.log(lisProjectRegister)
    }, []) 
    const getlistTeacher = async()=>{
        let data = await headFetchListTeacher()
        if(data.EC == 0){
            setListTeacher(data.DT)
        }else{
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
        let data = await getResults(user)
        if (data.EC == 0) {
            setResults(data.DT)
        } else {
            toast.error(data.EM)
        }

    }
    const handleCloseModal = async () => {
        setShowModal(false); // Đóng modal
    };
    const handleXemChiTiet = () => {
        setShowModal(true); // Đóng modal
    }
    const handleXemChiTietTBPB = () => {
        setShowModalTBPB(true); // Đóng modal
    }
    const handleCloseModalTBPB = async () => {
        setShowModalTBPB(false); // Đóng modal
    };
    return (
        <>
            <div className="container">
                <table className="table table-bordered text-center table-hover mt-5">
                    <thead>
                        <tr>
                            <th scope="col" style={{ width: "5%" }}>ID</th>
                            <th scope="col" style={{ width: "15%" }}>TÊN ĐỀ TÀI</th>
                            <th scope="col" style={{ width: "25%" }}>MÔ TẢ</th>
                            <th scope="col" style={{ width: "15%" }}>YÊU CẦU</th>
                            <th scope="col" style={{ width: "20%" }}>KIẾN THỨC</th>
                            <th scope="col" style={{ width: "10%" }}>GVHD</th>
                            {/* // <th scope="col" style={{ width: "10%" }}>Status</th> */}

                        </tr>

                    </thead>
                    <tbody>
                        {lisProjectRegister && lisProjectRegister.id != null ?
                            <>
                                <tr>
                                    <td>{lisProjectRegister.id}</td>
                                    <td>{lisProjectRegister.name}</td>
                                    <td>{lisProjectRegister.description}</td>
                                    <td>{lisProjectRegister.require}</td>
                                    <td>{lisProjectRegister.knowledgeSkills}</td>
                                    <td>{lisProjectRegister.instuctor}</td>



                                </tr>
                            </>
                            : <tr>
                                <td colSpan={6}> <i>Bạn chưa đăng kí đề tài</i></td>
                            </tr>
                        }
                    </tbody>
                </table>
                <div className="results mt-5">
                    <table className="table table-bordered text-center table-hover mt-3">
                        <thead>
                            {
                              
                                <tr>
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
                            {results && results.Result &&
                                <tr>

                                    <td>{results.Result.danhgiacuoiky == 'false' || results.Result.danhgiagiuaky == 'false' ? <i className="text-danger">Không đạt</i> : <><b>{results.Result.diemGVHD} </b><br></br> {results.Result.diemGVHD && <i onClick={() => handleXemChiTiet()} className="text-primary xemchitiet">Xem chi tiết</i>}</> }  </td>
                                    <td>
                                        
                                        {results.Result.diemGVPB1} <br></br>
                                        {listTeacher && 
                                        listTeacher.filter(item => item.id == results.pb1)
                                        .map((itemmap, index) => ( 
                                            <i> {itemmap.name} </i>
                                          ))}
                                        </td>
                                    <td>
                                   
                                    {results.Result.diemGVPB2}  <br></br>
                                    {listTeacher && 
                                        listTeacher.filter(item => item.id == results.pb2)
                                        .map((itemmap, index) => ( 
                                            <i> {itemmap.name} </i>
                                          ))} </td>
                                    <td><b>{results.Result.trungbinhphanbien}</b> <br></br> {results.Result.trungbinhphanbien && <i onClick={() => handleXemChiTietTBPB()} className="text-primary xemchitiet">Xem chi tiết</i>}</td>
                                    <td>{results.Result.diemCTHD}</td>
                                    <td>{results.Result.diemTK}</td>
                                    <td >{results.Result.diemUV}</td>
                                    <td>{results.Result.diemPoster1}</td>
                                    <td>{results.Result.diemPoster2}</td>
                                    <td><b>{results.Result.trungbinhhoidong}</b> <br></br> {results.Result.trungbinhhoidong && <i onClick={() => handleXemChiTiet()} className="text-primary xemchitiet">Xem chi tiết</i>}</td>
                                </tr>

                            }

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
                    <div className="row mt-0">
                        <div className="col-sm-6"></div>
                        <div className="col-sm-3  "><i className="text-danger"> Điểm hướng dẫn</i></div>
                        <input value={results && results.Result && results.Result.diemGVHD} className="col-sm-2 " type="number" />

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
                                        results &&
                                        <>
                                            <tr>
                                                <td>1</td>
                                                <td> Xác định được yêu cầu của khóa luận cần thực hiện</td>
                                                <td>
                                                    <select className="form-select">
                                                        <option >{results && results.Criterion && results.Criterion.LOL1}</option>

                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td>Phân tích yêu cầu nghiệp vụ hiện trạng và mô hình hóa được yêu cầu của đề tài</td>
                                                <td>
                                                    <select className="form-select">
                                                        <option >{results && results.Criterion && results.Criterion.LOL2}</option>

                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>3</td>
                                                <td>Thiết kế một hệ thống thông tin đưa ra giải pháp đáp ứng được yêu cầu của đề tài</td>
                                                <td>
                                                    <select className="form-select">
                                                        <option>{results && results.Criterion && results.Criterion.LOL3}</option>

                                                    </select>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>4</td>
                                                <td>Hiện thực hóa hệ thống thông tin theo thiết kế đã đưa ra/Hiện thực giải pháp đã đưa ra</td>
                                                <td>
                                                    <select className="form-select">
                                                        <option >{results && results.Criterion && results.Criterion.LOL4}</option>

                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>5</td>
                                                <td>Viết được báo cáo khóa luận tốt nghiệp</td>
                                                <td>
                                                    <select className="form-select">
                                                        <option >{results && results.Criterion && results.Criterion.LOL5}</option>

                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>6</td>
                                                <td>Trình bày được các kiến thức nền tảng liên quan đến đề tài khóa luận</td>
                                                <td>
                                                    <select className="form-select">
                                                        <option >{results && results.Criterion && results.Criterion.LOL6}</option>

                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>7</td>
                                                <td>Đánh giá việc thực hiện khóa luận đáp ứng yêu cầu đề tài khóa luận</td>
                                                <td>
                                                    <select className="form-select">
                                                        <option >{results && results.Criterion && results.Criterion.LOL7}</option>

                                                    </select>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>8</td>
                                                <td>Bảo vệ khóa kết quả khóa luận trước giản viên hướng dẫn</td>
                                                <td>
                                                    <select className="form-select">
                                                        <option >{results && results.Criterion && results.Criterion.LOL8}</option>

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
                        <textarea readOnly className="col-sm-9">{results && results.Criterion && results.Criterion.ghichu}</textarea>
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
                        <input value={results  && results.Result && results.Result.diemGVPB1} className="col-sm-2 " type="number" />
                        <div className="col-sm-3  "><i className="text-danger"> Điểm GVPB1 </i></div>
                        <input value={results  && results.Result && results.Result.diemGVPB2} className="col-sm-2 " type="number" />

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
                                        results &&
                                        <>
                                            <tr>
                                                <td>1</td>
                                                <td> Xác định được yêu cầu của khóa luận cần thực hiện</td>
                                                <td>
                                                    <select className="form-select">
                                                        <option >{results.Criteriapb && results.Criteriapb.LOL1}</option>

                                                    </select>
                                                </td>
                                                <td>
                                                    <select className="form-select">
                                                        <option>{results.Criteriapb && results.Criteriapb.LOL1PB2}</option>

                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td>Phân tích yêu cầu nghiệp vụ hiện trạng và mô hình hóa được yêu cầu của đề tài</td>
                                                <td>
                                                    <select className="form-select">
                                                        <option >{results.Criteriapb && results.Criteriapb.LOL2}</option>

                                                    </select>
                                                </td>
                                                <td>
                                                    <select className="form-select">
                                                        <option>{results.Criteriapb && results.Criteriapb.LOL2PB2}</option>

                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>3</td>
                                                <td>Thiết kế một hệ thống thông tin đưa ra giải pháp đáp ứng được yêu cầu của đề tài</td>
                                                <td>
                                                    <select className="form-select">
                                                        <option>{results.Criteriapb && results.Criteriapb.LOL3}</option>

                                                    </select>
                                                </td>
                                                <td>
                                                    <select className="form-select">
                                                        <option>{results.Criteriapb && results.Criteriapb.LOL3PB2}</option>

                                                    </select>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>4</td>
                                                <td>Hiện thực hóa hệ thống thông tin theo thiết kế đã đưa ra/Hiện thực giải pháp đã đưa ra</td>
                                                <td>
                                                    <select className="form-select">
                                                        <option >{results.Criteriapb && results.Criteriapb.LOL4}</option>

                                                    </select>
                                                </td>
                                                <td>
                                                    <select className="form-select">
                                                        <option>{results.Criteriapb && results.Criteriapb.LOL4PB2}</option>

                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>5</td>
                                                <td>Viết được báo cáo khóa luận tốt nghiệp</td>
                                                <td>
                                                    <select className="form-select">
                                                        <option >{results.Criteriapb && results.Criteriapb.LOL5}</option>

                                                    </select>
                                                </td>
                                                <td>
                                                    <select className="form-select">
                                                        <option>{results.Criteriapb && results.Criteriapb.LOL5PB2}</option>

                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>6</td>
                                                <td>Trình bày được các kiến thức nền tảng liên quan đến đề tài khóa luận</td>
                                                <td>
                                                    <select className="form-select">
                                                        <option >{results.Criteriapb && results.Criteriapb.LOL6}</option>

                                                    </select>
                                                </td>
                                                <td>
                                                    <select className="form-select">
                                                        <option>{results.Criteriapb && results.Criteriapb.LOL6PB2}</option>

                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>7</td>
                                                <td>Đánh giá việc thực hiện khóa luận đáp ứng yêu cầu đề tài khóa luận</td>
                                                <td>
                                                    <select className="form-select">
                                                        <option >{results.Criteriapb && results.Criteriapb.LOL7}</option>

                                                    </select>
                                                </td>
                                                <td>
                                                    <select className="form-select">
                                                        <option>{results.Criteriapb && results.Criteriapb.LOL7PB2}</option>

                                                    </select>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>8</td>
                                                <td>Bảo vệ khóa kết quả khóa luận trước giản viên phản biện</td>
                                                <td>
                                                    <select className="form-select">
                                                        <option >{results.Criteriapb && results.Criteriapb.LOL8}</option>

                                                    </select>
                                                </td>
                                                <td>
                                                    <select className="form-select">
                                                        <option>{results.Criteriapb && results.Criteriapb.LOL8PB2}</option>

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
                        <textarea readOnly className="col-sm-4">{results && results.Criteriapb && results.Criteriapb.ghichu}</textarea>

                        <div className="col-sm-2"><i className="text-primary">Nhận xét PB2</i></div>
                        <textarea readOnly className="col-sm-4">{results && results.Criteriapb && results.Criteriapb.ghichuPB2}</textarea>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModalTBPB}>
                        Đóng
                    </Button>



                </Modal.Footer>
            </Modal>
        </>
    )
}
export default Results 