import './Register.scss'
import { useHistory } from "react-router-dom";
// import { Link } from 'react-router-dom/cjs/react-router-dom.min';
// import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { registerNewUser } from '../../services/userServer';
const Register = (props) => {

    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const defaultValidInput = {
        isValidEmail: true,
        isValidPhone: true,
        isValidPassword: true,
        isValidConfirmPassword: true
    }
    const [objCheckInput, setObjCheckInput] = useState(defaultValidInput)
    let history = useHistory();
    const handleLogin = () => {
        history.push("/register");
        // alert("aaaaaaaa")
    }

    useEffect(() => {
        // axios.get("http://localhost:8888/api/v1/test-api").then(data => {
        //     console.log("Check data axiosssssss:", data)
        // })

    }, []);

    const isValidinput = () => {
        setObjCheckInput(defaultValidInput);

        if (!email) {
            toast.error("Email is required!")
            setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
            return false;
        }
        let re = /\S+@\S+\.\S+/;
        if (!re.test(email)) {
            setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
            toast.error("Email is not define!")
            return false;
        }
        if (!phone) {
            toast.error("phone is required!")
            setObjCheckInput({ ...defaultValidInput, isValidPhone: false });
            return false;
        }
        if (!password) {
            toast.error("password is required!")
            setObjCheckInput({ ...defaultValidInput, isValidPassword: false });
            return false;
        }
        if (password !== confirmPassword) {
            toast.error("password is not match!")
            setObjCheckInput({ ...defaultValidInput, isValidConfirmPassword: false });
            return false;
        }



        return true;
    }

    const handleRegister = async () => {
        let check = isValidinput()
        if (check === true) {
            let reponse = await registerNewUser(email, username, password, phone);
            let serverdata = reponse.data;
            if (+serverdata.EC === 0) {
                toast.success(serverdata.EM)
                history.push("/login");
            } else {
                toast.error(serverdata.EM);
            }
        }

        // let userData = { email, phone, username, password }
        // console.log("Checkk userDate", userData);
    }
    return (

        <div className="Register-container ">

            <div className="container">
                <div className="row px-3 px-sm-0">

                    <div className="content-left col-12 d-none col-sm-7 d-sm-block">
                        <div className='brand' > Hỏi dân IT</div>
                        <div className='detail'>Learning everything from youtube channel Hoi Dan It</div>
                    </div>

                    <div className="content-right col-sm-5 col-12 d-flex flex-column grap-3 py-3 ">
                        <div className='brand d-sm-none ' > Hỏi dân IT</div>
                        <div className='form-group'>
                            <label>Email:</label>
                            <input type="text" placeholder='Email address ' className={objCheckInput.isValidEmail ? 'form-control mb-3' : 'form-control mb-3 is-invalid'}
                                value={email} onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Phone:</label>
                            <input type="text" placeholder='Your phone number' className={objCheckInput.isValidPhone ? 'form-control mb-3' : 'form-control mb-3 is-invalid'}
                                value={phone} onChange={(event) => setPhone(event.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label>UserName:</label>
                            <input type="text" placeholder='UserName' className='form-control mb-3'
                                value={username} onChange={(event) => setUsername(event.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Password:</label>
                            <input type="password" placeholder='Password' className={objCheckInput.isValidPassword ? 'form-control mb-3' : 'form-control mb-3 is-invalid'}
                                value={password} onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Re-enter password:</label>
                            <input type="password" placeholder='Re-enter Password' className={objCheckInput.isValidConfirmPassword ? 'form-control mb-3' : 'form-control mb-3 is-invalid'}
                                value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)}
                            />
                        </div>
                        <button className='btn btn-primary'
                            onClick={() => handleRegister()}
                        >Register</button>

                        <hr />
                        <div className='text-center'>
                            <button className='btn btn-success' onClick={() => handleLogin()}>
                                Already've an Acount Login
                            </button>
                        </div>

                    </div>

                </div>
            </div>

        </div>
    )

}
export default Register;