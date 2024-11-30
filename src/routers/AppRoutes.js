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
import HeadAssignGV from '../components/Head/HeadAssginMentGV/HeadProject'
import TeacherChamPB from '../components/Teacher/TeacherChamPB/TeacherChamPB'
import Projects from "../components/TeacherProject/Projects";
import TeacherChamHD from '../components/Teacher/TeacherChamHD/TeacherChamHD'
import HeadKetQuaCham from '../components/Head/HeadKetQuaCham/HeadKetQuaCham'
import TeacherChamHoiDong from '../components/Teacher/TeacherHoiDong/TeacherHoiDong'
//home(trang chủ)
import adminHome from "../components/Home/admin";
import studentHome from "../components/Home/student";
import teacherHome from "../components/Home/teacher";
import headHome from "../components/Home/head";
import HeadResults from '../components/Head/HeadResults/HeadResults'
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
                <PrivateRoutes path="/head/assginmentGV" component={HeadAssignGV} />
                <PrivateRoutes path="/head/results" component={HeadResults} />

                <PrivateRoutes path="/teacher-chamPB" component={TeacherChamPB} />
                <PrivateRoutes path="/teacher-chamHoiDong" component={TeacherChamHoiDong} /><PrivateRoutes path="/teacher/projects" component={Projects} />
                <PrivateRoutes path="/teacher-chamHD" component={TeacherChamHD} />
                <PrivateRoutes path="/headKetQuaCham" component={HeadKetQuaCham} />


                <PrivateRoutes path="/teacher-home" component={teacherHome} />
                <PrivateRoutes path="/student-home" component={studentHome} />
                <PrivateRoutes path="/head-home" component={headHome} />
                <PrivateRoutes path="/admin-home" component={adminHome} />


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