import React, { useEffect, useState } from 'react';
import './Nav.scss';
import { NavLink,useLocation } from 'react-router-dom/cjs/react-router-dom.min';
const Nav =(props) => {
const [isShow, setisShow] = useState(true);
let location = useLocation();
useEffect(()=>{
    if(location.pathname === "/login"){
        setisShow(false);
    }
}, []);
    return (
        <> { isShow === true &&
            <div>
            <div className="topnav">
                <NavLink  to="/" exact>Home</NavLink>
                <NavLink to="/users">users</NavLink>
                <NavLink to="/projects">projects</NavLink>
                <NavLink to="/about">About</NavLink>
            </div>
        </div>
        }
       
        </>
    );
}

export default Nav;