import React from 'react';
import {UserRole} from "../../model/objects/User";
import {connect} from "react-redux";
import {AppState} from "../../model/state/store";
import {DashboardView} from "./DashboardView";
import {Redirect} from "react-router";

interface Props {
    username: string,
    firstName: string,
    lastName: string,
    role: UserRole;
    userLoggedIn: boolean;
}

const SmartDashboardView: React.FC<Props> =
    ({
         username,
         firstName,
         lastName,
         role,
        userLoggedIn
     }) => (
        userLoggedIn ?
            <DashboardView
                role={role}
                lastName={lastName}
                firstName={firstName}
                username={username}
             />  :
            <Redirect to={"/"}/>
    );

function mapStateToProps(appState: AppState): Pick<Props, "username" | "firstName" | "lastName" | "role" | "userLoggedIn"> {
    return {
        ...appState.userState.currentUser!!,
        userLoggedIn: appState.userState.currentUser !== undefined
    }
}

export default connect(mapStateToProps)(SmartDashboardView)