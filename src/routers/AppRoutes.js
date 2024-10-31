import {
    Switch,
    Route,

} from "react-router-dom";
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import Users from '../components/ManageUser/Users';
import PrivateRoutes from "./PrivateRoutes";

const AppRoutes = () => {
    const projects =()=>{
        return(
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
                
                <Route path="/login">
                    <Login />
                </Route>

                <Route path="/Register">
                    <Register />
                </Route>
                <Route path="/" exact>
                    Homemmmm
                </Route>
                <Route path="*" >
                    Không có má ơi
                </Route>

            </Switch>
        </>
    )
}
export default AppRoutes