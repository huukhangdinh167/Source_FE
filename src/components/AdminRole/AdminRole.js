import './Roke.scss'
import { useEffect, useState, useRef } from 'react'
import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid';
import { toast } from "react-toastify";
import { createNewRole } from '../../services/roleService';
import AdminTableRole from './AdminTableRole';


const AdminRole = (props) => {
    const childRef = useRef();
    const dataChildefault = { url: '', description: '', invalidurl: true }

    const [listchild, setListchild] = useState({
        child1: dataChildefault
    })
    const handleOnChange = (name, value, key) => {
        let _listchild = _.cloneDeep(listchild)
        _listchild[key][name] = value
        if (value && name === 'url') {
            _listchild[key]['invalidurl'] = true
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

            return child && !child.url
        })
        if (!invalObj) {
            //call api
            let data = builDataToPersist()
            let res = await createNewRole(data)
            if (res && res.EC === 0) {
                toast.success(res.EM)
                // console.log(childRef)
                childRef.current.fetchListRoleAgain()
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
            toast.warning("Url is empty")
        }


    }
    const builDataToPersist = () => {
        let _listchild = _.cloneDeep(listchild)
        let results = [];
        Object.entries(_listchild).map(([key, child], index) => {
            results.push({
                url: child.url,
                description: child.description
            })

        })
        return results;
    }
    return (

        <div className='role-container'>
            <div className='container'>
                <div className='adding-role mt-4'>
                    <div className='title-role'><h4>Add new role...</h4></div>
                    <div className=' role-parent'>
                        {Object.entries(listchild).map(([key, value], index) => {
                            return (

                                <div className='row role-child' key={`child-${key}`}>
                                    <div className={`col-5 form-group ${key}`}>
                                        URL <input type='text' className={value.invalidurl ? ' form-control' : ' form-control is-invalid'}
                                            value={value.url}
                                            onChange={(event) => { handleOnChange('url', event.target.value, key) }} />
                                    </div>
                                    <div className='col-5 form-group'>
                                        DESCRIPTION <input type='text' className=' form-control'
                                            value={value.description}
                                            onChange={(event) => { handleOnChange('description', event.target.value, key) }} />

                                    </div>
                                    <div className='col-2 mt-4 action'>
                                        <i class="fa fa-plus-square bd add" onClick={() => handleAddNewInput()}></i>
                                        {index >= 1 && <i class="fa fa-trash delete" onClick={() => handleDelete(key)} ></i>}
                                    </div>
                                </div>

                            )
                        })
                        }
                    </div>
                    <div className='row'>
                        <div className='col-10'></div>
                        <div className='col-2'>
                            <button onClick={() => handlSave()} className='btn btn-success mt-5 '>Save</button>
                        </div>

                    </div>

                </div>
                <hr />
                <div className='mt-3'>
                    <h4>
                        List Role
                    </h4>
                    <AdminTableRole ref={childRef} />
                </div>

            </div>

        </div>

    )

}
export default AdminRole