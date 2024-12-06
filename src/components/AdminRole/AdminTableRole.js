import { useEffect, useState, forwardRef, useRef, useImperativeHandle } from "react";
import { fetchAllRole, deletRole } from '../../services/roleService'
import { toast } from "react-toastify";
import swal from 'sweetalert';

const AdminTableRole = forwardRef((props, ref) => {

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
        swal("Bạn có chắc chắn về hành động của mình ?", {
            buttons: ["Không!", "Có!"],
        })
            .then(async (willUnregister) => {
                if (willUnregister) {
                    let data = await deletRole(role)
                    if (data && +data.EC === 0) {
                        await getALLRole()
                        toast.success("Xoá quyền thành công")
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
            <div className="admin-table-role table-responsive">
                <table className="table table-bordered table-hover text-center">
                    <thead>
                        <tr>
                            <th  scope="col">ID</th>
                            <th scope="col">URL</th>
                            <th scope="col">Mô tả</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {listRole && listRole.length > 0 ? (
                            listRole.map((item, index) => (
                                <tr key={`row-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.url}</td>
                                    <td>{item.description}</td>
                                    <td>
                                        <button
                                            className="btn btn-danger action-btn"
                                            onClick={() => handleDeleteRole(item)}
                                        >
                                            <i className="fa fa-trash" aria-hidden="true"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4}>No roles found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )



})
export default AdminTableRole;