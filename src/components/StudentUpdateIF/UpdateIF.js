import styles from './updateif.module.scss'; // Import CSS Modules
import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../context/userContext';
import { toast } from 'react-toastify';
import { updateInFor } from '../../services/studentService'
const UpdateIF = () => {
    const { user, updateUser } = React.useContext(UserContext);
    const defautObjValidInput = {
        isvalidValuePhone: true,
        isvalidValueEmail: true,

    }

    const [ObjValidInput, setObjValidInput] = useState(defautObjValidInput)

    const [phone, setphone] = useState(user.phoneNumber)
    const [email, setemail] = useState(user.email)
    const handleUpdateIF = async () => {
        setObjValidInput(defautObjValidInput)
        if (!phone) {
            toast.error("Value is null")
            setObjValidInput({ ...defautObjValidInput, isvalidValuePhone: false })
            return;
        }
        if (!email) {
            toast.error("Value is null")
            setObjValidInput({ ...defautObjValidInput, isvalidValueEmail: false })
            return;
        }
        let respone = await updateInFor(user.maSo, phone, email)
        if (+respone.EC === 0) {
            toast.success(respone.EM)
            // updateUser({ phoneNumber: phone, email: email })
        } else {
            toast.error(respone.EM)
        }
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        handleUpdateIF();
    };
    return (
        <div className={styles['login-container']}>
            <h2>Cập nhật thông tin</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles['form-group']}>
                    <label>Số điện thoại</label>
                    <input
                        type="text"
                        placeholder="Số điện thoại"
                        value={phone}
                        onChange={(event) => setphone(event.target.value)}
                        className={ObjValidInput.isvalidValuePhone
                            ? styles['form-control']
                            : `${styles['form-control']} ${styles['is-invalid']}`}
                    />
                </div>
                <div className={styles['form-group']}>
                    <label>Email:</label>
                    <input
                        type="email"
                        placeholder="Nhập mật khẩu mới"
                        value={email}
                        onChange={(event) => setemail(event.target.value)}
                        className={ObjValidInput.isvalidValueEmail
                            ? styles['form-control']
                            : `${styles['form-control']} ${styles['is-invalid']}`}
                    />
                </div>
                <button className={`${styles.btn} ${styles['btn-primary']} ${styles['btn-lg']}`}
                >Lưu thay đổi</button>
            </form>
        </div>

    )
}
export default UpdateIF;