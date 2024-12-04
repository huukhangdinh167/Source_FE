import swal from 'sweetalert';
import './Project.scss'
import { useEffect, useState, useContext } from "react";
import {
    headGetProjectandUser, headDeleteProjct, headHuyDangKi,
    headRefuseFroject, headGetProjectApprove, headApproveFroject
} from '../../../services/HeadService'
import React from 'react';
import { UserContext } from '../../../context/userContext';
import { toast } from "react-toastify";
import { times } from 'lodash';
const HeadProject = () => {
    const [listProject, setListProject] = useState([]);
    const [listProjectApprove, setListProjectApprove] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        getALLProject();
        GetAllProjectApprove()
        console.log(user)
    }, []);

    const getALLProject = async () => {
        let data = await headGetProjectandUser();
        if (data && +data.EC === 0) {
            setListProject(data.DT);
        }
    };

    const GetAllProjectApprove = async () => {
        let data = await headGetProjectApprove()
        if (data.EC === 0) {
            setListProjectApprove(data.DT)
        }
    }

    const handleApproveProject = async (item) => {
        swal(`Bạn có chắc muốn duyệt đề tài ${item.id} ?`, {
            buttons: ["Không!", "Có!"],
        })
            .then(async (willUnregister) => {
                if (willUnregister) {
                    // Người dùng chọn "Có"
                    let data = await headApproveFroject(item)
                    if (+data.EC === 0) {
                        toast.success(data.EM)
                        getALLProject()
                        GetAllProjectApprove()
                    } else {
                        toast.error(data.EM)
                    }
                } else {
                    // Người dùng chọn "Không"

                }
            });

    }

    const handleRefuseProject = async (item) => {
        // Tạo textarea để nhập lý do
        let textarea = document.createElement("textarea");
        textarea.style.width = "100%";
        textarea.style.height = "70px";

        // Hiển thị Swal với nội dung là textarea
        swal({
            title: `Bạn vui lòng nhập lý do từ chối duyệt cho đề tài:`,
            content: textarea,
            buttons: {
                cancel: "Không!",
                confirm: "Có!",
            },
            dangerMode: true,
            closeOnClickOutside: false, // Không cho phép đóng khi nhấn ngoài
            closeOnEsc: false, // Không cho phép đóng khi nhấn Esc
            className: "custom-swal-title",
        }).then(async (willUnregister) => {
            if (willUnregister) {
                // Lấy giá trị từ textarea
                let reason = textarea.value.trim();

                // Kiểm tra nếu lý do từ chối không được nhập
                if (!reason) {
                    // Hiển thị hộp thoại thông báo lỗi
                    swal({
                        title: "",
                        text: "Bạn chưa nhập lý do từ chối!",
                        icon: "error",
                        buttons: {
                            confirm: "OK",
                        },
                    }).then(() => {
                        // Hiển thị toast.error sau khi hộp thoại đóng
                        // toast.error("Bạn chưa nhập lý do từ chối");
                        handleRefuseProject(item); // Gọi lại chính nó để giữ hộp thoại nhập lý do
                    });
    
                    return;
                }

                // Gửi yêu cầu từ chối với lý do
                let data = await headRefuseFroject(item, reason);
                getALLProject();
                GetAllProjectApprove();

                // Hiển thị kết quả
                if (data && +data.EC === 0) {
                    toast.success(data.EM);
                } else {
                    toast.error(data.EM);
                }
            } else {
                // Người dùng chọn "Không"
                console.log("item", item);
            }
        });
    };


    const handleDeletProject = async (item) => {
        swal(`Bạn có chắc muốn xóa đề tài ${item.id} ?`, {
            buttons: ["No!", "Yes!"],
        })
            .then(async (willUnregister) => {
                if (willUnregister) {
                    // Người dùng chọn "Có"
                    let data = await headDeleteProjct(item)
                    if (data.EC === 0) {
                        toast.success(`Delete project id = ${data.DT} success`)
                        getALLProject()
                    } else {
                        toast.error(data.EM)
                    }
                } else {
                    // Người dùng chọn "Không"

                }
            });
    }

    const handleDelete = async (student) => {
        swal(`Bạn có chắc muốn xóa sinh viên ${student.maSo} khỏi đề tài ${student.projectId}  ?`, {
            buttons: ["No!", "Yes!"],
        })
            .then(async (willUnregister) => {
                if (willUnregister) {
                    // Người dùng chọn "Có"
                    let data = await headHuyDangKi(student)
                    if (data.EC === 0) {
                        toast.success(`Delete Student Register project success`)
                        getALLProject()
                    } else {
                        toast.error(data.EM)
                    }
                } else {
                    // Người dùng chọn "Không"

                }
            });

    }
    const lydotuchoi = (item) => {
        alert(item.reasonrefuse)
    }

    // swal("Are you sure you want to do this?", {
    //     buttons: ["No!", "Yes!"],
    // })
    //     .then(async (willUnregister) => {
    //         if (willUnregister) {
    //             // Người dùng chọn "Có"

    //         } else {
    //             // Người dùng chọn "Không"

    //         }
    //     });
    return (
        <>
            <div className="container">
                <div className="mt-3 text-center">
                    <h4>Chờ duyệt:</h4>
                </div>
                <div className='mt-3 text-center'>
                    {listProjectApprove.length > 0 ? (
                        <>
                            <div className="mt-3 text-center">
                                <table className="table table-bordered table-hover mt-5">
                                    <thead>
                                        <tr>
                                            <th style={{ width: "5%" }}>ID</th>
                                            <th style={{ width: "15%" }}>TÊN</th>
                                            <th style={{ width: "10%" }}>GVHD</th>
                                            <th style={{ width: "15%" }}>KIẾN THỨC</th>
                                            <th style={{ width: "15%" }}>YÊU CẦU</th>
                                            <th style={{ width: "25%" }}>MÔ TẢ</th>
                                            <th style={{ width: "16%" }}>DUYỆT</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listProjectApprove.length > 0 && listProjectApprove.map((item, index) => (
                                            <>
                                                <tr key={`project-${index}`}>
                                                    <td>{item.id}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.instuctor}</td>
                                                    <td>{item.require}</td>
                                                    <td>{item.knowledgeSkills}</td>
                                                    <td>{item.description}</td>
                                                    <td className='center-button'><div onClick={() => handleApproveProject(item)} className='  btn btn-success btn-sm'>Duyệt</div>
                                                        <div onClick={() => handleRefuseProject(item)} className='  btn btn-danger btn-sm'>Từ chối</div>
                                                        {item.reasonrefuse && <p onClick={() => lydotuchoi(item)} className='text-primary lydotuchoi'>(Lý do từ chối trước đó)</p>}
                                                    </td>

                                                </tr>
                                                <tr>
                                                </tr>
                                            </>
                                        ))}
                                    </tbody>
                                </table >
                            </div>
                        </>
                    ) : <i>Danh sách trống</i>}
                </div>


                <div className="mt-3 text-center">
                    <h4>Đã duyệt:</h4>
                </div>
                <div className="mt-3">
                    {listProject && (
                        <>
                            <div className="mt-1 text-center">
                                <table className="table table-bordered table-hover mt-3">
                                    <thead>
                                        <tr>
                                            <th style={{ width: "5%" }} >ID</th>
                                            <th style={{ width: "20%" }}>TÊN ĐỀ TÀI</th>
                                            <th style={{ width: "13%" }}>GVHD</th>
                                            <th style={{ width: "30%" }}>KIẾN THỨC</th>
                                            <th style={{ width: "25%" }}>YÊU CẦU</th>
                                            {/* <th>STUDENT NAME</th> */}
                                            {/* <th style={{ width: "7%" }}>XÓA</th> */}
                                        </tr>
                                    </thead>
                                    {listProject.length > 0 && listProject.map((item, index) => (
                                        <>

                                            <tbody>
                                                <tr key={`project-${index}`}>
                                                    <td>{item.id}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.instuctor}</td>
                                                    <td>{item.knowledgeSkills}</td>
                                                    <td>{item.require}</td>

                                                    {/* <td className='center-button'><div onClick={() => handleDeletProject(item)} className='  btn btn-danger'>Xóa</div></td> */}
                                                    {/* <td colSpan="2" className="text-center">
                                                        {item.Userstudents.length === 0 && <em>Chưa có sinh viên đăng ký</em>}
                                                    </td> */}
                                                </tr>
                                                <tr>

                                                </tr>
                                            </tbody>


                                            {/* <div className='row'>
                                            <div className='col-sm-2'>

                                            </div>
                                            <div className='col-sm-8'>

                                                <table className="table  table-hover">
                                                    {
                                                        item.Userstudents.length > 0 &&
                                                        <thead>
                                                            <td style={{ width: "25%" }}>Name Student</td>
                                                            <td style={{ width: "15%" }}>Mã Số SV</td>
                                                            <td style={{ width: "25%" }}>Group Student</td>
                                                            <td style={{ width: "15%" }}>Action</td>

                                                        </thead>
                                                    }
                                                    <tbody>
                                                        {item.Userstudents.length > 0 ? (
                                                            item.Userstudents
                                                                .sort((a, b) => {
                                                                    // So sánh `groupStudent` để sắp xếp, các sinh viên có cùng `groupStudent` sẽ đứng cạnh nhau
                                                                    if (a.groupStudent && b.groupStudent) {
                                                                        return a.groupStudent.localeCompare(b.groupStudent);
                                                                    }
                                                                    // Đặt những sinh viên không có `groupStudent` (null hoặc undefined) xuống cuối
                                                                    if (!a.groupStudent) return 1;
                                                                    if (!b.groupStudent) return -1;
                                                                    return 0;
                                                                })
                                                                .map((student, studentIndex) => (
                                                                    <tr key={`student-${index}-${studentIndex}`} className="student-row">
                                                                        <td>{student.name}</td>
                                                                        <td>{student.maSo}</td>
                                                                        <td>{student.groupStudent != 'null' ? student.groupStudent : <i>Làm một mình</i>}</td>
                                                                        <td>
                                                                            <div onClick={() => handleDelete(student)} className="center-button btn btn-warning">
                                                                                Xóa
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                ))
                                                        ) : (
                                                            <i>Chưa có sinh viên đăng ký</i>
                                                        )}

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div> */}
                                        </>
                                    ))}
                                </table >
                            </div>
                        </>
                    )}
                </div>
            </div >
        </>
    );
};
export default HeadProject;
