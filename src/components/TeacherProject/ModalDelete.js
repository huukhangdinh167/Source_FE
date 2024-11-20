import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalDelete = (props) => {
    return (
        <>
            <Modal show={props.show} onHide={props.handleClose} centered >
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận xoá?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn có chắc muốn xoá đề tài này: <b>{props.dataModel.name}</b></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={props.confirmDeleteProject}>
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalDelete;