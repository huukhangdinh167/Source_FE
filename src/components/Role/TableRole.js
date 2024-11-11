import { useEffect, useState, forwardRef, useRef, useImperativeHandle } from "react";
import { fetchAllRole, deletRole } from '../../services/roleService'
import { toast } from "react-toastify";
import swal from 'sweetalert';

const TableRole = forwardRef((props, ref) => {

    const [listRole, setListRole] = useState()
    useEffect(() => {
        getALLRole()
    }, [])

    useImperativeHandle(ref, () => ({

        fetchListRoleAgain() {
            getALLRole()
        }

    }));

    const getALLRole = async () => {
        let data = await fetchAllRole()
        if (data && +data.EC === 0) {
            setListRole(data.DT)
        }
    }

    const handleDeleteRole = async (role) => {
        swal("Are you sure you want to do this?", {
            buttons: ["No!", "Yes!"],
        })
            .then(async (willUnregister) => {
                if (willUnregister) {
                    let data = await deletRole(role)
                    if (data && +data.EC === 0) {
                        await getALLRole()
                        toast.success("Delete role success")
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
            <table className="table table-bordered table-hover">

                <thead>
                    <tr>

                        <th scope="col">ID</th>
                        <th scope="col">URL</th>
                        <th scope="col">DESCRIPTION</th>

                        <th >Action</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        listRole && listRole.length > 0 ?
                            <>
                                {listRole.map((item, index) => {
                                    return (
                                        <tr key={`row-${index}`}>

                                            <td>{item.id}</td>
                                            <td>{item.url}</td>
                                            <td>{item.description}</td>

                                            <td>
                                                {/* <button className="btn btn-warning mx-3" onClick={() => handleEditUser(item)}><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button> */}
                                                <button className="btn btn-danger " onClick={() => handleDeleteRole(item)}><i class="fa fa-trash" aria-hidden="true"></i></button>
                                            </td>
                                        </tr>
                                    )
                                }

                                )}
                            </>
                            :
                            <>
                                <tr>
                                    <td colSpan={4}>Not found Role</td>
                                </tr>
                            </>
                    }

                </tbody>
            </table>
        </>)



})
export default TableRole;