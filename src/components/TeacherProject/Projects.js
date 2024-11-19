
import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { deleteProject, fetchAllProject } from "../../services/projectService"
import './Project.scss';  // Import file CSS
import { toast } from "react-toastify";
import ModalDelete from "./ModalDelete";
import ModalProject from "./ModalProject"
import { UserContext } from "../../context/userContext";


//--------------------------Xem Project của mình--------------------------
const Projects = (props) => {
    const { user } = React.useContext(UserContext);
    const [listProjects, setListProjects] = useState([]);


    useEffect(() => {
        fetchProjects(user);
    }, []);


    const fetchProjects = async (user) => {
        // if (!user || !user.maSo) {
        //     console.error("Invalid user or user.maSo");
        //     toast.error("User information is missing.");
        //     return;
        // }

        let data = await fetchAllProject(user);
        if (data && +data.EC === 0) {
            setListProjects(data.DT);
        } else {
            toast.error(data.EC);
        }
    }

    //---------------------------Tạo/ Cập nhật project của mình---------------------------
    const [isShowModalProject, setIsShowModalProject] = useState(false);

    //create
    const [actionModalProject, setActionModalProject] = useState("CREATE");
    //update
    const [dataModalProject, setDataModalProject] = useState({});


    const onHideModalProject = async () => {
        setIsShowModalProject(false);
        setDataModalProject({});
        await fetchProjects(user);
    }

    const handleEditProject = (user) => {
        // console.log("check data user", user)
        setActionModalProject("UPDATE");
        setDataModalProject(user);
        setIsShowModalProject(true);
    }

    const handleRefeshPage = async () => {
        await fetchProjects(user);
    }


    //delete

    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataModel, setDataModel] = useState({});


    const confirmDeleteProject = async () => {
        console.log("DataModel to delete:", dataModel); // Log để kiểm tra
        let response = await deleteProject(dataModel);
        if (response && response.EC === 0) {
            toast.success(response.EM);
            await fetchProjects(user);
            setIsShowModalDelete(false);
        } else {
            toast.error(response.EM);
        }
    }

    const handleClose = () => {
        setIsShowModalDelete(false);
        setDataModel({});
    }

    const handleDeleteProject = (user) => {
        setDataModel(user);
        setIsShowModalDelete(true);

    }






    return (
        <>
            <div className="container">

                <div className="manage-projects-container">
                    <div className="project-header">
                        <div className="title">
                            <h3>
                                Quản lý Đồ án
                            </h3>
                        </div>
                        <div className="action">
                            <button className="btn btn-success  mb-3" onClick={handleRefeshPage}><i className="fa fa-refresh"></i> Refresh</button>
                            <button className="btn btn-primary mx-3 mb-3"
                                onClick={() => { setIsShowModalProject(true); setActionModalProject("CREATE") }}>
                                <i className="fa fa-project-plus" ></i> Add new Project
                            </button>
                        </div>
                    </div>
                    <div className="project-body">
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th style={{ width: '50px' }}>ID</th>
                                    <th style={{ width: '150px' }}>Name</th>
                                    <th style={{ width: '250px' }}>Description</th>
                                    <th style={{ width: '200px' }}>Require</th>
                                    <th style={{ width: '200px' }}>Knowledge Skills</th>
                                    <th style={{ width: '150px' }}>Instructor</th>
                                    <th style={{ width: '150px' }}>Status</th>
                                    <th style={{ width: '120px' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    listProjects && listProjects.length > 0 ?
                                        <>
                                            {listProjects.map((item, index) => {
                                                return (
                                                    <tr key={`row-${index}`}>

                                                        <td>{item.id}</td>
                                                        <td>{item.name}</td>
                                                        <td style={{ width: '300px' }}>{item.description}</td>
                                                        <td style={{ width: '300px' }}>{item.require}</td>
                                                        <td style={{ width: '300px' }}>{item.knowledgeSkills}</td>
                                                        <td style={{ width: '300px' }}>{item.instuctor}</td>
                                                        <td style={{ width: '300px' }} >{+item.status === 0 ? "Đang chờ phê duyệt" : "Đã xét duyệt"}</td>
                                                        <td style={{ width: '150px', textAlign: 'center', whiteSpace: 'nowrap' }}>
                                                            <button className="btn btn-warning btn-sm mx-1"
                                                                onClick={() => handleEditProject(item)}
                                                            >
                                                                <i className="fa fa-pencil"></i>
                                                            </button>
                                                            <button className="btn btn-danger btn-sm mx-1"
                                                                onClick={() => handleDeleteProject(item)}
                                                            >
                                                                <i className="fa fa-trash"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )

                                            })}
                                        </>
                                        :
                                        <><tr><td>Not found any Projects</td></tr></>
                                }
                            </tbody>
                        </table>

                    </div>
                </div>

            </div>

            <ModalDelete
                show={isShowModalDelete}
                handleClose={handleClose}
                confirmDeleteProject={confirmDeleteProject}
                dataModel={dataModel}
            />



            <ModalProject
                // title={" Create New User "}
                onHide={onHideModalProject}
                show={isShowModalProject}
                onProjectAdded={() => fetchProjects(user)} // Dùng arrow function
                action={actionModalProject}
                dataModalProject={dataModalProject}
            />

        </>
    )
}

export default Projects;