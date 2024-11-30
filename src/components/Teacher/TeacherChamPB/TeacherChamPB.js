import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap"; // Import modal từ React Bootstrap
import swal from 'sweetalert';
import './TeacherChamPB.scss';
import { test, headFetchListTeacher, AssignPB1and2 } from '../../../services/HeadService';
import { teacherPB } from '../../../services/Teacher';
import _, { cloneDeep, values } from "lodash";
import { toast } from "react-toastify";
import { UserContext } from '../../../context/userContext';
const TeacherChamPB = (props) => {
    const { user } = React.useContext(UserContext);
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

        TeahcerPB()
    }, []);

    // useEffect(() => {
    //     studentss();
    // }, [students]);

    useEffect(() => {
        setPB({ ...dataModal })
    }, [dataModal]);

    const studentss = async () => {
        let data = await teacherPB(user);
        setData(data.DT);
        let list = await headFetchListTeacher()
        setListTeacher(list.DT)
        //  console.log("Check test",data.DT)
    };
    // console.log("Check test",students)
    const TeahcerPB = async () => {
        let data = await teacherPB(user)
        console.log("Check chấm pb", data)
        let data2 = await test();
        console.log("Check test", data2)

    }

    const handleAssign = (item) => {
        setSelectedStudent(item); // Lưu sinh viên được chọn vào state
        setShowModal(true); // Hiển thị modal
        setDataModal(item)
        console.log("Checkscscs", item)
    };

    const handleCloseModal = async () => {
        setShowModal(false); // Đóng modal
        console.log("Sex", students)
    };

    const handleConfirmAssign = async () => {
        if (!PB.pb1) {
            toast.error("Value PB1 null")
            return
        }
        if (!PB.pb2) {
            toast.error("Value PB2 null")
            return
        }
        if (PB.pb1 === PB.pb2) {
            toast.error("PB1 và PB2 không được trùng ")
            return
        }
        let data = await AssignPB1and2({ PB, selectedStudent })
        if (data.EC === 0) {
            toast.success(data.EM)

        }
        // console.log("PBBBB:", students);
        //  swal("Success", "Assigned successfully!", "success"); // Hiển thị thông báo thành công
        setShowModal(false); // Đóng modal
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
                <p className="mt-3 "><i>Số lượng sinh viên cần chấm phản biện:</i> <b className="text-danger"> {students ? students.length : ''}</b></p>
                <table className="table text-center table-bordered table-hover mt-3">
                    <thead>
                        <tr>
                            <th style={{ width: "6%" }} >MSSV</th>
                            <th style={{ width: "10%" }}>Tên</th>
                            <th style={{ width: "15%" }}>Tên Đề Tài</th>
                            <th style={{ width: "15%" }}>Mô Tả</th>
                            <th style={{ width: "15%" }}>Yêu cầu</th>
                            <th style={{ width: "10%" }}>GVHD</th>
                            <th style={{ width: "6%" }}>Nhóm</th>
                            <th style={{ width: "10%" }}>GV Phản Biện</th>
                            <th style={{ width: "8%" }}>Phân Công</th>
                            <th style={{ width: "7%" }}>Bộ môn</th>
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
                                    <td>{item.Project.require}</td>
                                    <td>{item.Project.instuctor}</td>
                                    <td>{isGroupNull ? <i>Làm một mình</i> : item.groupStudent}</td>
                                    <td>

                                        {/* Hiển thị giáo viên PB1 */}
                                        {listtecher && (
                                            listtecher
                                                .filter(itemm => itemm.id == item.pb1)
                                                .map((itemmm, index) => (
                                                    <p key={`pb1-${index}`}>PB1: {itemmm.name}</p>
                                                ))
                                        )}
                                        {listtecher && (
                                            listtecher
                                                .filter(itemm => itemm.id == item.pb2)
                                                .map((itemmm, index) => (
                                                    <p key={`pb1-${index}`}>PB2: {itemmm.name}</p>
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
                        }) : <tr>

                            <td colSpan={10}><i>Chưa được phân chấm phản biện</i></td>
                        </tr>}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            <Modal show={showModal} onHide={handleCloseModal}>
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
                                        <option value={''}>
                                            ----
                                        </option>
                                        {
                                            listtecher
                                                .filter(item => item.name != selectedStudent.Project.instuctor.trim())
                                                // .filter(item => item.name != selectedStudent.Project.instuctor.trim())
                                                .map((item, index) => {
                                                    return (
                                                        <option key={`group-${index}`} value={item.id}>{item.name}</option>
                                                    );
                                                })
                                        }
                                    </select>
                                </div>
                                <div className="col-sm-6">
                                    Pb2:
                                    <select value={PB.pb2} onChange={(event) => handleOnchange(event.target.value, 'pb2')}>
                                        <option value={''}>
                                            ----
                                        </option>
                                        {
                                            listtecher
                                                .filter(item => item.name != selectedStudent.Project.instuctor.trim()) // Lọc ra tất cả các group ngoại trừ group có name là 'student'
                                                .map((item, index) => {
                                                    return (
                                                        <option key={`group-${index}`} value={item.id}>{item.name}</option>
                                                    );
                                                })
                                        }
                                    </select>
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

export default TeacherChamPB;
