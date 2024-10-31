import './App.scss';
import Nav from './components/Nagivation/Nav';
import { UserContext } from './context/userContext';
import React, { useEffect, useState } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, } from "react-router-dom";
import { NavLink, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import AppRoutes from './routers/AppRoutes';


function App() {
 

  return (
    <>
      <Router>

        <div className='app-header'>
         
            <Nav />
         
        </div>

        <div className='app-container'>

          <AppRoutes />


        </div>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {/* Same as */}


      </Router>
    </>
  );
}

export default App;
