import {
    Switch, Route,
} from "react-router-dom";
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import Users from '../components/ManageUser/Users';
import PrivateRoutes from "./PrivateRoutes";
import Role from "../components/Role/Role";
import GroupRole from "../components/GroupRole/GroupRole";
const AppRoutes = () => {
    const projects = () => {
        return (
            <div>
                projects
            </div>
        )
    }
    return (
        <>
            <Switch>

                <PrivateRoutes path="/users" component={Users} />
                <PrivateRoutes path="/projects" component={projects} />
                <PrivateRoutes path="/roles" component={Role} />
                <PrivateRoutes path="/grouprole" component={GroupRole} />
                <Route path="/login">
                    <Login />
                </Route>

                <Route path="/Register">
                    <Register />
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