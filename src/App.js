import './App.scss';
import NavHeader from './components/Nagivation/NavHeader';
import { UserContext } from './context/userContext';
import React, { useEffect, useState } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, } from "react-router-dom";
import { NavLink, useLocation } from 'react-router-dom';
import AppRoutes from './routers/AppRoutes';
import { Rings } from 'react-loader-spinner'


function App() {
  const { user } = React.useContext(UserContext);
 
  return (
    <>

      <Router>
        {user && user.isLoading ?
          <div className='loading-container'>
            <div> <Rings color="#0866ff" height={80} width={80} /></div>
            <div>Loading data....</div>
          </div>
          :
          <>
            <div className='app-header'>
              <NavHeader />
            </div>
            <div className='app-container'>
              <AppRoutes />
            </div>
          </>
        }

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
