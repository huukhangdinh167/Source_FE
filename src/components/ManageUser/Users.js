
// import { useEffect } from "react";
import "./Users.scss"
import { useEffect, useState } from "react";
import { fetchAllUsser, deletuser } from "../../services/userServer";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import ModalDelete from "./ModalDelete";
import ModalUser from "./ModalUser";
const Users = (props) => {
    const [listUser, setListUser] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
    useEffect(() => {
        fetchUsser()
    }, [currentPage])
    const fetchUsser = async () => {
        let reponse = await fetchAllUsser(currentPage, currentLimit);
        if (reponse && reponse.data && reponse.data.EC === 0) {
            setTotalPages(reponse.data.DT.totalPages)
            setListUser(reponse.data.DT.users)

        }
    }
    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1);
    };
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataMoldal, setDataModal] = useState({});

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
        if (response && response.data.EC === 0) {
            toast.success(response.data.EM)
            setIsShowModalDelete(false)
            await fetchUsser()
        } else {
            toast.error(response.data.EM)
        }
    }

    return (
        <>

            <div className="container">
                <div className="manage-users-container">
                    <div className="user-header">
                        <div className="title">
                            <h3>Table Users</h3>
                        </div>
                        <div className="actions">
                            <button className="btn btn-success">Refresh</button>
                            <button className="btn btn-primary">Add new user</button>
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
                                                        <td>{index + 1}</td>
                                                        <td>{item.id}</td>
                                                        <td>{item.email}</td>
                                                        <td>{item.username}</td>
                                                        <td>{item.Group ? item.Group.name : ''}</td>
                                                        <td>
                                                            <button className="btn btn-warning mx-3">Edit</button>
                                                            <button className="btn btn-danger " onClick={() => handleDeleteUser(item)}

                                                            >Delete

                                                            </button>
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
            title={"Create New User"}/>
            
        </>
    )
}
export default Users;