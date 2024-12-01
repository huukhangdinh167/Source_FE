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
        let result = data.DT.map(item => ({
            ...item,
            danhgiacuoiky: item.Result.danhgiacuoiky,
            danhgiagiuaky: item.Result.danhgiagiuaky,

          }));
        
          // 1. Loại bỏ sinh viên có group = null và danhgiacuoiky = false
          let filteredData1 = result.filter(item => !(item.danhgiacuoiky == null));
          let filteredData = filteredData1.filter(item => !(item.groupStudent == 'null' && item.danhgiacuoiky === 'false'));
          
          // 2. Tìm các nhóm có cùng groupStudent và có sinh viên có danhgiacuoiky = false
          let groupMap = new Map();
          
          // Đánh dấu các nhóm, theo dõi các sinh viên trong nhóm có danhgiacuoiky = true
          filteredData.forEach(item => {
            if (item.groupStudent !== 'null') {
              if (!groupMap.has(item.groupStudent)) {
                groupMap.set(item.groupStudent, { hasTrue: false, ids: [] });
              }
              if (item.danhgiacuoiky === 'true') {
                groupMap.get(item.groupStudent).hasTrue = true;
              }
              groupMap.get(item.groupStudent).ids.push(item.id);
            }
          });
          
          // 3. Lọc các nhóm, giữ lại các sinh viên có groupStudent giống nhau và có ít nhất một sinh viên có danhgiacuoiky = true
         let  filteredData2 = filteredData.filter(item => {
            if (item.groupStudent !== 'null' && groupMap.has(item.groupStudent)) {
              const groupInfo = groupMap.get(item.groupStudent);
              // Giữ lại nhóm nếu có ít nhất một sinh viên có danhgiacuoiky = true
              if (groupInfo.hasTrue) {
                return true;
              }
            }
            return true;
          });
          
        console.log("thư dãn", filteredData2)
        setData(filteredData2);
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
                            <th style={{ width: "5%" }}>Mã Số</th>
                            <th style={{ width: "10%" }}>Tên</th>
                            <th style={{ width: "20%" }}>Tên Đề Tài</th>
                            <th style={{ width: "15%" }}>GVHD</th>
                            <th style={{ width: "10%" }}>Nhóm</th>
                            <th style={{ width: "15%" }}>GV Phản Biện</th>
                            <th style={{ width: "10%" }}>Phân công</th>
                            <th style={{ width: "5%" }}>Bộ môn</th>
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

                                        {
                                            (!item.pb1 || !item.pb2) && <p className="text-danger" key={`pb1-${index}`}> <br></br>Chưa phân công</p>
                                        }
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
                    <Modal.Title>Phân công phản biện
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedStudent && (
                        <>
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
