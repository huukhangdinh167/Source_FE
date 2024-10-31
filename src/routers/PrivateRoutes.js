import { Route, } from "react-router-dom";
import React, { useEffect } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { UserContext } from '../context/userContext';
 //import { useHistory } from "react-router-dom";
//
const PrivateRoutes = (props) => {
  const history = useHistory();
  const { user } = React.useContext(UserContext);
  // let history = useHistory();
  if (user && user.isAuthenticate === true) {
    return (
      <>
        <Route path={props.path} component={props.component} />
      </>
    )
  } else {
    return <Redirect to='/login'></Redirect>
     // history.push("/login")
      window.location.reload()
  }

}
export default PrivateRoutes