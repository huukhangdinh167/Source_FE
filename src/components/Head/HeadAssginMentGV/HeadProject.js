import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap"; // Import modal từ React Bootstrap
import swal from 'sweetalert';
import './Project.scss';
import { test, headFetchListTeacher, AssignPB1and2 } from '../../../services/HeadService';
import _, { cloneDeep, values } from "lodash";
import { toast } from "react-toastify";
const HeadAssignGV = (props) => {
    const [students, setData] = useState([]);
    const [showModal, setShowModal] = useState(false); // Trạng thái hiển thị modal
    const [selectedStudent, setSelectedStudent] = useState(null); // Lưu thông tin sinh viên được chọn
    const [listtecher, setListTeacher] = useState()
    const [dataModal, setDataModal] = useState({})
    const defaultPB = {
        pb1: '',
        pb2: '',
        groupStudent: ''
    }
    const [PB, setPB] = useState(defaultPB)
    useEffect(() => {
        studentss();
    }, []); 

    useEffect(() => {
        setPB(dataModal)
    }, [dataModal]);

    const studentss = async () => {
        let data = await test();
        setData(data.DT);
        let list = await headFetchListTeacher()
        setListTeacher(list.DT)
    };

    const handleAssign = (item) => {
        setSelectedStudent(item); // Lưu sinh viên được chọn vào state
        setShowModal(true); // Hiển thị modal
        setDataModal(item)
       
    };

    const handleCloseModal = async () => {
        setShowModal(false); // Đóng modal
      //  setPB({ ...defaultPB })
    };

    const handleConfirmAssign = async () => {
        if (!PB.pb1) {
            toast.error("Bạn chưa chọn GVPB1")
            return
        }
        if (!PB.pb2) {
            toast.error("Bạn chưa chọn GVPB2")
            return
        }
        if (PB.pb1 === PB.pb2) {
            toast.error("PB1 và PB2 không được trùng ")
            return
        }
        let data = await AssignPB1and2({ PB, selectedStudent })
        if (data.EC === 0) {
            toast.success(data.EM)
           
            studentss()
        }
        setShowModal(false); 
        
    };

    const handleOnchange = (value, name) => {
        let _PB = _.cloneDeep(PB)
        _PB[name] = value
        setPB(_PB)
    }

    const renderedGroups = new Map(); // Theo dõi nhóm đã xử lý

    return (
        <>
            <div className='container'>
                <table className="table text-center table-bordered table-hover mt-5">
                    <thead>
                        <tr>
                            <th style={{ width: "5%" }}>Ma So</th>
                            <th>Tên</th>
                            <th>Tên Đề Tài</th>
                            <th>GVHD</th>
                            <th>Nhóm</th>
                            <th>GV Phản Biện</th>
                            <th>Phân công</th>
                            <th style={{ width: "7%" }}>Bộ môn</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((item, index) => {
                            const isGroupNull = item.groupStudent === null || item.groupStudent === 'null';
                            const showButton =
                                isGroupNull ||
                                (!renderedGroups.has(item.groupStudent) && item.groupStudent !== 'null');

                            if (item.groupStudent && item.groupStudent !== 'null') {
                                renderedGroups.set(item.groupStudent, true);
                            }

                            return (
                                <tr key={`student-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.Project.name}</td>
                                    <td>{item.Project.instuctor}</td>
                                    <td>{isGroupNull ? <i>Làm một mình</i> : item.groupStudent}</td>
                                    <td>
                                        {/* Hiển thị giáo viên PB1 */}
                                        {listtecher && (
                                            listtecher
                                                .filter(itemm => itemm.id == item.pb1)
                                                .map((itemmm, index) => (
                                                    <p key={`pb1-${index}`}>{itemmm.name}</p>
                                                ))
                                        )}
                                        {listtecher && (
                                            listtecher
                                                .filter(itemm => itemm.id == item.pb2)
                                                .map((itemmm, index) => (
                                                    <p key={`pb1-${index}`}>{itemmm.name}</p>
                                                ))
                                        )}
                                    </td>
                                    <td>
                                        {showButton && (
                                            <button onClick={() => handleAssign(item)} className='btn btn-success'>
                                                Assign
                                            </button>
                                        )}
                                    </td>
                                    <td>IS</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Assign Student
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedStudent && (
                        <>
                            {/* <p><strong>Mã số:</strong> {selectedStudent.maSo}</p>
                            <p><strong>Tên sinh viên:</strong> {selectedStudent.name}</p>
                            <p><strong>Dự án:</strong> {selectedStudent.Project.name}</p>
                            <p><strong>Giảng viên hướng dẫn:</strong> {selectedStudent.Project.instuctor}</p> */}

                            <strong>Tên đề tài:</strong>  {selectedStudent.Project.name} <br></br>
                            <strong>Giảng viên hướng dẫn:</strong> {selectedStudent.Project.instuctor}

                            <div className="row mt-3">
                                <div className="col-sm-6">
                                    Pb1:
                                    <select value={PB.pb1} onChange={(event) => handleOnchange(event.target.value, 'pb1')}>
                                        <option value=''>
                                            ----
                                        </option>
                                        {
                                            listtecher
                                                .filter(item => item.name != selectedStudent.Project.instuctor.trim())
                                                .filter(item => item.id != PB.pb2) // Lọc ra tất cả các group ngoại trừ group có name là 'student'
                                                .map((item, index) => {
                                                    return (
                                                        <option key={`group-${index}`} value={item.id}>{item.name}</option>
                                                    );
                                                })
                                        }
                                    </select>
                                </div>
                                <div className="col-sm-6">

                                    {
                                        PB.pb1 && PB.pb1 !== '' &&
                                        <>
                                            Pb2:
                                            <select value={PB.pb2} onChange={(event) => handleOnchange(event.target.value, 'pb2')}>
                                                <option value={''}>
                                                    ----
                                                </option>
                                                {
                                                    listtecher
                                                        .filter(item =>
                                                            item.name !== selectedStudent.Project.instuctor.trim()

                                                        )
                                                        .filter(item =>
                                                            item.id != PB.pb1

                                                        )
                                                        .map((item, index) => {
                                                            return (
                                                                <option key={`group-${index}`} value={item.id}>{item.name}</option>
                                                            );
                                                        })
                                                }
                                            </select>
                                        </>
                                    }

                                </div>
                            </div>

                        </>
                    )}

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={handleConfirmAssign}>
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default HeadAssignGV;
