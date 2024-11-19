
import { useEffect, useState, forwardRef, useRef, useImperativeHandle } from "react";
import { fetchAllProjectRegister } from '../../services/studentService'

import React from 'react';
import { UserContext } from '../../context/userContext';

import { add } from "lodash";


const Results = () => {
    const { user } = React.useContext(UserContext);
    const defautlisProjectRegister = {
        Project: true,
        id: '',
        name: '',
        description: '',
        require: '',
        knowledgeSkills: '',
        instuctor: '',
    }
    const [lisProjectRegister, setListProjectRegister] = useState(defautlisProjectRegister)
    useEffect(() => {
        addd(user)
     //  console.log(lisProjectRegister)
    }, [])
    const addd = async(user) => {
        let data = await fetchAllProjectRegister(user)
        if (data && +data.EC === 0) {
            let dataDT = data.DT
            setListProjectRegister({...dataDT, Project: false })
        }
    }


    return (
        <>
            <div className="container">
                <table className="table table-bordered text-center table-hover mt-5">
                    <thead>
                        <tr>
                            <th scope="col" style={{ width: "5%" }}>ID</th>
                            <th scope="col" style={{ width: "15%" }}>TÊN ĐỀ TÀI</th>
                            <th scope="col" style={{ width: "25%" }}>MÔ TẢ</th>
                            <th scope="col" style={{ width: "15%" }}>YÊU CẦU</th>
                            <th scope="col" style={{ width: "20%" }}>KIẾN THỨC</th>
                            <th scope="col" style={{ width: "10%" }}>GVHD</th>
                           {/* // <th scope="col" style={{ width: "10%" }}>Status</th> */}

                        </tr>

                    </thead>
                    <tbody>
                        {lisProjectRegister && lisProjectRegister.Project === false ?
                            <>
                            <tr>
                                <td>{lisProjectRegister.id}</td>
                                <td>{lisProjectRegister.name}</td>
                                <td>{lisProjectRegister.description}</td>
                                <td>{lisProjectRegister.require}</td>
                                <td>{lisProjectRegister.knowledgeSkills}</td>
                                <td>{lisProjectRegister.instuctor}</td>
                               
                              

                            </tr>
                            </> : <tr>
                            <td colSpan={6}> <i>Bạn chưa đăng kí đề tài</i></td>
                            </tr>
                        }
                    </tbody>
                </table>
                <div className="results mt-5">
                    <table className="table table-bordered text-center table-hover mt-3">
                        <thead>
                            <tr>

                                <th scope="col" style={{ width: "10%" }}>ID</th>
                                <th scope="col" style={{ width: "10%" }}>GVHD</th>
                                <th scope="col" style={{ width: "10%" }}>GVPB1</th>
                                <th scope="col" style={{ width: "10%" }}>GVPB2</th>
                                <th scope="col" style={{ width: "10%" }}>CTHD</th>
                                <th scope="col" style={{ width: "10%" }}>TK</th>
                                <th scope="col" style={{ width: "10%" }}>UY</th>
                                <th scope="col" style={{ width: "10%" }}>Poster1</th>
                                <th scope="col" style={{ width: "10%" }}>Poster2</th>
                            </tr>

                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td >
                                </td>
                                <td></td>
                                <td></td>

                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
export default Results 