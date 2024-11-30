import "./User.scss"
import React, { useEffect, useState, useRef } from "react";
import { deletuser } from "../../services/userServer";
import { AdminFetchAllUsser, adminCreateNewUser, admindeletuser } from "../../services/AdminService";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import ModalDelete from "./ModalDelete";
import ModalUser from "./ModalUser";
import { UserContext } from '../../context/userContext';
import 'font-awesome/css/font-awesome.min.css';
import { fetchGroup, createNewUser, updateNewUser } from "../../services/userServer";
import bcrypt from 'bcryptjs';

// role 

import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid';

//role
const Users = (props) => {
    const salt = bcrypt.genSaltSync(10);
    const { user } = React.useContext(UserContext);
    const [listUser, setListUser] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(8);
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
        let response = await AdminFetchAllUsser();
        //  console.log("Check respone", response.DT) 
        //  let res = await AdminFetchAllUsser()
        //console.log("Check res", res.DT) 
        if (response && response.EC === 0) {
            setTotalPages(response.DT)
            setListUser(response.DT)

        }
    }
    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1);
    };


    const handleDeleteUser = async (user) => {
        setDataModal(user)
        setIsShowModalDelete(true)
        console.log(user)
    }
    const handleClose = () => {
        setDataModal({})
        setIsShowModalDelete(false)
    }
    const conformDeleteUser = async () => {
        let response = await admindeletuser(dataMoldal);
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

    /// Role 
    const childRef = useRef();
    const dataChildefault = {
        name: '', maSo: '', password: '', groupStudetn: 'null', projectId: 0, invalidpassword: true,
        invalidname: true,
        invalidmaSo: true
    }

    const [listchild, setListchild] = useState({
        child1: dataChildefault

    })

    const handleOnChange = (name, value, key) => {
        let _listchild = _.cloneDeep(listchild)
        _listchild[key][name] = value
        if (value && name === 'name') {
            _listchild[key]['invalidname'] = true
        }
        if (value && name === 'maSo') {
            _listchild[key]['invalidmaSo'] = true
        }
        if (value && name === 'password') {
            _listchild[key]['invalidpassword'] = true
        }
        setListchild(_listchild)
    }
    const handleAddNewInput = () => {
        let _listchild = _.cloneDeep(listchild)
        _listchild[`child-${uuidv4()}`] = dataChildefault
        setListchild(_listchild)
    }
    const handleDelete = (index) => {
        let _listchild = _.cloneDeep(listchild)
        delete _listchild[index];
        setListchild(_listchild)
    }
    const handlSave = async () => {
        let check = true
        let invalObj = Object.entries(listchild).find(([key, child], index) => {

            return child && (!child.password || !child.name || !child.maSo);
        })
        if (!invalObj) {
            //call api
            let data = builDataToPersist()
            let res = await adminCreateNewUser(data)
            if (res && res.EC === 0) {
                toast.success(res.EM)
                fetchUsser();
                setListchild({
                    child1: dataChildefault
                });

            } else {
                toast.error(res.EM)
            }
            //  console.log("chekc dataa", data)
        } else {
            let _listchild = _.cloneDeep(listchild)
            let key = invalObj[0]
            _listchild[key]['invalidurl'] = false
            setListchild(_listchild)
            toast.warning("Value is empty")
        }


    }
    const hashUserPassword = (userPassword) => {
        let hashPassword = bcrypt.hashSync(userPassword, salt);
        return hashPassword;

    }
    const builDataToPersist = () => {
        let _listchild = _.cloneDeep(listchild)
        let results = [];
        Object.entries(_listchild).map(([key, child], index) => {

            results.push({
                name: child.name,
                maSo: child.maSo,
                password: hashUserPassword(child.password),
                groupStudent: "null",
                projectId: "0",
                groupId: 1
            })

        })
        return results;
    }

    /// Role 
    return (
        <>

            <div className="container">
                <div className="manage-users-container">
                    <h4 className="mt-3">Tạo mới giảng viên: </h4>
                    <div className="user-header">
                        <div className="actions my-3">
                            <button className="btn btn-success" onClick={() => handlRefresh()}> <i class="fa fa-refresh bd "></i>Tạo mới</button>
                            <button className="btn btn-primary"
                                onClick={() => {
                                    setIsShowModalUser(true);
                                    setActionModalUser("CREATE");
                                }}><i class="fa fa-plus-square bd"></i>Thêm mới sinh viên</button>
                        </div>
                    </div>

                    <div className="addnew-user">
                        <h4 className="mt-3">Tạo mới sinh viên</h4>
                        <div className='adding-role mt-2'>
                            <div className='title-role'></div>
                            <div className=' role-parent'>
                                {Object.entries(listchild).map(([key, value], index) => {
                                    return (

                                        <div className="row role-container role-child align-items-center" key={`child-${key}`}>
                                            <div className="col-12 col-md-3 form-group">
                                                <label>Tên</label>
                                                <input
                                                    type="text"
                                                    className={`form-control ${value.invalidname ? '' : 'is-invalid'}`}
                                                    value={value.name}
                                                    onChange={(event) => handleOnChange("name", event.target.value, key)}
                                                />
                                            </div>
                                            <div className="col-12 col-md-3 form-group">
                                                <label>MSSV</label>
                                                <input
                                                    type="text"
                                                    className={`form-control ${value.invalidmaSo ? '' : 'is-invalid'}`}
                                                    value={value.maSo}
                                                    onChange={(event) => handleOnChange("maSo", event.target.value, key)}
                                                />
                                            </div>
                                            <div className="col-12 col-md-3 form-group">
                                                <label>Mật khẩu</label>
                                                <input
                                                    type="text"
                                                    className={`form-control ${value.invalidpassword ? '' : 'is-invalid'}`}
                                                    value={value.password}
                                                    onChange={(event) => handleOnChange("password", event.target.value, key)}
                                                />
                                            </div>
                                            <div className='col-2 mt-4 d-flex justify-content-between align-items-center action'>
                                                <i class="fa fa-plus-square bd add" onClick={() => handleAddNewInput()}></i>
                                                {index >= 1 && <i class="fa fa-trash delete" onClick={() => handleDelete(key)}></i>}
                                            </div>
                                        </div>
                                    )
                                })
                                }
                            </div>
                            <div className='row'>
                                <div className='col-10'></div>
                                <div className="col-12 col-md-6 d-flex justify-content-end">
                                    <button onClick={() => handlSave()} className="btn btn-success mt-2">Save</button>
                                </div>

                            </div>
                            <div className="title mt-3">
                                <h3>Danh sách người dùng</h3>
                            </div>

                        </div>
                    </div>
                    <div className=" mt-3 user-body">
                        <table className="table table-bordered table-hover text-center">

                            <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">ID</th>
                                    <th scope="col">Tên</th>
                                    <th scope="col">Số điện thoại</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Mã số</th>
                                    <th scope="col">Mật khẩu</th>
                                    <th ></th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    listUser && listUser.length > 0 ?
                                        <>
                                            {listUser.map((item, index) => {
                                                return (
                                                    <tr key={`row-${index}`}>
                                                        <td><b>{(currentPage - 1) * currentLimit + index + 1}</b></td>
                                                        <td>{item.id}</td>
                                                        <td>{item.name}</td>
                                                        <td>{item.phoneNumber ? item.phoneNumber : <i>chưa cập nhật</i>}</td>
                                                        <td>{item.email ? item.email : <i>chưa cập nhật</i>}</td>
                                                        <td>{item.maSo}</td>

                                                        <td>{item.Group ? item.Group.name : ''}</td>
                                                        <td>
                                                            <div className="actions">
                                                                <button
                                                                    className="btn btn-warning btn-sm"
                                                                    onClick={() => handleEditUser(item)}
                                                                >
                                                                    <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                                                                </button>
                                                                <button
                                                                    className="btn btn-danger btn-sm"
                                                                    onClick={() => handleDeleteUser(item)}
                                                                >
                                                                    <i className="fa fa-trash" aria-hidden="true"></i>
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            }

                                            )}
                                        </>
                                        :
                                        <>
                                            <tr>
                                                <td>Không tìm thấy người dùng nào</td>
                                            </tr>
                                        </>
                                }

                            </tbody>
                        </table>

                    </div>
                    {
                        totalPages > 0 &&
                        <>
                            <div className="row justify-content-center">
                                <div className="user-footer d-flex justify-content-center">
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
                            </div>
                        </>

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