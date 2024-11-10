import {
    Switch, Route,
} from "react-router-dom";
import Login from '../components/Login/Login';
import Project from '../components/Project/Project'
import Users from '../components/ManageUser/Users';
import PrivateRoutes from "./PrivateRoutes";
import Role from "../components/Role/Role";
import GroupRole from "../components/GroupRole/GroupRole";
import ChangePW from "../components/StudentChangePW/ChangePW";
import UpdateIF from "../components/StudentUpdateIF/UpdateIF";
import Results from "../components/StudentRS/Results";
const AppRoutes = () => {
    
    return (
        <>
            <Switch>

                <PrivateRoutes path="/users" component={Users} />
                <PrivateRoutes path="/roles" component={Role} />
                <PrivateRoutes path="/grouprole" component={GroupRole} /> 
                <PrivateRoutes path="/project" component={Project} /> 
                <PrivateRoutes path="/changepassword" component={ChangePW} /> 
                <PrivateRoutes path="/updateInfor" component={UpdateIF} /> 
                <PrivateRoutes path="/results" component={Results} />

                <Route path="/login">
                    <Login />
                </Route>
                
               
                <Route path="/" exact>
                    Homemmmm
                </Route>
                {/* <Route path="grouprole" >
                    <GroupRole />
                </Route> */}

                <Route path="/about" >
                    abuuu
                </Route>

            </Switch>
        </>
    )
}
export default AppRoutes