import { useEffect, useState } from 'react'
import { GetDSHoiDong } from '../../../services/HeadService'
import { Modal, Button } from "react-bootstrap";
import { headFetchListTeacher, AssignHoiDong, AssignPoster } from '../../../services/HeadService';
import _, { cloneDeep, values } from "lodash";
import { toast } from "react-toastify"
import './HeadKetQuaCham.scss'
const HeadKetQuaCham = () => {
    const [dataModal, setDataModal] = useState({})
    const [dshd, setDSHD] = useState([]);
    const danhsachhoidong = async () => {
        try {
            const data = await GetDSHoiDong();
            if (data.EC == 0) {
                setDSHD(data.DT);
                // console.log(data.DT)
            } else {
                console.log("Lỗi lấy danh sách hội đồng:", data.EM);
            }
        } catch (error) {
            console.error("Lỗi trong quá trình gọi API:", error);
        }
    }
    useEffect(() => {
        danhsachhoidong();
        studentss()
    }, []);
    // const data = [

    //         { id: 1, name: "Student 1", Result: { trungbinhphanbien: 8.5 } },
    //         { id: 2, name: "Student 2", Result: { trungbinhphanbien: 9.1 } },
    //         { id: 3, name: "Student 3", Result: { trungbinhphanbien: 6.9 } },
    //         { id: 4, name: "Student 4", Result: { trungbinhphanbien: 9.1 } },
    //         { id: 6, name: "Student 6", Result: { trungbinhphanbien: 9.3 } },
    //         { id: 8, name: "Student 8", Result: { trungbinhphanbien: 8.9 } },
    //         { id: 9, name: "Student 9", Result: { trungbinhphanbien: 6.2 } },
    //         { id: 10, name: "Student 10", Result: { trungbinhphanbien: 7.7 } },
    //         { id: 11, name: "Student 11", Result: { trungbinhphanbien: 8.1 } },
    //         { id: 12, name: "Student 12", Result: { trungbinhphanbien: 7.0 } },
    //         { id: 13, name: "Student 13", Result: { trungbinhphanbien: 6.5 } },
    //         { id: 14, name: "Student 14", Result: { trungbinhphanbien: 9.3 } },
    //         { id: 15, name: "Student 15", Result: { trungbinhphanbien: 6.0 } },
    //         { id: 16, name: "Student 16", Result: { trungbinhphanbien: 5.0 } },
    //         { id: 17, name: "Student 17", Result: { trungbinhphanbien: 7.8 } },
    //         { id: 18, name: "Student 18", Result: { trungbinhphanbien: 8.6 } },
    //         { id: 19, name: "Student 19", Result: { trungbinhphanbien: 8.6 } },
    //         { id: 19, name: "Student 20", Result: { trungbinhphanbien: 9.1 } },
    //         { id: 20, name: "Student 21", Result: { trungbinhphanbien: 9.1 } }


    // ]
    const renderedGroups = new Map();
    const calculateTotalScoresAndSort = (students) => {
        // Nhóm các sinh viên theo group
        const grouped = students.reduce(
            (groups, student) => {
                const groupKey = student.groupStudent || "null"; // Xử lý group null
                if (!groups[groupKey]) {
                    groups[groupKey] = [];
                }
                groups[groupKey].push(student);
                return groups;
            },
            {}
        );

        // Tính điểm tổng cho từng nhóm
        const results = [];
        for (const [group, members] of Object.entries(grouped)) {
            if (group === "null") {
                // Sinh viên có group null, tính điểm tổng riêng từng sinh viên
                members.forEach((student) => {
                    const trungBinhPhanBien = student.Result.trungbinhphanbien || 0;
                    const diemGVHD = parseFloat(student.Result.diemGVHD || "0"); // Chuyển đổi từ chuỗi sang float

                    results.push({
                        ...student,
                        totalScore: (trungBinhPhanBien + diemGVHD) / 2,
                    });
                });
            } else {
                // Tính điểm trung bình cho cả nhóm
                const averageScore =
                    members.reduce((sum, student) => {
                        const trungBinhPhanBien = student.Result.trungbinhphanbien || 0;
                        const diemGVHD = parseFloat(student.Result.diemGVHD || "0"); // Chuyển đổi từ chuỗi sang float

                        return sum + (trungBinhPhanBien + diemGVHD) / 2;
                    }, 0) / members.length;

                members.forEach((student) => {
                    results.push({
                        ...student,
                        totalScore: averageScore,
                    });
                });
            }
        }



        // Sắp xếp theo điểm tổng giảm dần
        results.sort((a, b) => b.totalScore - a.totalScore);

        return results;
    };

    // Dữ liệu đầu vào
    const students = [
        { id: 1, name: "Student 1", group: 232, Result: { trungbinhphanbien: 8.5 } },
        { id: 2, name: "Student 2", group: 242, Result: { trungbinhphanbien: 9.1 } },
        { id: 3, name: "Student 3", group: 232, Result: { trungbinhphanbien: 6.9 } },
        { id: 4, name: "Student 4", group: 242, Result: { trungbinhphanbien: 9.1 } },
        { id: 6, name: "Student 6", group: 272, Result: { trungbinhphanbien: 9.3 } },
        { id: 8, name: "Student 8", group: 222, Result: { trungbinhphanbien: 8.9 } },
        { id: 9, name: "Student 9", group: 222, Result: { trungbinhphanbien: 6.2 } },
        { id: 10, name: "Student 10", group: 272, Result: { trungbinhphanbien: 7.7 } },
        { id: 11, name: "Student 11", group: 202, Result: { trungbinhphanbien: 8.1 } },
        { id: 12, name: "Student 12", group: 212, Result: { trungbinhphanbien: 7.0 } },
        { id: 13, name: "Student 13", group: 202, Result: { trungbinhphanbien: 6.5 } },
        { id: 14, name: "Student 14", group: 212, Result: { trungbinhphanbien: 9.3 } },
        { id: 15, name: "Student 15", group: 252, Result: { trungbinhphanbien: 6.0 } },
        { id: 16, name: "Student 16", group: 252, Result: { trungbinhphanbien: 5.0 } },
        { id: 17, name: "Student 17", group: 282, Result: { trungbinhphanbien: 7.8 } },
        { id: 18, name: "Student 18", group: 282, Result: { trungbinhphanbien: 8.6 } },
        { id: 19, name: "Student 19", group: null, Result: { trungbinhphanbien: 8.6 } },
        { id: 19, name: "Student 20", group: null, Result: { trungbinhphanbien: 9.1 } },
        { id: 20, name: "Student 21", group: null, Result: { trungbinhphanbien: 9.1 } },
    ];
    const topStudentNotNullTrungBinhPb = dshd.filter(student => student && student.Result && student.Result.trungbinhphanbien != null);
    // Tính và sắp xếp
    const sortedResults = calculateTotalScoresAndSort(topStudentNotNullTrungBinhPb);
    // Lọc sinh viên có `Result` và `trungbinhphanbien` khác null
    const validStudents = sortedResults.filter(student => student && student.totalScore !== null);

    // Sắp xếp danh sách sinh viên theo điểm `trungbinhphanbien` giảm dần
    const sortedStudents = validStudents.sort(
        (a, b) => b.totalScore - a.totalScore
    );
    // Xác định số lượng sinh viên thuộc top 20%
    const top20PercentCount = Math.ceil(sortedStudents.length * 0.2);
    const minScoreForTop20 = sortedStudents[top20PercentCount - 1]?.totalScore;

    // Lọc sinh viên có điểm lớn hơn hoặc bằng điểm tối thiểu của top 20%
    const topStudents = sortedStudents.filter(
        student => student.totalScore >= minScoreForTop20
    );
    // In kết quả
    const topStudentNullTrungBinhPb = dshd.filter(student => student && student.Result && student.Result.trungbinhphanbien == null);
    const topStudents80 = topStudentNotNullTrungBinhPb.filter(a => !topStudents.some(b => b.id === a.id));
    console.log("data 80%", topStudents80)
    console.log("data 20%", topStudents);
    console.log("data đầu vào", sortedResults);

    const [listtecher, setListTeacher] = useState()
    const defaultHoiDong = {
        CTHD: '',
        TK: '',
        UV: '',
       
    }

    const defaultPoster = {
        Poster1: '',
        Poster2: ''
    }
    const [HoiDong, setHoiDong] = useState(defaultHoiDong)
    const [Poster, setPoster] = useState(defaultPoster)
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [showModal, setshowModal] = useState(false);
    const [showModalPoster, setshowModalPoster] = useState(false);
    const handleCloseModal = async () => {
        setshowModal(false)
        setHoiDong(defaultHoiDong)
    } 
    const handleCloseModalPoster = async () => {
        setshowModalPoster(false)
      //  setPoster(defaultPoster)
    } 
    const handleAssignHoiDong = async (item) => {
        setSelectedStudent(item)
        setshowModal(true)
        setDataModal(item)
    } 
    const handleAssignPoster = async (item) => {
        setSelectedStudent(item)
        setshowModalPoster(true)
        setDataModal({
            ...item,
            Poster1: item.Poster1 || '', // Đảm bảo có giá trị cho Poster1
            Poster2: item.Poster2 || '', // Đảm bảo có giá trị cho Poster2
        });
    } 
    useEffect(() => {
        setHoiDong(dataModal)
       // setPoster(dataModal)
    }, [dataModal]);

    useEffect(() => {
        setPoster(dataModal)
    }, [dataModal]);

    const handleOnchange = (value, name) => {
        let _HoiDong = _.cloneDeep(HoiDong)
        _HoiDong[name] = value
        setHoiDong(_HoiDong)
    }
    const handleOnchangePoster = (value, name) => {
        let _Poster = _.cloneDeep(Poster)
        _Poster[name] = value
        setPoster(_Poster)
    }
    const studentss = async () => {
        let list = await headFetchListTeacher()
        setListTeacher(list.DT)
    };
    const handleConfirmAssign = async () => {
        if (!HoiDong.CTHD) {
            toast.error("Bạn chưa chọn Chủ tịch hội đồng")
            return
        }
        if (!HoiDong.TK) {
            toast.error("Bạn chưa chọn Thư kí")
            return
        }
        if (!HoiDong.UV) {
            toast.error("Bạn chưa chọn Ủy viên")
            return
        }
        let data = await AssignHoiDong({ HoiDong, selectedStudent })
        if (data.EC == 0) {
            toast.success("Phân công thành công")
           
        } else {
            toast.error("Lỗi")
        }
        setshowModal(false)
        studentss()
        setHoiDong(defaultHoiDong)
    } 

    const handleConfirmAssignPoster = async () => {
        if (!Poster.Poster1) {
            toast.error("Bạn chưa chọn giảng viên Poster1")
            return
        }
        if (!Poster.Poster2) {
            toast.error("Bạn chưa chọn giảng viên Poster2")
            return
        }
        
        let data = await AssignPoster({ Poster, selectedStudent })
        if (data.EC == 0) {
            toast.success("Phân công thành công")
           
        } else {
            toast.error("Lỗi")
        }
        setshowModalPoster(false)
        studentss()
        setPoster(defaultPoster)
    }
    return (
        <>
            <div className='container'>
                <div className='mt-3'>
                    <h4 style={{ display: 'inline-block', marginRight: '1rem' }}>
                        Danh sách Hội đồng
                        <b className='text-danger'>{topStudents && topStudents.length}</b>/{dshd && dshd.length}
                    </h4>
                    <i className='ms-5' style={{ display: 'inline-block' }}>
                        Số lượng sinh viên chưa được chấm phản biện
                        <b className='text-danger'> {topStudentNullTrungBinhPb && topStudentNullTrungBinhPb.length}</b>
                    </i>
                </div>

                <table className="table text-center table-bordered table-hover mt-3">
                    <thead>
                        <tr>
                            <th style={{ width: "4%" }}>ID</th>
                            <th style={{ width: "15%" }}>Tên</th>
                            <th style={{ width: "26%" }}>Tên Đề Tài</th>
                            <th style={{ width: "10%" }}>GVHD</th>
                            <th style={{ width: "9%" }}>Điểm GVHD</th>
                            <th style={{ width: "10%" }}>Điểm TBPB</th>
                            <th style={{ width: "10%" }}>Nhóm</th>
                            <th style={{ width: "15%" }}>Hội Đồng</th>
                            <th style={{ width: "7%" }}></th>
                            <th style={{ width: "10%" }}>Bộ Môn</th>
                        </tr>
                    </thead>
                    <tbody>
                        {topStudents && topStudents.map((item, index) => {
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
                                    <td>{item.Project && item.Project.name}</td>
                                    <td>{item.Project && item.Project.instuctor}</td>
                                    <td>{item.Result && item.Result.diemGVHD}</td>
                                    <td>{item.Result && item.Result.trungbinhphanbien}</td>
                                    <td>{isGroupNull ? <i>Làm một mình</i> : item.groupStudent}</td>

                                    <td>
                                    {listtecher && (
                                        listtecher
                                            .filter(itemm => itemm.id == item.CTHD)
                                            .map((itemmm, index) => (
                                                <p key={`pb1-${index}`}>CTHD: {itemmm.name}</p>
                                            ))
                                    )}
                                    {listtecher && (
                                        listtecher
                                            .filter(itemm => itemm.id == item.TK)
                                            .map((itemmm, index) => (
                                                <p key={`pb1-${index}`}>Thư ký: {itemmm.name}</p>
                                            ))
                                    )}
                                     {listtecher && (
                                        listtecher
                                            .filter(itemm => itemm.id == item.UV)
                                            .map((itemmm, index) => (
                                                <p key={`pb1-${index}`}>Uỷ viên: {itemmm.name}</p>
                                            ))
                                    )}
                                </td>
                                   
                                    <td>
                                        {showButton && (
                                            <button onClick={() => handleAssignHoiDong(item)} className='btn btn-success'>
                                                <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                                            </button>
                                        )}
                                    </td>
                                    <td>IS</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                <div className='mt-3'>
                    <h4>Danh sách Poster <b className='text-danger'>{topStudents80 && topStudents80.length}</b>/{dshd && dshd.length}</h4>
                </div>
                <table className="table text-center table-bordered table-hover mt-3">
                    <thead>
                        <tr>
                            <th style={{ width: "4%" }}>ID</th>
                            <th style={{ width: "15%" }}>Tên</th>
                            <th style={{ width: "26%" }}>Tên Đề Tài</th>
                            <th style={{ width: "10%" }}>GVHD</th>
                            <th style={{ width: "9%" }}>Điểm GVHD</th>
                            <th style={{ width: "10%" }}>Điểm TBPB</th>
                            <th style={{ width: "10%" }}>Nhóm</th>
                            <th style={{ width: "15%" }}>Poster</th>
                            <th style={{ width: "7%" }}></th>
                            <th style={{ width: "10%" }}>Bộ Môn</th>
                        </tr>
                    </thead>
                    <tbody>
                        {topStudents80 && topStudents80.map((item, index) => {
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
                                    <td>{item.Project && item.Project.name}</td>
                                    <td>{item.Project && item.Project.instuctor}</td>
                                    <td>{item.Result && item.Result.diemGVHD}</td>
                                    <td>{item.Result && item.Result.trungbinhphanbien}</td>

                                    <td>{isGroupNull ? <i>Làm một mình</i> : item.groupStudent}</td>
                                    <td> 
                                    {listtecher && (
                                        listtecher
                                            .filter(itemm => itemm.id == item.Poster1)
                                            .map((itemmm, index) => (
                                                <p key={`pb1-${index}`}>Poster1: {itemmm.name}</p>
                                            ))
                                    )} 
                                    
                                    {listtecher && (
                                        listtecher
                                            .filter(itemm => itemm.id == item.Poster2)
                                            .map((itemmm, index) => (
                                                <p key={`pb1-${index}`}>Poster2: {itemmm.name}</p>
                                            ))
                                    )}
                                </td>
                                   
                                    <td>
                                        {showButton && (
                                            <button onClick={() => handleAssignPoster(item)} className='btn btn-success'>
                                                <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
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

            <Modal  size="lg" className='text-center' show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title className="w-100 text-center">
                    HỘI ĐỒNG (BÁO CÁO)  
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedStudent && (
                        <>
                            <strong>Tên đề tài:</strong> <p className='text-danger'>{selectedStudent.Project.name}</p>
                            <strong>Giảng viên hướng dẫn:</strong> {selectedStudent.Project.instuctor}
                            <div className="row mt-3"> 
                                <div className="col-sm-1">CTHD:</div>
                                <div className="col-sm-3 px-0">
                                    
                                    <select className='form-select ' value={HoiDong.CTHD} onChange={(event) => handleOnchange(event.target.value, 'CTHD')}>
                                        <option value=''>
                                            ----
                                        </option>
                                        {
                                            listtecher

                                                .filter(item => item.id != HoiDong.TK)
                                                .filter(item => item.id != HoiDong.UV) // Lọc ra tất cả các group ngoại trừ group có name là 'student'
                                                .map((item, index) => {
                                                    return (
                                                        <option key={`group-${index}`} value={item.id}>{item.name}</option>
                                                    );
                                                })
                                        }
                                    </select>
                                </div> 
                                <div className="col-sm-1">TK:</div>
                                <div className="col-sm-3 px-0">

                                    {
                                        HoiDong.CTHD && HoiDong.CTHD !== '' &&
                                        <>
                                            
                                            <select className='form-select ' value={HoiDong.TK} onChange={(event) => handleOnchange(event.target.value, 'TK')}>
                                                <option value={''}>
                                                    ----
                                                </option>
                                                {
                                                    listtecher
                                                        .filter(item =>
                                                            item.id != HoiDong.CTHD)
                                                        .filter(item =>
                                                            item.id != HoiDong.UV)
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
                                <div className="col-sm-1"> UV:</div>
                                <div className="col-sm-3 px-0">

                                    {
                                        HoiDong.CTHD && HoiDong.CTHD !== '' && HoiDong.TK && HoiDong.TK !== '' &&
                                        <>
                                           
                                            <select className='form-select ' value={HoiDong.UV} onChange={(event) => handleOnchange(event.target.value, 'UV')}>
                                                <option value={''}>
                                                    ----
                                                </option>
                                                {
                                                    listtecher
                                                        .filter(item =>
                                                            item.id != HoiDong.CTHD
                                                        )
                                                        .filter(item =>
                                                            item.id != HoiDong.TK
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
                    
            <Modal  className='text-center '   size="lg" centered show={showModalPoster} onHide={handleCloseModalPoster} >
                <Modal.Header closeButton>
                    <Modal.Title className="w-100 text-center">
                     HỘI ĐỒNG (POSTER)  
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedStudent && (
                        <>
                            <strong>Tên đề tài:</strong> <p className='text-danger'>{selectedStudent.Project.name}</p>
                            <strong>Giảng viên hướng dẫn:</strong> {selectedStudent.Project.instuctor}
                            <div className="row mt-3"> 
                            <div className='col-sm-1'></div>
                                <div className='col-sm-1'>Poster1:</div>
                                <div className="col-sm-4">
                                
                                    <select className='form-select' value={Poster.Poster1} onChange={(event) => handleOnchangePoster(event.target.value, 'Poster1')}>
                                        <option value=''>
                                            ----
                                        </option>
                                        {
                                            listtecher
                                               
                                                .filter(item => item.id != Poster.Poster2) // Lọc ra tất cả các group ngoại trừ group có name là 'student'
                                                .map((item, index) => {
                                                    return (
                                                        <option key={`group-${index}`} value={item.id}>{item.name}</option>
                                                    );
                                                })
                                        }
                                    </select>
                                </div>
                                <div className='col-sm-1'>Poster2:</div>
                                <div className="col-sm-4">

                                    {
                                        Poster.Poster1 && Poster.Poster1 !== '' &&
                                        <>
                                           
                                            <select className='form-select' value={Poster.Poster2} onChange={(event) => handleOnchangePoster(event.target.value, 'Poster2')}>
                                                <option value={''}>
                                                    ----
                                                </option>
                                                {
                                                    listtecher
                                                        .filter(item =>
                                                            item.id != Poster.Poster1)
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
                    <Button variant="secondary" onClick={handleCloseModalPoster}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={handleConfirmAssignPoster}>
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </>


    );
};
export default HeadKetQuaCham