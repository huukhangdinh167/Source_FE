import axios from "axios";
import { toast } from "react-toastify";
const  instance = axios.create({
    baseURL: 'http://localhost:8888'
})

// // Alter defaults after instance has been created
 instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("jwt")}`;
// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
// 
instance.defaults.withCredentials = true
// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
   
    return response.data;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const status = error.response.status ;
    console.log(status)
    switch (status) {
      // authentication (token related issues)
      case 401: {
        if(window.location.pathname !== '/login'){
          toast.error("Unauthorized.. PLs login") 
        }
        
      //  window.location.href='/login'
        return error.response.data;;
      }

      // forbidden (permission related issues)
      case 403: {
        toast.error("You don't haveee permission to000 access")
        return Promise.reject(error);      }

      // bad request
      case 400: {
        return Promise.reject(error);      }

      // not found
      case 406: {
        return Promise.reject(error);      }

      // conflict
      case 409: {
        return Promise.reject(error);      }

      // unprocessable
      case 422: {
        return Promise.reject(error);      }

      // generic api error (server related) unexpected
      default: {
        return Promise.reject(error);      }
    }
    
  });
export default instance