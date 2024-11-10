
import React, { useEffect, useState, useContext } from 'react';
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
    console.log("user",user)
    const [ObjValidInput, setObjValidInput] = useState(defautObjValidInput)
    const [password, setpassword] = useState()
    const [rePassword, setRePassword] = useState()
    const [re2Password, setRe2Password] = useState()
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
    return (
        <div className="container">
            <div className="row mt-5 text-center">
                <div className="col-sm-4">

                </div>
                <div className="col-sm-5">
                    <h4>Change password</h4>
                    <table class="table mt-4">

                        <tbody>
                            <tr>
                                <td ></td>
                                <td></td>

                            </tr>
                            <tr>
                                <td ><i>Nhập vào mật khẩu hiện tại</i></td>
                                <td><input type="password" value={password} onChange={(event) => setpassword(event.target.value)}
                                    className={ObjValidInput.isvalidValuePassword ? 'form-control  mb-3' : 'form-control  mb-3 is-invalid'}
                                /></td>

                            </tr>
                            <tr>
                                <td ><i>Nhập mật khẩu muốn thay đổi</i></td>
                                <td><input type="password" value={rePassword} onChange={(event) => setRePassword(event.target.value)}
                                    className={ObjValidInput.isvalidValueRePassword ? 'form-control  ' : 'form-control  is-invalid'}
                                /></td>

                            </tr>
                            <tr>
                                <td ><i>Nhập lại khẩu muốn thay đổi</i></td>
                                <td><input type="password" value={re2Password} onChange={(event) => setRe2Password(event.target.value)}
                                    className={ObjValidInput.isvalidValueRe2Password ? 'form-control  ' : 'form-control  is-invalid'}
                                /></td>

                            </tr>
                            <tr>
                                <td ></td>
                                <td><div onClick={() => handleChangePassword()} className="btn btn-success">Change</div></td>

                            </tr>

                        </tbody>
                    </table>
                </div>
                <div className="col-sm-3">

                </div>
            </div>
        </div>
    )
}
export default ChangePW;