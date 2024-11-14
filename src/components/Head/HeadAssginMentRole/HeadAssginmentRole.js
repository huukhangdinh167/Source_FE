import './HeadAssignMentRole.scss'
import { useEffect, useState,useContext } from 'react'
import { fetchGroup } from "../../../services/userServer";
import { toast } from "react-toastify";
import { fetchAllRole, fetchRoleByRole, assignRoleToGroup } from '../../../services/roleService'
import _, { cloneDeep } from 'lodash'
import { UserContext } from '../../../context/userContext';
 
// ------------------------Trưởng bộ môn phân quyền sẽ kế thừa từ chức phân quyền của Admin


const HeadAssignRole = () => {
    const { user } = useContext(UserContext);
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
                    <h4>Group-Role</h4>
                    <div className='select-group'>

                        <div className="col-12 col-sm-6 form-group">
                            <label>Selec Group<span className="text-danger">*</span></label>
                            <select onChange={(event) => handleOnChangeGroup(event.target.value)} className={"form-select"}>
                                <option className="text-danger" key='' value="" >Pleas select group.....</option>
                                {userGroup.length > 0 &&
                                    userGroup.filter(item => item.name !== 'Admin' &&  item.name !== 'Department head' )
                                    .map((item, index) => {
                                        return (
                                            <option key={`group-${index}`} value={item.id} >{item.name}</option>
                                        )
                                    })
                                }


                            </select>
                        </div>
                    </div>
                    <hr />
                    <h4>Assigment Role</h4>
                    <div className='row justify-content-center'>
                        <div className='col-sm-7'>
                            <table className='table  table-hover text-center'>
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col" style={{ width: "40%" }}>Role</th>
                                        <th scope="col">Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectGroup && (
                                        <>
                                            {assigmentRoleByGroup && assigmentRoleByGroup.length > 0 ? (
                                                assigmentRoleByGroup.map((item, index) => (
                                                    <tr key={`list-role-${index}`}>
                                                        <td>
                                                            <div className="form-check d-flex  align-items-center">
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
                                                        No roles assigned to this group.
                                                    </td>
                                                </tr>
                                            )}
                                            <tr>
                                                <td colSpan="2" className="text-right">
                                                    <button className="btn btn-success btn-sm btnsave mt-3" onClick={handleSave}>
                                                        Save Changes
                                                    </button>
                                                </td>
                                            </tr>
                                        </>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>









                </div>


            </div>
        </div>
    )
}

export default HeadAssignRole