import styles from './login.module.scss'; // Import CSS Modules
import { useHistory } from "react-router-dom";
// import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import React, { useEffect, useState, useContext, useRef } from 'react';
import { toast } from 'react-toastify';
import { loginNewUser } from '../../services/userServer';
import { UserContext } from '../../context/userContext';
const Login = (props) => {
    const { loginContext } = useContext(UserContext);
    let history = useHistory();

    const [valueLogin, setValueLogin] = useState("");
    const [password, setPassword] = useState("");

    const passwordInputRef = useRef(null);
    const defautObjValidInput = {
        isvalidValueLogin: true,
        isvalidValuePassword: true
    }
    const [ObjValidInput, setObjValidInput] = useState(defautObjValidInput)
    const handleLogin = async () => {
        setObjValidInput(defautObjValidInput)
        if (!valueLogin) {
            toast.error("Value is null")
            setObjValidInput({ ...defautObjValidInput, isvalidValueLogin: false })
            return;
        }
        if (!password) {
            toast.error("password is null")
            setObjValidInput({ ...defautObjValidInput, isvalidValuePassword: false })
            return;
        }
        let response = await loginNewUser(valueLogin, password)
        // console.log("Check respone", response)
        if (response && +response.EC === 0) {

            let groubWithRole = response.DT.groupWithRole
            let email = response.DT.email
            let username = response.DT.username
            let token = response.DT.accesstoken
            let groupId = response.DT.groupId
            let name = response.DT.name
            let phoneNumber = response.DT.phoneNumber

            let data = {
                isAuthenticate: true,
                token: token,
                maSo: username,
                account: { groubWithRole, email, username },
                name: name,
                groupId: groupId,
                phoneNumber: phoneNumber,
                email: email

            }
            localStorage.setItem('jwt', token)
            loginContext(data)
            if (groupId === 3) {
                history.push("/admin/users");
            } else if (groupId === 1) {
                history.push("/project");
            } else if (groupId === 5) {
                history.push("/head-project");
            } else if (groupId === 2) {
                history.push("/teacher/projects");
            }
            else if (groupId === 4) {
                history.push("/teacher/projects");
            }
            else {
                history.push("/");
            }


        }
        if (response && +response.EC !== 0) {
            toast.error(response.EM);

        }


    }
    const handlePressEnter = (event) => {
        if (event.charCode === 13 && event.code === "Enter") {
            handleLogin()
        }
    }

    // Áp dụng background khi ở trang Login
    useEffect(() => {
        document.body.style.background = "linear-gradient(135deg, #457b9d, #1d3557)";
        document.body.style.display = "flex";
        document.body.style.justifyContent = "center";
        document.body.style.alignItems = "center";
        document.body.style.height = "100vh";
        document.body.style.margin = "0";

        // Reset lại khi rời trang Login
        return () => {
            document.body.style = ""; // Reset tất cả style của body
        };
    }, []);
    const handleSubmit = (event) => {
        event.preventDefault();
        handleLogin();
    };


    return (

        <div className={styles['login-container']}>
            <img src="/iuh_rutgon.png" alt="Logo" className={styles['logo']} />
            <h3>Chào mừng bạn đến với IUH</h3>
            <form onSubmit={handleSubmit}>
                <div className={styles['form-group']}>
                    <label color='#ffffff'>Tên đăng nhập:</label>
                    <input
                        type="text"
                        placeholder="Nhập tên đăng nhập"
                        value={valueLogin}
                        onChange={(event) => setValueLogin(event.target.value)}
                        className={ObjValidInput.isvalidValueLogin
                            ? styles['form-control']
                            : `${styles['form-control']} ${styles['is-invalid']}`}
                    />
                </div>
                <div className={styles['form-group']}>
                    <label>Mật khẩu:</label>
                    <input
                        type="password"
                        placeholder="Nhập mật khẩu"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        ref={passwordInputRef}
                        className={ObjValidInput.isvalidValuePassword
                            ? styles['form-control']
                            : `${styles['form-control']} ${styles['is-invalid']}`}
                    />
                </div>
                <button className={`${styles.btn} ${styles['btn-primary']} ${styles['btn-lg']}`}
                >Đăng Nhập</button>
            </form>
        </div>
    )

}
export default Login;