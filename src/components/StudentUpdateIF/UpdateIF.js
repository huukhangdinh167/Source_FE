
import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../context/userContext';
import { toast } from 'react-toastify';
import {  updateInFor } from '../../services/studentService'
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
    return (
        <div className="container">
            <div className="row mt-5 text-center">
                <div className="col-sm-4">

                </div>
                <div className="col-sm-5">
                    <h4>Cập nhật thông tin</h4>
                    <table class="table mt-4">

                        <tbody>
                            <tr>
                                <td ></td>
                                <td></td>

                            </tr>
                            <tr>
                                <td ><i>Phone number</i></td>
                                <td><input type="text" value={phone} onChange={(event) => setphone(event.target.value)}
                                    className={ObjValidInput.isvalidValuePhone ? 'form-control  mb-3' : 'form-control  mb-3 is-invalid'}
                                /></td>

                            </tr>
                            <tr>
                                <td ><i>Email</i></td>
                                <td><input type="text" value={email} onChange={(event) => setemail(event.target.value)}
                                    className={ObjValidInput.isvalidValueEmail ? 'form-control  ' : 'form-control  is-invalid'}
                                /></td>

                            </tr>
                            <tr>
                                <td ></td>
                                <td><div onClick={() => handleUpdateIF()} className="btn btn-success">Change</div></td>

                            </tr>
                            <tr>
                                <td colSpan={2}><i><b>Lưu ý</b>: Bạn phải cập nhật thông tin cập nhật phải chính xác để ban chủ nhiệm khoa hoặc giảng viên sẽ liên hệ với bạn.</i></td>
                                

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
export default UpdateIF;