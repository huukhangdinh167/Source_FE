import { act, useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { fetchGroup, createNewUser, updateNewUser } from "../../services/userServer";
import { toast } from "react-toastify";
import _, { values } from "lodash";

import bcrypt from 'bcryptjs';
const ModalUser = (props) => {
    
    const salt = bcrypt.genSaltSync(10);
    const { action, dataModalUser } = props
    const deFaultUserData = {
        email: '',
        phoneNumber: '',
        maSo: '',
        password: '',
        name: '',
        group: ''

    }
    const validInputsDefault = {
        email: true,
        phoneNumber: true,
        maSo: true,
        password: true,
        address: true,
        name: true,
        group: true

    }
    const [validInputs, setValidInputs] = useState(validInputsDefault)
    const [userData, setUserData] = useState(deFaultUserData)
    const checkValidateInputs = () => {
        // create user 
        if (action === "UPDATE")
            return true;
        setValidInputs(validInputsDefault);
        // console.log("check user data", userData)
        let arr = ['email', 'phoneNumber', 'password', 'group']
        let check = true;
        for (let i = 0; i < arr.length; i++) {
            if (!userData[arr[i]]) {
                let _validInputs = _.cloneDeep(validInputsDefault);
                _validInputs[arr[i]] = false
                setValidInputs(_validInputs)
                toast.error(`Empty input ${arr[i]}`);
                check = false;
                break;
            }
        }
        return check;

    }
    const handleConfirmUser = async () => {
        let check = checkValidateInputs();
        if (check === true) {
            let res = action === "CREATE" ?
                await createNewUser({ ...userData, groupId: userData['group'] })
                : await updateNewUser({ ...userData, groupId: userData['group'] })
                ;
            console.log("Check respone", res)
            if (res && res.EC === 0) {
                props.onHide()
                setUserData({ ...deFaultUserData, group: userGroup[0].id })
                // nếu muốn không cho edit group 
                // setUserData({ ...deFaultUserData, group: userGroup && userGroup.length > 0 ? userGroup[0].id : '' }) và // getGroup() ở dòng 93 
                toast.success(res.EM);
               // window.location.reload();

            } if (res && res.EC !== 0) {
                toast.error(res.EM);
                let _validInputs = _.cloneDeep(validInputsDefault);
                _validInputs[res.DT] = false
                setValidInputs(_validInputs)
            }
        }else{
            toast.error("Valid is null")
        }
    }

    


    const handleOnchangeInput = (value, name) => {
        let _userdata = _.cloneDeep(userData)
        _userdata[name] = value
        setUserData(_userdata)
    }

    const [userGroup, setUserGroup] = useState([]);
    useEffect(() => {
        getGroup()
    }, [])

    useEffect(() => {
        if (action === "UPDATE") {
            // console.log("Check data modal user", dataModalUser)
              console.log("Check data modal user", dataModalUser)
            setUserData({ ...dataModalUser, group: dataModalUser.Group ? dataModalUser.Group.id : '', password: ' ' })
        }
    }, [dataModalUser])
   

    useEffect(() => {
        if (action === "CREATE") {
            if (userGroup && userGroup.length > 0) {
                setUserData({ ...userData, group: userGroup[0].id })
            }
            // console.log("Check data modal user", dataModalUser)


        }
    }, [dataModalUser])

    const getGroup = async () => {
        let res = await fetchGroup();
        if (res && res && res.EC === 0) {
            setUserGroup(res.DT)
            if (res.DT && res.DT.length > 0) {
                setUserData({ ...userData, group: res.DT[0].id })
            }
        } else {
            toast.error(res.EM)
        }
    }
    const handleCloseModalUser = () => {
        props.onHide()
        setUserData(deFaultUserData)
        setValidInputs(validInputsDefault)
    }

    return (
        <>
            <Modal size="lg" show={props.show} className="modal-user">
                <Modal.Header closeButton onClick={() => { handleCloseModalUser() }}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {action === "CREATE" ? "Create User" : "Edit user"}

                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="content-body row">
                        <div className="col-12 col-sm-6 form-group">
                            <label>Email address(<span className="text-danger">*</span>):</label>
                            <input  className={validInputs.email ? "form-control" : "form-control is-invalid"} type="email" value={userData.email}
                                onChange={(event) => handleOnchangeInput(event.target.value, "email")}
                            />
                        </div>

                        <div className="col-12 col-sm-6 form-group">
                            <label>Phone number(<span className="text-danger">*</span>):</label>
                            <input  className={validInputs.phoneNumber ? "form-control" : "form-control is-invalid"} type="text" value={userData.phoneNumber}
                                onChange={(event) => handleOnchangeInput(event.target.value, "phoneNumber")}
                            />
                        </div>

                        <div className="col-12 col-sm-6 form-group">
                            <label>Student code</label>
                            <input className={validInputs.maSo ? "form-control" : "form-control is-invalid"} type="email" value={userData.maSo}
                                onChange={(event) => handleOnchangeInput(event.target.value, "maSo")}
                            />
                        </div>

                        <div className="col-12 col-sm-6 form-group">
                           
                                
                                    <label>Password (<span className="text-danger">*</span>)</label>
                                    <input className={validInputs.password ? "form-control" : "form-control is-invalid"} type="email" value={userData.password}
                                        onChange={(event) => handleOnchangeInput(event.target.value, "password")}
                                    />
                                
                            
                        </div>


                        <div className="col-12 col-sm-12 form-group">
                            <label>Name</label>
                            <input className="form-control" value={userData.name}
                                onChange={(event) => handleOnchangeInput(event.target.value, "name")}
                            />


                            {/* <input className="form-control" type="text" /> */}
                        </div>

                        <div className="col-12 col-sm-6 form-group">
                            <label>Gender</label>
                            <select className="form-select"
                                onChange={(event) => handleOnchangeInput(event.target.value, "sex")}
                                value={userData.sex}
                            >
                                <option defaultValue="Male">Male</option>

                                <option value="Female">Female</option>

                            </select>
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label>Group(<span className="text-danger">*</span>)</label>
                            <select className={validInputs.group ? "form-select" : "form-select is-invalid"}
                                onChange={(event) => handleOnchangeInput(event.target.value, "group")}
                                value={userData.group}
                            >
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
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleCloseModalUser()}>Close</Button>
                    <Button variant="primary" onClick={() => handleConfirmUser()}>{action === 'CREATE' ? 'CREATE' : 'UPDATE'}</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ModalUser