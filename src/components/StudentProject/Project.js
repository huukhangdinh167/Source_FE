import swal from 'sweetalert';
import './Project.scss'
import { useEffect, useState, forwardRef, useRef, useImperativeHandle } from "react";
import {
    fetchAllProject, cancelchooseGroup, fetchAllProjectRegister, dangKiProject,
    huyDangKiProject, fetchAllUserRegiterProject, chooseGroup
} from '../../services/studentService'
import { toast } from "react-toastify";
import React from 'react';
import { UserContext } from '../../context/userContext';


const Project = () => {
    const [listProject, setListRole] = useState()
    const [listUserRegisterProject, setListUserRegisterProject] = useState()
    const defautlisProjectRegister = {
        dangki: true,
        id: '',
        name: '',
        description: '',
        require: '',
        knowledgeSkills: '',
        instuctor: '',
    }

    const [choosegroup, setChooseGroup] = useState()

    const [lisProjectRegister, setListProjectRegister] = useState(defautlisProjectRegister)
    const { user } = React.useContext(UserContext);
    useEffect(() => {
        getALLProject(user)

    }, [])

    useEffect(() => {
        if (listUserRegisterProject && user) {
            // Kiểm tra điều kiện để cập nhật choosegroup
            const foundItem = listUserRegisterProject.find(
                item => item.maSo === user.maSo && item.groupStudent !== "null"
            );

            setChooseGroup(foundItem === undefined);
        }
        console.log("check", listUserRegisterProject)
    }, [listUserRegisterProject, user]);

    // hàm random mã group 
    let previousNumber = null;
    const getUniqueRandom = (min, max) => {
        let randomNumber;
        do {
            randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        } while (randomNumber === previousNumber);

        previousNumber = randomNumber;
        return randomNumber;
    }

    const getALLProjectRegister = async (user) => {
        let data = await fetchAllProjectRegister(user)
        if (data && +data.EC === 0) {
            let dataDT = data.DT
            setListProjectRegister({ ...dataDT, dangki: false })
            let dataaa = await fetchAllUserRegiterProject(data.DT)
            if (dataaa && +dataaa.EC === 0) {
                setListUserRegisterProject(dataaa.DT)
            }



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
        swal("Bạn có chắc muốn đăng kí đề tài này ?", {
            buttons: ["Không!", "Có!"],
        })
            .then(async (willUnregister) => {
                if (willUnregister) {
                    let data = await dangKiProject(item, user)
                    if (data && +data.EC === 0) {
                        getALLProjectRegister(user)
                        toast.success(data.EM)

                    } else {
                        toast.error(data.EM)
                    }

                } else {

                }
            });

    }

    const hanldeHuyDangki = async (user, lisProjectRegister) => {
        swal("Bạn có muốn huỷ đăng kí hay không", {
            buttons: ["Không!", "Có!"],
        })
            .then(async (willUnregister) => {
                if (willUnregister) {

                    let data = await huyDangKiProject(user, lisProjectRegister);
                    if (data && +data.EC === 0) {
                        await handleHuyNhom2(foundGroupStudent())
                        toast.success(data.EM);
                        setListProjectRegister({ ...defautlisProjectRegister, dangki: true });
                        await getALLProject(user);
                    }
                } else {
                    // Người dùng chọn "Không"

                }
            });
    }

    const handleChonNhom = async (ortherST, mystudent, groupST) => {
        swal("Bạn có chắc muốn hợp tác với sinh viên này không?", {
            buttons: ["Không!", "Có!"],
        })
            .then(async (willUnregister) => {
                if (willUnregister) {
                    // Người dùng chọn "Có"
                    let data = await chooseGroup(ortherST, mystudent, groupST)
                    if (+data.EC == 0) {
                        toast.success(data.EM)

                        await getALLProjectRegister(user)
                        //  await  setChooseGroup(false)
                        // 

                    } else {
                        toast.error(data.EM)
                    }
                } else {
                    // Người dùng chọn "Không"
                }
            });

    }


    const handleHuyNhom = async (groupStudent) => {
        swal("Bạn có muốn huỷ nhóm hiện tại hay không ?", {
            buttons: ["Không!", "Có!"],
        })
            .then(async (willUnregister) => {
                if (willUnregister) {
                    // Người dùng chọn "Có"
                    let data = await cancelchooseGroup(groupStudent)
                    if (+data.EC === 0) {
                        toast.success(data.EM)
                        await getALLProjectRegister(user)
                    } else {
                        toast.error(data.EM)
                    }
                } else {
                    // Người dùng chọn "Không"

                }
            });

    }

    const handleHuyNhom2 = async (groupStudent) => {
        let data = await cancelchooseGroup(groupStudent)
        if (+data.EC === 0) {
            // toast.success(data.EM)
            //  await getALLProjectRegister(user)
        }
    }


    const foundGroupStudent = () => {
        let foundItem = listUserRegisterProject.find(
            item => item.maSo === user.maSo
        );
        return foundItem.groupStudent
    }// swal("Are you sure you want to do this?", {
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
                <div className='mt-3'>
                    <div className='mt-3 '>
                        {lisProjectRegister.dangki == false &&
                            <> <h4> Project đã đăng kí</h4>
                                <table className="table table-bordered text-center table-hover mt-3">
                                    <thead>
                                        <tr>

                                            <th scope="col" style={{ width: "5%" }}>ID</th>
                                            <th scope="col" style={{ width: "15%" }}>TÊN ĐỀ TÀI</th>
                                            <th scope="col" style={{ width: "25%" }}>MÔ TẢ</th>
                                            <th scope="col" style={{ width: "15%" }}>YÊU CẦU</th>
                                            <th scope="col" style={{ width: "20%" }}>KIẾN THỨC</th>
                                            <th scope="col" style={{ width: "10%" }}>GVHD</th>
                                            <th scope="col" style={{ width: "14%" }}></th>

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
                                            <td className="center-button "><div onClick={() => hanldeHuyDangki(user, lisProjectRegister)} className="btn px-0 btn-warning da-dang-ki">Hủy đăng kí</div>
                                                {/* // */}
                                            </td>


                                        </tr>
                                    </tbody>
                                </table>
                                <div className='mt-5'> </div>
                                <div className='text-center mt-3'><h6>Danh sách sinh viên cùng đăng kí đề tài</h6></div>
                                <table className="table table-bordered text-center table-hover mt-3">
                                    <thead>
                                        <tr><th scope="col" style={{ width: "5%" }}>STT</th>
                                            <th scope="col" style={{ width: "15%" }}>TÊN</th>
                                            <th scope="col" style={{ width: "25%" }}>MSSV</th>
                                            <th scope="col" style={{ width: "15%" }}>LỚP</th>
                                            <th scope="col" style={{ width: "20%" }}>MÃ ĐỀ TÀI</th>
                                            <th scope="col" style={{ width: "10%" }}>NHÓM</th>
                                            <th scope="col" style={{ width: "10%" }}>Chọn nhóm</th>

                                        </tr>

                                    </thead>
                                    <tbody>
                                        {
                                            listUserRegisterProject &&
                                            <>
                                                {listUserRegisterProject.map((item, index) => {
                                                    return (
                                                        <tr key={`row-${index}`}>
                                                            <td>{index}</td>
                                                            <td>{item.name}</td>
                                                            <td>{item.maSo}</td>
                                                            <td>{item.class}</td>
                                                            <td>{item.projectId}</td>
                                                            <td>{item.groupStudent !== "null" ? `${item.groupStudent}` : 'Làm một mình'}</td>
                                                            <td className="center-button ">
                                                                {item.maSo == user.maSo ? '---' : (item.groupStudent !== "null" ? <i>Đã có nhóm</i>
                                                                    : (choosegroup == true ? <div onClick={() => handleChonNhom(item.maSo, user.maSo, getUniqueRandom(20, 8000))}
                                                                        className="btn btn-info dang-ki-nhom">Chọn</div> : ''))}
                                                            </td>


                                                        </tr>
                                                    )
                                                })}
                                            </>
                                        }

                                    </tbody>

                                </table>
                                {
                                    choosegroup === false &&

                                    <div className='row'>
                                        <div className='col-sm-11'>

                                        </div><div onClick={() => handleHuyNhom(foundGroupStudent())} className="btn btn-warning huynhom px-0 col-sm-1 ">
                                            Hủy nhóm

                                        </div>
                                    </div>
                                }

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
                                                <th scope="col" style={{ width: "15%" }}>TÊN ĐỀ TÀI</th>
                                                <th scope="col" style={{ width: "25%" }}>MÔ TẢ</th>
                                                <th scope="col" style={{ width: "15%" }}>YÊU CẦU</th>
                                                <th scope="col" style={{ width: "20%" }}>KIẾN THỨC</th>
                                                <th scope="col" style={{ width: "10%" }}>GVHD</th>
                                                <th scope="col" style={{ width: "10%" }}></th>

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
                                                                </td></tr>
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