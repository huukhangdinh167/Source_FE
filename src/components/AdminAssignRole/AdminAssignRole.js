import './AdminRole.scss'
import { useEffect, useState } from 'react'
import { fetchGroup } from "../../services/userServer";
import { toast } from "react-toastify";
import { fetchAllRole, fetchRoleByRole, assignRoleToGroup } from '../../services/roleService'
import _, { cloneDeep } from 'lodash'
const AdminAssignRole = () => {
    const [userGroup, setUserGroup] = useState([]);
    const [selectGroup, seSeclectGroup] = useState("");
    const [listRole, setListRole] = useState()
    const [assigmentRoleByGroup, setAssigmentByGroup] = useState([])

    const getALLRole = async () => {
        let data = await fetchAllRole()
        if (data && +data.EC === 0) {
            setListRole(data.DT)
        }
    }
    console.log(assigmentRoleByGroup)
    useEffect(() => {
        getGroup()
        getALLRole()

    }, [])

    const getGroup = async () => {
        let res = await fetchGroup();
        if (res && res.EC === 0) {
            setUserGroup(res.DT)

        } else {
            toast.error(res.EM)
        }
    }

    const handleOnChangeGroup = async (value) => {
        seSeclectGroup(value)
        if (value) {
            let res = await fetchRoleByRole(value);
            if (res && +res.EC === 0) {
                let results = builtDataRoleByGroupv(res.DT.Roles, listRole)
                setAssigmentByGroup(results)

            }
        }
    }
    const builtDataRoleByGroupv = (groupRole, allRole) => {
        let result = []
        if (allRole && allRole.length > 0) {
            allRole.map(role => {
                let object = {};
                object.url = role.url;
                object.id = role.id;
                object.description = role.description;
                object.isAssigned = false;
                if (groupRole && groupRole.length > 0) {
                    object.isAssigned = groupRole.some(item => item.url === object.url)

                }
                result.push(object)
            })
        }
        return result;
    }

    const handleSelectRole = (value) => {
        const _assigmentByGroup = _.cloneDeep(assigmentRoleByGroup)
        var foundIndex = _assigmentByGroup.findIndex(item => +item.id == +value);
        if (foundIndex >= 0) {
            _assigmentByGroup[foundIndex].isAssigned = !_assigmentByGroup[foundIndex].isAssigned
        }
        setAssigmentByGroup(_assigmentByGroup)

    }

    const builDataToSave = () => {
        // ví dụ ta sẽ truyền data vào: data = {groupId: 4, groubRoles: [{}, {}, ...]}
        let result = {};
        const _assigmentRoleByGroup = _.cloneDeep(assigmentRoleByGroup);
        result.groupId = selectGroup
        let groubRoles = _assigmentRoleByGroup.filter(item => item.isAssigned === true)
        let finnalGroupRole = groubRoles.map(item => {
            let data = { groupId: +selectGroup, roleId: item.id };
            return data;
        })
        result.groubRoles = finnalGroupRole
        return result;
    }
    const handleSave = async () => {

        let data = builDataToSave()
        let res = await assignRoleToGroup(data)
        if (res && res.EC === 0) {
            toast.success(res.EM)
        } else {
            toast.error(res.EM)
        }
    }

    return (
        <div className='group-role-container'>
            <div className='container'>
                <div className='container'>
                    <h4>Gán quyền vào người dùng</h4>
                    <div className='select-group'>

                        <div className="col-12 col-sm-6 form-group">
                            <label>Chọn nhóm:<span className="text-danger">*</span></label>
                            <select onChange={(event) => handleOnChangeGroup(event.target.value)} className={"form-select"}>
                                <option className="text-danger" key='' value="" >Vui lòng chọn nhóm người dùng</option>
                                {userGroup.length > 0 &&
                                    userGroup.map((item, index) => {
                                        return (
                                            <option key={`group-${index}`} value={item.id} >{item.name}</option>
                                        )
                                    })
                                }


                            </select>
                        </div>
                    </div>
                    <hr />
                    <h4>Gán quyền</h4>
                    <div className="row justify-content-center">
                        <div className="col-sm-7">
                            <div className="table-responsive">
                                <table className="table table-bordered table-hover text-center">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th scope="col" style={{ width: "40%" }}>Các quyền</th>
                                            <th scope="col">Mô tả</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectGroup ? (
                                            <>
                                                {assigmentRoleByGroup && assigmentRoleByGroup.length > 0 ? (
                                                    assigmentRoleByGroup.map((item, index) => (
                                                        <tr key={`list-role-${index}`}>
                                                            <td>
                                                                <div className="form-check d-flex align-items-center">
                                                                    <input
                                                                        className="form-check-input"
                                                                        type="checkbox"
                                                                        value={item.id}
                                                                        id={`list-role${index}`}
                                                                        checked={item.isAssigned}
                                                                        onChange={(event) => handleSelectRole(event.target.value)}
                                                                    />
                                                                    <label
                                                                        className="form-check-label ml-2"
                                                                        htmlFor={`list-role${index}`}
                                                                    >
                                                                        {item.url}
                                                                    </label>
                                                                </div>
                                                            </td>
                                                            <td>{item.description}</td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="2" className="text-center text-muted">
                                                            Nhóm này chưa được phân quyền
                                                        </td>
                                                    </tr>
                                                )}
                                                <tr>
                                                    <td colSpan="2" className="text-right">
                                                        <button
                                                            className="btn btn-success btn-sm btnsave mt-3"
                                                            onClick={handleSave}
                                                        >
                                                            Lưu
                                                        </button>
                                                    </td>
                                                </tr>
                                            </>
                                        ) : (
                                            <tr>
                                                <td colSpan="2" className="text-center text-muted">
                                                    Vui lòng chọn nhóm người dùng
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>









                </div>


            </div>
        </div>
    )
}

export default AdminAssignRole