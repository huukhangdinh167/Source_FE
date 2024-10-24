import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { fetchGroup } from "../../services/userServer";
import { toast } from "react-toastify";
const ModalUser = (props) => {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [group, setGroup] = useState("");

    const [userGroup, setUserGroup] = useState([]);
    useEffect(() => {
        getGroup()
    }, [])
    const getGroup = async () => {
        let res = await fetchGroup();
        if (res && res.data && res.data.EC === 0) {
            setUserGroup(res.data.DT)
        } else {
            toast.error(res.data.EM)
        }

    }
    return (
        <>
            <Modal size="lg" show={true} className="modal-user">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {props.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="content-body row">
                        <div className="col-12 col-sm-6 form-group">
                            <label>Email address(<span className="text-danger">*</span>):</label>
                            <input className="form-control" type="email" />
                        </div>

                        <div className="col-12 col-sm-6 form-group">
                            <label>Phone number(<span className="text-danger">*</span>):</label>
                            <input className="form-control" type="text" />
                        </div>

                        <div className="col-12 col-sm-6 form-group">
                            <label>UserName</label>
                            <input className="form-control" type="email" />
                        </div>

                        <div className="col-12 col-sm-6 form-group">
                            <label>Password (<span className="text-danger">*</span>)</label>
                            <input className="form-control" type="email" />
                        </div>
                        <div className="col-12 col-sm-12 form-group">
                            <label>Adress</label>
                            <input className="form-control" type="text" />
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label>Gender</label>
                            <select className="form-select" >
                                <option selected value="Male">Male</option>

                                <option value="Female">Female</option>

                            </select>
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label>Group(<span className="text-danger">*</span>)</label>
                            <select className="form-select" >
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
                    <Button variant="secondary" onClick={props.onHide}>Close</Button>
                    <Button variant="primary" onClick={props.onHide}>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ModalUser