import {
    Switch, Route,
} from "react-router-dom";
import Login from '../components/Login/Login';
import Project from '../components/Project/Project'
import Users from '../components/ManageUser/Users';
import PrivateRoutes from "./PrivateRoutes";
import Role from "../components/Role/Role";
import GroupRole from "../components/GroupRole/GroupRole";
const AppRoutes = () => {
    
    return (
        <>
            <Switch>

                <PrivateRoutes path="/users" component={Users} />
                <PrivateRoutes path="/roles" component={Role} />
                <PrivateRoutes path="/grouprole" component={GroupRole} /> 


                <PrivateRoutes path="/project" component={Project} /> 
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