import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap"; // Import modal từ React Bootstrap
import swal from 'sweetalert';
import './TeacherChamPB.scss';
import { test, headFetchListTeacher, AssignPB1and2, } from '../../../services/HeadService';
import { teacherPB, teacherGetIn4SV1andSV2, teacherDGPB, teacherXemKetQuaPBSV2, teacherDefinePB1PB2 } from '../../../services/Teacher';
import _, { cloneDeep, values } from "lodash";
import { toast } from "react-toastify";
import { UserContext } from '../../../context/userContext';
const TeacherChamPB = (props) => {
    const { user } = React.useContext(UserContext);
    const [students, setData] = useState([]);
    const [showModal, setShowModal] = useState(false); // Trạng thái hiển thị modal
    const [listtecher, setListTeacher] = useState()
    const [dataModal, setDataModal] = useState({})
    const [listSV1SV2, setListSv1Sv2] = useState([])
    const [xemPBSV2, setXemPBSV2] = useState([])
    const [daDanhGia, setDaDanhGia] = useState("false")
    const defaultPBSV1 = {
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
        diemSV2: '',
        LOL1: '',
        LOL2: '',
        LOL3: '',
        LOL4: '',
        LOL5: '',
        LOL6: '',
        LOL7: '',
        LOL8: '',

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
            diemSV1: dataModal.diemSV1
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
            diemSV2: xemPBSV2.diemSV2
        })
    }, [xemPBSV2, dataModal]);


    const studentss = async () => {
        let data = await teacherPB(user);
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
        let aee = await teacherXemKetQuaPBSV2(item.groupStudent)
        if (aee.EC != 0) {
            toast.error(aee.EM)
        }
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
                ghichu: item.Criteriapb?.ghichu,
                diemSV1: item.Result?.diemGVPB1 
            })
            let data = await teacherXemKetQuaPBSV2(item.groupStudent)
            if (data.EC == 0) {
                let res = data.DT
                setXemPBSV2({
                    ...res,
                    LOL1: res[1].Criteriapb?.LOL1,
                    LOL2: res[1].Criteriapb?.LOL2,
                    LOL3: res[1].Criteriapb?.LOL3,
                    LOL4: res[1].Criteriapb?.LOL4,
                    LOL5: res[1].Criteriapb?.LOL5,
                    LOL6: res[1].Criteriapb?.LOL6,
                    LOL7: res[1].Criteriapb?.LOL7,
                    LOL8: res[1].Criteriapb?.LOL8,
                    diemSV2: res[1].Result?.diemGVPB1 
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
                ghichu: item.Criteriapb?.ghichu,
                diemSV1:  item.Result?.diemGVPB2
            })
            let data = await teacherXemKetQuaPBSV2(item.groupStudent)
            if (data.EC == 0) {
                let res = data.DT
                setXemPBSV2({
                    ...res,
                    LOL1: res[1].Criteriapb?.LOL1PB2,
                    LOL2: res[1].Criteriapb?.LOL2PB2,
                    LOL3: res[1].Criteriapb?.LOL3PB2,
                    LOL4: res[1].Criteriapb?.LOL4PB2,
                    LOL5: res[1].Criteriapb?.LOL5PB2,
                    LOL6: res[1].Criteriapb?.LOL6PB2,
                    LOL7: res[1].Criteriapb?.LOL7PB2,
                    LOL8: res[1].Criteriapb?.LOL8PB2,
                    //  ghichu: res[1].Criteriapb?.ghichu,
                    diemSV2:  res[1].Result?.diemGVPB2
                })
                console.log("datamodaaal", res)
            } else {
                toast.error("Lỗi gì đó")
            }

        } else {
            toast.error("Trống")

        }
        setShowModal(true); // Hiển thị modal
        // setDataModal({
        //     ...item,
        //     LOL1: item.Criteriapb?.LOL1,
        //     LOL2: item.Criteriapb?.LOL2,
        //     LOL3: item.Criteriapb?.LOL3,
        //     LOL4: item.Criteriapb?.LOL4,
        //     LOL5: item.Criteriapb?.LOL5,
        //     LOL6: item.Criteriapb?.LOL6,
        //     LOL7: item.Criteriapb?.LOL7,
        //     LOL8: item.Criteriapb?.LOL8,
        //     ghichu: item.Criteriapb?.ghichu,
        //     diemSV1: item.Result?.diemGVPB1 || item.Result?.diemGVPB2
        // })
        // let data = await teacherXemKetQuaPBSV2(item.groupStudent)
        // if (data.EC == 0) {
        //     let res = data.DT
        //     setXemPBSV2({
        //         ...res,
        //         LOL1: res[1].Criteriapb?.LOL1,
        //         LOL2: res[1].Criteriapb?.LOL2,
        //         LOL3: res[1].Criteriapb?.LOL3,
        //         LOL4: res[1].Criteriapb?.LOL4,
        //         LOL5: res[1].Criteriapb?.LOL5,
        //         LOL6: res[1].Criteriapb?.LOL6,
        //         LOL7: res[1].Criteriapb?.LOL7,
        //         LOL8: res[1].Criteriapb?.LOL8,
        //         //  ghichu: res[1].Criteriapb?.ghichu,
        //         diemSV2: res[1].Result?.diemGVPB1 || res[1].Result?.diemGVPB2
        //     })
        //     console.log("datamodaaal", res)
        // } else {
        //     toast.error("Lỗi gì đó")
        // }
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
            if (!PBSV1.diemSV1) {
                toast.error("Bạn chưa nhập điểm cho SV1");
                return
            }
            if (PBSV1.diemSV1 < 0 || PBSV1.diemSV1 > 10) {
                toast.error("Điểm của sinh viên là một số từ 0 -> 10");
                return
            }
            if (PBSV1.LOL1 == '') {
                toast.error("Bạn chưa nhập LOL1 cho SV1");
                return
            }
            if (!PBSV1.LOL2) {
                toast.error("Bạn chưa nhập LOL2 cho SV1");
                return
            }
            if (!PBSV1.LOL3) {
                toast.error("Bạn chưa nhập LOL3 cho SV1");
                return
            }
            if (!PBSV1.LOL4) {
                toast.error("Bạn chưa nhập LOL4 cho SV1");
                return
            }
            if (!PBSV1.LOL5) {
                toast.error("Bạn chưa nhập LOL5 cho SV1");
                return
            }
            if (!PBSV1.LOL6) {
                toast.error("Bạn chưa nhập LOL6 cho SV1");
                return
            }
            if (!PBSV1.LOL7) {
                toast.error("Bạn chưa nhập LOL7 cho SV1");
                return
            }
            if (!PBSV1.LOL8) {
                toast.error("Bạn chưa nhập LOL8 cho SV1");
                return
            }
            if (!PBSV2.diemSV2) {
                toast.error("Bạn chưa nhập điểm cho SV2");
                return
            }
            if (PBSV2.diemSV2 < 0 || PBSV2.diemSV2 > 10) {
                toast.error("Điểm của sinh viên là một số từ 0 -> 10");
                return
            }
            if (!PBSV2.LOL1) {
                toast.error("Bạn chưa nhập LOL1 cho SV2");
                return
            }
            if (!PBSV2.LOL2) {
                toast.error("Bạn chưa nhập LOL2 cho SV2");
                return
            }
            if (!PBSV2.LOL3) {
                toast.error("Bạn chưa nhập LOL3 cho SV2");
                return
            }
            if (!PBSV2.LOL4) {
                toast.error("Bạn chưa nhập LOL4 cho SV2");
                return
            }
            if (!PBSV2.LOL5) {
                toast.error("Bạn chưa nhập LOL5 cho SV2");
                return
            }
            if (!PBSV2.LOL6) {
                toast.error("Bạn chưa nhập LOL6 cho SV2");
                return
            }
            if (!PBSV2.LOL7) {
                toast.error("Bạn chưa nhập LOL7 cho SV2");
                return
            }
            if (!PBSV2.LOL8) {
                toast.error("Bạn chưa nhập LOL8 cho SV2");
                return
            }
        }
        if (listSV1SV2.length == 1) {
            if (!PBSV1.diemSV1) {
                toast.error("Bạn chưa nhập điểm cho SV1");
                return
            }
            if (PBSV1.diemSV1 < 0 || PBSV1.diemSV1 > 10) {
                toast.error("Điểm của sinh viên là một số từ 0 -> 10");
                return
            }
            if (!PBSV1.LOL1) {
                toast.error("Bạn chưa nhập LOL1 cho SV1");
                return
            }
            if (!PBSV1.LOL2) {
                toast.error("Bạn chưa nhập LOL2 cho SV1");
                return
            }
            if (!PBSV1.LOL3) {
                toast.error("Bạn chưa nhập LOL3 cho SV1");
                return
            }
            if (!PBSV1.LOL4) {
                toast.error("Bạn chưa nhập LOL4 cho SV1");
                return
            }
            if (!PBSV1.LOL5) {
                toast.error("Bạn chưa nhập LOL5 cho SV1");
                return
            }
            if (!PBSV1.LOL6) {
                toast.error("Bạn chưa nhập LOL6 cho SV1");
                return
            }
            if (!PBSV1.LOL7) {
                toast.error("Bạn chưa nhập LOL7 cho SV1");
                return
            }
            if (!PBSV1.LOL8) {
                toast.error("Bạn chưa nhập LOL8 cho SV1");
                return
            }
        }
        let data = await teacherDGPB(PBSV1, PBSV2, listSV1SV2[0].id, listSV1SV2[1] ? listSV1SV2[1].id : 'null', listSV1SV2[0].pb1, listSV1SV2[0].pb2, user.maSo)
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
        _PBSV1[name] = value
        setPBSV1(_PBSV1)
    };
    const handleOnchange2 = (value, name) => {
        let _PBSV2 = _.cloneDeep(PBSV2)
        _PBSV2[name] = value
        setPBSV2(_PBSV2)
    }
    const renderedGroups = new Map(); // Theo dõi nhóm đã xử lý
    return (
        <>
            <div className='container'>
                <p className="mt-3 "><i>Số lượng sinh viên cần chấm phản biện:</i> <b className="text-danger"> {students ? students.length : ''}</b></p>
                <table className="table text-center table-bordered table-hover mt-3">
                    <thead>
                        <tr>
                            <th style={{ width: "5%" }} >MSSV</th>
                            <th style={{ width: "9%" }}>Tên</th>
                            <th style={{ width: "14%" }}>Tên Đề Tài</th>
                            <th style={{ width: "15%" }}>Mô Tả</th>
                            <th style={{ width: "14%" }}>Yêu cầu</th>
                            <th style={{ width: "10%" }}>GVHD</th>
                            <th style={{ width: "6%" }}>Nhóm</th>
                            <th style={{ width: "10%" }}>GV Phản Biện</th>
                            <th style={{ width: "12%" }}>Chấm</th>
                            <th style={{ width: "4%" }}>Bộ môn</th>
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
                                    </td>
                                    <td>
                                        {showButton && (
                                            <>
                                                <button onClick={() => handleChamDiemPB(item)} className="btn btn-success">
                                                    <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                                                </button>
                                                <br /><br />
                                                {item.groupStudent &&
                                                    ((item.Result?.diemGVPB1 !== null ) ? (
                                                        <i className="text-primary">PB1 Đã đánh giá</i>
                                                    ) : (
                                                        <i className="text-danger">PB1 Chưa đánh giá</i>
                                                    ))} 
                                                    <br></br>
                                                  {item.groupStudent &&
                                                    ((item.Result?.diemGVPB2 !== null ) ? (
                                                        <i className="text-primary">PB2 Đã đánh giá</i>
                                                    ) : (
                                                        <i className="text-danger">PB2 Chưa đánh giá</i>
                                                    ))}  
                                            </>
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
                                <div className="row mt-1">
                                    <div className="col-sm-1"></div>
                                    <div className="col-sm-5  "><b> SV1: </b>&nbsp;&nbsp;<i className="">{listSV1SV2[0].name} </i> &nbsp;<i className="">{listSV1SV2[0].maSo} </i></div>
                                    <div className="col-sm-5  "><b> SV2:</b> &nbsp;&nbsp;<i className="">{listSV1SV2[1].name} </i>&nbsp;<i className="">{listSV1SV2[1].maSo} </i></div>
                                </div>
                            </>
                        }
                        <div className="row mt-4">
                            <div className="col-sm-1"></div>
                            {
                                listSV1SV2.length == 2 ?
                                    <>
                                        <div className="col-sm-3  "><i className="text-danger"> Điểm hướng dẫn cho SV1</i></div>
                                        <input value={PBSV1.diemSV1} onChange={(event) => handleOnchange(event.target.value, 'diemSV1')} className="col-sm-2 " type="number" />
                                        <div className="col-sm-3  "><i className="text-danger"> Điểm hướng dẫn cho SV2</i></div>
                                        <input value={PBSV2.diemSV2} onChange={(event) => handleOnchange2(event.target.value, 'diemSV2')} className="col-sm-2 " type="number" />
                                    </>
                                    : <>

                                        <div className="col-sm-5  ">
                                            <b> Sinh viên:&nbsp;  {listSV1SV2.length && listSV1SV2[0].name} &nbsp;&nbsp; {listSV1SV2.length && listSV1SV2[0].maSo}</b>

                                        </div>
                                        <div className="col-sm-3  "><i className="text-danger"> Điểm hướng dẫn </i></div>
                                        <input value={PBSV1.diemSV1} onChange={(event) => handleOnchange(event.target.value, 'diemSV1')} className="col-sm-2 " type="number" />
                                        <div className="col-sm-1"></div>
                                    </>
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
                                                SV1
                                            </th>
                                            {
                                                listSV1SV2.length == 2 &&
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
                                                <td>
                                                    <select value={PBSV1[`LOL${index + 1}`]} onChange={(event) => handleOnchange(event.target.value, `LOL${index + 1}`)} className="form-select">
                                                        <option value={''}>----</option>
                                                        <option value={'1'}>1</option>
                                                        <option value={'2'}>2</option>
                                                        <option value={'3'}>3</option>
                                                        <option value={'4'}>4</option>
                                                    </select>
                                                </td>
                                                {
                                                    listSV1SV2.length == 2 && <td>
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

                            </div>


                        </div>
                        <div className="row">
                            <div className="col-sm-2"><i className="text-primary">Nhận xét</i></div>
                            <textarea value={PBSV1.ghichu} onChange={(event) => handleOnchange(event.target.value, 'ghichu')} className="col-sm-9"></textarea></div>
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
