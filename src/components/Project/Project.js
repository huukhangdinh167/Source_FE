
import './Project.scss'
import { useEffect, useState, forwardRef, useRef, useImperativeHandle } from "react";
import { fetchAllProject } from '../../services/studentService'
import { toast } from "react-toastify";



const Project = () => {
    const [listProject, setListRole] = useState()

    useEffect(() => {
        getALLProject()
    }, [])


    const getALLProject = async () => {
        let data = await fetchAllProject()
        if (data && +data.EC === 0) {
            setListRole(data.DT)
        }
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
                <div className="mt-3"><h4>List project</h4></div>
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
                                listProject && listProject.length > 0 ?
                                    <>
                                        {listProject.map((item, index) => {
                                            return (
                                                <tr  key={`row-${index}`}>
                                                    <td>{item.id}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.description}</td>
                                                    <td> {item.require}</td>
                                                    <td>{item.knowledgeSkills}</td>
                                                    <td>{item.instuctor}</td>
                                                    <td className="center-button"><div className="btn btn-success butondangki">Đăng kí</div>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </>
                                    :
                                    <>
                                        <tr>
                                            <td colSpan={4}>Not found Project</td>
                                        </tr>
                                    </>
                            }


                        </tbody>
                    </table>
                </div>
            </div>
        </>)


}

export default Project;