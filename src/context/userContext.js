import React, { useState } from "react";
const UserContext = React.createContext({ name: 'Eric', auth: false });
const UserProvider  = ({ children }) => {
    // User is the name of the "data" that gets stored in context
    const [user, setUser] = useState(
        {isAuthenticate: false,
         token:"",
         account:{}
         
        }
        );

    // Login updates the user data with a name parameter
    const loginContext = (userDate) => {
        setUser(userDate);
    };

    // Logout updates the user data to default
    const logout = () => {
        setUser((user) => ({
            name: '',
            auth: false,
        }));
    };

    return (
        <UserContext.Provider value={{ user, loginContext, logout }}>
            {children}
        </UserContext.Provider>
    );

}
export  {UserProvider,  UserContext}