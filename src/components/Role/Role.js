import './Role.scss'
import { useEffect, useState } from 'react'
import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid';
const Role = (props) => {

    const [listchild, setListchild] = useState({
        child1: { url: '', description: '' }
      
    })
    
    useEffect(() => {

        Object.entries(listchild).map(([key, value]) => {
            // console.log(key, value)
        })
        

    }, [])

    const handleOnChange = (name, value, key) => {
        let _listchild = _.cloneDeep(listchild)
        _listchild[key][name] = value
        setListchild(_listchild)
    }
    const handleAddNewInput =()=>{
        let _listchild = _.cloneDeep(listchild)
        _listchild[`child-${uuidv4()}`] = {
            url: '',
            description: ''
        };
        setListchild(_listchild)
    }
    const handleDelete =(index) =>{
        let _listchild = _.cloneDeep(listchild)
        delete _listchild[index]; 
        setListchild(_listchild)
    }
    return (
        <>
            <div className='role-container'>
                <div className='container'>
                    <div className='mt-4'>
                        <div className='title-role'><h4>Add new role...</h4></div>
                        <div className=' role-parent'>
                            {Object.entries(listchild).map(([key, value], index) => {
                                return (

                                    <div className='row role-child' key={`child-${key}`}>
                                        <div className={`col-5 form-group ${key}`}>
                                            URL <input type='text' className=' form-control'
                                                value={value.url} 
                                                onChange={(event) => { handleOnChange('url', event.target.value, key) }} />
                                        </div>
                                        <div className='col-5 form-group'>
                                            DESCRIPTION <input type='text' className=' form-control'
                                                value={value.description} 
                                                onChange={(event) => { handleOnChange('description', event.target.value, key) }} />

                                        </div>
                                        <div className='col-2 mt-4 action'>
                                            <i class="fa fa-plus-square bd add" onClick={()=> handleAddNewInput() }></i>
                                          {index >=1 && <i class="fa fa-trash delete" onClick={()=>handleDelete(key)} ></i>}
                                        </div>
                                    </div>

                                )
                            })
                            }
                        </div>
                        <div className='row'>
                            <div className='col-10'></div>
                            <div className='col-2'>
                                <button className='btn btn-warning mt-5 '>Save</button>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>
    )

}
export default Role