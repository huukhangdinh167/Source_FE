import {
    Switch, Route,
} from "react-router-dom";
import Login from '../components/Login/Login';
import Project from '../components/StudentProject/Project'
import Users from '../components/ManageUser/Users';
import PrivateRoutes from "./PrivateRoutes";
import Role from "../components/Role/Role";
import GroupRole from "../components/GroupRole/GroupRole";
import ChangePW from "../components/StudentChangePW/ChangePW";
import UpdateIF from "../components/StudentUpdateIF/UpdateIF";
import Results from "../components/StudentRS/Results";
import AdminUsers from '../components/AdminMangementUser/User';
import AdminRole from "../components/AdminRole/AdminRole";
import AdminAssignRole from "../components/AdminAssignRole/AdminAssignRole"; 
import HeadProject from '../components/Head/HeadProject/Project'
import HeadAssignRole from '../components/Head/HeadAssginMentRole/HeadAssginmentRole'
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
                <PrivateRoutes path="/admin/users" component={AdminUsers} />
                <PrivateRoutes path="/admin/add-role" component={AdminRole} />
                <PrivateRoutes path="/admin/assign-role" component={AdminAssignRole} />
                <PrivateRoutes path="/head-project" component={HeadProject} />
                <PrivateRoutes path="/head/assginmentrol" component={HeadAssignRole} />

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