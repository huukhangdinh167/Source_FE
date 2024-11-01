import React, { useEffect, useState } from 'react';
import './Nav.scss';
import { NavLink, useLocation } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
//
const Nav = (props) => {
    let location = useLocation();
    const { user } = React.useContext(UserContext);
    if (user && user.isAuthenticate === true || (location.pathname === '/' || location.pathname === '/about')) {
        return (
            <div className="topnav">
                <NavLink to="/" exact>Home</NavLink>
                <NavLink to="/users">users</NavLink>
                <NavLink to="/projects">projects</NavLink>
                <NavLink to="/about">About</NavLink>
            </div>
        );
    }else{
        return <></>
    }
}

export default Nav;