import "./Users.scss"
import React, { useEffect, useState } from "react";
import { fetchAllUsser, deletuser } from "../../services/userServer";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import ModalDelete from "./ModalDelete";
import ModalUser from "./ModalUser";
import { UserContext } from '../../context/userContext';
import 'font-awesome/css/font-awesome.min.css';
const Users = (props) => {
    const { user } = React.useContext(UserContext);
    const [listUser, setListUser] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
    //modal delete  
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataMoldal, setDataModal] = useState({});

    // modal update
    const [isShowModalUser, setIsShowModalUser] = useState(false)
    const [actionModalUser, setActionModalUser] = useState("CREATE");
    const [dataModalUser, setDataModalUser] = useState({})
    useEffect(() => {
        fetchUsser();

    }, [currentPage])


    useEffect(() => {
        console.log("Check accounttttt", user)

    }, [])





    const fetchUsser = async () => {
        let response = await fetchAllUsser(currentPage, currentLimit);
        // console.log("Check respone", response)
        if (response && response.EC === 0) {
            setTotalPages(response.DT.totalPages)
            setListUser(response.DT.users)

        }
    }
    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1);
    };


    const handleDeleteUser = async (user) => {
        setDataModal(user)
        setIsShowModalDelete(true)
    }
    const handleClose = () => {
        setDataModal({})
        setIsShowModalDelete(false)
    }
    const conformDeleteUser = async () => {
        let response = await deletuser(dataMoldal);
        if (response && response.EC === 0) {
            toast.success(response.EM)
            setIsShowModalDelete(false)
            await fetchUsser()
        } else {
            toast.error(response.EM)
        }
    }

    const onHideModalUser = async () => {
        setIsShowModalUser(false)
        setDataModalUser({})
        await fetchUsser()

    }

    const handleEditUser = (user) => {
      //  console.log("Check user", user)
        setActionModalUser("UPDATE")
        setDataModalUser(user)
        setIsShowModalUser(true)

    }
    const handlRefresh = () => {
        window.location.reload();
    }
    return (
        <>

            <div className="container">
                <div className="manage-users-container">
                    <div className="user-header">
                        <div className="title mt-3">
                            <h3>Table Users</h3>
                        </div>
                        <div className="actions my-3">
                            <button className="btn btn-success" onClick={() => handlRefresh()}> <i class="fa fa-refresh bd "></i>Refresh</button>
                            <button className="btn btn-primary"
                                onClick={() => {
                                    setIsShowModalUser(true);
                                    setActionModalUser("CREATE");
                                }}><i class="fa fa-plus-square bd"></i>Add new user</button>
                        </div>
                    </div>
                    <div className="user-body">
                        <table className="table table-bordered table-hover">

                            <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">ID</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">UserName</th>
                                    <th scope="col">Group</th>
                                    <th >Action</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    listUser && listUser.length > 0 ?
                                        <>
                                            {listUser.map((item, index) => {
                                                return (
                                                    <tr key={`row-${index}`}>
                                                        <td>{(currentPage - 1) * currentLimit + index + 1}</td>
                                                        <td>{item.id}</td>
                                                        <td>{item.email}</td>
                                                        <td>{item.maSo}</td>
                                                        <td>{item.Group ? item.Group.name : ''}</td>
                                                        <td>
                                                            <button className="btn btn-warning mx-3" onClick={() => handleEditUser(item)}><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                                                            <button className="btn btn-danger " onClick={() => handleDeleteUser(item)}><i class="fa fa-trash" aria-hidden="true"></i></button>
                                                        </td>
                                                    </tr>
                                                )
                                            }

                                            )}
                                        </>
                                        :
                                        <>
                                            <tr>
                                                <td>Not found user</td>
                                            </tr>
                                        </>
                                }

                            </tbody>
                        </table>

                    </div>
                    {
                        totalPages > 0 &&
                        <div className="user-footer">
                            <ReactPaginate
                                nextLabel="next >"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={3}
                                marginPagesDisplayed={4}
                                pageCount={totalPages}
                                previousLabel="< previous"
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                breakLabel="..."
                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                containerClassName="pagination"
                                activeClassName="active"
                                renderOnZeroPageCount={null}
                            />
                        </div>
                    }

                </div>
            </div>
            <ModalDelete
                show={isShowModalDelete}
                handleClose={handleClose}
                conformDeleteUser={conformDeleteUser}
                dataMoldal={dataMoldal}
            />
            <ModalUser
                onHide={onHideModalUser}
                dataModalUser={dataModalUser}
                show={isShowModalUser}
                action={actionModalUser} />

        </>
    )
}
export default Users;