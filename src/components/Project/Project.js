import swal from 'sweetalert';
import './Project.scss'
import { useEffect, useState, forwardRef, useRef, useImperativeHandle } from "react";
import { fetchAllProject, fetchAllProjectRegister, dangKiProject, huyDangKiProject } from '../../services/studentService'
import { toast } from "react-toastify";
import React from 'react';
import { UserContext } from '../../context/userContext';


const Project = () => {
    const [listProject, setListRole] = useState()

    const defautlisProjectRegister = {
        dangki: true,
        id: '',
        name: '',
        description: '',
        require: '',
        knowledgeSkills: '',
        instuctor: '',

    }
    const [lisProjectRegister, setListProjectRegister] = useState(defautlisProjectRegister)
    const { user } = React.useContext(UserContext);
    useEffect(() => {
        getALLProject(user)
    }, [])
    const getALLProjectRegister = async (user) => {
        let data = await fetchAllProjectRegister(user)
        if (data && +data.EC === 0) {
            let dataDT = data.DT
            setListProjectRegister({ ...dataDT, dangki: false })
        }
    }
    const getALLProject = async (user) => {
        let data = await fetchAllProject(user)
        if (data && +data.EC === 0) {
            setListRole(data.DT)
        }
        if (+data.EC === 2) {
            getALLProjectRegister(user)
        }
    }

    const hanldeDangki = async (item, user) => {
        swal("Are you sure you want to do this?", {
            buttons: ["No!", "Yes!"],
        }) 
        .then(async (willUnregister) =>{
            if (willUnregister){
                let data = await dangKiProject(item, user)
                if (data && +data.EC === 0) {
                    getALLProjectRegister(user)
                    toast.success(data.EM)
        
                } else {
                    toast.error(data.EM)
                }
        
            }else{

            }
        });
        
    }

    const hanldeHuyDangki = async (user, lisProjectRegister) => {
        swal("Are you sure you want to do this?", {
            buttons: ["No!", "Yes!"],
        })
            .then(async (willUnregister) => {
                if (willUnregister) {
                    // Người dùng chọn "Có"
                    let data = await huyDangKiProject(user, lisProjectRegister);
                    if (data && +data.EC === 0) {
                        toast.success(data.EM);
                        setListProjectRegister({ ...defautlisProjectRegister, dangki: true });
                        getALLProject(user);
                    }
                } else {
                    // Người dùng chọn "Không"

                }
            });

    }

    // const handleDeleteRole = async (role) => {
    //     let data = await deletRole(role)
    //     if (data && +data.EC === 0) {
    //         await getALLRole()
    //         toast.success("Delete role success")
    //     }
    // }
    return (
        <>
            <div className="container">
                <div className='mt-3'>
                    <div className='mt-3 '>
                        {lisProjectRegister.dangki == false &&
                            <> <h4> Project đã đăng kí</h4>
                                <table className="table table-bordered text-center table-hover mt-3">
                                    <thead>
                                        <tr>

                                            <th scope="col" style={{ width: "5%" }}>ID</th>
                                            <th scope="col" style={{ width: "15%" }}>NAME PROJECT</th>
                                            <th scope="col" style={{ width: "25%" }}>DESCRIPTION</th>
                                            <th scope="col" style={{ width: "15%" }}>REQUIRED</th>
                                            <th scope="col" style={{ width: "20%" }}>KNOWLEDGE SKILLS</th>
                                            <th scope="col" style={{ width: "10%" }}>INTRUSTOR</th>
                                            <th scope="col" style={{ width: "10%" }}>Action</th>

                                        </tr>

                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{lisProjectRegister.id}</td>
                                            <td>{lisProjectRegister.name}</td>
                                            <td>{lisProjectRegister.description}</td>
                                            <td>{lisProjectRegister.require}</td>
                                            <td>{lisProjectRegister.knowledgeSkills}</td>
                                            <td>{lisProjectRegister.instuctor}</td>
                                            <td className="center-button "><div onClick={() => hanldeHuyDangki(user, lisProjectRegister)} className="btn btn-warning da-dang-ki">Hủy đăng kí</div>
                                                {/* // */}
                                            </td>


                                        </tr>
                                    </tbody>
                                </table>
                                <div className='mt-5'> </div>
                                <div className='text-center mt-3'><h6>Danh sách sinh viên cùng đăng kí đề tài</h6></div>
                                <table className="table table-bordered text-center table-hover mt-3">
                                    <thead>
                                        <tr>

                                            <th scope="col" style={{ width: "5%" }}>STT</th>
                                            <th scope="col" style={{ width: "15%" }}>NAME</th>
                                            <th scope="col" style={{ width: "25%" }}>MSSV</th>
                                            <th scope="col" style={{ width: "15%" }}>Class</th>
                                            <th scope="col" style={{ width: "20%" }}> GVHD</th>
                                            <th scope="col" style={{ width: "10%" }}>Nhom</th>
                                            <th scope="col" style={{ width: "10%" }}>Action</th>

                                        </tr>

                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Dinh Huu Khang</td>
                                            <td>2004</td>
                                            <td>DHhttt16C</td>
                                            <td>NguyenHuuQuang</td>
                                            <td>--</td>
                                            <td className="center-button "><div className="btn btn-info dang-ki-nhom">Chọn</div>
                                            </td>


                                        </tr>
                                    </tbody>
                                </table>
                            </>
                        }
                    </div>
                    <div className='mt-3'>
                        {lisProjectRegister.dangki == true &&
                            <>
                                <div className="mt-3"><h4>List project:</h4>
                                </div>
                                <div className="mt-3 text-center">
                                    <table className="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th scope="col" style={{ width: "5%" }}>ID</th>
                                                <th scope="col" style={{ width: "15%" }}>NAME PROJECT</th>
                                                <th scope="col" style={{ width: "25%" }}>DESCRIPTION</th>
                                                <th scope="col" style={{ width: "15%" }}>REQUIRED</th>
                                                <th scope="col" style={{ width: "20%" }}>KNOWLEDGE SKILLS</th>
                                                <th scope="col" style={{ width: "10%" }}>INTRUSTOR</th>
                                                <th scope="col" style={{ width: "10%" }}>Action</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                listProject && listProject.length > 0 &&
                                                <>
                                                    {listProject.map((item, index) => {
                                                        return (
                                                            <tr key={`row-${index}`}>
                                                                <td>{item.id}</td>
                                                                <td>{item.name}</td>
                                                                <td>{item.description}</td>
                                                                <td> {item.require}</td>
                                                                <td>{item.knowledgeSkills}</td>
                                                                <td>{item.instuctor}</td>
                                                                <td className="center-button"><div onClick={() => hanldeDangki(item, user)} className="btn btn-success butondangki">Đăng kí</div>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
                                                </>

                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        }
                    </div>

                </div>



            </div>
        </>)


}

export default Project;