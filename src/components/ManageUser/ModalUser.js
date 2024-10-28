import { act, useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { fetchGroup, createNewUser, updateNewUser } from "../../services/userServer";
import { toast } from "react-toastify";
import _, { values } from "lodash";

const ModalUser = (props) => {
    // const [email, setEmail] = useState("");
    // const [phone, setPhone] = useState("");
    // const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");
    // const [address, setAddress] = useState("");
    // const [group, setGroup] = useState("");

    const { action, dataModalUser } = props
    const deFaultUserData = {
        email: '',
        phone: '',
        username: '',
        password: '',
        address: '',
        sex: '',
        group: ''

    }
    const validInputsDefault = {
        email: true,
        phone: true,
        username: true,
        password: true,
        address: true,
        sex: true,
        group: true

    }
    const checkValidateInputs = () => {

        // create user 
        if (action === "UPDATE")
            return true;
        setValidInputs(validInputsDefault);
        // console.log("check user data", userData)
        let arr = ['email', 'phone', 'password', 'group']
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
            if (res.data && res.data.EC === 0) {
                props.onHide()
                setUserData({ ...deFaultUserData, group: userGroup[0].id })
                // nếu muốn không cho edit group 
                // setUserData({ ...deFaultUserData, group: userGroup && userGroup.length > 0 ? userGroup[0].id : '' }) và // getGroup() ở dòng 93 
                // window.location.reload();
            } if (res.data && res.data.EC !== 0) {
                toast.error(res.data.EM);
                let _validInputs = _.cloneDeep(validInputsDefault);
                _validInputs[res.data.DT] = false
                setValidInputs(_validInputs)
            }
        }
    }

    const [validInputs, setValidInputs] = useState(validInputsDefault)
    const [userData, setUserData] = useState(deFaultUserData)
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
            setUserData({ ...dataModalUser, group: dataModalUser.Group ? dataModalUser.Group.id : '' })

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
        if (res && res.data && res.data.EC === 0) {
            setUserGroup(res.data.DT)
            if (res.data.DT && res.data.DT.length > 0) {
                setUserData({ ...userData, group: res.data.DT[0].id })
            }
        } else {
            toast.error(res.data.EM)
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
                            <input disabled={action === "CREATE" ? false : true} className={validInputs.email ? "form-control" : "form-control is-invalid"} type="email" value={userData.email}
                                onChange={(event) => handleOnchangeInput(event.target.value, "email")}
                            />
                        </div>

                        <div className="col-12 col-sm-6 form-group">
                            <label>Phone number(<span className="text-danger">*</span>):</label>
                            <input disabled={action === "CREATE" ? false : true} className={validInputs.phone ? "form-control" : "form-control is-invalid"} type="text" value={userData.phone}
                                onChange={(event) => handleOnchangeInput(event.target.value, "phone")}
                            />
                        </div>

                        <div className="col-12 col-sm-6 form-group">
                            <label>UserName</label>
                            <input className="form-control" type="email" value={userData.username}
                                onChange={(event) => handleOnchangeInput(event.target.value, "username")}
                            />
                        </div>

                        <div className="col-12 col-sm-6 form-group">
                            {action === "CREATE" &&
                                <>
                                    <label>Password (<span className="text-danger">*</span>)</label>
                                    <input className={validInputs.password ? "form-control" : "form-control is-invalid"} type="email" value={userData.password}
                                        onChange={(event) => handleOnchangeInput(event.target.value, "password")}
                                    />
                                </>
                            }
                        </div>


                        <div className="col-12 col-sm-12 form-group">
                            <label>Adress</label>
                            <textarea className="form-control" value={userData.address}
                                onChange={(event) => handleOnchangeInput(event.target.value, "address")}
                            >

                            </textarea>
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