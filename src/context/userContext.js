import React, { useEffect, useState } from "react";
import { getUserAccount } from '../services/userServer'


const UserContext = React.createContext({ name: 'Eric', auth: false });

const UserProvider = ({ children }) => {

    // User is the name of the "data" that gets stored in context
    const userDefault = {
        isLoading: true,
        isAuthenticate: false,
        token: "",
        name: "",
        groupId: "",
        account: {}

    }
    const [user, setUser] = useState(userDefault);
   // const [chooseGroup, setChooseGroup] = useState
    // Login updates the user data with a name parameter 
    const loginContext = (userDate) => {
        setUser({ ...userDate, isLoading: false });
    };

    // Logout updates the user data to default
    const logoutContext = () => {
        setUser({ ...userDefault, isLoading: false });
    };

    const fetchUser = async () => {
        let response = await getUserAccount()
        if (response && response.EC === 0) {
            let groubWithRole = response.DT.groupWithRole
            let email = response.DT.email
            let username = response.DT.username
            let token = response.DT.accesstoken
            let groupId = response.DT.groupId
            let name = response.DT.name
            let phoneNumber = response.DT.phoneNumber
            let data = {

                isAuthenticate: true,
                token: token,
                maSo: username,
                name: name,
                groupId: groupId,
                account: { groubWithRole, email, username },
                isLoading: false,
                email: email,
                phoneNumber: phoneNumber

            }
            setUser(data)
        } else {
            setUser({ ...userDefault, isLoading: false })
        }
    }

    useEffect(() => {
        // if (window.location.pathname !== '/' &&  window.location.pathname !== '/login') {
        //     fetchUser()

        // } else {
        //     setUser({ ...user, isLoading: false })
        // }
        fetchUser()
    }, [])

    // useEffect(() => {
    //     if(window.location.pathname == '/'){
    //         return(<>
    //         homeeeee
    //         </>)

    //    }else{
    //     setUser({...user, isLoading: false })
    //    }

    // }, [])

    return (
        <UserContext.Provider value={{ user, loginContext, logoutContext }}>
            {children}
        </UserContext.Provider>
    );

}
export { UserProvider, UserContext }