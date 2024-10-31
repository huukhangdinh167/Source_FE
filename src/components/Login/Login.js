import './Login.scss'
import { useHistory } from "react-router-dom";
// import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import React,{ useEffect, useState,useContext} from 'react';
import { toast } from 'react-toastify';
import { loginNewUser } from '../../services/userServer';
import { UserContext } from '../../context/userContext';
const Login = (props) => {
    const { loginContext } = useContext(UserContext);
    let history = useHistory();
    const handleCreatAccount = () => {

        history.push("/register");
    }
    const [valueLogin, setValueLogin] = useState("");
    const [password, setPassword] = useState("");
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
        if (response  && +response.EC === 0) {

             let groubWithRole = response.DT.groupWithRole
             let email = response.DT.email
             let username = response.DT.username  
             let token = response.DT.accesstoken 
            let data = {
                isAuthenticate: true,
                token: token,
                account: {groubWithRole,email,username}

            }
         
            loginContext(data)
            console.log(response)
            history.push("/users");
            // window.location.reload();

            // toast.success("Login successful");
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
    
    return (

        <div className="login-container ">

            <div className="container">
                <div className="row px-3 px-sm-0">

                    <div className="content-left col-12 d-none col-sm-7 d-sm-block">
                        <div className='brand' > Hỏi dân IT</div>
                        <div className='detail'>Learning everything from youtube channel Hoi Dan It</div>
                    </div>

                    <div className="content-right col-sm-5 col-12 d-flex flex-column grap-3 py-3 ">
                        <div className='brand d-sm-none ' > Hỏi dân IT</div>
                        <input type="text" placeholder='Email address or your phone number' className={ObjValidInput.isvalidValueLogin ? 'form-control  mb-3' : 'form-control  mb-3 is-invalid'}
                            value={valueLogin} onChange={(event) => setValueLogin(event.target.value)}

                        />
                        <input type="password" placeholder='Password' className={ObjValidInput.isvalidValuePassword ? 'form-control  mb-3' : 'form-control  mb-3 is-invalid'}
                            value={password} onChange={(event) => setPassword(event.target.value)}

                            onKeyPress={(event) => handlePressEnter(event)}

                        />
                        <button className='btn btn-primary'
                            onClick={() => handleLogin()}

                        >Login</button>
                        <span className='text-center mt-3'>
                            <a className='forgot-password' href='#' >Forgot your password</a>
                        </span>
                        <hr />
                        <div className='text-center'>
                            <button className='btn btn-success' onClick={() => handleCreatAccount()}>
                                Creat new account
                            </button>
                        </div>

                    </div>

                </div>
            </div>

        </div>
    )

}
export default Login;