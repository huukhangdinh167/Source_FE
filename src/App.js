
import './App.scss';

import Nav from './components/Nagivation/Nav';

import React, { useEffect, useState } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  BrowserRouter as Router,


} from "react-router-dom";

import AppRoutes from './routers/AppRoutes';


function App() {
  const [account, setAccount] = useState({});
  useEffect(() => {
    let session = sessionStorage.getItem("account");
    if (session) {
      setAccount(JSON.parse(session));
    }
  }, []);
  return (
    <>
      <Router>
        <div className='app-header'>
          <Nav />
        </div>

        <div className='app-container'>

        <AppRoutes/>

          
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
