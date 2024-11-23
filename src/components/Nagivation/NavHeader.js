import React, { useEffect, useState } from 'react';
import './Nav.scss';
import { NavLink, useLocation, Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Nav from 'react-bootstrap/Nav'

import { logoutUser } from '../../services/userServer'
import { toast } from "react-toastify";
//
const NavHeader = (props) => {
    let history = useHistory()
    let location = useLocation();
    const { user, logoutContext } = React.useContext(UserContext);

    const handleLogout = async () => {
        let data = await logoutUser() // clear Cookie
        localStorage.removeItem("jwt"); // Clear local Storage
        logoutContext() // clear user context
        if (data && +data.EC === 0) {
            history.push('/login')
            toast.success('Log-out success')
            console.log('Check user', user)
        } else {
            toast.error("Sonmething wrongs")
        }
    }

    const handleLogoClick = () => {
        if (user && user.isAuthenticate) {
            switch (user.groupId) {
                case 1:
                    history.push('/student-home');
                    break;
                case 2:
                    history.push('/teacher-home');
                    break;
                case 3:
                    history.push('/admin-home');
                    break;
                case 5:
                    history.push('/head-home');
                    break;
                default:
                    history.push('/users');
                    break;
            }
        } else {
            history.push('/login');
        }
    };


    if (user && user.isAuthenticate === true || (location.pathname === '/' || location.pathname === '/about')) {
        return (
            <Navbar expand="lg" className="navbar">
                <Container>
                    <Navbar.Brand onClick={handleLogoClick}>
                        <img
                            src="/iuh_rutgon.png"
                            alt="IUH Logo"
                            className="d-inline-block align-top"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {
                            user && user.groupId === 1 ?
                                <Nav className="me-auto">
                                    <NavLink className="nav-link" to="/student-home" >Trang chủ</NavLink>
                                    <NavLink className="nav-link" to="/project" >Đăng kí đề tài</NavLink>
                                    <NavLink className="nav-link" to="/results">Kết quả chấm</NavLink>
                                    <NavLink className="nav-link" to="/history">Lịch sử làm khóa luận</NavLink>


                                </Nav>
                                : (user && user.groupId === 2 ? <Nav className="me-auto">
                                    <NavLink className="nav-link" to="/teacher-home" >Trang chủ</NavLink>
                                    <NavLink className="nav-link" to="/teacher/projects">Quản lí đề tài</NavLink>
                                    <NavLink className="nav-link" to="/teacher-DSDK">Danh sách đăng kí</NavLink>
                                    <NavLink className="nav-link" to="/teacher-chamPB">Chấm PB</NavLink>
                                    <NavLink className="nav-link" to="/teacher-chamHD">Chấm HD</NavLink>

                                    {/* <NavLink className="nav-link" to="/">Teacher</NavLink>
                                        <NavLink className="nav-link" to="/">Teach</NavLink>
                                        <NavLink className="nav-link" to="/">Teach</NavLink> */}



                                </Nav> : (user && user.groupId === 3 ? <Nav className="me-auto">
                                    <NavLink className="nav-link" to="/admin-home" >Trang chủ</NavLink>
                                    <NavLink className="nav-link" to="/admin/users" >Quản lý người dùng</NavLink>
                                    <NavLink className="nav-link" to="/admin/add-role" exact>Add-Role</NavLink>
                                    <NavLink className="nav-link" to="/admin/assign-role">Phân quyền người dùng</NavLink>

                                </Nav> : (user && user.groupId === 5 ? <Nav className="me-auto">
                                    <NavLink className="nav-link" to="/head-home" >Trang chủ</NavLink>
                                    <NavLink className="nav-link" to="/head-project" exact >Đề tài</NavLink>
                                    <NavLink className="nav-link" to="/s">Thống kê </NavLink>
                                    <NavLink className="nav-link" to="/head/assginmentGV">Phân công PB</NavLink>
                                    <NavLink className="nav-link" to="/head/assginmentrol">Phân quyền</NavLink>
                                </Nav>

                                    : (<Nav className="me-auto">

                                        <NavLink className="nav-link" to="/users">users</NavLink>
                                        <NavLink className="nav-link" to="/roles">Roles</NavLink>
                                        <NavLink className="nav-link" to="/grouprole">Group-Role</NavLink>
                                        <NavLink className="nav-link" to="/about">About</NavLink>
                                    </Nav>))))

                        }

                        <Nav>
                            {

                                user && user.isAuthenticate === true
                                    ?
                                    <>
                                        {/* <Nav.Item className='nav-link' href="#deets"><b> {user.name}</b> !</Nav.Item> */}
                                        <NavDropdown title={<b>{user.name} </b>} id="basic-nav-dropdown">
                                            <NavDropdown.Item > <NavLink className="nav-link" to="/changepassword">Change password</NavLink></NavDropdown.Item>
                                            <NavDropdown.Item > <NavLink className="nav-link" to="/updateInfor">Update infor</NavLink></NavDropdown.Item>
                                            <NavDropdown.Item className='dropdown' > <span onClick={() => handleLogout()}>Log-out</span></NavDropdown.Item>

                                        </NavDropdown>
                                    </>
                                    :
                                    <Link className='nav-link' href="#deets" to='/login'>LOGIN !</Link>

                            }

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    } else {
        return <></>
    }
}

export default NavHeader;