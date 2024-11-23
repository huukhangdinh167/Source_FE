import styles from './changepassword.module.scss'; // Import CSS Modules
import React, { useEffect, useState, useContext, useRef } from 'react';
import { UserContext } from '../../context/userContext';
import { toast } from 'react-toastify';
import { changePassWord } from '../../services/studentService'
const ChangePW = () => {
    const { user } = React.useContext(UserContext);
    const defautObjValidInput = {
        isvalidValuePassword: true,
        isvalidValueRePassword: true,
        isvalidValueRe2Password: true
    }
    console.log("user", user)
    const [ObjValidInput, setObjValidInput] = useState(defautObjValidInput)
    const [password, setpassword] = useState()
    const [rePassword, setRePassword] = useState()
    const [re2Password, setRe2Password] = useState()
    const passwordInputRef = useRef(null);
    const handleChangePassword = async () => {
        setObjValidInput(defautObjValidInput)
        if (!password) {
            toast.error("Value is null")
            setObjValidInput({ ...defautObjValidInput, isvalidValuePassword: false })
            return;
        }
        if (!rePassword) {
            toast.error("Value is null")
            setObjValidInput({ ...defautObjValidInput, isvalidValueRePassword: false })
            return;
        }
        if (!re2Password) {
            toast.error("Value is null")
            setObjValidInput({ ...defautObjValidInput, isvalidValueRe2Password: false })
            return;
        }
        if (rePassword !== re2Password) {
            toast.error("Mật Khẩu nhập lại không khớp")
            setObjValidInput({ ...defautObjValidInput, isvalidValueRe2Password: false })
            return;
        }
        let reponse = await changePassWord(user.maSo, password, rePassword)
        if (+reponse.EC === 0) {
            toast.success(reponse.EM)
            setRe2Password('')
            setRePassword('')
            setpassword('')

        } else {
            toast.error(reponse.EM)
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        handleChangePassword();
    };
    return (

        <div className={styles['login-container']}>
            <h2>Đổi mật khẩu</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles['form-group']}>
                    <label>Nhập mật khẩu hiện tại của bạn:</label>
                    <input
                        type="password"
                        placeholder="Nhập mật khẩu hiện tại của bạn"
                        value={password}
                        onChange={(event) => setpassword(event.target.value)}
                        ref={passwordInputRef}
                        className={ObjValidInput.isvalidValuePassword
                            ? styles['form-control']
                            : `${styles['form-control']} ${styles['is-invalid']}`}
                    />
                </div>
                <div className={styles['form-group']}>
                    <label>Mật khẩu mới:</label>
                    <input
                        type="password"
                        placeholder="Nhập mật khẩu mới"
                        value={rePassword}
                        onChange={(event) => setRePassword(event.target.value)}
                        ref={passwordInputRef}
                        className={ObjValidInput.isvalidValueRePassword
                            ? styles['form-control']
                            : `${styles['form-control']} ${styles['is-invalid']}`}
                    />
                </div>
                <div className={styles['form-group']}>
                    <label>Mật lại mật khẩu mới:</label>
                    <input
                        type="password"
                        placeholder="Nhập mật khẩu mới"
                        value={re2Password}
                        onChange={(event) => setRe2Password(event.target.value)}
                        ref={passwordInputRef}
                        className={ObjValidInput.isvalidValueRe2Password
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
export default ChangePW;