import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import _ from "lodash";
import { createNewProject, updateCurrentProject, } from '../../services/projectService'
import _default from 'react-bootstrap/Modal';
import { toast } from "react-toastify";
import Button from 'react-bootstrap/Button';
import { UserContext } from "../../context/userContext";
import './modalproject.scss'

const ModalProject = (props) => {
    const { user } = React.useContext(UserContext);
    const { action, dataModalProject } = props;

    const defaultProjectData = {
        name: '',
        description: '',
        require: '',
        knowledgeSkills: '',
        instuctor: user.name,
        status: 0,
        userteacherId: user.maSo
        // 0 là đang chờ phê duyệt,
        //1 là đã được phê duyệt

    }
    const validInputsDefault = {
        name: true,
        description: true,
        require: true,
        knowledgeSkills: true,
        instuctor: true,
        status: true,
        userteacherId: true
    }

    const [projectData, setProjectData] = useState(defaultProjectData);
    const [validInputs, setvalidInputs] = useState(validInputsDefault);

    const handleOnChangeInput = (value, name) => {
        let _projectData = _.cloneDeep(projectData)
        _projectData[name] = value;
        setProjectData(_projectData);
    }

    // Lấy thông tin khi cập nhật project
    useEffect(() => {
        if (action === 'UPDATE') {
            // console.log("check data update:  ", props.dataModalUser)
            // console.log("check data org:  ", dataModalUser)
            // console.log("check data set:  ", { ...dataModalUser, group: dataModalUser.Group ? dataModalUser.Group.id : '' })

            //lấy ra id của group
            setProjectData({ ...defaultProjectData, ...dataModalProject });
        }

    }, [dataModalProject]);

    const checkValidateInputs = () => {
        if (action === 'UPDATE')
            return true;
        setvalidInputs(validInputsDefault);

        let arr = ['name', 'instuctor'];
        let check = true;
        for (let i = 0; i < arr.length; i++) {
            if (!projectData[arr[i]]) {
                //cập nhật biên array input
                let _validInputs = _.cloneDeep(validInputsDefault);
                _validInputs[arr[i]] = false;
                setvalidInputs(_validInputs);
                //hiển thị thông báo
                toast.error(`Không được để ${arr[i]} trống`);
                check = false;
                break;
            }
        }
        return check;
    }




    const handleConfirmProject = async (user) => {
        let check = checkValidateInputs()
        if (check === true) {
            let res = action === 'CREATE' ?
                await createNewProject({ ...projectData, name: projectData.name.trim(), nameprojectapprove: 'null', nameprojectrefuse: 'null' })
                : await updateCurrentProject({ ...projectData, status: 0 });
            if (res && res.EC == 0) {
                props.onHide();
                //  toast.success("Thành công!");
                props.onProjectAdded(user);
                setProjectData({ ...defaultProjectData })
            } if (res && res.EC !== 0) {//hiện ô input đỏ khi mà nhập sai hoặc nhập thông tin đã có sẵn
                // toast.error(res.EM);
                let _validInputs = _.cloneDeep(validInputsDefault);
                _validInputs[res.DT] = false;
                setvalidInputs(_validInputs);
            }
        }
    }

    const handleCloseProject = () => {
        props.onHide();
        setProjectData(defaultProjectData);
        setvalidInputs(validInputsDefault);

    }

    return (
        <>
            <Modal size="lg" show={props.show} onHide={() => handleCloseProject()} className='modal-user'>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <span>{props.action === 'CREATE' ? 'Tạo đề tài mới' : 'Chỉnh sửa đề tài'}</span>
                        {/* hàm điều kiện khi sử dụng chung form validate nếu action= create thì Modal add sẽ hiện và ngược lại modal edit sẽ
                        xuất hiện */}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className="col-12 form-group">
                        <label>Tên đề tài : <span className="text-danger">*</span></label>
                        <textarea
                            className={validInputs.name ? 'form-control' : 'form-control is-invalid'}
                            type="text"
                            value={projectData.name}
                            onChange={(event) => handleOnChangeInput(event.target.value, "name")}
                        />
                    </div>
                    <div className="col-12 form-group">
                        <label>Mô tả :</label>
                        <textarea
                            className={validInputs.description ? 'form-control' : 'form-control is-invalid'}
                            value={projectData.description}
                            onChange={(event) => handleOnChangeInput(event.target.value, "description")}
                        />
                    </div>
                    <div className="col-12 form-group">
                        <label>Yêu cầu :</label>
                        <textarea
                            className={validInputs.require ? 'form-control' : 'form-control is-invalid'}
                            value={projectData.require}
                            onChange={(event) => handleOnChangeInput(event.target.value, "require")}
                        />
                    </div>
                    <div className="col-12 form-group">
                        <label>Kiến thức :</label>
                        <textarea
                            className={validInputs.knowledgeSkills ? 'form-control' : 'form-control is-invalid'}
                            value={projectData.knowledgeSkills}
                            onChange={(event) => handleOnChangeInput(event.target.value, "knowledgeSkills")}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleCloseProject()}>Đóng</Button>
                    <Button variant="primary" onClick={() => handleConfirmProject()}>
                        {action === 'CREATE' ? 'Tạo mới' : 'Cập nhật'}
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    )



}

export default ModalProject;