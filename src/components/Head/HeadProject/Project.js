import swal from 'sweetalert';
import './Project.scss'
import { useEffect, useState, useContext } from "react";
import { headGetProjectandUser, headDeleteProjct, headHuyDangKi, headGetProjectApprove, headApproveFroject } from '../../../services/HeadService'
import React from 'react';
import { UserContext } from '../../../context/userContext';
import { toast } from "react-toastify";
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
        swal("Are you sure want approve?", {
            buttons: ["No!", "Yes!"],
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

    const handleDeletProject = async (item) => {
        swal("Are you sure you want to delete?", {
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
        swal(`Are you sure delete student ${student.maSo} from project ${student.projectId}  ?`, {
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
                    <h4>Danh sách đề tài cần duyệt:</h4>
                </div>
                <div className='mt-3 text-center'>
                    {listProjectApprove.length > 0 ? (
                        <>
                            <div className="mt-3 text-center">
                                <table className="table table-bordered table-hover mt-5">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>NAME PROJECT</th>
                                            <th>INSTRUCTOR</th>
                                            <th>KNOWLEDGE SKILLS</th>
                                            <th>REQUIRED</th>
                                            <th>DESCRIPTION</th>
                                            <th>Action</th>
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
                                                    <td className='center-button'><div onClick={() => handleApproveProject(item)} className='  btn btn-success'>Duyệt</div></td>
                                                
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


                <div className="mt-3">
                    <h4>Danh sách đề tài đã duyệt:</h4>
                </div>
                <div className="">
                    {listProject && (
                        <>


                            <div className="mt-1 text-center">

                                {listProject.length > 0 && listProject.map((item, index) => (
                                    <>
                                        <table className="table table-bordered table-hover mt-3">
                                            <thead>
                                            <tr>
                                                    <th style={{ width: "5%" }} >ID</th>
                                                    <th style={{ width: "20%" }}>NAME PROJECT</th>
                                                    <th style={{ width: "13%" }}>INSTRUCTOR</th>
                                                    <th style={{ width: "30%" }}>KNOWLEDGE SKILLS</th>
                                                    <th style={{ width: "25%" }}>REQUIRED</th>
                                                    {/* <th>STUDENT NAME</th> */}
                                                    <th style={{ width: "7%" }}>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr key={`project-${index}`}>
                                                    <td>{item.id}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.instuctor}</td>
                                                    <td>{item.knowledgeSkills}</td>
                                                    <td>{item.require}</td>

                                                    <td className='center-button'><div onClick={() => handleDeletProject(item)} className='  btn btn-danger'>Xóa</div></td>
                                                    {/* <td colSpan="2" className="text-center">
                                                        {item.Userstudents.length === 0 && <em>Chưa có sinh viên đăng ký</em>}
                                                    </td> */}
                                                </tr>
                                                <tr>

                                                </tr>
                                            </tbody>

                                        </table >
                                        <div className='row'>
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
                                        </div>
                                    </>
                                ))}


                            </div>
                        </>
                    )}
                </div>
            </div >
        </>
    );
};

export default HeadProject;
