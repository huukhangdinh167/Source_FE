import React, { useEffect, useState } from "react";
import { getUserAccount } from '../services/userServer'


const UserContext = React.createContext({ name: 'Eric', auth: false });

const UserProvider = ({ children }) => {
  
    // User is the name of the "data" that gets stored in context
    const userDefault ={
        isLoading: true,
        isAuthenticate: false,
        token: "",
        account: {}

    }
    const [user, setUser] = useState(userDefault);

    // Login updates the user data with a name parameter
    const loginContext = (userDate) => {
        setUser({...userDate, isLoading: false});
    };

    // Logout updates the user data to default
    const logout = () => {
        setUser((user) => ({
            name: '',
            auth: false,
        }));
    };

    const fetchUser = async () => {
       let response=  await getUserAccount()
       if(response && response.EC === 0){
        let groubWithRole = response.DT.groupWithRole
        let email = response.DT.email
        let username = response.DT.username  
        let token = response.DT.accesstoken 
       let data = {
        
           isAuthenticate: true,
           token: token,
           account: {groubWithRole,email,username},
           isLoading: false,
       }    
        setUser(data) 
       }else{
        setUser({...userDefault, isLoading: false })
       }
    }

    useEffect(() => {
        if(window.location.pathname !== '/' || window.location.pathname !== '/login'){
            fetchUser()
       }
        
    }, [])


    return (
        <UserContext.Provider value={{ user, loginContext, logout }}>
            {children}
        </UserContext.Provider>
    );

}
export { UserProvider, UserContext }