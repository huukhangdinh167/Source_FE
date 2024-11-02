import React, { useEffect, useState } from 'react';
import './Nav.scss';
import { NavLink, useLocation, Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Nav from 'react-bootstrap/Nav'
import logo from '../../logo/logo.png'
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

    if (user && user.isAuthenticate === true || (location.pathname === '/' || location.pathname === '/about')) {
        return (
            <div className='nav-header'>


                {/* // <div className="topnav">
            //     <NavLink to="/" exact>Home</NavLink>
            //     <NavLink to="/users">users</NavLink>
            //     <NavLink to="/projects">projects</NavLink>
            //     <NavLink to="/about">About</NavLink>
            // </div> */}
                <Navbar bg="header" expand="lg">
                    <Container>
                        <Navbar.Brand href="#home">
                            <img
                                src={logo}
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                            //  alt="React Bootstrap logo"
                            />
                            <span className='band'> IUH</span>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <NavLink className="nav-link" to="/" exact>Home</NavLink>
                                <NavLink className="nav-link" to="/users">users</NavLink>
                                <NavLink className="nav-link" to="/roles">Roles</NavLink>
                                <NavLink className="nav-link" to="/projects">projects</NavLink>
                                <NavLink className="nav-link" to="/about">About</NavLink>
                            </Nav>
                            <Nav>
                                {

                                    user && user.isAuthenticate === true
                                        ?
                                        <>
                                            <Nav.Item className='nav-link' href="#deets">Well come {user.account.username} !</Nav.Item>
                                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                                <NavDropdown.Item >Change password</NavDropdown.Item>
                                                <NavDropdown.Item > <span onClick={() => handleLogout()}>Log-out</span></NavDropdown.Item>

                                            </NavDropdown>
                                        </>
                                        :
                                        <Link className='nav-link' href="#deets" to='/login'>LOGIN !</Link>

                                }


                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

            </div>
        );
    } else {
        return <></>
    }
}

export default NavHeader;